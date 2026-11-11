import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.nome,
    short_name: site.nomeCurto,
    description: site.slogan,
    start_url: "/",
    display: "standalone",
    background_color: "#f7941d",
    theme_color: "#f7941d",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
