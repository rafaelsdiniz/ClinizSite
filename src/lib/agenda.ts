import { EQUIPE } from "./conteudo";
import { TRATAMENTOS } from "./tratamentos";
import { SITE, WHATSAPP_MENSAGEM, whatsappLink } from "./site";

/* ---------- Tipos de consulta ---------- */

export type TipoConsulta = { id: string; nome: string; descricao: string; duracao: number; destaque?: boolean };

export const TIPOS: TipoConsulta[] = [
  {
    id: "avaliacao",
    nome: "Avaliação inicial",
    descricao: "Conversa, exame completo e plano de tratamento por escrito. Ideal para a primeira visita.",
    duracao: 60,
    destaque: true,
  },
  ...TRATAMENTOS.map((t) => ({
    id: t.slug,
    nome: t.nome,
    descricao: t.resumo,
    duracao: t.slug === "prevencao-e-limpeza" || t.slug === "odontopediatria" ? 45 : 60,
  })),
];

export function getTipo(id: string | null | undefined) {
  return TIPOS.find((t) => t.id === id);
}

/* ---------- Profissionais ---------- */

export type Profissional = (typeof EQUIPE)[number];

export function profissionaisPara(tipoId: string): Profissional[] {
  return EQUIPE.filter((m) => (m.atende as readonly string[]).includes(tipoId));
}

export function getProfissional(id: string | null | undefined) {
  return EQUIPE.find((m) => m.id === id);
}

/* ---------- Datas ---------- */

export const DIAS_SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
export const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export const JANELA_DIAS = 60;

export function isoDia(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dia}`;
}

export function deIso(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d);
}

export function hojeIso() {
  return isoDia(new Date());
}

export function formatarData(iso: string, opcoes: { semana?: boolean } = {}) {
  const d = deIso(iso);
  const semana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"][d.getDay()];
  const txt = `${d.getDate()} de ${MESES[d.getMonth()]}`;
  return opcoes.semana ? `${semana}, ${txt}` : txt;
}

/* ---------- Horários (disponibilidade fictícia, sempre igual para o mesmo dia) ---------- */

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function gradeDoDia(iso: string): string[] {
  const dow = deIso(iso).getDay();
  if (dow === 0) return [];
  const fim = dow === 6 ? 12 * 60 : 19 * 60;
  const out: string[] = [];
  for (let min = 8 * 60; min < fim; min += 30) {
    if (dow !== 6 && min >= 12 * 60 && min < 13 * 60 + 30) continue; // almoço
    out.push(`${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`);
  }
  return out;
}

export type Slot = { hora: string; livre: boolean; profissionais: string[] };

/** Situação de cada horário do dia para os profissionais escolhidos. */
export function horariosDoDia(iso: string, profIds: string[], ocupadosLocal: Agendamento[], ignorarId?: string): Slot[] {
  const agora = new Date();
  const ehHoje = iso === isoDia(agora);
  const minimo = agora.getHours() * 60 + agora.getMinutes() + 60;
  const lotado = hash(`lotado|${iso}`) % 9 === 0;

  return gradeDoDia(iso).map((hora) => {
    const [h, m] = hora.split(":").map(Number);
    const passou = ehHoje && h * 60 + m < minimo;
    const livres = profIds.filter((p) => {
      if (passou || lotado) return false;
      if (hash(`${iso}|${p}|${hora}`) % 100 < 38) return false;
      return !ocupadosLocal.some(
        (a) => a.id !== ignorarId && a.status === "confirmado" && a.data === iso && a.hora === hora && a.profissionalId === p,
      );
    });
    return { hora, livre: livres.length > 0, profissionais: livres };
  });
}

export function statusDoDia(iso: string, profIds: string[], ocupadosLocal: Agendamento[], ignorarId?: string) {
  const hoje = hojeIso();
  if (iso < hoje) return "passado" as const;
  const limite = new Date();
  limite.setDate(limite.getDate() + JANELA_DIAS);
  if (iso > isoDia(limite)) return "fora" as const;
  if (deIso(iso).getDay() === 0) return "fechado" as const;
  const livres = horariosDoDia(iso, profIds, ocupadosLocal, ignorarId).filter((s) => s.livre).length;
  return livres === 0 ? ("lotado" as const) : ("livre" as const);
}

/* ---------- Agendamentos guardados no navegador ---------- */

export type Agendamento = {
  id: string;
  codigo: string;
  tipoId: string;
  profissionalId: string;
  semPreferencia: boolean;
  data: string;
  hora: string;
  duracao: number;
  nome: string;
  whatsapp: string;
  email: string;
  primeiraVez: boolean;
  observacao: string;
  status: "confirmado" | "cancelado";
  criadoEm: string;
  remarcadoEm?: string;
};

const CHAVE = "cliniz:agendamentos";

export function lerAgendamentos(): Agendamento[] {
  try {
    const bruto = localStorage.getItem(CHAVE);
    const lista = bruto ? (JSON.parse(bruto) as Agendamento[]) : [];
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

export function salvarAgendamentos(lista: Agendamento[]) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
    window.dispatchEvent(new Event("cliniz:agendamentos"));
  } catch {}
}

export function gerarCodigo() {
  const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += letras[Math.floor(Math.random() * letras.length)];
  return `CLZ-${s}`;
}

export function gerarId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()) + Math.random();
}

/* ---------- Telefone ---------- */

export function mascararTelefone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/* ---------- Exportações ---------- */

function resumoTexto(a: Agendamento) {
  const tipo = getTipo(a.tipoId)?.nome ?? "Consulta";
  const prof = getProfissional(a.profissionalId)?.nome ?? "";
  return `${tipo} com ${prof}, ${formatarData(a.data, { semana: true })} às ${a.hora}. Código ${a.codigo}.`;
}

export function linkWhatsappAgendamento(a: Agendamento) {
  return whatsappLink(`Sobre o meu agendamento: ${resumoTexto(a)}`);
}

export { WHATSAPP_MENSAGEM };

/** Arquivo .ics para adicionar à agenda (Belo Horizonte usa UTC-3, sem horário de verão). */
export function baixarIcs(a: Agendamento) {
  const [ano, mes, dia] = a.data.split("-").map(Number);
  const [h, m] = a.hora.split(":").map(Number);
  const ini = new Date(Date.UTC(ano, mes - 1, dia, h + 3, m));
  const fim = new Date(ini.getTime() + a.duracao * 60000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const tipo = getTipo(a.tipoId)?.nome ?? "Consulta";
  const prof = getProfissional(a.profissionalId)?.nome ?? "";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Cliniz//Agendamento demonstrativo//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${a.id}@cliniz.com.br`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(ini)}`,
    `DTEND:${fmt(fim)}`,
    `SUMMARY:${tipo} na Cliniz`,
    `DESCRIPTION:${tipo} com ${prof}. Código ${a.codigo}. Agendamento demonstrativo: nenhuma consulta real foi marcada.`,
    `LOCATION:Cliniz Odontologia\\, ${SITE.enderecoCompleto.replace(/,/g, "\\,")}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Consulta na Cliniz",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const el = document.createElement("a");
  el.href = url;
  el.download = `cliniz-${a.codigo}.ics`;
  document.body.appendChild(el);
  el.click();
  el.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
