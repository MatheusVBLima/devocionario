import { siteConfig } from "@/lib/site"

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, siteConfig.url)
}

export function canonicalUrl(pathname = "/") {
  return absoluteUrl(pathname).toString()
}

export function buildSearchHref(
  pathname: string,
  entries: Record<string, string | number | undefined | null>,
) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(entries)) {
    if (value === undefined || value === null) continue
    const normalized = String(value).trim()
    if (!normalized) continue
    if (key === "page" && normalized === "1") continue
    params.set(key, normalized)
  }

  const query = params.toString()
  return query ? `${pathname}?${query}` : pathname
}

export function parsePositivePage(value: string | string[] | undefined) {
  const page = Number(Array.isArray(value) ? value[0] : value)
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1
}
