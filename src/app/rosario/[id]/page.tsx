import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BreadcrumbNav } from "@/components/BreadcrumbNav"
import { JsonLd } from "@/components/JsonLd"
import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
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
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={pageSchema} />
      <BreadcrumbNav items={breadcrumbItems} />

      <header className="border-b">
        <Container className="grid items-end gap-8 pt-[clamp(2rem,5vw,4rem)] pb-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16">
          <div>
            <Kicker>{mystery.dias}</Kicker>
            <h1 className="text-display mt-7 text-[clamp(3rem,7.5vw,6.5rem)]">{mystery.nome}</h1>
          </div>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground lg:pb-3">
            {mystery.descricao}
          </p>
        </Container>
      </header>

      <Container className="section-y grid gap-14 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <section className="flex flex-col gap-5 rounded-md bg-card p-7">
            <h2 className="font-serif text-3xl leading-tight">Como rezar o Rosário</h2>
            <ol className="flex flex-col gap-3 text-[15px] leading-relaxed text-muted-foreground">
              {[
                "Comece com o sinal da cruz e o Credo.",
                "Reze um Pai-Nosso, três Ave-Marias e um Glória.",
                "Anuncie cada mistério antes de iniciar a dezena correspondente.",
                "Em cada mistério, reze um Pai-Nosso, dez Ave-Marias e um Glória.",
                "Finalize com a Salve Rainha e suas intenções pessoais.",
              ].map((step, index) => (
                <li key={step} className="grid grid-cols-[1.75rem_1fr] gap-2">
                  <span className="font-mono text-[13px] text-liturgical-ink">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </aside>

        <section className="flex flex-col">
          <h2 className="mb-8 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
            Os cinco mistérios
          </h2>
          <ol className="flex flex-col border-b">
            {mystery.misteriosDetalhados.map((detail, index) => (
              <li key={detail.titulo} className="grid gap-6 border-t py-10 sm:grid-cols-[5rem_1fr]">
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[13px] text-liturgical-ink">{index + 1}º</span>
                  <span aria-hidden className="flex flex-wrap gap-1 sm:max-w-[3.25rem]">
                    {Array.from({ length: 10 }, (_, bead) => (
                      <span key={bead} className="size-[5px] rounded-full bg-liturgical" />
                    ))}
                  </span>
                </div>
                <article className="flex flex-col gap-5">
                  <h3 className="font-serif text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.05]">
                    {detail.titulo}
                  </h3>
                  <p className="text-lg leading-relaxed">{detail.descricao}</p>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
                      Reflexão
                    </h4>
                    <p className="leading-relaxed text-muted-foreground">{detail.reflexao}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
                      Oração
                    </h4>
                    <p className="font-serif text-2xl leading-snug italic">{detail.oracao}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </>
  )
}
