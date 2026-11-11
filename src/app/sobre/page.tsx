import type { Metadata } from "next";
import Image from "next/image";
import { Ear, Gem, Lightbulb, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CtaBand, Depoimentos, EquipeGrid, PageHero } from "@/components/sections";
import { SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "A clínica e a equipe",
  description:
    "Conheça a Cliniz: uma clínica odontológica em Palmas, TO, com ambiente acolhedor, planejamento digital e especialistas que trabalham juntos.",
  alternates: { canonical: "/sobre" },
};

const VALORES = [
  { icone: Ear, titulo: "Ouvir primeiro", texto: "Todo tratamento começa entendendo a pessoa, não só os dentes." },
  { icone: Lightbulb, titulo: "Explicar sempre", texto: "Você entende o que será feito, por que e quais são as alternativas." },
  { icone: Gem, titulo: "Resultado natural", texto: "Estética que valoriza o seu rosto, sem exageros." },
  { icone: ShieldCheck, titulo: "Segurança em tudo", texto: "Protocolos de biossegurança rígidos e materiais de procedência." },
];

const AMBIENTES = [
  { src: "/img/recepcao.webp", alt: "Recepção com balcão branco e iluminação suave", legenda: "Recepção", className: "sm:col-span-2 sm:row-span-2", foco: "50% 50%" },
  { src: "/img/consultorio.webp", alt: "Consultório com cadeira odontológica azul", legenda: "Consultório", className: "", foco: "50% 60%" },
  { src: "/img/sala.webp", alt: "Sala clínica com cadeira azul-marinho e bancada branca", legenda: "Sala clínica", className: "", foco: "50% 55%" },
  { src: "/img/tela.webp", alt: "Dentista apresentando exames em um monitor para o paciente", legenda: "Sala de planejamento", className: "sm:col-span-2", foco: "50% 50%" },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="A clínica"
        title={
          <>
            Odontologia feita com <em className="text-brand">tempo</em> e atenção
          </>
        }
        intro="A Cliniz é uma clínica em Palmas, TO, criada para quem quer cuidar do sorriso com tranquilidade: sem pressa no atendimento, com explicações claras e tecnologia que traz segurança."
      />

      {/* HISTÓRIA */}
      <section className="pb-24 sm:pb-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src="/img/equipe-raiox.webp"
                alt="Dois dentistas analisando uma radiografia em um monitor com a paciente na cadeira"
                fill
                preload
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:pl-6">
            <SectionTitle
              eyebrow="Nossa história"
              title={
                <>
                  Uma clínica pensada <em className="text-brand">a partir do paciente</em>
                </>
              }
            />
            <div className="mt-7 space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
              <p>
                A Cliniz nasceu de uma pergunta simples: como seria um consultório em que o paciente se sente tranquilo do
                começo ao fim? A resposta virou o nosso jeito de trabalhar.
              </p>
              <p>
                Reservamos tempo para conversar, usamos o planejamento digital para mostrar o caminho antes de começar e
                reunimos especialistas que discutem cada caso juntos. Assim, o tratamento tem começo, meio e fim, e você
                sabe exatamente em que etapa está.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALORES */}
      <section className="bg-mist py-24 sm:py-32">
        <div className="container-site">
          <Reveal>
            <SectionTitle center eyebrow="O que nos guia" title={<>Quatro compromissos <em className="text-brand">em cada consulta</em></>} />
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((v, i) => (
              <Reveal
                as="li"
                key={v.titulo}
                delay={i * 0.08}
                className="group rounded-[1.5rem] bg-white p-7 shadow-soft ring-1 ring-line/70 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-ice text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  <v.icone className="size-6" aria-hidden />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-ink">{v.titulo}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.texto}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* AMBIENTE */}
      <section className="py-24 sm:py-32">
        <div className="container-site">
          <Reveal>
            <SectionTitle
              eyebrow="O ambiente"
              title={<>Espaços claros, silenciosos e <em className="text-brand">acolhedores</em></>}
              intro="Cada sala foi pensada para que você se sinta à vontade: luz natural, climatização e equipamentos modernos."
            />
          </Reveal>
          <div className="mt-14 grid auto-rows-[15rem] gap-4 sm:grid-cols-4 sm:auto-rows-[14rem] lg:auto-rows-[16rem]">
            {AMBIENTES.map((a, i) => (
              <Reveal key={a.src} delay={(i % 3) * 0.07} className={`group relative overflow-hidden rounded-[1.5rem] ${a.className}`}>
                <Image
                  src={a.src}
                  alt={a.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.05]"
                  style={{ objectPosition: a.foco }}
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-ink backdrop-blur">
                  {a.legenda}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPE */}
      <section id="equipe" className="scroll-mt-20 bg-mist py-24 sm:py-32">
        <div className="container-site">
          <Reveal>
            <SectionTitle
              eyebrow="Equipe"
              title={<>Quem vai <em className="text-brand">cuidar de você</em></>}
              intro="Especialistas de diferentes áreas que planejam juntos. Assim, o seu tratamento é pensado por inteiro."
            />
          </Reveal>
          <div className="mt-14">
            <EquipeGrid comBio />
          </div>
        </div>
      </section>

      {/* BIOSSEGURANÇA */}
      <section className="py-24 sm:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionTitle
              eyebrow="Biossegurança"
              title={<>Cuidado que você <em className="text-brand">não vê</em>, mas sente</>}
              intro="Os protocolos de limpeza e esterilização seguem as normas sanitárias e são revisados com frequência pela equipe."
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                ["Esterilização em autoclave", "Com controle e registro de cada ciclo."],
                ["Material descartável", "Sempre que possível, de uso único."],
                ["Superfícies protegidas", "Barreiras trocadas a cada paciente."],
                ["Equipe treinada", "Atualização constante dos protocolos."],
              ].map(([titulo, texto]) => (
                <li key={titulo} className="rounded-[1.25rem] bg-ice p-6">
                  <p className="font-semibold text-ink">{titulo}</p>
                  <p className="mt-1.5 text-muted">{texto}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Depoimentos limite={3} />

      <CtaBand />
    </>
  );
}
