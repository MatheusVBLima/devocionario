import { notFound } from "next/navigation"
import { getBlogPostById, isIndexablePost } from "@/data/blog"
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
  if (!post || !isIndexablePost(post)) notFound()

  return renderOgImage({
    eyebrow: "Devocionário • Blog",
    title: post.title,
    subtitle: post.summary,
  })
}
