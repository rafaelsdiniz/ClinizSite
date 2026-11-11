"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Vídeo de fundo do topo. A foto (poster) aparece primeiro; o vídeo entra por cima
 * quando começa a tocar. Horizontal no computador, vertical no celular.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [fonte, setFonte] = useState<{ src: string; poster: string } | null>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) return;
    const celular = window.matchMedia("(max-width: 767px)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- a escolha depende da tela, só conhecida no navegador
    setFonte(
      celular
        ? { src: "/video/heroi-celular.mp4", poster: "/video/heroi-celular.webp" }
        : { src: "/video/heroi.mp4", poster: "/video/heroi.webp" },
    );
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !fonte) return;
    v.play().catch(() => {});
  }, [fonte]);

  return (
    <div className="absolute inset-0">
      <Image src="/video/heroi.webp" alt="" fill preload sizes="100vw" className="hidden object-cover md:block" />
      <Image src="/video/heroi-celular.webp" alt="" fill loading="eager" sizes="100vw" className="object-cover md:hidden" />
      {fonte && (
        <video
          ref={ref}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${tocando ? "opacity-100" : "opacity-0"}`}
          src={fonte.src}
          poster={fonte.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          onPlaying={() => setTocando(true)}
        />
      )}
    </div>
  );
}
