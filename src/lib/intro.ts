"use client";

import { useEffect, useState } from "react";

// A abertura avisa quando termina, para o topo das páginas entrar em sequência.
const EVENTO = "cliniz:intro-fim";
export const CHAVE_INTRO = "cliniz-intro";
let terminou = false;

export function terminarIntro() {
  if (terminou) return;
  terminou = true;
  window.dispatchEvent(new Event(EVENTO));
}

/** true quando a abertura terminou (ou não vai acontecer nesta sessão). */
export function useIntroPronta() {
  const [pronta, setPronta] = useState(terminou);
  useEffect(() => {
    if (terminou) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza com o estado global da abertura
      setPronta(true);
      return;
    }
    // Sem abertura nesta sessão (já vista ou movimento reduzido): libera na hora
    if (document.documentElement.classList.contains("intro-vista")) {
      terminarIntro();
      setPronta(true);
      return;
    }
    const on = () => setPronta(true);
    window.addEventListener(EVENTO, on);
    return () => window.removeEventListener(EVENTO, on);
  }, []);
  return pronta;
}
