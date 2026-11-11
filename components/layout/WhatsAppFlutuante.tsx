"use client";

import { useEffect, useState } from "react";
import { usePedido } from "@/lib/pedido";
import { linkWhatsApp } from "@/lib/links";
import { IconeWhatsApp } from "@/components/ui/Icones";

/** Botão de WhatsApp sempre a um toque: aparece depois do hero, some na seção Visite e quando há comanda. */
export function WhatsAppFlutuante() {
  const { quantidadeTotal } = usePedido();
  const [heroVisivel, setHeroVisivel] = useState(true);
  const [visiteVisivel, setVisiteVisivel] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const visite = document.getElementById("visite");
    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        if (entrada.target === hero) setHeroVisivel(entrada.isIntersecting);
        if (entrada.target === visite) setVisiteVisivel(entrada.isIntersecting);
      }
    });
    if (hero) observador.observe(hero);
    if (visite) observador.observe(visite);
    return () => observador.disconnect();
  }, []);

  const visivel = !heroVisivel && !visiteVisivel && quantidadeTotal === 0;

  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir no WhatsApp (abre em nova aba)"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel}
      className={`group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex h-14 items-center gap-0 rounded-full bg-flame pl-4 pr-4 text-ink shadow-[0_0_0_3px_var(--color-ink)] transition-all duration-500 ease-[var(--ease-expo)] md:right-6 ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      }`}
    >
      <IconeWhatsApp className="size-6" />
      <span className="condensada max-w-0 overflow-hidden whitespace-nowrap text-sm tracking-[0.1em] transition-all duration-500 ease-[var(--ease-expo)] group-hover:ml-2.5 group-hover:max-w-24 group-focus-visible:ml-2.5 group-focus-visible:max-w-24">
        Pedir
      </span>
    </a>
  );
}
