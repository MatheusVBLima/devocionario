import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BreadcrumbNav } from "@/components/BreadcrumbNav"
import { JsonLd } from "@/components/JsonLd"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { blogPosts, getBlogPostById, getBlogPostContent } from "@/data/blog"
import { buildBreadcrumbSchema, buildMetadata } from "@/lib/seo"
import { canonicalUrl } from "@/lib/routes"

type BlogDetailProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: String(post.id),
  }))
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { id } = await params
  const post = getBlogPostById(Number(id))

  if (!post) {
    return buildMetadata({
      title: "Artigo não encontrado",
      description: "O artigo solicitado não foi encontrado.",
      pathname: `/blog/${id}`,
      type: "article",
    })
  }

  return buildMetadata({
    title: post.title,
    description: post.summary,
    pathname: `/blog/${post.id}`,
    imagePath: `/blog/${post.id}/opengraph-image`,
    type: "article",
  })
}

export default async function BlogPostPage({ params }: BlogDetailProps) {
  const { id } = await params
  const post = getBlogPostById(Number(id))

  if (!post) notFound()

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ]

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Início", url: canonicalUrl("/") },
    { name: "Blog", url: canonicalUrl("/blog") },
    { name: post.title, url: canonicalUrl(`/blog/${post.id}`) },
  ])

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Devocionário",
      url: canonicalUrl("/"),
    },
    mainEntityOfPage: canonicalUrl(`/blog/${post.id}`),
  }

  return (
    <article className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-16 md:px-6 lg:py-24">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />

      <BreadcrumbNav items={breadcrumbItems} />

      <header className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{post.category}</Badge>
          <Badge variant="secondary">{post.date}</Badge>
        </div>
        <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="max-w-3xl text-pretty text-lg leading-8 text-muted-foreground">
          {post.summary}
        </p>
        <p className="text-sm text-muted-foreground">
          Por <span className="font-medium text-foreground">{post.author}</span>
        </p>
      </header>

      <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl border border-border/70 bg-muted">
        <Image
          src={post.image ?? "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>

      <div
        className="prose prose-stone max-w-none leading-8 dark:prose-invert prose-headings:scroll-mt-24"
        dangerouslySetInnerHTML={{ __html: getBlogPostContent(post) }}
      />

      <Separator />

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <Card>
        <CardContent className="flex flex-col gap-4 py-6">
          <h2 className="text-lg font-semibold">Compartilhar</h2>
          <p className="text-sm text-muted-foreground">
            Copie o link desta página ou compartilhe nas redes de sua preferência.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/blog">Voltar para o blog</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  )
}
