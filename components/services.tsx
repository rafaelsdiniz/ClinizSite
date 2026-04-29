"use client"

import Image from "next/image"
import { Sparkles, Shield, Smile, Stethoscope, Crown, Baby, ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

const services = [
  {
    icon: Sparkles,
    title: "Clareamento Dental",
    image: "/clareamento.webp",
    description:
      "Protocolo profissional para um sorriso mais branco e radiante, com resultados duradouros e sem sensibilidade.",
  },
  {
    icon: Shield,
    title: "Implantes Dentários",
    image: "/implantes.jpg",
    description:
      "Tecnologia de ponta na substituição de dentes perdidos, com naturalidade, segurança e estética impecável.",
  },
  {
    icon: Smile,
    title: "Ortodontia & Alinhadores",
    image: "/ortodontia.avif",
    description:
      "Aparelhos tradicionais ou alinhadores invisíveis sob medida, para um alinhamento confortável.",
  },
  {
    icon: Stethoscope,
    title: "Limpeza & Prevenção",
    image: "/limpeza.png",
    description:
      "Higienização profissional e plano preventivo personalizado para manter sua saúde bucal sempre em dia.",
  },
  {
    icon: Crown,
    title: "Próteses & Lentes",
    image: "/proteses.webp",
    description:
      "Próteses fixas, removíveis e lentes de contato dental — soluções de alto padrão com encaixe perfeito.",
  },
  {
    icon: Baby,
    title: "Odontopediatria",
    image: "/odontopediatria.jpg",
    description:
      "Atendimento especializado e acolhedor, transformando a primeira consulta numa experiência tranquila.",
  },
]

export function Services() {
  return (
    <section
      id="servicos"
      className="py-24 lg:py-32 lg:min-h-screen lg:flex lg:flex-col lg:justify-center bg-card relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <Reveal variant="up">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium mb-5">
              Especialidades
            </p>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-foreground tracking-tight leading-[1.15] text-balance">
              Tratamentos completos,{" "}
              <span className="italic text-accent font-normal">desenhados</span> para você.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={200}>
            <p className="mt-5 text-foreground/65 leading-relaxed">
              Da rotina preventiva à reabilitação estética. Equipamentos modernos e
              especialistas dedicados em cada etapa.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal
                key={service.title}
                variant="up"
                delay={index * 80}
                className="h-full"
              >
                <article className="group relative h-full bg-background rounded-2xl overflow-hidden border border-border/60 shadow-[0_2px_24px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_-30px_rgba(20,40,80,0.25)] transition-all duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />

                    <div className="absolute top-4 left-4 flex items-center justify-center w-11 h-11 rounded-full bg-background/90 backdrop-blur-sm border border-white/40 shadow-sm">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>

                    <div className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full bg-background/0 backdrop-blur-0 opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-background/90 group-hover:backdrop-blur-sm">
                      <ArrowUpRight className="h-4 w-4 text-foreground" />
                    </div>
                  </div>

                  <div className="p-7 lg:p-8">
                    <h3 className="font-serif text-xl lg:text-[1.4rem] text-foreground mb-3 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-foreground/65 leading-relaxed text-[15px]">
                      {service.description}
                    </p>
                  </div>

                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-700 group-hover:w-full" />
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
