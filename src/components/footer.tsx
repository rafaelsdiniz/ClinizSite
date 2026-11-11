import Link from "next/link";
import { Logo } from "./logo";
import { HORARIOS, NAV, SITE, whatsappLink } from "@/lib/site";
import { TRATAMENTOS } from "@/lib/tratamentos";
import { WhatsappIcon } from "./whatsapp-icon";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] size-[34rem] rounded-full bg-brand/25 blur-[120px]"
        aria-hidden
      />
      <div className="container-site relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="white" className="h-9 w-auto" />
            <p className="mt-6 max-w-xs leading-relaxed text-white/65">
              Odontologia com planejamento digital, consulta sem pressa e cuidado em cada detalhe. Em {SITE.cidadeExtenso}.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:-translate-y-0.5 hover:bg-brand-50"
            >
              <WhatsappIcon className="size-4" />
              Conversar no WhatsApp
            </a>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">Navegação</h2>
              <ul className="mt-5 space-y-3 text-white/75">
                <li>
                  <Link href="/" className="transition hover:text-white">Início</Link>
                </li>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="transition hover:text-white">{n.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">Tratamentos</h2>
              <ul className="mt-5 space-y-3 text-white/75">
                {TRATAMENTOS.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/tratamentos/${t.slug}`} className="transition hover:text-white">{t.nome}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">Horários</h2>
              <ul className="mt-5 space-y-3 text-white/75">
                {HORARIOS.map((h) => (
                  <li key={h.dias}>
                    <span className="block text-white">{h.dias}</span>
                    {h.horas}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-white/75">
                <span className="block text-white">Localização</span>
                {SITE.cidade}
              </p>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-start md:justify-between">
          <p>© 2026 Cliniz Odontologia</p>
          <div className="max-w-xl md:text-right">
            <p>
              Site demonstrativo criado por{" "}
              <a
                href={SITE.autorUrl}
                target="_blank"
                rel="noopener"
                className="font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white"
              >
                Rafael Diniz
              </a>
              .
            </p>
            <p className="mt-1">
              A Cliniz é uma marca fictícia: nomes, depoimentos e informações são ilustrativos. Fotos de banco de imagens.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
