"use client";

import { useEffect, useState } from "react";
import { navegacao } from "@/data/content";
import { site } from "@/data/site";
import { linkWhatsApp } from "@/lib/links";
import { CarrinhoMascote } from "@/components/marca/CarrinhoMascote";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { IconeWhatsApp } from "@/components/ui/Icones";
import { MenuMobile } from "./MenuMobile";

export function Header() {
  const [rolado, setRolado] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const LIMIAR = 12;
    let referencia = window.scrollY;
    const aoRolar = () => {
      const atual = window.scrollY;
      setRolado(atual > 40);
      if (atual < 480) {
        setEscondido(false);
        referencia = atual;
        return;
      }
      // Só reage depois de um deslocamento acumulado: a rolagem suave gera deltas mínimos por quadro.
      const delta = atual - referencia;
      if (Math.abs(delta) < LIMIAR) return;
      setEscondido(delta > 0);
      referencia = atual;
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  const fundo = rolado && !menuAberto ? "bg-paper/85 backdrop-blur-md shadow-[0_1px_0_rgba(35,31,32,0.12)]" : "bg-transparent";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--header)] transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-expo)] ${fundo} ${
          escondido && !menuAberto ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1800px] items-center justify-between gap-4 px-4 md:px-8">
          <a href="#inicio" className="group flex items-center gap-2.5" aria-label={`${site.nome} — voltar ao início`}>
            <span className={`rounded-full p-0.5 transition-colors duration-500 ${menuAberto ? "bg-flame" : ""}`}>
              <CarrinhoMascote semTexto className="w-11 md:w-13" />
            </span>
            <span
              className={`flex flex-col leading-none transition-colors duration-500 ${menuAberto ? "text-paper" : "text-ink"}`}
              aria-hidden
            >
              <span className="mao text-[1.6rem] md:text-[1.85rem]">Gastronomia</span>
              <span className="rotulo -mt-0.5 text-[0.55rem] tracking-[0.55em]">Itinerante</span>
            </span>
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navegacao.map((item) => (
                <li key={item.rotulo}>
                  <a
                    href={item.href}
                    data-categoria={"categoria" in item ? item.categoria : undefined}
                    className="condensada group relative inline-block py-2 text-[0.95rem] font-semibold tracking-[0.12em] text-ink"
                  >
                    {item.rotulo}
                    <span className="absolute inset-x-0 bottom-1 h-0.5 origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-expo)] group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <BotaoWhatsApp rotulo="Pedir no WhatsApp" className={menuAberto ? "botao-chama" : ""} />
            </div>
            <a
              href={linkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className={`grid size-11 place-items-center rounded-full sm:hidden ${menuAberto ? "bg-flame text-ink" : "bg-ink text-paper"}`}
              aria-label="Pedir no WhatsApp (abre em nova aba)"
            >
              <IconeWhatsApp />
            </a>
            <button
              type="button"
              onClick={() => setMenuAberto((aberto) => !aberto)}
              aria-expanded={menuAberto}
              aria-controls="menu-mobile"
              className={`condensada flex min-h-11 items-center gap-2 px-2 text-sm tracking-[0.14em] lg:hidden ${
                menuAberto ? "text-paper" : "text-ink"
              }`}
            >
              <span>{menuAberto ? "Fechar" : "Menu"}</span>
              <span className="relative block h-3 w-6" aria-hidden>
                <span
                  className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-500 ease-[var(--ease-expo)] ${
                    menuAberto ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 bg-current transition-all duration-500 ease-[var(--ease-expo)] ${
                    menuAberto ? "top-1.5 w-full -rotate-45" : "top-2.5 w-2/3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MenuMobile aberto={menuAberto} aoFechar={() => setMenuAberto(false)} />
    </>
  );
}
