import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BreadcrumbNav } from "@/components/BreadcrumbNav"
import { JsonLd } from "@/components/JsonLd"
import { OracaoContent } from "@/components/OracaoContent"
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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-16 md:px-6 lg:py-24">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={pageSchema} />
      <BreadcrumbNav items={breadcrumbItems} />

      <OracaoContent oracao={oracao} />

      <div className="flex justify-center">
        <Button asChild variant="secondary">
          <Link href="/oracoes">Ver todas as orações</Link>
        </Button>
      </div>
    </div>
  )
}
