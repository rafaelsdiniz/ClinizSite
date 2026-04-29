"use client"

import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { Reveal } from "@/components/reveal"

const testimonials = [
  {
    name: "Maria Santos",
    role: "Paciente há 5 anos",
    content:
      "Desde que comecei a me tratar na Cliniz, minha relação com o dentista mudou. Profissionais atenciosos e um ambiente que nos deixa à vontade do começo ao fim.",
    rating: 5,
  },
  {
    name: "Carlos Oliveira",
    role: "Implante dentário",
    content:
      "Fiz meu implante aqui e o resultado superou todas as expectativas. A equipe explicou cada etapa e me senti seguro durante todo o tratamento.",
    rating: 5,
  },
  {
    name: "Ana Paula Lima",
    role: "Clareamento dental",
    content:
      "Meu sorriso nunca esteve tão bonito. O clareamento ficou natural e duradouro. Recomendo a quem quer um cuidado de verdade, sem pressa.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative py-24 lg:py-36 overflow-hidden bg-[oklch(0.18_0.04_245)] text-white"
    >
      <div className="absolute inset-0 -z-0">
        <Image
          src="/odonto2.jpg"
          alt=""
          fill
          className="object-cover opacity-25"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.04_245)]/85 via-[oklch(0.18_0.04_245)]/85 to-[oklch(0.18_0.04_245)]/95" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <Reveal variant="up">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium mb-5">
              Depoimentos
            </p>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight leading-[1.15] text-balance text-white">
              Histórias reais de quem{" "}
              <span className="italic text-accent font-normal">confiou</span> em nós.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={200}>
            <p className="mt-5 text-white/65 leading-relaxed">
              A satisfação dos nossos pacientes é o termômetro do nosso trabalho.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              variant="up"
              delay={index * 120}
              className="h-full"
            >
              <div className="relative h-full bg-white/[0.04] backdrop-blur-md rounded-2xl p-8 lg:p-10 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500">
                <Quote className="h-9 w-9 text-accent/30 absolute top-6 right-6" />

                <div className="flex gap-0.5 mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-white/85 leading-relaxed mb-8 text-[15px]">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-base font-serif text-white">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-white/55 mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
