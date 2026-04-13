import { describe, expect, test } from "bun:test"

import { extractExternalArticleDetails } from "./blog-external"

const sampleArticleHtml = `
  <html>
    <head>
      <meta property="og:description" content="Resumo original do artigo.">
    </head>
    <body>
      <section class="post-page">
        <div class="post-caption__info">
          <span class="post-caption__date">22.Set.2025</span>
          <span class="post-caption__time">Tempo de leitura: 5 minutos</span>
        </div>
        <div class="post-content container">
          <p>Primeiro parágrafo do conteúdo completo.</p>
          <blockquote>Trecho em destaque.</blockquote>
          <p>Segundo parágrafo do conteúdo completo.</p>
        </div>
        <div class="post-content-tags">
          <div class="post-content-tags-item">Como Ser Família</div>
          <div class="post-content-tags-item">Família</div>
        </div>
        <section class="comment-section"></section>
      </section>
    </body>
  </html>
`

describe("extractExternalArticleDetails", () => {
  test("extracts summary, full content, date, reading time, and tags from article html", () => {
    const details = extractExternalArticleDetails(sampleArticleHtml)

    expect(details.summary).toBe("Resumo original do artigo.")
    expect(details.dateLabel).toBe("22.Set.2025")
    expect(details.readingTime).toBe("Tempo de leitura: 5 minutos")
    expect(details.tags).toEqual(["Como Ser Família", "Família"])
    expect(details.contentHtml).toContain("Primeiro parágrafo do conteúdo completo.")
    expect(details.contentHtml).toContain("<blockquote>Trecho em destaque.</blockquote>")
    expect(details.contentHtml).not.toContain("comment-section")
  })
})
