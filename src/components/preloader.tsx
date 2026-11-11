"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CHAVE_INTRO, terminarIntro } from "@/lib/intro";

const TOOTH =
  "M20 7.2C16.4 5.3 12.9 4.6 10.1 5.6 6.4 6.9 4.8 10.6 5.3 15.1 5.7 18.6 7.3 21.4 8.6 24.3 9.8 27.2 10.3 30.6 11.2 33.4 11.9 35.6 13.1 36.8 14.7 36.4 16.6 35.9 17 33.2 17.6 30.8 18.1 28.9 18.8 27.6 20 27.6 21.2 27.6 21.9 28.9 22.4 30.8 23 33.2 23.4 35.9 25.3 36.4 26.9 36.8 28.1 35.6 28.8 33.4 29.7 30.6 30.2 27.2 31.4 24.3 32.7 21.4 34.3 18.6 34.7 15.1 35.2 10.6 33.6 6.9 29.9 5.6 27.1 4.6 23.6 5.3 20 7.2Z";
const SMILE = "M12.6 16.2C15 19.5 17.4 20.7 20 20.7S25 19.5 27.4 16.2";
const EASE = [0.22, 1, 0.36, 1] as const;
const CORTINA = [0.76, 0, 0.24, 1] as const;
const DURACAO = 2100; // tempo da marca na tela antes da cortina abrir

/**
 * Abertura (uma vez por sessão): o dente se desenha em traço, se preenche com um reflexo passando,
 * o nome entra letra a letra e a cortina se abre ao meio revelando o topo da página.
 * Clique, toque ou Esc pulam. Com movimento reduzido, não aparece.
 */
export function Preloader() {
  const [ativo, setAtivo] = useState(true);
  const [sair, setSair] = useState(false);

  useEffect(() => {
    const visto = document.documentElement.classList.contains("intro-vista");
    if (visto) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- decisão depende do sessionStorage, lido antes da pintura
      setAtivo(false);
      terminarIntro();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const fechar = () => setSair(true);
    const t = setTimeout(fechar, DURACAO);
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && fechar();
    window.addEventListener("keydown", tecla);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", tecla);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!sair) return;
    terminarIntro();
    document.documentElement.style.overflow = "";
    try {
      sessionStorage.setItem(CHAVE_INTRO, "1");
    } catch {}
    const t = setTimeout(() => setAtivo(false), 1000);
    return () => clearTimeout(t);
  }, [sair]);

  if (!ativo) return null;

  return (
    <div data-intro className="intro-failsafe fixed inset-0 z-[100]" role="status" aria-label="Carregando Cliniz" onClick={() => setSair(true)}>
      {/* Cortina em duas metades */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-ink"
        animate={sair ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.95, ease: CORTINA }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
        animate={sair ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.95, ease: CORTINA }}
      />
      {/* Linha de luz na junção da cortina */}
      <motion.div
        className="absolute inset-x-0 top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={sair ? { scaleX: 1.2, opacity: 0 } : { scaleX: 1, opacity: 0.7 }}
        transition={sair ? { duration: 0.4 } : { duration: 1.4, ease: EASE, delay: 0.5 }}
      />

      <AnimatePresence>
        {!sair && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <svg viewBox="0 0 40 40" className="size-24 overflow-visible sm:size-28" aria-hidden>
              <defs>
                <linearGradient id="intro-fill" x1="6" y1="4" x2="34" y2="37" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#5f8cff" />
                  <stop offset="1" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="intro-brilho" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#fff" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <clipPath id="intro-clip">
                  <path d={TOOTH} />
                </clipPath>
              </defs>
              {/* Preenchimento */}
              <motion.path
                d={TOOTH}
                fill="url(#intro-fill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.85 }}
              />
              {/* Traço se desenhando */}
              <motion.path
                d={TOOTH}
                fill="none"
                stroke="#9cb9ff"
                strokeWidth={0.7}
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{ pathLength: { duration: 0.95, ease: [0.65, 0, 0.35, 1], delay: 0.05 }, opacity: { duration: 1.6, times: [0, 0.8, 1], delay: 0.05 } }}
              />
              {/* Reflexo passando */}
              <g clipPath="url(#intro-clip)">
                <motion.rect
                  y="-4"
                  width="12"
                  height="48"
                  fill="url(#intro-brilho)"
                  transform="skewX(-18)"
                  initial={{ x: -20 }}
                  animate={{ x: 50 }}
                  transition={{ duration: 0.75, ease: [0.45, 0, 0.2, 1], delay: 1.2 }}
                />
              </g>
              {/* Sorriso */}
              <motion.path
                d={SMILE}
                fill="none"
                stroke="#fff"
                strokeWidth={2.4}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: 1.05 }}
              />
            </svg>

            <p className="mt-6 flex overflow-hidden text-[2.6rem] leading-none font-bold tracking-[-0.03em] text-white sm:text-5xl" aria-hidden>
              {"cliniz".split("").map((l, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.7 + i * 0.06 }}
                >
                  {l}
                </motion.span>
              ))}
            </p>
            <motion.p
              className="mt-4 pl-[0.4em] text-[0.7rem] font-semibold text-brand-200 uppercase"
              initial={{ opacity: 0, letterSpacing: "0.15em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 1, ease: EASE, delay: 1.15 }}
            >
              Odontologia
            </motion.p>

            <div className="absolute bottom-10 w-40 sm:bottom-14">
              <div className="h-px w-full bg-white/15">
                <motion.div
                  className="h-full origin-left bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: DURACAO / 1000, ease: "linear" }}
                />
              </div>
              <button
                type="button"
                onClick={() => setSair(true)}
                className="mt-4 w-full text-center text-[0.7rem] font-semibold tracking-[0.2em] text-white/50 uppercase transition hover:text-white"
              >
                Pular
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
