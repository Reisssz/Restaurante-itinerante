"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { galeria } from "@/data/content";
import { fotos, type ChaveFoto } from "@/data/fotos";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { Foto } from "@/components/ui/Foto";
import { SetaDiagonal } from "@/components/ui/Icones";
import { aplicarParallax, aplicarRevelacoes } from "@/lib/efeitos";
import { gsap, SEM_REDUCAO, useGSAP } from "@/lib/gsap";
import { linkInstagram } from "@/lib/links";
import { obterLenis } from "@/lib/rolagem";

function proporcaoAmpliada(chave: ChaveFoto): string {
  const { largura, altura } = fotos[chave];
  if (largura > altura) return "aspect-[4/3] w-full";
  if (altura > largura) return "aspect-[3/4] w-[min(100%,58svh)]";
  return "aspect-square w-[min(100%,76svh)]";
}

// Composição editorial: tamanho, forma e deslocamento de cada foto (mobile → desktop).
const composicao: { caixa: string; forma: string; proporcao: string; velocidade: number }[] = [
  { caixa: "col-span-2 lg:col-span-5 lg:row-span-2", forma: "rounded-full", proporcao: "aspect-square", velocidade: 0.3 },
  { caixa: "col-span-1 lg:col-span-4 lg:mt-[10vw]", forma: "moldura-papel", proporcao: "aspect-[4/5] lg:aspect-[4/3]", velocidade: -0.2 },
  { caixa: "col-span-1 mt-10 lg:col-span-3 lg:mt-0", forma: "blob", proporcao: "aspect-[3/4]", velocidade: 0.5 },
  { caixa: "col-span-2 lg:col-span-7", forma: "moldura-papel", proporcao: "aspect-[16/10]", velocidade: -0.1 },
  { caixa: "col-span-1 lg:col-span-4 lg:col-start-1 lg:-mt-[6vw]", forma: "rounded-full", proporcao: "aspect-square", velocidade: 0.4 },
  { caixa: "col-span-1 mt-12 lg:col-span-4 lg:mt-[6vw]", forma: "moldura-papel", proporcao: "aspect-[4/3]", velocidade: -0.3 },
  { caixa: "col-span-2 lg:col-span-4", forma: "blob-2", proporcao: "aspect-[4/5]", velocidade: 0.2 },
];

type DocumentoComTransicao = Document & { startViewTransition?: (atualizar: () => void) => unknown };

export function Galeria() {
  const ref = useRef<HTMLElement>(null);
  const dialogoRef = useRef<HTMLDialogElement>(null);
  const [aberta, setAberta] = useState<ChaveFoto | null>(null);
  const instagram = linkInstagram();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(SEM_REDUCAO, () => {
        aplicarParallax(ref.current!);
        aplicarRevelacoes(ref.current!);
      });
    },
    { scope: ref },
  );

  // Transição de elemento compartilhado (View Transitions API) com fallback simples.
  const comTransicao = (atualizar: () => void) => {
    const doc = document as DocumentoComTransicao;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !reduzir) doc.startViewTransition(() => flushSync(atualizar));
    else atualizar();
  };

  const abrir = (chave: ChaveFoto) =>
    comTransicao(() => {
      obterLenis()?.stop();
      setAberta(chave);
      dialogoRef.current?.showModal();
    });

  const fechar = () =>
    comTransicao(() => {
      dialogoRef.current?.close();
      setAberta(null);
    });

  return (
    <section id="mesa-posta" ref={ref} aria-labelledby="titulo-galeria" className="sobre-escuro relative bg-ink py-24 text-paper lg:py-36">
      <div className="mx-auto max-w-[1800px] px-4 md:px-8">
        <div className="mb-16 grid gap-6 lg:mb-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="rotulo mb-6 flex items-center gap-3">
              <span className="tabular text-flame">05</span>
              <span className="h-px w-10 bg-paper" />
              Fotografia
            </p>
            <TituloRevelado id="titulo-galeria" className="display text-[22vw] lg:text-[12vw]">
              Mesa <span className="display-italico text-flame">posta</span>
            </TituloRevelado>
          </div>
          <p className="max-w-sm text-paper/80 lg:col-span-4">
            Pratos e lanches que saem do carrinho, do jeito que chegam à mesa. Toque numa foto para ampliar.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16">
          {galeria.fotos.map((chave, i) => {
            const estilo = composicao[i % composicao.length];
            const foto = fotos[chave];
            return (
              <li key={chave} className={estilo.caixa} data-velocidade={estilo.velocidade}>
                <figure>
                  <button
                    type="button"
                    onClick={() => abrir(chave)}
                    aria-label={`Ampliar foto: ${foto.legenda}`}
                    className="group block w-full text-left"
                  >
                    <div
                      data-revelar
                      className={`overflow-hidden ${estilo.forma === "moldura-papel" ? "moldura border-paper" : estilo.forma}`}
                      style={{ viewTransitionName: aberta === chave ? undefined : `foto-${chave}` }}
                    >
                      <Foto
                        chave={chave}
                        sizes="(min-width: 1024px) 40vw, 50vw"
                        tom={i % 3 === 1 ? "papel" : "chama"}
                        className={`${estilo.proporcao} [&_.mao]:hidden`}
                        classeImagem="transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-[1.06]"
                      />
                    </div>
                  </button>
                  <figcaption className="mao mt-3 text-[1.45rem] leading-none text-paper/90 lg:text-[1.7rem]">
                    {foto.legenda}
                  </figcaption>
                </figure>
              </li>
            );
          })}

          <li className="col-span-2 grid place-items-center lg:col-span-4 lg:col-start-9">
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid aspect-square w-[72%] place-items-center rounded-full bg-flame p-8 text-center text-ink transition-transform duration-700 ease-[var(--ease-expo)] hover:rotate-[-6deg] lg:w-full"
            >
              <span>
                <span className="mao block text-[2.2rem] leading-[0.9] lg:text-[2.6rem]">Mais mesa posta no Instagram</span>
                <span className="rotulo mt-4 inline-flex items-center gap-1.5 text-[0.7rem]">
                  {instagram.rotulo}
                  <SetaDiagonal className="size-3.5" />
                </span>
                <span className="sr-only">(abre em nova aba)</span>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <dialog
        ref={dialogoRef}
        onClose={() => {
          setAberta(null);
          obterLenis()?.start();
        }}
        onClick={(evento) => evento.target === dialogoRef.current && fechar()}
        aria-label={aberta ? fotos[aberta].legenda : "Foto ampliada"}
        className="m-auto max-h-[92svh] w-[min(92vw,1100px)] overflow-visible bg-transparent p-0 text-paper backdrop:bg-ink/92 backdrop:backdrop-blur-sm"
      >
        {aberta && (
          <figure>
            <div
              className={`mx-auto overflow-hidden rounded-[14px] shadow-[0_0_0_10px_var(--color-paper)] ${proporcaoAmpliada(aberta)}`}
              style={{ viewTransitionName: `foto-${aberta}` }}
            >
              <Foto chave={aberta} sizes="92vw" className="size-full" tom="chama" />
            </div>
            <figcaption className="mt-5 flex items-center justify-between gap-4">
              <span className="mao text-3xl">{fotos[aberta].legenda}</span>
              <button type="button" onClick={fechar} className="rotulo min-h-11 px-3 sublinhado" autoFocus>
                Fechar
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}
