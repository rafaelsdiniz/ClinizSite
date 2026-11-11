"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { TRATAMENTOS } from "@/lib/tratamentos";

const PERIODOS = ["Manhã", "Tarde", "Noite (até 19h)", "Sábado pela manhã"];

const campo =
  "mt-2 block w-full rounded-2xl border-0 bg-mist px-4 py-3.5 text-ink ring-1 ring-line transition placeholder:text-muted/70 focus:bg-white focus:ring-2 focus:ring-brand focus:outline-none";

export function ContatoForm() {
  const [enviado, setEnviado] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const linhas = [
      `Nome: ${d.get("nome")}`,
      d.get("interesse") ? `Interesse: ${d.get("interesse")}` : "",
      d.get("periodo") ? `Melhor período: ${d.get("periodo")}` : "",
      d.get("mensagem") ? `Mensagem: ${d.get("mensagem")}` : "",
    ].filter(Boolean);
    window.open(whatsappLink(`(Teste do formulário do site)\n${linhas.join("\n")}`), "_blank", "noopener,noreferrer");
    setEnviado(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="nome" className="text-sm font-semibold text-ink">
          Seu nome
        </label>
        <input id="nome" name="nome" required autoComplete="name" placeholder="Como podemos te chamar?" className={campo} />
      </div>
      <div>
        <label htmlFor="interesse" className="text-sm font-semibold text-ink">
          Tratamento de interesse
        </label>
        <select id="interesse" name="interesse" defaultValue="" className={campo}>
          <option value="">Ainda não sei</option>
          {TRATAMENTOS.map((t) => (
            <option key={t.slug}>{t.nome}</option>
          ))}
          <option>Outro</option>
        </select>
      </div>
      <div>
        <label htmlFor="periodo" className="text-sm font-semibold text-ink">
          Melhor período
        </label>
        <select id="periodo" name="periodo" defaultValue="" className={campo}>
          <option value="">Qualquer horário</option>
          {PERIODOS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="mensagem" className="text-sm font-semibold text-ink">
          Mensagem <span className="font-normal text-muted">(opcional)</span>
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          placeholder="Conte um pouco do que você procura"
          className={`${campo} resize-none`}
        />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          {enviado ? "Pronto! O WhatsApp foi aberto com a sua mensagem." : "Ao enviar, o WhatsApp abre com a mensagem pronta."}
        </p>
        <button
          type="submit"
          className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-brand px-7 whitespace-nowrap py-3.5 font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600"
        >
          Enviar pelo WhatsApp
          <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
        </button>
      </div>
    </form>
  );
}
