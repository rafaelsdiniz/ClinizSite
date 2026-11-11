"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/* Elementos decorativos com a cara de odontologia: traço fino, baixa opacidade, nunca no caminho do conteúdo. */

const TOOTH =
  "M20 7.2C16.4 5.3 12.9 4.6 10.1 5.6 6.4 6.9 4.8 10.6 5.3 15.1 5.7 18.6 7.3 21.4 8.6 24.3 9.8 27.2 10.3 30.6 11.2 33.4 11.9 35.6 13.1 36.8 14.7 36.4 16.6 35.9 17 33.2 17.6 30.8 18.1 28.9 18.8 27.6 20 27.6 21.2 27.6 21.9 28.9 22.4 30.8 23 33.2 23.4 35.9 25.3 36.4 26.9 36.8 28.1 35.6 28.8 33.4 29.7 30.6 30.2 27.2 31.4 24.3 32.7 21.4 34.3 18.6 34.7 15.1 35.2 10.6 33.6 6.9 29.9 5.6 27.1 4.6 23.6 5.3 20 7.2Z";
const SMILE = "M12.6 16.2C15 19.5 17.4 20.7 20 20.7S25 19.5 27.4 16.2";

export type Icone = "dente" | "escova" | "espelho" | "fio" | "sorriso";

/** Ícones em traço fino, desenhados num quadro de 40. */
function Desenho({ icone }: { icone: Icone }) {
  switch (icone) {
    case "dente":
      return (
        <>
          <path d={TOOTH} />
          <path d={SMILE} />
        </>
      );
    case "escova":
      return (
        <>
          <path d="M6 34 23 17" />
          <path d="M23 17l3-3" />
          <rect x="24" y="5" width="7" height="14" transform="rotate(45 27.5 12)" />
          <path d="M27 6.5l-3-3M30.5 10l-3-3M34 13.5l-3-3" />
        </>
      );
    case "espelho":
      return (
        <>
          <circle cx="26" cy="13" r="8" />
          <circle cx="26" cy="13" r="5" />
          <path d="M20.3 18.7 6 33" />
        </>
      );
    case "fio":
      return (
        <>
          <path d="M3 20c4-8 7 8 11 0s7 8 11 0 7 8 11 0" />
          <path d="M3 26c4-8 7 8 11 0s7 8 11 0 7 8 11 0" opacity="0.5" />
        </>
      );
    case "sorriso":
      return (
        <>
          <path d="M7 16c4 9 22 9 26 0" />
          <path d="M10 18.5h20M13 21.5h14" opacity="0.6" />
        </>
      );
  }
}

/** Ícone grande em marca d'água, flutuando devagar com parallax. */
export function MarcaDagua({
  icone,
  className = "",
  forca = 60,
  girar = 0,
  traco = 0.35,
}: {
  icone: Icone;
  className?: string;
  forca?: number;
  girar?: number;
  traco?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [forca, -forca]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-girar, girar]);
  return (
    <div ref={ref} className={`pointer-events-none absolute ${className}`} aria-hidden>
      <motion.svg
        viewBox="0 0 40 40"
        className="size-full overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth={traco}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={reduzir ? undefined : { y, rotate }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6 }}
      >
        <Desenho icone={icone} />
      </motion.svg>
    </div>
  );
}

/** Padrão repetido com o símbolo do logo, esmaecendo nas bordas. */
export function PadraoLogo({ className = "", mascara = "radial-gradient(ellipse at top, black, transparent 70%)" }: { className?: string; mascara?: string }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 size-full ${className}`} style={{ maskImage: mascara, WebkitMaskImage: mascara }} aria-hidden>
      <defs>
        <pattern id="padrao-logo" width="72" height="72" patternUnits="userSpaceOnUse">
          <g transform="translate(24 22) scale(0.6)" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
            <path d={TOOTH} />
          </g>
          <circle cx="0" cy="0" r="1.2" fill="currentColor" />
          <circle cx="72" cy="72" r="1.2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#padrao-logo)" />
    </svg>
  );
}

/** Grade de linhas finas, como papel milimetrado de prontuário. */
export function GradeFina({ className = "", mascara = "radial-gradient(ellipse at center, black 20%, transparent 75%)" }: { className?: string; mascara?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(29 78 216 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(29 78 216 / 0.07) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: mascara,
        WebkitMaskImage: mascara,
      }}
      aria-hidden
    />
  );
}
