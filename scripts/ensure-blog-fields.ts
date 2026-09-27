/** Idempotent Directus schema migration for editorial summaries. */
export {}
const base = process.env.DIRECTUS_URL
const token = process.env.DIRECTUS_TOKEN
const collection = process.env.DIRECTUS_ARTICLES_COLLECTION ?? "artigos"

if (!base || !token) throw new Error("DIRECTUS_URL e DIRECTUS_TOKEN são necessários.")
if (new URL(base).protocol !== "https:") throw new Error("O CMS precisa usar HTTPS.")

const endpoint = `${base.replace(/\/$/, "")}/fields/${encodeURIComponent(collection)}`
const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
const current = await fetch(endpoint, { headers })
if (!current.ok) throw new Error(`Não foi possível ler o esquema do CMS: HTTP ${current.status}`)
const payload = await current.json() as { data?: Array<{ field: string; type: string; schema?: { default_value?: unknown } }> }
if (!Array.isArray(payload.data)) throw new Error("Resposta inválida do esquema do CMS.")
const fields = new Map(payload.data.map((field) => [field.field, field]))

const additions = [
  {
    field: "summary", type: "text",
    meta: { interface: "input-multiline", note: "Resumo original do Devocionário; revisar antes da aprovação." },
  },
  {
    field: "summary_approved", type: "boolean", schema: { default_value: false },
    meta: { interface: "boolean", note: "Publique a página local somente após revisar e aprovar o resumo." },
  },
]

for (const field of additions) {
  const existing = fields.get(field.field)
  if (existing) {
    if (existing.type !== field.type) throw new Error(`Tipo inesperado para ${field.field}: ${existing.type}`)
    if (field.field === "summary_approved" && existing.schema?.default_value !== false) {
      throw new Error("summary_approved existe, mas não tem default false; verifique o esquema.")
    }
    console.log(`${field.field}: já existe`)
    continue
  }
  const response = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(field) })
  if (!response.ok) throw new Error(`Falha ao criar ${field.field}: HTTP ${response.status}`)
  console.log(`${field.field}: criado`)
}
