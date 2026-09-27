import type { Metadata } from "next"
import { BlogCollection } from "@/components/blog/BlogCollection"
import { CollectionPagination } from "@/components/CollectionPagination"
import { CollectionSearchForm } from "@/components/filters/CollectionSearchForm"
import { JsonLd } from "@/components/JsonLd"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { getBlogPosts, isIndexablePost, type BlogPost } from "@/data/blog"
import { collectionMetadata, collectionPage, parseCollectionQuery, type CollectionSearchParams } from "@/lib/collection-query"
import { normalizeSearchText } from "@/lib/normalize-search"
import { buildCollectionPageSchema, buildMetadata } from "@/lib/seo"
import { buildSearchHref } from "@/lib/routes"

export const revalidate = 3600
const pathname = "/blog"
const title = "Blog católico"
const description = "Acompanhe notícias, formações e conteúdos sobre a vida da Igreja, espiritualidade e formação católica."

function filterPosts(posts: BlogPost[], q: string, selected: string) {
  const search = normalizeSearchText(q)
  return posts.filter((post) =>
    (selected === "Todas" || post.category === selected) &&
    (!search || normalizeSearchText(post.title).includes(search) ||
      normalizeSearchText(post.summary).includes(search) || normalizeSearchText(post.author).includes(search))
  )
}

async function load(searchParams: CollectionSearchParams) {
  const posts = await getBlogPosts()
  const categories = ["Todas", ...new Set(posts.map((post) => post.category))]
  const query = await parseCollectionQuery(searchParams, "categoria", categories)
  const { items, totalPages } = collectionPage(filterPosts(posts, query.q, query.selected), query.page)
  return { query, items, totalPages, categories }
}

export async function generateMetadata({ searchParams }: { searchParams: CollectionSearchParams }): Promise<Metadata> {
  const { query } = await load(searchParams)
  return collectionMetadata(buildMetadata({ title, description, pathname }), pathname, query)
}

export default async function BlogPage({ searchParams }: { searchParams: CollectionSearchParams }) {
  const { query, items, totalPages, categories } = await load(searchParams)
  const filters = { q: query.q, categoria: query.selected === "Todas" ? "" : query.selected }
  const pagePath = buildSearchHref(pathname, { page: query.page })
  const pageSchema = !query.filtered && buildCollectionPageSchema({
    title, description, pathname: pagePath,
    items: items.map((post) => ({
      name: post.title,
      pathname: isIndexablePost(post) ? `/blog/${post.id}` : post.externalUrl!,
    })),
  })

  return <>
    {pageSchema ? <JsonLd data={pageSchema} /> : null}
    <PageHeader kicker="Conteúdo editorial" title="Blog" description="Notícias, formações e reflexões sobre a vida da Igreja, espiritualidade e cultura católica." />
    <Container className="section-y flex flex-col gap-14">
      <CollectionSearchForm pathname={pathname} search={query.q} selected={query.selected} filterName="categoria" options={categories.map((value) => ({ value, label: value }))} placeholder="Pesquisar artigos..." />
      <BlogCollection items={items} />
      <CollectionPagination currentPage={query.page} totalPages={totalPages} pathname={pathname} filters={filters} />
    </Container>
  </>
}
