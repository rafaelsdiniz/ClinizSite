import type { Metadata } from "next";
import { PadraoLogo } from "@/components/decor";
import { MeusAgendamentos } from "@/components/agendamento/meus";
import { PageHero } from "@/components/sections";

export const metadata: Metadata = {
  title: "Meus agendamentos",
  description: "Veja, remarque ou cancele as suas consultas na Cliniz.",
  alternates: { canonical: "/agendar/meus" },
  robots: { index: false },
};

export default function MeusPage() {
  return (
    <>
      <PageHero
        trilha={[{ href: "/", label: "Início" }, { href: "/agendar", label: "Agendamento" }, { label: "Meus agendamentos" }]}
        compacto
        eyebrow="Área do paciente"
        titulo="Meus"
        destaque="agendamentos"
        intro="Consulte, remarque ou cancele as suas consultas."
        imagem="/img/sala.webp"
        imagemAlt="Sala clínica"
        foco="50% 55%"
      />
      <section className="relative isolate overflow-hidden bg-white pt-4 pb-24 sm:pb-32">
        <PadraoLogo className="-z-10 text-brand-100" />
        <div className="container-site">
          <MeusAgendamentos />
        </div>
      </section>
    </>
  );
}
