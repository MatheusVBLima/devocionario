import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BreadcrumbNav } from "@/components/BreadcrumbNav"
import { JsonLd } from "@/components/JsonLd"
import { Container } from "@/components/layout/Container"
import { OracaoContent } from "@/components/OracaoContent"
import { PrefetchLink } from "@/components/PrefetchLink"
import { Button } from "@/components/ui/button"
import { oracoes } from "@/data/oracoes"
import { canonicalUrl } from "@/lib/routes"
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildWebPageSchema,
  normalizeDescription,
} from "@/lib/seo"

type OracaoPageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return oracoes.map((oracao) => ({
    id: String(oracao.id),
  }))
}

export async function generateMetadata({
  params,
}: OracaoPageProps): Promise<Metadata> {
  const { id } = await params
  const oracao = oracoes.find((item) => item.id === Number(id))

  if (!oracao) {
    return buildMetadata({
      title: "Oração não encontrada",
      description: "A oração solicitada não foi encontrada.",
      pathname: `/oracoes/${id}`,
    })
  }

  return buildMetadata({
    title: oracao.title,
    description: normalizeDescription(oracao.content),
    pathname: `/oracoes/${oracao.id}`,
    imagePath: `/oracoes/${oracao.id}/opengraph-image`,
    keywords: [oracao.category, oracao.title, "oração católica"],
    section: "orações",
  })
}

export default async function OracaoPage({ params }: OracaoPageProps) {
  const { id } = await params
  const oracao = oracoes.find((item) => item.id === Number(id))

  if (!oracao) notFound()

  const breadcrumbItems = [
    { label: "Orações", href: "/oracoes" },
    { label: oracao.title, href: `/oracoes/${oracao.id}` },
  ]

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Início", url: canonicalUrl("/") },
    { name: "Orações", url: canonicalUrl("/oracoes") },
    { name: oracao.title, url: canonicalUrl(`/oracoes/${oracao.id}`) },
  ])
  const pageSchema = buildWebPageSchema({
    title: oracao.title,
    description: normalizeDescription(oracao.content),
    pathname: `/oracoes/${oracao.id}`,
    imagePath: `/oracoes/${oracao.id}/opengraph-image`,
  })

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={pageSchema} />
      <BreadcrumbNav items={breadcrumbItems} />

      <Container className="section-y flex max-w-[900px] flex-col gap-12">
        <OracaoContent oracao={oracao} />

        <div>
          <Button asChild variant="secondary">
            <PrefetchLink href="/oracoes">Ver todas as orações</PrefetchLink>
          </Button>
        </div>
      </Container>
    </>
  )
}
