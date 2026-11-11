"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { avisoPrecos, cardapio, notaSobremesas, type CategoriaId } from "@/data/menu";
import type { ChaveFoto } from "@/data/fotos";
import type { NomeUtensilio } from "@/data/tipos";
import { site } from "@/data/site";
import { IconeUtensilio } from "@/components/marca/Utensilios";
import { TransicaoCalda } from "@/components/efeitos/TransicaoCalda";
import { CardDestaque } from "@/components/cardapio/CardDestaque";
import { ItemLinha } from "@/components/cardapio/ItemLinha";
import { Foto } from "@/components/ui/Foto";
import { SetaBaixo } from "@/components/ui/Icones";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { aplicarRevelacoes } from "@/lib/efeitos";
import { gsap, SEM_REDUCAO, useGSAP } from "@/lib/gsap";
import { EVENTO_CATEGORIA } from "@/lib/rolagem";

const PREVIA = "(min-width: 1024px) and (pointer: fine)";

export function Cardapio() {
  const ref = useRef<HTMLElement>(null);
  const [ativa, setAtiva] = useState<CategoriaId>("cafes");
  const categoria = cardapio.find((c) => c.id === ativa)!;

  useEffect(() => {
    const aoSelecionar = (evento: Event) => setAtiva((evento as CustomEvent<CategoriaId>).detail);
    window.addEventListener(EVENTO_CATEGORIA, aoSelecionar);
    return () => window.removeEventListener(EVENTO_CATEGORIA, aoSelecionar);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(SEM_REDUCAO, () => {
        const painel = ref.current!.querySelector("[data-painel]")!;
        gsap.fromTo(
          painel.querySelectorAll("[data-titulo-categoria] > span"),
          { yPercent: 110 },
          { yPercent: 0, duration: 1, ease: "expo.out" },
        );
        gsap.fromTo(
          painel.querySelectorAll("[data-item]"),
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.03, ease: "expo.out" },
        );
        gsap.fromTo(
          painel.querySelectorAll("[data-pontilhado]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, stagger: 0.03, delay: 0.15, ease: "expo.out" },
        );
        aplicarRevelacoes(painel);
      });
    },
    { scope: ref, dependencies: [ativa], revertOnUpdate: true },
  );

  return (
    <section
      id="cardapio"
      ref={ref}
      aria-labelledby="titulo-cardapio"
      className="papel relative bg-paper pb-28 pt-[26vw] text-ink sm:pt-[22vw] lg:pt-[17vw]"
    >
      <TransicaoCalda cor="var(--color-ink)" padrao={1} />

      <div className="mx-auto max-w-[1800px] px-4 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="rotulo mb-6 flex items-center gap-3">
              <span className="tabular text-ember">03</span>
              <span className="h-px w-10 bg-ink" />A carta
            </p>
            <TituloRevelado id="titulo-cardapio" className="display relative text-[23vw] lg:text-[13vw]">
              Cardá<span className="display-italico">pio</span>
            </TituloRevelado>
          </div>
          <div className="space-y-5 lg:col-span-4 lg:pb-[2vw]">
            <p className="mao -rotate-2 text-3xl leading-none">tudo que sai da panela ↓</p>
            <p className="max-w-sm text-[1.02rem] leading-snug">
              Do expresso pequeno ao contra filé à cavalo. Toque no <strong>+</strong> para montar seu pedido e envie tudo
              de uma vez pelo WhatsApp.
            </p>
            {site.cardapioPdf && (
              <a href={site.cardapioPdf} download className="botao botao-contorno-tinta">
                <SetaBaixo />
                Baixar cardápio em PDF
              </a>
            )}
          </div>
        </div>

        <AbasCategorias ativa={ativa} aoSelecionar={setAtiva} />

        <div
          data-painel
          role="tabpanel"
          id={`painel-${categoria.id}`}
          aria-labelledby={`aba-${categoria.id}`}
          tabIndex={0}
          className="pt-10 focus-visible:outline-offset-8 lg:pt-14"
        >
          <div className="mb-8 flex items-end justify-between gap-6 border-b-2 border-ink pb-4">
            <h3 data-titulo-categoria className="condensada overflow-hidden text-[15vw] text-ember lg:text-[7.5vw]">
              <span className="block">{categoria.titulo}</span>
            </h3>
            <IconeUtensilio nome={categoria.icone} className="mb-2 h-[16vw] max-h-36 rotate-[24deg] text-ink lg:h-[8vw]" />
          </div>

          <ul className="grid gap-x-16 lg:grid-cols-2">
            {categoria.itens.map((item) =>
              item.foto ? (
                <CardDestaque key={item.id} item={item} indice={categoria.itens.filter((i) => i.foto).indexOf(item)} />
              ) : (
                <ItemLinha key={item.id} item={item} />
              ),
            )}
          </ul>

          <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="mao text-[1.9rem] leading-none">{notaSobremesas}</p>
            <p className="rotulo text-[0.65rem] text-ink/75">{avisoPrecos}</p>
          </div>
        </div>
      </div>

      <PreviaFlutuante escopo={ref} categoriaIcone={categoria.icone} />
    </section>
  );
}

interface PropsAbas {
  ativa: CategoriaId;
  aoSelecionar: (id: CategoriaId) => void;
}

