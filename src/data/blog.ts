import { cache } from "react"

import { siteConfig } from "@/lib/site"

export type BlogPost = {
  id: string
  title: string
  summary: string
  date: string | null
  publishedAt?: string
  updatedAt?: string
  author: string
  category: string
  image: string | null
  tags: string[]
  contentHtml?: string
  externalUrl?: string | null
  summaryApproved?: boolean
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
  if (!raw) return null

  const date = new Date(raw)

  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

function toIsoDate(value: unknown) {
  const raw = toStringOrNull(value)
  if (!raw) return undefined
  const date = new Date(raw)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

export function validExternalUrl(value: unknown): string | null {
  const raw = toStringOrNull(value)
  if (!raw) return null
  try {
    const url = new URL(raw)
    return url.protocol === "https:" ? url.toString() : null
  } catch {
    return null
  }
}

export function isIndexablePost(post: BlogPost) {
  return !post.externalUrl || (post.summaryApproved === true && Boolean(post.summary.trim()))
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

export function normalizeArticle(record: Record<string, unknown>): BlogPost | null {
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

  const rawExternalUrl = firstString(record.url, record.link, record.href)
  const externalUrl = validExternalUrl(rawExternalUrl)
  if (rawExternalUrl && !externalUrl) return null
  const summary = firstString(
      record.summary,
      record.resumo,
      record.description,
      record.descricao,
      record.excerpt,
      record.subtitulo,
    ) ?? (externalUrl ? "" : buildFallbackSummary({ title, category, author }))
  const publishedAt = toIsoDate(
    record.date ?? record.data ?? record.date_created ?? record.date_published ??
      record.published_at ?? record.data_publicacao,
  )
  const updatedAt = toIsoDate(record.date_updated ?? record.updated_at)

  return {
    id,
    title,
    summary,
    date: formatDate(publishedAt),
    publishedAt,
    updatedAt,
    author,
    category,
    image: extractImage(record),
    tags: toTextArray(record.tags ?? record.tag ?? record.etiquetas),
    contentHtml: externalUrl ? undefined :
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
    externalUrl,
    summaryApproved: externalUrl
      ? record.summary_approved === true && Boolean(summary)
      : true,
  }
}

const fetchRemoteBlogPosts = cache(async () => {
  const directusUrl = process.env.DIRECTUS_URL
  const directusToken = process.env.DIRECTUS_TOKEN
  const collection = process.env.DIRECTUS_ARTICLES_COLLECTION ?? "Artigos"

  if (!directusUrl || !directusToken) {
    if (process.env.NODE_ENV === "development") return legacyBlogPosts
    throw new Error("DIRECTUS_URL ou DIRECTUS_TOKEN não definidos.")
  }

  const endpoint = `${directusUrl}/items/${collection}`

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${directusToken}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    next: { revalidate: ARTICLES_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  })

  if (!response.ok) {
    throw new Error(`Falha ao carregar artigos remotos: HTTP ${response.status} ${response.statusText} — ${endpoint}`)
  }

  const payload = (await response.json()) as { data?: unknown }
  if (!Array.isArray(payload?.data) || payload.data.length === 0) {
    throw new Error("O CMS não retornou uma lista válida de artigos.")
  }
  const items = payload.data

  const normalizedItems = items
    .map((item) => normalizeArticle((item ?? {}) as Record<string, unknown>))
    .filter((item): item is BlogPost => Boolean(item))

  if (normalizedItems.length === 0 || normalizedItems.length !== items.length) {
    throw new Error("O CMS retornou artigos ausentes ou inválidos.")
  }
  return normalizedItems
})

export const getBlogPosts = cache(async () => {
  try {
    return await fetchRemoteBlogPosts()
  } catch (error) {
    console.error("Não foi possível carregar os artigos remotos.", error)
    throw error
  }
})

export const getBlogPostById = cache(async (id: string) => {
  const posts = await getBlogPosts()
  return posts.find((post) => post.id === id)
})
