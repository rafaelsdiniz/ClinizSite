import type { Metadata } from "next";
import Image from "next/image";
import { Ear, Gem, Lightbulb, ShieldCheck, SprayCan, Recycle, Layers, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CtaBand, Depoimentos, EquipeGrid, PageHero } from "@/components/sections";
import { Eyebrow, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "A clínica e a equipe",
  description:
    "Conheça a Cliniz: uma clínica odontológica na Savassi, em Belo Horizonte, com ambiente acolhedor, planejamento digital e especialistas que trabalham juntos.",
  alternates: { canonical: "/sobre" },
};

const VALORES = [
  { icone: Ear, titulo: "Ouvir primeiro", texto: "Todo tratamento começa entendendo a pessoa, não só os dentes." },
  { icone: Lightbulb, titulo: "Explicar sempre", texto: "Você entende o que será feito, por que e quais são as alternativas." },
  { icone: Gem, titulo: "Resultado natural", texto: "Estética que valoriza o seu rosto, sem exageros." },
  { icone: ShieldCheck, titulo: "Segurança em tudo", texto: "Protocolos de biossegurança rígidos e materiais de procedência." },
];

const AMBIENTES = [
  { src: "/img/recepcao.webp", alt: "Recepção com balcão branco e iluminação suave", legenda: "Recepção", foco: "50% 50%" },
  { src: "/img/consultorio.webp", alt: "Consultório com cadeira odontológica azul", legenda: "Consultório", foco: "50% 62%" },
  { src: "/img/sala.webp", alt: "Sala clínica com cadeira azul-marinho e bancada branca", legenda: "Sala clínica", foco: "50% 58%" },
  { src: "/img/tela.webp", alt: "Dentista apresentando exames em um monitor para o paciente", legenda: "Sala de planejamento", foco: "50% 50%" },
];

const BIOSSEGURANCA = [
  { icone: SprayCan, titulo: "Esterilização em autoclave", texto: "Com controle e registro de cada ciclo." },
  { icone: Recycle, titulo: "Material descartável", texto: "Sempre que possível, de uso único." },
  { icone: Layers, titulo: "Superfícies protegidas", texto: "Barreiras trocadas a cada paciente." },
  { icone: GraduationCap, titulo: "Equipe treinada", texto: "Atualização constante dos protocolos." },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="A clínica"
        titulo="Odontologia feita com"
        destaque="tempo e atenção"
        intro="Uma clínica na Savassi, em Belo Horizonte, criada para quem quer cuidar do sorriso com tranquilidade: sem pressa, com explicações claras e tecnologia que traz segurança."
        imagem="/img/equipe-raiox.webp"
        imagemAlt="Dois dentistas analisando uma radiografia em um monitor com a paciente na cadeira"
      />

      <section className="section-y">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden shadow-lift">
              <Image src="/img/consulta-3d.webp" alt="Dentista mostrando a uma paciente o escaneamento 3D dos dentes" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Nossa história</Eyebrow>
            <h2 className="mt-4 font-display text-[2.3rem] leading-[1.08] text-balance text-ink sm:text-5xl">
              Uma clínica pensada <em className="text-brand">a partir do paciente</em>
            </h2>
            <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-muted">
              <p>
                A Cliniz nasceu de uma pergunta simples: como seria um consultório em que o paciente se sente tranquilo do começo ao
                fim? A resposta virou o nosso jeito de trabalhar.
              </p>
              <p>
                Reservamos tempo para conversar, usamos o planejamento digital para mostrar o caminho antes de começar e reunimos
                especialistas que discutem cada caso juntos. Assim, você sabe exatamente em que etapa está.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-mist">
        <div className="container-site">
          <Reveal>
            <SectionTitle eyebrow="O que nos guia" title={<>Quatro compromissos <em className="text-brand">em cada consulta</em></>} />
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((v, i) => (
              <Reveal
                as="li"
                key={v.titulo}
                delay={i * 0.08}
                className="group flex h-full flex-col items-center bg-white p-8 text-center shadow-soft ring-1 ring-line/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="inline-flex size-14 items-center justify-center bg-brand-50 text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  <v.icone className="size-6" aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-ink">{v.titulo}</h3>
                <p className="mt-2.5 leading-relaxed text-muted">{v.texto}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <Reveal>
            <SectionTitle
              eyebrow="O ambiente"
              title={<>Espaços claros, silenciosos e <em className="text-brand">acolhedores</em></>}
              intro="Luz natural, climatização e equipamentos modernos para você se sentir à vontade."
            />
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {AMBIENTES.map((a, i) => (
              <Reveal as="li" key={a.src} delay={(i % 2) * 0.08} className="group relative aspect-[4/3] overflow-hidden shadow-soft">
                <Image
                  src={a.src}
                  alt={a.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.05]"
                  style={{ objectPosition: a.foco }}
                />
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-1.5 text-sm font-semibold text-ink backdrop-blur">
                  {a.legenda}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="equipe" className="section-y scroll-mt-16 bg-mist">
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

      <section className="section-y">
        <div className="container-site">
          <Reveal>
            <SectionTitle
              eyebrow="Biossegurança"
              title={<>Cuidado que você <em className="text-brand">não vê</em>, mas sente</>}
              intro="Os protocolos de limpeza e esterilização seguem as normas sanitárias e são revisados com frequência pela equipe."
            />
          </Reveal>
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BIOSSEGURANCA.map((b, i) => (
              <Reveal as="li" key={b.titulo} delay={i * 0.08} className="flex h-full flex-col items-center bg-ice p-7 text-center">
                <b.icone className="size-6 text-brand" aria-hidden />
                <p className="mt-4 font-semibold text-ink">{b.titulo}</p>
                <p className="mt-1.5 text-muted">{b.texto}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Depoimentos />

      <CtaBand />
    </>
  );
}
