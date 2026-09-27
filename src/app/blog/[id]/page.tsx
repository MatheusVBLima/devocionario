import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { BreadcrumbNav } from "@/components/BreadcrumbNav"
import { JsonLd } from "@/components/JsonLd"
import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
import { PrefetchLink } from "@/components/PrefetchLink"
import { Button } from "@/components/ui/button"
import { getBlogPostById, getBlogPostContent, getBlogPosts } from "@/data/blog"
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildMetadata,
  parseBrazilianDate,
} from "@/lib/seo"
import { canonicalUrl } from "@/lib/routes"

export const revalidate = 3600

type BlogDetailProps = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts()

  return blogPosts.map((post) => ({
    id: post.id,
  }))
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { id } = await params
  const post = await getBlogPostById(id)

  if (!post) {
    return buildMetadata({
      title: "Artigo não encontrado",
      description: "O artigo solicitado não foi encontrado.",
      pathname: `/blog/${id}`,
      type: "article",
      section: "blog",
    })
  }

  const publishedTime = parseBrazilianDate(post.date)

  return buildMetadata({
    title: post.title,
    description: post.summary,
    pathname: `/blog/${post.id}`,
    imagePath: `/blog/${post.id}/opengraph-image`,
    type: "article",
    keywords: post.tags,
    section: post.category,
    publishedTime,
    modifiedTime: publishedTime,
  })
}

export default async function BlogPostPage({ params }: BlogDetailProps) {
  const { id } = await params
  const post = await getBlogPostById(id)

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

  const publishedTime = parseBrazilianDate(post.date)
  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.summary,
    pathname: `/blog/${post.id}`,
    imagePath: `/blog/${post.id}/opengraph-image`,
    author: post.author,
    tags: post.tags,
    section: post.category,
    publishedTime,
    modifiedTime: publishedTime,
  })
  const contentHtml = await getBlogPostContent(post)

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <BreadcrumbNav items={breadcrumbItems} />

      <article>
        <Container className="section-y flex max-w-[900px] flex-col gap-12">
          <header className="flex flex-col gap-7">
            <Kicker>
              {post.category} <span aria-hidden>·</span> {post.date}
              {post.readingTime ? (
                <>
                  {" "}
                  <span aria-hidden>·</span> {post.readingTime}
                </>
              ) : null}
            </Kicker>
            <h1 className="text-display text-[clamp(2.5rem,6vw,5rem)]">{post.title}</h1>
            <p className="text-xl leading-relaxed text-pretty text-muted-foreground">{post.summary}</p>
            <p className="text-sm text-muted-foreground">
              Por <span className="font-medium text-foreground">{post.author}</span>
            </p>
          </header>

          {post.image ? (
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-md border bg-card">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 820px"
              />
            </div>
          ) : null}

          <div
            className="prose prose-lg max-w-none prose-headings:scroll-mt-28"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <section className="flex flex-col gap-4 border-t pt-8">
            <h2 className="font-mono text-xs tracking-[0.08em] text-liturgical-ink uppercase">Tags</h2>
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-4 rounded-md bg-card p-7">
            <h2 className="font-serif text-3xl leading-tight">Compartilhar</h2>
            <p className="text-sm text-muted-foreground">
              Copie o link desta página ou compartilhe nas redes de sua preferência.
            </p>
            <div className="flex flex-wrap gap-3">
              {post.externalUrl ? (
                <Button asChild>
                  <a href={post.externalUrl} target="_blank" rel="noreferrer">
                    Ler artigo original
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="outline">
                <PrefetchLink href="/blog">Voltar para o blog</PrefetchLink>
              </Button>
            </div>
          </section>
        </Container>
      </article>
    </>
  )
}
