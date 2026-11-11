"use client";

import { useRef } from "react";
import { zonaPortuaria } from "@/data/content";
import { site } from "@/data/site";
import { TransicaoCalda } from "@/components/efeitos/TransicaoCalda";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { gsap, ScrollTrigger, SEM_REDUCAO, useGSAP } from "@/lib/gsap";

// Mapa ILUSTRATIVO: ordem dos bairros ao longo da orla, sem escala nem posições exatas.
const ROTA = "M36 262C96 232 140 206 196 200S300 196 352 194 462 190 506 204 572 282 520 352";
const pontos = [
  { nome: "Santo Cristo", x: 52, y: 254, ancora: "start" as const, dy: 28 },
  { nome: "Gamboa", x: 196, y: 200, ancora: "middle" as const, dy: 30 },
  { nome: "Saúde", x: 352, y: 194, ancora: "middle" as const, dy: 30 },
  { nome: "Praça Mauá", x: 506, y: 204, ancora: "end" as const, dy: -16 },
  { nome: "Centro", x: 520, y: 352, ancora: "end" as const, dy: 30 },
];

export function ZonaPortuaria() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const secao = ref.current!;
      const rota = secao.querySelector<SVGPathElement>("[data-rota]")!;
      const mascara = secao.querySelector<SVGPathElement>("[data-mascara-rota]")!;
      const carrinho = secao.querySelector<SVGGElement>("[data-carrinho-mapa]")!;
      const comprimento = rota.getTotalLength();

      const posicionar = (progresso: number) => {
        const ponto = rota.getPointAtLength(comprimento * progresso);
        carrinho.setAttribute("transform", `translate(${ponto.x.toFixed(1)} ${ponto.y.toFixed(1)})`);
        mascara.style.strokeDashoffset = String(1 - progresso);
      };
      posicionar(1);

      const mm = gsap.matchMedia();
      mm.add(SEM_REDUCAO, () => {
        const gatilho = ScrollTrigger.create({
          trigger: secao.querySelector("[data-mapa]"),
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.8,
          onUpdate: (self) => posicionar(self.progress),
          onRefresh: (self) => posicionar(self.progress),
        });
        return () => {
          gatilho.kill();
          posicionar(1);
        };
      });
    },
    { scope: ref },
  );

  return (
    <section id="sobre" ref={ref} aria-labelledby="titulo-sobre" className="relative bg-flame pb-24 pt-[28vw] text-ink sm:pt-[24vw] lg:pb-36 lg:pt-[18vw]">
      <TransicaoCalda cor="var(--color-ink)" padrao={2} />

      <div className="mx-auto grid max-w-[1800px] gap-14 px-4 md:px-8 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <p className="rotulo mb-6 flex items-center gap-3">
            <span className="tabular">06</span>
            <span className="h-px w-10 bg-ink" />
            {site.endereco.regiao}
          </p>
          <TituloRevelado id="titulo-sobre" className="display text-[17vw] lg:text-[7.4vw]">
            {zonaPortuaria.titulo[0]}{" "}
            <br />
            <span className="display-italico">{zonaPortuaria.titulo[1]}</span>
          </TituloRevelado>
          <div className="mt-8 max-w-md space-y-4 text-[1.05rem] leading-snug">
            {zonaPortuaria.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <figure data-mapa className="lg:col-span-7">
          <svg viewBox="0 0 600 420" className="w-full overflow-visible" role="img" aria-labelledby="mapa-titulo">
            <title id="mapa-titulo">
              Mapa ilustrativo da Zona Portuária: o carrinho percorre a orla por Santo Cristo, Gamboa, Saúde e Praça Mauá até o
              Centro.
            </title>
            <defs>
              <mask id="mascara-rota" maskUnits="userSpaceOnUse">
                <path
                  data-mascara-rota
                  d={ROTA}
                  fill="none"
                  stroke="white"
                  strokeWidth={14}
                  pathLength={1}
                  strokeDasharray="1 1"
                  style={{ strokeDashoffset: 0 }}
                />
              </mask>
            </defs>

            <path d="M0 0H600V118C534 146 480 104 410 128S300 150 236 132 96 120 0 148Z" className="fill-ink/12" />
            <g fill="none" className="stroke-ink/25" strokeWidth={2} strokeLinecap="round">
              <path d="M30 70q30-10 60 0t60 0M380 50q30-10 60 0t60 0M220 92q30-10 60 0t60 0" />
            </g>
            <text x={300} y={62} textAnchor="middle" className="fill-ink/60 mao text-[26px]">
              Baía de Guanabara
            </text>

            <g fill="none" className="stroke-ink/20" strokeWidth={8} strokeLinecap="round">
              <path d="M110 420L180 210M260 420l40-226M420 420l10-226M80 330h420M140 290h380" />
            </g>
            <path d="M20 178C140 170 300 160 590 166" fill="none" className="stroke-ink" strokeWidth={12} strokeLinecap="round" />
            <text className="rotulo fill-ink text-[11px]" dy={-12}>
              <textPath href="#avenida-rotulo" startOffset="10%">
                Av. Rodrigues Alves
              </textPath>
            </text>
            <path id="avenida-rotulo" d="M20 178C140 170 300 160 590 166" fill="none" />

            <path d={ROTA} fill="none" className="stroke-ink/25" strokeWidth={3} strokeDasharray="2 10" strokeLinecap="round" />
            <path
              data-rota
              d={ROTA}
              fill="none"
              className="stroke-ink"
              strokeWidth={3.5}
              strokeDasharray="2 10"
              strokeLinecap="round"
              mask="url(#mascara-rota)"
            />

            {pontos.map((ponto) => (
              <g key={ponto.nome}>
                <circle cx={ponto.x} cy={ponto.y} r={7} className="fill-flame stroke-ink" strokeWidth={3} />
                <text x={ponto.x} y={ponto.y + ponto.dy} textAnchor={ponto.ancora} className="condensada fill-ink text-[15px]">
                  {ponto.nome}
                </text>
              </g>
            ))}

            <g data-carrinho-mapa>
              <g transform="translate(-22 -44)">
                <rect x={2} y={10} width={40} height={20} rx={4} className="fill-ink" />
                <rect x={0} y={7} width={44} height={5} rx={2} className="fill-ink" />
                <path d="M12 7l-6-16M22 7V-12M32 7l6-16" className="stroke-ink" strokeWidth={3} strokeLinecap="round" />
                <circle cx={12} cy={34} r={7} className="fill-milk stroke-ink" strokeWidth={2} />
                <circle cx={32} cy={34} r={7} className="fill-milk stroke-ink" strokeWidth={2} />
                <circle cx={12} cy={34} r={3} className="fill-ink" />
                <circle cx={32} cy={34} r={3} className="fill-ink" />
              </g>
            </g>
          </svg>
          <figcaption className="mao mt-2 text-right text-xl">mapa ilustrativo, fora de escala</figcaption>
        </figure>
      </div>
    </section>
  );
}
