"use client";

import { useEffect, useState } from "react";
import { secoes } from "@/data/content";

/** Indicador discreto da seção atual (desktop). */
export function IndicadorSecao() {
  const [atual, setAtual] = useState(0);
  const [noRodape, setNoRodape] = useState(false);

  useEffect(() => {
    const rodape = document.getElementById("rodape");
    if (!rodape) return;
    const observador = new IntersectionObserver(([entrada]) => setNoRodape(entrada.isIntersecting));
    observador.observe(rodape);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          const indice = secoes.findIndex((s) => s.id === entrada.target.id);
          if (indice >= 0) setAtual(indice);
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    for (const secao of secoes) {
      const elemento = document.getElementById(secao.id);
      if (elemento) observador.observe(elemento);
    }
    return () => observador.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-6 left-6 z-30 hidden items-center gap-3 rounded-full bg-paper/85 py-2 pl-2 pr-4 text-ink backdrop-blur-sm transition-opacity duration-500 lg:flex ${
        atual === 0 || noRodape ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="condensada tabular grid size-9 place-items-center rounded-full bg-ink text-base text-flame">
        {String(atual + 1).padStart(2, "0")}
      </span>
      <span className="rotulo text-[0.65rem]">
        {secoes[atual].rotulo}
        <span className="text-ink/50"> / {String(secoes.length).padStart(2, "0")}</span>
      </span>
    </div>
  );
}
