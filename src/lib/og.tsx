import { ImageResponse } from "next/og"

// O renderizador de OG (Satori) não entende oklch: verde litúrgico em hex.
const accent = "#2e6b4a"

export const ogSize = { width: 1200, height: 630 }

type OgImageOptions = {
  eyebrow: string
  title: string
  subtitle?: string
}

/** Imagem de compartilhamento no estilo editorial do site. */
export function renderOgImage({ eyebrow, title, subtitle }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f5f4f0",
          color: "#1b1a18",
          fontFamily: "serif",
        }}
      >
        <div style={{ height: 14, background: accent }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontFamily: "monospace",
              fontSize: 24,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6a675f",
            }}
          >
            <div style={{ width: 48, height: 2, background: accent }} />
            {eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ maxWidth: 1000, fontSize: 76, lineHeight: 1.02, letterSpacing: "-0.02em" }}>
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  maxWidth: 900,
                  fontFamily: "sans-serif",
                  fontSize: 28,
                  lineHeight: 1.35,
                  color: "#6a675f",
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "2px solid #1b1a18",
              paddingTop: 20,
              fontSize: 34,
            }}
          >
            <span>Devocionário</span>
            <span style={{ fontFamily: "monospace", fontSize: 20, color: "#6a675f" }}>
              devocionario.app
            </span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  )
}
