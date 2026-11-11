import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { FadeIn, Reveal } from "@/components/reveal";
import { CtaBand, FaqList, TratamentoCard } from "@/components/sections";
import { Eyebrow, LinkButton, SectionTitle, WhatsappButton } from "@/components/ui";
import { SITE } from "@/lib/site";
import { TRATAMENTOS, getTratamento } from "@/lib/tratamentos";

export function generateStaticParams() {
  return TRATAMENTOS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tratamentos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = getTratamento(slug);
  if (!t) return {};
  return {
    title: `${t.nome} em Palmas, TO`,
    description: t.resumo,
    alternates: { canonical: `/tratamentos/${t.slug}` },
    openGraph: {
      title: `${t.nome} | ${SITE.nomeCompleto}`,
      description: t.resumo,
      url: `/tratamentos/${t.slug}`,
      images: [{ url: t.imagem, alt: t.imagemAlt }],
    },
  };
}

export default async function TratamentoPage({ params }: PageProps<"/tratamentos/[slug]">) {
  const { slug } = await params;
  const t = getTratamento(slug);
  if (!t) notFound();

  const outros = TRATAMENTOS.filter((o) => o.slug !== t.slug).slice(0, 3);

  return (
    <>
      {/* TOPO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-ice to-white pt-28 pb-16 sm:pt-36 lg:pb-24">
        <div className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" aria-hidden />
        <div className="pointer-events-none absolute -top-32 right-[-10%] -z-10 size-[34rem] rounded-full bg-brand-200/50 blur-[110px]" aria-hidden />
        <div className="container-site">
          <FadeIn>
            <nav aria-label="Trilha de navegação">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
                <li className="flex items-center gap-1.5">
                  <Link href="/" className="transition hover:text-brand">Início</Link>
                  <ChevronRight className="size-3.5" aria-hidden />
                </li>
                <li className="flex items-center gap-1.5">
                  <Link href="/tratamentos" className="transition hover:text-brand">Tratamentos</Link>
                  <ChevronRight className="size-3.5" aria-hidden />
                </li>
                <li aria-current="page" className="font-medium text-ink">{t.nome}</li>
              </ol>
            </nav>
          </FadeIn>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <FadeIn delay={0.05}>
                <Eyebrow>Tratamento</Eyebrow>
                <h1 className="mt-5 font-display text-[3rem] leading-[0.98] tracking-[-0.02em] text-balance text-ink sm:text-7xl">{t.nome}</h1>
                <p className="mt-5 font-display text-2xl leading-snug text-brand italic sm:text-[1.9rem]">{t.chamada}</p>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.resumo}</p>
              </FadeIn>
              <FadeIn delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <WhatsappButton extra={`Tenho interesse em: ${t.nome}.`}>Agendar avaliação</WhatsappButton>
                <LinkButton href="/tratamentos">Outros tratamentos</LinkButton>
              </FadeIn>
            </div>
            <FadeIn delay={0.1} y={30} className="lg:col-span-6">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[2.25rem] shadow-lift ring-1 ring-white">
                <Image
                  src={t.imagem}
                  alt={t.imagemAlt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="object-cover"
                  style={{ objectPosition: t.foco }}
                />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.25}>
            <dl className="mt-14 grid overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-line sm:grid-cols-3">
              {t.fatos.map((f, i) => (
                <div key={f.rotulo} className={`p-6 sm:p-7 ${i > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""}`}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{f.rotulo}</dt>
                  <dd className="mt-2 text-lg font-semibold text-ink">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </section>

      {/* O QUE É */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionTitle eyebrow="Entenda" title={<>Como funciona o tratamento</>} />
            <div className="mt-8 space-y-5 text-[1.08rem] leading-relaxed text-ink-soft">
              {t.introducao.map((par) => (
                <p key={par.slice(0, 24)}>{par}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-[1.75rem] bg-ice p-7 sm:p-9">
              <h2 className="font-display text-3xl text-ink">Indicado para</h2>
              <ul className="mt-6 space-y-4">
                {t.indicacoes.map((ind) => (
                  <li key={ind} className="flex items-start gap-3 text-ink-soft">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                    {ind}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-brand-200/60 pt-5 text-sm leading-relaxed text-muted">
                A indicação final depende da avaliação clínica. Cada caso é único.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ETAPAS */}
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-brand/30 blur-[130px]" aria-hidden />
        <div className="container-site">
          <Reveal>
            <SectionTitle light eyebrow="Passo a passo" title={<>As etapas, <em className="text-brand-300">sem mistério</em></>} />
          </Reveal>
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.etapas.map((e, i) => (
              <Reveal
                as="li"
                key={e.titulo}
                delay={i * 0.08}
                className="relative rounded-[1.5rem] bg-white/[0.06] p-7 ring-1 ring-white/10 backdrop-blur transition-colors duration-500 hover:bg-white/[0.1]"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand font-semibold">{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold">{e.titulo}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{e.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* BENEFÍCIOS E CUIDADOS */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionTitle eyebrow="Benefícios" title={<>O que muda <em className="text-brand">para você</em></>} />
            <ul className="mt-10 space-y-4">
              {t.beneficios.map((b) => (
                <li key={b.titulo} className="flex gap-5 rounded-[1.5rem] p-5 ring-1 ring-line transition-all duration-500 hover:shadow-soft hover:ring-brand-200">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ice text-brand">
                    <Sparkles className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold text-ink">{b.titulo}</span>
                    <span className="mt-1 block leading-relaxed text-muted">{b.texto}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle eyebrow="Depois do tratamento" title={<>Cuidados que <em className="text-brand">fazem durar</em></>} />
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {t.cuidados.map((c, i) => (
                <li key={c} className="flex items-center gap-5 py-5">
                  <span className="font-display text-3xl text-brand-300">0{i + 1}</span>
                  <span className="text-ink-soft">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionTitle eyebrow="Perguntas" title={<>Dúvidas sobre {t.nome.toLowerCase()}</>} />
            <WhatsappButton variant="ghost" className="mt-8" extra={`Tenho uma dúvida sobre: ${t.nome}.`}>
              Perguntar no WhatsApp
            </WhatsappButton>
          </Reveal>
          <div className="lg:col-span-8">
            <FaqList perguntas={t.perguntas} />
          </div>
        </div>
      </section>

      {/* OUTROS */}
      <section className="pt-20 sm:pt-28">
        <div className="container-site">
          <Reveal>
            <SectionTitle eyebrow="Veja também" title="Outros tratamentos" />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {outros.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.08}>
                <TratamentoCard t={o} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
