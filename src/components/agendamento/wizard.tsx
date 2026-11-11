"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  ListChecks,
  Loader2,
  Pencil,
  Shuffle,
  Sparkles,
  Stethoscope,
  User,
} from "lucide-react";
import { WhatsappIcon } from "../whatsapp-icon";
import {
  DIAS_SEMANA,
  JANELA_DIAS,
  MESES,
  TIPOS,
  baixarIcs,
  deIso,
  formatarData,
  gerarCodigo,
  gerarId,
  getProfissional,
  getTipo,
  horariosDoDia,
  isoDia,
  lerAgendamentos,
  linkWhatsappAgendamento,
  mascararTelefone,
  profissionaisPara,
  salvarAgendamentos,
  statusDoDia,
  type Agendamento,
} from "@/lib/agenda";

const PASSOS = ["Consulta", "Profissional", "Data e hora", "Seus dados", "Revisão"] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

type Dados = { nome: string; whatsapp: string; email: string; primeiraVez: boolean | null; observacao: string };
type Erros = Partial<Record<keyof Dados, string>>;

const DADOS_VAZIOS: Dados = { nome: "", whatsapp: "", email: "", primeiraVez: null, observacao: "" };

function validar(d: Dados): Erros {
  const e: Erros = {};
  const partes = d.nome.trim().split(/\s+/).filter(Boolean);
  if (!d.nome.trim()) e.nome = "Informe o seu nome.";
  else if (partes.length < 2) e.nome = "Informe nome e sobrenome.";
  const dig = d.whatsapp.replace(/\D/g, "");
  if (!dig) e.whatsapp = "Informe um WhatsApp para contato.";
  else if (dig.length !== 11 || dig[2] !== "9") e.whatsapp = "Use o formato (63) 99999-9999.";
  if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Confira o e-mail digitado.";
  if (d.primeiraVez === null) e.primeiraVez = "Conte se é a sua primeira vez na Cliniz.";
  return e;
}

