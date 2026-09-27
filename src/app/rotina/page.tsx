import type { Metadata } from "next"

import { JsonLd } from "@/components/JsonLd"
import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
import { PageHeader } from "@/components/layout/PageHeader"
import { PrefetchLink } from "@/components/PrefetchLink"
import { RoutineChecklist } from "@/components/rotina/RoutineChecklist"
import { SaintPortrait } from "@/components/santos/SaintPortrait"
import { Button } from "@/components/ui/button"
import { formatDayMonth, todayInBrazil } from "@/lib/calendar"
import { getSantoDoDia } from "@/lib/santo-do-dia"
import { buildMetadata, buildWebPageSchema } from "@/lib/seo"

// O santo do dia muda à meia-noite: revalida a página ao longo do dia.
export const revalidate = 3600

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
    type: "Diária",
  },
  {
    title: "Leitura espiritual",
    description: "Reserve alguns minutos para a leitura da Bíblia ou de um texto espiritual.",
    type: "Diária",
  },
  {
    title: "Exame de consciência",
    description: "Revise o dia diante de Deus e peça luz para continuar a caminhada.",
    type: "Diária",
  },
  {
    title: "Rosário",
    description: "Dedique tempo para rezar o Santo Rosário e contemplar os mistérios da vida de Cristo.",
    type: "Diária",
  },
  {
    title: "Jejum às sextas",
    description: "Viva uma pequena penitência semanal em união com a Paixão do Senhor.",
    type: "Semanal",
  },
  {
    title: "Confissão frequente",
    description: "Busque com regularidade o sacramento da reconciliação como parte da vida espiritual.",
    type: "Mensal",
  },
]

export default function RotinaPage() {
  const today = todayInBrazil()
  const santoDoDia = getSantoDoDia(today)
  const dayKey = `${today.year}-${String(today.month).padStart(2, "0")}-${String(today.day).padStart(2, "0")}`
  const pageSchema = buildWebPageSchema({
    title: "Rotina católica",
    description:
      "Sugestões para incorporar a fé ao dia a dia, com destaque para o santo celebrado hoje.",
    pathname: "/rotina",
  })

  return (
    <>
      <JsonLd data={pageSchema} />

      <PageHeader
        kicker="Vida espiritual"
        title="Rotina Católica"
        description="Sugestões simples para incorporar a fé ao dia a dia e acompanhar o santo celebrado hoje."
      />

      <section className="border-b">
        <Container className="section-y grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SaintPortrait
            src={santoDoDia.imagem}
            alt={santoDoDia.nome}
            className="mx-auto max-w-[420px]"
          />

          <div className="flex flex-col gap-6">
            <Kicker variant="accent">Santo do dia</Kicker>
            <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
              {formatDayMonth(santoDoDia.dia, santoDoDia.mes)}
            </p>
            <h2 className="text-display text-[clamp(2.5rem,5vw,4.25rem)] leading-none">
              {santoDoDia.nome}
            </h2>
            <p className="leading-relaxed text-muted-foreground">{santoDoDia.sobre}</p>
            <blockquote className="border-t border-foreground pt-5 font-serif text-2xl leading-snug italic">
              {santoDoDia.oracao}
            </blockquote>
            <div>
              <Button asChild>
                <PrefetchLink href="/santos">Ver calendário de santos</PrefetchLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="section-y">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-display text-[clamp(2.5rem,5vw,4.25rem)] leading-none">
              Dicas para sua rotina
            </h2>
            <p className="max-w-sm leading-relaxed text-muted-foreground">
              Pequenos hábitos de oração, leitura e disciplina espiritual ajudam a sustentar a vida interior.
            </p>
          </div>

          <RoutineChecklist tips={routineTips} dayKey={dayKey} />
        </Container>
      </section>
    </>
  )
}
