"use client";

import { useRef } from "react";
import { caminhoCalda, LARGURA_CALDA, padroesGotas } from "@/components/marca/Calda";
import { gsap, ScrollTrigger, SEM_REDUCAO, useGSAP } from "@/lib/gsap";

interface Props {
  /** Cor da seção ANTERIOR, que escorre sobre esta. */
  cor: string;
  padrao?: number;
  className?: string;
}

const ALTURA = 300;

/** Transição "calda": a borda da seção anterior escorre e as gotas crescem com o scroll. */
export function TransicaoCalda({ cor, padrao = 0, className = "" }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const gotas = padroesGotas[padrao % padroesGotas.length];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(SEM_REDUCAO, () => {
        const desenhar = (progresso: number) =>
          pathRef.current?.setAttribute("d", caminhoCalda(gotas, 0.15 + progresso * 0.85));
        const trigger = ScrollTrigger.create({
          trigger: svgRef.current,
          start: "top bottom",
          end: "bottom 35%",
          scrub: 0.6,
          onUpdate: (self) => desenhar(self.progress),
          onRefresh: (self) => desenhar(self.progress),
        });
        return () => trigger.kill();
      });
    },
    { scope: svgRef },
  );

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${LARGURA_CALDA} ${ALTURA}`}
      className={`pointer-events-none absolute inset-x-0 top-0 z-[5] block w-full -translate-y-px ${className}`}
      aria-hidden
    >
      <path ref={pathRef} d={caminhoCalda(gotas, 0.6)} style={{ fill: cor }} />
    </svg>
  );
}
