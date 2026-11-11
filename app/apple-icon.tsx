import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Ícone de tela inicial: a roda do carrinho sobre o laranja da marca. */
export default function IconeApple() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7941d" }}>
        <div
          style={{
            width: 124,
            height: 124,
            borderRadius: 999,
            background: "#fbf7ef",
            border: "8px solid #231f20",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 999, background: "#231f20" }} />
        </div>
      </div>
    ),
    size,
  );
}
