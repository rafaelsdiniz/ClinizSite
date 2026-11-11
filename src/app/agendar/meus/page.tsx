import type { Metadata } from "next";
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
        compacto
        eyebrow="Área do paciente"
        titulo="Meus"
        destaque="agendamentos"
        intro="Consulte, remarque ou cancele as suas consultas."
        imagem="/img/sala.webp"
        imagemAlt="Sala clínica"
        foco="50% 55%"
      />
      <section className="bg-white pt-4 pb-24 sm:pb-32">
        <div className="container-site">
          <MeusAgendamentos />
        </div>
      </section>
    </>
  );
}
