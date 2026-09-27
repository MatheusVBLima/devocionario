import type { Metadata } from "next"

import { JsonLd } from "@/components/JsonLd"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { PrefetchLink } from "@/components/PrefetchLink"
import { Button } from "@/components/ui/button"
import { rosarioMysteries } from "@/data/rosario"
import { buildCollectionPageSchema, buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Santo Rosário",
  description:
    "Reze o Santo Rosário com acesso aos mistérios gloriosos, dolorosos, gozosos e luminosos.",
  pathname: "/rosario",
})

export default function RosarioPage() {
  const pageSchema = buildCollectionPageSchema({
    title: "Santo Rosário",
    description:
      "Reze o Santo Rosário com acesso aos mistérios gloriosos, dolorosos, gozosos e luminosos.",
    pathname: "/rosario",
    items: rosarioMysteries.map((misterio) => ({
      name: misterio.nome,
      pathname: `/rosario/${misterio.id}`,
    })),
  })

  return (
    <>
      <JsonLd data={pageSchema} />

      <PageHeader
        kicker="Devoção mariana"
        title="Santo Rosário"
        description="Escolha um conjunto de mistérios para rezar o rosário com guia, reflexões e orações."
      />

      <Container className="section-y">
        <ul className="flex flex-col border-b">
          {rosarioMysteries.map((misterio) => (
            <li
              key={misterio.id}
              className="grid gap-8 border-t py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20"
            >
              <div className="flex flex-col items-start gap-5">
                <span className="font-mono text-xs tracking-[0.08em] text-liturgical-ink uppercase">
                  {misterio.dias}
                </span>
                <h2 className="text-display text-[clamp(2.5rem,5vw,4.25rem)] leading-none">
                  {misterio.nome}
                </h2>
                <p className="max-w-md leading-relaxed text-muted-foreground">{misterio.descricao}</p>
                <Button asChild className="mt-2">
                  <PrefetchLink href={`/rosario/${misterio.id}`}>
                    Rezar {misterio.nome.toLowerCase()}
                  </PrefetchLink>
                </Button>
              </div>

              <div>
                <h3 className="mb-2 font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
                  Os cinco mistérios
                </h3>
                <ol className="flex flex-col">
                  {misterio.misteriosDetalhados.map((item, i) => (
                    <li
                      key={item.titulo}
                      className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b py-4 last:border-b-0"
                    >
                      <span className="font-mono text-[13px] text-muted-foreground">{i + 1}.</span>
                      <span className="font-serif text-2xl leading-tight">{item.titulo}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
