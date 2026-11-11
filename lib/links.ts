import { mensagensWhatsApp, site } from "@/data/site";

export function linkWhatsApp(mensagem: string = mensagensWhatsApp.padrao): string {
  const numero = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function enderecoCompleto(): string {
  const { logradouro, bairro, cidade, uf } = site.endereco;
  return [logradouro, bairro, `${cidade} – ${uf}`].filter(Boolean).join(", ");
}

export function linkComoChegar(): string {
  if (site.googleMapsUrl) return site.googleMapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto())}`;
}

export function linkMapaEmbed(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(enderecoCompleto())}&output=embed`;
}

export function linkInstagram(): { url: string; rotulo: string } {
  if (site.instagram.url) return { url: site.instagram.url, rotulo: site.instagram.usuario || "Instagram" };
  return { url: site.linktree, rotulo: "linktr.ee/itineranterio" };
}
