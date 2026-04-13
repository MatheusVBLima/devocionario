import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BreadcrumbNav } from "@/components/BreadcrumbNav"
import { JsonLd } from "@/components/JsonLd"
import { SantoImage } from "@/components/SantoImage"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { santos } from "@/data/santos"
import { canonicalUrl } from "@/lib/routes"
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildProfilePageSchema,
  normalizeDescription,
} from "@/lib/seo"

type SantoPageProps = {
  params: Promise<{ id: string }>
}

const monthNames = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
]

function formatDate(dia: string, mes: string) {
  return `${Number(dia)} de ${monthNames[Number(mes) - 1]}`
}

export function generateStaticParams() {
  return santos.map((santo) => ({
    id: String(santo.id),
  }))
}

export async function generateMetadata({
  params,
}: SantoPageProps): Promise<Metadata> {
  const { id } = await params
  const santo = santos.find((item) => item.id === Number(id))

  if (!santo) {
    return buildMetadata({
      title: "Santo não encontrado",
      description: "O santo solicitado não foi encontrado.",
      pathname: `/santos/${id}`,
    })
  }

  return buildMetadata({
    title: santo.nome,
    description: normalizeDescription(santo.sobre),
    pathname: `/santos/${santo.id}`,
    imagePath: `/santos/${santo.id}/opengraph-image`,
    keywords: [santo.nome, "santos", "calendário dos santos", "oração"],
    section: "santos",
  })
}

export default async function SantoPage({ params }: SantoPageProps) {
  const { id } = await params
  const santo = santos.find((item) => item.id === Number(id))

  if (!santo) notFound()

  const breadcrumbItems = [
    { label: "Calendário de Santos", href: "/santos" },
    { label: santo.nome, href: `/santos/${santo.id}` },
  ]

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Início", url: canonicalUrl("/") },
    { name: "Santos", url: canonicalUrl("/santos") },
    { name: santo.nome, url: canonicalUrl(`/santos/${santo.id}`) },
  ])
  const profileSchema = buildProfilePageSchema({
    title: santo.nome,
    description: santo.sobre,
    pathname: `/santos/${santo.id}`,
    imagePath: `/santos/${santo.id}/opengraph-image`,
  })

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16 md:px-6 lg:py-24">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={profileSchema} />
      <BreadcrumbNav items={breadcrumbItems} />

      <div className="grid gap-8 lg:grid-cols-[1.05fr_1.4fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/70 bg-muted">
          {santo.imagem ? (
            <SantoImage
              src={santo.imagem}
              alt={santo.nome}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          ) : (
            <Image
              src="/placeholder.svg"
              alt={santo.nome}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <Badge variant="outline" className="w-fit">
            {formatDate(santo.dia, santo.mes)}
          </Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {santo.nome}
          </h1>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Sobre</h2>
            <p className="text-base leading-8 text-muted-foreground">{santo.sobre}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Oração</h2>
            <blockquote className="rounded-3xl border-l-4 border-primary bg-muted/50 px-5 py-4 text-base italic leading-8 text-muted-foreground">
              {santo.oracao}
            </blockquote>
          </section>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/rotina">Ver rotina católica</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/santos">Ver todos os santos</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
