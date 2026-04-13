"use client"

import Link from "next/link"
import { useQueryStates } from "nuqs"
import { Newspaper } from "lucide-react"

import { AppEmptyState } from "@/components/AppEmptyState"
import { CollectionPagination } from "@/components/CollectionPagination"
import { CollectionFilters } from "@/components/filters/CollectionFilters"
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {currentPosts.map((post, index) => (
            <Card
              key={post.id}
              className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border-transparent bg-muted/30 p-2 transition-all duration-500 hover:bg-muted/50 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <CardHeader className="space-y-4 px-6 pt-6">
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="outline" className="border-border/50 bg-background/50">
                    {post.category}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="line-clamp-2 text-xl leading-tight">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 text-sm leading-6">
                  {post.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 px-6">
                <p className="text-sm text-muted-foreground">
                  Por <span className="font-medium text-foreground">{post.author}</span>
                </p>
              </CardContent>

              <CardFooter className="px-6 pb-6">
                <Button asChild className="w-full">
                  <Link href={`/blog/${post.id}`}>
                    Ler artigo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
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
