"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { buscarItem, nomeParaPedido } from "@/data/menu";
import { formatarPreco, somarEmCentavos } from "./formatar";

type Quantidades = Record<string, number>;

interface ContextoPedido {
  quantidades: Quantidades;
  quantidadeTotal: number;
  total: number;
  adicionar: (id: string) => void;
  remover: (id: string) => void;
  limpar: () => void;
  mensagem: () => string;
}

const Contexto = createContext<ContextoPedido | null>(null);
const CHAVE = "gi-pedido";

export function PedidoProvider({ children }: { children: ReactNode }) {
  const [quantidades, setQuantidades] = useState<Quantidades>({});

  useEffect(() => {
    try {
      const salvo = JSON.parse(localStorage.getItem(CHAVE) ?? "{}") as Quantidades;
      const validos = Object.fromEntries(Object.entries(salvo).filter(([id, qtd]) => buscarItem(id) && qtd > 0));
      setQuantidades(validos);
    } catch {
      localStorage.removeItem(CHAVE);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(quantidades));
  }, [quantidades]);

  const adicionar = useCallback((id: string) => {
    setQuantidades((atual) => ({ ...atual, [id]: Math.min(99, (atual[id] ?? 0) + 1) }));
  }, []);

  const remover = useCallback((id: string) => {
    setQuantidades((atual) => {
      const { [id]: quantidade = 0, ...resto } = atual;
      return quantidade > 1 ? { ...resto, [id]: quantidade - 1 } : resto;
    });
  }, []);

  const limpar = useCallback(() => setQuantidades({}), []);

  const valor = useMemo<ContextoPedido>(() => {
    const linhas = Object.entries(quantidades).flatMap(([id, qtd]) => {
      const item = buscarItem(id);
      return item ? [{ item, qtd }] : [];
    });
    const total = somarEmCentavos(linhas.map(({ item, qtd }) => item.preco * qtd));

    return {
      quantidades,
      quantidadeTotal: linhas.reduce((soma, { qtd }) => soma + qtd, 0),
      total,
      adicionar,
      remover,
      limpar,
      mensagem: () =>
        [
          "Olá! Quero fazer este pedido:",
          "",
          ...linhas.map(({ item, qtd }) => `${qtd}x ${nomeParaPedido(item)} — ${formatarPreco(item.preco * qtd)}`),
          "",
          `Total estimado: ${formatarPreco(total)}`,
          "(montado pelo site)",
        ].join("\n"),
    };
  }, [quantidades, adicionar, remover, limpar]);

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function usePedido(): ContextoPedido {
  const contexto = useContext(Contexto);
  if (!contexto) throw new Error("usePedido precisa estar dentro de <PedidoProvider>");
  return contexto;
}
