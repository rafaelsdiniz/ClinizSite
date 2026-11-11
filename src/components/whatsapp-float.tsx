"use client";

import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/site";
import { WhatsappIcon } from "./whatsapp-icon";

/** Botão flutuante do WhatsApp (fica de fora no agendamento, que tem barra própria). */
export function WhatsappFloat() {
  const pathname = usePathname();
  if (pathname.startsWith("/agendar")) return null;
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Cliniz no WhatsApp"
      className="group fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center bg-brand text-white shadow-[0_16px_36px_-10px_rgb(29_78_216/0.7)] ring-4 ring-white/90 transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <span className="absolute inset-0 animate-ping bg-brand/40 [animation-duration:2.6s]" aria-hidden />
      <WhatsappIcon className="relative size-6" />
      <span className="pointer-events-none absolute right-full mr-3 hidden bg-ink px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
        Dúvidas? Fale com a gente
      </span>
    </a>
  );
}
