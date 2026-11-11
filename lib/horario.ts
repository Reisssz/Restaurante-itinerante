import { site, type DiaSemana, type Expediente } from "@/data/site";
import { formatarHora } from "./formatar";

export const nomesDias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"] as const;
const nomesSchema = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export interface StatusFuncionamento {
  aberto: boolean;
  texto: string;
  diaAtual: DiaSemana;
}

interface Agora {
  dia: DiaSemana;
  minutos: number;
}

const paraMinutos = (hora: string) => {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
};

function agoraNoFuso(data: Date): Agora {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: site.fusoHorario,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(data);
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? "0";
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(valor("weekday")) as DiaSemana;
  return { dia, minutos: Number(valor("hour")) * 60 + Number(valor("minute")) };
}

const expedienteDo = (dia: number): Expediente | undefined => site.horarios.find((h) => h.dia === dia);

function proximaAbertura(agora: Agora): string {
  const hoje = expedienteDo(agora.dia);
  if (hoje && agora.minutos < paraMinutos(hoje.abre)) return `abre hoje às ${formatarHora(hoje.abre)}`;

  for (let salto = 1; salto <= 7; salto++) {
    const dia = (agora.dia + salto) % 7;
    const expediente = expedienteDo(dia);
    if (!expediente) continue;
    const quando = salto === 1 ? "amanhã" : nomesDias[dia];
    return `abre ${quando} às ${formatarHora(expediente.abre)}`;
  }
  return "";
}

export function calcularStatus(data = new Date()): StatusFuncionamento {
  const agora = agoraNoFuso(data);
  const hoje = expedienteDo(agora.dia);
  const aberto = !!hoje && agora.minutos >= paraMinutos(hoje.abre) && agora.minutos < paraMinutos(hoje.fecha);

  if (aberto && hoje) return { aberto, texto: `Aberto agora · até ${formatarHora(hoje.fecha)}`, diaAtual: agora.dia };
  return { aberto, texto: `Fechado agora · ${proximaAbertura(agora)}`, diaAtual: agora.dia };
}

/** Agrupa dias consecutivos com o mesmo horário: "Segunda a sexta · 8h30 às 16h". */
export function horariosAgrupados(): { dias: string; horas: string; diasNumeros: number[] }[] {
  const grupos: { dias: number[]; abre: string; fecha: string }[] = [];
  for (const dia of [1, 2, 3, 4, 5, 6, 0]) {
    const expediente = expedienteDo(dia);
    const anterior = grupos.at(-1);
    const chave = expediente ? `${expediente.abre}-${expediente.fecha}` : "fechado";
    const chaveAnterior = anterior ? (anterior.abre ? `${anterior.abre}-${anterior.fecha}` : "fechado") : null;
    if (anterior && chave === chaveAnterior) anterior.dias.push(dia);
    else grupos.push({ dias: [dia], abre: expediente?.abre ?? "", fecha: expediente?.fecha ?? "" });
  }

  const capitalizar = (texto: string) => texto.charAt(0).toUpperCase() + texto.slice(1);
  return grupos.map((grupo) => {
    const primeiro = nomesDias[grupo.dias[0]];
    const ultimo = nomesDias[grupo.dias.at(-1)!];
    return {
      dias: capitalizar(grupo.dias.length > 1 ? `${primeiro} a ${ultimo}` : primeiro),
      horas: grupo.abre ? `${formatarHora(grupo.abre)} às ${formatarHora(grupo.fecha)}` : "Fechado",
      diasNumeros: grupo.dias,
    };
  });
}

export function horariosSchema() {
  return site.horarios.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${nomesSchema[h.dia]}`,
    opens: h.abre,
    closes: h.fecha,
  }));
}
