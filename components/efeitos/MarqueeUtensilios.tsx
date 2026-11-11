"use client";

import { Fragment, useRef } from "react";
import { palavrasMarquee } from "@/data/content";
import type { NomeUtensilio } from "@/data/tipos";
import { IconeUtensilio } from "@/components/marca/Utensilios";
import { gsap, ScrollTrigger, SEM_REDUCAO, useGSAP } from "@/lib/gsap";

const ordemUtensilios: NomeUtensilio[] = ["espatula", "fouet", "concha", "escumadeira", "garfo", "faca", "colher"];

interface Props {
  className?: string;
}

/** Faixa infinita com utensílios da logo em traço; inverte o sentido conforme a direção do scroll. */
export function MarqueeUtensilios({ className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(SEM_REDUCAO, () => {
        const trilho = ref.current!.querySelector(".marquee-trilho");
        const giro = gsap.to(trilho, { xPercent: -50, duration: 46, ease: "none", repeat: -1 });
        // Folga para poder rodar ao contrário sem bater no início da linha do tempo.
        giro.totalTime(giro.duration() * 200);
        const gatilho = ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? giro.play() : giro.pause()),
          onUpdate: (self) => {
            const impulso = Math.min(Math.abs(self.getVelocity()) / 600, 4);
            gsap.to(giro, { timeScale: self.direction * (1 + impulso), duration: 0.4, overwrite: true });
            gsap.to(giro, { timeScale: self.direction, duration: 1.2, delay: 0.4 });
          },
        });
        return () => {
          gatilho.kill();
          giro.kill();
        };
      });
    },
    { scope: ref },
  );

  const sequencia = palavrasMarquee.map((palavra, i) => (
    <Fragment key={palavra}>
      <span className={i % 2 ? "condensada vazado vazado-chama text-[1.12em]" : "display-italico text-paper"}>{palavra}</span>
      <IconeUtensilio
        nome={ordemUtensilios[i % ordemUtensilios.length]}
        className="mx-[0.5em] h-[1.1em] w-auto shrink-0 rotate-[28deg] text-flame"
      />
    </Fragment>
  ));

  return (
    <div ref={ref} className={`overflow-hidden bg-ink py-4 md:py-6 ${className}`} aria-hidden>
      <div className="marquee-trilho items-center whitespace-nowrap text-[clamp(2rem,5vw,4.5rem)] leading-none">
        <div className="flex items-center pr-[0.5em]">{sequencia}</div>
        <div className="flex items-center pr-[0.5em]">{sequencia}</div>
      </div>
    </div>
  );
}
