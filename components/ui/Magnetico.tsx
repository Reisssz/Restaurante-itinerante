"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface Props {
  children: ReactNode;
  forca?: number;
  className?: string;
}

const PODE_ATRAIR = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Elemento "magnético": acompanha levemente o cursor quando ele se aproxima. */
export function Magnetico({ children, forca = 0.3, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento || !window.matchMedia(PODE_ATRAIR).matches) return;

    const moverX = gsap.quickTo(elemento, "x", { duration: 0.7, ease: "expo.out" });
    const moverY = gsap.quickTo(elemento, "y", { duration: 0.7, ease: "expo.out" });

    const aoMover = (evento: PointerEvent) => {
      const caixa = elemento.getBoundingClientRect();
      moverX((evento.clientX - (caixa.left + caixa.width / 2)) * forca);
      moverY((evento.clientY - (caixa.top + caixa.height / 2)) * forca);
    };
    const aoSair = () => {
      moverX(0);
      moverY(0);
    };

    elemento.addEventListener("pointermove", aoMover);
    elemento.addEventListener("pointerleave", aoSair);
    return () => {
      elemento.removeEventListener("pointermove", aoMover);
      elemento.removeEventListener("pointerleave", aoSair);
    };
  }, [forca]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}
