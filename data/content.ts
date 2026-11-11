/**
 * Textos do site. Tudo marcado com `sugerido: true` foi escrito a partir do cardápio e da bio,
 * e precisa ser VALIDADO COM O CLIENTE antes de publicar.
 */
import type { ChaveFoto } from "./fotos";

export interface TrechoTexto {
  texto: string;
  enfase?: boolean;
}

export const navegacao = [
  { rotulo: "Cardápio", href: "#cardapio" },
  { rotulo: "Almoço", href: "#almoco" },
  { rotulo: "Petiscos", href: "#cardapio", categoria: "petiscos" },
  { rotulo: "Sobre", href: "#sobre" },
  { rotulo: "Visite", href: "#visite" },
] as const;

export const secoes = [
  { id: "inicio", rotulo: "Início" },
  { id: "manifesto", rotulo: "A casa" },
  { id: "o-dia", rotulo: "O dia" },
  { id: "cardapio", rotulo: "Cardápio" },
  { id: "almoco", rotulo: "Almoço" },
  { id: "mesa-posta", rotulo: "Mesa posta" },
  { id: "sobre", rotulo: "O porto" },
  { id: "visite", rotulo: "Visite" },
] as const;

export const hero = {
  sugerido: true,
  // Cada linha alterna serifa itálica / romana / condensada vazada.
  linhas: [
    { texto: "Comida", estilo: "serifa" },
    { texto: "de verdade,", estilo: "italico" },
    { texto: "no ritmo", estilo: "vazado" },
    { texto: "do porto.", estilo: "italico" },
  ],
  apoio: "Restaurante & café na Zona Portuária do Rio. Do expresso pequeno ao contra filé à cavalo.",
  seloGiratorio: "restaurante & café · zona portuária · rio · ",
} as const;

export const manifesto = {
  sugerido: true,
  rotulo: "A casa",
  frase: [
    { texto: "Pão na chapa", enfase: true },
    { texto: " de manhã, " },
    { texto: "picadinho", enfase: true },
    { texto: " no almoço, " },
    { texto: "aipim com carne seca", enfase: true },
    { texto: " no fim da tarde. Comida de casa no meio da Zona Portuária, pra quem trabalha, mora ou está só de passagem." },
  ] satisfies TrechoTexto[],
  selos: ["Do café ao almoço", "Molho Itinerante", "Pão australiano gratinado"],
} as const;

export interface Estacao {
  id: "manha" | "meio-dia" | "tarde";
  titulo: string;
  chamada: string;
  texto: string;
  itens: string[];
  foto: ChaveFoto;
  efeito: "vapor" | "bolhas" | "fritas";
}

export const diaNoCarrinho: { sugerido: boolean; titulo: string; estacoes: Estacao[] } = {
  sugerido: true,
  titulo: "O dia no carrinho",
  estacoes: [
    {
      id: "manha",
      titulo: "Manhã",
      chamada: "Café, waffle e pão de queijo",
      texto: "A média com pão na chapa abre o expediente. O waffle de pão de queijo com requeijão e goiabada é o atalho pro bom humor.",
      itens: ["cafe-com-leite", "waffle-requeijao-goiabada", "misto-waffle"],
      foto: "waffle-cafe",
      efeito: "vapor",
    },
    {
      id: "meio-dia",
      titulo: "Meio-dia",
      chamada: "Almoço com cara de casa",
      texto: "Arroz, feijão, farofa e o que a panela pedir: picadinho, milanesa, piamontese, contra filé à cavalo.",
      itens: ["prato-do-dia", "picadinho", "piamontese-bife-milanesa"],
      foto: "pratos-almoco",
      efeito: "bolhas",
    },
    {
      id: "tarde",
      titulo: "Tarde",
      chamada: "Petiscos pra dividir (ou não)",
      texto: "Aipim, bolinho de bacalhau, isca à dorê com o molho Itinerante e o pão australiano gratinado.",
      itens: ["fritas-cheddar-bacon", "bolinho-bacalhau", "australiano-linguica"],
      foto: "fritas-cheddar",
      efeito: "fritas",
    },
  ],
};

export const pratoDoDiaTextos = {
  rotulo: "Hoje no carrinho:",
  semPrato: "Pergunte no balcão ou no WhatsApp qual é o prato de hoje. Enquanto isso, o executivo:",
  executivo: [
    "picadinho",
    "frango-milanesa-grelhado",
    "bife-milanesa",
    "strogonoff-carne",
    "massa-bolonhesa",
    "peixe-dore",
    "contra-file-cavalo",
  ],
} as const;

export const galeria = {
  titulo: "Mesa posta",
  fotos: [
    "waffle-cafe",
    "fritas-cheddar",
    "pratos-almoco",
    "australiano-linguica",
    "aipim-carne-seca",
    "misto-waffle",
    "australiano-frango",
  ] satisfies ChaveFoto[],
} as const;

export const zonaPortuaria = {
  sugerido: true,
  titulo: ["Uma panela", "com rodas."],
  paragrafos: [
    "Itinerante está no nome e na marca: uma panela que anda sobre duas rodas, levando o fogão junto.",
    "O endereço é fixo, na Avenida Rodrigues Alves, mas o ritmo é o do porto em volta: gente chegando cedo, saindo pro almoço, voltando no fim da tarde.",
  ],
  bairros: ["Santo Cristo", "Gamboa", "Saúde", "Praça Mauá", "Centro"],
} as const;

export const visite = {
  sugerido: true,
  titulo: ["Passa", "aqui."],
} as const;

export const rodape = {
  assinatura: "Do café ao almoço, na Zona Portuária.",
  marquee: "gastronomia itinerante",
} as const;

export const palavrasMarquee = ["caseiro", "quentinho", "itinerante", "zona portuária", "do café ao almoço"] as const;
