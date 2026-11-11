"use client";

import { gsap } from "./gsap";

/** Parallax por camada: `data-velocidade="0.4"` (positivo sobe mais rápido que o scroll). */
export function aplicarParallax(escopo: Element) {
  escopo.querySelectorAll<HTMLElement>("[data-velocidade]").forEach((elemento) => {
    const velocidade = Number(elemento.dataset.velocidade ?? 0);
    gsap.fromTo(
      elemento,
      { yPercent: velocidade * 18 },
      {
        yPercent: velocidade * -18,
        ease: "none",
        scrollTrigger: { trigger: elemento, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}

/** Revelação de imagem: clip-path abre de baixo para cima e o conteúdo assenta de 1.15 → 1. */
export function aplicarRevelacoes(escopo: Element) {
  escopo.querySelectorAll<HTMLElement>("[data-revelar]").forEach((elemento) => {
    const interno = elemento.firstElementChild;
    const tl = gsap.timeline({ scrollTrigger: { trigger: elemento, start: "top 85%", once: true } });
    tl.fromTo(elemento, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25 });
    if (interno) tl.fromTo(interno, { scale: 1.15 }, { scale: 1, duration: 1.6 }, 0);
  });
}
