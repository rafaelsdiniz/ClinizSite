import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AgendarButton, LinkButton } from "@/components/ui";
import { Logo } from "@/components/logo";
import { TRATAMENTOS } from "@/lib/tratamentos";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink py-32 text-white">
      <Image src="/img/clinica.webp" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-40" style={{ objectPosition: "50% 60%" }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-brand-900/75 to-ink/95" aria-hidden />
      <div className="container-site text-center">
        <Logo variant="white" markOnly className="mx-auto h-14 w-auto" />
        <p className="mt-8 font-display text-[6.5rem] leading-none text-white/90 sm:text-[9rem]">
          4<em className="text-accent">0</em>4
        </p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">Esta página saiu para uma limpeza</h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-white/75">
          O endereço pode ter mudado ou não existe mais. Que tal seguir por um destes caminhos?
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <AgendarButton variant="white">Agendar consulta</AgendarButton>
          <LinkButton href="/" variant="glass">
            Voltar ao início
          </LinkButton>
        </div>
        <ul className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TRATAMENTOS.slice(0, 6).map((t) => (
            <li key={t.slug}>
              <Link
                href={`/tratamentos/${t.slug}`}
                className="group flex items-center justify-between bg-white/[0.07] px-5 py-4 text-left text-sm font-medium ring-1 ring-white/15 backdrop-blur transition hover:bg-white hover:text-brand-700"
              >
                {t.nome}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
