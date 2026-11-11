import type { Metadata } from "next";
import { GradeFina, MarcaDagua, PadraoLogo } from "@/components/decor";
import { notFound } from "next/navigation";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CtaBand, FaqList, PageHero, TratamentoCard } from "@/components/sections";
import { AgendarButton, SectionTitle, WhatsappButton } from "@/components/ui";
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
    title: `${t.nome} em Belo Horizonte`,
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

  const idx = TRATAMENTOS.findIndex((o) => o.slug === t.slug);
  const outros = [1, 2, 3].map((k) => TRATAMENTOS[(idx + k) % TRATAMENTOS.length]);

  return (
    <>
      <PageHero trilha={[{ href: "/", label: "Início" }, { href: "/tratamentos", label: "Tratamentos" }, { label: t.nome }]} eyebrow="Tratamento" titulo={t.nome} intro={t.chamada} imagem={t.imagem} imagemAlt={t.imagemAlt} foco={t.foco}>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <AgendarButton href={`/agendar?tipo=${t.slug}`} variant="white">
            Agendar avaliação
          </AgendarButton>
          <WhatsappButton variant="glass" extra={`Tenho interesse em: ${t.nome}.`}>
            Tirar dúvidas
          </WhatsappButton>
        </div>
      </PageHero>

      {/* RESUMO EM TRÊS FATOS */}
      <section className="pt-16 sm:pt-20">
        <div className="container-site">
          <Reveal>
            <dl className="grid overflow-hidden bg-white text-center shadow-soft ring-1 ring-line sm:grid-cols-3">
              {t.fatos.map((f, i) => (
                <div key={f.rotulo} className={`p-6 sm:p-8 ${i > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""}`}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{f.rotulo}</dt>
                  <dd className="mt-2 text-lg font-semibold text-ink">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ENTENDA */}
      <section className="section-y relative isolate overflow-hidden">
        <MarcaDagua icone="dente" className="top-0 left-1/2 -z-10 size-[28rem] -translate-x-1/2 text-brand-100" girar={10} traco={0.25} />
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full bg-white p-8 ring-1 ring-line sm:p-10">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Como funciona</h2>
            <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
              {t.introducao.map((par) => (
                <p key={par.slice(0, 24)}>{par}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex h-full flex-col bg-ice p-8 sm:p-10">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Indicado para</h2>
            <ul className="mt-6 flex-1 space-y-4">
              {t.indicacoes.map((ind) => (
                <li key={ind} className="flex items-start gap-3 text-ink-soft">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                  {ind}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-brand-200/70 pt-5 text-sm leading-relaxed text-muted">
              A indicação final depende da avaliação clínica. Cada caso é único.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ETAPAS */}
      <section className="section-y relative isolate overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[40rem] -translate-x-1/2 bg-brand/30 blur-[130px]" aria-hidden />
        <div className="container-site">
          <Reveal>
            <SectionTitle light eyebrow="Passo a passo" title={<>As etapas, <em className="text-accent">sem mistério</em></>} />
          </Reveal>
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.etapas.map((e, i) => (
              <Reveal
                as="li"
                key={e.titulo}
                delay={i * 0.08}
                className="flex h-full flex-col items-center bg-white/[0.06] p-7 text-center ring-1 ring-white/10 transition-colors duration-500 hover:bg-white/[0.1]"
              >
                <span className="inline-flex size-12 items-center justify-center bg-brand font-display text-xl">{i + 1}</span>
                <h3 className="mt-6 text-lg font-semibold">{e.titulo}</h3>
                <p className="mt-2.5 leading-relaxed text-white/75">{e.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* BENEFÍCIOS E CUIDADOS */}
      <section className="section-y relative isolate overflow-hidden">
        <GradeFina className="-z-10" />
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full bg-white p-8 ring-1 ring-line sm:p-10">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              O que muda <em className="text-brand">para você</em>
            </h2>
            <ul className="mt-8 space-y-5">
              {t.beneficios.map((b) => (
                <li key={b.titulo} className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center bg-brand-50 text-brand">
                    <Sparkles className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{b.titulo}</span>
                    <span className="mt-1 block leading-relaxed text-muted">{b.texto}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="h-full bg-white p-8 ring-1 ring-line sm:p-10">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Cuidados que <em className="text-brand">fazem durar</em>
            </h2>
            <ul className="mt-8 space-y-5">
              {t.cuidados.map((c, i) => (
                <li key={c} className="flex items-center gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center bg-ice font-display text-lg text-brand">{i + 1}</span>
                  <span className="text-ink-soft">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y relative isolate overflow-hidden bg-mist">
        <PadraoLogo className="-z-10 text-brand-200/60" />
        <div className="container-site">
          <Reveal>
            <SectionTitle eyebrow="Perguntas frequentes" title={<>Dúvidas sobre {t.nome.toLowerCase()}</>} />
          </Reveal>
          <div className="mt-12">
            <FaqList perguntas={t.perguntas} />
          </div>
        </div>
      </section>

      {/* OUTROS */}
      <section className="section-y relative isolate overflow-hidden">
        <MarcaDagua icone="fio" className="top-10 left-1/2 -z-10 hidden h-40 w-[34rem] -translate-x-1/2 text-brand-200 md:block" forca={25} />
        <div className="container-site">
          <Reveal>
            <SectionTitle eyebrow="Veja também" title="Outros tratamentos" />
          </Reveal>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {outros.map((o, i) => (
              <Reveal as="li" key={o.slug} delay={i * 0.08} className={i === 2 ? "sm:hidden lg:block" : ""}>
                <TratamentoCard t={o} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
