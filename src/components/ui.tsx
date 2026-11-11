import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { WhatsappIcon } from "./whatsapp-icon";
import { MaskReveal } from "./reveal";

type Variant = "primary" | "secondary" | "white" | "glass";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 px-6 text-[0.95rem] font-semibold tracking-[-0.005em] transition-all duration-300 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export const buttonStyles: Record<Variant, string> = {
  primary: `${base} bg-brand text-white shadow-glow hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_20px_40px_-14px_rgb(29_78_216/0.7)]`,
  secondary: `${base} bg-white text-ink ring-1 ring-line shadow-soft hover:-translate-y-0.5 hover:text-brand hover:ring-brand-300`,
  white: `${base} bg-white text-brand-700 shadow-soft hover:-translate-y-0.5 hover:bg-brand-50`,
  glass: `${base} bg-white/10 text-white ring-1 ring-white/35 backdrop-blur-md hover:bg-white/20 hover:ring-white/60`,
};

type BtnProps = { children: React.ReactNode; className?: string; variant?: Variant };

/** CTA principal do site: leva ao agendamento online. */
export function AgendarButton({ children = "Agendar consulta", className = "", variant = "primary", href = "/agendar" }: Partial<BtnProps> & { href?: string }) {
  return (
    <Link href={href} className={`${buttonStyles[variant]} ${className}`}>
      <CalendarCheck className="size-[1.1rem] shrink-0" aria-hidden />
      {children}
    </Link>
  );
}

export function WhatsappButton({ children, className = "", variant = "secondary", extra }: BtnProps & { extra?: string }) {
  return (
    <a href={whatsappLink(extra)} target="_blank" rel="noopener noreferrer" className={`${buttonStyles[variant]} ${className}`}>
      <WhatsappIcon className="size-[1.1rem] shrink-0" />
      {children}
    </a>
  );
}

export function LinkButton({ children, className = "", variant = "secondary", href }: BtnProps & { href: string }) {
  return (
    <Link href={href} className={`${buttonStyles[variant]} ${className}`}>
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

/** Subtítulo pequeno acima dos títulos: só texto. */
export function Eyebrow({ children, className = "", tone = "brand" }: { children: React.ReactNode; className?: string; tone?: "brand" | "light" }) {
  return (
    <p
      className={`text-[0.78rem] font-semibold uppercase tracking-[0.18em] ${tone === "light" ? "text-brand-200" : "text-brand"} ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  intro,
  light = false,
  className = "",
  as: Tag = "h2",
  layout = "centro",
  numero,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  light?: boolean;
  className?: string;
  as?: "h1" | "h2";
  /** centro: tudo centralizado. split: título à esquerda e apoio à direita. */
  layout?: "centro" | "split";
  /** número da seção, mostrado acima do título no layout centralizado */
  numero?: string;
}) {
  const tituloCls = `font-display text-[2.35rem] leading-[1.06] text-balance sm:text-5xl lg:text-[3.5rem] ${light ? "text-white" : "text-ink"}`;
  const introCls = `text-[1.05rem] leading-relaxed text-pretty ${light ? "text-white/75" : "text-muted"}`;

  if (layout === "split") {
    return (
      <div className={`grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}>
        <div className="lg:col-span-7">
          {eyebrow && <Eyebrow tone={light ? "light" : "brand"}>{eyebrow}</Eyebrow>}
          <Tag className={`mt-4 ${tituloCls}`}>
            <MaskReveal>{title}</MaskReveal>
          </Tag>
        </div>
        {intro && (
          <div className={`lg:col-span-5 lg:border-l lg:pl-10 ${light ? "lg:border-white/20" : "lg:border-line"}`}>
            <p className={introCls}>{intro}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {numero && (
        <p className={`font-display text-[1.1rem] italic ${light ? "text-accent" : "text-accent-ink"}`} aria-hidden>
          {numero}
        </p>
      )}
      {eyebrow && <Eyebrow tone={light ? "light" : "brand"} className={numero ? "mt-2" : ""}>{eyebrow}</Eyebrow>}
      <Tag className={`mt-4 ${tituloCls}`}>
        <MaskReveal>{title}</MaskReveal>
      </Tag>
      {intro && <p className={`mx-auto mt-5 max-w-xl ${introCls}`}>{intro}</p>}
    </div>
  );
}
