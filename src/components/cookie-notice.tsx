"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cookie } from "lucide-react";

const CHAVE = "cliniz:cookies";

/** Aviso de cookies decorativo: o site não usa cookies de rastreamento. */
export function CookieNotice() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    let visto = false;
    try {
      visto = localStorage.getItem(CHAVE) === "ok";
    } catch {}
    if (visto) return;
    // Aparece depois que a pessoa começa a rolar (ou após alguns segundos), sem cobrir o topo
    const abrir = () => setAberto(true);
    const onScroll = () => window.scrollY > 400 && abrir();
    const t = setTimeout(abrir, 9000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function fechar() {
    setAberto(false);
    try {
      localStorage.setItem(CHAVE, "ok");
    } catch {}
  }

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          role="region"
          aria-label="Aviso de cookies"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-24 z-40 flex max-w-[22rem] items-start gap-3 bg-white/95 p-4 shadow-lift ring-1 ring-line backdrop-blur sm:bottom-6 sm:left-6 sm:right-auto"
        >
          <span className="inline-flex size-9 shrink-0 items-center justify-center bg-ice text-brand">
            <Cookie className="size-[1.1rem]" aria-hidden />
          </span>
          <div className="text-[0.82rem] leading-snug text-muted">
            Usamos apenas cookies essenciais para o site funcionar bem.
            <button
              type="button"
              onClick={fechar}
              className="mt-2.5 block bg-ink px-4 py-1.5 text-[0.8rem] font-semibold text-white transition hover:bg-brand"
            >
              Entendi
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
