import { ImageResponse } from "next/og"

import { santos } from "@/data/santos"

type SantoOgProps = {
  params: Promise<{ id: string }>
}

export const alt = "Prévia do santo"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function SantoOpengraphImage({ params }: SantoOgProps) {
  const { id } = await params
  const santo = santos.find((item) => item.id === Number(id))

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
          background: "linear-gradient(135deg, #f6f1e7 0%, #d9c1a0 100%)",
          color: "#2f2418",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Devocionário • Santos
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
            {santo?.nome ?? "Calendário dos Santos"}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.3, color: "#5f4733" }}>
            Biografia, oração e data de celebração.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
