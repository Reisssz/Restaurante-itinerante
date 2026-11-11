"use client";

import { useRef } from "react";
import type { NomeUtensilio } from "@/data/tipos";
import { desenhosUtensilios } from "./Utensilios";

const RODAS = [
  { cx: 140, cy: 350 },
  { cx: 260, cy: 350 },
] as const;

// Posição de cada utensílio sobre a borda da panela (igual à composição da logo).
const UTENSILIOS: { nome: NomeUtensilio; x: number; y: number; angulo: number }[] = [
  { nome: "garfo", x: 108, y: 212, angulo: -38 },
  { nome: "concha", x: 132, y: 208, angulo: -20 },
  { nome: "espatula", x: 172, y: 206, angulo: -4 },
  { nome: "fouet", x: 206, y: 206, angulo: 5 },
  { nome: "escumadeira", x: 240, y: 206, angulo: 12 },
  { nome: "faca", x: 272, y: 208, angulo: 20 },
  { nome: "colher", x: 292, y: 212, angulo: 33 },
];

interface Props {
  className?: string;
  semTexto?: boolean;
  /** Cor da panela e utensílios (padrão: preto-café). */
  corCorpo?: string;
  /** Se informado, o SVG vira imagem acessível com esse rótulo. */
  rotulo?: string;
}

/** Logo da marca: panela-carrinho com utensílios sobre duas rodas. */
export function CarrinhoMascote({ className, semTexto = false, corCorpo = "var(--color-ink)", rotulo }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  const sacudir = () => {
    const svg = svgRef.current;
    if (!svg || svg.classList.contains("sacudindo")) return;
    svg.classList.add("sacudindo");
    window.setTimeout(() => svg.classList.remove("sacudindo"), 900);
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 390"
      className={`mascote ${className ?? ""}`}
      role={rotulo ? "img" : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
      onPointerEnter={sacudir}
      onClick={sacudir}
    >
      <g fill="currentColor" style={{ color: corCorpo }}>
        {UTENSILIOS.map((u, i) => (
          <g key={u.nome} transform={`translate(${u.x} ${u.y}) rotate(${u.angulo})`}>
            <g className="utensilio" style={{ ["--i" as string]: i }}>
              {desenhosUtensilios[u.nome](true)}
            </g>
          </g>
        ))}

        <rect x={12} y={199} width={40} height={13} rx={6.5} />
        <rect x={348} y={199} width={40} height={13} rx={6.5} />
        <rect x={42} y={194} width={316} height={24} rx={7} />
        <path d="M62 214H338V298Q338 322 314 322H86Q62 322 62 298Z" />
        <path d="M168 352H232M196 352l4 -4 4 4 -4 4z" stroke="currentColor" strokeWidth={3} />
      </g>

      {!semTexto && (
        <g style={{ fill: "var(--color-paper)" }}>
          <text
            x={200}
            y={276}
            textAnchor="middle"
            fontSize={58}
            fontWeight={700}
            style={{ fontFamily: "var(--font-amatic), cursive" }}
          >
            GASTRONOMIA
          </text>
          <text
            x={203}
            y={304}
            textAnchor="middle"
            fontSize={15}
            fontWeight={600}
            letterSpacing={9}
            style={{ fontFamily: "var(--font-barlow), sans-serif" }}
          >
            ITINERANTE
          </text>
        </g>
      )}

      {RODAS.map((roda) => (
        <g key={roda.cx} className="roda">
          <circle cx={roda.cx} cy={roda.cy} r={30} style={{ fill: "var(--color-milk)", stroke: "var(--color-ink)" }} strokeWidth={3} />
          <circle cx={roda.cx} cy={roda.cy} r={11} style={{ fill: "var(--color-ink)" }} />
        </g>
      ))}
    </svg>
  );
}
