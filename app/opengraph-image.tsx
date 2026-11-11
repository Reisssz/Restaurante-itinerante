import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.nome} — Restaurante e Café na Zona Portuária, Rio de Janeiro`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tinta = "#231f20";
const chama = "#f7941d";
const papel = "#efe6d2";

function Roda() {
  return (
    <div
      style={{
        width: 92,
        height: 92,
        borderRadius: 999,
        background: "#fbf7ef",
        border: `5px solid ${tinta}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 34, height: 34, borderRadius: 999, background: tinta }} />
    </div>
  );
}

/** Imagem de compartilhamento gerada a partir da marca: panela-carrinho sobre rodas. */
export default function ImagemOpenGraph() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: chama, padding: 64, position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 560 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: tinta, textTransform: "uppercase" }}>
            Zona Portuária · Rio de Janeiro
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: tinta }}>
            <div style={{ fontSize: 108, lineHeight: 0.9, fontWeight: 700, letterSpacing: -4 }}>Comida de verdade,</div>
            <div style={{ fontSize: 64, lineHeight: 1.1, marginTop: 16 }}>no ritmo do porto.</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: tinta }}>Restaurante & Café · Cardápio completo no site</div>
        </div>

        <div style={{ position: "absolute", right: 70, top: 120, display: "flex", flexDirection: "column", alignItems: "center", transform: "rotate(-5deg)" }}>
          <div style={{ width: 480, height: 26, background: tinta, borderRadius: 10 }} />
          <div
            style={{
              width: 440,
              height: 190,
              background: tinta,
              borderRadius: "0 0 36px 36px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: papel,
            }}
          >
            <div style={{ fontSize: 64, letterSpacing: 2 }}>GASTRONOMIA</div>
            <div style={{ fontSize: 22, letterSpacing: 14, marginTop: 4 }}>ITINERANTE</div>
          </div>
          <div style={{ display: "flex", gap: 120, marginTop: -40 }}>
            <Roda />
            <Roda />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
