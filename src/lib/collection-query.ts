import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { buildSearchHref, canonicalUrl } from "@/lib/routes"

export type CollectionSearchParams = Promise<Record<string, string | string[] | undefined>>

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export async function parseCollectionQuery(
  searchParams: CollectionSearchParams,
  filterName: string,
  allowedFilters: readonly string[],
) {
  const raw = await searchParams
  const rawQuery = single(raw.q) ?? ""
  if (rawQuery.length > 100) notFound()
  const q = rawQuery.trim()
  const selected = single(raw[filterName]) ?? "Todas"
  if (!allowedFilters.includes(selected)) notFound()

  const rawPage = single(raw.page)
  if (rawPage !== undefined && !/^[1-9]\d*$/.test(rawPage)) notFound()
  const page = rawPage === undefined ? 1 : Number(rawPage)
  if (!Number.isSafeInteger(page)) notFound()

  return { q, selected, page, filtered: Boolean(q) || selected !== "Todas" }
}

export function collectionMetadata(base: Metadata, pathname: string, query: { page: number; filtered: boolean }): Metadata {
  const path = buildSearchHref(pathname, { page: query.page })
  return {
    ...base,
    alternates: query.filtered ? {} : { canonical: canonicalUrl(path) },
    robots: query.filtered ? { index: false, follow: true } : base.robots,
    openGraph: { ...base.openGraph, url: canonicalUrl(path) },
  }
}

export function collectionPage<T>(items: T[], page: number, pageSize = 9) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  if (page > totalPages) notFound()
  return { items: items.slice((page - 1) * pageSize, page * pageSize), totalPages }
}
