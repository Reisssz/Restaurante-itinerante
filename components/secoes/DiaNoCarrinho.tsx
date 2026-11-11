"use client";

import { useRef } from "react";
import { diaNoCarrinho, type Estacao } from "@/data/content";
import { buscarItem } from "@/data/menu";
import { CarrinhoMascote } from "@/components/marca/CarrinhoMascote";
import { EfeitoEstacao } from "@/components/efeitos/EfeitoEstacao";
import { BotaoAdicionar } from "@/components/cardapio/BotaoAdicionar";
import { Foto } from "@/components/ui/Foto";
import { formatarValor } from "@/lib/formatar";
import { gsap, ScrollTrigger, SEM_REDUCAO, useGSAP } from "@/lib/gsap";

const HORIZONTAL = `(min-width: 1024px) and ${SEM_REDUCAO}`;

const cores = {
  paper: "#efe6d2",
  flame: "#f7941d",
  ink: "#231f20",
};

// Temperatura de cor de cada estação: creme-aurora → laranja pleno → carvão.
const temaEstacao: Record<Estacao["id"], { fundo: string; texto: string; tomFoto: "chama" | "papel" | "tinta"; forma: string }> = {
  manha: { fundo: cores.paper, texto: cores.ink, tomFoto: "chama", forma: "blob" },
  "meio-dia": { fundo: cores.flame, texto: cores.ink, tomFoto: "papel", forma: "blob-2" },
  tarde: { fundo: cores.ink, texto: cores.paper, tomFoto: "chama", forma: "blob-3" },
};

