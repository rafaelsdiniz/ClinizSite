/* Divisórias entre seções. Curvas só aqui; cartões continuam retos. */

/** Curva suave e simétrica na base de uma seção (preenchida com a cor da seção seguinte). */
export function CurvaBase({ cor = "#ffffff", className = "" }: { cor?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -bottom-px h-10 w-full sm:h-16 lg:h-20 ${className}`}
      aria-hidden
    >
      <path d="M0 80V40C240 8 480 0 720 0s480 8 720 40v40H0Z" fill={cor} />
    </svg>
  );
}

/** Onda discreta, simétrica, no topo de uma seção. */
export function OndaTopo({ cor = "#ffffff", className = "" }: { cor?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -top-px z-10 h-8 w-full sm:h-12 ${className}`}
      aria-hidden
    >
      <path d="M0 0h1440v20c-120 26-240 40-360 30S840 10 720 10 480 40 360 50 120 46 0 20V0Z" fill={cor} />
    </svg>
  );
}
