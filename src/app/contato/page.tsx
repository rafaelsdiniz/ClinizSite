import type { Metadata } from "next";
import { GradeFina, MarcaDagua, PadraoLogo } from "@/components/decor";
import { CalendarCheck, Clock, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContatoForm } from "@/components/contato-form";
import { StatusAberto } from "@/components/status-aberto";
import { FaqList, PageHero } from "@/components/sections";
import { AgendarButton, SectionTitle, WhatsappButton } from "@/components/ui";
import { WhatsappIcon } from "@/components/whatsapp-icon";
import { PERGUNTAS_GERAIS } from "@/lib/conteudo";
import { ENDERECO, HORARIOS, MAPA_URL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Agende sua consulta online ou fale com a Cliniz pelo WhatsApp. Atendimento de segunda a sábado na Savassi, em Belo Horizonte.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        trilha={[{ href: "/", label: "Início" }, { label: "Contato" }]}
        compacto
        eyebrow="Contato"
        titulo="Fale com a"
        destaque="Cliniz"
        intro="Agende online em poucos passos ou mande uma mensagem. A recepção responde em horário de atendimento."
        imagem="/img/recepcao.webp"
        imagemAlt="Recepção da clínica"
      />

      <section className="section-y relative isolate overflow-hidden">
        <GradeFina className="-z-10" mascara="linear-gradient(to bottom, transparent, black 40%, transparent)" />
        <MarcaDagua icone="sorriso" className="bottom-10 left-1/2 -z-10 hidden h-48 w-[40rem] -translate-x-1/2 text-brand-100 md:block" forca={30} />
        <div className="container-site">
          <ul className="grid gap-5 md:grid-cols-3">
            <Reveal as="li" className="flex h-full flex-col items-center bg-brand p-8 text-center text-white shadow-glow">
              <CalendarCheck className="size-7" aria-hidden />
              <h2 className="mt-4 font-display text-2xl">Agendamento online</h2>
              <p className="mt-2 flex-1 text-white/80">Escolha consulta, profissional, dia e horário.</p>
              <AgendarButton variant="white" className="mt-6 w-full">
                Agendar agora
              </AgendarButton>
            </Reveal>
            <Reveal as="li" delay={0.08} className="flex h-full flex-col items-center bg-white p-8 text-center shadow-soft ring-1 ring-line">
              <WhatsappIcon className="size-7 text-brand" />
              <h2 className="mt-4 font-display text-2xl text-ink">WhatsApp</h2>
              <p className="mt-2 flex-1 text-muted">Dúvidas, remarcações e orientações.</p>
              <WhatsappButton className="mt-6 w-full">Abrir conversa</WhatsappButton>
            </Reveal>
            <Reveal as="li" delay={0.16} className="flex h-full flex-col items-center bg-white p-8 text-center shadow-soft ring-1 ring-line">
              <Clock className="size-7 text-brand" aria-hidden />
              <h2 className="mt-4 font-display text-2xl text-ink">Horários</h2>
              <StatusAberto className="mt-2 text-ink-soft" />
              <dl className="mt-3 w-full flex-1 space-y-1.5 text-sm">
                {HORARIOS.map((h) => (
                  <div key={h.dias} className="flex justify-between gap-3">
                    <dt className="text-muted">{h.dias}</dt>
                    <dd className="font-semibold text-ink">{h.horas}</dd>
                  </div>
                ))}
              </dl>
              <a href={MAPA_URL} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-start gap-1.5 text-left text-sm text-muted transition hover:text-brand">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span>
                  {SITE.enderecoLinha1}, {SITE.enderecoLinha2}, CEP {ENDERECO.cep}
                </span>
              </a>
            </Reveal>
          </ul>

          <Reveal className="mx-auto mt-16 max-w-3xl bg-white p-7 shadow-lift ring-1 ring-line sm:p-12">
            <div className="text-center">
              <h2 className="font-display text-4xl text-ink">Envie uma mensagem</h2>
              <p className="mt-2 text-muted">A mensagem abre no WhatsApp, já preenchida.</p>
            </div>
            <div className="mt-10">
              <ContatoForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y relative isolate overflow-hidden bg-mist">
        <PadraoLogo className="-z-10 text-brand-200/60" />
        <div className="container-site">
          <Reveal>
            <SectionTitle eyebrow="Antes de agendar" title={<>Perguntas <em className="text-brand">frequentes</em></>} />
          </Reveal>
          <div className="mt-12">
            <FaqList perguntas={PERGUNTAS_GERAIS} />
          </div>
        </div>
      </section>
    </>
  );
}
