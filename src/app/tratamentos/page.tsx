import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHero } from "@/components/sections";
import { AgendarButton, SectionTitle } from "@/components/ui";
import { OUTRAS_ESPECIALIDADES, TRATAMENTOS } from "@/lib/tratamentos";

export const metadata: Metadata = {
  title: "Tratamentos",
  description:
    "Implantes dentários, lentes de contato dental, clareamento, ortodontia, alinhadores invisíveis, odontopediatria e prevenção na Cliniz, na Savassi, em Belo Horizonte.",
  alternates: { canonical: "/tratamentos" },
};

export default function TratamentosPage() {
  return (
    <>
      <PageHero
        eyebrow="Tratamentos"
        titulo="Cada sorriso pede um"
        destaque="plano próprio"
        intro="Em todos os tratamentos, a primeira etapa é a mesma: uma avaliação cuidadosa para entender o seu caso e mostrar as opções com clareza."
        imagem="/img/sala.webp"
        imagemAlt="Sala clínica com cadeira odontológica azul-marinho"
        foco="50% 55%"
      >
        <nav aria-label="Atalhos para tratamentos" className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {TRATAMENTOS.map((t) => (
            <a
              key={t.slug}
              href={`#${t.slug}`}
              className="bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white hover:text-brand-700"
            >
              {t.nome}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="section-y">
        <div className="container-site space-y-8">
          {TRATAMENTOS.map((t, i) => (
            <Reveal key={t.slug}>
              <article
                id={t.slug}
                className="group grid scroll-mt-24 overflow-hidden bg-white shadow-soft ring-1 ring-line/80 transition-shadow duration-500 hover:shadow-lift md:grid-cols-2"
              >
                <div className={`relative min-h-[18rem] overflow-hidden md:min-h-[28rem] ${i % 2 ? "md:order-2" : ""}`}>
                  <Image
                    src={t.imagem}
                    alt={t.imagemAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.05]"
                    style={{ objectPosition: t.foco }}
                  />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand">Tratamento {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 font-display text-[2.2rem] leading-[1.06] text-ink sm:text-[2.8rem]">{t.nome}</h2>
                  <p className="mt-4 leading-relaxed text-muted">{t.resumo}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {t.indicacoes.map((ind) => (
                      <li key={ind} className="flex items-start gap-2 text-[0.95rem] text-ink-soft">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                        {ind}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/tratamentos/${t.slug}`}
                      className="inline-flex min-h-12 items-center justify-center gap-2 bg-ice px-6 font-semibold text-brand transition-all duration-300 hover:bg-brand hover:text-white"
                    >
                      Saiba mais
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                    <AgendarButton href={`/agendar?tipo=${t.slug}`} variant="secondary">
                      Agendar
                    </AgendarButton>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y bg-mist">
        <div className="container-site">
          <Reveal>
            <SectionTitle
              eyebrow="Também cuidamos de"
              title="Outras especialidades"
              intro="Tratamentos do dia a dia que completam o cuidado com a sua saúde bucal."
            />
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OUTRAS_ESPECIALIDADES.map((e, i) => (
              <Reveal
                as="li"
                key={e}
                delay={(i % 3) * 0.06}
                className="flex items-center justify-center bg-white px-5 py-5 text-center font-medium text-ink shadow-soft ring-1 ring-line/70"
              >
                {e}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
