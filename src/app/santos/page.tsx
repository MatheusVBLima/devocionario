import type { Metadata } from "next"
import { Suspense } from "react"

import { CollectionFallback } from "@/components/CollectionFallback"
import { JsonLd } from "@/components/JsonLd"
import { SantosCollection } from "@/components/santos/SantosCollection"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { santos } from "@/data/santos"
import { buildCollectionPageSchema, buildMetadata } from "@/lib/seo"

const months = [
  { value: "Todos", label: "Todos os meses" },
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
] as const

export const metadata: Metadata = buildMetadata({
  title: "Calendário dos santos",
  description:
    "Navegue pelo calendário dos santos, com datas de celebração, biografias resumidas e orações de devoção.",
  pathname: "/santos",
})

export default function SantosPage() {
  const pageSchema = buildCollectionPageSchema({
    title: "Calendário dos santos",
    description:
      "Navegue pelo calendário dos santos, com datas de celebração, biografias resumidas e orações de devoção.",
    pathname: "/santos",
    items: santos.map((santo) => ({
      name: santo.nome,
      pathname: `/santos/${santo.id}`,
    })),
  })

  return (
    <>
      <JsonLd data={pageSchema} />

      <PageHeader
        kicker="Calendário litúrgico"
        title="Calendário dos Santos"
        description="Conheça os santos celebrados ao longo do ano com acesso rápido a biografias e orações."
      />

      <Container className="section-y flex flex-col gap-14">
        <Suspense fallback={<CollectionFallback />}>
          <SantosCollection santos={santos} months={[...months]} />
        </Suspense>
      </Container>
    </>
  )
}
