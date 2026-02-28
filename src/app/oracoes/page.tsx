import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { HandHeart } from "lucide-react"

import { AppEmptyState } from "@/components/AppEmptyState"
import { CollectionPagination } from "@/components/CollectionPagination"
import { CollectionFilters } from "@/components/filters/CollectionFilters"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { oracoes } from "@/data/oracoes"
import { parsePositivePage } from "@/lib/routes"
import { buildMetadata } from "@/lib/seo"

const ITEMS_PER_PAGE = 9

export const metadata: Metadata = buildMetadata({
  title: "Oracoes catolicas",
  description:
    "Consulte oracoes catolicas por categoria, com leitura organizada e acesso rapido para diferentes momentos da vida espiritual.",
  pathname: "/oracoes",
})

type OracoesPageProps = {
  searchParams: Promise<{
    q?: string
    categoria?: string
    page?: string
  }>
}

function estimateReadingTime(content: string) {
  const words = content.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 150))
  return `${minutes} min`
}

export default async function OracoesPage({ searchParams }: OracoesPageProps) {
  const params = await searchParams
  const query = params.q?.trim().toLowerCase() ?? ""
  const categoria = params.categoria?.trim() ?? "Todas"
  const currentPage = parsePositivePage(params.page)

  const categorias = ["Todas", ...new Set(oracoes.map((oracao) => oracao.category))]

  const filteredOracoes = [...oracoes]
    .filter((oracao) => {
      const matchesQuery =
        !query ||
        oracao.title.toLowerCase().includes(query) ||
        oracao.content.toLowerCase().includes(query)

      const matchesCategory = categoria === "Todas" || oracao.category === categoria

      return matchesQuery && matchesCategory
    })
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return a.title.localeCompare(b.title, "pt-BR")
    })

  const totalPages = Math.max(1, Math.ceil(filteredOracoes.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
  const currentOracoes = filteredOracoes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 md:px-6 lg:px-10 lg:py-24">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <Badge variant="outline" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]">
          Vida de oracao
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Oracoes</h1>
        <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          Uma colecao de oracoes catolicas organizadas por tema, para leitura simples e acesso rapido.
        </p>
      </header>

      <CollectionFilters
        searchPlaceholder="Pesquisar oracoes..."
        selectParamKey="categoria"
        selectPlaceholder="Filtrar por categoria"
        selectOptions={categorias.map((item) => ({
          label: item,
          value: item,
        }))}
      />

      {currentOracoes.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {currentOracoes.map((oracao) => (
            <Card key={oracao.id} className="flex h-full flex-col overflow-hidden">
              {oracao.imageUrl ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={oracao.imageUrl}
                    alt={oracao.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              ) : null}

              <CardHeader className="space-y-4">
                <CardTitle className="line-clamp-2 text-xl">{oracao.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{oracao.category}</Badge>
                  <Badge variant="secondary">{estimateReadingTime(oracao.content)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-4 text-sm leading-6 text-muted-foreground">
                  {oracao.content.replace(/\n/g, " ").replace(/\*\*/g, "")}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/oracoes/${oracao.id}`}>Ver oracao</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <AppEmptyState
          title="Nenhuma oracao encontrada"
          description="Nao encontramos oracoes para os filtros atuais. Tente outra busca ou selecione uma categoria diferente."
          actionHref="/oracoes"
          actionLabel="Limpar filtros"
          icon={HandHeart}
        />
      )}

      <CollectionPagination
        pathname="/oracoes"
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        params={{ q: params.q, categoria }}
      />
    </div>
  )
}
