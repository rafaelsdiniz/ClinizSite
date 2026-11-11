import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { WhatsappIcon } from "./whatsapp-icon";

type BtnProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "white" | "outline-white";
};

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold tracking-[-0.01em] transition-all duration-300 ease-out-soft";
const variants = {
  primary:
    "bg-brand text-white shadow-glow hover:bg-brand-600 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-14px_rgb(30_79_216/0.65)]",
  ghost:
    "bg-white text-ink ring-1 ring-line hover:ring-brand-300 hover:text-brand hover:-translate-y-0.5 shadow-soft",
  white: "bg-white text-brand-700 hover:bg-brand-50 hover:-translate-y-0.5 shadow-soft",
  "outline-white": "text-white ring-1 ring-white/40 hover:bg-white/10 hover:ring-white/70",
};

export function WhatsappButton({ children, className = "", variant = "primary", extra }: BtnProps & { extra?: string }) {
  return (
    <a
      href={whatsappLink(extra)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <WhatsappIcon className="size-[1.15rem] shrink-0" />
      {children}
    </a>
  );
}

export function LinkButton({ children, className = "", variant = "ghost", href }: BtnProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function Eyebrow({ children, className = "", light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] ${
        light ? "text-brand-200" : "text-brand"
      } ${className}`}
    >
      <span className={`h-px w-7 ${light ? "bg-brand-300" : "bg-brand/60"}`} aria-hidden />
      {children}
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  intro,
  center = false,
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-4 font-display text-[2.35rem] leading-[1.05] tracking-[-0.015em] text-balance sm:text-5xl lg:text-[3.4rem] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-[1.05rem] leading-relaxed text-pretty ${light ? "text-brand-100/85" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 font-semibold text-brand transition-colors hover:text-brand-700 ${className}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}
