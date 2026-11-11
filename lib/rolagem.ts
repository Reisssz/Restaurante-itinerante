"use client";

import type Lenis from "lenis";
import type { CategoriaId } from "@/data/menu";

let instancia: Lenis | null = null;

export function registrarLenis(lenis: Lenis | null) {
  instancia = lenis;
}

export function obterLenis() {
  return instancia;
}

const alturaHeader = () => (window.matchMedia("(min-width: 768px)").matches ? 80 : 64);

export function rolarPara(alvo: string | HTMLElement) {
  const elemento = typeof alvo === "string" ? document.querySelector<HTMLElement>(alvo) : alvo;
  if (!elemento) return;
  if (instancia) {
    instancia.scrollTo(elemento, { offset: -alturaHeader() + 1, duration: 1.4 });
  } else {
    const topo = elemento.getBoundingClientRect().top + window.scrollY - alturaHeader() + 1;
    window.scrollTo({ top: topo, behavior: "smooth" });
  }
}

export const EVENTO_CATEGORIA = "gi:categoria";

export function selecionarCategoria(categoria: CategoriaId) {
  window.dispatchEvent(new CustomEvent<CategoriaId>(EVENTO_CATEGORIA, { detail: categoria }));
}
