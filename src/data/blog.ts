import { cache } from "react"

import { extractExternalArticleDetails } from "@/data/blog-external"
import { siteConfig } from "@/lib/site"

export type BlogPost = {
  id: string
  title: string
  summary: string
  date: string
  author: string
  category: string
  image: string | null
  tags: string[]
  contentHtml?: string
  externalUrl?: string | null
  readingTime?: string | null
}

const legacyBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: 'Papa Francisco convoca Jubileu de 2025 com o tema "Peregrinos de Esperança"',
    summary:
      "O Vaticano divulgou detalhes sobre o próximo Ano Santo que atrairá milhões de peregrinos a Roma.",
    date: "15 de março de 2024",
    author: "Redação",
    category: "Vaticano",
    image: null,
    tags: ["Jubileu", "Papa Francisco", "Vaticano", "Peregrinação", "Ano Santo"],
    contentHtml: `
      <p>O Papa Francisco anunciou oficialmente que o Jubileu de 2025 terá como tema “Peregrinos de Esperança”, convidando a Igreja a renovar a esperança em tempos de crise e incerteza.</p>
      <p>Segundo o Vaticano, o Ano Santo será um tempo de oração, peregrinação, conversão e redescoberta da misericórdia de Deus. A proposta é que dioceses do mundo inteiro promovam celebrações e iniciativas locais, além das grandes celebrações em Roma.</p>
      <p>Os preparativos incluem reformas em importantes basílicas e organização de acolhimento para peregrinos. A abertura oficial ocorrerá com a abertura da Porta Santa da Basílica de São Pedro.</p>
    `,
    externalUrl: null,
  },
  {
    id: "2",
    title: "Concluído importante trabalho de restauração na Basílica da Natividade em Belém",
    summary:
      "Após 10 anos de trabalho, a histórica igreja construída sobre o local de nascimento de Jesus voltou a revelar detalhes antes ocultos.",
    date: "12 de março de 2024",
    author: "Redação",
    category: "Terra Santa",
    image: null,
    tags: ["Terra Santa", "Belém", "Restauração", "Basílica da Natividade", "Patrimônio"],
    contentHtml: `
      <p>A Basílica da Natividade, em Belém, concluiu um extenso processo de restauração que revelou mosaicos, estruturas e detalhes históricos antes encobertos pelo tempo.</p>
      <p>O trabalho envolveu especialistas de diferentes países e destacou o valor espiritual, artístico e cultural do santuário para toda a tradição cristã.</p>
      <p>A expectativa é que a restauração fortaleça ainda mais a peregrinação à Terra Santa e contribua para a preservação desse patrimônio de valor universal.</p>
    `,
    externalUrl: null,
  },
  {
    id: "3",
    title: "Anunciadas duas novas canonizações para outubro",
    summary:
      "Foram divulgadas as datas para novas canonizações, reforçando o testemunho de santidade na vida da Igreja.",
    date: "8 de março de 2024",
    author: "Redação",
    category: "Santos",
    image: null,
    tags: ["Canonizações", "Santos", "Igreja"],
    externalUrl: null,
  },
  {
    id: "4",
    title: "Como se preparar espiritualmente para o Jubileu de 2025",
    summary:
      "Orientações práticas para viver o Ano Santo com oração, penitência e esperança cristã.",
    date: "5 de março de 2024",
    author: "Pe. Carlos Oliveira",
    category: "Espiritualidade",
    image: null,
    tags: ["Jubileu", "Espiritualidade", "Preparação"],
    externalUrl: null,
  },
  {
    id: "5",
    title: "Diocese promove romaria ao Santuário Nacional de Aparecida",
    summary:
      "Fiéis participarão de uma peregrinação anual ao maior santuário mariano do Brasil.",
    date: "28 de fevereiro de 2024",
    author: "Colaboradores",
    category: "Brasil",
    image: null,
    tags: ["Romaria", "Aparecida", "Brasil"],
    externalUrl: null,
  },
  {
    id: "6",
    title: "Documentário sobre vida monástica recebe prêmio internacional",
    summary:
      "Produção dedicada ao cotidiano monástico foi reconhecida por sua profundidade espiritual e qualidade estética.",
    date: "22 de fevereiro de 2024",
    author: "Redação",
    category: "Cultura",
    image: null,
    tags: ["Documentário", "Vida Monástica", "Cultura"],
    externalUrl: null,
  },
  {
    id: "7",
    title: "Peregrinações quaresmais ganham força em comunidades do interior",
    summary:
      "Paróquias e movimentos locais intensificam caminhadas penitenciais e momentos comunitários de oração.",
    date: "20 de fevereiro de 2024",
    author: "Redação",
    category: "Espiritualidade",
    image: null,
    tags: ["Quaresma", "Peregrinação", "Comunidade"],
    externalUrl: null,
  },
  {
    id: "8",
    title: "Nova iniciativa catequética busca aproximar jovens da vida sacramental",
    summary:
      "Projeto propõe formação acessível e acompanhamento pastoral para adolescentes e jovens adultos.",
    date: "18 de fevereiro de 2024",
    author: "Colaboradores",
    category: "Formação",
    image: null,
    tags: ["Catequese", "Jovens", "Sacramentos"],
    externalUrl: null,
  },
  {
    id: "9",
    title: "Mosteiro brasileiro amplia programa de retiros espirituais",
    summary:
      "Casa religiosa passa a oferecer novos períodos de recolhimento e silêncio para leigos.",
    date: "14 de fevereiro de 2024",
    author: "Redação",
    category: "Brasil",
    image: null,
    tags: ["Retiro", "Mosteiro", "Silêncio"],
    externalUrl: null,
  },
  {
    id: "10",
    title: "A importância da leitura espiritual na rotina católica",
    summary:
      "Diretores espirituais reforçam o valor de uma leitura diária que alimente a oração e a vida interior.",
    date: "11 de fevereiro de 2024",
    author: "Pe. Carlos Oliveira",
    category: "Espiritualidade",
    image: null,
    tags: ["Leitura Espiritual", "Rotina Católica", "Oração"],
    externalUrl: null,
  },
  {
    id: "11",
    title: "Comunidades retomam encontros de formação bíblica em pequenos grupos",
    summary:
      "A proposta reúne estudo da Escritura, partilha e aprofundamento da fé em ambiente comunitário.",
    date: "7 de fevereiro de 2024",
    author: "Colaboradores",
    category: "Formação",
    image: null,
    tags: ["Bíblia", "Comunidade", "Formação"],
    externalUrl: null,
  },
  {
    id: "12",
    title: "Santuários registram aumento de visitantes em datas marianas",
    summary:
      "Locais de devoção mariana têm recebido mais peregrinos em celebrações especiais ao longo do ano.",
    date: "2 de fevereiro de 2024",
    author: "Redação",
    category: "Brasil",
    image: null,
    tags: ["Santuários", "Maria", "Peregrinação"],
    externalUrl: null,
  },
] as const

