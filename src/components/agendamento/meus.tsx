"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, CalendarClock, CalendarPlus, CalendarX2, Clock, Info, X } from "lucide-react";
import {
  MESES,
  baixarIcs,
  deIso,
  formatarData,
  getProfissional,
  getTipo,
  hojeIso,
  lerAgendamentos,
  salvarAgendamentos,
  type Agendamento,
} from "@/lib/agenda";

export function MeusAgendamentos() {
  const [lista, setLista] = useState<Agendamento[] | null>(null);
  const [confirmando, setConfirmando] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  useEffect(() => {
    const ler = () => setLista(lerAgendamentos());
    ler();
    window.addEventListener("cliniz:agendamentos", ler);
    window.addEventListener("storage", ler);
    return () => {
      window.removeEventListener("cliniz:agendamentos", ler);
      window.removeEventListener("storage", ler);
    };
  }, []);

  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 3500);
    return () => clearTimeout(t);
  }, [aviso]);

  function cancelar(a: Agendamento) {
    salvarAgendamentos(lerAgendamentos().map((x) => (x.id === a.id ? { ...x, status: "cancelado" as const } : x)));
    setConfirmando(null);
    setAviso(`Consulta ${a.codigo} cancelada.`);
  }

  if (!lista) {
    return (
      <div className="mx-auto max-w-4xl space-y-4" aria-busy="true" aria-label="Carregando">
        {[0, 1].map((i) => (
          <div key={i} className="h-36 animate-pulse bg-mist" />
        ))}
      </div>
    );
  }

  const hoje = hojeIso();
  const ordenar = (a: Agendamento, b: Agendamento) => (a.data + a.hora).localeCompare(b.data + b.hora);
  const proximos = lista.filter((a) => a.status === "confirmado" && a.data >= hoje).sort(ordenar);
  const historico = lista.filter((a) => !(a.status === "confirmado" && a.data >= hoje)).sort((a, b) => ordenar(b, a));

  if (lista.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-xl flex-col items-center bg-mist px-6 py-16 text-center ring-1 ring-line"
      >
        <span className="inline-flex size-16 items-center justify-center bg-white text-brand ring-1 ring-line">
          <CalendarClock className="size-7" aria-hidden />
        </span>
        <h2 className="mt-6 font-display text-3xl text-ink">Nenhum agendamento por aqui</h2>
        <p className="mt-3 max-w-sm text-muted">Quando você agendar uma consulta neste navegador, ela aparece aqui para remarcar ou cancelar.</p>
        <Link
          href="/agendar"
          className="mt-8 inline-flex min-h-12 items-center gap-2 bg-brand px-7 font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-600"
        >
          <CalendarCheck className="size-4" aria-hidden />
          Agendar consulta
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-muted">
          {proximos.length === 0 ? "Nenhuma consulta futura." : proximos.length === 1 ? "1 consulta marcada." : `${proximos.length} consultas marcadas.`}
        </p>
        <Link
          href="/agendar"
          className="inline-flex min-h-11 items-center gap-2 bg-brand px-5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-600"
        >
          <CalendarCheck className="size-4" aria-hidden />
          Nova consulta
        </Link>
      </div>

      {proximos.length > 0 && (
        <Grupo titulo="Próximas consultas">
          {proximos.map((a, i) => (
            <Cartao key={a.id} a={a} i={i}>
              <AnimatePresence mode="wait" initial={false}>
                {confirmando === a.id ? (
                  <motion.div
                    key="confirmar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-3 bg-accent-soft/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                    role="alertdialog"
                    aria-label="Confirmar cancelamento"
                  >
                    <p className="text-sm font-medium text-accent-ink">Cancelar esta consulta?</p>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setConfirmando(null)} className="min-h-10 px-4 text-sm font-semibold text-ink-soft ring-1 ring-line bg-white transition hover:text-brand">
                        Manter
                      </button>
                      <button type="button" onClick={() => cancelar(a)} className="min-h-10 bg-danger px-4 text-sm font-semibold text-white transition hover:opacity-90">
                        Sim, cancelar
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="acoes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-3 gap-px bg-line">
                    <Link href={`/agendar?remarcar=${a.id}`} className="flex min-h-12 items-center justify-center gap-1.5 bg-white text-sm font-semibold text-ink-soft transition hover:bg-brand-50 hover:text-brand">
                      <CalendarClock className="size-4" aria-hidden />
                      Remarcar
                    </Link>
                    <button type="button" onClick={() => baixarIcs(a)} className="flex min-h-12 items-center justify-center gap-1.5 bg-white text-sm font-semibold text-ink-soft transition hover:bg-brand-50 hover:text-brand">
                      <CalendarPlus className="size-4" aria-hidden />
                      <span className="sm:hidden">Agenda</span>
                      <span className="hidden sm:inline">Adicionar à agenda</span>
                    </button>
                    <button type="button" onClick={() => setConfirmando(a.id)} className="flex min-h-12 items-center justify-center gap-1.5 bg-white text-sm font-semibold text-ink-soft transition hover:bg-red-50 hover:text-danger">
                      <CalendarX2 className="size-4" aria-hidden />
                      Cancelar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Cartao>
          ))}
        </Grupo>
      )}

      {historico.length > 0 && (
        <Grupo titulo="Histórico">
          {historico.map((a, i) => (
            <Cartao key={a.id} a={a} i={i} apagado />
          ))}
        </Grupo>
      )}

      <p className="mt-10 flex items-start justify-center gap-2 text-center text-xs text-muted">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        Demonstração: os agendamentos ficam só neste navegador e nenhuma consulta real é marcada.
      </p>

      <AnimatePresence>
        {aviso && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-4 bottom-6 z-50 mx-auto flex max-w-sm items-center justify-between gap-3 bg-ink px-5 py-4 text-sm text-white shadow-lift"
          >
            {aviso}
            <button type="button" onClick={() => setAviso(null)} aria-label="Fechar aviso" className="text-white/60 hover:text-white">
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">{titulo}</h2>
      <ul className="mt-4 space-y-4">{children}</ul>
    </section>
  );
}

function Cartao({ a, i, apagado = false, children }: { a: Agendamento; i: number; apagado?: boolean; children?: React.ReactNode }) {
  const d = deIso(a.data);
  const tipo = getTipo(a.tipoId);
  const prof = getProfissional(a.profissionalId);
  const cancelado = a.status === "cancelado";
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: i * 0.06 }}
      className={`overflow-hidden bg-white shadow-soft ring-1 ring-line ${apagado ? "opacity-75" : ""}`}
    >
      <div className="flex items-stretch">
        <div className={`flex w-20 shrink-0 flex-col items-center justify-center py-5 text-center sm:w-28 ${cancelado ? "bg-mist text-muted" : apagado ? "bg-ice text-ink-soft" : "bg-brand text-white"}`}>
          <span className="text-xs font-semibold uppercase">{MESES[d.getMonth()].slice(0, 3)}</span>
          <span className="font-display text-4xl leading-none sm:text-5xl">{d.getDate()}</span>
          <span className="mt-1 text-xs">{a.hora}</span>
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-4 p-4 sm:p-6">
          {prof && (
            <span className="relative hidden size-14 shrink-0 overflow-hidden bg-ice sm:block">
              <Image src={prof.foto} alt="" fill sizes="56px" className="object-cover" style={{ objectPosition: prof.foco }} />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-ink">{tipo?.nome}</p>
              <span
                className={`px-2 py-0.5 text-[0.68rem] font-semibold tracking-wide uppercase ${
                  cancelado ? "bg-red-50 text-danger" : apagado ? "bg-mist text-muted" : "bg-emerald-50 text-success"
                }`}
              >
                {cancelado ? "Cancelada" : apagado ? "Realizada" : "Confirmada"}
              </span>
            </div>
            <p className="mt-1 truncate text-sm text-muted">{prof?.nome}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft first-letter:uppercase">
              <Clock className="size-3.5 shrink-0 text-brand" aria-hidden />
              <span className="first-letter:uppercase">{formatarData(a.data, { semana: true })}</span>
            </p>
            <p className="mt-1 font-mono text-xs text-muted">{a.codigo}</p>
          </div>
        </div>
      </div>
      {children && <div className="border-t border-line">{children}</div>}
    </motion.li>
  );
}
