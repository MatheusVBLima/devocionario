import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/site"

export const alt = siteConfig.name
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(135deg, #f6f1e7 0%, #efe1c6 45%, #d8b88a 100%)",
          color: "#2f2418",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 6,
              height: 80,
              borderRadius: 999,
              background: "#8c5b2f",
            }}
          />
          Devocionário
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              maxWidth: 880,
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Orações, liturgia diária e conteúdo católico com leitura clara e rápida.
          </div>
          <div
            style={{
              maxWidth: 760,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#5c4632",
            }}
          >
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