export function DiaNoCarrinho() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const secao = ref.current!;
      const palco = secao.querySelector<HTMLElement>("[data-palco]")!;
      const trilho = secao.querySelector<HTMLElement>("[data-trilho]")!;
      const estrada = secao.querySelector<HTMLElement>("[data-estrada]")!;
      const carrinho = secao.querySelector<HTMLElement>("[data-carrinho]")!;
      const preenchimento = secao.querySelector<HTMLElement>("[data-preenchimento]")!;
      const mm = gsap.matchMedia();

      mm.add(HORIZONTAL, () => {
        secao.classList.add("horizontal");
        ScrollTrigger.refresh();
        const distancia = () => trilho.scrollWidth - window.innerWidth;

        const mover = gsap.to(trilho, {
          x: () => -distancia(),
          ease: "none",
          scrollTrigger: {
            trigger: palco,
            pin: true,
            start: "top top",
            end: () => `+=${distancia() * 1.15}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(carrinho, {
          x: () => estrada.offsetWidth - carrinho.offsetWidth,
          ease: "none",
          scrollTrigger: { trigger: palco, start: "top top", end: () => `+=${distancia() * 1.15}`, scrub: 0.8, invalidateOnRefresh: true },
        });
        gsap.to(preenchimento, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: palco, start: "top top", end: () => `+=${distancia() * 1.15}`, scrub: 0.8 },
        });

        const estacoes = secao.querySelectorAll<HTMLElement>("[data-estacao]");
        estacoes.forEach((estacao, i) => {
          const tema = temaEstacao[diaNoCarrinho.estacoes[i].id];
          if (i > 0) {
            gsap.to(palco, {
              backgroundColor: tema.fundo,
              color: tema.texto,
              "--cor-carrinho": i === 2 ? cores.flame : cores.ink,
              ease: "none",
              scrollTrigger: { trigger: estacao, containerAnimation: mover, start: "left 75%", end: "left 25%", scrub: true },
            });
          }
          gsap.fromTo(
            estacao.querySelector("[data-titulo-estacao]"),
            { xPercent: 18 },
            {
              xPercent: -18,
              ease: "none",
              scrollTrigger: { trigger: estacao, containerAnimation: mover, start: "left right", end: "right left", scrub: true },
            },
          );
          gsap.fromTo(
            estacao.querySelector("[data-foto-estacao]"),
            { xPercent: -12, rotation: -6 },
            {
              xPercent: 12,
              rotation: 4,
              ease: "none",
              scrollTrigger: { trigger: estacao, containerAnimation: mover, start: "left right", end: "right left", scrub: true },
            },
          );
        });

        return () => {
          secao.classList.remove("horizontal");
          gsap.set([palco, trilho, carrinho, preenchimento], { clearProps: "all" });
        };
      });
    },
    { scope: ref },
  );

  return (
    <section id="o-dia" ref={ref} aria-labelledby="titulo-dia" className="dia relative bg-paper text-ink">
      <div data-palco className="dia-palco relative" style={{ ["--cor-carrinho" as string]: cores.ink }}>
        <header className="dia-cabecalho">
          <h2 id="titulo-dia" className="rotulo flex items-center gap-3">
            <span className="tabular">02</span>
            <span className="h-px w-10 bg-current" />
            {diaNoCarrinho.titulo}
          </h2>
        </header>

        <div data-trilho className="dia-trilho">
          {diaNoCarrinho.estacoes.map((estacao, i) => (
            <EstacaoDoDia key={estacao.id} estacao={estacao} indice={i} />
          ))}
        </div>

        <div className="dia-estrada" aria-hidden>
          <div data-estrada className="relative h-full">
            <div className="absolute inset-x-0 bottom-3 border-t-2 border-dashed border-current opacity-40" />
            <div data-preenchimento className="absolute inset-x-0 bottom-3 h-0.5 origin-left scale-x-0 bg-current" />
            <div className="rotulo absolute inset-x-0 bottom-[-1.6rem] flex justify-between text-[0.65rem]">
              {diaNoCarrinho.estacoes.map((e) => (
                <span key={e.id}>{e.titulo}</span>
              ))}
            </div>
            <div data-carrinho className="absolute bottom-0 left-0 w-[7.5vw] min-w-24">
              <div className="balancar">
                <CarrinhoMascote semTexto corCorpo="var(--cor-carrinho)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EstacaoDoDia({ estacao, indice }: { estacao: Estacao; indice: number }) {
  const tema = temaEstacao[estacao.id];
  const itens = estacao.itens.map(buscarItem).filter((item) => item !== undefined);
  const vazado = indice === 1;

  return (
    <article
      data-estacao
      aria-labelledby={`estacao-${estacao.id}`}
      className="dia-estacao flex flex-col overflow-hidden border-t-[3px] border-ink px-4 pb-10 pt-6 md:px-8 lg:block lg:p-0"
      style={{ ["--bg-estacao" as string]: tema.fundo, ["--fg-estacao" as string]: tema.texto }}
    >
      <p className="mao text-2xl lg:absolute lg:left-[4vw] lg:top-[calc(var(--header)+4.5rem)] lg:text-4xl">
        {String(indice + 1).padStart(2, "0")} · {estacao.chamada}
      </p>

      <h3
        id={`estacao-${estacao.id}`}
        data-titulo-estacao
        className={`condensada relative z-10 mt-1 text-[22vw] lg:absolute lg:left-[3vw] lg:top-[calc(var(--header)+7rem)] lg:mt-0 lg:text-[15vw] ${
          vazado ? "vazado vazado-tinta" : ""
        }`}
      >
        {estacao.titulo}
      </h3>

      <div
        data-foto-estacao
        className="relative ml-auto mt-[-6vw] w-[58vw] max-w-sm [@media(max-height:700px)]:w-[42vw] lg:absolute lg:right-[7vw] lg:top-[calc(var(--header)+6rem)] lg:mt-0 lg:w-[32vw] lg:max-w-[540px]"
      >
        <Foto
          chave={estacao.foto}
          sizes="(min-width: 1024px) 34vw, 58vw"
          tom={tema.tomFoto}
          className={`aspect-square ${tema.forma} shadow-[0_0_0_clamp(6px,0.8vw,12px)_var(--color-ink)]`}
        />
        <EfeitoEstacao efeito={estacao.efeito} className="absolute -top-[16%] left-1/2 w-[36%] -translate-x-1/2" />
      </div>

      <div className="relative z-10 mt-4 max-w-md lg:absolute lg:bottom-[calc(4.5rem+2vh+max(7.4vw,6rem)+2rem)] lg:left-[4vw] lg:mt-0 lg:w-[38vw] lg:max-w-xl">
        <p className="mb-5 text-[0.98rem] leading-snug opacity-85 [@media(max-height:800px)]:hidden lg:text-lg">{estacao.texto}</p>
        <ul className="divide-y divide-current/20 border-y border-current/20">
          {itens.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-2">
              <span className="condensada min-w-0 flex-1 text-lg font-bold leading-[1.05] tracking-[0.01em] lg:text-xl">{item.nome}</span>
              <span className="condensada tabular text-lg lg:text-xl">R$ {formatarValor(item.preco)}</span>
              <BotaoAdicionar item={item} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
