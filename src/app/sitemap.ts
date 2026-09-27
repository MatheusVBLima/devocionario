import type { MetadataRoute } from "next"
import { getBlogPosts, isIndexablePost } from "@/data/blog"
import { oracoes } from "@/data/oracoes"
import { rosarioMysteries } from "@/data/rosario"
import { santos } from "@/data/santos"
import { canonicalUrl } from "@/lib/routes"

export const revalidate = 3600

function collectionUrls(pathname: string, count: number) {
  return Array.from({ length: Math.ceil(count / 9) }, (_, index) => ({
    url: canonicalUrl(index ? `${pathname}?page=${index + 1}` : pathname),
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()
  return [
    ...["/", "/liturgia", "/rosario", "/rotina"].map((route) => ({ url: canonicalUrl(route) })),
    ...collectionUrls("/blog", posts.length),
    ...collectionUrls("/oracoes", oracoes.length),
    ...collectionUrls("/santos", santos.length),
    ...posts.filter(isIndexablePost).map((post) => ({
      url: canonicalUrl(`/blog/${post.id}`),
      ...(post.updatedAt || post.publishedAt ? { lastModified: post.updatedAt ?? post.publishedAt } : {}),
    })),
    ...oracoes.map((oracao) => ({ url: canonicalUrl(`/oracoes/${oracao.id}`) })),
    ...rosarioMysteries.map((mystery) => ({ url: canonicalUrl(`/rosario/${mystery.id}`) })),
    ...santos.map((santo) => ({ url: canonicalUrl(`/santos/${santo.id}`) })),
  ]
}
