import type { Metadata } from "next"
import { Suspense } from "react"

import { CollectionFallback } from "@/components/CollectionFallback"
import { SantosCollection } from "@/components/santos/SantosCollection"
import { Badge } from "@/components/ui/badge"
import { santos } from "@/data/santos"
import { buildMetadata } from "@/lib/seo"

const months = [
  { value: "Todos", label: "Todos os meses" },
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Marco" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
] as const

export const metadata: Metadata = buildMetadata({
  title: "Calendario dos santos",
  description:
    "Navegue pelo calendario dos santos, com datas de celebracao, biografias resumidas e oracoes de devocao.",
  pathname: "/santos",
})

export default function SantosPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-20 md:px-6 lg:px-10 lg:py-32">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge
          variant="secondary"
          className="rounded-full px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm"
        >
          Calendario liturgico
        </Badge>
        <h1 className="text-balance font-serif text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
          Calendario dos Santos
        </h1>
        <div className="my-2 h-px w-12 bg-border/50" />
        <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
          Conheca os santos celebrados ao longo do ano com acesso rapido a biografias e oracoes.
        </p>
      </header>

      <Suspense fallback={<CollectionFallback />}>
        <SantosCollection santos={santos} months={[...months]} />
      </Suspense>
    </div>
  )
}
