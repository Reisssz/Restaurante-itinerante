import { navegacao, rodape } from "@/data/content";
import { site } from "@/data/site";
import { CarrinhoMascote } from "@/components/marca/CarrinhoMascote";
import { horariosAgrupados } from "@/lib/horario";
import { enderecoCompleto, linkInstagram, linkWhatsApp } from "@/lib/links";

export function Rodape() {
  const instagram = linkInstagram();

  return (
    <footer id="rodape" className="sobre-escuro relative overflow-hidden bg-ink text-paper">
      <div className="overflow-hidden border-y border-paper/10 py-6" aria-hidden>
        <div className="deslizar flex w-max whitespace-nowrap">
          {[0, 1].map((copia) => (
            <span key={copia} className="condensada vazado vazado-chama pr-[0.4em] text-[18vw] lg:text-[11vw]">
              {rodape.marquee} · {rodape.marquee} ·
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1800px] gap-12 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-4">
          <div className="grid aspect-square w-48 place-items-center rounded-full bg-flame p-6 md:w-56">
            <CarrinhoMascote rotulo={site.nome} />
          </div>
          <p className="mao mt-8 max-w-xs text-[2.1rem] leading-[0.95]">{rodape.assinatura}</p>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-2">
          <p className="rotulo mb-5 text-[0.68rem] text-paper/60">Navegar</p>
          <ul className="space-y-1">
            {navegacao.map((item) => (
              <li key={item.rotulo}>
                <a
                  href={item.href}
                  data-categoria={"categoria" in item ? item.categoria : undefined}
                  className="condensada inline-flex min-h-10 items-center text-xl tracking-[0.06em] transition-colors hover:text-flame"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="rotulo mb-5 text-[0.68rem] text-paper/60">Horário</p>
          <ul className="space-y-2">
            {horariosAgrupados().map((grupo) => (
              <li key={grupo.dias} className="flex justify-between gap-4 border-b border-paper/10 pb-2">
                <span>{grupo.dias}</span>
                <span className="tabular text-paper/80">{grupo.horas}</span>
              </li>
            ))}
          </ul>
          <p className="rotulo mb-3 mt-10 text-[0.68rem] text-paper/60">Endereço</p>
          <address className="not-italic text-paper/85">{enderecoCompleto()}</address>
        </div>

        <div className="lg:col-span-3">
          <p className="rotulo mb-5 text-[0.68rem] text-paper/60">Fale com a gente</p>
          <ul className="space-y-1">
            <li>
              <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" className="condensada inline-flex min-h-10 items-center text-xl tracking-[0.06em] hover:text-flame">
                WhatsApp <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="condensada inline-flex min-h-10 items-center text-xl tracking-[0.06em] hover:text-flame">
                {site.instagram.url ? "Instagram" : "Linktree"} <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1800px] flex-col gap-3 border-t border-paper/10 px-4 py-6 text-sm text-paper/60 md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {site.nome}
        </p>
        <p className="text-white">
          Desenvolvido por{" "}
          {site.credito.url ? (
            <a href={site.credito.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#c6ff1a] sublinhado">
              {site.credito.nome}
            </a>
          ) : (
            <span className="font-semibold text-[#c6ff1a]">{site.credito.nome}</span>
          )}
        </p>
        <a href="#inicio" className="rotulo inline-flex min-h-11 items-center text-[0.68rem] text-paper sublinhado self-start md:self-auto">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  );
}
