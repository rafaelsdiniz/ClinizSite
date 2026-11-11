import { LinkButton, WhatsappButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden bg-gradient-to-b from-ice to-white pt-32 pb-20">
      <div className="bg-dots pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)]" aria-hidden />
      <div className="container-site text-center">
        <p className="font-display text-[7rem] leading-none text-brand-200 sm:text-[10rem]">404</p>
        <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Página não encontrada</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">O endereço pode ter mudado. Volte para o início ou fale com a gente.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/">Voltar ao início</LinkButton>
          <WhatsappButton>Falar no WhatsApp</WhatsappButton>
        </div>
      </div>
    </section>
  );
}
