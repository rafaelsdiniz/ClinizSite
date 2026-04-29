"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const STORAGE_KEY = "cliniz_preloader_seen"
const VISIBLE_MS = 1600
const FADE_MS = 700

export function Preloader() {
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    setMounted(true)
    const seen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem(STORAGE_KEY) === "1"

    if (seen) return

    setShow(true)
    document.documentElement.style.overflow = "hidden"

    const fadeTimer = window.setTimeout(() => setFading(true), VISIBLE_MS)
    const removeTimer = window.setTimeout(() => {
      setShow(false)
      document.documentElement.style.overflow = ""
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1")
      } catch {
        /* ignore */
      }
    }, VISIBLE_MS + FADE_MS)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(removeTimer)
      document.documentElement.style.overflow = ""
    }
  }, [])

  if (!mounted || !show) return null

  return (
    <div
      className="preloader"
      style={{
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center">
        <div className="preloader-logo">
          <Image
            src="/clinizlogo.png"
            alt="Cliniz"
            width={520}
            height={290}
            priority
            style={{ height: "auto", width: "min(72vw, 280px)" }}
            className="object-contain"
          />
        </div>
        <span className="preloader-line mt-6" />
      </div>
    </div>
  )
}
