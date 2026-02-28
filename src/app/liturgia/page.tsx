import type { Metadata } from "next"
import { BookMarked } from "lucide-react"

import { AppEmptyState } from "@/components/AppEmptyState"
import { LiturgiaTabs } from "@/components/liturgia/LiturgiaTabs"
import { Badge } from "@/components/ui/badge"
import { buildMetadata } from "@/lib/seo"

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: "Liturgia diaria",
  description:
    "Acompanhe as leituras, salmo, evangelho, oracoes e antifonas da liturgia diaria.",
  pathname: "/liturgia",
})

type LiturgiaData = {
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
    primeiraLeitura: Array<{
      referencia: string
      titulo: string
      texto: string
    }>
    salmo: Array<{
      referencia: string
      refrao: string
      texto: string
    }>
    segundaLeitura: Array<{
      referencia: string
      titulo: string
      texto: string
    }>
    evangelho: Array<{
      referencia: string
      titulo: string
      texto: string
    }>
  }
  antifonas: {
    entrada: string
    comunhao: string
  }
}

async function getLiturgiaData(): Promise<LiturgiaData | null> {
  try {
    const response = await fetch("https://liturgia.up.railway.app/v2/", {
      next: { revalidate },
    })

    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

function formatDate(dateString: string) {
  if (!dateString) return ""
  const [day, month, year] = dateString.split("/")
  const months = [
    "Janeiro",
    "Fevereiro",
    "Marco",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  return `${Number(day)} de ${months[Number(month) - 1]} de ${year}`
}

function getWeekday(dateString: string) {
  const [day, month, year] = dateString.split("/")
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date)
}

export default async function LiturgiaPage() {
  const liturgia = await getLiturgiaData()

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-20 md:px-6 lg:py-32">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge 
          variant="secondary" 
          className="rounded-full px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm"
        >
          Leitura do dia
        </Badge>
        <h1 className="text-balance font-serif text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
          Liturgia Diaria
        </h1>
        <div className="my-2 h-px w-12 bg-border/50" />

        {liturgia ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {formatDate(liturgia.data)} • {getWeekday(liturgia.data)}
            </p>
            <p className="max-w-2xl text-pretty text-lg italic leading-8 text-muted-foreground">
              {liturgia.liturgia} • Cor liturgica: {liturgia.cor}
            </p>
          </div>
        ) : (
          <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
            Acompanhe as leituras, o salmo e as oracoes do dia em uma interface pensada para leitura.
          </p>
        )}
      </header>

      {liturgia ? (
        <LiturgiaTabs liturgia={liturgia} />
      ) : (
        <AppEmptyState
          title="Liturgia indisponivel no momento"
          description="Nao foi possivel carregar o conteudo da liturgia diaria agora. Tente novamente em instantes."
          actionHref="/liturgia"
          actionLabel="Tentar novamente"
          icon={BookMarked}
          className="border border-dashed border-border/80 bg-muted/20 py-12"
        />
      )}
    </div>
  )
}
