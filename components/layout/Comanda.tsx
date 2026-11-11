"use client";

import { useEffect, useId, useState } from "react";
import { buscarItem, nomeParaPedido } from "@/data/menu";
import { usePedido } from "@/lib/pedido";
import { formatarPreco } from "@/lib/formatar";
import { linkWhatsApp } from "@/lib/links";
import { IconeWhatsApp } from "@/components/ui/Icones";

/** Comanda: resumo do pedido montado no cardápio, enviado formatado pelo WhatsApp. */
export function Comanda() {
  const { quantidades, quantidadeTotal, total, adicionar, remover, limpar, mensagem } = usePedido();
  const [aberta, setAberta] = useState(false);
  const idLista = useId();

  useEffect(() => {
    if (quantidadeTotal === 0) setAberta(false);
  }, [quantidadeTotal]);

  const visivel = quantidadeTotal > 0;
  const linhas = Object.entries(quantidades).flatMap(([id, qtd]) => {
    const item = buscarItem(id);
    return item ? [{ item, qtd }] : [];
  });

  return (
    <aside
      aria-label="Seu pedido"
      inert={!visivel}
      className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 mx-auto max-w-md transition-transform duration-700 ease-[var(--ease-expo)] md:inset-x-auto md:right-6 md:w-[26rem] ${
        visivel ? "translate-y-0" : "translate-y-[140%]"
      }`}
    >
      <div className="relative bg-paper-deep text-ink shadow-[0_0_0_2px_var(--color-ink)]">
        <div
          aria-hidden
          className="absolute inset-x-0 -top-2 h-2 bg-[linear-gradient(-45deg,var(--color-paper-deep)_4px,transparent_0),linear-gradient(45deg,var(--color-paper-deep)_4px,transparent_0)] bg-[length:10px_8px] bg-repeat-x"
        />

        <div
          id={idLista}
          data-lenis-prevent
          className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-expo)] ${aberta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden">
            <div className="max-h-[50svh] overflow-y-auto px-5 pt-5">
              <div className="mb-3 flex items-baseline justify-between">
                <p className="mao text-3xl">Comanda</p>
                <button type="button" onClick={limpar} className="rotulo min-h-11 px-2 text-[0.65rem] sublinhado">
                  Limpar
                </button>
              </div>
              <ul className="divide-y divide-dashed divide-ink/30 border-y border-dashed border-ink/30">
                {linhas.map(({ item, qtd }) => (
                  <li key={item.id} className="flex items-center gap-3 py-2.5">
                    <span className="flex-1 text-sm font-medium leading-tight">{nomeParaPedido(item)}</span>
                    <span className="flex items-center">
                      <button
                        type="button"
                        onClick={() => remover(item.id)}
                        className="grid size-11 place-items-center text-lg"
                        aria-label={`Remover um ${item.nome}`}
                      >
                        −
                      </button>
                      <span className="condensada tabular w-6 text-center text-lg" aria-label={`${qtd} ${qtd === 1 ? "unidade" : "unidades"}`}>
                        {qtd}
                      </span>
                      <button
                        type="button"
                        onClick={() => adicionar(item.id)}
                        className="grid size-11 place-items-center text-lg"
                        aria-label={`Adicionar mais um ${item.nome}`}
                      >
                        +
                      </button>
                    </span>
                    <span className="condensada tabular w-20 text-right">{formatarPreco(item.preco * qtd)}</span>
                  </li>
                ))}
              </ul>
              <p className="py-3 text-xs text-ink/70">Total estimado. O atendente confirma valores e disponibilidade.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 pl-4">
          <button
            type="button"
            onClick={() => setAberta((a) => !a)}
            aria-expanded={aberta}
            aria-controls={idLista}
            className="flex min-h-12 flex-1 items-center gap-3 text-left"
          >
            <span className="condensada tabular grid size-9 place-items-center rounded-full bg-ink text-flame">
              {quantidadeTotal}
            </span>
            <span className="leading-tight">
              <span className="rotulo block text-[0.6rem]">{aberta ? "Fechar pedido" : "Ver pedido"}</span>
              <span className="condensada tabular text-xl" aria-live="polite">
                {formatarPreco(total)}
              </span>
            </span>
          </button>
          <a
            href={linkWhatsApp(mensagem())}
            target="_blank"
            rel="noopener noreferrer"
            className="botao botao-tinta"
          >
            <IconeWhatsApp className="size-[1.15em]" />
            Enviar
            <span className="sr-only">pedido pelo WhatsApp (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
