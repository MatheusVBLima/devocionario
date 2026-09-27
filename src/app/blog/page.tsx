import type { Metadata } from "next"
import { Suspense } from "react"

import { BlogCollection } from "@/components/blog/BlogCollection"
import { CollectionFallback } from "@/components/CollectionFallback"
import { JsonLd } from "@/components/JsonLd"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { getBlogPosts } from "@/data/blog"
import { buildCollectionPageSchema, buildMetadata } from "@/lib/seo"

export const revalidate = 3600

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
    <>
      <JsonLd data={pageSchema} />

      <PageHeader
        kicker="Conteúdo editorial"
        title="Blog"
        description="Notícias, formações e reflexões sobre a vida da Igreja, espiritualidade e cultura católica."
      />

      <Container className="section-y flex flex-col gap-14">
        <Suspense fallback={<CollectionFallback />}>
          <BlogCollection posts={blogPosts} />
        </Suspense>
      </Container>
    </>
  )
}
