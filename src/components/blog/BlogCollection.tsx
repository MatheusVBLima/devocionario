"use client"

import { useQueryStates } from "nuqs"
import { Newspaper } from "lucide-react"

import { AppEmptyState } from "@/components/AppEmptyState"
import { CollectionPagination } from "@/components/CollectionPagination"
import { CollectionFilters } from "@/components/filters/CollectionFilters"
import { PrefetchLink } from "@/components/PrefetchLink"
import type { BlogPost } from "@/data/blog"
import {
  collectionCategoryParser,
  collectionPageParser,
  collectionQueryParser,
  queryUrlUpdateThrottle,
  sharedQueryOptions,
} from "@/lib/search-params"
import { normalizeSearchText } from "@/lib/normalize-search"

const ITEMS_PER_PAGE = 9

type BlogCollectionProps = {
  posts: BlogPost[]
}

export function BlogCollection({ posts }: BlogCollectionProps) {
  const [filters, setFilters] = useQueryStates({
    q: collectionQueryParser,
    categoria: collectionCategoryParser,
    page: collectionPageParser,
  })

  const query = normalizeSearchText(filters.q)
  const categoria = filters.categoria
  const categorias = ["Todas", ...new Set(posts.map((post) => post.category))]

  const filteredPosts = posts.filter((post) => {
    const matchesQuery =
      !query ||
      normalizeSearchText(post.title).includes(query) ||
      normalizeSearchText(post.summary).includes(query) ||
      normalizeSearchText(post.author).includes(query)

    const matchesCategory = categoria === "Todas" || post.category === categoria

    return matchesQuery && matchesCategory
  })

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(filters.page, totalPages)
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <>
      <CollectionFilters
        searchPlaceholder="Pesquisar artigos..."
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
        selectPlaceholder="Selecione uma categoria"
        selectOptions={categorias.map((item) => ({
          label: item,
          value: item,
        }))}
      />

      {currentPosts.length ? (
        <ul className="flex flex-col border-b">
          {currentPosts.map((post) => (
            <li key={post.id}>
              <PrefetchLink
                href={`/blog/${post.id}`}
                className="group grid gap-x-10 gap-y-3 border-t py-8 md:grid-cols-[10rem_minmax(0,1.3fr)_minmax(0,1fr)]"
              >
                <span className="flex flex-col gap-1 font-mono text-xs tracking-[0.08em] uppercase">
                  <span className="text-liturgical-ink">{post.category}</span>
                  <span className="text-muted-foreground">{post.date}</span>
                </span>
                <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] text-balance group-hover:text-liturgical-ink">
                  {post.title}
                </h2>
                <span className="flex flex-col gap-3">
                  <span className="line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">
                    {post.summary}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Por <span className="font-medium text-foreground">{post.author}</span>
                  </span>
                  <span className="text-sm font-medium">Ler artigo →</span>
                </span>
              </PrefetchLink>
            </li>
          ))}
        </ul>
      ) : (
        <AppEmptyState
          title="Nenhum artigo encontrado"
          description="Não encontramos artigos para os filtros atuais do blog. Ajuste a pesquisa ou escolha outra categoria."
          actionHref="/blog"
          actionLabel="Limpar filtros"
          icon={Newspaper}
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
