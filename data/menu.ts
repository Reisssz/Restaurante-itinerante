/**
 * Cardápio transcrito das imagens oficiais do cliente.
 * Para alterar preço: edite o número em `preco` (use ponto: 29.90).
 * Para adicionar item: copie uma linha e troque `id` (único, sem espaços), `nome` e `preco`.
 */
import type { ChaveFoto } from "./fotos";
import type { NomeUtensilio, Selo } from "./tipos";

export type CategoriaId = "cafes" | "cafe-da-manha" | "petiscos" | "lanches" | "pratos" | "bebidas";

export interface ItemCardapio {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  aPartirDe?: boolean;
  foto?: ChaveFoto;
  selo?: Selo;
}

export interface Categoria {
  id: CategoriaId;
  titulo: string;
  icone: NomeUtensilio;
  itens: ItemCardapio[];
  nota?: string;
}

export const cardapio: Categoria[] = [
  {
    id: "cafes",
    titulo: "Cafés",
    icone: "colher",
    itens: [
      { id: "expresso-pequeno", nome: "Expresso pequeno", preco: 6.0 },
      { id: "carioca-pequeno", nome: "Carioca pequeno", preco: 6.0 },
      { id: "cafe-com-leite", nome: "Café c/ leite (média)", preco: 8.9 },
      { id: "expresso-duplo", nome: "Café expresso duplo", preco: 9.9 },
      { id: "expresso-duplo-leite", nome: "Expresso duplo com leite", preco: 9.9 },
      { id: "chocolate-quente", nome: "Chocolate quente", preco: 8.9 },
      { id: "capuccino", nome: "Capuccino", preco: 8.9 },
      {
        id: "cafe-gelado",
        nome: "Café gelado 300ml",
        descricao: "Café, leite, calda de chocolate e chantilly",
        preco: 15.9,
      },
      { id: "chantilly", nome: "Chantilly", descricao: "Porção", preco: 3.5 },
    ],
  },
  {
    id: "cafe-da-manha",
    titulo: "Café da manhã",
    icone: "espatula",
    itens: [
      { id: "pao-na-chapa", nome: "Pão na chapa", preco: 5.5 },
      { id: "salgados", nome: "Salgados", preco: 12.9, aPartirDe: true },
      { id: "fatia-quiche", nome: "Fatia de quiche ou torta salgada", preco: 17.9 },
      { id: "pao-de-queijo", nome: "Pão de queijo", descricao: "Unidade", preco: 7.5 },
      { id: "waffle-pao-de-queijo", nome: "Waffle de pão de queijo", descricao: "Unidade", preco: 3.5 },
      {
        id: "waffle-requeijao-goiabada",
        nome: "Waffle de pão de queijo c/ requeijão e goiabada",
        descricao: "2 unidades",
        preco: 17.9,
        foto: "waffle-cafe",
      },
      { id: "porcao-requeijao", nome: "Porção de requeijão", preco: 3.8 },
      { id: "misto-quente", nome: "Misto quente", preco: 12.0 },
      { id: "misto-com-ovo", nome: "Misto ou queijo quente c/ ovo", preco: 14.9 },
      { id: "queijo-quente", nome: "Queijo quente", preco: 12.0 },
      {
        id: "misto-waffle",
        nome: "Misto quente de waffle de pão de queijo",
        preco: 17.9,
        foto: "misto-waffle",
      },
      { id: "omelete-queijo", nome: "Omelete c/ queijo", descricao: "2 ovos, acompanha pão", preco: 17.9 },
      { id: "ovos-mexidos", nome: "Ovos mexidos", descricao: "2 unidades", preco: 8.9 },
      { id: "pao-com-ovo", nome: "Pão com ovo", preco: 7.5 },
      { id: "fatia-bolo", nome: "Fatia de bolo", preco: 7.5 },
      { id: "sanduiche-natural", nome: "Sanduíche natural", preco: 15.0 },
      { id: "vitaminas", nome: "Vitaminas", preco: 14.5 },
      { id: "suco-natural-manha", nome: "Suco natural", preco: 10.9 },
    ],
  },
  {
    id: "petiscos",
    titulo: "Petiscos",
    icone: "escumadeira",
    itens: [
      {
        id: "fritas-cheddar-bacon",
        nome: "Fritas c/ cheddar e bacon",
        preco: 29.9,
        foto: "fritas-cheddar",
        selo: "para-dividir",
      },
      { id: "bolinho-bacalhau", nome: "Bolinho de bacalhau", preco: 38.0 },
      { id: "isca-carne", nome: "Isca de carne c/ cebola e aipim frito", preco: 58.9 },
      { id: "aipim-parmesao-bacon", nome: "Aipim frito c/ parmesão e bacon", preco: 29.9 },
      { id: "aipim-carne-seca", nome: "Aipim com carne seca", preco: 58.9, foto: "aipim-carne-seca" },
      { id: "isca-frango", nome: "Isca de frango à dorê c/ molho Itinerante", preco: 39.9 },
      { id: "isca-peixe", nome: "Isca de peixe à dorê c/ molho Itinerante", preco: 48.9 },
      {
        id: "porcao-linguica",
        nome: "Porção de linguiça c/ cheddar, crocante de bacon",
        descricao: "Pão australiano ou fritas",
        preco: 39.9,
      },
    ],
  },
  {
    id: "lanches",
    titulo: "Lanches",
    icone: "faca",
    itens: [
      {
        id: "australiano-frango",
        nome: "Pão australiano c/ picadinho de frango e mussarela gratinada",
        preco: 28.9,
        foto: "australiano-frango",
      },
      {
        id: "australiano-carne",
        nome: "Pão australiano c/ picadinho de carne e mussarela gratinada",
        preco: 31.9,
      },
      {
        id: "australiano-linguica",
        nome: "Pão australiano c/ linguiça, creme de cheddar e crocante de bacon",
        preco: 31.9,
        foto: "australiano-linguica",
      },
      {
        id: "fritas-acompanhamento",
        nome: "Porção de batata frita",
        descricao: "Para acompanhar seu lanche",
        preco: 8.0,
      },
    ],
  },
  {
    id: "pratos",
    titulo: "Pratos",
    icone: "garfo",
    itens: [
      { id: "prato-do-dia", nome: "Prato do dia", preco: 35.0, selo: "prato-do-dia" },
      {
        id: "picadinho",
        nome: "Picadinho à brasileira de carne",
        descricao: "Arroz, farofa, ovo frito e feijão",
        preco: 35.0,
        foto: "pratos-almoco",
      },
      {
        id: "frango-milanesa-grelhado",
        nome: "Frango à milanesa ou grelhado",
        descricao: "Arroz, farofa, feijão, fritas ou legumes ou salada",
        preco: 32.9,
      },
      {
        id: "bife-milanesa",
        nome: "Bife à milanesa",
        descricao: "Arroz, farofa, feijão, fritas ou legumes ou salada",
        preco: 37.9,
      },
      { id: "strogonoff-frango", nome: "Strogonoff de frango", descricao: "Arroz e batata palha", preco: 29.9 },
      { id: "strogonoff-carne", nome: "Strogonoff de carne", descricao: "Arroz e batata palha", preco: 34.9 },
      { id: "massa-pesto", nome: "Massa ao pesto", preco: 29.9 },
      { id: "massa-bolonhesa", nome: "Massa à bolonhesa", preco: 33.9 },
      { id: "massa-tomate", nome: "Massa ao molho de tomate", preco: 28.0 },
      {
        id: "quiche-empadao",
        nome: "Quiche primavera ou empadão",
        descricao: "Quiche: alho poró, tomate seco · Empadão: frango · com mix de salada verde",
        preco: 30.5,
      },
      {
        id: "piamontese-frango-grelhado",
        nome: "Arroz à piamontese",
        descricao: "Com frango grelhado e chips de batata",
        preco: 34.0,
      },
      {
        id: "piamontese-picadinho-frango",
        nome: "Arroz à piamontese",
        descricao: "Com picadinho de frango e chips de batata",
        preco: 34.0,
      },
      {
        id: "piamontese-picadinho-carne",
        nome: "Arroz à piamontese",
        descricao: "Com picadinho de carne e chips de batata",
        preco: 36.9,
      },
      {
        id: "piamontese-bife-milanesa",
        nome: "Arroz à piamontese",
        descricao: "Com bife à milanesa e chips de batata",
        preco: 37.9,
      },
      {
        id: "peixe-dore",
        nome: "Peixe à dorê c/ arroz, fritas ou legumes",
        descricao: "Molho de camarão ou belle meunière",
        preco: 38.9,
      },
      {
        id: "contra-file-grelhado",
        nome: "Contra filé grelhado",
        descricao: "Arroz, feijão, farofa, fritas ou legumes",
        preco: 42.9,
      },
      {
        id: "contra-file-cavalo",
        nome: "Contra filé à cavalo",
        descricao: "Arroz, feijão, farofa, fritas ou legumes",
        preco: 44.9,
      },
      {
        id: "salada-caesar",
        nome: "Salada Caesar",
        descricao: "Folhas, croutons, cubos de frango, molho caesar e queijo parmesão",
        preco: 28.9,
      },
      { id: "mix-folhas", nome: "Mix de folhas", descricao: "Folhas, tomate e cenoura", preco: 24.0 },
      {
        id: "salada-caprese",
        nome: "Salada de caprese com queijo minas",
        descricao: "Alface, tomate, queijo minas, pesto de manjericão",
        preco: 29.9,
      },
      {
        id: "quiche-mix-folhas",
        nome: "Quiche ou torta salgada c/ mix de folhas",
        descricao: "Com outras saladas do cardápio + R$ 3,00",
        preco: 30.9,
      },
      {
        id: "omelete-mix-folhas",
        nome: "Omelete c/ mix de folhas",
        descricao: "3 ovos, queijo, mix de folhas com cenoura, tomate · outras saladas do cardápio + R$ 3,00",
        preco: 30.9,
      },
      { id: "file-frango-mix", nome: "Filé de frango grelhado c/ mix de folhas", preco: 30.9 },
    ],
  },
  {
    id: "bebidas",
    titulo: "Bebidas",
    icone: "concha",
    itens: [
      { id: "agua", nome: "Água mineral com ou sem gás", preco: 5.5 },
      { id: "refrigerantes", nome: "Refrigerantes", preco: 7.0 },
      { id: "mate", nome: "Mate", preco: 6.0 },
      { id: "ice-tea", nome: "Ice tea", preco: 7.0 },
      { id: "guaravitom", nome: "Guaravitom", preco: 7.0 },
      { id: "h2o-limoneto", nome: "H2O / Limoneto", preco: 8.0 },
      { id: "gatorade", nome: "Gatorade", preco: 10.0 },
      { id: "energetico", nome: "Energético", preco: 15.0 },
      { id: "todynho", nome: "Todynho", preco: 6.5 },
      { id: "suco-natural", nome: "Suco natural", preco: 10.9 },
      { id: "dell-valle", nome: "Dell Valle", preco: 8.5 },
      { id: "cafe-expresso-bebidas", nome: "Café expresso", preco: 6.0 },
    ],
  },
];

export const notaSobremesas = "Temos sobremesas, sorvetes e picolés. Consulte com nosso atendente.";
export const avisoPrecos = "Valores sujeitos a alteração.";

const indicePorId = new Map(cardapio.flatMap((categoria) => categoria.itens.map((item) => [item.id, item] as const)));

export function buscarItem(id: string): ItemCardapio | undefined {
  return indicePorId.get(id);
}

/** Nome completo usado em pedidos (inclui a variação quando o nome se repete, ex.: piamontese). */
export function nomeParaPedido(item: ItemCardapio): string {
  return item.nome === "Arroz à piamontese" && item.descricao ? `${item.nome} (${item.descricao.toLowerCase()})` : item.nome;
}

export function faixaDePreco(): { minimo: number; maximo: number } {
  let minimo = Number.POSITIVE_INFINITY;
  let maximo = 0;
  for (const item of indicePorId.values()) {
    minimo = Math.min(minimo, item.preco);
    maximo = Math.max(maximo, item.preco);
  }
  return { minimo, maximo };
}
