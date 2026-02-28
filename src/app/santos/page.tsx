import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Church } from "lucide-react"

import { AppEmptyState } from "@/components/AppEmptyState"
import { CollectionPagination } from "@/components/CollectionPagination"
import { SantoImage } from "@/components/SantoImage"
import { CollectionFilters } from "@/components/filters/CollectionFilters"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { santos } from "@/data/santos"
import { parsePositivePage } from "@/lib/routes"
import { buildMetadata } from "@/lib/seo"

const ITEMS_PER_PAGE = 9

export const metadata: Metadata = buildMetadata({
  title: "Calendario dos santos",
  description:
    "Navegue pelo calendario dos santos, com datas de celebracao, biografias resumidas e oracoes de devocao.",
  pathname: "/santos",
})

type SantosPageProps = {
  searchParams: Promise<{
    q?: string
    mes?: string
    page?: string
  }>
}

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

function formatDate(dia: string, mes: string) {
  const month = months.find((item) => item.value === mes)?.label ?? mes
  return `${Number(dia)} de ${month}`
}

export default async function SantosPage({ searchParams }: SantosPageProps) {
  const params = await searchParams
  const query = params.q?.trim().toLowerCase() ?? ""
  const mes = params.mes?.trim() ?? "Todos"
  const currentPage = parsePositivePage(params.page)

  const filteredSantos = [...santos]
    .filter((santo) => {
      const matchesQuery =
        !query ||
        santo.nome.toLowerCase().includes(query) ||
        santo.sobre.toLowerCase().includes(query)

      const matchesMonth = mes === "Todos" || santo.mes === mes
      return matchesQuery && matchesMonth
    })
    .sort((a, b) => {
      if (a.mes !== b.mes) return Number(a.mes) - Number(b.mes)
      return Number(a.dia) - Number(b.dia)
    })

  const totalPages = Math.max(1, Math.ceil(filteredSantos.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
  const currentSantos = filteredSantos.slice(startIndex, startIndex + ITEMS_PER_PAGE)

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

      <CollectionFilters
        searchPlaceholder="Pesquisar santos..."
        selectParamKey="mes"
        selectPlaceholder="Filtrar por mes"
        selectOptions={months.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
      />

      {currentSantos.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {currentSantos.map((santo, index) => (
            <Card
              key={santo.id}
              className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border-transparent bg-muted/30 p-2 transition-all duration-500 hover:bg-muted/50 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="pb-0">
                <div
                  className={`relative w-full overflow-hidden rounded-[1.5rem] bg-muted ${
                    index === 0 ? "aspect-[4/3] md:aspect-[2/1] xl:aspect-[21/9]" : "aspect-[4/3]"
                  }`}
                >
                  {santo.imagem ? (
                    <SantoImage
                      src={santo.imagem}
                      alt={santo.nome}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <Image
                      src="/placeholder.svg"
                      alt={santo.nome}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  )}
                </div>
              </div>
              <CardHeader className="space-y-4 px-6 pt-6">
                <Badge variant="outline" className="w-fit border-border/50 bg-background/50">
                  {formatDate(santo.dia, santo.mes)}
                </Badge>
                <CardTitle className="line-clamp-2 text-xl">{santo.nome}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 px-6">
                <p className="line-clamp-4 text-sm leading-6 text-muted-foreground">{santo.sobre}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button variant="secondary" className="w-full" asChild>
                  <Link href={`/santos/${santo.id}`}>Ver detalhes</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <AppEmptyState
          title="Nenhum santo encontrado"
          description="Nao encontramos santos para os filtros atuais. Tente outro nome ou selecione um mes diferente."
          actionHref="/santos"
          actionLabel="Limpar filtros"
          icon={Church}
        />
      )}

      <CollectionPagination
        pathname="/santos"
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        params={{ q: params.q, mes }}
      />
    </div>
  )
}
