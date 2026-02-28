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
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 lg:py-24">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <Badge variant="outline" className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]">
          Leitura do dia
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Liturgia Diaria
        </h1>

        {liturgia ? (
          <>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              {formatDate(liturgia.data)} • {getWeekday(liturgia.data)}
            </p>
            <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              {liturgia.liturgia} • Cor liturgica: {liturgia.cor}
            </p>
          </>
        ) : (
          <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
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
