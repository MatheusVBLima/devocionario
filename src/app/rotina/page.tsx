import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Sun, BookOpen, Moon, Heart, UtensilsCrossed, HandHeart } from "lucide-react"

import { JsonLd } from "@/components/JsonLd"
import { SantoImage } from "@/components/SantoImage"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { santos } from "@/data/santos"
import { buildMetadata, buildWebPageSchema } from "@/lib/seo"

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
    icon: <Sun className="size-6 text-primary/70" />,
    type: "Diária",
  },
  {
    title: "Leitura espiritual",
    description: "Reserve alguns minutos para a leitura da Bíblia ou de um texto espiritual.",
    icon: <BookOpen className="size-6 text-primary/70" />,
    type: "Diária",
  },
  {
    title: "Exame de consciência",
    description: "Revise o dia diante de Deus e peça luz para continuar a caminhada.",
    icon: <Moon className="size-6 text-primary/70" />,
    type: "Diária",
  },
  {
    title: "Rosário",
    description: "Dedique tempo para rezar o Santo Rosário e contemplar os mistérios da vida de Cristo.",
    icon: <Heart className="size-6 text-primary/70" />,
    type: "Diária",
  },
  {
    title: "Jejum às sextas",
    description: "Viva uma pequena penitência semanal em união com a Paixão do Senhor.",
    icon: <UtensilsCrossed className="size-6 text-primary/70" />,
    type: "Semanal",
  },
  {
    title: "Confissão frequente",
    description: "Busque com regularidade o sacramento da reconciliação como parte da vida espiritual.",
    icon: <HandHeart className="size-6 text-primary/70" />,
    type: "Mensal",
  },
]

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
  const pageSchema = buildWebPageSchema({
    title: "Rotina católica",
    description:
      "Sugestões para incorporar a fé ao dia a dia, com destaque para o santo celebrado hoje.",
    pathname: "/rotina",
  })

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-20 md:px-6 lg:px-10 lg:py-32">
      <JsonLd data={pageSchema} />

      <header className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge 
          variant="secondary" 
          className="rounded-full px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm"
        >
          Vida espiritual
        </Badge>
        <h1 className="text-balance font-serif text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
          Rotina Católica
        </h1>
        <div className="my-2 h-px w-12 bg-border/50" />
        <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
          Sugestões simples para incorporar a fé ao dia a dia e acompanhar o santo celebrado hoje.
        </p>
      </header>

      <section className="grid gap-8 rounded-[2rem] border border-transparent bg-muted/30 p-5 transition-all duration-500 hover:bg-muted/50 md:p-8 lg:grid-cols-[1.05fr_1.35fr]">
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
            <Card
              key={tip.title}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-transparent bg-muted/30 p-2 transition-all duration-500 hover:bg-muted/50"
            >
              <CardHeader className="space-y-4 px-6 pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-background shadow-sm transition-colors duration-500 group-hover:bg-background/80">
                    {tip.icon}
                  </div>
                  <Badge variant="outline" className="border-border/50 bg-background/50">{tip.type}</Badge>
                </div>
                <CardTitle className="text-xl font-medium tracking-tight">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
