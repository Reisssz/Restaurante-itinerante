import Image from "next/image";
import pratoDoDia from "@/data/prato-do-dia.json";
import { pratoDoDiaTextos } from "@/data/content";
import { buscarItem, nomeParaPedido } from "@/data/menu";
import { mensagensWhatsApp } from "@/data/site";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { formatarValor } from "@/lib/formatar";

/** Prato do dia em lousa de giz. Edite data/prato-do-dia.json ("ativo": true) para publicar o prato de hoje. */
export function PratoDoDia() {
  const temPrato = pratoDoDia.ativo && pratoDoDia.nome.trim().length > 0;
  const executivo = pratoDoDiaTextos.executivo.map(buscarItem).filter((item) => item !== undefined);
  const precoPadrao = buscarItem("prato-do-dia")?.preco ?? pratoDoDia.preco;

  return (
    <section id="almoco" aria-labelledby="titulo-almoco" className="papel relative overflow-hidden bg-paper-deep py-24 text-ink lg:py-36">
      <div className="mx-auto grid max-w-[1800px] gap-14 px-4 md:px-8 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <p className="rotulo mb-6 flex items-center gap-3">
            <span className="tabular text-ember">04</span>
            <span className="h-px w-10 bg-ink" />
            Prato do dia
          </p>
          <TituloRevelado id="titulo-almoco" className="display text-[24vw] lg:text-[11vw]">
            Almoço{" "}
            <span className="condensada vazado vazado-tinta block text-[0.62em] tracking-[-0.01em]">executivo</span>
          </TituloRevelado>
          <p className="mt-8 max-w-md text-[1.05rem] leading-snug">
            Picadinho, milanesa, strogonoff, massas, piamontese, contra filé e saladas. E todo dia um prato do dia: pergunte
            qual é o de hoje pelo WhatsApp.
          </p>
          <div className="mt-8">
            <BotaoWhatsApp
              rotulo="Qual o prato de hoje?"
              mensagem={mensagensWhatsApp.pratoDoDia(temPrato ? pratoDoDia.nome : "prato do dia")}
            />
          </div>
        </div>

        <div className="relative lg:col-span-7 lg:pl-[4vw]">
          <div className="sobre-escuro relative rotate-[-1.5deg] bg-ink p-7 text-paper shadow-[0_0_0_clamp(10px,1.2vw,18px)_var(--color-ink-soft),18px_24px_0_clamp(10px,1.2vw,18px)_rgba(35,31,32,0.18)] md:p-12">
            <span aria-hidden className="absolute -top-4 left-[12%] h-8 w-24 rotate-[-8deg] bg-paper/70" />
            <span aria-hidden className="absolute -top-4 right-[14%] h-8 w-20 rotate-[6deg] bg-paper/70" />
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:var(--ruido)] [filter:invert(1)]" />

            <p className="mao text-[2.1rem] text-flame [text-shadow:0_0_1px_currentColor]">{pratoDoDiaTextos.rotulo}</p>

            {temPrato ? (
              <div className="mt-4 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <h3 className="mao text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.85] [text-shadow:0_0_2px_rgba(239,230,210,0.5)]">
                    {pratoDoDia.nome}
                  </h3>
                  {pratoDoDia.descricao && <p className="mt-4 max-w-md text-paper/85">{pratoDoDia.descricao}</p>}
                  <p className="condensada tabular mt-6 text-6xl text-flame">R$ {formatarValor(pratoDoDia.preco || precoPadrao)}</p>
                </div>
                {pratoDoDia.foto && (
                  <div className="relative aspect-square w-48 overflow-hidden rounded-full shadow-[0_0_0_6px_var(--color-flame)]">
                    <Image src={pratoDoDia.foto} alt={pratoDoDia.nome} fill sizes="192px" className="object-cover" />
                  </div>
                )}
              </div>
            ) : (
              <>
                <h3 className="mao mt-2 text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.9] [text-shadow:0_0_2px_rgba(239,230,210,0.5)]">
                  Prato do dia · R$ {formatarValor(precoPadrao)}
                </h3>
                <p className="mt-3 max-w-md text-[0.95rem] text-paper/80">{pratoDoDiaTextos.semPrato}</p>
                <ul className="mt-6 space-y-1.5">
                  {executivo.map((item) => (
                    <li key={item.id} className="flex items-end gap-3">
                      <span className="mao text-[1.75rem] leading-none md:text-[2rem]">{nomeParaPedido(item)}</span>
                      <span aria-hidden className="pontilhado mb-1.5 h-[3px] min-w-4 flex-1 text-paper/40" />
                      <span className="mao tabular text-[1.75rem] leading-none text-flame md:text-[2rem]">{formatarValor(item.preco)}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
