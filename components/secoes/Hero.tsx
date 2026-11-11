import { hero } from "@/data/content";
import { site } from "@/data/site";
import { CarrinhoMascote } from "@/components/marca/CarrinhoMascote";
import { FormaCalda } from "@/components/marca/Calda";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { Foto } from "@/components/ui/Foto";
import { RodaMini } from "@/components/ui/Icones";
import { StatusAberto } from "@/components/ui/StatusAberto";

const estiloLinha = {
  serifa: "display text-[19vw] sm:text-[15vw] lg:text-[12.5vw]",
  italico: "display-italico text-[16vw] sm:text-[12.5vw] lg:text-[10.5vw] leading-[0.9]",
  vazado: "condensada vazado vazado-tinta text-[21vw] sm:text-[17vw] lg:text-[14vw]",
} as const;

const recuoLinha = ["", "pl-[6vw]", "", "pl-[12vw] lg:pl-[8vw]"];

const idCirculo = "selo-hero-circulo";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="titulo-hero" className="relative isolate overflow-hidden bg-flame text-ink">
      <FormaCalda forma="respingo" cor="var(--color-ember)" className="absolute -left-[18vw] top-[8vh] -z-10 aspect-square w-[70vw] opacity-25 lg:w-[42vw]" />
      <FormaCalda
        forma="cantoInferior"
        cor="var(--color-ink)"
        className="absolute bottom-0 right-0 -z-10 hidden aspect-square w-[34vw] max-w-[640px] lg:block"
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1800px] flex-col px-4 pb-6 pt-[calc(var(--header)+0.75rem)] md:px-8 lg:pb-10">
        <div className="rotulo flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-[0.68rem] md:text-xs">
          <p>
            {site.endereco.regiao} · {site.endereco.cidade}
          </p>
          <StatusAberto />
        </div>

        <div className="relative ml-auto mt-3 w-[64vw] max-w-[640px] -rotate-[5deg] sm:w-[48vw] lg:absolute lg:right-[4vw] lg:top-[calc(var(--header)+5vh)] lg:mt-0 lg:w-[35vw]">
          <CarrinhoMascote rotulo="Logo da Gastronomia Itinerante: uma panela com utensílios sobre duas rodas" />
        </div>

        <h1 id="titulo-hero" className="relative z-10 mt-auto pt-6 lg:pt-0">
          <span className="sr-only">{site.nome}: </span>
          {hero.linhas.map((linha, i) => (
            <span key={linha.texto} className={`linha ${recuoLinha[i]}`}>
              <span className={estiloLinha[linha.estilo]} style={{ ["--i" as string]: i }}>
                {linha.texto}
              </span>
            </span>
          ))}
        </h1>

        <div className="relative z-10 mt-6 grid gap-5 lg:mt-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-sm text-[1.02rem] leading-snug lg:col-span-4">{hero.apoio}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-5">
            <BotaoWhatsApp />
            <a href="#cardapio" className="condensada group flex min-h-11 items-center gap-2.5 text-base tracking-[0.1em]">
              <span className="relative grid size-8 place-items-center overflow-hidden">
                <RodaMini className="rolar-roda size-6" />
              </span>
              <span className="sublinhado">Ver cardápio</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute left-4 top-[calc(var(--header)+4.75rem)] w-[28vw] max-w-[220px] sm:left-8 lg:bottom-[0.6vw] lg:left-auto lg:right-[1.4vw] lg:top-auto lg:w-[10vw] lg:text-paper">
        <div className="relative aspect-square">
          <svg viewBox="0 0 200 200" className="girar-lento absolute inset-0 size-full" aria-hidden>
            <defs>
              <path id={idCirculo} d="M100 100m-84 0a84 84 0 1 1 168 0a84 84 0 1 1 -168 0" />
            </defs>
            <text className="condensada fill-current text-[16px] tracking-[0.12em]">
              <textPath href={`#${idCirculo}`} textLength={520} lengthAdjust="spacing">
                {hero.seloGiratorio}
              </textPath>
            </text>
          </svg>
          <Foto
            chave="waffle-cafe"
            sizes="(min-width: 1024px) 10vw, 24vw"
            tom="papel"
            prioridade
            className="absolute inset-[17%] rounded-full shadow-[0_0_0_4px_currentColor] [&_.mao]:hidden"
          />
        </div>
      </div>
    </section>
  );
}
