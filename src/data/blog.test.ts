import { describe, expect, it } from "bun:test"
import { isIndexablePost, normalizeArticle, validExternalUrl } from "./blog"

const source = "https://example.org/artigo"

describe("editorial blog model", () => {
  it("keeps unapproved external records as source-only links", () => {
    const post = normalizeArticle({ id: "uuid", name: "Artigo", writer: "Autor", category: "Formação", url: source })
    expect(post?.externalUrl).toBe(source)
    expect(post?.summary).toBe("")
    expect(post?.contentHtml).toBeUndefined()
    expect(post && isIndexablePost(post)).toBe(false)
  })

  it("indexes only approved original summaries on local pages", () => {
    const post = normalizeArticle({ id: "uuid", name: "Artigo", url: source, summary: "Resumo original revisado", summary_approved: true })
    expect(post?.summary).toBe("Resumo original revisado")
    expect(post && isIndexablePost(post)).toBe(true)
    expect(normalizeArticle({ id: "uuid", name: "Artigo", url: source, summary_approved: true })?.summaryApproved).toBe(false)
  })

  it("rejects unsafe external links instead of treating them as original articles", () => {
    expect(validExternalUrl("javascript:alert(1)")).toBeNull()
    expect(normalizeArticle({ id: "uuid", name: "Artigo", url: "javascript:alert(1)" })).toBeNull()
    expect(normalizeArticle({ id: "uuid", name: "Artigo", url: "http://example.org" })).toBeNull()
  })
})
