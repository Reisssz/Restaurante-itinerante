import { cardapio, faixaDePreco, nomeParaPedido } from "@/data/menu";
import { site } from "@/data/site";
import { formatarPreco } from "@/lib/formatar";
import { horariosSchema } from "@/lib/horario";
import { linkComoChegar, linkInstagram } from "@/lib/links";

/** JSON-LD Restaurant com cardápio completo. Só inclui dados reais (campos vazios são omitidos). */
export function DadosEstruturados() {
  const { minimo, maximo } = faixaDePreco();
  const { logradouro, bairro, cidade, uf, cep } = site.endereco;

  const dados = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/#restaurante`,
    name: site.nome,
    description: site.slogan,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    servesCuisine: ["Brasileira", "Café", "Petiscos", "Lanches"],
    priceRange: `${formatarPreco(minimo)} – ${formatarPreco(maximo)}`,
    currenciesAccepted: "BRL",
    address: {
      "@type": "PostalAddress",
      streetAddress: logradouro,
      addressLocality: cidade,
      addressRegion: uf,
      addressCountry: "BR",
      ...(bairro && { addressNeighborhood: bairro }),
      ...(cep && { postalCode: cep }),
    },
    hasMap: linkComoChegar(),
    openingHoursSpecification: horariosSchema(),
    ...(site.telefone && { telephone: site.telefone }),
    sameAs: [linkInstagram().url],
    hasMenu: {
      "@type": "Menu",
      name: `Cardápio ${site.nome}`,
      inLanguage: "pt-BR",
      hasMenuSection: cardapio.map((categoria) => ({
        "@type": "MenuSection",
        name: categoria.titulo,
        hasMenuItem: categoria.itens.map((item) => ({
          "@type": "MenuItem",
          name: nomeParaPedido(item),
          ...(item.descricao && { description: item.descricao }),
          offers: { "@type": "Offer", price: item.preco.toFixed(2), priceCurrency: "BRL" },
        })),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }}
    />
  );
}
