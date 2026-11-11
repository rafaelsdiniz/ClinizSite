import type { Metadata } from "next";
import { PageHero } from "@/components/sections";
import { LinkPreferencias } from "@/components/cookie-notice";
import { GradeFina } from "@/components/decor";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidade e cookies",
  description: "Como a Cliniz trata os seus dados pessoais e usa cookies neste site.",
  alternates: { canonical: "/privacidade" },
};

const SECOES = [
  {
    id: "quem-somos",
    titulo: "1. Quem somos",
    texto: [
      `Esta política explica como a Cliniz Odontologia trata dados pessoais no site ${SITE.url.replace("https://", "")}. A clínica fica na ${SITE.enderecoCompleto}.`,
      "Seguimos a Lei Geral de Proteção de Dados (Lei 13.709/2018). Escrevemos tudo em linguagem simples para que você entenda o que acontece com as suas informações.",
    ],
  },
  {
    id: "dados",
    titulo: "2. Quais dados coletamos",
    texto: [
      "No agendamento online: nome, WhatsApp, e-mail (opcional), se é a sua primeira vez na clínica e observações que você queira deixar. Esses dados ficam guardados no seu próprio navegador para você consultar, remarcar ou cancelar.",
      "No formulário de contato: as informações que você digitar são usadas apenas para montar a mensagem que você envia pelo WhatsApp.",
      "Navegação: com a sua permissão, dados de uso agregados, como páginas visitadas e tempo de visita, sem identificar você.",
    ],
  },
  {
    id: "finalidade",
    titulo: "3. Para que usamos",
    texto: [
      "Para organizar e confirmar consultas, enviar lembretes e responder às suas dúvidas.",
      "Para melhorar o site, quando você permite os cookies de desempenho.",
      "Não vendemos nem compartilhamos seus dados com terceiros para fins comerciais. Dados de saúde tratados na clínica seguem o sigilo profissional.",
    ],
  },
  {
    id: "cookies",
    titulo: "4. Cookies",
    texto: [
      "Cookies são pequenos arquivos guardados no seu navegador. Usamos três categorias:",
      "Essenciais: mantêm o site funcionando, lembram a sua escolha sobre cookies e guardam os agendamentos feitos neste navegador. Não podem ser desligados.",
      "Desempenho: ajudam a entender, de forma agregada, como o site é usado. Só são ativados se você permitir.",
      "Marketing: permitem mostrar conteúdos da Cliniz em outros sites. Só são ativados se você permitir.",
    ],
  },
  {
    id: "direitos",
    titulo: "5. Seus direitos",
    texto: [
      "Você pode pedir acesso, correção ou exclusão dos seus dados, saber com quem eles foram compartilhados e revogar consentimentos a qualquer momento.",
      "Os agendamentos guardados no navegador podem ser apagados por você limpando os dados do site nas configurações do navegador.",
    ],
  },
  {
    id: "guarda",
    titulo: "6. Por quanto tempo guardamos",
    texto: [
      "Mantemos os dados apenas pelo tempo necessário para as finalidades acima ou pelo prazo exigido por lei, como no caso do prontuário odontológico.",
    ],
  },
  {
    id: "contato",
    titulo: "7. Fale com a gente",
    texto: ["Para qualquer pedido sobre os seus dados, fale com a recepção pelo WhatsApp. Respondemos em horário de atendimento."],
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        compacto
        trilha={[{ href: "/", label: "Início" }, { label: "Privacidade" }]}
        eyebrow="Transparência"
        titulo="Privacidade e"
        destaque="cookies"
        intro="O que coletamos, por que coletamos e como você controla as suas informações."
        imagem="/img/recepcao.webp"
        imagemAlt="Recepção da clínica"
      />
      <section className="section-y relative isolate overflow-hidden">
        <GradeFina className="-z-10" mascara="linear-gradient(to bottom, black, transparent 50%)" />
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <nav aria-label="Nesta página" className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">Nesta página</p>
              <ul className="mt-4 space-y-1 border-l border-line">
                {SECOES.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted transition hover:border-brand hover:text-brand">
                      {s.titulo}
                    </a>
                  </li>
                ))}
              </ul>
              <LinkPreferencias className="mt-8 min-h-11 bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-600" />
            </div>
          </nav>
          <article className="lg:col-span-8">
            <p className="text-sm text-muted">Última atualização: novembro de 2026.</p>
            {SECOES.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-line py-10 first:pt-6 last:border-b-0">
                <h2 className="font-display text-3xl text-ink">{s.titulo}</h2>
                <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
                  {s.texto.map((t) => (
                    <p key={t.slice(0, 30)}>{t}</p>
                  ))}
                </div>
                {s.id === "contato" && (
                  <a href={whatsappLink("Tenho uma dúvida sobre privacidade.")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center bg-ice px-5 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white">
                    Falar no WhatsApp
                  </a>
                )}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
