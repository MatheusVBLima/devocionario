export type ExternalArticleDetails = {
  summary: string | null
  dateLabel: string | null
  readingTime: string | null
  tags: string[]
  contentHtml: string | null
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&mdash;/gi, "-")
    .replace(/&ndash;/gi, "-")
    .replace(/&hellip;/gi, "...")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
}

function stripTags(value: string) {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim()
}

function matchContent(html: string, pattern: RegExp) {
  const match = html.match(pattern)
  return match?.[1]?.trim() ?? null
}

function sanitizeExtractedHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\s+on[a-z]+=(['"]).*?\1/gi, "")
    .trim()
}

export function extractExternalArticleDetails(html: string): ExternalArticleDetails {
  const summary = stripTags(
    matchContent(html, /<meta\s+property="og:description"\s+content="([\s\S]*?)"\s*\/?>/i) ??
      matchContent(html, /<div class="post-caption__thin-line">([\s\S]*?)<\/div>/i) ??
      "",
  )

  const dateLabel = stripTags(
    matchContent(html, /<span class="post-caption__date">([\s\S]*?)<\/span>/i) ?? "",
  )

  const readingTime = stripTags(
    matchContent(html, /<span class="post-caption__time">([\s\S]*?)<\/span>/i) ?? "",
  )

  const tags = Array.from(
    html.matchAll(/<div class="post-content-tags-item">([\s\S]*?)<\/div>/gi),
    (match) => stripTags(match[1] ?? ""),
  ).filter(Boolean)

  const contentHtml = sanitizeExtractedHtml(
    matchContent(
      html,
      /<div class="post-content container">([\s\S]*?)(?:<div class="post-content-tags">|<section class="comment-section">|<\/div>\s*<\/section>\s*<div class="related-posts-container">)/i,
    ) ?? "",
  )

  return {
    summary: summary || null,
    dateLabel: dateLabel || null,
    readingTime: readingTime || null,
    tags,
    contentHtml: contentHtml || null,
  }
}
