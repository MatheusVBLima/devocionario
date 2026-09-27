"use client"

import { Church } from "lucide-react"
import { useQueryStates } from "nuqs"

import { AppEmptyState } from "@/components/AppEmptyState"
import { CollectionPagination } from "@/components/CollectionPagination"
import { PrefetchLink } from "@/components/PrefetchLink"
import { SantoImage } from "@/components/SantoImage"
import { CollectionFilters } from "@/components/filters/CollectionFilters"
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
        selectPlaceholder="Filtrar por mês"
        selectOptions={months}
      />

      {currentSantos.length ? (
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {currentSantos.map((santo) => (
            <li key={santo.id}>
              <PrefetchLink
                href={`/santos/${santo.id}`}
                className="group flex h-full flex-col gap-4 border-t border-foreground pt-5"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-card">
                  <SantoImage
                    src={santo.imagem}
                    alt={santo.nome}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px"
                  />
                </div>
                <span className="font-mono text-xs tracking-[0.08em] text-liturgical-ink uppercase">
                  {formatDate(santo.dia, santo.mes, months)}
                </span>
                <h2 className="line-clamp-2 font-serif text-[1.9rem] leading-[1.05] group-hover:text-liturgical-ink">
                  {santo.nome}
                </h2>
                <p className="line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">{santo.sobre}</p>
                <span className="mt-auto text-sm font-medium">Ver detalhes →</span>
              </PrefetchLink>
            </li>
          ))}
        </ul>
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