function AbasCategorias({ ativa, aoSelecionar }: PropsAbas) {
  const listaRef = useRef<HTMLDivElement>(null);
  const indicadorRef = useRef<HTMLSpanElement>(null);

  const posicionarIndicador = useCallback(() => {
    const lista = listaRef.current;
    const aba = lista?.querySelector<HTMLButtonElement>(`[aria-selected="true"]`);
    if (!lista || !aba || !indicadorRef.current) return;
    gsap.to(indicadorRef.current, {
      x: aba.offsetLeft,
      width: aba.offsetWidth,
      duration: 0.7,
      ease: "expo.out",
    });
    lista.scrollTo({ left: aba.offsetLeft - 16, behavior: "smooth" });
  }, []);

  useEffect(() => {
    posicionarIndicador();
    window.addEventListener("resize", posicionarIndicador);
    document.fonts?.ready.then(posicionarIndicador);
    return () => window.removeEventListener("resize", posicionarIndicador);
  }, [ativa, posicionarIndicador]);

  const aoTeclar = (evento: KeyboardEvent<HTMLDivElement>) => {
    const indice = cardapio.findIndex((c) => c.id === ativa);
    const destinos: Record<string, number> = {
      ArrowRight: (indice + 1) % cardapio.length,
      ArrowLeft: (indice - 1 + cardapio.length) % cardapio.length,
      Home: 0,
      End: cardapio.length - 1,
    };
    const destino = destinos[evento.key];
    if (destino === undefined) return;
    evento.preventDefault();
    aoSelecionar(cardapio[destino].id);
    listaRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[destino]?.focus();
  };

  return (
    <div className="sticky top-[calc(var(--header)-1px)] z-20 -mx-4 mt-14 bg-paper/92 backdrop-blur-md md:-mx-8">
      <div
        ref={listaRef}
        role="tablist"
        aria-label="Categorias do cardápio"
        onKeyDown={aoTeclar}
        className="relative flex gap-1 overflow-x-auto px-4 py-3 [scrollbar-width:none] md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        <span ref={indicadorRef} aria-hidden className="absolute bottom-3 left-0 top-3 rounded-full bg-ink" />
        {cardapio.map((categoria) => {
          const selecionada = categoria.id === ativa;
          return (
            <button
              key={categoria.id}
              id={`aba-${categoria.id}`}
              type="button"
              role="tab"
              aria-selected={selecionada}
              aria-controls={`painel-${categoria.id}`}
              tabIndex={selecionada ? 0 : -1}
              onClick={() => aoSelecionar(categoria.id)}
              className={`condensada relative min-h-11 shrink-0 whitespace-nowrap px-5 text-[1.05rem] font-bold tracking-[0.08em] transition-colors duration-500 ${
                selecionada ? "text-flame" : "text-ink hover:opacity-65"
              }`}
            >
              {categoria.titulo}
            </button>
          );
        })}
      </div>
      <div className="h-px bg-ink/15" />
    </div>
  );
}

interface PropsPrevia {
  escopo: React.RefObject<HTMLElement | null>;
  categoriaIcone: NomeUtensilio;
}

/** Miniatura que acompanha o cursor sobre os itens (foto quando houver; senão, o utensílio da categoria). */
function PreviaFlutuante({ escopo, categoriaIcone }: PropsPrevia) {
  const ref = useRef<HTMLDivElement>(null);
  const [foto, setFoto] = useState<ChaveFoto | null>(null);
  const [visivel, setVisivel] = useState(false);
  const [ativa, setAtiva] = useState(false);

  useEffect(() => {
    const secao = escopo.current;
    const previa = ref.current;
    if (!secao || !previa || !window.matchMedia(PREVIA).matches) return;
    setAtiva(true);

    const moverX = gsap.quickTo(previa, "x", { duration: 0.6, ease: "expo.out" });
    const moverY = gsap.quickTo(previa, "y", { duration: 0.6, ease: "expo.out" });
    const girar = gsap.quickTo(previa, "rotation", { duration: 0.8, ease: "expo.out" });
    let ultimoX = 0;

    const aoMover = (evento: PointerEvent) => {
      const item = (evento.target as Element).closest<HTMLElement>("li[data-item]:not(.col-span-full)");
      setVisivel(!!item);
      if (!item) return;
      setFoto((item.dataset.foto as ChaveFoto | undefined) ?? null);
      moverX(evento.clientX + 28);
      moverY(evento.clientY - 90);
      girar(Math.max(-12, Math.min(12, (evento.clientX - ultimoX) * 0.8)));
      ultimoX = evento.clientX;
    };
    const aoSair = () => setVisivel(false);

    secao.addEventListener("pointermove", aoMover);
    secao.addEventListener("pointerleave", aoSair);
    return () => {
      secao.removeEventListener("pointermove", aoMover);
      secao.removeEventListener("pointerleave", aoSair);
    };
  }, [escopo]);

  if (!ativa) return <div ref={ref} hidden />;

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-30">
      <div
        className={`size-40 overflow-hidden rounded-full shadow-[0_0_0_6px_var(--color-ink)] transition-[opacity,scale] duration-500 ease-[var(--ease-expo)] ${
          visivel ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        {foto ? (
          <Foto chave={foto} sizes="160px" className="size-full [&_.mao]:hidden" />
        ) : (
          <div className="grid size-full place-items-center bg-flame">
            <IconeUtensilio nome={categoriaIcone} className="h-[70%] rotate-[24deg] text-ink" />
          </div>
        )}
      </div>
    </div>
  );
}
