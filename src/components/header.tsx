"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CalendarCheck, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { NAV, SITE } from "@/lib/site";
import { StatusAberto } from "./status-aberto";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [rota, setRota] = useState(pathname);

  // Fecha o menu ao trocar de página
  if (rota !== pathname) {
    setRota(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const claro = scrolled || open;
  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`relative z-10 mx-auto flex items-center justify-between gap-4 transition-all duration-500 ease-out-soft ${
          claro
            ? "h-14 max-w-5xl bg-white/90 pr-2 pl-5 shadow-[0_12px_40px_-16px_rgb(11_26_54/0.35)] ring-1 ring-line/80 backdrop-blur-xl"
            : "h-16 max-w-[76rem] px-2 sm:px-5"
        }`}
      >
        <Link href="/" aria-label="Cliniz, página inicial" className={`shrink-0 transition-colors duration-500 ${claro ? "text-ink" : "text-white"}`}>
          <Logo variant={claro ? "color" : "white"} className={`w-auto transition-all duration-500 ${claro ? "h-7" : "h-8 sm:h-9"}`} />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const ativo = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={`px-4 py-2 text-[0.92rem] font-medium transition-colors duration-300 ${
                      claro
                        ? ativo
                          ? "bg-brand-50 text-brand"
                          : "text-ink-soft hover:bg-mist hover:text-ink"
                        : ativo
                          ? "bg-white/15 text-white"
                          : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/agendar"
            className={`hidden min-h-10 items-center gap-2 px-5 text-[0.88rem] font-semibold transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex ${
              claro ? "bg-brand text-white shadow-glow hover:bg-brand-600" : "bg-white text-brand-700 hover:bg-brand-50"
            }`}
          >
            <CalendarCheck className="size-4" aria-hidden />
            Agendar consulta
          </Link>
          <button
            type="button"
            className={`inline-flex size-10 items-center justify-center transition lg:hidden ${
              claro ? "text-ink ring-1 ring-line hover:ring-brand-300" : "text-white ring-1 ring-white/40 hover:bg-white/10"
            }`}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 overflow-y-auto bg-white px-5 pt-24 pb-8 lg:hidden"
          >
            <nav aria-label="Menu móvel">
              <ul>
                {[{ href: "/", label: "Início" }, ...NAV, { href: "/agendar/meus", label: "Meus agendamentos" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-line py-4 font-display text-[2rem] text-ink transition hover:pl-2 hover:text-brand"
                    >
                      {item.label}
                      <ArrowRight className="size-4 text-brand" aria-hidden />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/agendar"
                onClick={() => setOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 bg-brand px-6 py-4 font-semibold text-white shadow-glow"
              >
                <CalendarCheck className="size-5" aria-hidden />
                Agendar consulta
              </Link>
              <div className="mt-8 flex flex-col items-center gap-2 text-center text-sm text-muted">
                <StatusAberto className="text-ink-soft" />
                <p>Segunda a sexta, 8h às 19h. Sábado, 8h às 12h.</p>
                <p>{SITE.enderecoLinha1}, {SITE.enderecoLinha2}</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