export function AgendamentoWizard() {
  const [pronto, setPronto] = useState(false);
  const [passo, setPasso] = useState(0);
  const [direcao, setDirecao] = useState(1);
  const [tipoId, setTipoId] = useState<string | null>(null);
  const [profId, setProfId] = useState<string | null>(null); // "qualquer" = sem preferência
  const [data, setData] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);
  const [dados, setDados] = useState<Dados>(DADOS_VAZIOS);
  const [erros, setErros] = useState<Erros>({});
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [confirmado, setConfirmado] = useState<Agendamento | null>(null);
  const [remarcando, setRemarcando] = useState<Agendamento | null>(null);
  const [existentes, setExistentes] = useState<Agendamento[]>([]);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const primeiraRender = useRef(true);

  // Lê parâmetros (?tipo= ou ?remarcar=) e agendamentos já salvos, só no navegador.
  useEffect(() => {
    const lista = lerAgendamentos();
    const q = new URLSearchParams(window.location.search);
    const rem = q.get("remarcar");
    const tipo = q.get("tipo");
    /* eslint-disable react-hooks/set-state-in-effect -- estado inicial depende do navegador (URL e localStorage) */
    setExistentes(lista);
    const alvo = rem ? lista.find((a) => a.id === rem && a.status === "confirmado") : undefined;
    if (alvo) {
      setRemarcando(alvo);
      setTipoId(alvo.tipoId);
      setProfId(alvo.semPreferencia ? "qualquer" : alvo.profissionalId);
      setDados({
        nome: alvo.nome,
        whatsapp: alvo.whatsapp,
        email: alvo.email,
        primeiraVez: alvo.primeiraVez,
        observacao: alvo.observacao,
      });
      setPasso(2);
    } else if (tipo && getTipo(tipo)) {
      setTipoId(tipo);
      setPasso(1);
    }
    setPronto(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Leva o foco ao título do passo (acessibilidade) e sobe a tela
  useEffect(() => {
    if (primeiraRender.current) {
      primeiraRender.current = false;
      return;
    }
    tituloRef.current?.focus({ preventScroll: true });
    const alvo = document.getElementById("agendamento");
    if (alvo && alvo.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
    }
  }, [passo, confirmado]);

  const tipo = getTipo(tipoId);
  const opcoesProf = useMemo(() => (tipoId ? profissionaisPara(tipoId) : []), [tipoId]);
  const profIds = useMemo(
    () => (profId === "qualquer" || !profId ? opcoesProf.map((p) => p.id) : [profId]),
    [profId, opcoesProf],
  );

  const podeAvancar = [
    Boolean(tipoId),
    Boolean(profId),
    Boolean(data && hora),
    Object.keys(validar(dados)).length === 0,
    true,
  ][passo];

  function irPara(n: number) {
    setDirecao(n > passo ? 1 : -1);
    setPasso(n);
  }

  function avancar() {
    if (passo === 3) {
      setTentouEnviar(true);
      const e = validar(dados);
      setErros(e);
      if (Object.keys(e).length) {
        const primeiro = Object.keys(e)[0];
        document.getElementById(`campo-${primeiro}`)?.focus();
        return;
      }
    }
    if (passo < PASSOS.length - 1) irPara(passo + 1);
  }

  function confirmar() {
    if (!tipo || !data || !hora) return;
    setEnviando(true);
    setTimeout(() => {
      const lista = lerAgendamentos();
      const slot = horariosDoDia(data, profIds, lista, remarcando?.id).find((s) => s.hora === hora);
      const escolhido = profId === "qualquer" ? (slot?.profissionais[0] ?? profIds[0]) : profId!;
      let final: Agendamento;
      if (remarcando) {
        final = { ...remarcando, data, hora, profissionalId: escolhido, semPreferencia: profId === "qualquer", remarcadoEm: new Date().toISOString() };
        salvarAgendamentos(lista.map((a) => (a.id === remarcando.id ? final : a)));
      } else {
        final = {
          id: gerarId(),
          codigo: gerarCodigo(),
          tipoId: tipo.id,
          profissionalId: escolhido,
          semPreferencia: profId === "qualquer",
          data,
          hora,
          duracao: tipo.duracao,
          nome: dados.nome.trim(),
          whatsapp: dados.whatsapp,
          email: dados.email.trim(),
          primeiraVez: Boolean(dados.primeiraVez),
          observacao: dados.observacao.trim(),
          status: "confirmado",
          criadoEm: new Date().toISOString(),
        };
        salvarAgendamentos([...lista, final]);
      }
      setEnviando(false);
      setConfirmado(final);
    }, 1300);
  }

  function novoAgendamento() {
    setConfirmado(null);
    setRemarcando(null);
    setTipoId(null);
    setProfId(null);
    setData(null);
    setHora(null);
    setDados(DADOS_VAZIOS);
    setErros({});
    setTentouEnviar(false);
    setExistentes(lerAgendamentos());
    setPasso(0);
    window.history.replaceState(null, "", "/agendar");
  }

  if (!pronto) return <Carregando />;

  if (confirmado) {
    return <Sucesso a={confirmado} remarcado={Boolean(remarcando)} onNovo={novoAgendamento} tituloRef={tituloRef} />;
  }

  return (
    <div id="agendamento" className="scroll-mt-24 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="bg-white shadow-lift ring-1 ring-line">
        <Progresso passo={passo} onIr={(n) => n < passo && irPara(n)} />

        {remarcando && (
          <div className="flex items-start gap-3 border-b border-line bg-accent-soft/60 px-6 py-4 text-sm text-accent-ink sm:px-10">
            <CalendarDays className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p>
              Remarcando <strong className="font-semibold">{remarcando.codigo}</strong>, marcado para {formatarData(remarcando.data)} às{" "}
              {remarcando.hora}. Escolha a nova data.
            </p>
          </div>
        )}

        <div className="relative overflow-hidden px-5 py-8 sm:px-10 sm:py-10">
          <AnimatePresence mode="wait" custom={direcao} initial={false}>
            <motion.div
              key={passo}
              custom={direcao}
              initial={{ opacity: 0, x: direcao * 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direcao * -28 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {passo === 0 && (
                <Passo titulo="Que tipo de consulta você procura?" sub="Na dúvida, escolha a avaliação inicial." tituloRef={tituloRef}>
                  <ul className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Tipo de consulta">
                    {TIPOS.map((t) => {
                      const sel = t.id === tipoId;
                      return (
                        <li key={t.id} className={t.destaque ? "sm:col-span-2" : ""}>
                          <button
                            type="button"
                            role="radio"
                            aria-checked={sel}
                            onClick={() => {
                              setTipoId(t.id);
                              if (profId && profId !== "qualquer" && !profissionaisPara(t.id).some((p) => p.id === profId)) setProfId(null);
                              setHora(null);
                            }}
                            className={`group relative flex h-full w-full items-start gap-4 p-5 text-left ring-1 transition-all duration-300 ${
                              sel ? "bg-brand-50 ring-2 ring-brand" : "bg-white ring-line hover:bg-mist hover:ring-brand-300"
                            }`}
                          >
                            <span
                              className={`inline-flex size-11 shrink-0 items-center justify-center transition-colors ${
                                sel ? "bg-brand text-white" : "bg-ice text-brand group-hover:bg-brand-100"
                              }`}
                            >
                              {t.destaque ? <Sparkles className="size-5" aria-hidden /> : <Stethoscope className="size-5" aria-hidden />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-ink">{t.nome}</span>
                                {t.destaque && (
                                  <span className="bg-accent-soft px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-accent-ink">
                                    Recomendado
                                  </span>
                                )}
                              </span>
                              <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted">{t.descricao}</span>
                              <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                                <Clock className="size-3.5" aria-hidden />
                                Cerca de {t.duracao} min
                              </span>
                            </span>
                            <Marcador ativo={sel} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </Passo>
              )}

              {passo === 1 && tipo && (
                <Passo titulo="Com quem você prefere ser atendido?" sub={`Profissionais que atendem ${tipo.nome.toLowerCase()}.`} tituloRef={tituloRef}>
                  <ul className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Profissional">
                    <li className="sm:col-span-2">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={profId === "qualquer"}
                        onClick={() => {
                          setProfId("qualquer");
                          setHora(null);
                        }}
                        className={`group flex w-full items-center gap-4 p-5 text-left ring-1 transition-all duration-300 ${
                          profId === "qualquer" ? "bg-brand-50 ring-2 ring-brand" : "bg-white ring-line hover:bg-mist hover:ring-brand-300"
                        }`}
                      >
                        <span className={`inline-flex size-14 shrink-0 items-center justify-center ${profId === "qualquer" ? "bg-brand text-white" : "bg-ice text-brand"}`}>
                          <Shuffle className="size-6" aria-hidden />
                        </span>
                        <span className="flex-1">
                          <span className="block font-semibold text-ink">Sem preferência</span>
                          <span className="mt-0.5 block text-sm text-muted">Mostramos mais horários e indicamos quem estiver livre.</span>
                        </span>
                        <Marcador ativo={profId === "qualquer"} />
                      </button>
                    </li>
                    {opcoesProf.map((p) => {
                      const sel = profId === p.id;
                      return (
                        <li key={p.id}>
                          <button
                            type="button"
                            role="radio"
                            aria-checked={sel}
                            onClick={() => {
                              setProfId(p.id);
                              setHora(null);
                            }}
                            className={`group flex h-full w-full items-center gap-4 p-4 text-left ring-1 transition-all duration-300 ${
                              sel ? "bg-brand-50 ring-2 ring-brand" : "bg-white ring-line hover:bg-mist hover:ring-brand-300"
                            }`}
                          >
                            <span className="relative size-16 shrink-0 overflow-hidden bg-ice">
                              <Image src={p.foto} alt="" fill sizes="64px" className="object-cover" style={{ objectPosition: p.foco }} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold text-ink">{p.nome}</span>
                              <span className="mt-0.5 block text-sm text-brand">{p.papel}</span>
                            </span>
                            <Marcador ativo={sel} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </Passo>
              )}

              {passo === 2 && (
                <Passo titulo="Escolha o dia e o horário" sub="Domingos e feriados a clínica fica fechada. Sábado, só pela manhã." tituloRef={tituloRef}>
                  <DataHora
                    data={data}
                    hora={hora}
                    profIds={profIds}
                    existentes={existentes}
                    ignorarId={remarcando?.id}
                    onData={(d) => {
                      setData(d);
                      setHora(null);
                    }}
                    onHora={setHora}
                  />
                </Passo>
              )}

              {passo === 3 && (
                <Passo titulo="Seus dados" sub="Usamos só para confirmar e lembrar você da consulta." tituloRef={tituloRef}>
                  <Formulario
                    dados={dados}
                    erros={tentouEnviar ? validar(dados) : erros}
                    onChange={(campo, valor) => setDados((d) => ({ ...d, [campo]: valor }))}
                    onBlur={(campo) => {
                      const e = validar(dados);
                      setErros((atual) => ({ ...atual, [campo]: e[campo] }));
                    }}
                  />
                </Passo>
              )}

              {passo === 4 && tipo && data && hora && (
                <Passo titulo="Revise e confirme" sub="Confira se está tudo certo antes de confirmar." tituloRef={tituloRef}>
                  <dl className="divide-y divide-line ring-1 ring-line">
                    <LinhaRevisao rotulo="Consulta" valor={`${tipo.nome} · cerca de ${tipo.duracao} min`} onEditar={() => irPara(0)} />
                    <LinhaRevisao
                      rotulo="Profissional"
                      valor={profId === "qualquer" ? "Sem preferência (indicamos quem estiver livre)" : (getProfissional(profId)?.nome ?? "")}
                      onEditar={() => irPara(1)}
                    />
                    <LinhaRevisao rotulo="Data e hora" valor={`${formatarData(data, { semana: true })} às ${hora}`} onEditar={() => irPara(2)} />
                    <LinhaRevisao
                      rotulo="Paciente"
                      valor={`${dados.nome}\n${dados.whatsapp}${dados.email ? ` · ${dados.email}` : ""}\n${dados.primeiraVez ? "Primeira vez na Cliniz" : "Já é paciente"}`}
                      onEditar={() => irPara(3)}
                    />
                    {dados.observacao && <LinhaRevisao rotulo="Observação" valor={dados.observacao} onEditar={() => irPara(3)} />}
                  </dl>
                  <p className="mt-5 flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                    <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                    Ao confirmar, a consulta fica guardada em Meus agendamentos, onde você pode remarcar ou cancelar. Demonstração: nenhuma
                    consulta real será marcada.
                  </p>
                </Passo>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navegação: barra fixa no celular, rodapé do cartão no computador */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between gap-3 border-t border-line bg-white/95 px-5 py-4 backdrop-blur sm:px-10">
          <button
            type="button"
            onClick={() => passo > 0 && irPara(passo - 1)}
            disabled={passo === 0 || enviando}
            className="inline-flex min-h-12 items-center gap-2 px-4 font-semibold text-ink-soft transition hover:text-brand disabled:invisible"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Voltar
          </button>
          {passo < PASSOS.length - 1 ? (
            <button
              type="button"
              onClick={avancar}
              aria-disabled={!podeAvancar && passo !== 3}
              className={`group inline-flex min-h-12 items-center gap-2 px-7 font-semibold text-white transition-all duration-300 ${
                podeAvancar || passo === 3 ? "bg-brand shadow-glow hover:bg-brand-600" : "pointer-events-none bg-brand-300"
              }`}
            >
              Continuar
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={confirmar}
              disabled={enviando}
              className="inline-flex min-h-12 items-center gap-2 bg-brand px-7 font-semibold text-white shadow-glow transition hover:bg-brand-600 disabled:opacity-80"
            >
              {enviando ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Confirmando...
                </>
              ) : (
                <>
                  <Check className="size-4" aria-hidden />
                  {remarcando ? "Confirmar nova data" : "Confirmar agendamento"}
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <Resumo tipoId={tipoId} profId={profId} data={data} hora={hora} nome={dados.nome} />
    </div>
  );
}

/* ---------- Peças ---------- */

function Carregando() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]" aria-busy="true" aria-label="Carregando agendamento">
      <div className="bg-white p-8 shadow-lift ring-1 ring-line sm:p-10">
        <div className="h-2 w-full animate-pulse bg-ice" />
        <div className="mt-10 h-8 w-2/3 animate-pulse bg-ice" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse bg-mist" />
          ))}
        </div>
      </div>
      <div className="hidden h-80 animate-pulse bg-mist lg:block" />
    </div>
  );
}

function Marcador({ ativo }: { ativo: boolean }) {
  return (
    <span
      className={`mt-0.5 inline-flex size-6 shrink-0 items-center justify-center ring-1 transition-all duration-300 ${
        ativo ? "bg-brand text-white ring-brand" : "bg-white text-transparent ring-line group-hover:ring-brand-300"
      }`}
      aria-hidden
    >
      <Check className="size-3.5" />
    </span>
  );
}

function Passo({
  titulo,
  sub,
  children,
  tituloRef,
}: {
  titulo: string;
  sub: string;
  children: React.ReactNode;
  tituloRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div>
      <h2 ref={tituloRef} tabIndex={-1} className="font-display text-[1.9rem] leading-tight text-ink outline-none sm:text-[2.3rem]">
        {titulo}
      </h2>
      <p className="mt-2 text-muted">{sub}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Progresso({ passo, onIr }: { passo: number; onIr: (n: number) => void }) {
  return (
    <div className="border-b border-line px-5 pt-6 pb-5 sm:px-10">
      <div className="flex items-baseline justify-between text-sm">
        <p className="font-semibold text-ink">
          Passo {passo + 1} de {PASSOS.length}
          <span className="font-normal text-muted"> · {PASSOS[passo]}</span>
        </p>
        <p className="text-xs font-medium text-muted">{Math.round(((passo + 1) / PASSOS.length) * 100)}%</p>
      </div>
      <div className="mt-3 h-1 w-full bg-ice" role="progressbar" aria-valuemin={1} aria-valuemax={PASSOS.length} aria-valuenow={passo + 1} aria-label="Progresso do agendamento">
        <motion.div className="h-full bg-brand" initial={false} animate={{ width: `${((passo + 1) / PASSOS.length) * 100}%` }} transition={{ duration: 0.5, ease: EASE }} />
      </div>
      <ol className="mt-4 hidden grid-cols-5 gap-2 sm:grid">
        {PASSOS.map((p, i) => (
          <li key={p}>
            <button
              type="button"
              onClick={() => onIr(i)}
              disabled={i >= passo}
              className={`flex w-full items-center gap-2 text-left text-xs font-medium transition ${
                i < passo ? "text-brand hover:text-brand-700" : i === passo ? "text-ink" : "text-muted/70"
              }`}
            >
              <span
                className={`inline-flex size-5 shrink-0 items-center justify-center text-[0.68rem] font-semibold ${
                  i < passo ? "bg-brand text-white" : i === passo ? "bg-ink text-white" : "bg-ice text-muted"
                }`}
              >
                {i < passo ? <Check className="size-3" aria-hidden /> : i + 1}
              </span>
              {p}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DataHora({
  data,
  hora,
  profIds,
  existentes,
  ignorarId,
  onData,
  onHora,
}: {
  data: string | null;
  hora: string | null;
  profIds: string[];
  existentes: Agendamento[];
  ignorarId?: string;
  onData: (d: string) => void;
  onHora: (h: string) => void;
}) {
  const hoje = new Date();
  const base = data ? deIso(data) : hoje;
  const [mes, setMes] = useState({ ano: base.getFullYear(), mes: base.getMonth() });

  const primeiroMes = { ano: hoje.getFullYear(), mes: hoje.getMonth() };
  const limite = new Date();
  limite.setDate(limite.getDate() + JANELA_DIAS);
  const ultimoMes = { ano: limite.getFullYear(), mes: limite.getMonth() };
  const noPrimeiro = mes.ano === primeiroMes.ano && mes.mes === primeiroMes.mes;
  const noUltimo = mes.ano === ultimoMes.ano && mes.mes === ultimoMes.mes;

  const dias = useMemo(() => {
    const ini = new Date(mes.ano, mes.mes, 1);
    const total = new Date(mes.ano, mes.mes + 1, 0).getDate();
    const vazios = ini.getDay();
    const lista: ({ iso: string; dia: number; status: ReturnType<typeof statusDoDia> } | null)[] = Array(vazios).fill(null);
    for (let d = 1; d <= total; d++) {
      const iso = isoDia(new Date(mes.ano, mes.mes, d));
      lista.push({ iso, dia: d, status: statusDoDia(iso, profIds, existentes, ignorarId) });
    }
    return lista;
  }, [mes, profIds, existentes, ignorarId]);

  const slots = data ? horariosDoDia(data, profIds, existentes, ignorarId) : [];
  const manha = slots.filter((s) => s.hora < "12:00");
  const tarde = slots.filter((s) => s.hora >= "12:00");
  const hojeIsoStr = isoDia(hoje);

  function mudarMes(delta: number) {
    setMes((m) => {
      const d = new Date(m.ano, m.mes + delta, 1);
      return { ano: d.getFullYear(), mes: d.getMonth() };
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-2">
      <div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => mudarMes(-1)}
            disabled={noPrimeiro}
            aria-label="Mês anterior"
            className="inline-flex size-10 items-center justify-center ring-1 ring-line transition hover:bg-mist hover:ring-brand-300 disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <p className="font-display text-xl text-ink first-letter:uppercase" aria-live="polite">
            {MESES[mes.mes]} de {mes.ano}
          </p>
          <button
            type="button"
            onClick={() => mudarMes(1)}
            disabled={noUltimo}
            aria-label="Próximo mês"
            className="inline-flex size-10 items-center justify-center ring-1 ring-line transition hover:bg-mist hover:ring-brand-300 disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[0.7rem] font-semibold uppercase tracking-wide text-muted">
          {DIAS_SEMANA.map((d) => (
            <span key={d} className="py-1">
              {d}
            </span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1" role="grid" aria-label="Calendário">
          {dias.map((d, i) => {
            if (!d) return <span key={`v${i}`} />;
            const sel = d.iso === data;
            const livre = d.status === "livre";
            const rotulo = {
              livre: "disponível",
              lotado: "sem horários",
              fechado: "fechado",
              passado: "indisponível",
              fora: "agenda ainda não aberta",
            }[d.status];
            return (
              <button
                key={d.iso}
                type="button"
                disabled={!livre}
                onClick={() => onData(d.iso)}
                aria-pressed={sel}
                aria-label={`${formatarData(d.iso, { semana: true })}, ${rotulo}`}
                className={`relative flex aspect-square flex-col items-center justify-center text-sm font-medium transition-all duration-200 ${
                  sel
                    ? "bg-brand text-white shadow-glow"
                    : livre
                      ? "bg-white text-ink ring-1 ring-line hover:bg-brand-50 hover:ring-brand-300"
                      : d.status === "lotado"
                        ? "cursor-not-allowed bg-mist text-muted/60 line-through"
                        : "cursor-not-allowed text-muted/40"
                }`}
              >
                {d.dia}
                {d.iso === hojeIsoStr && <span className={`absolute bottom-1.5 h-0.5 w-3 ${sel ? "bg-white" : "bg-accent"}`} aria-hidden />}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-3 bg-white ring-1 ring-line" aria-hidden /> Disponível
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 bg-mist" aria-hidden /> Sem horários
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 bg-accent" aria-hidden /> Hoje
          </span>
        </div>
      </div>

      <div>
        {!data ? (
          <div className="flex h-full min-h-56 flex-col items-center justify-center bg-mist p-8 text-center ring-1 ring-line">
            <CalendarDays className="size-8 text-brand-300" aria-hidden />
            <p className="mt-3 font-semibold text-ink">Escolha um dia no calendário</p>
            <p className="mt-1 text-sm text-muted">Os horários livres aparecem aqui.</p>
          </div>
        ) : (
          <motion.div key={data} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <p className="font-semibold text-ink first-letter:uppercase">{formatarData(data, { semana: true })}</p>
            <p className="mt-0.5 text-sm text-muted">{slots.filter((s) => s.livre).length} horários livres</p>
            {[
              { nome: "Manhã", lista: manha },
              { nome: "Tarde", lista: tarde },
            ]
              .filter((g) => g.lista.length)
              .map((g) => (
                <div key={g.nome} className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{g.nome}</p>
                  <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {g.lista.map((s) => {
                      const sel = s.hora === hora;
                      return (
                        <button
                          key={s.hora}
                          type="button"
                          disabled={!s.livre}
                          onClick={() => onHora(s.hora)}
                          aria-pressed={sel}
                          aria-label={`${s.hora}${s.livre ? "" : ", ocupado"}`}
                          className={`min-h-11 text-sm font-semibold tabular-nums transition-all duration-200 ${
                            sel
                              ? "bg-brand text-white shadow-glow"
                              : s.livre
                                ? "bg-white text-ink ring-1 ring-line hover:bg-brand-50 hover:text-brand hover:ring-brand-300"
                                : "cursor-not-allowed bg-mist text-muted/50 line-through"
                          }`}
                        >
                          {s.hora}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

const campoCls = (erro?: string) =>
  `mt-2 block w-full bg-mist px-4 py-3.5 text-ink ring-1 transition placeholder:text-muted/60 focus:bg-white focus:ring-2 focus:outline-none ${
    erro ? "ring-danger/70 focus:ring-danger" : "ring-line focus:ring-brand"
  }`;

function Erro({ id, msg }: { id: string; msg?: string }) {
  return (
    <AnimatePresence initial={false}>
      {msg && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 text-sm font-medium text-danger"
          role="alert"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Formulario({
  dados,
  erros,
  onChange,
  onBlur,
}: {
  dados: Dados;
  erros: Erros;
  onChange: <K extends keyof Dados>(campo: K, valor: Dados[K]) => void;
  onBlur: (campo: keyof Dados) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="campo-nome" className="text-sm font-semibold text-ink">
          Nome completo
        </label>
        <input
          id="campo-nome"
          value={dados.nome}
          onChange={(e) => onChange("nome", e.target.value)}
          onBlur={() => onBlur("nome")}
          autoComplete="name"
          placeholder="Como está no documento"
          aria-invalid={Boolean(erros.nome)}
          aria-describedby="erro-nome"
          className={campoCls(erros.nome)}
        />
        <Erro id="erro-nome" msg={erros.nome} />
      </div>
      <div>
        <label htmlFor="campo-whatsapp" className="text-sm font-semibold text-ink">
          WhatsApp
        </label>
        <input
          id="campo-whatsapp"
          value={dados.whatsapp}
          onChange={(e) => onChange("whatsapp", mascararTelefone(e.target.value))}
          onBlur={() => onBlur("whatsapp")}
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(63) 99999-9999"
          aria-invalid={Boolean(erros.whatsapp)}
          aria-describedby="erro-whatsapp"
          className={campoCls(erros.whatsapp)}
        />
        <Erro id="erro-whatsapp" msg={erros.whatsapp} />
      </div>
      <div>
        <label htmlFor="campo-email" className="text-sm font-semibold text-ink">
          E-mail <span className="font-normal text-muted">(opcional)</span>
        </label>
        <input
          id="campo-email"
          type="email"
          value={dados.email}
          onChange={(e) => onChange("email", e.target.value)}
          onBlur={() => onBlur("email")}
          autoComplete="email"
          placeholder="voce@email.com"
          aria-invalid={Boolean(erros.email)}
          aria-describedby="erro-email"
          className={campoCls(erros.email)}
        />
        <Erro id="erro-email" msg={erros.email} />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-semibold text-ink">É a sua primeira vez na Cliniz?</legend>
        <div className="mt-2 grid grid-cols-2 gap-3" id="campo-primeiraVez" tabIndex={-1}>
          {[
            { v: true, t: "Sim, primeira vez" },
            { v: false, t: "Não, já sou paciente" },
          ].map((o) => {
            const sel = dados.primeiraVez === o.v;
            return (
              <button
                key={o.t}
                type="button"
                aria-pressed={sel}
                onClick={() => onChange("primeiraVez", o.v)}
                className={`flex min-h-12 items-center justify-center gap-2 px-3 text-sm font-semibold transition-all duration-200 ${
                  sel ? "bg-brand text-white shadow-glow" : `bg-white text-ink ring-1 hover:bg-mist ${erros.primeiraVez ? "ring-danger/70" : "ring-line hover:ring-brand-300"}`
                }`}
              >
                {sel && <Check className="size-4" aria-hidden />}
                {o.t}
              </button>
            );
          })}
        </div>
        <Erro id="erro-primeiraVez" msg={erros.primeiraVez} />
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="campo-observacao" className="text-sm font-semibold text-ink">
          Observação <span className="font-normal text-muted">(opcional)</span>
        </label>
        <textarea
          id="campo-observacao"
          rows={3}
          maxLength={400}
          value={dados.observacao}
          onChange={(e) => onChange("observacao", e.target.value)}
          placeholder="Algo que a equipe precisa saber? Ex.: tenho medo de dentista, sinto dor em um dente."
          className={`${campoCls()} resize-none`}
        />
        <p className="mt-1.5 text-right text-xs text-muted">{dados.observacao.length}/400</p>
      </div>
    </div>
  );
}

function LinhaRevisao({ rotulo, valor, onEditar }: { rotulo: string; valor: string; onEditar: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 p-5">
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{rotulo}</dt>
        <dd className="mt-1.5 font-medium whitespace-pre-line text-ink first-letter:uppercase">{valor}</dd>
      </div>
      <button
        type="button"
        onClick={onEditar}
        className="inline-flex shrink-0 items-center gap-1.5 px-2 py-1 text-sm font-semibold text-brand transition hover:bg-brand-50"
        aria-label={`Alterar ${rotulo.toLowerCase()}`}
      >
        <Pencil className="size-3.5" aria-hidden />
        Alterar
      </button>
    </div>
  );
}

function Resumo({ tipoId, profId, data, hora, nome }: { tipoId: string | null; profId: string | null; data: string | null; hora: string | null; nome: string }) {
  const tipo = getTipo(tipoId);
  const prof = profId === "qualquer" ? null : getProfissional(profId);
  const itens = [
    { icone: Stethoscope, rotulo: "Consulta", valor: tipo?.nome },
    { icone: User, rotulo: "Profissional", valor: profId === "qualquer" ? "Sem preferência" : prof?.nome },
    { icone: CalendarDays, rotulo: "Data", valor: data ? formatarData(data, { semana: true }) : undefined },
    { icone: Clock, rotulo: "Horário", valor: hora ?? undefined },
    { icone: ListChecks, rotulo: "Paciente", valor: nome.trim() || undefined },
  ];
  return (
    <aside className="hidden lg:block" aria-label="Resumo do agendamento">
      <div className="sticky top-24 bg-ink p-7 text-white shadow-lift">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">Resumo</p>
        <p className="mt-2 font-display text-2xl">Sua consulta</p>
        <ul className="mt-6 space-y-4">
          {itens.map((it) => (
            <li key={it.rotulo} className="flex items-start gap-3">
              <span className={`inline-flex size-9 shrink-0 items-center justify-center transition-colors ${it.valor ? "bg-brand text-white" : "bg-white/10 text-white/50"}`}>
                <it.icone className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-white/55">{it.rotulo}</span>
                <span className={`block text-sm font-medium first-letter:uppercase ${it.valor ? "text-white" : "text-white/40"}`}>
                  {it.valor ?? "A escolher"}
                </span>
              </span>
            </li>
          ))}
        </ul>
        {prof && (
          <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
            <span className="relative size-12 overflow-hidden">
              <Image src={prof.foto} alt="" fill sizes="48px" className="object-cover" style={{ objectPosition: prof.foco }} />
            </span>
            <span className="text-sm text-white/75">{prof.papel}</span>
          </div>
        )}
        <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/55">
          Demonstração: nenhum agendamento real é feito. Os dados ficam só neste navegador.
        </p>
      </div>
    </aside>
  );
}

function Sucesso({
  a,
  remarcado,
  onNovo,
  tituloRef,
}: {
  a: Agendamento;
  remarcado: boolean;
  onNovo: () => void;
  tituloRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const tipo = getTipo(a.tipoId);
  const prof = getProfissional(a.profissionalId);
  return (
    <motion.div
      id="agendamento"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mx-auto max-w-2xl scroll-mt-24 bg-white shadow-lift ring-1 ring-line"
    >
      <div className="bg-brand px-6 py-12 text-center text-white sm:px-10">
        <svg viewBox="0 0 52 52" className="mx-auto size-16" aria-hidden>
          <rect x="1" y="1" width="50" height="50" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
          <path className="check-draw" d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" />
        </svg>
        <h2 ref={tituloRef} tabIndex={-1} className="mt-6 font-display text-4xl outline-none sm:text-5xl">
          {remarcado ? "Consulta remarcada" : "Consulta agendada"}
        </h2>
        <p className="mt-3 text-white/80">Enviamos um lembrete no dia anterior. Até breve, {a.nome.split(" ")[0]}!</p>
        <p className="mt-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 font-mono text-sm tracking-wider ring-1 ring-white/25">
          Código <strong className="font-semibold">{a.codigo}</strong>
        </p>
      </div>
      <dl className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
        {[
          { r: "Consulta", v: tipo?.nome },
          { r: "Profissional", v: `${prof?.nome}${a.semPreferencia ? " (indicado para você)" : ""}` },
          { r: "Data", v: formatarData(a.data, { semana: true }) },
          { r: "Horário", v: `${a.hora} · cerca de ${a.duracao} min` },
        ].map((it, i) => (
          <div key={it.r} className={`p-6 text-center ${i % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${i > 1 ? "sm:border-t sm:border-line" : ""}`}>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{it.r}</dt>
            <dd className="mt-1.5 font-semibold text-ink first-letter:uppercase">{it.v}</dd>
          </div>
        ))}
      </dl>
      <div className="grid gap-3 border-t border-line p-6 sm:grid-cols-2 sm:p-8">
        <button
          type="button"
          onClick={() => baixarIcs(a)}
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-brand px-6 font-semibold text-white shadow-glow transition hover:bg-brand-600"
        >
          <CalendarPlus className="size-4" aria-hidden />
          Adicionar à agenda
        </button>
        <a
          href={linkWhatsappAgendamento(a)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 font-semibold text-ink ring-1 ring-line transition hover:text-brand hover:ring-brand-300"
        >
          <WhatsappIcon className="size-4" />
          Falar no WhatsApp
        </a>
        <Link
          href="/agendar/meus"
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-ice px-6 font-semibold text-brand transition hover:bg-brand-100"
        >
          <ListChecks className="size-4" aria-hidden />
          Meus agendamentos
        </Link>
        <button
          type="button"
          onClick={onNovo}
          className="inline-flex min-h-12 items-center justify-center gap-2 px-6 font-semibold text-ink-soft ring-1 ring-line transition hover:text-brand hover:ring-brand-300"
        >
          Fazer outro agendamento
        </button>
      </div>
      <p className="flex items-start justify-center gap-2 border-t border-line bg-mist px-6 py-4 text-center text-xs leading-relaxed text-muted">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        Demonstração: nenhuma consulta real foi marcada e nenhum dado saiu do seu navegador.
      </p>
    </motion.div>
  );
}
