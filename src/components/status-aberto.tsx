"use client";

import { useEffect, useState } from "react";
import { situacaoAgora, type Situacao } from "@/lib/horario";

/** "Aberto agora" ou "Fechado", calculado pelo horário de Belo Horizonte. */
export function StatusAberto({ className = "", claro = false }: { className?: string; claro?: boolean }) {
  const [s, setS] = useState<Situacao | null>(null);
  useEffect(() => {
    const atualizar = () => setS(situacaoAgora());
    atualizar();
    const t = setInterval(atualizar, 60_000);
    return () => clearInterval(t);
  }, []);
  if (!s) return <span className={`inline-block h-5 w-40 animate-pulse ${claro ? "bg-white/10" : "bg-ice"} ${className}`} aria-hidden />;
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium ${className}`} role="status">
      <span className="relative flex size-2">
        {s.aberto && <span className="absolute inset-0 animate-ping bg-emerald-400 opacity-60" aria-hidden />}
        <span className={`relative size-2 ${s.aberto ? "bg-emerald-500" : "bg-accent"}`} aria-hidden />
      </span>
      {s.texto}
    </span>
  );
}
