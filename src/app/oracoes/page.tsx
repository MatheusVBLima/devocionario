import type { Metadata } from "next"
import { Suspense } from "react"

import { CollectionFallback } from "@/components/CollectionFallback"
import { OracoesCollection } from "@/components/oracoes/OracoesCollection"
import { Badge } from "@/components/ui/badge"
import { oracoes } from "@/data/oracoes"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Oracoes catolicas",
  description:
    "Consulte oracoes catolicas por categoria, com leitura organizada e acesso rapido para diferentes momentos da vida espiritual.",
  pathname: "/oracoes",
})

export default function OracoesPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-20 md:px-6 lg:px-10 lg:py-32">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge
          variant="secondary"
          className="rounded-full px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm"
        >
          Vida de oracao
        </Badge>
        <h1 className="text-balance font-serif text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
          Oracoes
        </h1>
        <div className="my-2 h-px w-12 bg-border/50" />
        <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
          Uma colecao de oracoes catolicas organizadas por tema, para leitura simples e acesso rapido.
        </p>
      </header>

      <Suspense fallback={<CollectionFallback />}>
        <OracoesCollection oracoes={oracoes} />
      </Suspense>
    </div>
  )
}
