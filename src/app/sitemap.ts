import type { MetadataRoute } from "next"

import { blogPosts } from "@/data/blog"
import { oracoes } from "@/data/oracoes"
import { rosarioMysteries } from "@/data/rosario"
import { santos } from "@/data/santos"
import { canonicalUrl } from "@/lib/routes"

export default function sitemap(): MetadataRoute.Sitemap {
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
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...blogPosts.map((post) => ({
      url: canonicalUrl(`/blog/${post.id}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...oracoes.map((oracao) => ({
      url: canonicalUrl(`/oracoes/${oracao.id}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...rosarioMysteries.map((mystery) => ({
      url: canonicalUrl(`/rosario/${mystery.id}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...santos.map((santo) => ({
      url: canonicalUrl(`/santos/${santo.id}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
