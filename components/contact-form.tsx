"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Clock, Send, CheckCircle, Loader2 } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contato" className="relative py-24 lg:py-36 bg-card overflow-hidden">
      <div className="absolute inset-0 -z-0" aria-hidden="true">
        <Image
          src="/odonto.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.10]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-card via-card/95 to-card" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <Reveal variant="up">
              <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium mb-5">
                Vamos conversar
              </p>
            </Reveal>
            <Reveal variant="up" delay={100}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-foreground tracking-tight leading-[1.15] text-balance">
                Agende sua{" "}
                <span className="italic text-accent font-normal">avaliação gratuita</span>.
              </h2>
            </Reveal>
            <Reveal variant="up" delay={200}>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                Dê o primeiro passo para um sorriso mais saudável e bonito. Preencha o
                formulário e nossa equipe entra em contato em até 1 dia útil.
              </p>
            </Reveal>

            <div className="mt-12 space-y-7">
              {[
                {
                  Icon: MapPin,
                  title: "Endereço",
                  lines: ["Av. Paulista, 1000 — Sala 501", "Bela Vista, São Paulo - SP"],
                },
                {
                  Icon: Phone,
                  title: "Telefone",
                  lines: ["(11) 99999-9999", "(11) 3333-3333"],
                },
                {
                  Icon: Clock,
                  title: "Horário",
                  lines: ["Seg - Sex: 8h às 19h", "Sábado: 8h às 13h"],
                },
              ].map(({ Icon, title, lines }, i) => (
                <Reveal key={title} variant="up" delay={300 + i * 80}>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{title}</p>
                      <p className="text-foreground/65 mt-1 text-sm leading-relaxed">
                        {lines.map((l, idx) => (
                          <span key={idx}>
                            {l}
                            {idx < lines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal variant="up" delay={150}>
            <div className="bg-background rounded-2xl p-7 sm:p-9 border border-border shadow-[0_24px_60px_-30px_rgba(0,0,0,0.15)]">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">
                    Recebido!
                  </h3>
                  <p className="text-foreground/65 max-w-sm">
                    Obrigado pelo seu contato. Nossa equipe retorna em breve para
                    agendar sua avaliação.
                  </p>
                  <Button
                    className="mt-8 rounded-full"
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Enviar nova mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium uppercase tracking-wider text-foreground/70 mb-2"
                    >
                      Nome completo
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="Seu nome"
                      className="bg-secondary/40 border-border h-11 rounded-lg"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium uppercase tracking-wider text-foreground/70 mb-2"
                      >
                        E-mail
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                        className="bg-secondary/40 border-border h-11 rounded-lg"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-medium uppercase tracking-wider text-foreground/70 mb-2"
                      >
                        WhatsApp
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        className="bg-secondary/40 border-border h-11 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-xs font-medium uppercase tracking-wider text-foreground/70 mb-2"
                    >
                      Serviço de interesse
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full h-11 rounded-lg border border-border bg-secondary/40 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Selecione um serviço</option>
                      <option value="avaliacao">Avaliação Geral</option>
                      <option value="clareamento">Clareamento Dental</option>
                      <option value="implante">Implante Dentário</option>
                      <option value="ortodontia">Ortodontia</option>
                      <option value="limpeza">Limpeza e Prevenção</option>
                      <option value="protese">Próteses Dentárias</option>
                      <option value="odontopediatria">Odontopediatria</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium uppercase tracking-wider text-foreground/70 mb-2"
                    >
                      Mensagem (opcional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Conte-nos sobre o que você precisa..."
                      className="w-full rounded-lg border border-border bg-secondary/40 px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Solicitar agendamento
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-foreground/50 text-center">
                    Ao enviar, você concorda com nossa política de privacidade.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
