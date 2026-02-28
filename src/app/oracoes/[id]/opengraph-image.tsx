import { ImageResponse } from "next/og"

import { oracoes } from "@/data/oracoes"

type OracaoOgProps = {
  params: Promise<{ id: string }>
}

export const alt = "Prévia da oração"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OracaoOpengraphImage({ params }: OracaoOgProps) {
  const { id } = await params
  const oracao = oracoes.find((item) => item.id === Number(id))

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
          background: "linear-gradient(135deg, #efe1c6 0%, #f6f1e7 100%)",
          color: "#352418",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Devocionário • Orações
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            {oracao?.title ?? "Oração"}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.3, color: "#5f4733" }}>
            {oracao?.category ?? "Conteúdo católico para a vida espiritual."}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
