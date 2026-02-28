import { ImageResponse } from "next/og"

import { getBlogPostById } from "@/data/blog"

type BlogOgProps = {
  params: Promise<{ id: string }>
}

export const alt = "Prévia do artigo"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function BlogOpengraphImage({ params }: BlogOgProps) {
  const { id } = await params
  const post = getBlogPostById(Number(id))

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
          background: "linear-gradient(135deg, #1d140c 0%, #4d3120 100%)",
          color: "#f8f1e4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Devocionário • Blog
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            {post?.title ?? "Artigo do Devocionário"}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.3, color: "#e8d4bb" }}>
            {post?.summary ?? "Conteúdo editorial e reflexões sobre a vida da Igreja."}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
