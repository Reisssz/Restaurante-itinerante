"use client";

import { useEffect, useRef } from "react";
import { navegacao } from "@/data/content";
import { caminhoCalda, LARGURA_CALDA, padroesGotas } from "@/components/marca/Calda";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { StatusAberto } from "@/components/ui/StatusAberto";
import { enderecoCompleto } from "@/lib/links";
import { obterLenis } from "@/lib/rolagem";

interface Props {
  aberto: boolean;
  aoFechar: () => void;
}

/** Menu em tela cheia: a calda preta escorre do topo e os itens sobem em cascata. */
export function MenuMobile({ aberto, aoFechar }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const lenis = obterLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });

    const aoTeclar = (evento: KeyboardEvent) => evento.key === "Escape" && aoFechar();
    window.addEventListener("keydown", aoTeclar);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, aoFechar]);

  return (
    <div
      ref={ref}
      id="menu-mobile"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!aberto}
      className={`sobre-escuro fixed inset-0 z-40 lg:hidden ${aberto ? "visible" : "invisible delay-700"}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-full bg-ink transition-transform duration-700 ease-[var(--ease-expo)] ${
          aberto ? "translate-y-0" : "-translate-y-[calc(100%+20vw)]"
        }`}
      >
        <svg viewBox={`0 0 ${LARGURA_CALDA} 300`} className="absolute inset-x-0 top-full w-full -translate-y-px" aria-hidden>
          <path d={caminhoCalda(padroesGotas[2], 0.9)} className="fill-ink" />
        </svg>
      </div>

      <nav aria-label="Menu" className="relative flex h-full flex-col justify-between px-5 pb-8 pt-[calc(var(--header)+2rem)]">
        <ol className="space-y-1">
          {navegacao.map((item, i) => (
            <li key={item.rotulo} className="overflow-hidden">
              <a
                href={item.href}
                data-categoria={"categoria" in item ? item.categoria : undefined}
                onClick={aoFechar}
                style={{ transitionDelay: aberto ? `${180 + i * 70}ms` : "0ms" }}
                className={`flex items-baseline gap-4 py-1 text-paper transition-transform duration-700 ease-[var(--ease-expo)] ${
                  aberto ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <span className="rotulo tabular text-flame">{String(i + 1).padStart(2, "0")}</span>
                <span className={`display text-[clamp(3rem,15vw,6rem)] ${i % 2 ? "display-italico" : ""}`}>{item.rotulo}</span>
              </a>
            </li>
          ))}
        </ol>

        <div
          className={`space-y-4 text-paper transition-opacity duration-500 ${aberto ? "opacity-100 delay-500" : "opacity-0"}`}
        >
          <StatusAberto className="rotulo text-flame" />
          <p className="text-sm text-paper/80">{enderecoCompleto()}</p>
          <BotaoWhatsApp variante="chama" className="w-full" magnetico={false} />
        </div>
      </nav>
    </div>
  );
}
