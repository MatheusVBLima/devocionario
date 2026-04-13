import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/JsonLd"
import { Badge } from "@/components/ui/badge"
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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-20 md:px-6 lg:px-10 lg:py-32">
      <JsonLd data={pageSchema} />

      <header className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge 
          variant="secondary" 
          className="rounded-full px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm"
        >
          Devoção mariana
        </Badge>
        <h1 className="text-balance font-serif text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
          Santo Rosário
        </h1>
        <div className="my-2 h-px w-12 bg-border/50" />
        <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
          Escolha um conjunto de mistérios para rezar o rosário com guia, reflexões e orações.
        </p>
      </header>

      <div className="mx-auto mt-8 flex w-full max-w-4xl flex-col gap-12 sm:gap-16">
        {rosarioMysteries.map((misterio) => (
          <div
            key={misterio.id}
            className="group relative flex flex-col gap-6 rounded-[2rem] border border-transparent bg-muted/30 p-6 transition-all duration-500 hover:bg-muted/50 sm:p-10 md:flex-row md:items-start md:gap-10"
          >
            <div className="flex w-full flex-col gap-4 md:w-1/3">
              <Badge variant="outline" className="w-fit border-border/50 bg-background/50">
                {misterio.dias}
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight">{misterio.nome}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{misterio.descricao}</p>
              <Button asChild variant="secondary" className="mt-4 w-fit">
                <Link href={`/rosario/${misterio.id}`}>Rezar {misterio.nome.toLowerCase()}</Link>
              </Button>
            </div>

            <div className="flex-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Os cinco mistérios
              </h3>
              <ul className="flex flex-col gap-4">
                {misterio.misteriosDetalhados.map((item, i) => (
                  <li key={item.titulo} className="flex gap-4">
                    <span className="text-lg font-medium text-muted-foreground/50">{i + 1}.</span>
                    <span className="text-sm leading-relaxed text-foreground">{item.titulo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
