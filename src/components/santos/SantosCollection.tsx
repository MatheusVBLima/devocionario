"use client"

import Image from "next/image"
import Link from "next/link"
import { Church } from "lucide-react"
import { useQueryStates } from "nuqs"

import { AppEmptyState } from "@/components/AppEmptyState"
import { CollectionPagination } from "@/components/CollectionPagination"
import { SantoImage } from "@/components/SantoImage"
import { CollectionFilters } from "@/components/filters/CollectionFilters"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { santo } from "@/data/santos"
import {
  collectionPageParser,
  collectionQueryParser,
  queryUrlUpdateThrottle,
  santosMonthValues,
  santosMonthParser,
  sharedQueryOptions,
} from "@/lib/search-params"
import { normalizeSearchText } from "@/lib/normalize-search"

const ITEMS_PER_PAGE = 9

type SantosCollectionProps = {
  santos: santo[]
  months: Array<{ value: string; label: string }>
}

function formatDate(dia: string, mes: string, months: Array<{ value: string; label: string }>) {
  const month = months.find((item) => item.value === mes)?.label ?? mes
  return `${Number(dia)} de ${month}`
}

export function SantosCollection({ santos, months }: SantosCollectionProps) {
  const [filters, setFilters] = useQueryStates({
    q: collectionQueryParser,
    mes: santosMonthParser,
    page: collectionPageParser,
  })

  const query = normalizeSearchText(filters.q)
  const mes = filters.mes

  const filteredSantos = [...santos]
    .filter((santo) => {
      const matchesQuery =
        !query ||
        normalizeSearchText(santo.nome).includes(query) ||
        normalizeSearchText(santo.sobre).includes(query)

      const matchesMonth = mes === "Todos" || santo.mes === mes
      return matchesQuery && matchesMonth
    })
    .sort((a, b) => {
      if (a.mes !== b.mes) return Number(a.mes) - Number(b.mes)
      return Number(a.dia) - Number(b.dia)
    })

  const totalPages = Math.max(1, Math.ceil(filteredSantos.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(filters.page, totalPages)
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
  const currentSantos = filteredSantos.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <>
      <CollectionFilters
        searchPlaceholder="Pesquisar santos..."
        searchValue={filters.q}
        onSearchChange={(value) => {
          void setFilters(
            {
              q: value || null,
              page: 1,
            },
            {
              ...sharedQueryOptions,
              limitUrlUpdates: queryUrlUpdateThrottle,
            }
          )
        }}
        selectValue={filters.mes}
        onSelectChange={(value) => {
          void setFilters(
            {
              mes: value as (typeof santosMonthValues)[number],
              page: 1,
            },
            sharedQueryOptions
          )
        }}
        selectPlaceholder="Filtrar por mes"
        selectOptions={months}
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
                  {formatDate(santo.dia, santo.mes, months)}
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
          description="Não encontramos santos para os filtros atuais. Tente outro nome ou selecione um mês diferente."
          actionHref="/santos"
          actionLabel="Limpar filtros"
          icon={Church}
        />
      )}

      <CollectionPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          void setFilters({ page }, sharedQueryOptions)
        }}
      />
    </>
  )
}
