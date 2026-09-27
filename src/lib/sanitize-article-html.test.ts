import { describe, expect, test } from "bun:test"
import { sanitizeArticleHtml } from "./sanitize-article-html"

describe("sanitizeArticleHtml", () => {
  test("keeps editorial markup and safe links", () => {
    expect(sanitizeArticleHtml('<h2>Título</h2><p><a href="https://example.org">Fonte</a></p>'))
      .toContain('<a href="https://example.org">Fonte</a>')
  })

  test("removes executable markup, handlers and unsafe URLs", () => {
    const cleaned = sanitizeArticleHtml(
      '<script>alert(1)</script><svg onload=alert(1)></svg>' +
      '<img src=x onerror=alert(1)><a href="javascript:alert(1)">link</a>' +
      '<p onclick=alert(1)>Texto</p>',
    )
    expect(cleaned).not.toMatch(/script|svg|img|onerror|onclick|javascript:|alert\(1\)/i)
    expect(cleaned).toContain("Texto")
    expect(cleaned).toContain("link")
  })
})
