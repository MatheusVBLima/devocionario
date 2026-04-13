import type { MetadataRoute } from "next"

import { getBlogPosts } from "@/data/blog"
import { oracoes } from "@/data/oracoes"
import { rosarioMysteries } from "@/data/rosario"
import { santos } from "@/data/santos"
import { parseBrazilianDate } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { canonicalUrl } from "@/lib/routes"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts()
  const defaultLastModified = new Date(siteConfig.defaultPublishedAt)
  const staticRoutes = [
    { route: "/", changeFrequency: "weekly" as const, priority: 1 },
    { route: "/blog", changeFrequency: "monthly" as const, priority: 0.8 },
    { route: "/liturgia", changeFrequency: "monthly" as const, priority: 0.8 },
    { route: "/oracoes", changeFrequency: "monthly" as const, priority: 0.8 },
    { route: "/rosario", changeFrequency: "monthly" as const, priority: 0.8 },
    { route: "/rotina", changeFrequency: "monthly" as const, priority: 0.8 },
    { route: "/santos", changeFrequency: "monthly" as const, priority: 0.8 },
  ]

  return [
    ...staticRoutes.map(({ route, changeFrequency, priority }) => ({
      url: canonicalUrl(route),
      lastModified: defaultLastModified,
      changeFrequency,
      priority,
    })),
    ...blogPosts.map((post) => ({
      url: canonicalUrl(`/blog/${post.id}`),
      lastModified: new Date(parseBrazilianDate(post.date)),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...oracoes.map((oracao) => ({
      url: canonicalUrl(`/oracoes/${oracao.id}`),
      lastModified: defaultLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...rosarioMysteries.map((mystery) => ({
      url: canonicalUrl(`/rosario/${mystery.id}`),
      lastModified: defaultLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...santos.map((santo) => ({
      url: canonicalUrl(`/santos/${santo.id}`),
      lastModified: defaultLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
