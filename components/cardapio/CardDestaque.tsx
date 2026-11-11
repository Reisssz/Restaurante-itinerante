import type { ItemCardapio } from "@/data/menu";
import { Foto } from "@/components/ui/Foto";
import { BotaoAdicionar } from "./BotaoAdicionar";
import { LinkPedirItem, Preco } from "./ItemLinha";

interface Props {
  item: ItemCardapio;
  indice: number;
}

/** Item com foto real do cardápio: card maior intercalado na lista, moldura alternando círculo / retângulo. */
export function CardDestaque({ item, indice }: Props) {
  if (!item.foto) return null;
  const circular = indice % 2 === 0;

  return (
    <li data-item data-foto={item.foto} className="col-span-full my-8 lg:my-12">
      <article className={`grid items-center gap-6 md:grid-cols-12 md:gap-10 ${circular ? "" : "md:[direction:rtl]"}`}>
        <div className="md:col-span-5 md:[direction:ltr]">
          <div
            data-revelar
            className={`mx-auto w-[78%] overflow-hidden md:w-full ${circular ? "rounded-full" : "moldura rotate-2 bg-ink"}`}
          >
            <Foto
              chave={item.foto}
              sizes="(min-width: 768px) 36vw, 78vw"
              tom={circular ? "chama" : "papel"}
              className={circular ? "aspect-square rounded-full" : "aspect-[4/3]"}
            />
          </div>
        </div>
        <div className="md:col-span-7 md:[direction:ltr]">
          <p className="mao mb-2 text-2xl text-ember">em destaque</p>
          <h4 className="display text-[clamp(2rem,4.6vw,4.4rem)] leading-[0.95]">{item.nome}</h4>
          {item.descricao && <p className="mt-3 text-ink/75">{item.descricao}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Preco item={item} className="text-4xl md:text-5xl" />
            <BotaoAdicionar item={item} />
            <LinkPedirItem item={item} className="text-ink" />
          </div>
        </div>
      </article>
    </li>
  );
}
