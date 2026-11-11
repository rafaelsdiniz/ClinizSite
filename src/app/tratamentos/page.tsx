import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHero } from "@/components/sections";
import { SectionTitle, WhatsappButton } from "@/components/ui";
import { OUTRAS_ESPECIALIDADES, TRATAMENTOS } from "@/lib/tratamentos";

export const metadata: Metadata = {
  title: "Tratamentos",
  description:
    "Implantes dentários, lentes de contato dental, clareamento, ortodontia, alinhadores invisíveis, odontopediatria e prevenção na Cliniz, em Palmas, TO.",
  alternates: { canonical: "/tratamentos" },
};

export default function TratamentosPage() {
  return (
    <>
      <PageHero
        eyebrow="Tratamentos"
        title={
          <>
            Cada sorriso pede um <em className="text-brand">plano próprio</em>
          </>
        }
        intro="Conheça os tratamentos da Cliniz. Em todos eles, a primeira etapa é a mesma: uma avaliação cuidadosa para entender o seu caso e mostrar as opções com clareza."
      >
        <nav aria-label="Atalhos para tratamentos" className="mt-10 flex flex-wrap gap-2.5">
          {TRATAMENTOS.map((t) => (
            <a
              key={t.slug}
              href={`#${t.slug}`}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-soft ring-1 ring-line transition hover:text-brand hover:ring-brand-300"
            >
              {t.nome}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="pb-12">
        <div className="container-site space-y-6 sm:space-y-8">
          {TRATAMENTOS.map((t, i) => (
            <Reveal key={t.slug}>
              <article
                id={t.slug}
                className="group grid scroll-mt-28 overflow-hidden rounded-[2rem] bg-white ring-1 ring-line transition-shadow duration-500 hover:shadow-lift md:grid-cols-2"
              >
                <Link
                  href={`/tratamentos/${t.slug}`}
                  tabIndex={-1}
                  aria-hidden
                  className={`relative block min-h-[18rem] overflow-hidden md:min-h-[26rem] ${i % 2 ? "md:order-2" : ""}`}
                >
                  <Image
                    src={t.imagem}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.05]"
                    style={{ objectPosition: t.foco }}
                  />
                </Link>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                  <p className="font-display text-xl text-brand-300">0{i + 1}</p>
                  <h2 className="mt-2 font-display text-[2.4rem] leading-[1.02] text-ink sm:text-5xl">{t.nome}</h2>
                  <p className="mt-3 text-lg font-medium text-brand">{t.chamada}</p>
                  <p className="mt-5 leading-relaxed text-muted">{t.resumo}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {t.indicacoes.slice(0, 4).map((ind) => (
                      <li key={ind} className="flex items-start gap-2 text-[0.95rem] text-ink-soft">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                        {ind}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/tratamentos/${t.slug}`}
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ice px-5 py-3 font-semibold text-brand transition-all duration-300 hover:bg-brand hover:text-white"
                  >
                    Saiba mais<span className="hidden sm:inline"> sobre {t.nome.toLowerCase()}</span>
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-site">
          <Reveal className="grid gap-10 rounded-[2rem] bg-mist p-8 ring-1 ring-line sm:p-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionTitle
                eyebrow="Também cuidamos de"
                title="Outras especialidades"
                intro="Tratamentos do dia a dia que completam o cuidado com a sua saúde bucal."
              />
              <WhatsappButton className="mt-8" variant="ghost">
                Perguntar sobre um tratamento
              </WhatsappButton>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              {OUTRAS_ESPECIALIDADES.map((e) => (
                <li key={e} className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 font-medium text-ink shadow-soft ring-1 ring-line/60">
                  <span className="size-2 rounded-full bg-brand" aria-hidden />
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
