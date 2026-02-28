import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { SantoImage } from "@/components/SantoImage"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { santos } from "@/data/santos"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Rotina católica",
  description:
    "Sugestões para incorporar a fé ao dia a dia, com destaque para o santo celebrado hoje.",
  pathname: "/rotina",
})

const routineTips = [
  {
    title: "Oração da manhã",
    description: "Comece o dia oferecendo o trabalho, a família e as intenções ao Senhor.",
    icon: "☀",
    type: "Diária",
  },
  {
    title: "Leitura espiritual",
    description: "Reserve alguns minutos para a leitura da Bíblia ou de um texto espiritual.",
    icon: "📖",
    type: "Diária",
  },
  {
    title: "Exame de consciência",
    description: "Revise o dia diante de Deus e peça luz para continuar a caminhada.",
    icon: "🌙",
    type: "Diária",
  },
  {
    title: "Rosário",
    description: "Dedique tempo para rezar o Santo Rosário e contemplar os mistérios da vida de Cristo.",
    icon: "📿",
    type: "Diária",
  },
  {
    title: "Jejum às sextas",
    description: "Viva uma pequena penitência semanal em união com a Paixão do Senhor.",
    icon: "🍞",
    type: "Semanal",
  },
  {
    title: "Confissão frequente",
    description: "Busque com regularidade o sacramento da reconciliação como parte da vida espiritual.",
    icon: "🙏",
    type: "Mensal",
  },
] as const

const monthNames = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
]

function getSaintOfTheDay() {
  const today = new Date()
  const day = String(today.getDate()).padStart(2, "0")
  const month = String(today.getMonth() + 1).padStart(2, "0")

  return santos.find((santo) => santo.dia === day && santo.mes === month) ?? santos[0]
}

function formatDate(dia: string, mes: string) {
  return `${Number(dia)} de ${monthNames[Number(mes) - 1]}`
}

export default function RotinaPage() {
  const santoDoDia = getSaintOfTheDay()

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-16 md:px-6 lg:px-10 lg:py-24">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <Badge variant="outline" className="rounded-full px-3 py-1 text-xs tracking-[0.18em] uppercase">
          Vida espiritual
        </Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Rotina Católica
        </h1>
        <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          Sugestões simples para incorporar a fé ao dia a dia e acompanhar o santo celebrado hoje.
        </p>
      </header>

      <section className="grid gap-8 rounded-[2rem] border border-border/70 bg-card/70 p-5 md:p-8 lg:grid-cols-[1.05fr_1.35fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-muted">
          {santoDoDia.imagem ? (
            <SantoImage
              src={santoDoDia.imagem}
              alt={santoDoDia.nome}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          ) : (
            <Image
              src="/placeholder.svg"
              alt={santoDoDia.nome}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div className="space-y-3">
            <Badge variant="secondary" className="w-fit">
              Santo do dia
            </Badge>
            <p className="text-sm text-muted-foreground">
              {formatDate(santoDoDia.dia, santoDoDia.mes)}
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight">
              {santoDoDia.nome}
            </h2>
          </div>

          <p className="text-base leading-8 text-muted-foreground">{santoDoDia.sobre}</p>

          <blockquote className="rounded-3xl border-l-4 border-primary bg-muted/50 px-5 py-4 text-base italic leading-8 text-muted-foreground">
            {santoDoDia.oracao}
          </blockquote>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/santos">Ver calendário de santos</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      <section className="space-y-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight">
            Dicas para sua rotina
          </h2>
          <p className="text-muted-foreground">
            Pequenos hábitos de oração, leitura e disciplina espiritual ajudam a sustentar a vida interior.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {routineTips.map((tip) => (
            <Card key={tip.title} className="h-full">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <CardTitle>{tip.title}</CardTitle>
                </div>
                <Badge variant="outline" className="w-fit">
                  {tip.type}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
