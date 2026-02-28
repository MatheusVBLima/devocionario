import type { Metadata } from "next"
import Link from "next/link"
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
import { blogPosts } from "@/data/blog"
import { parsePositivePage } from "@/lib/routes"
import { buildMetadata } from "@/lib/seo"

const ITEMS_PER_PAGE = 9

export const metadata: Metadata = buildMetadata({
  title: "Blog catolico",
  description:
    "Acompanhe noticias, formacoes e conteudos sobre a vida da Igreja, espiritualidade e formacao catolica.",
  pathname: "/blog",
})

type BlogPageProps = {
  searchParams: Promise<{
    q?: string
    categoria?: string
    page?: string
  }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const query = params.q?.trim().toLowerCase() ?? ""
  const categoria = params.categoria?.trim() ?? "Todas"
  const currentPage = parsePositivePage(params.page)

  const categorias = ["Todas", ...new Set(blogPosts.map((post) => post.category))]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesQuery =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query)

    const matchesCategory = categoria === "Todas" || post.category === categoria

    return matchesQuery && matchesCategory
  })

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 md:px-6 lg:px-10 lg:py-24">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <Badge variant="outline" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]">
          Conteudo editorial
        </Badge>
        <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          Noticias, formacoes e reflexoes sobre a vida da Igreja, espiritualidade e cultura catolica.
        </p>
      </header>

      <CollectionFilters
        searchPlaceholder="Pesquisar artigos..."
        selectParamKey="categoria"
        selectPlaceholder="Selecione uma categoria"
        selectOptions={categorias.map((item) => ({
          label: item,
          value: item,
        }))}
      />

      {currentPosts.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {currentPosts.map((post) => (
            <Card
              key={post.id}
              className="flex h-full flex-col overflow-hidden border-border/70 bg-card/90 shadow-sm"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="line-clamp-2 text-xl leading-tight">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 text-sm leading-6">
                  {post.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Por <span className="font-medium text-foreground">{post.author}</span>
                </p>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/blog/${post.id}`}>Ler artigo</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <AppEmptyState
          title="Nenhum artigo encontrado"
          description="Nao encontramos artigos para os filtros atuais do blog. Ajuste a pesquisa ou escolha outra categoria."
          actionHref="/blog"
          actionLabel="Limpar filtros"
          icon={Newspaper}
        />
      )}

      <CollectionPagination
        pathname="/blog"
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        params={{ q: params.q, categoria }}
      />
    </div>
  )
}
