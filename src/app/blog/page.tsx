import type { Metadata } from "next"
import { Suspense } from "react"

import { BlogCollection } from "@/components/blog/BlogCollection"
import { CollectionFallback } from "@/components/CollectionFallback"
import { JsonLd } from "@/components/JsonLd"
import { Badge } from "@/components/ui/badge"
import { getBlogPosts } from "@/data/blog"
import { buildCollectionPageSchema, buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Blog católico",
  description:
    "Acompanhe notícias, formações e conteúdos sobre a vida da Igreja, espiritualidade e formação católica.",
  pathname: "/blog",
})

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  const pageSchema = buildCollectionPageSchema({
    title: "Blog católico",
    description:
      "Acompanhe notícias, formações e conteúdos sobre a vida da Igreja, espiritualidade e formação católica.",
    pathname: "/blog",
    items: blogPosts.map((post) => ({
      name: post.title,
      pathname: `/blog/${post.id}`,
    })),
  })

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-20 md:px-6 lg:px-10 lg:py-32">
      <JsonLd data={pageSchema} />

      <header className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge
          variant="secondary"
          className="rounded-full px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm"
        >
          Conteúdo editorial
        </Badge>
        <h1 className="max-w-3xl text-balance font-serif text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
          Blog
        </h1>
        <div className="my-2 h-px w-12 bg-border/50" />
        <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
          Notícias, formações e reflexões sobre a vida da Igreja, espiritualidade e cultura católica.
        </p>
      </header>

      <Suspense fallback={<CollectionFallback />}>
        <BlogCollection posts={blogPosts} />
      </Suspense>
    </div>
  )
}
