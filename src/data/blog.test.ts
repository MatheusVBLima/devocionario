import { describe, expect, it } from "bun:test"
import { getBlogPosts, isIndexablePost, normalizeArticle, validExternalUrl } from "./blog"

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

describe("temporary CMS outage handling", () => {
  it("shows no invented articles when the CMS responds with 403", async () => {
    const previousFetch = globalThis.fetch
    const previousUrl = process.env.DIRECTUS_URL
    const previousToken = process.env.DIRECTUS_TOKEN
    const previousLog = console.error
    try {
      process.env.DIRECTUS_URL = "https://example.invalid"
      process.env.DIRECTUS_TOKEN = "test-token"
      globalThis.fetch = Object.assign(
        async () => new Response(null, { status: 403 }),
        { preconnect: previousFetch.preconnect },
      )
      console.error = () => {}
      expect(await getBlogPosts()).toEqual([])
    } finally {
      globalThis.fetch = previousFetch
      console.error = previousLog
      if (previousUrl === undefined) delete process.env.DIRECTUS_URL
      else process.env.DIRECTUS_URL = previousUrl
      if (previousToken === undefined) delete process.env.DIRECTUS_TOKEN
      else process.env.DIRECTUS_TOKEN = previousToken
    }
  })

  it("still fails for other CMS errors", async () => {
    const previousFetch = globalThis.fetch
    const previousUrl = process.env.DIRECTUS_URL
    const previousToken = process.env.DIRECTUS_TOKEN
    const previousLog = console.error
    try {
      process.env.DIRECTUS_URL = "https://example.invalid"
      process.env.DIRECTUS_TOKEN = "test-token"
      globalThis.fetch = Object.assign(
        async () => new Response(null, { status: 500 }),
        { preconnect: previousFetch.preconnect },
      )
      console.error = () => {}
      await expect(getBlogPosts()).rejects.toThrow("HTTP 500")
    } finally {
      globalThis.fetch = previousFetch
      console.error = previousLog
      if (previousUrl === undefined) delete process.env.DIRECTUS_URL
      else process.env.DIRECTUS_URL = previousUrl
      if (previousToken === undefined) delete process.env.DIRECTUS_TOKEN
      else process.env.DIRECTUS_TOKEN = previousToken
    }
  })
})
