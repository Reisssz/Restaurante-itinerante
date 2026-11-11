"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registrarLenis, rolarPara, selecionarCategoria } from "@/lib/rolagem";
import type { CategoriaId } from "@/data/menu";

/** Lenis sincronizado com o ticker do GSAP + navegação por âncoras com offset do header. */
export function RolagemSuave() {
  useEffect(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let tick: ((tempo: number) => void) | null = null;

    if (!reduzir) {
      lenis = new Lenis({ autoRaf: false, lerp: 0.11, wheelMultiplier: 0.95 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (tempo) => lenis?.raf(tempo * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      registrarLenis(lenis);
    }

    const aoClicar = (evento: MouseEvent) => {
      const link = (evento.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || evento.defaultPrevented || evento.metaKey || evento.ctrlKey) return;
      const hash = link.getAttribute("href")!;
      const alvo = hash === "#" ? document.body : document.querySelector<HTMLElement>(hash);
      if (!alvo) return;
      evento.preventDefault();
      const categoria = link.dataset.categoria as CategoriaId | undefined;
      if (categoria) selecionarCategoria(categoria);
      rolarPara(alvo);
      history.replaceState(null, "", hash);
      alvo.setAttribute("tabindex", "-1");
      alvo.focus({ preventScroll: true });
    };
    document.addEventListener("click", aoClicar);

    const aoCarregarFontes = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(aoCarregarFontes);

    return () => {
      document.removeEventListener("click", aoClicar);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      registrarLenis(null);
    };
  }, []);

  return null;
}
