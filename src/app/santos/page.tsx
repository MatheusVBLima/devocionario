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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 md:px-6 lg:px-10 lg:py-24">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <Badge variant="outline" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]">
          Calendario liturgico
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Calendario dos Santos
        </h1>
        <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
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
          {currentSantos.map((santo) => (
            <Card key={santo.id} className="flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                {santo.imagem ? (
                  <SantoImage
                    src={santo.imagem}
                    alt={santo.nome}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ) : (
                  <Image
                    src="/placeholder.svg"
                    alt={santo.nome}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                )}
              </div>
              <CardHeader className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  {formatDate(santo.dia, santo.mes)}
                </Badge>
                <CardTitle className="line-clamp-2 text-xl">{santo.nome}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-4 text-sm leading-6 text-muted-foreground">{santo.sobre}</p>
              </CardContent>
              <CardFooter>
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
