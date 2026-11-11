import type { ReactNode } from "react";
import type { NomeUtensilio } from "@/data/tipos";

/**
 * Utensílios da logo desenhados na vertical: base em (0,0), ponta para cima (y negativo).
 * `cheio` = silhueta preenchida (mascote); falso = traço (ícones, marquee).
 */
type Desenho = (cheio: boolean) => ReactNode;

const furosEscumadeira = [
  [-9, -152], [0, -154], [9, -152],
  [-14, -142], [-4.5, -143], [4.5, -143], [14, -142],
  [-9, -132], [0, -131], [9, -132],
]
  .map(([x, y]) => `M${x - 2.6} ${y}a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0 -5.2 0`)
  .join("");

export const desenhosUtensilios: Record<NomeUtensilio, Desenho> = {
  espatula: (cheio) => (
    <>
      <rect x={-3.5} y={-112} width={7} height={112} rx={3.5} />
      <path
        fillRule="evenodd"
        d={`M-17 -172H17V-120Q17 -110 7 -110H-7Q-17 -110 -17 -120Z${cheio ? "M-10 -164h4v38h-4zM-2 -164h4v38h-4zM6 -164h4v38h-4z" : ""}`}
      />
      {!cheio && <path d="M-8 -162v34M0 -162v34M8 -162v34" />}
    </>
  ),
  concha: () => (
    <>
      <rect x={-3.5} y={-118} width={7} height={118} rx={3.5} />
      <ellipse cx={0} cy={-140} rx={19} ry={25} />
    </>
  ),
  escumadeira: (cheio) => (
    <>
      <rect x={-3.5} y={-116} width={7} height={116} rx={3.5} />
      <path fillRule="evenodd" d={`M-24 -142a24 24 0 1 0 48 0a24 24 0 1 0 -48 0Z${cheio ? furosEscumadeira : ""}`} />
      {!cheio && <path d={furosEscumadeira} />}
    </>
  ),
  fouet: () => (
    <>
      <rect x={-4.5} y={-58} width={9} height={58} rx={4.5} />
      <g fill="none" stroke="currentColor" strokeWidth={3.2}>
        <path d="M0 -58C-26 -78 -24 -150 0 -150C24 -150 26 -78 0 -58Z" />
        <path d="M0 -58C-12 -80 -12 -150 0 -150C12 -150 12 -80 0 -58Z" />
        <path d="M0 -58V-150" />
      </g>
    </>
  ),
  faca: () => (
    <>
      <rect x={-5} y={-56} width={10} height={56} rx={3} />
      <path d="M-5 -58V-150Q10 -136 8 -58Z" />
    </>
  ),
  garfo: () => (
    <>
      <rect x={-3.5} y={-92} width={7} height={92} rx={3.5} />
      <path d="M-13 -104Q-13 -90 0 -88Q13 -90 13 -104Z" />
      <rect x={-13} y={-132} width={4} height={30} rx={2} />
      <rect x={-5.2} y={-132} width={4} height={30} rx={2} />
      <rect x={1.2} y={-132} width={4} height={30} rx={2} />
      <rect x={9} y={-132} width={4} height={30} rx={2} />
    </>
  ),
  colher: () => (
    <>
      <rect x={-4} y={-128} width={8} height={128} rx={4} />
      <ellipse cx={0} cy={-150} rx={14} ry={24} />
    </>
  ),
};

interface PropsIcone {
  nome: NomeUtensilio;
  className?: string;
  titulo?: string;
}

/** Ícone em traço, desenhado com a mesma geometria da logo. */
export function IconeUtensilio({ nome, className, titulo }: PropsIcone) {
  return (
    <svg
      viewBox="-30 -178 60 182"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={3.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={titulo ? "img" : undefined}
      aria-hidden={titulo ? undefined : true}
      aria-label={titulo}
    >
      {desenhosUtensilios[nome](false)}
    </svg>
  );
}
