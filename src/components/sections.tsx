import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarCheck, ChevronRight, Plus, Quote } from "lucide-react";
import { FadeIn, HeroMedia, ImageReveal, LinhaDesenho, Parallax, Reveal, SplitTitle } from "./reveal";
import { AgendarButton, Eyebrow, SectionTitle, WhatsappButton } from "./ui";
import { CurvaBase } from "./divisores";
import { GradeFina, MarcaDagua } from "./decor";
import type { Tratamento } from "@/lib/tratamentos";
import { TRATAMENTOS } from "@/lib/tratamentos";
import { DEPOIMENTOS, EQUIPE, PRIMEIRA_CONSULTA } from "@/lib/conteudo";

/* Topo das páginas internas: foto cobrindo o fundo, véu, título revelado palavra a palavra */
export function PageHero({
  eyebrow,
  titulo,
  destaque,
  intro,
  imagem,
  imagemAlt,
  foco = "50% 50%",
  children,
  compacto = false,
  trilha,
}: {
  trilha?: { href?: string; label: string }[];
  eyebrow: string;
  titulo: string;
  /** trecho final do título, em itálico com o acento */
  destaque?: string;
  intro?: React.ReactNode;
  imagem: string;
  imagemAlt: string;
  foco?: string;
  children?: React.ReactNode;
  compacto?: boolean;
}) {
  return (
    <section
      className={`relative isolate flex items-center overflow-hidden bg-ink text-white ${
        compacto ? "min-h-[26rem] pt-32 pb-24 sm:min-h-[30rem]" : "min-h-[36rem] pt-36 pb-28 sm:min-h-[40rem]"
      }`}
    >
      <HeroMedia className="absolute inset-0 -z-20">
        <Image src={imagem} alt={imagemAlt} fill preload sizes="100vw" className="object-cover" style={{ objectPosition: foco }} />
      </HeroMedia>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-brand-900/65 to-ink/85" aria-hidden />
      <div className="container-site text-center">
        {trilha && (
          <FadeIn>
            <nav aria-label="Trilha de navegação" className="mb-8">
              <ol className="flex flex-wrap items-center justify-center gap-1.5 text-[0.8rem] text-white/65">
                {trilha.map((t, i) => (
                  <li key={t.label} className="flex items-center gap-1.5">
                    {t.href ? (
                      <Link href={t.href} className="transition hover:text-white">
                        {t.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-white">
                        {t.label}
                      </span>
                    )}
                    {i < trilha.length - 1 && <ChevronRight className="size-3.5" aria-hidden />}
                  </li>
                ))}
              </ol>
            </nav>
          </FadeIn>
        )}
        <FadeIn>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
        </FadeIn>
        <SplitTitle
          as="h1"
          noTopo
          delay={0.1}
          className="mx-auto mt-5 max-w-4xl font-display text-[2.7rem] leading-[1.04] text-balance sm:text-6xl lg:text-[4.6rem]"
          linhas={[[{ t: titulo }, ...(destaque ? [{ t: destaque, className: "italic text-accent" }] : [])]]}
        />
        {intro && (
          <FadeIn delay={0.5}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/80">{intro}</p>
          </FadeIn>
        )}
        {children && <FadeIn delay={0.65}>{children}</FadeIn>}
      </div>
      <CurvaBase />
    </section>
  );
}

/* Cartão de tratamento: foto com selo, número, título, resumo e rodapé com duas ações */
export function TratamentoCard({ t }: { t: Tratamento }) {
  const n = TRATAMENTOS.findIndex((x) => x.slug === t.slug) + 1;
  return (
    <article className="group relative flex h-full flex-col bg-white shadow-soft ring-1 ring-line/80 transition-all duration-500 ease-out-soft hover:-translate-y-1.5 hover:shadow-lift hover:ring-brand-200">
      <div className="relative aspect-[4/3] overflow-hidden bg-ice">
        <Image
          src={t.imagem}
          alt={t.imagemAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.07]"
          style={{ objectPosition: t.foco }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
        <span className="absolute top-0 left-0 bg-white px-3 py-2 font-display text-sm text-brand">{String(n).padStart(2, "0")}</span>
        <span className="absolute right-4 bottom-4 inline-flex size-10 translate-y-2 items-center justify-center bg-white text-brand opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden>
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-muted uppercase">{t.fatos[0].valor}</p>
        <h3 className="mt-2 font-display text-[1.65rem] leading-tight text-ink">
          <Link href={`/tratamentos/${t.slug}`} className="transition-colors after:absolute after:inset-0 group-hover:text-brand">
            {t.nome}
          </Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{t.resumo}</p>
      </div>
      <div className="relative z-10 flex items-center justify-between border-t border-line px-6 py-4 sm:px-7">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition-colors group-hover:text-brand">
          Saiba mais
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
        <Link
          href={`/agendar?tipo=${t.slug}`}
          className="inline-flex items-center gap-1.5 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
        >
          <CalendarCheck className="size-4" aria-hidden />
          Agendar
        </Link>
      </div>
    </article>
  );
}

/* Chamada final com foto de fundo em parallax */
export function CtaBand({
  titulo = "Seu próximo sorriso começa com",
  destaque = "uma conversa",
  texto = "Escolha o dia e o horário que funcionam para você. A confirmação aparece na hora, e a recepção fica à disposição para qualquer dúvida.",
}: {
  titulo?: string;
  destaque?: string;
  texto?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-28 text-center text-white sm:py-36">
      <Parallax className="absolute inset-0 -z-20">
        <Image src="/img/sala.webp" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "50% 55%" }} />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand/85 via-brand-900/90 to-ink/95" aria-hidden />
      <div className="container-site">
        <Reveal>
          <Eyebrow tone="light">Agende sua avaliação</Eyebrow>
        </Reveal>
        <SplitTitle
          className="mx-auto mt-5 max-w-3xl font-display text-[2.5rem] leading-[1.06] text-balance sm:text-6xl"
          linhas={[[{ t: titulo }, { t: destaque, className: "italic text-accent" }]]}
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">{texto}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <AgendarButton variant="white">Agendar consulta</AgendarButton>
            <WhatsappButton variant="glass">Falar no WhatsApp</WhatsappButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Perguntas frequentes */
export function FaqList({ perguntas, className = "mx-auto max-w-3xl" }: { perguntas: readonly { p: string; r: string }[]; className?: string }) {
  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {perguntas.map((item, i) => (
        <Reveal key={item.p} delay={Math.min(i * 0.05, 0.25)} y={14}>
          <details className="group" name="faq">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[1.05rem] font-semibold text-ink transition-colors hover:text-brand sm:text-lg">
              {item.p}
              <span className="faq-icon inline-flex size-9 shrink-0 items-center justify-center bg-ice text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                <Plus className="size-4" aria-hidden />
              </span>
            </summary>
            <p className="pr-12 pb-6 leading-relaxed text-muted">{item.r}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

/* Primeira consulta: linha do tempo que se desenha, com degradê suave de fundo */
export function PrimeiraConsulta() {
  return (
    <section className="section-y relative isolate overflow-hidden bg-gradient-to-b from-white via-mist to-mist">
      <GradeFina className="-z-10" />
      <MarcaDagua icone="sorriso" className="bottom-6 left-1/2 -z-10 hidden h-40 w-[36rem] -translate-x-1/2 text-brand-200 md:block" forca={25} />
      <div className="container-site">
        <SectionTitle
          numero="03"
          eyebrow="Primeira consulta"
          title={
            <>
              Como é a sua <em className="text-brand">primeira visita</em>
            </>
          }
          intro="Sem pressa e sem surpresa. Você sai da avaliação entendendo o que tem, quais são as opções e quanto cada uma custa."
        />
        <div className="relative mt-16">
          <LinhaDesenho className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-brand-300 lg:block" />
          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PRIMEIRA_CONSULTA.map((etapa, i) => (
              <Reveal as="li" key={etapa.titulo} delay={0.3 + i * 0.15} className="group flex flex-col items-center text-center">
                <span className="relative inline-flex size-12 items-center justify-center bg-white font-display text-xl text-brand ring-1 ring-brand-300 transition-all duration-500 group-hover:bg-brand group-hover:text-white">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-lg font-semibold text-ink">{etapa.titulo}</h3>
                <p className="mt-2.5 max-w-[16rem] leading-relaxed text-muted">{etapa.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal className="mt-14 flex justify-center">
          <AgendarButton>Agendar minha avaliação</AgendarButton>
        </Reveal>
      </div>
    </section>
  );
}

/* Equipe: retrato revelado por máscara, bio no hover e rodapé com ação */
export function EquipeGrid({ comBio = false }: { comBio?: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
      {EQUIPE.map((m, i) => (
        <Reveal as="li" key={m.nome} delay={i * 0.1} className="group flex flex-col bg-white shadow-soft ring-1 ring-line/80 transition-shadow duration-500 hover:shadow-lift">
          <ImageReveal className="relative aspect-[4/5] bg-ice" delay={i * 0.1}>
            <Image
              src={m.foto}
              alt={`Retrato de ${m.nome}`}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.05]"
              style={{ objectPosition: m.foco }}
            />
            <div className="absolute inset-0 hidden items-end bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:flex">
              <p className="translate-y-3 text-sm leading-relaxed text-white/90 transition-transform duration-500 group-hover:translate-y-0">{m.bio}</p>
            </div>
          </ImageReveal>
          <div className="flex flex-1 flex-col p-4 text-center sm:p-5">
            <h3 className="text-[0.98rem] font-semibold text-ink sm:text-lg">{m.nome}</h3>
            <p className="mt-1 text-[0.82rem] leading-snug font-medium text-brand sm:text-[0.92rem]">{m.papel}</p>
            {comBio && <p className="mt-3 hidden flex-1 text-[0.92rem] leading-relaxed text-muted sm:block lg:hidden">{m.bio}</p>}
          </div>
          <Link
            href="/agendar"
            className="flex items-center justify-center gap-1.5 border-t border-line py-3 text-[0.82rem] font-semibold text-ink-soft transition-colors hover:bg-brand hover:text-white sm:text-sm"
          >
            <CalendarCheck className="size-4" aria-hidden />
            Agendar
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

/* Depoimentos sobre foto de fundo, com corte em V simétrico no topo */
export function Depoimentos({ limite = 3 }: { limite?: number }) {
  const lista = DEPOIMENTOS.slice(0, limite);
  return (
    <section className="relative isolate overflow-hidden bg-ink py-28 text-white [clip-path:polygon(0_0,50%_3.5rem,100%_0,100%_100%,0_100%)] sm:py-36">
      <Parallax className="absolute inset-0 -z-20">
        <Image src="/img/consulta-3d.webp" alt="" fill sizes="100vw" className="object-cover" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/90 via-brand-900/85 to-ink/90" aria-hidden />
      <div className="container-site">
        <SectionTitle
          light
          numero="05"
          eyebrow="Depoimentos"
          title={
            <>
              Quem passou por aqui <em className="text-accent">conta como foi</em>
            </>
          }
        />
        <ul className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {lista.map((d, i) => (
            <Reveal as="li" key={d.nome} delay={i * 0.12} className="w-[86%] shrink-0 snap-center md:w-auto">
              <figure className="flex h-full flex-col bg-white/[0.07] p-7 ring-1 ring-white/15 backdrop-blur-md transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:bg-white/[0.12] sm:p-8">
                <Quote className="size-8 text-accent" aria-hidden />
                <blockquote className="mt-5 flex-1 font-display text-[1.2rem] leading-relaxed text-white/95">“{d.texto}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-white/15 pt-5">
                  <span className="inline-flex size-10 items-center justify-center bg-brand text-sm font-semibold text-white" aria-hidden>
                    {d.nome.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold">{d.nome}</span>
                    <span className="block text-sm text-white/65">{d.tratamento}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
