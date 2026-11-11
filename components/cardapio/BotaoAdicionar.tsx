"use client";

import { nomeParaPedido, type ItemCardapio } from "@/data/menu";
import { usePedido } from "@/lib/pedido";

interface Props {
  item: ItemCardapio;
  className?: string;
}

export function BotaoAdicionar({ item, className = "" }: Props) {
  const { adicionar, quantidades } = usePedido();
  const quantidade = quantidades[item.id] ?? 0;

  return (
    <button
      type="button"
      onClick={() => adicionar(item.id)}
      aria-label={`Adicionar ${nomeParaPedido(item)} ao pedido${quantidade ? ` (${quantidade} no pedido)` : ""}`}
      className={`relative grid size-11 shrink-0 place-items-center rounded-full border-2 border-current text-xl leading-none transition-[background-color,color,transform] duration-300 ease-[var(--ease-expo)] hover:border-ink hover:bg-flame hover:text-ink active:scale-90 ${className}`}
    >
      <span aria-hidden>+</span>
      {quantidade > 0 && (
        <span
          aria-hidden
          className="condensada tabular absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-ink text-[0.7rem] text-flame ring-2 ring-flame"
        >
          {quantidade}
        </span>
      )}
    </button>
  );
}
