import { getRosarioMystery } from "@/data/rosario"
import { renderOgImage, ogSize } from "@/lib/og"

type RosarioOgProps = {
  params: Promise<{ id: string }>
}

export const alt = "Prévia do rosário"
export const size = ogSize
export const contentType = "image/png"

export default async function RosarioOpengraphImage({ params }: RosarioOgProps) {
  const { id } = await params
  const mystery = getRosarioMystery(id)

  return renderOgImage({
    eyebrow: "Devocionário • Santo Rosário",
    title: mystery?.nome ?? "Santo Rosário",
    subtitle: mystery?.descricao ?? "Reze os mistérios do rosário com um guia organizado.",
  })
}
