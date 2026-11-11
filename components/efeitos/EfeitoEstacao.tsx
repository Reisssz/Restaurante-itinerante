import type { Estacao } from "@/data/content";

/** Microanimações das estações do dia (CSS puro; desligadas em reduced-motion). */
export function EfeitoEstacao({ efeito, className = "" }: { efeito: Estacao["efeito"]; className?: string }) {
  if (efeito === "vapor") {
    return (
      <svg viewBox="0 0 120 90" className={`vapor ${className}`} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden>
        {[20, 55, 90].map((x, i) => (
          <path
            key={x}
            d={`M${x} 86c-12-14 12-22 0-36s12-22 0-36`}
            style={{ ["--i" as string]: i, transformBox: "fill-box", transformOrigin: "50% 100%" }}
          />
        ))}
      </svg>
    );
  }

  if (efeito === "bolhas") {
    return (
      <svg viewBox="0 0 120 90" className={className} fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden>
        {[
          [24, 9],
          [52, 6],
          [74, 11],
          [98, 7],
          [40, 5],
        ].map(([x, r], i) => (
          <circle
            key={x}
            className="bolha"
            cx={x}
            cy={82}
            r={r}
            style={{ ["--i" as string]: i, transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 90" className={className} fill="currentColor" aria-hidden>
      {[
        [18, -14],
        [42, 22],
        [64, -6],
        [86, 30],
        [104, -24],
        [30, 8],
      ].map(([x, r], i) => (
        <rect
          key={x}
          className="frita"
          x={x}
          y={30}
          width={7}
          height={30}
          rx={2}
          style={{ ["--i" as string]: i, ["--r" as string]: `${r}deg`, transformBox: "fill-box", transformOrigin: "50% 50%" }}
        />
      ))}
    </svg>
  );
}
