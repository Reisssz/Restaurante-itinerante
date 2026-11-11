/**
 * Fotos do cliente. Para trocar uma foto:
 *  1. salve o arquivo em /public/fotos/ (JPG ou PNG, mínimo 1600px no maior lado)
 *  2. troque `...fotoFicticia` pelos dados reais: src, alt, largura e altura
 * Com `src` vazio, o site mostra um placeholder ilustrado da marca.
 */

export type ChaveFoto =
  | "waffle-cafe"
  | "misto-waffle"
  | "fritas-cheddar"
  | "aipim-carne-seca"
  | "australiano-frango"
  | "australiano-linguica"
  | "pratos-almoco";

export interface Foto {
  src: string;
  alt: string;
  largura: number;
  altura: number;
  legenda: string;
}

// PROVISÓRIA, só para apresentação: foto de banco (Unsplash via Wikimedia Commons), não é prato do cliente.
const fotoFicticia = {
  src: "/fotos/prato-ficticio.jpg",
  alt: "Foto ilustrativa: filé grelhado com ovo e tomate em prato branco",
  largura: 1920,
  altura: 1250,
};

export const fotos: Record<ChaveFoto, Foto> = {
  "waffle-cafe": { ...fotoFicticia, legenda: "Waffle de pão de queijo, requeijão, goiabada e café" },
  "misto-waffle": { ...fotoFicticia, legenda: "Misto quente de waffle de pão de queijo" },
  "fritas-cheddar": { ...fotoFicticia, legenda: "Fritas com cheddar e bacon" },
  "aipim-carne-seca": { ...fotoFicticia, legenda: "Aipim com carne seca" },
  "australiano-frango": { ...fotoFicticia, legenda: "Pão australiano gratinado com fritas" },
  "australiano-linguica": { ...fotoFicticia, legenda: "Pão australiano com linguiça, cheddar e bacon" },
  "pratos-almoco": { ...fotoFicticia, legenda: "Almoço servido em travessa de barro" },
};
