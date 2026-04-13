import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BreadcrumbNav } from "@/components/BreadcrumbNav"
import { JsonLd } from "@/components/JsonLd"
import { Badge } from "@/components/ui/badge"
import { getRosarioMystery, rosarioMysteries } from "@/data/rosario"
import { canonicalUrl } from "@/lib/routes"
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildWebPageSchema,
} from "@/lib/seo"

type RosarioDetailProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return rosarioMysteries.map((mystery) => ({
    id: mystery.id,
  }))
}

export async function generateMetadata({
  params,
}: RosarioDetailProps): Promise<Metadata> {
  const { id } = await params
  const mystery = getRosarioMystery(id)

  if (!mystery) {
    return buildMetadata({
      title: "Mistério não encontrado",
      description: "O conjunto de mistérios solicitado não foi encontrado.",
      pathname: `/rosario/${id}`,
    })
  }

  return buildMetadata({
    title: mystery.nome,
    description: mystery.descricao,
    pathname: `/rosario/${mystery.id}`,
    imagePath: `/rosario/${mystery.id}/opengraph-image`,
    keywords: [mystery.nome, "santo rosário", "mistérios do rosário"],
    section: "rosário",
  })
}

export default async function RosarioDetailPage({ params }: RosarioDetailProps) {
  const { id } = await params
  const mystery = getRosarioMystery(id)

  if (!mystery) notFound()

  const breadcrumbItems = [
    { label: "Santo Rosário", href: "/rosario" },
    { label: mystery.nome },
  ]

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Início", url: canonicalUrl("/") },
    { name: "Santo Rosário", url: canonicalUrl("/rosario") },
    { name: mystery.nome, url: canonicalUrl(`/rosario/${mystery.id}`) },
  ])
  const pageSchema = buildWebPageSchema({
    title: mystery.nome,
    description: mystery.descricao,
    pathname: `/rosario/${mystery.id}`,
    imagePath: `/rosario/${mystery.id}/opengraph-image`,
  })

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-16 md:px-6 lg:py-24">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={pageSchema} />
      <BreadcrumbNav items={breadcrumbItems} />

      <header className="space-y-4">
        <Badge variant="secondary" className="w-fit">
          {mystery.dias}
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {mystery.nome}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          {mystery.descricao}
        </p>
      </header>

      <section className="space-y-4 rounded-[2rem] border border-border/70 bg-card/70 p-6">
        <h2 className="text-2xl font-semibold">Como rezar o Rosário</h2>
        <ol className="list-decimal space-y-3 pl-5 leading-8 text-muted-foreground">
          <li>Comece com o sinal da cruz e o Credo.</li>
          <li>Reze um Pai-Nosso, três Ave-Marias e um Glória.</li>
          <li>Anuncie cada mistério antes de iniciar a dezena correspondente.</li>
          <li>Em cada mistério, reze um Pai-Nosso, dez Ave-Marias e um Glória.</li>
          <li>Finalize com a Salve Rainha e suas intenções pessoais.</li>
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Os cinco mistérios</h2>
        <div className="space-y-6">
          {mystery.misteriosDetalhados.map((detail, index) => (
            <article
              key={detail.titulo}
              className="space-y-4 rounded-[2rem] border border-border/70 bg-card/70 p-6"
            >
              <h3 className="text-xl font-semibold">
                {index + 1}. {detail.titulo}
              </h3>
              <p className="leading-8 text-muted-foreground">{detail.descricao}</p>
              <div className="space-y-2">
                <h4 className="font-semibold">Reflexão</h4>
                <p className="leading-8 text-muted-foreground">{detail.reflexao}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Oração</h4>
                <p className="leading-8 text-muted-foreground">{detail.oracao}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