const ARTICLES_REVALIDATE_SECONDS = 3600
let didLogRemoteBlogError = false

function toStringOrNull(value: unknown) {
  if (typeof value === "string") {
    const normalized = value.trim()
    return normalized || null
  }

  if (typeof value === "number") return String(value)
  return null
}

function toTextArray(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        if (typeof entry === "string") return entry.trim()
        if (entry && typeof entry === "object") {
          const objectEntry = entry as Record<string, unknown>
          return (
            toStringOrNull(objectEntry.name) ??
            toStringOrNull(objectEntry.nome) ??
            toStringOrNull(objectEntry.title) ??
            toStringOrNull(objectEntry.titulo)
          )
        }
        return null
      })
      .filter((entry): entry is string => Boolean(entry))
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
  }

  return []
}

function toAssetUrl(value: unknown): string | null {
  if (value && typeof value === "object") {
    const asset = value as Record<string, unknown>

    return (
      toAssetUrl(asset.id) ??
      toAssetUrl(asset.url) ??
      toAssetUrl(asset.filename_disk) ??
      toAssetUrl(asset.filename_download)
    )
  }

  const raw = toStringOrNull(value)
  if (!raw) return null

  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw

  const directusUrl = process.env.DIRECTUS_URL
  if (!directusUrl) return null

  if (raw.startsWith("/")) return `${directusUrl}${raw}`

  return `${directusUrl}/assets/${raw}`
}

function formatDate(value: unknown) {
  const raw = toStringOrNull(value)
  if (!raw) return siteConfig.defaultPublishedAt.slice(0, 10)

  const date = new Date(raw)

  if (Number.isNaN(date.getTime())) return raw

  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

function buildFallbackSummary({
  title,
  category,
  author,
}: {
  title: string
  category: string
  author: string
}) {
  return `Artigo de ${author} na categoria ${category}: ${title}.`
}

function firstString(...values: unknown[]) {
  for (const value of values) {
    const normalized = toStringOrNull(value)
    if (normalized) return normalized
  }

  return null
}

function extractImage(record: Record<string, unknown>) {
  return (
    toAssetUrl(record.image) ??
    toAssetUrl(record.imagem) ??
    toAssetUrl(record.cover) ??
    toAssetUrl(record.capa) ??
    toAssetUrl(record.thumbnail) ??
    toAssetUrl(record.thumb) ??
    toAssetUrl(record.featured_image) ??
    toAssetUrl(record.imagem_destacada)
  )
}

const fetchExternalArticleDetails = cache(async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
    next: { revalidate: ARTICLES_REVALIDATE_SECONDS },
  })

  if (!response.ok) {
    throw new Error(`Falha ao carregar artigo externo: ${response.status}`)
  }

  const html = await response.text()
  return extractExternalArticleDetails(html)
})

