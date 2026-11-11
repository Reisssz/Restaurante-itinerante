import Image from "next/image";
import { fotos, type ChaveFoto } from "@/data/fotos";
import type { NomeUtensilio } from "@/data/tipos";
import { IconeUtensilio } from "@/components/marca/Utensilios";

const iconePorFoto: Record<ChaveFoto, NomeUtensilio> = {
  "waffle-cafe": "colher",
  "misto-waffle": "espatula",
  "fritas-cheddar": "escumadeira",
  "aipim-carne-seca": "garfo",
  "australiano-frango": "faca",
  "australiano-linguica": "faca",
  "pratos-almoco": "concha",
};

interface Props {
  chave: ChaveFoto;
  sizes: string;
  className?: string;
  prioridade?: boolean;
  tom?: "chama" | "papel" | "tinta";
  /** Classe aplicada à <img> (ex.: para animar escala). */
  classeImagem?: string;
}

const tons = {
  chama: "bg-flame text-ink",
  papel: "bg-paper-deep text-ink",
  tinta: "bg-ink-soft text-paper",
};

/**
 * Foto real do cliente ou, enquanto ela não existe, um placeholder ilustrado da marca
 * (prato visto de cima + utensílio da logo + legenda manuscrita).
 */
export function Foto({ chave, sizes, className = "", prioridade = false, tom = "chama", classeImagem = "" }: Props) {
  const foto = fotos[chave];
  const posicao = className.includes("absolute") ? "" : "relative";

  if (foto.src) {
    return (
      <div className={`${posicao} overflow-hidden ${className}`}>
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          sizes={sizes}
          priority={prioridade}
          className={`object-cover ${classeImagem}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`${posicao} grid place-items-center overflow-hidden ${tons[tom]} ${className}`}
      role="img"
      aria-label={`Espaço reservado para foto: ${foto.legenda}`}
    >
      <div className={`absolute inset-0 grid place-items-center ${classeImagem}`}>
        <div className="relative aspect-square w-[62%] max-w-80 rounded-full bg-milk/90 shadow-[inset_0_0_0_10px_rgba(35,31,32,0.08)]">
          <div className="absolute inset-[16%] rounded-full border-2 border-dashed border-ink/25" />
          <IconeUtensilio
            nome={iconePorFoto[chave]}
            className="absolute left-1/2 top-1/2 h-[78%] -translate-x-1/2 -translate-y-1/2 rotate-[28deg] text-ink"
          />
        </div>
      </div>
      <p className="mao absolute inset-x-[14%] bottom-[9%] text-center text-[clamp(1.05rem,2vw,1.5rem)] leading-none">
        foto: {foto.legenda.toLowerCase()}
      </p>
    </div>
  );
}
