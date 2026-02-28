"use client"

import Image from "next/image"
import Link from "next/link"
import { HandHeart } from "lucide-react"
import { useQueryStates } from "nuqs"

import { AppEmptyState } from "@/components/AppEmptyState"
import { CollectionPagination } from "@/components/CollectionPagination"
import { CollectionFilters } from "@/components/filters/CollectionFilters"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Oracao } from "@/data/oracoes"
import {
  collectionCategoryParser,
  collectionPageParser,
  collectionQueryParser,
  queryUrlUpdateThrottle,
  sharedQueryOptions,
} from "@/lib/search-params"
import { normalizeSearchText } from "@/lib/normalize-search"

const ITEMS_PER_PAGE = 9

type OracoesCollectionProps = {
  oracoes: Oracao[]
}

function estimateReadingTime(content: string) {
  const words = content.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 150))
  return `${minutes} min`
}

export function OracoesCollection({ oracoes }: OracoesCollectionProps) {
  const [filters, setFilters] = useQueryStates({
    q: collectionQueryParser,
    categoria: collectionCategoryParser,
    page: collectionPageParser,
  })

  const query = normalizeSearchText(filters.q)
  const categoria = filters.categoria
  const categorias = ["Todas", ...new Set(oracoes.map((oracao) => oracao.category))]

  const filteredOracoes = [...oracoes]
    .filter((oracao) => {
      const matchesQuery =
        !query ||
        normalizeSearchText(oracao.title).includes(query) ||
        normalizeSearchText(oracao.content).includes(query)

      const matchesCategory = categoria === "Todas" || oracao.category === categoria

      return matchesQuery && matchesCategory
    })
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return a.title.localeCompare(b.title, "pt-BR")
    })

  const totalPages = Math.max(1, Math.ceil(filteredOracoes.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(filters.page, totalPages)
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
  const currentOracoes = filteredOracoes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <>
      <CollectionFilters
        searchPlaceholder="Pesquisar orações..."
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
        selectValue={filters.categoria}
        onSelectChange={(value) => {
          void setFilters(
            {
              categoria: value,
              page: 1,
            },
            sharedQueryOptions
          )
        }}
        selectPlaceholder="Filtrar por categoria"
        selectOptions={categorias.map((item) => ({
          label: item,
          value: item,
        }))}
      />

      {currentOracoes.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {currentOracoes.map((oracao, index) => (
            <Card
              key={oracao.id}
              className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border-transparent bg-muted/30 p-2 transition-all duration-500 hover:bg-muted/50 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              {oracao.imageUrl ? (
                <div className="pb-0">
                  <div
                    className={`relative w-full overflow-hidden rounded-[1.5rem] bg-muted ${
                      index === 0 ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={oracao.imageUrl}
                      alt={oracao.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                </div>
              ) : null}

              <CardHeader className="space-y-4 px-6 pt-6">
                <CardTitle className="line-clamp-2 text-xl">{oracao.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-border/50 bg-background/50">
                    {oracao.category}
                  </Badge>
                  <Badge variant="secondary">{estimateReadingTime(oracao.content)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 px-6">
                <p className="line-clamp-4 text-sm leading-6 text-muted-foreground">
                  {oracao.content.replace(/\n/g, " ").replace(/\*\*/g, "")}
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button asChild className="w-full">
                  <Link href={`/oracoes/${oracao.id}`}>Ver oração</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <AppEmptyState
          title="Nenhuma oração encontrada"
          description="Não encontramos orações para os filtros atuais. Tente outra busca ou selecione uma categoria diferente."
          actionHref="/oracoes"
          actionLabel="Limpar filtros"
          icon={HandHeart}
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
