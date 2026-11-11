"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cookie, X } from "lucide-react";

const CHAVE = "cliniz:cookies";
export const EVENTO_PREFERENCIAS = "cliniz:cookies-preferencias";

type Escolha = { essenciais: true; desempenho: boolean; marketing: boolean; data: string };

const CATEGORIAS = [
  { id: "essenciais", nome: "Essenciais", texto: "Necessários para o site funcionar, como lembrar suas escolhas e os agendamentos feitos neste navegador.", fixo: true },
  { id: "desempenho", nome: "Desempenho", texto: "Ajudam a entender como o site é usado, de forma agregada, para melhorar a navegação.", fixo: false },
  { id: "marketing", nome: "Marketing", texto: "Permitem mostrar conteúdos da Cliniz mais relevantes para você em outros sites.", fixo: false },
] as const;

function ler(): Escolha | null {
  try {
    const v = localStorage.getItem(CHAVE);
    if (!v) return null;
    const o = JSON.parse(v);
    return typeof o === "object" && o ? o : null;
  } catch {
    return null;
  }
}

function salvar(e: Omit<Escolha, "data" | "essenciais">) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ essenciais: true, ...e, data: new Date().toISOString() }));
  } catch {}
}

/** Banner de cookies com Aceitar, Recusar e Preferências por categoria. */
export function CookieNotice() {
  const [banner, setBanner] = useState(false);
  const [painel, setPainel] = useState(false);
  const [prefs, setPrefs] = useState({ desempenho: false, marketing: false });
  const [salvo, setSalvo] = useState(false);
  const fecharRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const escolha = ler();
    /* eslint-disable react-hooks/set-state-in-effect -- estado inicial vem do localStorage */
    if (escolha) setPrefs({ desempenho: Boolean(escolha.desempenho), marketing: Boolean(escolha.marketing) });
    /* eslint-enable react-hooks/set-state-in-effect */
    const abrirPainel = () => {
      const e = ler();
      if (e) setPrefs({ desempenho: Boolean(e.desempenho), marketing: Boolean(e.marketing) });
      setPainel(true);
    };
    window.addEventListener(EVENTO_PREFERENCIAS, abrirPainel);
    if (escolha) return () => window.removeEventListener(EVENTO_PREFERENCIAS, abrirPainel);

    const abrir = () => setBanner(true);
    const onScroll = () => window.scrollY > 400 && abrir();
    const t = setTimeout(abrir, 9000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(EVENTO_PREFERENCIAS, abrirPainel);
    };
  }, []);

  useEffect(() => {
    if (!painel) return;
    fecharRef.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setPainel(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [painel]);

  function concluir(e: { desempenho: boolean; marketing: boolean }) {
    salvar(e);
    setPrefs(e);
    setBanner(false);
    setPainel(false);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2600);
  }

  return (
    <>
      <AnimatePresence>
        {banner && !painel && (
          <motion.div
            role="region"
            aria-label="Aviso de cookies"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl bg-white p-5 shadow-lift ring-1 ring-line sm:bottom-6 sm:p-6"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="flex flex-1 gap-4">
                <span className="hidden size-10 shrink-0 items-center justify-center bg-brand-50 text-brand sm:inline-flex">
                  <Cookie className="size-5" aria-hidden />
                </span>
                <p className="text-sm leading-relaxed text-muted">
                  Usamos cookies para o site funcionar e, com a sua permissão, para entender o uso e melhorar a experiência. Saiba mais na{" "}
                  <Link href="/privacidade" className="font-semibold text-brand underline-offset-4 hover:underline">
                    política de privacidade
                  </Link>
                  .
                </p>
              </div>
              <div className="grid shrink-0 grid-cols-3 gap-2 md:flex">
                <button type="button" onClick={() => setPainel(true)} className="min-h-11 px-3 text-sm font-semibold text-ink-soft ring-1 ring-line transition hover:text-brand hover:ring-brand-300">
                  Preferências
                </button>
                <button type="button" onClick={() => concluir({ desempenho: false, marketing: false })} className="min-h-11 px-4 text-sm font-semibold text-ink-soft ring-1 ring-line transition hover:text-brand hover:ring-brand-300">
                  Recusar
                </button>
                <button type="button" onClick={() => concluir({ desempenho: true, marketing: true })} className="min-h-11 bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-600">
                  Aceitar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {painel && (
          <motion.div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPainel(false)}>
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-cookies"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[90dvh] w-full max-w-lg overflow-y-auto bg-white shadow-lift"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-line p-6">
                <div>
                  <h2 id="titulo-cookies" className="font-display text-2xl text-ink">
                    Preferências de cookies
                  </h2>
                  <p className="mt-1 text-sm text-muted">Escolha quais categorias você permite. Dá para mudar quando quiser pelo rodapé.</p>
                </div>
                <button ref={fecharRef} type="button" onClick={() => setPainel(false)} aria-label="Fechar" className="inline-flex size-9 shrink-0 items-center justify-center text-muted ring-1 ring-line transition hover:text-ink">
                  <X className="size-4" />
                </button>
              </div>
              <ul className="divide-y divide-line">
                {CATEGORIAS.map((c) => {
                  const ligado = c.fixo ? true : prefs[c.id as "desempenho" | "marketing"];
                  return (
                    <li key={c.id} className="flex items-start justify-between gap-6 p-6">
                      <div>
                        <p className="font-semibold text-ink">
                          {c.nome}
                          {c.fixo && <span className="ml-2 bg-ice px-2 py-0.5 text-[0.68rem] font-semibold tracking-wide text-brand uppercase">Sempre ativos</span>}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{c.texto}</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={ligado}
                        aria-label={c.nome}
                        disabled={c.fixo}
                        onClick={() => setPrefs((p) => ({ ...p, [c.id]: !p[c.id as "desempenho" | "marketing"] }))}
                        className={`relative mt-1 h-7 w-12 shrink-0 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${ligado ? "bg-brand" : "bg-line"}`}
                      >
                        <span className={`absolute top-1 left-1 size-5 bg-white shadow-soft transition-transform duration-300 ${ligado ? "translate-x-5" : ""}`} />
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="grid grid-cols-2 gap-2 border-t border-line p-6">
                <button type="button" onClick={() => concluir({ desempenho: false, marketing: false })} className="min-h-12 text-sm font-semibold text-ink-soft ring-1 ring-line transition hover:text-brand">
                  Recusar opcionais
                </button>
                <button type="button" onClick={() => concluir(prefs)} className="min-h-12 bg-brand text-sm font-semibold text-white transition hover:bg-brand-600">
                  Salvar escolhas
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {salvo && (
          <motion.div role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-x-4 bottom-6 z-[70] mx-auto max-w-xs bg-ink px-5 py-3.5 text-center text-sm text-white shadow-lift">
            Preferências de cookies salvas.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Link para reabrir as preferências (usado no rodapé e na política). */
export function LinkPreferencias({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(EVENTO_PREFERENCIAS))} className={className}>
      Preferências de cookies
    </button>
  );
}
