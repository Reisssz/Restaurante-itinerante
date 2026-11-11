import type { Metadata, Viewport } from "next";
import { Amatic_SC, Barlow_Condensed, DM_Sans, Fraunces } from "next/font/google";
import { site } from "@/data/site";
import { DadosEstruturados } from "@/components/seo/DadosEstruturados";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const amatic = Amatic_SC({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-amatic",
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

const titulo = `${site.nome} — Restaurante e Café na Zona Portuária, Rio de Janeiro`;
const descricao =
  "Café da manhã, almoço executivo, prato do dia, petiscos e lanches no pão australiano na Avenida Rodrigues Alves, Zona Portuária do Rio. Veja o cardápio completo e peça pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: titulo, template: `%s · ${site.nome}` },
  description: descricao,
  applicationName: site.nome,
  keywords: [
    "restaurante zona portuária",
    "café zona portuária rio",
    "almoço executivo rio de janeiro",
    "prato do dia centro rio",
    "avenida rodrigues alves",
    "petiscos zona portuária",
    "pão australiano",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.nome,
    title: titulo,
    description: descricao,
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f7941d",
  colorScheme: "light",
};

// Executa antes da primeira pintura: decide se o pré-loader aparece (só na 1ª visita da sessão).
const scriptInicial = `try{var d=document.documentElement;d.classList.add('js');if(sessionStorage.getItem('gi-visitou')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('ja-visitou')}else{d.classList.add('com-preloader')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${barlow.variable} ${amatic.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptInicial }} />
        <DadosEstruturados />
      </head>
      <body>{children}</body>
    </html>
  );
}
