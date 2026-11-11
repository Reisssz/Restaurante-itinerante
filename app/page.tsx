import { Header } from "@/components/layout/Header";
import { IndicadorSecao } from "@/components/layout/IndicadorSecao";
import { WhatsAppFlutuante } from "@/components/layout/WhatsAppFlutuante";
import { Comanda } from "@/components/layout/Comanda";
import { Rodape } from "@/components/layout/Rodape";
import { PreLoader } from "@/components/experiencia/PreLoader";
import { RolagemSuave } from "@/components/experiencia/RolagemSuave";
import { Hero } from "@/components/secoes/Hero";
import { Manifesto } from "@/components/secoes/Manifesto";
import { DiaNoCarrinho } from "@/components/secoes/DiaNoCarrinho";
import { Cardapio } from "@/components/secoes/Cardapio";
import { PratoDoDia } from "@/components/secoes/PratoDoDia";
import { Galeria } from "@/components/secoes/Galeria";
import { ZonaPortuaria } from "@/components/secoes/ZonaPortuaria";
import { Visite } from "@/components/secoes/Visite";
import { PedidoProvider } from "@/lib/pedido";

export default function Pagina() {
  return (
    <PedidoProvider>
      <a
        href="#cardapio"
        className="condensada sr-only z-[100] bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o cardápio
      </a>
      <PreLoader />
      <RolagemSuave />
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <DiaNoCarrinho />
        <Cardapio />
        <PratoDoDia />
        <Galeria />
        <ZonaPortuaria />
        <Visite />
      </main>
      <Rodape />
      <IndicadorSecao />
      <WhatsAppFlutuante />
      <Comanda />
      <div className="grao" aria-hidden />
    </PedidoProvider>
  );
}
