"use client"

import Image from "next/image"
import { HandHeart } from "lucide-react"
import { useQueryStates } from "nuqs"

import { AppEmptyState } from "@/components/AppEmptyState"
import { CollectionPagination } from "@/components/CollectionPagination"
import { CollectionFilters } from "@/components/filters/CollectionFilters"
import { PrefetchLink } from "@/components/PrefetchLink"
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
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {currentOracoes.map((oracao) => (
            <li key={oracao.id}>
              <PrefetchLink
                href={`/oracoes/${oracao.id}`}
                className="group flex h-full flex-col gap-4 border-t border-foreground pt-5"
              >
                {oracao.imageUrl ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-card">
                    <Image
                      src={oracao.imageUrl}
                      alt={oracao.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px"
                    />
                  </div>
                ) : null}
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.08em] uppercase">
                  <span className="text-liturgical-ink">{oracao.category}</span>
                  <span aria-hidden className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{estimateReadingTime(oracao.content)}</span>
                </span>
                <h2 className="line-clamp-2 font-serif text-[1.9rem] leading-[1.05] group-hover:text-liturgical-ink">
                  {oracao.title}
                </h2>
                <p className="line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">
                  {oracao.content.replace(/\n/g, " ").replace(/\*\*/g, "")}
                </p>
                <span className="mt-auto text-sm font-medium">Ver oração →</span>
              </PrefetchLink>
            </li>
          ))}
        </ul>
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
