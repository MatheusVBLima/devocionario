import { santos } from "@/data/santos"
import { renderOgImage, ogSize } from "@/lib/og"

type SantoOgProps = {
  params: Promise<{ id: string }>
}

export const alt = "Prévia do santo"
export const size = ogSize
export const contentType = "image/png"

export default async function SantoOpengraphImage({ params }: SantoOgProps) {
  const { id } = await params
  const santo = santos.find((item) => item.id === Number(id))

  return renderOgImage({
    eyebrow: "Devocionário • Santos",
    title: santo?.nome ?? "Calendário dos Santos",
    subtitle: "Biografia, oração e data de celebração.",
  })
}
