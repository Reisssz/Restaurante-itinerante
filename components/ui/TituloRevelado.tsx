"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SEM_REDUCAO, SplitText, useGSAP } from "@/lib/gsap";

interface Props {
  children: ReactNode;
  como?: ElementType;
  className?: string;
  id?: string;
  atraso?: number;
}

/** Título com entrada por máscara, linha a linha, disparada pelo scroll. */
export function TituloRevelado({ children, como: Tag = "h2", className = "", id, atraso = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(SEM_REDUCAO, () => {
        const divisao = SplitText.create(ref.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 112,
              rotation: 2.5,
              duration: 1.2,
              delay: atraso,
              stagger: 0.09,
              scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
            }),
        });
        return () => divisao.revert();
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
