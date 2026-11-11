"use client";

import { useState } from "react";
import { visite } from "@/data/content";
import { mensagensWhatsApp, site } from "@/data/site";
import { TransicaoCalda } from "@/components/efeitos/TransicaoCalda";
import { BotaoWhatsApp } from "@/components/ui/BotaoWhatsApp";
import { SetaDiagonal } from "@/components/ui/Icones";
import { Magnetico } from "@/components/ui/Magnetico";
import { StatusAberto, useStatusFuncionamento } from "@/components/ui/StatusAberto";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { horariosAgrupados } from "@/lib/horario";
import { enderecoCompleto, linkComoChegar, linkInstagram, linkMapaEmbed } from "@/lib/links";

export function Visite() {
  const status = useStatusFuncionamento();
  const grupos = horariosAgrupados();
  const instagram = linkInstagram();
  const { logradouro, bairro, cidade, uf, cep } = site.endereco;

  return (
    <section id="visite" aria-labelledby="titulo-visite" className="sobre-escuro relative bg-ink pb-24 pt-[28vw] text-paper sm:pt-[24vw] lg:pb-32 lg:pt-[17vw]">
      <TransicaoCalda cor="var(--color-flame)" padrao={0} />

      <div className="mx-auto max-w-[1800px] px-4 md:px-8">
        <p className="rotulo mb-6 flex items-center gap-3">
          <span className="tabular text-flame">07</span>
          <span className="h-px w-10 bg-paper" />
          Visite
        </p>
        <TituloRevelado id="titulo-visite" className="display text-[30vw] leading-[0.8] lg:text-[19vw]">
          {visite.titulo[0]} <span className="display-italico text-flame">{visite.titulo[1]}</span>
        </TituloRevelado>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-10 lg:col-span-5">
            <address className="not-italic">
              <p className="rotulo mb-3 text-[0.68rem] text-paper/70">Endereço</p>
              <p className="display text-[clamp(2rem,3.4vw,3.2rem)] leading-[0.95]">{logradouro}</p>
              <p className="mt-2 text-paper/80">
                {[bairro, site.endereco.regiao, `${cidade} – ${uf}`, cep].filter(Boolean).join(" · ")}
              </p>
              {site.telefone && (
                <a href={`tel:${site.telefone.replace(/[^\d+]/g, "")}`} className="mt-3 inline-block sublinhado">
                  {site.telefone}
                </a>
              )}
            </address>

            <div>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
                <p className="rotulo text-[0.68rem] text-paper/70">Horário</p>
                <StatusAberto className="rotulo text-[0.7rem] text-flame" />
              </div>
              <dl className="divide-y divide-paper/15 border-y border-paper/15">
                {grupos.map((grupo) => {
                  const hoje = status ? grupo.diasNumeros.includes(status.diaAtual) : false;
                  return (
                    <div key={grupo.dias} className={`flex items-center justify-between py-3 ${hoje ? "text-flame" : ""}`}>
                      <dt className="condensada text-lg font-semibold tracking-[0.04em]">
                        {grupo.dias}
                        {hoje && <span className="mao ml-3 text-xl normal-case">hoje</span>}
                      </dt>
                      <dd className="condensada tabular text-lg">{grupo.horas}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div className="flex flex-col items-start gap-4">
              <BotaoWhatsApp
                variante="chama"
                rotulo="Chamar no WhatsApp"
                mensagem={mensagensWhatsApp.comoChegar}
                className="min-h-16 px-8 text-lg"
              />
              <div className="flex flex-wrap gap-3">
                <Magnetico forca={0.2}>
                  <a href={linkComoChegar()} target="_blank" rel="noopener noreferrer" className="botao botao-contorno-papel">
                    Como chegar
                    <SetaDiagonal />
                    <span className="sr-only">(abre o Google Maps em nova aba)</span>
                  </a>
                </Magnetico>
                <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="botao sublinhado rounded-none px-1 text-paper">
                  {instagram.rotulo}
                  <SetaDiagonal />
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-[3vw]">
            <MapaFachada />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Mapa estilizado leve; o Google Maps só carrega se a pessoa pedir (performance e privacidade). */
function MapaFachada() {
  const [carregado, setCarregado] = useState(false);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-ink-soft shadow-[0_0_0_2px_rgba(239,230,210,0.15)] sm:aspect-[4/3]">
      {carregado ? (
        <iframe
          src={linkMapaEmbed()}
          title={`Mapa: ${enderecoCompleto()}`}
          className="absolute inset-0 size-full border-0 [filter:grayscale(1)_invert(0.92)_sepia(0.25)_contrast(0.9)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <svg viewBox="0 0 400 320" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <rect width="400" height="320" className="fill-ink-soft" />
            <path d="M0 0H400V70C340 90 300 60 240 80S120 96 0 84Z" className="fill-ink" />
            <g fill="none" className="stroke-paper/12" strokeWidth={10} strokeLinecap="round">
              <path d="M-10 150C100 140 260 130 410 136" />
              <path d="M60 330L120 140M190 330l20-196M300 330l-6-198M-10 240h420" />
            </g>
            <g fill="none" className="stroke-paper/6" strokeWidth={4}>
              <path d="M-10 196h420M-10 284h420M30 330l40-190M250 330l10-190M350 330l-20-190" />
            </g>
          </svg>
          <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-full">
            <span className="pulso relative grid size-16 place-items-center rounded-full bg-milk text-ink shadow-[0_0_0_4px_var(--color-flame)] after:absolute after:inset-0 after:rounded-full after:bg-flame/40">
              <span className="relative size-6 rounded-full bg-ink" />
            </span>
            <span className="mx-auto block h-6 w-1 bg-flame" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 bg-linear-to-t from-ink via-ink/80 to-transparent p-6 pt-16">
            <p className="mao text-3xl leading-none">{site.endereco.logradouro}</p>
            <button type="button" onClick={() => setCarregado(true)} className="botao botao-contorno-papel">
              Carregar mapa interativo
            </button>
            <p className="text-xs text-paper/60">O mapa é fornecido pelo Google e só carrega após o clique.</p>
          </div>
        </>
      )}
    </div>
  );
}
