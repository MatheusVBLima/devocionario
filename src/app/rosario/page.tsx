import type { Metadata } from "next"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { rosarioMysteries } from "@/data/rosario"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Santo Rosário",
  description:
    "Reze o Santo Rosário com acesso aos mistérios gloriosos, dolorosos, gozosos e luminosos.",
  pathname: "/rosario",
})

export default function RosarioPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 md:px-6 lg:px-10 lg:py-24">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <Badge variant="outline" className="rounded-full px-3 py-1 text-xs tracking-[0.18em] uppercase">
          Devoção mariana
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Santo Rosário
        </h1>
        <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          Escolha um conjunto de mistérios para rezar o rosário com guia, reflexões e orações.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {rosarioMysteries.map((misterio) => (
          <Card key={misterio.id} className="flex h-full flex-col">
            <CardHeader className="space-y-3">
              <CardTitle>{misterio.nome}</CardTitle>
              <CardDescription>{misterio.descricao}</CardDescription>
              <Badge variant="secondary" className="w-fit">
                {misterio.dias}
              </Badge>
            </CardHeader>
            <CardContent className="flex-1">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Os cinco mistérios
              </h2>
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                {misterio.misteriosDetalhados.map((item) => (
                  <li key={item.titulo}>{item.titulo}</li>
                ))}
              </ol>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/rosario/${misterio.id}`}>Rezar estes mistérios</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
