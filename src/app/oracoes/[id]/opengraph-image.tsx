import { oracoes } from "@/data/oracoes"
import { renderOgImage, ogSize } from "@/lib/og"

type OracaoOgProps = {
  params: Promise<{ id: string }>
}

export const alt = "Prévia da oração"
export const size = ogSize
export const contentType = "image/png"

export default async function OracaoOpengraphImage({ params }: OracaoOgProps) {
  const { id } = await params
  const oracao = oracoes.find((item) => item.id === Number(id))

  return renderOgImage({
    eyebrow: "Devocionário • Orações",
    title: oracao?.title ?? "Oração",
    subtitle: oracao?.category ?? "Conteúdo católico para a vida espiritual.",
  })
}