async function enrichBlogPost(post: BlogPost): Promise<BlogPost> {
  if (!post.externalUrl) return post

  const details = await fetchExternalArticleDetails(post.externalUrl)

  return {
    ...post,
    summary: details.summary ?? post.summary,
    date: details.dateLabel ?? post.date,
    tags: details.tags.length > 0 ? details.tags : post.tags,
    contentHtml: details.contentHtml ?? post.contentHtml,
    readingTime: details.readingTime ?? post.readingTime,
  }
}

function normalizeArticle(record: Record<string, unknown>): BlogPost | null {
  const id = firstString(record.id, record.slug, record.chave)
  const title = firstString(record.title, record.titulo, record.nome, record.name)
  const authorRecord =
    (record.author as Record<string, unknown> | undefined) ??
    (record.autor as Record<string, unknown> | undefined)
  const categoryRecord =
    (record.category as Record<string, unknown> | undefined) ??
    (record.categoria as Record<string, unknown> | undefined)
  const author =
    firstString(
      authorRecord?.name,
      authorRecord?.nome,
      record.author_name,
      record.autor_nome,
      record.writer,
      record.author,
      record.autor,
    ) ?? siteConfig.defaultAuthor
  const category =
    firstString(
      categoryRecord?.name,
      categoryRecord?.nome,
      record.category,
      record.categoria,
    ) ?? "Artigos"

  if (!id || !title) return null

  const summary = firstString(
      record.summary,
      record.resumo,
      record.description,
      record.descricao,
      record.excerpt,
      record.subtitulo,
    ) ?? buildFallbackSummary({ title, category, author })

  return {
    id,
    title,
    summary,
    date: formatDate(
      record.date ??
        record.data ??
        record.date_created ??
        record.date_published ??
        record.published_at ??
        record.data_publicacao,
    ),
    author,
    category,
    image: extractImage(record),
    tags: toTextArray(record.tags ?? record.tag ?? record.etiquetas),
    contentHtml:
      firstString(
        record.contentHtml,
        record.content_html,
        record.content,
        record.conteudo_html,
        record.conteudo,
        record.html,
        record.body,
        record.corpo,
      ) ?? undefined,
    externalUrl: firstString(record.url, record.link, record.href),
  }
}

const fetchRemoteBlogPosts = cache(async () => {
  const directusUrl = process.env.DIRECTUS_URL
  const directusToken = process.env.DIRECTUS_TOKEN
  const collection = process.env.DIRECTUS_ARTICLES_COLLECTION ?? "Artigos"

  if (!directusUrl || !directusToken) return null

  const endpoint = `${directusUrl}/items/${collection}`
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${directusToken}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    next: { revalidate: ARTICLES_REVALIDATE_SECONDS },
  })

  if (!response.ok) {
    throw new Error(`Falha ao carregar artigos remotos: ${response.status}`)
  }

  const payload = (await response.json()) as { data?: unknown }
  const items = Array.isArray(payload?.data) ? payload.data : []

  const normalizedItems = items
    .map((item) => normalizeArticle((item ?? {}) as Record<string, unknown>))
    .filter((item): item is BlogPost => Boolean(item))

  return Promise.all(normalizedItems.map((item) => enrichBlogPost(item)))
})

export const getBlogPosts = cache(async () => {
  try {
    const remotePosts = await fetchRemoteBlogPosts()
    if (remotePosts && remotePosts.length > 0) return remotePosts
  } catch (error) {
    if (!didLogRemoteBlogError) {
      didLogRemoteBlogError = true
      console.error("Não foi possível carregar os artigos remotos.", error)
    }
  }

  return legacyBlogPosts
})

export const getBlogPostById = cache(async (id: string) => {
  const posts = await getBlogPosts()
  return posts.find((post) => post.id === id)
})

export async function getBlogPostContent(post: BlogPost) {
  return (
    post.contentHtml ??
    [
      `<p>${post.summary}</p>`,
      post.externalUrl
        ? `<p>O conteúdo completo deste artigo está disponível na fonte original.</p><p><a href="${post.externalUrl}" target="_blank" rel="noreferrer">Abrir artigo original</a></p>`
        : `<p>Este conteúdo faz parte do acervo editorial do Devocionário e será ampliado em futuras atualizações do projeto.</p>`,
    ].join("")
  )
}
