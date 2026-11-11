"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { WhatsappIcon } from "./whatsapp-icon";

/** Botão flutuante do WhatsApp: aparece depois que a pessoa rola a primeira dobra. */
export function WhatsappFloat() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
      tabIndex={visivel ? 0 : -1}
      className={`fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_16px_36px_-10px_rgb(30_79_216/0.7)] ring-4 ring-white transition-all duration-500 ease-out-soft hover:scale-105 sm:right-6 sm:bottom-6 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <WhatsappIcon className="size-6" />
    </a>
  );
}
