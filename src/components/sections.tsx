import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Quote } from "lucide-react";
import { Reveal } from "./reveal";
import { Eyebrow, SectionTitle, WhatsappButton } from "./ui";
import type { Tratamento } from "@/lib/tratamentos";
import { DEPOIMENTOS, EQUIPE, PRIMEIRA_CONSULTA } from "@/lib/conteudo";

/* Cartão de tratamento com foto */
export function TratamentoCard({
  t,
  className = "",
  size = "md",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  t: Tratamento;
  className?: string;
  size?: "md" | "lg";
  sizes?: string;
}) {
  return (
    <Link
      href={`/tratamentos/${t.slug}`}
      className={`group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-ink p-6 text-white shadow-soft sm:p-7 ${className}`}
    >
      <Image
        src={t.imagem}
        alt={t.imagemAlt}
        fill
        sizes={sizes}
        className="-z-20 object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.06]"
        style={{ objectPosition: t.foco }}
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/0 transition-opacity duration-500 group-hover:from-brand-900/95"
        aria-hidden
      />
      <span
        className="absolute top-5 right-5 inline-flex size-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md transition-all duration-500 ease-out-soft group-hover:rotate-45 group-hover:bg-white group-hover:text-brand"
        aria-hidden
      >
        <ArrowUpRight className="size-5" />
      </span>
      <h3 className={`font-display leading-[1.02] ${size === "lg" ? "text-[2.4rem] sm:text-5xl" : "text-[2rem]"}`}>{t.nome}</h3>
      <p className={`mt-3 max-w-md text-white/80 ${size === "lg" ? "text-base" : "text-[0.95rem]"} leading-relaxed`}>
        {t.resumo}
      </p>
    </Link>
  );
}

/* Faixa de chamada final */
export function CtaBand({
  title = (
    <>
      Vamos conversar sobre <em className="text-brand-200">o seu sorriso?</em>
    </>
  ),
  texto = "Conte pelo WhatsApp o que você procura. A recepção responde, tira as primeiras dúvidas e sugere o melhor horário para a sua avaliação.",
}: {
  title?: React.ReactNode;
  texto?: string;
}) {
  return (
    <section className="container-site py-20 sm:py-28">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-brand-600 to-brand-900 px-6 py-14 text-white shadow-lift sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -top-24 -left-24 -z-10 size-80 rounded-full bg-brand-400/40 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden />
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow light>Agende sua avaliação</Eyebrow>
              <h2 className="mt-5 font-display text-[2.6rem] leading-[1.02] tracking-[-0.015em] text-balance sm:text-6xl">{title}</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100/90">{texto}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <WhatsappButton variant="white">Agendar pelo WhatsApp</WhatsappButton>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white ring-1 ring-white/35 transition hover:bg-white/10 hover:ring-white/70"
                >
                  Outras formas de contato
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:col-span-5 lg:block">
              <div className="relative ml-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] ring-1 ring-white/20">
                <Image src="/img/paciente-1.webp" alt="Mulher sorrindo com as mãos no rosto" fill sizes="384px" className="object-cover" style={{ objectPosition: "50% 30%" }} />
              </div>
              <div className="absolute -bottom-5 -left-2 rounded-2xl bg-white px-5 py-4 text-ink shadow-lift">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Primeira consulta</p>
                <p className="mt-1 font-display text-2xl leading-none">Avaliação completa</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* Lista de perguntas frequentes */
export function FaqList({ perguntas }: { perguntas: readonly { p: string; r: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {perguntas.map((item, i) => (
        <Reveal key={item.p} delay={Math.min(i * 0.04, 0.2)} y={14}>
          <details className="group py-1" name="faq">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[1.05rem] font-semibold text-ink transition-colors hover:text-brand sm:text-lg">
              {item.p}
              <span className="faq-icon inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-ice text-brand transition-transform duration-300 group-hover:bg-brand-100">
                <Plus className="size-4" aria-hidden />
              </span>
            </summary>
            <p className="max-w-3xl pb-6 pr-12 leading-relaxed text-muted">{item.r}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

/* Topo das páginas internas */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-ice to-white pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" aria-hidden />
      <div className="pointer-events-none absolute -top-32 right-[-8%] -z-10 size-[30rem] rounded-full bg-brand-200/50 blur-[100px]" aria-hidden />
      <div className="container-site">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-[2.9rem] leading-[1] tracking-[-0.02em] text-balance text-ink sm:text-7xl lg:text-[5.2rem]">
            {title}
          </h1>
          {intro && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{intro}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/* Como funciona a primeira consulta */
export function PrimeiraConsulta() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionTitle
                eyebrow="Primeira consulta"
                title={
                  <>
                    Como é a sua <em className="text-brand">primeira visita</em>
                  </>
                }
                intro="Sem pressa e sem surpresa. Você sai da avaliação entendendo o que tem, quais são as opções e quanto cada uma custa."
              />
            </div>
          </Reveal>
          <ol className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {PRIMEIRA_CONSULTA.map((etapa, i) => (
              <Reveal as="li" key={etapa.titulo} delay={i * 0.08} className="group relative h-full overflow-hidden rounded-[1.5rem] border border-line bg-white p-7 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-8">
                  <span className="font-display text-6xl leading-none text-brand-200 transition-colors duration-500 group-hover:text-brand">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-ink">{etapa.titulo}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{etapa.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* Equipe */
export function EquipeGrid({ comBio = false }: { comBio?: boolean }) {
  return (
    <ul className={`grid gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4 ${comBio ? "sm:grid-cols-2" : "grid-cols-2"}`}>
      {EQUIPE.map((m, i) => (
        <Reveal as="li" key={m.nome} delay={i * 0.08} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem] bg-ice sm:rounded-[1.5rem]">
              <Image
                src={m.foto}
                alt={`Retrato de ${m.nome}`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.05]"
                style={{ objectPosition: m.foco }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/30 to-transparent" aria-hidden />
            </div>
            <h3 className="mt-4 text-[0.98rem] font-semibold tracking-[-0.01em] text-ink sm:mt-5 sm:text-lg">{m.nome}</h3>
            <p className="mt-1 text-[0.85rem] leading-snug font-medium text-brand sm:text-[0.95rem]">{m.papel}</p>
            {comBio && <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{m.bio}</p>}
        </Reveal>
      ))}
    </ul>
  );
}

/* Depoimentos */
export function Depoimentos({ limite = 6 }: { limite?: number }) {
  const lista = DEPOIMENTOS.slice(0, limite);
  return (
    <section className="relative isolate overflow-hidden bg-ice py-24 sm:py-32">
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" aria-hidden />
      <div className="container-site">
        <Reveal>
          <SectionTitle
            center
            eyebrow="Depoimentos"
            title={
              <>
                Quem passou por aqui <em className="text-brand">conta como foi</em>
              </>
            }
            intro="Relatos de pacientes sobre a experiência na clínica."
          />
        </Reveal>
        <ul className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:mt-16 md:block md:columns-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:columns-3">
          {lista.map((d, i) => (
            <li key={d.nome} className="w-[85%] shrink-0 snap-center md:mb-6 md:w-auto md:break-inside-avoid">
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <figure className="h-full rounded-[1.5rem] bg-white p-7 shadow-soft ring-1 ring-line/70 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-lift sm:p-8">
                  <Quote className="size-7 text-brand-300" aria-hidden />
                  <blockquote className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">“{d.texto}”</blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700" aria-hidden>
                      {d.nome.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{d.nome}</span>
                      <span className="block text-sm text-muted">{d.tratamento}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
