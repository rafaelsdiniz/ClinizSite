export const ENDERECO = {
  rua: "Rua Antônio de Albuquerque, 845",
  complemento: "Sala 1102",
  bairro: "Savassi",
  cidade: "Belo Horizonte",
  uf: "MG",
  cep: "30112-011",
} as const;

export const SITE = {
  nome: "Cliniz",
  nomeCompleto: "Cliniz Odontologia",
  url: "https://cliniz.com.br",
  cidade: "Belo Horizonte, MG",
  enderecoLinha1: `${ENDERECO.rua}, ${ENDERECO.complemento}`,
  enderecoLinha2: `${ENDERECO.bairro}, ${ENDERECO.cidade}, ${ENDERECO.uf}`,
  enderecoCompleto: `${ENDERECO.rua}, ${ENDERECO.complemento}, ${ENDERECO.bairro}, ${ENDERECO.cidade}, ${ENDERECO.uf}, CEP ${ENDERECO.cep}`,
  descricao:
    "Clínica odontológica na Savassi, em Belo Horizonte. Implantes, lentes de contato dental, clareamento, ortodontia e alinhadores invisíveis com planejamento digital e agendamento online.",
  autorUrl: "https://www.rafaeldiniz.dev",
} as const;

const WHATSAPP_NUMERO = "5563992425036";
export const WHATSAPP_MENSAGEM = "Olá! Vim pelo site da Cliniz.";

/** Link do WhatsApp usado em todo o site. */
export function whatsappLink(extra?: string) {
  const texto = extra ? `${WHATSAPP_MENSAGEM} ${extra}` : WHATSAPP_MENSAGEM;
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

/** Link do mapa (busca pelo endereço). */
export const MAPA_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ENDERECO.rua}, ${ENDERECO.bairro}, ${ENDERECO.cidade} ${ENDERECO.uf}`)}`;

export const NAV = [
  { href: "/tratamentos", label: "Tratamentos" },
  { href: "/sobre", label: "A clínica" },
  { href: "/sobre#equipe", label: "Equipe" },
  { href: "/contato", label: "Contato" },
] as const;

export const HORARIOS = [
  { dias: "Segunda a sexta", horas: "8h às 19h" },
  { dias: "Sábado", horas: "8h às 12h" },
  { dias: "Domingo e feriados", horas: "Fechado" },
] as const;
