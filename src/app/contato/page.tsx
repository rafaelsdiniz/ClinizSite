import type { Metadata } from "next";
import { Clock, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContatoForm } from "@/components/contato-form";
import { FaqList, PageHero } from "@/components/sections";
import { SectionTitle, WhatsappButton } from "@/components/ui";
import { WhatsappIcon } from "@/components/whatsapp-icon";
import { PERGUNTAS_GERAIS } from "@/lib/conteudo";
import { HORARIOS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato e agendamento",
  description: "Agende sua avaliação na Cliniz pelo WhatsApp. Atendimento de segunda a sábado em Palmas, TO.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title={
          <>
            Vamos marcar a sua <em className="text-brand">avaliação</em>
          </>
        }
        intro="O jeito mais rápido de falar com a Cliniz é pelo WhatsApp. Se preferir, preencha o formulário e a mensagem já sai pronta."
      />

      <section className="pb-24 sm:pb-32">
        <div className="container-site grid gap-6 lg:grid-cols-12">
          <Reveal className="rounded-[2rem] bg-white p-7 shadow-lift ring-1 ring-line sm:p-10 lg:col-span-7">
            <h2 className="font-display text-4xl text-ink">Envie uma mensagem</h2>
            <p className="mt-2 mb-8 text-muted">Leva menos de um minuto.</p>
            <ContatoForm />
          </Reveal>

          <div className="grid gap-6 lg:col-span-5">
            <Reveal delay={0.08} className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-900 p-8 text-white sm:p-10">
              <div className="pointer-events-none absolute -top-16 -right-16 -z-10 size-56 rounded-full bg-brand-400/50 blur-3xl" aria-hidden />
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                <WhatsappIcon className="size-6" />
              </span>
              <h2 className="mt-6 font-display text-4xl leading-tight">WhatsApp</h2>
              <p className="mt-2 text-brand-100/90">Agendamentos, dúvidas e remarcações.</p>
              <WhatsappButton variant="white" className="mt-7 w-full sm:w-auto">
                Abrir conversa
              </WhatsappButton>
            </Reveal>

            <Reveal delay={0.14} className="rounded-[2rem] bg-ice p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-brand" aria-hidden />
                <h2 className="text-lg font-semibold text-ink">Horários</h2>
              </div>
              <dl className="mt-5 divide-y divide-line/80">
                {HORARIOS.map((h) => (
                  <div key={h.dias} className="flex justify-between gap-4 py-3">
                    <dt className="text-ink-soft">{h.dias}</dt>
                    <dd className="font-semibold text-ink">{h.horas}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex items-center gap-3">
                <MapPin className="size-5 text-brand" aria-hidden />
                <h2 className="text-lg font-semibold text-ink">Localização</h2>
              </div>
              <p className="mt-3 text-ink-soft">{SITE.cidadeExtenso}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist py-24 sm:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionTitle eyebrow="Antes de agendar" title={<>Perguntas <em className="text-brand">frequentes</em></>} />
          </Reveal>
          <div className="lg:col-span-8">
            <FaqList perguntas={PERGUNTAS_GERAIS} />
          </div>
        </div>
      </section>
    </>
  );
}
