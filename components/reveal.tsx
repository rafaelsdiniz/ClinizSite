"use client"

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react"
import { cn } from "@/lib/utils"

type RevealVariant = "up" | "fade" | "scale"

type RevealProps = {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  delay?: number
  as?: ElementType
  threshold?: number
  once?: boolean
}

const variantClass: Record<RevealVariant, string> = {
  up: "reveal",
  fade: "reveal-fade",
  scale: "reveal-scale",
}

export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  threshold = 0.15,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once])

  return (
    <Tag
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(variantClass[variant], visible && "is-visible", className)}
    >
      {children}
    </Tag>
  )
}
