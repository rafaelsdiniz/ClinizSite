import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

type LogoProps = {
  href?: string
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "light"
  priority?: boolean
}

const sizeMap = {
  sm: { h: 40, w: 116 },
  md: { h: 56, w: 160 },
  lg: { h: 72, w: 208 },
  xl: { h: 112, w: 320 },
}

export function Logo({
  href = "/",
  className,
  size = "md",
  variant = "default",
  priority = false,
}: LogoProps) {
  const { h, w } = sizeMap[size]

  const inner =
    variant === "light" ? (
      <LightLogo height={h} className={className} />
    ) : (
      <Image
        src="/clinizlogo.png"
        alt="Cliniz - Clínica Odontológica"
        width={w * 4}
        height={h * 4}
        priority={priority}
        style={{ height: h, width: "auto" }}
        className={cn("object-contain", className)}
      />
    )

  if (!href) return inner
  return (
    <Link href={href} aria-label="Cliniz - início" className="inline-flex items-center">
      {inner}
    </Link>
  )
}

function LightLogo({ height, className }: { height: number; className?: string }) {
  // Aspect ratio chosen so the wordmark sits under the icon, total ~ 16:11
  const width = (height / 11) * 16
  return (
    <svg
      viewBox="0 0 320 220"
      style={{ height, width }}
      className={cn("text-white", className)}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Cliniz"
      role="img"
    >
      <defs>
        <linearGradient id="cliniz-tooth" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9bd0e0" />
          <stop offset="100%" stopColor="#3e7aa8" />
        </linearGradient>
      </defs>

      {/* Tooth */}
      <g transform="translate(110 8)" stroke="url(#cliniz-tooth)" strokeWidth="3.6" fill="none">
        <path d="M50 6c14 0 22 10 22 26 0 11-2.5 19-6 29-3 8.5-7 16-12 21-1.7 2-3.3 2.5-5 2.5s-3.3-.5-5-2.5c-5-5-9-12.5-12-21-3.5-10-6-18-6-29C26 16 36 6 50 6Z" />
        <path d="M35 38c4 3.6 9 5.4 15 5.4s11-1.8 15-5.4" strokeWidth="3.6" />
      </g>

      {/* CLINIZ wordmark */}
      <text
        x="160"
        y="160"
        textAnchor="middle"
        fontFamily="var(--font-serif), Georgia, serif"
        fontWeight="600"
        fontSize="58"
        letterSpacing="3"
        fill="#ffffff"
        stroke="none"
      >
        CLINIZ
      </text>

      {/* Tagline */}
      <text
        x="160"
        y="190"
        textAnchor="middle"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fontWeight="500"
        fontSize="13"
        letterSpacing="4.5"
        fill="#9bd0e0"
        stroke="none"
      >
        CLÍNICA ODONTOLÓGICA
      </text>
    </svg>
  )
}
