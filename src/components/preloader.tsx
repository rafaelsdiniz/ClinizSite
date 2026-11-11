"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion } from "motion/react";
import { CHAVE_INTRO, terminarIntro } from "@/lib/intro";

const TOOTH =
  "M20 7.2C16.4 5.3 12.9 4.6 10.1 5.6 6.4 6.9 4.8 10.6 5.3 15.1 5.7 18.6 7.3 21.4 8.6 24.3 9.8 27.2 10.3 30.6 11.2 33.4 11.9 35.6 13.1 36.8 14.7 36.4 16.6 35.9 17 33.2 17.6 30.8 18.1 28.9 18.8 27.6 20 27.6 21.2 27.6 21.9 28.9 22.4 30.8 23 33.2 23.4 35.9 25.3 36.4 26.9 36.8 28.1 35.6 28.8 33.4 29.7 30.6 30.2 27.2 31.4 24.3 32.7 21.4 34.3 18.6 34.7 15.1 35.2 10.6 33.6 6.9 29.9 5.6 27.1 4.6 23.6 5.3 20 7.2Z";
const SMILE = "M12.6 16.2C15 19.5 17.4 20.7 20 20.7S25 19.5 27.4 16.2";

// O dente ocupa y 4.6 a 36.8 (32 unidades) no quadro de 40. Centro de referência:
const CX = 20;
const CY = 20.7;
// Corpo do dente (sem as raízes): quando ele cobre a tela, a janela está aberta
const CORPO = { w: 22, h: 18, cx: 20, cy: 16.5 };

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_ABRIR = [0.7, 0, 0.2, 1] as const;
const INICIO_SAIDA = 2050;
const DURACAO_SAIDA = 1150;

type Geo = { w: number; h: number; tamanho: number; cx: number; cy: number };

/**
 * Abertura (uma vez por sessão):
 * 1. Fundo gelo com degradê azul suave; o dente grande se desenha em traço azul, preenche e recebe um reflexo.
 * 2. "cliniz" sobe de uma máscara, letra a letra.
 * 3. O topo da página aparece de dentro da silhueta do dente, que cresce até cobrir a tela,
 *    enquanto o nome voa para o logo da barra do topo.
 * Clique, toque, Esc ou "Pular" adiantam a saída. Com movimento reduzido, não aparece.
 */
