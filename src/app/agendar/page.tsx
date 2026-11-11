import type { Metadata } from "next";
import { GradeFina } from "@/components/decor";
import Link from "next/link";
import { ListChecks } from "lucide-react";
import { AgendamentoWizard } from "@/components/agendamento/wizard";
import { PageHero } from "@/components/sections";

export const metadata: Metadata = {
  title: "Agendar consulta",
  description: "Agende sua consulta na Cliniz em poucos passos: escolha o tipo de consulta, o profissional, o dia e o horário.",
  alternates: { canonical: "/agendar" },
};

export default function AgendarPage() {
  return (
    <>
      <PageHero
        trilha={[{ href: "/", label: "Início" }, { label: "Agendar consulta" }]}
        compacto
        eyebrow="Agendamento online"
        titulo="Agende sua"
        destaque="consulta"
        intro="Escolha o tipo de consulta, o profissional, o dia e o horário. Leva menos de dois minutos."
        imagem="/img/clinica.webp"
        imagemAlt="Sala clínica clara com cadeira odontológica"
        foco="50% 55%"
      >
        <Link
          href="/agendar/meus"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white"
        >
          <ListChecks className="size-4" aria-hidden />
          Ver meus agendamentos
        </Link>
      </PageHero>
      <section className="relative isolate overflow-hidden bg-white pt-4 pb-24 sm:pb-32">
        <GradeFina className="-z-10" mascara="linear-gradient(to bottom, black, transparent 70%)" />
        <div className="container-site">
          <AgendamentoWizard />
        </div>
      </section>
    </>
  );
}
