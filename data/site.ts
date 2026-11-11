/**
 * Configuração do cliente. Tudo que estiver vazio ("") é PLACEHOLDER — ver PREENCHER.md.
 * Dados abaixo foram extraídos SOMENTE dos prints do Instagram enviados.
 */

export type DiaSemana = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo

export interface Expediente {
  dia: DiaSemana;
  abre: string; // "HH:MM"
  fecha: string; // "HH:MM"
}

/**
 * [HORÁRIO DE FUNCIONAMENTO] — CONFLITO NOS PRINTS:
 *  - Story: Seg–Sex 8:30–16:00 · Sáb 10:00–16:00 · Dom fechado (usado aqui, é o mais detalhado)
 *  - Bio:   Seg–Sáb 8h–17h
 * Validar com o cliente.
 */
const horarios: Expediente[] = [
  { dia: 1, abre: "08:30", fecha: "16:00" },
  { dia: 2, abre: "08:30", fecha: "16:00" },
  { dia: 3, abre: "08:30", fecha: "16:00" },
  { dia: 4, abre: "08:30", fecha: "16:00" },
  { dia: 5, abre: "08:30", fecha: "16:00" },
  { dia: 6, abre: "10:00", fecha: "16:00" },
];

interface ConfigSite {
  nome: string;
  nomeCurto: string;
  slogan: string;
  url: string;
  whatsapp: string;
  telefone: string;
  endereco: { logradouro: string; bairro: string; cep: string; cidade: string; uf: string; regiao: string };
  googleMapsUrl: string;
  instagram: { usuario: string; url: string };
  linktree: string;
  horarios: Expediente[];
  fusoHorario: string;
  cardapioPdf: string;
  exibirSelos: boolean;
  credito: { nome: string; url: string };
}

export const site: ConfigSite = {
  nome: "Gastronomia Itinerante",
  nomeCurto: "Itinerante",
  // Bio do Instagram (texto do próprio cliente).
  slogan: "O melhor Restaurante & Café da Zona Portuária do Rio de Janeiro",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // [NÚMERO WHATSAPP com DDI+DDD] — ex.: "5521999999999". Vazio = abre o WhatsApp sem destinatário.
  whatsapp: "",
  // Telefone fixo opcional, ex.: "+55 21 0000-0000".
  telefone: "",

  endereco: {
    // Bio do Instagram: "Avenida Rodrígues Alves 173 A, Rio de Janeiro, Rio de Janeiro"
    logradouro: "Avenida Rodrigues Alves, 173 A",
    // [BAIRRO] e [CEP] não aparecem nos prints.
    bairro: "",
    cep: "",
    cidade: "Rio de Janeiro",
    uf: "RJ",
    regiao: "Zona Portuária",
  },

  // [LINK GOOGLE MAPS] — troque pelo link oficial da ficha do Google. Enquanto vazio, usamos busca pelo endereço.
  googleMapsUrl: "",

  instagram: {
    // [@INSTAGRAM] — o print mostra apenas "gastronomiaitinerant…" (cortado).
    usuario: "",
    url: "",
  },
  linktree: "https://linktr.ee/itineranterio",

  horarios,
  fusoHorario: "America/Sao_Paulo",

  // Caminho em /public, ex.: "/cardapio.pdf". Vazio = botão escondido.
  cardapioPdf: "",

  // Selos "Mais pedido" / "Para dividir" só aparecem se o cliente confirmar.
  exibirSelos: false,

  credito: { nome: "Weblytics", url: "https://weblytics.com.br" },
};

export const mensagensWhatsApp = {
  padrao: "Olá! Vim pelo site e queria fazer um pedido.",
  item: (nome: string) => `Olá! Quero pedir: ${nome}`,
  pratoDoDia: (nome: string) => `Olá! Qual o prato do dia hoje? Vi no site: ${nome}`,
  comoChegar: "Olá! Estou indo aí, vocês estão abertos agora?",
};