export function Preloader() {
  const [ativo, setAtivo] = useState(true);
  const [saindo, setSaindo] = useState(false);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [voo, setVoo] = useState<{ x: number; y: number; s: number } | null>(null);
  const furoRef = useRef<SVGPathElement>(null);
  const nomeRef = useRef<HTMLParagraphElement>(null);
  const saiu = useRef(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-vista")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- decisão depende do sessionStorage, lido antes da pintura
      setAtivo(false);
      terminarIntro();
      return;
    }
    const w = window.innerWidth;
    const h = window.innerHeight;
    const altura = Math.min(h * 0.27, w * 0.44);
    setGeo({ w, h, tamanho: altura / 32, cx: w / 2, cy: h * 0.4 });
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const sair = useCallback(() => {
    if (saiu.current || !geo) return;
    saiu.current = true;

    // Destino do nome: o wordmark dentro do logo da barra do topo
    const alvo = document.querySelector<SVGElement>('header a[aria-label^="Cliniz"] svg');
    const nome = nomeRef.current;
    if (alvo && nome) {
      const r = alvo.getBoundingClientRect();
      const n = nome.getBoundingClientRect();
      const proporcao = 47 / 123.9;
      const alvoX = r.left + r.width * proporcao;
      const alvoW = r.width * (1 - proporcao);
      setVoo({
        x: alvoX + alvoW / 2 - (n.left + n.width / 2),
        y: r.top + r.height * 0.55 - (n.top + n.height / 2),
        s: alvoW / n.width,
      });
    }
    setSaindo(true);

    const s0 = geo.tamanho;
    const s1 = Math.max(geo.w / CORPO.w, geo.h / CORPO.h) * 1.4;
    const aplicar = (k: number) => {
      const s = s0 * Math.pow(s1 / s0, k);
      const refX = CX + (CORPO.cx - CX) * k;
      const refY = CY + (CORPO.cy - CY) * k;
      const tx = geo.cx + (geo.w / 2 - geo.cx) * k - refX * s;
      const ty = geo.cy + (geo.h / 2 - geo.cy) * k - refY * s;
      furoRef.current?.setAttribute("transform", `translate(${tx} ${ty}) scale(${s})`);
    };
    aplicar(0);
    animate(0, 1, { duration: DURACAO_SAIDA / 1000, ease: EASE_ABRIR, onUpdate: aplicar });

    setTimeout(() => {
      terminarIntro();
      document.documentElement.style.overflow = "";
    }, 250);
    setTimeout(() => {
      try {
        sessionStorage.setItem(CHAVE_INTRO, "1");
      } catch {}
      setAtivo(false);
    }, DURACAO_SAIDA + 120);
  }, [geo]);

  useEffect(() => {
    if (!geo) return;
    const t = setTimeout(sair, INICIO_SAIDA);
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && sair();
    window.addEventListener("keydown", tecla);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", tecla);
    };
  }, [geo, sair]);

  if (!ativo) return null;

  return (
    <div data-intro className="intro-failsafe fixed inset-0 z-[100] cursor-pointer" role="status" aria-label="Carregando Cliniz" onClick={sair}>
      {/* Fundo gelo com a janela em forma de dente (aberta só na saída) */}
      <svg className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <radialGradient id="intro-bg" cx="50%" cy="38%" r="80%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.5" stopColor="#f1f5ff" />
            <stop offset="1" stopColor="#d6e3fb" />
          </radialGradient>
          <mask id="intro-janela" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="#fff" />
            <path ref={furoRef} d={TOOTH} fill="#000" opacity={saindo ? 1 : 0} />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#intro-bg)" mask="url(#intro-janela)" />
      </svg>

      {/* Brilho azul suave atrás do dente */}
      <motion.div
        className="pointer-events-none absolute top-[40%] left-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgb(95_140_255/0.22),transparent_65%)]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={saindo ? { opacity: 0 } : { opacity: 1, scale: 1 }}
        transition={{ duration: saindo ? 0.3 : 1.6, ease: EASE }}
        aria-hidden
      />

      {geo && (
        <>
          <motion.svg
            viewBox="0 0 40 40"
            className="absolute overflow-visible"
            style={{ left: geo.cx - 20 * geo.tamanho, top: geo.cy - CY * geo.tamanho, width: 40 * geo.tamanho, height: 40 * geo.tamanho }}
            animate={saindo ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            aria-hidden
          >
            <defs>
              <linearGradient id="intro-traco" x1="5" y1="5" x2="35" y2="37" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7aa2ff" />
                <stop offset="1" stopColor="#13379c" />
              </linearGradient>
              <linearGradient id="intro-fill" x1="6" y1="4" x2="34" y2="37" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5b8bff" />
                <stop offset="0.55" stopColor="#1d4ed8" />
                <stop offset="1" stopColor="#13379c" />
              </linearGradient>
              <linearGradient id="intro-brilho" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <clipPath id="intro-clip">
                <path d={TOOTH} />
              </clipPath>
            </defs>
            <motion.path
              d={TOOTH}
              fill="url(#intro-fill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
            />
            <motion.path
              d={TOOTH}
              fill="none"
              stroke="url(#intro-traco)"
              strokeWidth={0.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ pathLength: { duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.05 }, opacity: { duration: 0.15, delay: 0.05 } }}
            />
            <g clipPath="url(#intro-clip)">
              <g transform="rotate(24 20 20)">
                <motion.rect
                  y="-14"
                  width="8"
                  height="68"
                  fill="url(#intro-brilho)"
                  initial={{ x: -26 }}
                  animate={{ x: 52 }}
                  transition={{ duration: 0.85, ease: [0.45, 0, 0.2, 1], delay: 1.3 }}
                />
              </g>
            </g>
            <motion.path
              d={SMILE}
              fill="none"
              stroke="#fff"
              strokeWidth={2.2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.15 }}
            />
          </motion.svg>

          <div className="absolute inset-x-0 flex flex-col items-center" style={{ top: geo.cy + 16.5 * geo.tamanho + Math.max(20, geo.h * 0.04) }}>
            <motion.p
              ref={nomeRef}
              className="flex overflow-hidden pb-[0.06em] text-[clamp(3.2rem,9.5vh,6rem)] leading-none font-bold tracking-[-0.035em] text-ink"
              animate={voo ? { x: voo.x, y: voo.y, scale: voo.s, color: "#ffffff", opacity: [1, 1, 0] } : undefined}
              transition={{ duration: 0.95, ease: EASE_ABRIR, opacity: { duration: 0.95, times: [0, 0.8, 1] } }}
              aria-hidden
            >
              {"cliniz".split("").map((l, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.95 + i * 0.06 }}
                >
                  {l}
                </motion.span>
              ))}
            </motion.p>
            <motion.p
              className="mt-4 pl-[0.42em] text-[0.72rem] font-semibold text-brand uppercase sm:text-[0.82rem]"
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={saindo ? { opacity: 0 } : { opacity: 1, letterSpacing: "0.42em" }}
              transition={saindo ? { duration: 0.2 } : { duration: 1, ease: EASE, delay: 1.45 }}
            >
              Odontologia
            </motion.p>
          </div>

          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sair();
            }}
            className="absolute right-4 bottom-4 px-3 py-2 text-[0.7rem] font-semibold tracking-[0.2em] text-muted uppercase transition hover:text-brand sm:right-8 sm:bottom-8"
            initial={{ opacity: 0 }}
            animate={saindo ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: saindo ? 0 : 0.6 }}
          >
            Pular
          </motion.button>
        </>
      )}
    </div>
  );
}
