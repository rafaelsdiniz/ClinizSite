import Link from "next/link";
import { CalendarCheck, Clock, MapPin } from "lucide-react";
import { Logo } from "./logo";
import { ENDERECO, MAPA_URL, NAV, SITE, whatsappLink } from "@/lib/site";
import { WhatsappIcon } from "./whatsapp-icon";
import { LinkPreferencias } from "./cookie-notice";
import { StatusAberto } from "./status-aberto";

function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

const linkCls = "transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-site grid gap-10 py-14 text-sm sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:gap-12">
        <div>
          <Logo variant="white" className="h-8 w-auto" />
          <p className="mt-4 max-w-xs leading-relaxed">Odontologia com planejamento digital e consulta sem pressa, na Savassi.</p>
          <div className="mt-5 flex gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da Cliniz"
              className="inline-flex size-10 items-center justify-center ring-1 ring-white/20 transition hover:bg-white hover:text-brand"
            >
              <WhatsappIcon className="size-4" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex size-10 items-center justify-center ring-1 ring-white/20 transition hover:bg-white hover:text-brand"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <a href={MAPA_URL} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition hover:text-white">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
            <span>
              {SITE.enderecoLinha1}
              <br />
              {SITE.enderecoLinha2}
              <br />
              CEP {ENDERECO.cep}
            </span>
          </a>
          <StatusAberto className="text-white/85" claro />
          <p className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
            <span>
              Seg. a sex., 8h às 19h
              <br />
              Sáb., 8h às 12h
            </span>
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
            <li>
              <Link href="/" className={linkCls}>Início</Link>
            </li>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkCls}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/agendar/meus" className={linkCls}>Meus agendamentos</Link>
            </li>
          </ul>
        </nav>

        <div>
          <Link
            href="/agendar"
            className="inline-flex min-h-11 items-center gap-2 bg-white px-5 font-semibold text-brand-700 transition hover:-translate-y-0.5 hover:bg-brand-50"
          >
            <CalendarCheck className="size-4" aria-hidden />
            Agendar consulta
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/45 sm:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>© 2026 Cliniz Odontologia</span>
            <Link href="/privacidade" className="transition hover:text-white">
              Privacidade
            </Link>
            <LinkPreferencias className="transition hover:text-white" />
          </p>
          <p>
            Desenvolvido por{" "}
            <a href={SITE.autorUrl} target="_blank" rel="noopener" className="text-white/70 transition hover:text-white">
              Rafael Diniz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
