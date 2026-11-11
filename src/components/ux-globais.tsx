"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";

/** Barra fina de progresso da rolagem e botão de voltar ao topo. */
export function UxGlobais() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const [topo, setTopo] = useState(false);

  useEffect(() => {
    const on = () => setTopo(window.scrollY > window.innerHeight * 1.2);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand to-accent" style={{ scaleX }} aria-hidden />
      <AnimatePresence>
        {topo && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="group fixed right-5 bottom-[5.5rem] z-40 inline-flex size-12 items-center justify-center bg-white text-ink shadow-lift ring-1 ring-line transition hover:bg-ink hover:text-white sm:right-7 sm:bottom-[6.5rem]"
          >
            <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
