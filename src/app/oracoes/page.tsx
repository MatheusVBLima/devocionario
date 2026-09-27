import type { Metadata } from "next"
import { CollectionPagination } from "@/components/CollectionPagination"
import { CollectionSearchForm } from "@/components/filters/CollectionSearchForm"
import { JsonLd } from "@/components/JsonLd"
import { OracoesCollection } from "@/components/oracoes/OracoesCollection"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { oracoes } from "@/data/oracoes"
import { collectionMetadata, collectionPage, parseCollectionQuery, type CollectionSearchParams } from "@/lib/collection-query"
import { normalizeSearchText } from "@/lib/normalize-search"
import { buildCollectionPageSchema, buildMetadata } from "@/lib/seo"
import { buildSearchHref } from "@/lib/routes"

const pathname = "/oracoes"
const title = "Orações católicas"
const description = "Consulte orações católicas por categoria, com leitura organizada e acesso rápido para diferentes momentos da vida espiritual."
const categories = ["Todas", ...new Set(oracoes.map((oracao) => oracao.category))]
const options = categories.map((value) => ({ value, label: value }))

function filterOracoes(q: string, selected: string) {
  const search = normalizeSearchText(q)
  return oracoes.filter((oracao) =>
    (selected === "Todas" || oracao.category === selected) &&
    (!search || normalizeSearchText(oracao.title).includes(search) || normalizeSearchText(oracao.content).includes(search))
  ).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "pt-BR"))
}

export async function generateMetadata({ searchParams }: { searchParams: CollectionSearchParams }): Promise<Metadata> {
  const query = await parseCollectionQuery(searchParams, "categoria", categories)
  collectionPage(filterOracoes(query.q, query.selected), query.page)
  return collectionMetadata(buildMetadata({ title, description, pathname }), pathname, query)
}

export default async function OracoesPage({ searchParams }: { searchParams: CollectionSearchParams }) {
  const query = await parseCollectionQuery(searchParams, "categoria", categories)
  const { items, totalPages } = collectionPage(filterOracoes(query.q, query.selected), query.page)
  const filters = { q: query.q, categoria: query.selected === "Todas" ? "" : query.selected }
  const pagePath = buildSearchHref(pathname, { page: query.page })
  const pageSchema = !query.filtered && buildCollectionPageSchema({
    title, description, pathname: pagePath,
    items: items.map((oracao) => ({ name: oracao.title, pathname: `/oracoes/${oracao.id}` })),
  })

  return <>
    {pageSchema ? <JsonLd data={pageSchema} /> : null}
    <PageHeader kicker="Vida de oração" title="Orações" description="Uma coleção de orações católicas organizadas por tema, para leitura simples e acesso rápido." />
    <Container className="section-y flex flex-col gap-14">
      <CollectionSearchForm pathname={pathname} search={query.q} selected={query.selected} filterName="categoria" options={options} placeholder="Pesquisar orações..." />
      <OracoesCollection items={items} />
      <CollectionPagination currentPage={query.page} totalPages={totalPages} pathname={pathname} filters={filters} />
    </Container>
  </>
}
