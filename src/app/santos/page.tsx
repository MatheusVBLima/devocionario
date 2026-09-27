import type { Metadata } from "next"
import { CollectionPagination } from "@/components/CollectionPagination"
import { CollectionSearchForm } from "@/components/filters/CollectionSearchForm"
import { JsonLd } from "@/components/JsonLd"
import { SantosCollection } from "@/components/santos/SantosCollection"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { santos } from "@/data/santos"
import { collectionMetadata, collectionPage, parseCollectionQuery, type CollectionSearchParams } from "@/lib/collection-query"
import { normalizeSearchText } from "@/lib/normalize-search"
import { buildCollectionPageSchema, buildMetadata } from "@/lib/seo"
import { buildSearchHref } from "@/lib/routes"

const pathname = "/santos"
const title = "Calendário dos santos"
const description = "Navegue pelo calendário dos santos, com datas de celebração, biografias resumidas e orações de devoção."
const months = [
  { value: "Todas", label: "Todos os meses" },
  { value: "01", label: "Janeiro" }, { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" }, { value: "04", label: "Abril" },
  { value: "05", label: "Maio" }, { value: "06", label: "Junho" },
  { value: "07", label: "Julho" }, { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" }, { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" }, { value: "12", label: "Dezembro" },
]

export async function generateMetadata({ searchParams }: { searchParams: CollectionSearchParams }): Promise<Metadata> {
  const query = await parseCollectionQuery(searchParams, "mes", months.map((month) => month.value))
  const filtered = filterSantos(query.q, query.selected)
  collectionPage(filtered, query.page)
  return collectionMetadata(buildMetadata({ title, description, pathname }), pathname, query)
}

function filterSantos(q: string, selected: string) {
  const search = normalizeSearchText(q)
  return santos.filter((santo) =>
    (selected === "Todas" || santo.mes === selected) &&
    (!search || normalizeSearchText(santo.nome).includes(search) || normalizeSearchText(santo.sobre).includes(search))
  ).sort((a, b) => Number(a.mes) - Number(b.mes) || Number(a.dia) - Number(b.dia))
}

export default async function SantosPage({ searchParams }: { searchParams: CollectionSearchParams }) {
  const query = await parseCollectionQuery(searchParams, "mes", months.map((month) => month.value))
  const { items, totalPages } = collectionPage(filterSantos(query.q, query.selected), query.page)
  const filters = { q: query.q, mes: query.selected === "Todas" ? "" : query.selected }
  const pagePath = buildSearchHref(pathname, { page: query.page })
  const pageSchema = !query.filtered && buildCollectionPageSchema({
    title, description, pathname: pagePath,
    items: items.map((santo) => ({ name: santo.nome, pathname: `/santos/${santo.id}` })),
  })

  return <>
    {pageSchema ? <JsonLd data={pageSchema} /> : null}
    <PageHeader kicker="Calendário litúrgico" title="Calendário dos Santos" description="Conheça os santos celebrados ao longo do ano com acesso rápido a biografias e orações." />
    <Container className="section-y flex flex-col gap-14">
      <CollectionSearchForm pathname={pathname} search={query.q} selected={query.selected} filterName="mes" options={months} placeholder="Pesquisar santos..." />
      <SantosCollection items={items} months={months} />
      <CollectionPagination currentPage={query.page} totalPages={totalPages} pathname={pathname} filters={filters} />
    </Container>
  </>
}
