import type { Metadata } from "next"
import { Suspense } from "react"

import { CollectionFallback } from "@/components/CollectionFallback"
import { JsonLd } from "@/components/JsonLd"
import { OracoesCollection } from "@/components/oracoes/OracoesCollection"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { oracoes } from "@/data/oracoes"
import { buildCollectionPageSchema, buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Orações católicas",
  description:
    "Consulte orações católicas por categoria, com leitura organizada e acesso rápido para diferentes momentos da vida espiritual.",
  pathname: "/oracoes",
})

export default function OracoesPage() {
  const pageSchema = buildCollectionPageSchema({
    title: "Orações católicas",
    description:
      "Consulte orações católicas por categoria, com leitura organizada e acesso rápido para diferentes momentos da vida espiritual.",
    pathname: "/oracoes",
    items: oracoes.map((oracao) => ({
      name: oracao.title,
      pathname: `/oracoes/${oracao.id}`,
    })),
  })

  return (
    <>
      <JsonLd data={pageSchema} />

      <PageHeader
        kicker="Vida de oração"
        title="Orações"
        description="Uma coleção de orações católicas organizadas por tema, para leitura simples e acesso rápido."
      />

      <Container className="section-y flex flex-col gap-14">
        <Suspense fallback={<CollectionFallback />}>
          <OracoesCollection oracoes={oracoes} />
        </Suspense>
      </Container>
    </>
  )
}
