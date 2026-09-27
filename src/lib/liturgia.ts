import { cache } from "react"

export const LITURGIA_REVALIDATE_SECONDS = 3600

export type LiturgiaLeitura = {
  referencia: string
  titulo?: string
  refrao?: string
  texto: string
}

export type LiturgiaData = {
  data: string
  liturgia: string
  cor: string
  oracoes: {
    coleta: string
    oferendas: string
    comunhao: string
    extras: string[]
  }
  leituras: {
    primeiraLeitura: LiturgiaLeitura[]
    salmo: LiturgiaLeitura[]
    segundaLeitura: LiturgiaLeitura[]
    evangelho: LiturgiaLeitura[]
  }
  antifonas: {
    entrada: string
    comunhao: string
  }
}

/** Liturgia do dia. Deduplicada por requisição e revalidada a cada hora. */
export const getLiturgiaDoDia = cache(async (): Promise<LiturgiaData | null> => {
  try {
    const response = await fetch("https://liturgia.up.railway.app/v2/", {
      next: { revalidate: LITURGIA_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) return null
    return (await response.json()) as LiturgiaData
  } catch {
    return null
  }
})

const liturgicalColors: Record<string, string> = {
  verde: "oklch(0.5 0.1 155)",
  roxo: "oklch(0.46 0.12 305)",
  branco: "oklch(0.52 0.1 75)",
  dourado: "oklch(0.52 0.1 75)",
  vermelho: "oklch(0.5 0.15 25)",
  rosa: "oklch(0.55 0.12 350)",
  preto: "oklch(0.36 0.01 60)",
}

export const defaultLiturgicalColor = liturgicalColors.verde

/** Converte a cor litúrgica da API ("Verde", "Roxo"...) no tom usado pelo site. */
export function liturgicalColorFor(cor?: string | null) {
  if (!cor) return defaultLiturgicalColor
  const key = cor
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase()
    .split(/\s+/)[0]

  return liturgicalColors[key] ?? defaultLiturgicalColor
}

export function hasText(value?: string | null) {
  return Boolean(value?.trim())
}

export function getValidReading(readings: LiturgiaLeitura[] = []) {
  return readings.find(
    (reading) =>
      hasText(reading.referencia) ||
      hasText(reading.titulo) ||
      hasText(reading.refrao) ||
      hasText(reading.texto),
  )
}

/** Numeração de versículos embutida no texto da API ("43btodos", "11, 9Alegra-te"). */
const verseNumberPattern = /(\d+(?:,\s?\d+)?[a-d]?)(?=[\p{L}“"‘—])/gu

/** Separa o texto em trechos; os índices ímpares são números de versículo. */
export function splitVerses(text: string) {
  return text.split(verseNumberPattern)
}

/** Remove a numeração de versículos embutida no texto ("43btodos" → "todos"). */
export function stripVerseNumbers(text: string) {
  return text
    .replace(verseNumberPattern, "")
    .replace(/\s{2,}/g, " ")
    .trim()
}

/** Primeiras frases de uma leitura, para citação em destaque. */
export function excerptOf(text: string, maxLength = 180) {
  const clean = stripVerseNumbers(text).replace(/\n+/g, " ")
  const sentences = clean.match(/[^.!?]+[.!?]+[”"’]?/g) ?? [clean]

  let excerpt = ""
  for (const sentence of sentences) {
    if (excerpt && (excerpt + sentence).length > maxLength) break
    excerpt += sentence
  }

  excerpt = excerpt.trim()
  if (excerpt.length > maxLength * 1.6) {
    excerpt = `${excerpt.slice(0, maxLength).replace(/\s+\S*$/, "")}…`
  }

  return excerpt
}

/** "26/09/2026" → "26 de setembro de 2026" */
export function formatLiturgiaDate(dateString: string) {
  const [day, month, year] = dateString.split("/")
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(date)
}

export function liturgiaWeekday(dateString: string) {
  const [day, month, year] = dateString.split("/")
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date)
}
