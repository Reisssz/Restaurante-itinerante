"use client";

import { useEffect, useRef, useState } from "react";
import { CarrinhoMascote } from "@/components/marca/CarrinhoMascote";
import { caminhoCalda, LARGURA_CALDA, padroesGotas } from "@/components/marca/Calda";
import { gsap } from "@/lib/gsap";
import { obterLenis } from "@/lib/rolagem";

const CHAVE = "gi-visitou";

/**
 * Pré-loader da primeira visita: o carrinho entra rodando, os utensílios pulam,
 * as rodas piscam e uma calda laranja sobe revelando o hero (também laranja).
 * Renderizado no HTML do servidor; um script no <head> o esconde em visitas repetidas.
 */
export function PreLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [encerrado, setEncerrado] = useState(false);
  const linhaTempo = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const raiz = ref.current;
    const html = document.documentElement;
    if (!raiz || html.classList.contains("ja-visitou")) {
      setEncerrado(true);
      return;
    }

    const finalizar = () => {
      sessionStorage.setItem(CHAVE, "1");
      obterLenis()?.start();
      setEncerrado(true);
    };
    const travar = window.setTimeout(() => obterLenis()?.stop(), 0);

    const contador = { valor: 0 };
    const numero = raiz.querySelector<HTMLElement>("[data-contador]");
    const tl = gsap.timeline({ onComplete: finalizar });
    tl.from(raiz.querySelector(".pre-carrinho"), { xPercent: -160, rotation: -8, duration: 1.1, ease: "expo.out" })
      .from(raiz.querySelectorAll(".utensilio"), { y: 46, opacity: 0, duration: 0.5, stagger: 0.06, ease: "back.out(2.4)" }, 0.45)
      .to(raiz.querySelector("[data-linha]"), { scaleX: 1, duration: 1.35, ease: "power2.inOut" }, 0.15)
      .to(
        contador,
        {
          valor: 100,
          duration: 1.35,
          ease: "power2.inOut",
          onUpdate: () => numero && (numero.textContent = String(Math.round(contador.valor)).padStart(3, "0")),
        },
        0.15,
      )
      .to(raiz.querySelector("[data-calda]"), { yPercent: -100, duration: 0.75, ease: "expo.inOut" }, 1.45)
      .to(raiz, { autoAlpha: 0, duration: 0.25 }, 2.1);
    linhaTempo.current = tl;

    return () => {
      window.clearTimeout(travar);
      tl.kill();
    };
  }, []);

  const pular = () => linhaTempo.current?.progress(1);

  return (
    <div
      ref={ref}
      className="preloader fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-hidden bg-paper"
      data-fim={encerrado}
    >
      <div className="pre-carrinho w-[min(64vw,340px)]">
        <CarrinhoMascote />
      </div>

      <div className="mt-10 flex w-[min(80vw,420px)] items-end gap-3 text-ink" aria-hidden>
        <span className="rotulo shrink-0">Acendendo o fogão</span>
        <span className="relative mb-1 h-px flex-1 bg-ink/15">
          <span data-linha className="absolute inset-0 origin-left scale-x-0 bg-ink" />
        </span>
        <span className="condensada tabular text-xl" data-contador>
          000
        </span>
      </div>

      <button type="button" onClick={pular} className="rotulo absolute right-5 top-5 min-h-11 px-3 text-ink sublinhado">
        Pular
      </button>

      <div data-calda className="absolute inset-x-0 top-full h-[115%] bg-flame" aria-hidden>
        <svg
          viewBox={`0 0 ${LARGURA_CALDA} 300`}
          className="absolute inset-x-0 bottom-full w-full -scale-y-100 translate-y-px"
          preserveAspectRatio="none"
        >
          <path d={caminhoCalda(padroesGotas[1], 0.8)} className="fill-flame" />
        </svg>
      </div>
    </div>
  );
}
