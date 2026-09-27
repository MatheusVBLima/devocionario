import { getBlogPostById } from "@/data/blog"
import { renderOgImage, ogSize } from "@/lib/og"

type BlogOgProps = {
  params: Promise<{ id: string }>
}

export const alt = "Prévia do artigo"
export const size = ogSize
export const contentType = "image/png"

export default async function BlogOpengraphImage({ params }: BlogOgProps) {
  const { id } = await params
  const post = await getBlogPostById(id)

  return renderOgImage({
    eyebrow: "Devocionário • Blog",
    title: post?.title ?? "Artigo do Devocionário",
    subtitle: post?.summary ?? "Conteúdo editorial e reflexões sobre a vida da Igreja.",
  })
}
