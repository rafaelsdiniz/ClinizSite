import Image from "next/image";
import { CalendarCheck, CheckCircle2, Clock, FileText, HeartHandshake, MapPin, MessageCircle, ScanLine, ShieldCheck } from "lucide-react";
import { FadeIn, ImageReveal, Parallax, Reveal, SplitTitle } from "@/components/reveal";
import { HeroVideo } from "@/components/hero-video";
import { CurvaBase } from "@/components/divisores";
import { AgendarButton, Eyebrow, LinkButton, SectionTitle, WhatsappButton } from "@/components/ui";
import { Depoimentos, EquipeGrid, FaqList, PrimeiraConsulta, TratamentoCard } from "@/components/sections";
import { DIFERENCIAIS, PERGUNTAS_GERAIS } from "@/lib/conteudo";
import { ENDERECO, HORARIOS, MAPA_URL, SITE } from "@/lib/site";
import { TRATAMENTOS } from "@/lib/tratamentos";

const ICONES = {
  scan: ScanLine,
  clock: Clock,
  file: FileText,
  shield: ShieldCheck,
  heart: HeartHandshake,
  message: MessageCircle,
} as const;

export default function Home() {
  const vitrine = TRATAMENTOS.slice(0, 6);

  return (
    <>
      {/* HERÓI: vídeo cobrindo a tela, título editorial ancorado embaixo */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-20">
          <HeroVideo />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/55" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900/55 via-transparent to-transparent" aria-hidden />

        <div className="container-site pt-32 pb-24 sm:pb-28 lg:pb-32">
          <SplitTitle
            as="h1"
            noTopo
            className="font-display text-[3.3rem] leading-[0.98] sm:text-[5.4rem] lg:text-[7.2rem]"
            linhas={[
              [{ t: "Seu sorriso,", className: "font-light" }],
              [
                { t: "planejado com", className: "text-[0.62em] italic font-light text-white/85" },
                { t: "calma", className: "italic text-accent" },
              ],
              [{ t: "e precisão." }],
            ]}
          />
          <FadeIn delay={0.7} className="mt-10 grid gap-8 border-t border-white/20 pt-8 lg:grid-cols-12 lg:items-center">
            <p className="max-w-md text-lg leading-relaxed text-white/85 lg:col-span-5">
              Planejamento digital, consulta sem pressa e uma equipe que explica cada passo. Na Savassi, em Belo Horizonte.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-7 lg:justify-end">
              <AgendarButton variant="white">Agendar consulta</AgendarButton>
              <LinkButton href="/tratamentos" variant="glass">
                Conhecer tratamentos
              </LinkButton>
            </div>
          </FadeIn>
        </div>
        <CurvaBase />
      </section>

      {/* MANIFESTO */}
      <section className="section-y">
        <div className="container-site text-center">
          <Reveal>
            <p className="font-display text-[1.1rem] text-accent-ink italic">01</p>
            <Eyebrow className="mt-2">Nosso jeito</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-4xl font-display text-[1.75rem] leading-[1.3] text-balance text-ink sm:text-[2.4rem]">
              Um bom tratamento começa <em className="text-brand">antes da cadeira</em>: numa conversa sem pressa, num plano claro e numa
              equipe que explica cada passo.
            </p>
          </Reveal>
          <ul className="mx-auto mt-14 grid max-w-4xl divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { icone: ScanLine, t: "Planejamento digital", d: "Você vê o resultado antes de começar." },
              { icone: FileText, t: "Orçamento por escrito", d: "Etapas e valores claros, sem surpresa." },
              { icone: CalendarCheck, t: "Agenda online", d: "Escolha dia e horário em poucos passos." },
            ].map((f, i) => (
              <Reveal as="li" key={f.t} delay={0.15 + i * 0.12} className="group flex flex-col items-center px-6 py-8">
                <span className="inline-flex size-12 items-center justify-center bg-brand-50 text-brand transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-brand group-hover:text-white">
                  <f.icone className="size-5" aria-hidden />
                </span>
                <p className="mt-4 font-semibold text-ink">{f.t}</p>
                <p className="mt-1 text-sm text-muted">{f.d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* TRATAMENTOS */}
      <section id="tratamentos" className="section-y scroll-mt-16 bg-mist pb-40 sm:pb-44">
        <div className="container-site">
          <SectionTitle
            layout="split"
            eyebrow="Tratamentos"
            title={
              <>
                Do cuidado diário à <em className="text-brand">transformação</em> do sorriso
              </>
            }
            intro="Tratamentos planejados um a um, com tecnologia a favor da previsibilidade. Escolha um para saber mais ou agende direto."
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vitrine.map((t, i) => (
              <Reveal as="li" key={t.slug} delay={(i % 3) * 0.12} y={40}>
                <TratamentoCard t={t} />
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12 flex justify-center">
            <LinkButton href="/tratamentos">Ver todos os tratamentos</LinkButton>
          </Reveal>
        </div>
      </section>

      {/* DIFERENCIAIS: foto de fundo, com barra de informações flutuando na divisa */}
      <section className="relative isolate bg-ink pt-0 pb-24 text-white sm:pb-32">
        <Parallax className="absolute inset-0 -z-20">
          <Image src="/img/clinica.webp" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 45%" }} />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-brand-900/80 to-ink/90" aria-hidden />

        <div className="container-site">
          <Reveal className="relative z-10 -mt-20 grid bg-white text-ink shadow-lift ring-1 ring-line sm:-mt-24 sm:grid-cols-3">
            {[
              { icone: CalendarCheck, r: "Agendamento", v: "Online, a qualquer hora" },
              { icone: MapPin, r: "Endereço", v: `${ENDERECO.bairro}, ${ENDERECO.cidade}` },
              { icone: Clock, r: "Atendimento", v: "Seg. a sáb., a partir das 8h" },
            ].map((it, i) => (
              <div key={it.r} className={`flex items-center gap-4 p-6 sm:justify-center sm:p-8 ${i > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""}`}>
                <span className="inline-flex size-11 shrink-0 items-center justify-center bg-brand text-white">
                  <it.icone className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-[0.14em] text-muted uppercase">{it.r}</span>
                  <span className="mt-0.5 block font-semibold">{it.v}</span>
                </span>
              </div>
            ))}
          </Reveal>

          <SectionTitle
            light
            numero="02"
            eyebrow="Por que a Cliniz"
            className="mt-24 sm:mt-28"
            title={
              <>
                Detalhes que fazem você se sentir <em className="text-accent">bem cuidado</em>
              </>
            }
          />
          <ul className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {DIFERENCIAIS.map((d, i) => {
              const Icone = ICONES[d.icone];
              return (
                <Reveal as="li" key={d.titulo} delay={(i % 3) * 0.12} className="group relative flex h-full flex-col bg-ink/55 p-8 backdrop-blur-md transition-colors duration-500 hover:bg-brand/40 sm:p-10">
                  <span className="absolute top-0 left-0 h-0.5 w-0 bg-accent transition-all duration-700 group-hover:w-full" aria-hidden />
                  <div className="flex items-center justify-between">
                    <Icone className="size-7 text-brand-300 transition-colors duration-500 group-hover:text-accent" aria-hidden />
                    <span className="font-display text-sm text-white/40 italic">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl">{d.titulo}</h3>
                  <p className="mt-3 leading-relaxed text-white/70">{d.texto}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <PrimeiraConsulta />

      {/* A CLÍNICA: foto em largura total, texto sobre véu lateral */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Parallax className="absolute inset-0 -z-20" forca={8}>
          <Image src="/img/consultorio.webp" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 60%" }} />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/30 lg:to-transparent" aria-hidden />
        <div className="container-site grid min-h-[40rem] items-center py-24 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="font-display text-[1.1rem] text-accent italic">04</p>
              <Eyebrow tone="light" className="mt-2">
                A clínica
              </Eyebrow>
            </Reveal>
            <SplitTitle
              className="mt-4 font-display text-[2.4rem] leading-[1.06] sm:text-5xl lg:text-[3.5rem]"
              linhas={[[{ t: "Um lugar para cuidar do sorriso" }, { t: "sem tensão", className: "italic text-accent" }]]}
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-white/80">
                Ambiente silencioso, tecnologia que dá segurança e uma equipe que explica antes de fazer. Tudo pensado para você se
                sentir à vontade.
              </p>
              <ul className="mt-8 grid max-w-lg gap-4 sm:grid-cols-2">
                {["Salas climatizadas e acessíveis", "Escaneamento e planejamento 3D", "Especialistas em cada área", "Esterilização com controle de ciclo"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3 text-white/90">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-10">
                <LinkButton href="/sobre" variant="white">
                  Conheça a clínica
                </LinkButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EQUIPE */}
      <section className="section-y">
        <div className="container-site">
          <SectionTitle
            layout="split"
            eyebrow="Equipe"
            title={
              <>
                Especialistas que <em className="text-brand">trabalham juntos</em>
              </>
            }
            intro="Cada caso é discutido entre as especialidades, para que o seu plano tenha começo, meio e fim."
          />
          <div className="mt-14">
            <EquipeGrid />
          </div>
        </div>
      </section>

      <Depoimentos />

      {/* FAQ em duas colunas */}
      <section className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="font-display text-[1.1rem] text-accent-ink italic">06</p>
                <Eyebrow className="mt-2">Dúvidas frequentes</Eyebrow>
                <h2 className="mt-4 font-display text-[2.35rem] leading-[1.06] text-ink sm:text-5xl">
                  Antes de <em className="text-brand">agendar</em>
                </h2>
                <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">Não encontrou o que procurava? A recepção responde pelo WhatsApp.</p>
              </Reveal>
              <ImageReveal className="relative mt-8 hidden aspect-[16/10] lg:block" direcao="esquerda">
                <Image src="/img/tela.webp" alt="Dentista explicando exames ao paciente em um monitor" fill sizes="40vw" className="object-cover" />
              </ImageReveal>
              <Reveal className="mt-8">
                <WhatsappButton>Tirar uma dúvida</WhatsappButton>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqList perguntas={PERGUNTAS_GERAIS} className="" />
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO: foto em largura total com cartão central */}
      <section className="relative isolate overflow-hidden bg-ink py-24 sm:py-32">
        <Parallax className="absolute inset-0 -z-20">
          <Image src="/img/recepcao.webp" alt="" fill sizes="100vw" className="object-cover" />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-ink/55" aria-hidden />
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl bg-white shadow-lift" y={40}>
            <div className="grid sm:grid-cols-2">
              <div className="p-8 sm:p-10">
                <p className="font-display text-[1.1rem] text-accent-ink italic">07</p>
                <Eyebrow className="mt-2">Onde estamos</Eyebrow>
                <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
                  Na <em className="text-brand">Savassi</em>
                </h2>
                <address className="mt-5 text-ink-soft not-italic leading-relaxed">
                  {SITE.enderecoLinha1}
                  <br />
                  {SITE.enderecoLinha2}
                  <br />
                  CEP {ENDERECO.cep}
                </address>
                <a href={MAPA_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-700">
                  <MapPin className="size-4" aria-hidden />
                  Ver no mapa
                </a>
              </div>
              <div className="border-t border-line bg-mist p-8 sm:border-t-0 sm:border-l sm:p-10">
                <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Horários</p>
                <dl className="mt-4 divide-y divide-line">
                  {HORARIOS.map((h) => (
                    <div key={h.dias} className="flex justify-between gap-3 py-3 text-sm">
                      <dt className="text-muted">{h.dias}</dt>
                      <dd className="font-semibold text-ink">{h.horas}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
              <AgendarButton className="min-h-14 w-full shadow-none hover:translate-y-0">Agendar consulta</AgendarButton>
              <WhatsappButton className="min-h-14 w-full shadow-none ring-0 hover:translate-y-0">Falar no WhatsApp</WhatsappButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
