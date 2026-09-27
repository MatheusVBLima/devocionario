import type { Metadata } from "next"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"

import { BreadcrumbNav } from "@/components/BreadcrumbNav"
import { JsonLd } from "@/components/JsonLd"
import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
import { PrefetchLink } from "@/components/PrefetchLink"
import { Button } from "@/components/ui/button"
import { getBlogPostById, getBlogPosts, isIndexablePost } from "@/data/blog"
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildMetadata,
  buildWebPageSchema,
} from "@/lib/seo"
import { canonicalUrl } from "@/lib/routes"
import { sanitizeArticleHtml } from "@/lib/sanitize-article-html"

export const revalidate = 3600

type BlogDetailProps = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts()

  return blogPosts.filter(isIndexablePost).map((post) => ({
    id: post.id,
  }))
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { id } = await params
  const post = await getBlogPostById(id)

  if (!post) notFound()
  if (!isIndexablePost(post)) return { robots: { index: false, follow: false } }

  return buildMetadata({
    title: post.title,
    description: post.summary,
    pathname: `/blog/${post.id}`,
    imagePath: `/blog/${post.id}/opengraph-image`,
    type: post.externalUrl ? "website" : "article",
    keywords: post.tags,
    section: post.category,
    publishedTime: post.externalUrl ? undefined : post.publishedAt,
    modifiedTime: post.externalUrl ? undefined : post.updatedAt ?? post.publishedAt,
  })
}

export default async function BlogPostPage({ params }: BlogDetailProps) {
  const { id } = await params
  const post = await getBlogPostById(id)

  if (!post) notFound()
  if (!isIndexablePost(post) && post.externalUrl) redirect(post.externalUrl)
  if (!isIndexablePost(post)) notFound()

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ]

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Início", url: canonicalUrl("/") },
    { name: "Blog", url: canonicalUrl("/blog") },
    { name: post.title, url: canonicalUrl(`/blog/${post.id}`) },
  ])

  const pageSchema = post.externalUrl ? buildWebPageSchema({
    title: post.title,
    description: post.summary,
    pathname: `/blog/${post.id}`,
    imagePath: `/blog/${post.id}/opengraph-image`,
  }) : buildArticleSchema({
    title: post.title,
    description: post.summary,
    pathname: `/blog/${post.id}`,
    imagePath: `/blog/${post.id}/opengraph-image`,
    author: post.author,
    tags: post.tags,
    section: post.category,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
  })

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={pageSchema} />
      <BreadcrumbNav items={breadcrumbItems} />

      <article>
        <Container className="section-y flex max-w-[900px] flex-col gap-12">
          <header className="flex flex-col gap-7">
            <Kicker>
              {post.category}{post.date ? <> <span aria-hidden>·</span> {post.date}</> : null}
              {post.readingTime ? (
                <>
                  {" "}
                  <span aria-hidden>·</span> {post.readingTime}
                </>
              ) : null}
            </Kicker>
            <h1 className="text-display text-[clamp(2.5rem,6vw,5rem)]">{post.title}</h1>
            {!post.externalUrl ? (
              <p className="text-xl leading-relaxed text-pretty text-muted-foreground">{post.summary}</p>
            ) : null}
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

          {post.externalUrl ? (
            <div className="prose prose-lg max-w-none whitespace-pre-line">
              <p>{post.summary}</p>
              <p>Leia o texto completo na fonte original.</p>
            </div>
          ) : post.contentHtml ? (
            <div
              className="prose prose-lg max-w-none prose-headings:scroll-mt-28"
              dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(post.contentHtml) }}
            />
          ) : (
            <p className="prose prose-lg max-w-none">{post.summary}</p>
          )}

          {post.tags.length > 0 ? <section className="flex flex-col gap-4 border-t pt-8">
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
          </section> : null}

          <section className="flex flex-col gap-4 rounded-md bg-card p-7">
            <h2 className="font-serif text-3xl leading-tight">Compartilhar</h2>
            <p className="text-sm text-muted-foreground">
              Copie o link desta página ou compartilhe nas redes de sua preferência.
            </p>
            <div className="flex flex-wrap gap-3">
              {post.externalUrl ? (
                <Button asChild>
                  <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
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
