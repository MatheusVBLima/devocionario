import { ImageResponse } from "next/og"

import { getRosarioMystery } from "@/data/rosario"

type RosarioOgProps = {
  params: Promise<{ id: string }>
}

export const alt = "Prévia do rosário"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function RosarioOpengraphImage({ params }: RosarioOgProps) {
  const { id } = await params
  const mystery = getRosarioMystery(id)

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
          background: "linear-gradient(135deg, #2d1e14 0%, #6d4a2c 100%)",
          color: "#f8f1e4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Devocionário • Santo Rosário
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            {mystery?.nome ?? "Santo Rosário"}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.3, color: "#e8d4bb" }}>
            {mystery?.descricao ?? "Reze os mistérios do rosário com um guia organizado."}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
