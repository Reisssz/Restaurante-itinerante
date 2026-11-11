import { mensagensWhatsApp, site } from "@/data/site";
import { nomeParaPedido, type ItemCardapio } from "@/data/menu";
import { formatarValor } from "@/lib/formatar";
import { linkWhatsApp } from "@/lib/links";
import { SetaDiagonal } from "@/components/ui/Icones";
import { BotaoAdicionar } from "./BotaoAdicionar";

const rotulosSelo = {
  "mais-pedido": "mais pedido",
  "prato-do-dia": "prato do dia",
  "para-dividir": "pra dividir",
} as const;

export function Preco({ item, className = "" }: { item: ItemCardapio; className?: string }) {
  return (
    <span className={`condensada tabular whitespace-nowrap ${className}`}>
      {item.aPartirDe && <span className="mr-1 text-[0.62em] font-semibold tracking-[0.08em] opacity-70">a partir de</span>}
      <span className="text-[0.7em] opacity-70">R$</span> {formatarValor(item.preco)}
    </span>
  );
}

export function LinkPedirItem({ item, className = "" }: { item: ItemCardapio; className?: string }) {
  return (
    <a
      href={linkWhatsApp(mensagensWhatsApp.item(nomeParaPedido(item)))}
      target="_blank"
      rel="noopener noreferrer"
      className={`rotulo inline-flex min-h-8 items-center gap-1 text-[0.62rem] tracking-[0.18em] ${className}`}
    >
      Pedir este item
      <SetaDiagonal className="size-3" />
      <span className="sr-only">: {nomeParaPedido(item)} pelo WhatsApp (abre em nova aba)</span>
    </a>
  );
}

export function ItemLinha({ item }: { item: ItemCardapio }) {
  const selo = site.exibirSelos && item.selo ? rotulosSelo[item.selo] : null;

  return (
    <li data-item data-foto={item.foto} className="group border-b border-ink/10">
      <div className="flex items-center gap-3 py-3 transition-transform duration-500 ease-[var(--ease-expo)] lg:group-hover:translate-x-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-end gap-2">
            <h4 className="condensada text-[1.12rem] font-bold leading-[1.05] tracking-[0.01em] md:text-[1.3rem]">
              {item.nome}
              {selo && <span className="mao ml-2 inline-block -rotate-3 text-xl font-bold normal-case text-ember">{selo}</span>}
            </h4>
            <span
              data-pontilhado
              aria-hidden
              className="pontilhado mb-[0.35em] h-[3px] min-w-5 flex-1 text-ink/45 transition-colors group-hover:text-ink"
            />
            <Preco item={item} className="text-[1.15rem] md:text-[1.3rem]" />
          </div>
          {item.descricao && <p className="mt-1 max-w-[46ch] text-[0.84rem] leading-snug text-ink/75">{item.descricao}</p>}
          <LinkPedirItem
            item={item}
            className="mt-1 text-ink/80 transition-opacity duration-300 hover:text-ink lg:opacity-0 lg:focus-visible:opacity-100 lg:group-hover:opacity-100"
          />
        </div>
        <BotaoAdicionar item={item} />
      </div>
    </li>
  );
}
