"use client"

import { useEffect, useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "servicos", label: "Serviços" },
  { id: "sobre", label: "Sobre" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "contato", label: "Contato" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-20" : "h-28",
          )}
        >
          <Logo size={scrolled ? "md" : "lg"} priority />

          <nav className="hidden md:flex items-center gap-9">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-sm text-foreground/70 hover:text-foreground transition-colors group py-1"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+5511999999999"
              className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              (11) 99999-9999
            </a>
            <Button
              onClick={() => scrollToSection("contato")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5"
            >
              Agendar consulta
            </Button>
          </div>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden bg-background border-t border-border transition-[max-height,opacity] duration-500",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-4 py-5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left py-3 text-foreground border-b border-border/50 last:border-0"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4">
            <Button
              onClick={() => scrollToSection("contato")}
              className="w-full bg-primary text-primary-foreground rounded-full"
            >
              Agendar consulta
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
