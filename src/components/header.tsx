"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { NAV, whatsappLink } from "@/lib/site";
import { WhatsappIcon } from "./whatsapp-icon";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-soft ${
        scrolled || open
          ? "border-b border-line/80 bg-white/85 shadow-[0_8px_30px_-18px_rgb(11_27_58/0.25)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="relative z-10 shrink-0 text-ink" aria-label="Cliniz, página inicial" onClick={() => setOpen(false)}>
          <Logo className="h-8 w-auto sm:h-9" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-[0.93rem] font-medium transition-colors ${
                    isActive(item.href) ? "text-brand" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand" aria-hidden />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[0.9rem] font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 sm:inline-flex"
          >
            <WhatsappIcon className="size-4" />
            Agendar avaliação
          </a>
          <button
            type="button"
            className="relative z-10 inline-flex size-11 items-center justify-center rounded-full text-ink ring-1 ring-line transition hover:ring-brand-300 lg:hidden"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
          >
            <nav aria-label="Menu móvel" className="container-site flex h-full flex-col py-8">
              <ul className="flex flex-col">
                {[{ href: "/", label: "Início" }, ...NAV].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.05, duration: 0.35 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-line py-4 font-display text-[2rem] leading-none text-ink"
                    >
                      {item.label}
                      <span className="text-base text-brand" aria-hidden>
                        →
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 font-semibold text-white shadow-glow"
              >
                <WhatsappIcon className="size-5" />
                Agendar avaliação
              </a>
              <p className="mt-auto pt-8 text-sm text-muted">Segunda a sexta, 8h às 19h. Sábado, 8h às 12h.</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
