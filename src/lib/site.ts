export const SITE = {
  nome: "Cliniz",
  nomeCompleto: "Cliniz Odontologia",
  url: "https://cliniz.com.br",
  cidade: "Palmas, TO",
  cidadeExtenso: "Palmas, Tocantins",
  descricao:
    "Clínica odontológica em Palmas, TO. Implantes, lentes de contato dental, clareamento, ortodontia e alinhadores invisíveis com planejamento digital e atendimento sem pressa.",
  autorUrl: "https://www.rafaeldiniz.dev",
} as const;

const WHATSAPP_NUMERO = "5563992425036";
export const WHATSAPP_MENSAGEM = "Olá! Vi o site da Cliniz e quero um site assim para o meu negócio.";

/** Link do WhatsApp. Todo CTA do site passa por aqui. */
export function whatsappLink(extra?: string) {
  const texto = extra ? `${WHATSAPP_MENSAGEM}\n\n${extra}` : WHATSAPP_MENSAGEM;
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

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
