import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BreadcrumbNav } from "@/components/BreadcrumbNav"
import { JsonLd } from "@/components/JsonLd"
import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
import { PrefetchLink } from "@/components/PrefetchLink"
import { SaintPortrait } from "@/components/santos/SaintPortrait"
import { Button } from "@/components/ui/button"
import { santos } from "@/data/santos"
import { formatDayMonth } from "@/lib/calendar"
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
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={profileSchema} />
      <BreadcrumbNav items={breadcrumbItems} />

      <Container className="section-y grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SaintPortrait
            src={santo.imagem}
            alt={santo.nome}
            className="mx-auto max-w-[460px]"
            sizes="(max-width: 1024px) 90vw, 460px"
          />
        </div>

        <article className="flex flex-col gap-10">
          <header className="flex flex-col gap-6">
            <Kicker>{formatDayMonth(santo.dia, santo.mes)}</Kicker>
            <h1 className="text-display text-[clamp(2.75rem,6vw,5rem)]">{santo.nome}</h1>
          </header>

          <section className="flex flex-col gap-3 border-t pt-6">
            <h2 className="font-mono text-xs tracking-[0.08em] text-liturgical-ink uppercase">Sobre</h2>
            <p className="text-lg leading-[1.8]">{santo.sobre}</p>
          </section>

          <section className="flex flex-col gap-3 border-t pt-6">
            <h2 className="font-mono text-xs tracking-[0.08em] text-liturgical-ink uppercase">Oração</h2>
            <blockquote className="font-serif text-[1.75rem] leading-snug italic">{santo.oracao}</blockquote>
          </section>

          <div className="flex flex-wrap gap-3 border-t pt-8">
            <Button asChild>
              <PrefetchLink href="/rotina">Ver rotina católica</PrefetchLink>
            </Button>
            <Button variant="outline" asChild>
              <PrefetchLink href="/santos">Ver todos os santos</PrefetchLink>
            </Button>
          </div>
        </article>
      </Container>
    </>
  )
}
