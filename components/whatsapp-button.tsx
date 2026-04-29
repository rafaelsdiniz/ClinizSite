"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const PHONE = "5511999999999"
const MESSAGE = "Olá! Gostaria de agendar uma avaliação na Cliniz."

export function WhatsAppButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-30",
        "flex items-center justify-center h-14 w-14 rounded-full",
        "bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)]",
        "wa-pulse transition-all duration-500",
        "hover:scale-105 active:scale-95",
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.39.69 4.611 1.881 6.502L4 29l7.741-1.832A11.93 11.93 0 0 0 16.001 27C22.629 27 28 21.628 28 15.001 28 8.373 22.629 3 16.001 3Zm6.84 17.151c-.291.815-1.689 1.553-2.343 1.65-.624.094-1.41.133-2.273-.143-.524-.166-1.197-.388-2.06-.76-3.629-1.566-5.998-5.218-6.18-5.46-.18-.243-1.473-1.96-1.473-3.738 0-1.778.934-2.652 1.265-3.013.331-.36.722-.45.962-.45.241 0 .482.002.692.013.222.011.52-.084.813.62.301.722 1.024 2.5 1.114 2.682.09.181.15.392.03.633-.12.241-.18.392-.36.603-.181.211-.382.471-.546.633-.181.18-.371.376-.16.738.211.362.94 1.55 2.018 2.51 1.385 1.236 2.555 1.62 2.917 1.802.361.18.572.151.783-.09.211-.241.903-1.054 1.144-1.415.241-.362.482-.302.812-.181.331.12 2.106.994 2.467 1.174.361.181.602.272.692.422.09.151.09.873-.201 1.688Z" />
      </svg>
    </a>
  )
}
