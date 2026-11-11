/**
 * Biblioteca de formas "calda" — inspiradas nos escorridos laranja/preto do cardápio impresso.
 * Todas em viewBox 0 0 400 400.
 */
export const formasCalda = {
  cantoEscorrendo:
    "M0 0H400C382 38 334 28 322 70C312 106 342 122 332 160C324 192 290 194 285 160C280 128 302 110 262 100C214 90 222 160 190 200C164 232 160 302 139 302C117 302 125 240 110 210C95 180 60 190 40 232C25 262 0 252 0 230Z",
  bordaLateral:
    "M0 0C60 20 92 70 72 120C56 160 20 172 30 212C40 252 96 256 100 302C104 346 50 362 30 400H0Z",
  gota: "M200 20C240 120 300 170 300 250C300 316 255 360 200 360C145 360 100 316 100 250C100 170 160 120 200 20Z",
  respingo:
    "M120 60C180 20 260 40 300 90C340 140 382 150 370 210C360 270 300 260 280 310C260 360 190 380 140 340C96 306 120 260 80 230C36 200 50 110 120 60Z",
  baseOndulada:
    "M0 400V300C50 280 80 320 130 300C170 284 170 240 200 240C232 240 228 290 270 300C320 312 350 270 400 280V400Z",
  cantoInferior:
    "M400 400H120C150 380 170 350 210 350C250 350 250 300 290 290C320 282 330 240 320 200C312 165 330 120 360 110C385 102 400 80 400 60Z",
  fita: "M0 120C80 60 160 160 250 110C320 70 360 40 400 50V90C360 82 330 110 270 150C170 215 90 120 0 170Z",
} as const;

export type NomeFormaCalda = keyof typeof formasCalda;

interface Props {
  forma: NomeFormaCalda;
  className?: string;
  cor?: string;
}

export function FormaCalda({ forma, className, cor = "var(--color-ink)" }: Props) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden preserveAspectRatio="none">
      <path d={formasCalda[forma]} style={{ fill: cor }} />
    </svg>
  );
}

export interface Gota {
  x: number;
  largura: number;
  comprimento: number;
}

export const LARGURA_CALDA = 1440;

/**
 * Gera uma borda que escorre. Mesma estrutura de comandos para qualquer `progresso`,
 * o que permite interpolar o path (morph) apenas trocando números.
 */
export function caminhoCalda(gotas: Gota[], progresso: number, base = 36): string {
  const ordenadas = [...gotas].sort((a, b) => b.x - a.x);
  let d = `M0 0H${LARGURA_CALDA}V${base}`;
  for (const { x: c, largura: w, comprimento } of ordenadas) {
    const minimo = w * 0.3;
    const len = minimo + (comprimento - minimo) * progresso;
    const fundo = base + len;
    const curva = w * 0.66;
    d +=
      `L${c + w} ${base}` +
      `C${c + w * 0.45} ${base} ${c + w * 0.5} ${base + len * 0.45} ${c + w * 0.5} ${fundo}` +
      `C${c + w * 0.5} ${fundo + curva} ${c - w * 0.5} ${fundo + curva} ${c - w * 0.5} ${fundo}` +
      `C${c - w * 0.5} ${base + len * 0.45} ${c - w * 0.45} ${base} ${c - w} ${base}`;
  }
  return `${d}L0 ${base}Z`;
}

export const padroesGotas: Gota[][] = [
  [
    { x: 90, largura: 46, comprimento: 120 },
    { x: 300, largura: 70, comprimento: 190 },
    { x: 520, largura: 36, comprimento: 80 },
    { x: 760, largura: 90, comprimento: 150 },
    { x: 1010, largura: 40, comprimento: 210 },
    { x: 1230, largura: 64, comprimento: 110 },
  ],
  [
    { x: 160, largura: 80, comprimento: 170 },
    { x: 430, largura: 40, comprimento: 220 },
    { x: 650, largura: 56, comprimento: 90 },
    { x: 900, largura: 38, comprimento: 140 },
    { x: 1120, largura: 86, comprimento: 200 },
    { x: 1360, largura: 40, comprimento: 70 },
  ],
  [
    { x: 60, largura: 36, comprimento: 90 },
    { x: 250, largura: 60, comprimento: 150 },
    { x: 560, largura: 96, comprimento: 210 },
    { x: 840, largura: 40, comprimento: 120 },
    { x: 1080, largura: 52, comprimento: 170 },
    { x: 1320, largura: 70, comprimento: 130 },
  ],
];
