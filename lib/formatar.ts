const formatadorPreco = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatarPreco(valor: number): string {
  return formatadorPreco.format(valor);
}

/** "R$ 29,90" sem o símbolo, para a coluna de preços do cardápio. */
export function formatarValor(valor: number): string {
  return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** "08:30" → "8h30", "16:00" → "16h" */
export function formatarHora(hora: string): string {
  const [h, m] = hora.split(":");
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
}

export function somarEmCentavos(valores: Iterable<number>): number {
  let total = 0;
  for (const valor of valores) total += Math.round(valor * 100);
  return total / 100;
}
