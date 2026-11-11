"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type HTMLMotionProps } from "motion/react";
import { useIntroPronta } from "@/lib/intro";

export const EASE = [0.22, 1, 0.36, 1] as const;
const VIEW = { once: true, margin: "0px 0px -10% 0px" } as const;

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" };

/** Revela o conteúdo quando entra na tela (subida curta com fade). */
export function Reveal({ children, delay = 0, y = 28, as = "div", ...rest }: Props) {
  const Comp = (as === "li" ? motion.li : motion.div) as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.85, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Entrada do topo da página: espera a abertura terminar. */
export function FadeIn({ children, delay = 0, y = 22, ...rest }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  const pronta = useIntroPronta();
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={pronta ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 1, ease: EASE, delay: 0.25 + delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Zoom lento de entrada para o fundo do topo. */
export function HeroMedia({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const pronta = useIntroPronta();
  return (
    <motion.div className={className} initial={{ scale: 1.12 }} animate={pronta ? { scale: 1 } : { scale: 1.12 }} transition={{ duration: 2.4, ease: EASE }}>
      {children}
    </motion.div>
  );
}

/**
 * Título revelado palavra a palavra por máscara. Cada item de `linhas` é uma linha;
 * use `{ t, className }` para dar peso/tamanho próprio a um trecho.
 */
export function SplitTitle({
  linhas,
  as: Tag = "h2",
  className = "",
  noTopo = false,
  delay = 0,
}: {
  linhas: { t: string; className?: string }[][];
  as?: "h1" | "h2";
  className?: string;
  noTopo?: boolean;
  delay?: number;
}) {
  const pronta = useIntroPronta();
  const MotionTag = Tag === "h1" ? motion.h1 : motion.h2;
  let n = 0;
  const texto = linhas.map((l) => l.map((p) => p.t).join(" ")).join(" ");
  return (
    <MotionTag
      className={className}
      aria-label={texto}
      initial="oculto"
      {...(noTopo ? { animate: pronta ? "visivel" : "oculto" } : { whileInView: "visivel", viewport: VIEW })}
    >
      {linhas.map((linha, li) => (
        <span key={li} className="block" aria-hidden>
          {linha.map((parte, pi) => (
            <span key={pi} className={parte.className}>
              {parte.t.split(" ").map((palavra, wi) => {
                const i = n++;
                return (
                  <span key={wi}>
                    {(wi > 0 || pi > 0) && " "}
                    <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                      <motion.span
                        className="inline-block"
                        variants={{ oculto: { y: "105%" }, visivel: { y: 0 } }}
                        transition={{ duration: 0.9, ease: EASE, delay: (noTopo ? 0.3 : 0) + delay + i * 0.07 }}
                      >
                        {palavra}
                      </motion.span>
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}

/** Foto revelada por máscara (clip-path) com leve zoom de dentro para fora. */
export function ImageReveal({
  children,
  className = "",
  direcao = "baixo",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direcao?: "baixo" | "esquerda" | "direita";
  delay?: number;
}) {
  const reduzir = useReducedMotion();
  const inicio = { baixo: "inset(100% 0 0 0)", esquerda: "inset(0 100% 0 0)", direita: "inset(0 0 0 100%)" }[direcao];
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={reduzir ? false : { clipPath: inicio }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={VIEW}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay }}
    >
      <motion.div
        className="relative size-full"
        initial={reduzir ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.6, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Fundo com parallax suave conforme a rolagem. */
export function Parallax({ children, className = "", forca = 12 }: { children: React.ReactNode; className?: string; forca?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${forca}%`, `${forca}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="absolute inset-x-0 -inset-y-[15%]" style={reduzir ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Linha que se desenha horizontalmente ao entrar na tela. */
export function LinhaDesenho({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={`block origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEW}
      transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay }}
    />
  );
}

/** Bloco que sobe de dentro de uma máscara (para títulos com marcação própria). */
export function MaskReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <span className={`block overflow-hidden pb-[0.1em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "102%" }}
        whileInView={{ y: 0 }}
        viewport={VIEW}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
