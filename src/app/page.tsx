import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  FileText,
  HeartHandshake,
  MapPin,
  MessageCircle,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FadeIn, Reveal } from "@/components/reveal";
import { Eyebrow, LinkButton, SectionTitle, TextLink, WhatsappButton } from "@/components/ui";
import { CtaBand, Depoimentos, EquipeGrid, FaqList, PrimeiraConsulta, TratamentoCard } from "@/components/sections";
import { DIFERENCIAIS, PERGUNTAS_GERAIS } from "@/lib/conteudo";
import { HORARIOS, SITE } from "@/lib/site";
import { OUTRAS_ESPECIALIDADES, TRATAMENTOS } from "@/lib/tratamentos";

const ICONES = {
  scan: ScanLine,
  clock: Clock,
  file: FileText,
  shield: ShieldCheck,
  heart: HeartHandshake,
  message: MessageCircle,
} as const;

export default function Home() {
  const destaques = TRATAMENTOS.filter((t) => t.destaque);
  const faixa = [...TRATAMENTOS.map((t) => t.nome), ...OUTRAS_ESPECIALIDADES];

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-ice via-mist to-white pt-28 pb-16 sm:pt-36 lg:pt-40 lg:pb-24">
        <div className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_60%)]" aria-hidden />
        <div className="pointer-events-none absolute -top-40 right-[-12%] -z-10 size-[42rem] rounded-full bg-brand-200/60 blur-[120px]" aria-hidden />
        <div className="pointer-events-none absolute bottom-0 left-[-15%] -z-10 size-[28rem] rounded-full bg-white blur-[80px]" aria-hidden />

        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <FadeIn>
              <Eyebrow>Odontologia em {SITE.cidade}</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="mt-6 font-display text-[3.25rem] leading-[0.98] tracking-[-0.025em] text-balance text-ink sm:text-7xl xl:text-[5.9rem]">
                Seu sorriso, planejado com <em className="text-brand">calma</em> e precisão.
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-[1.15rem]">
                Na Cliniz, cada tratamento começa com uma conversa sem pressa e um plano digital claro. Implantes, lentes,
                clareamento e ortodontia em um ambiente pensado para o seu conforto.
              </p>
            </FadeIn>
            <FadeIn delay={0.24} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <WhatsappButton>Agendar avaliação</WhatsappButton>
              <LinkButton href="/tratamentos">Ver tratamentos</LinkButton>
            </FadeIn>
            <FadeIn delay={0.32}>
              <ul className="mt-12 flex max-w-xl flex-wrap gap-x-7 gap-y-3 text-[0.95rem] text-ink-soft">
                {["Planejamento digital", "Orçamento por escrito", "Atendimento sem pressa"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-[1.1rem] shrink-0 text-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <div className="relative lg:col-span-6 xl:col-span-6">
            <FadeIn delay={0.1} y={30} className="relative mx-auto max-w-[34rem] lg:mr-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-ice shadow-lift ring-1 ring-white sm:rounded-[3rem]">
                <Image
                  src="/img/hero.webp"
                  alt="Dentista sorridente em um consultório claro, ao lado da cadeira odontológica azul"
                  fill
                  preload
                  sizes="(min-width: 1024px) 34rem, 92vw"
                  className="object-cover"
                  style={{ objectPosition: "60% 30%" }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/25 to-transparent" aria-hidden />
              </div>

              {/* cartões flutuantes */}
              <FadeIn
                delay={0.55}
                className="absolute top-8 -left-3 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-lift ring-1 ring-line/70 backdrop-blur-md sm:-left-10 sm:px-5 sm:py-4"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand text-white">
                  <ScanLine className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-[0.95rem] font-semibold text-ink">Planejamento digital</span>
                  <span className="block text-xs text-muted sm:text-sm">Veja o resultado antes de começar</span>
                </span>
              </FadeIn>

              <FadeIn
                delay={0.7}
                className="absolute -right-2 -bottom-6 w-[13.5rem] rounded-[1.5rem] bg-white p-3 shadow-lift ring-1 ring-line/70 sm:-right-8 sm:w-60"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem]">
                  <Image src="/img/sorriso.webp" alt="Sorriso de uma paciente em close" fill sizes="240px" className="object-cover" style={{ objectPosition: "50% 55%" }} />
                </div>
                <div className="flex items-center gap-2 px-1.5 pt-3 pb-1">
                  <Sparkles className="size-4 text-brand" aria-hidden />
                  <p className="text-sm font-semibold text-ink">Estética natural</p>
                </div>
              </FadeIn>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAIXA DE ESPECIALIDADES */}
      <section aria-label="Especialidades" className="border-y border-line bg-white py-6">
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {[0, 1].map((k) => (
            <ul
              key={k}
              aria-hidden={k === 1}
              className="flex shrink-0 animate-[marquee_48s_linear_infinite] items-center gap-10 pr-10 motion-reduce:animate-none"
            >
              {faixa.map((nome) => (
                <li key={nome} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl text-ink-soft sm:text-[1.75rem]">
                  {nome}
                  <span className="size-1.5 rounded-full bg-brand-300" aria-hidden />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* TRATAMENTOS EM DESTAQUE */}
      <section className="py-24 sm:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal>
              <SectionTitle
                eyebrow="Tratamentos"
                title={
                  <>
                    Do cuidado diário à <em className="text-brand">transformação</em> do sorriso
                  </>
                }
                intro="Tratamentos planejados um a um, com tecnologia a favor da previsibilidade e uma equipe que explica cada passo."
              />
            </Reveal>
            <Reveal delay={0.1} className="shrink-0">
              <TextLink href="/tratamentos">Todos os tratamentos</TextLink>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            {destaques.map((t, i) => (
              <Reveal
                key={t.slug}
                delay={i * 0.07}
                className={i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
              >
                <TratamentoCard
                  t={t}
                  size={i === 0 ? "lg" : "md"}
                  className={i === 0 ? "h-full min-h-[26rem] lg:min-h-[44rem]" : "h-full min-h-[21rem]"}
                  sizes={i === 0 ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="relative isolate overflow-hidden bg-mist py-24 sm:py-32">
        <div className="pointer-events-none absolute top-1/3 left-[-10%] -z-10 size-[30rem] rounded-full bg-brand-100/70 blur-[100px]" aria-hidden />
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionTitle
                eyebrow="Por que a Cliniz"
                title={
                  <>
                    Detalhes que fazem você se sentir <em className="text-brand">bem cuidado</em>
                  </>
                }
              />
              <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src="/img/consulta-3d.webp"
                  alt="Dentista mostrando a uma paciente o escaneamento 3D dos dentes em um monitor"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink backdrop-blur">
                  Escaneamento e simulação em 3D
                </div>
              </div>
            </div>
          </Reveal>

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {DIFERENCIAIS.map((d, i) => {
              const Icone = ICONES[d.icone];
              return (
                <Reveal
                  as="li"
                  key={d.titulo}
                  delay={(i % 2) * 0.08}
                  className="group rounded-[1.5rem] bg-white p-7 shadow-soft ring-1 ring-line/70 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-lift sm:p-8"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-ice text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                    <Icone className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-ink">{d.titulo}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{d.texto}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* SOBRE A CLÍNICA */}
      <section className="py-24 sm:py-32">
        <div className="container-site grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-6">
            <div className="relative grid grid-cols-5 gap-4">
              <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-[2rem]">
                <Image src="/img/consultorio.webp" alt="Consultório com cadeira odontológica azul e equipamentos modernos" fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
              </div>
              <div className="col-span-2 flex flex-col gap-4 pt-16">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem]">
                  <Image src="/img/clinica.webp" alt="Sala clínica clara com cadeira odontológica branca" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
                </div>
                <div className="rounded-[1.25rem] bg-brand p-4 text-white shadow-glow sm:rounded-[1.5rem] sm:p-5">
                  <p className="font-display text-[1.65rem] leading-none whitespace-nowrap sm:text-4xl">Sem pressa</p>
                  <p className="mt-2 text-[0.8rem] leading-snug text-brand-100 sm:text-sm">Agenda pensada para você ser ouvido.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:pl-6">
            <SectionTitle
              eyebrow="A clínica"
              title={
                <>
                  Um lugar para cuidar do sorriso <em className="text-brand">sem tensão</em>
                </>
              }
              intro="A Cliniz nasceu da vontade de fazer odontologia de um jeito mais humano: ambiente silencioso, tecnologia que dá segurança e uma equipe que explica antes de fazer."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Salas climatizadas, iluminadas e acessíveis",
                "Escaneamento intraoral e planejamento em 3D",
                "Equipe com especialistas em cada área do tratamento",
                "Esterilização com controle e registro de cada ciclo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-soft">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <LinkButton href="/sobre">Conheça a clínica</LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-site">
        <hr className="border-line" />
      </div>

      <PrimeiraConsulta />

      {/* EQUIPE */}
      <section className="bg-mist py-24 sm:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal>
              <SectionTitle
                eyebrow="Equipe"
                title={
                  <>
                    Especialistas que <em className="text-brand">trabalham juntos</em>
                  </>
                }
                intro="Cada caso é discutido entre as especialidades, para que o seu plano tenha começo, meio e fim."
              />
            </Reveal>
            <Reveal delay={0.1} className="shrink-0">
              <TextLink href="/sobre#equipe">Conheça a equipe</TextLink>
            </Reveal>
          </div>
          <div className="mt-14">
            <EquipeGrid />
          </div>
        </div>
      </section>

      <Depoimentos />

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionTitle
              eyebrow="Dúvidas frequentes"
              title={
                <>
                  Antes de <em className="text-brand">agendar</em>
                </>
              }
              intro="Não encontrou o que procurava? Chame no WhatsApp e a recepção responde."
            />
            <WhatsappButton variant="ghost" className="mt-8">
              Tirar uma dúvida
            </WhatsappButton>
          </Reveal>
          <div className="lg:col-span-8">
            <FaqList perguntas={PERGUNTAS_GERAIS} />
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E HORÁRIOS */}
      <section className="pb-4">
        <div className="container-site">
          <div className="grid overflow-hidden rounded-[2rem] bg-ice lg:grid-cols-2">
            <Reveal className="p-8 sm:p-12 lg:p-14">
              <Eyebrow>Onde estamos</Eyebrow>
              <h2 className="mt-4 font-display text-[2.35rem] leading-[1.05] text-ink sm:text-5xl">
                Em <em className="text-brand">Palmas</em>, perto de você
              </h2>
              <p className="mt-5 flex items-center gap-2 text-lg text-ink-soft">
                <MapPin className="size-5 text-brand" aria-hidden />
                {SITE.cidadeExtenso}
              </p>
              <dl className="mt-8 divide-y divide-line/80 border-y border-line/80">
                {HORARIOS.map((h) => (
                  <div key={h.dias} className="flex items-center justify-between gap-4 py-4">
                    <dt className="text-ink-soft">{h.dias}</dt>
                    <dd className="font-semibold text-ink">{h.horas}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <WhatsappButton>Agendar avaliação</WhatsappButton>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-brand transition hover:bg-white"
                >
                  <CalendarCheck className="size-4" aria-hidden />
                  Ver contato
                </Link>
              </div>
            </Reveal>
            <div className="relative min-h-[20rem] lg:min-h-full">
              <Image
                src="/img/recepcao.webp"
                alt="Recepção da clínica com balcão branco e iluminação suave"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute right-5 bottom-5 left-5 rounded-2xl bg-white/90 p-4 text-sm text-ink-soft backdrop-blur sm:right-auto sm:max-w-xs">
                <span className="font-semibold text-ink">Recepção acolhedora.</span> Ambiente climatizado, silencioso e acessível.
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
