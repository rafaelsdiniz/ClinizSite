/** Horário de funcionamento (Belo Horizonte, America/Sao_Paulo). 0 = domingo. */
const GRADE: Record<number, [number, number] | null> = {
  0: null,
  1: [8, 19],
  2: [8, 19],
  3: [8, 19],
  4: [8, 19],
  5: [8, 19],
  6: [8, 12],
};
const NOMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

function agoraEmBH() {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const v = (t: string) => partes.find((p) => p.type === t)?.value ?? "0";
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(v("weekday"));
  return { dia, minutos: (Number(v("hour")) % 24) * 60 + Number(v("minute")) };
}

export type Situacao = { aberto: boolean; texto: string };

export function situacaoAgora(): Situacao {
  const { dia, minutos } = agoraEmBH();
  const hoje = GRADE[dia];
  if (hoje && minutos >= hoje[0] * 60 && minutos < hoje[1] * 60) {
    return { aberto: true, texto: `Aberto agora · fecha às ${hoje[1]}h` };
  }
  if (hoje && minutos < hoje[0] * 60) return { aberto: false, texto: `Fechado · abre hoje às ${hoje[0]}h` };
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7;
    const g = GRADE[d];
    if (g) return { aberto: false, texto: `Fechado · abre ${i === 1 ? "amanhã" : NOMES[d]} às ${g[0]}h` };
  }
  return { aberto: false, texto: "Fechado" };
}
