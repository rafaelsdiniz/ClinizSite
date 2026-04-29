import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"

const quickLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
]

export function Footer() {
  return (
    <footer className="relative bg-[oklch(0.16_0.04_245)] text-white overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Image
              src="/clinizlogo.png"
              alt="Cliniz"
              width={300}
              height={100}
              className="w-18 h-auto"
              priority
            />

            <p className="mt-6 text-white/65 max-w-sm leading-relaxed text-[15px]">
              Cuidando de sorrisos com excelência há mais de 15 anos. Sua saúde
              bucal em mãos em quem você pode confiar.
            </p>

            <div className="flex gap-3 mt-7">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-5 text-sm tracking-wide text-white">
              Navegação
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-5 text-sm tracking-wide text-white">
              Contato
            </h4>

            <ul className="space-y-3 text-white/60 text-sm">
              <li>Av. Paulista, 1000 - Sala 501</li>
              <li>São Paulo - SP</li>

              <li>
                <a
                  href="tel:+5511999999999"
                  className="hover:text-white transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>

              <li>
                <a
                  href="mailto:contato@cliniz.com.br"
                  className="hover:text-white transition-colors"
                >
                  contato@cliniz.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Cliniz. Todos os direitos reservados.
          </p>

          <div className="flex gap-6 text-xs text-white/45">
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidade
            </a>

            <a href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}