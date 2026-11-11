"use client";

import { useRef } from "react";
import { manifesto } from "@/data/content";
import { IconeUtensilio } from "@/components/marca/Utensilios";
import { MarqueeUtensilios } from "@/components/efeitos/MarqueeUtensilios";
import { TransicaoCalda } from "@/components/efeitos/TransicaoCalda";
import { Foto } from "@/components/ui/Foto";
import { aplicarParallax, aplicarRevelacoes } from "@/lib/efeitos";
import { gsap, SEM_REDUCAO, SplitText, useGSAP } from "@/lib/gsap";

const iconesSelos = ["colher", "concha", "faca"] as const;
const giroSelos = ["-rotate-6", "rotate-3", "-rotate-2"];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(SEM_REDUCAO, () => {
        const frase = ref.current!.querySelector("[data-frase]");
        const divisao = SplitText.create(frase, {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.14 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: frase, start: "top 78%", end: "bottom 50%", scrub: true },
              },
            ),
        });
        aplicarParallax(ref.current!);
        aplicarRevelacoes(ref.current!);
        gsap.from(ref.current!.querySelectorAll("[data-selo]"), {
          scale: 0.4,
          rotation: -40,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: ref.current!.querySelector("[data-selos]"), start: "top 85%", once: true },
        });
        return () => divisao.revert();
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="manifesto"
      ref={ref}
      aria-labelledby="titulo-manifesto"
      className="papel relative bg-paper pb-24 pt-[34vw] text-ink sm:pt-[26vw] lg:pb-40 lg:pt-[19vw]"
    >
      <TransicaoCalda cor="var(--color-flame)" padrao={0} />
      <MarqueeUtensilios className="absolute inset-x-[-4vw] top-[7vw] z-10 -rotate-2" />

      <div className="mx-auto grid max-w-[1800px] gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <h2 id="titulo-manifesto" className="rotulo mb-8 flex items-center gap-3">
            <span className="tabular text-ember">01</span>
            <span className="h-px w-10 bg-ink" />
            {manifesto.rotulo}
          </h2>
          <p data-frase className="display text-[clamp(2.1rem,5.6vw,6rem)] leading-[1.02] tracking-[-0.03em]">
            {manifesto.frase.map((trecho) =>
              "enfase" in trecho && trecho.enfase ? (
                <em key={trecho.texto} className="display-italico text-ember">
                  {trecho.texto}
                </em>
              ) : (
                <span key={trecho.texto}>{trecho.texto}</span>
              ),
            )}
          </p>
        </div>

        <div className="relative mx-auto h-[118vw] w-full max-w-md sm:h-[90vw] lg:col-span-4 lg:mt-24 lg:h-auto lg:min-h-[44vw] lg:max-w-none">
          <div data-velocidade="0.5" className="absolute right-0 top-0 w-[72%]">
            <div data-revelar className="overflow-hidden rounded-full">
              <Foto chave="misto-waffle" sizes="(min-width: 1024px) 24vw, 70vw" className="aspect-square rounded-full" tom="chama" />
            </div>
          </div>
          <div data-velocidade="-0.4" className="absolute bottom-0 left-0 w-[64%]">
            <div data-revelar className="moldura rotate-[-4deg] overflow-hidden bg-ink">
              <Foto chave="pratos-almoco" sizes="(min-width: 1024px) 22vw, 64vw" className="aspect-[4/5]" tom="papel" />
            </div>
          </div>
          <p className="mao absolute bottom-[38%] right-0 z-10 w-36 rotate-[8deg] text-right text-2xl leading-none">
            direto do cardápio
          </p>
        </div>
      </div>

      <ul data-selos className="mx-auto mt-20 flex max-w-[1800px] flex-wrap justify-center gap-6 px-4 md:px-8 lg:mt-10 lg:justify-start lg:gap-10">
        {manifesto.selos.map((selo, i) => (
          <li key={selo} data-selo className="w-36 md:w-44">
            <span
              className={`grid aspect-square place-items-center rounded-full border-2 border-ink p-4 text-center ${giroSelos[i]}`}
            >
              <span className="flex flex-col items-center gap-1.5">
                <IconeUtensilio nome={iconesSelos[i]} className="h-10 text-ember" />
                <span className="mao text-[1.65rem] leading-[0.9] md:text-3xl">{selo}</span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
