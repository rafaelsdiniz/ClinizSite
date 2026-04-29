"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { Counter } from "@/components/counter"
import { Reveal } from "@/components/reveal"

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToServices = () => {
    document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center pt-32 lg:pt-36 overflow-hidden grain">
      <div className="absolute inset-0 z-0">
        <video
          src="/fundohome1.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-dentist.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl">
          <Reveal variant="fade">
            <div className="inline-flex items-center gap-2.5 bg-card/70 backdrop-blur-sm rounded-full pl-2 pr-4 py-1.5 mb-8 border border-border/60">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-accent/15">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              </span>
              <span className="text-xs sm:text-sm text-foreground/80 tracking-wide">
                Avaliação gratuita · Vagas limitadas
              </span>
            </div>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h1 className="font-serif text-[2.5rem] sm:text-5xl lg:text-[4rem] leading-[1.05] text-foreground tracking-tight text-balance">
              Um cuidado{" "}
              <span className="italic text-accent font-normal">clínico</span>
              <br className="hidden sm:block" /> à altura do seu sorriso.
            </h1>
          </Reveal>

          <Reveal variant="up" delay={200}>
            <p className="mt-7 text-base sm:text-lg text-foreground/70 leading-relaxed max-w-xl">
              Tecnologia de ponta, equipe especialista e um atendimento desenhado para
              quem busca mais do que um tratamento — busca uma experiência.
            </p>
          </Reveal>

          <Reveal variant="up" delay={320}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-7 py-6 rounded-full group"
              >
                Agendar avaliação
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={scrollToServices}
                className="text-base px-7 py-6 rounded-full text-foreground hover:bg-foreground/5"
              >
                Conhecer serviços
              </Button>
            </div>
          </Reveal>

          <Reveal variant="up" delay={460}>
            <div className="mt-14 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-xs font-medium text-foreground/70"
                    aria-hidden="true"
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                  <span className="ml-1.5 text-sm font-medium text-foreground">
                    4.9
                  </span>
                </div>
                <p className="text-xs text-foreground/60 mt-0.5">
                  +500 avaliações no Google
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="fade" delay={600}>
          <div className="mt-16 lg:mt-20 grid grid-cols-3 gap-4 sm:gap-10 max-w-2xl pt-8 border-t border-border/60">
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-foreground">
                <Counter to={5000} suffix="+" />
              </p>
              <p className="text-xs sm:text-sm text-foreground/60 mt-1.5">
                Pacientes atendidos
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-foreground">
                <Counter to={15} />
              </p>
              <p className="text-xs sm:text-sm text-foreground/60 mt-1.5">
                Anos de experiência
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-foreground">
                <Counter to={98} suffix="%" />
              </p>
              <p className="text-xs sm:text-sm text-foreground/60 mt-1.5">
                Satisfação
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 text-foreground/40">
        <span className="text-[10px] tracking-[0.3em] uppercase">Role para descobrir</span>
        <span className="block h-10 w-px bg-foreground/20 relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-foreground/60 animate-[scroll-hint_2s_ease-in-out_infinite]" />
        </span>
      </div>
      <style jsx>{`
        @keyframes scroll-hint {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(250%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </section>
  )
}
