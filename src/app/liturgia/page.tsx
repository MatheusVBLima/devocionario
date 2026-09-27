import type { Metadata } from "next"
import { BookMarked } from "lucide-react"

import { AppEmptyState } from "@/components/AppEmptyState"
import { JsonLd } from "@/components/JsonLd"
import { Container } from "@/components/layout/Container"
import { PageHeader } from "@/components/layout/PageHeader"
import { LiturgiaTabs } from "@/components/liturgia/LiturgiaTabs"
import { formatLiturgiaDate, getLiturgiaDoDia, liturgiaWeekday } from "@/lib/liturgia"
import { buildMetadata, buildWebPageSchema } from "@/lib/seo"

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: "Liturgia diária",
  description:
    "Acompanhe as leituras, salmo, evangelho, orações e antífonas da liturgia diária.",
  pathname: "/liturgia",
})

export default async function LiturgiaPage() {
  const liturgia = await getLiturgiaDoDia()
  const pageSchema = buildWebPageSchema({
    title: "Liturgia diária",
    description:
      "Acompanhe as leituras, salmo, evangelho, orações e antífonas da liturgia diária.",
    pathname: "/liturgia",
  })

  return (
    <>
      <JsonLd data={pageSchema} />

      <PageHeader
        kicker="Leitura do dia"
        title="Liturgia Diária"
        description={
          liturgia
            ? undefined
            : "Acompanhe as leituras, o salmo e as orações do dia em uma interface pensada para leitura."
        }
      >
        {liturgia ? (
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">
              {formatLiturgiaDate(liturgia.data)} <span aria-hidden>·</span>{" "}
              {liturgiaWeekday(liturgia.data)}
            </p>
            <p className="font-serif text-3xl leading-tight text-balance">{liturgia.liturgia}</p>
            <p className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <span aria-hidden className="size-2.5 rounded-full bg-liturgical" />
              Cor litúrgica: {liturgia.cor}
            </p>
          </div>
        ) : null}
      </PageHeader>

      <Container className="section-y">
        {liturgia ? (
          <LiturgiaTabs liturgia={liturgia} />
        ) : (
          <AppEmptyState
            title="Liturgia indisponível no momento"
            description="Não foi possível carregar o conteúdo da liturgia diária agora. Tente novamente em instantes."
            actionHref="/liturgia"
            actionLabel="Tentar novamente"
            icon={BookMarked}
          />
        )}
      </Container>
    </>
  )
}
