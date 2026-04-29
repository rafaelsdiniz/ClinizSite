import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { Reveal } from "@/components/reveal"

const features = [
  "Equipe altamente qualificada e em constante atualização",
  "Equipamentos digitais de última geração",
  "Ambiente acolhedor, pensado nos mínimos detalhes",
  "Atendimento humanizado e personalizado",
  "Protocolos rigorosos de biossegurança",
  "Planos de pagamento flexíveis",
]

export function About() {
  return (
    <section id="sobre" className="py-24 lg:py-36 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <Reveal variant="scale">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/odonto1.jpg"
                  alt="Profissional Cliniz em atendimento"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-card rounded-xl p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] border border-border max-w-xs hidden sm:block">
                <p className="font-serif text-4xl text-foreground">15<span className="text-accent">+</span></p>
                <p className="text-foreground/65 mt-1 text-sm">
                  Anos transformando sorrisos
                </p>
              </div>
              <div className="absolute -top-6 -left-6 lg:-left-10 bg-card rounded-xl p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] border border-border hidden md:block">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm text-foreground">Atendendo agora</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal variant="up">
              <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium mb-5">
                Sobre a Cliniz
              </p>
            </Reveal>
            <Reveal variant="up" delay={100}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-foreground tracking-tight leading-[1.15] text-balance">
                Excelência em{" "}
                <span className="italic text-accent font-normal">cada detalhe</span>{" "}
                do seu tratamento.
              </h2>
            </Reveal>
            <Reveal variant="up" delay={200}>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                A Cliniz nasceu da paixão por transformar sorrisos e vidas. Desde 2009,
                oferecemos atendimento odontológico de excelência, combinando
                conhecimento técnico com um cuidado verdadeiramente humano.
              </p>
              <p className="mt-4 text-foreground/70 leading-relaxed">
                Cada paciente é único. Por isso, montamos planos sob medida — sempre
                com transparência, conforto e o respeito que você merece.
              </p>
            </Reveal>

            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {features.map((feature, index) => (
                <Reveal key={feature} variant="up" delay={index * 70}>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/85 text-[15px] leading-snug">
                      {feature}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
