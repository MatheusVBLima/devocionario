import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
import { PrefetchLink } from "@/components/PrefetchLink"
import { excerptOf, getValidReading, type LiturgiaData } from "@/lib/liturgia"

type LiturgiaHojeSectionProps = {
  liturgia: LiturgiaData
}

export function LiturgiaHojeSection({ liturgia }: LiturgiaHojeSectionProps) {
  const readings = [
    { label: "Primeira leitura", reading: getValidReading(liturgia.leituras.primeiraLeitura) },
    { label: "Salmo", reading: getValidReading(liturgia.leituras.salmo) },
    { label: "Segunda leitura", reading: getValidReading(liturgia.leituras.segundaLeitura) },
    { label: "Evangelho", reading: getValidReading(liturgia.leituras.evangelho) },
  ].filter((item) => item.reading?.referencia)

  const evangelho = getValidReading(liturgia.leituras.evangelho)
  const quote = evangelho?.texto ? excerptOf(evangelho.texto) : null

  return (
    <section id="hoje" className="border-y">
      <Container className="section-y grid gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-3">
        <div className="flex flex-col gap-7">
          <Kicker variant="accent">Liturgia Diária</Kicker>
          <ul className="flex flex-col">
            {readings.map(({ label, reading }) => (
              <li key={label}>
                <PrefetchLink
                  href="/liturgia"
                  className="grid grid-cols-[8.5rem_1fr] gap-3 border-t py-3.5 hover:text-liturgical-ink"
                >
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="font-medium">{reading?.referencia}</span>
                </PrefetchLink>
              </li>
            ))}
          </ul>
          <p className="border-t pt-3.5 text-sm text-muted-foreground">
            {liturgia.liturgia} <span aria-hidden>·</span> Cor litúrgica: {liturgia.cor}
          </p>
        </div>

        {quote ? (
          <blockquote className="flex flex-col justify-between gap-8 lg:col-span-2">
            <p className="font-serif text-[clamp(2.1rem,4.4vw,3.75rem)] leading-[1.08] tracking-[-0.015em] text-balance">
              <span className="text-liturgical-ink">“</span>
              {quote}
              <span className="text-liturgical-ink">”</span>
            </p>
            <footer className="flex flex-wrap items-center justify-between gap-4">
              <cite className="font-mono text-[13px] text-muted-foreground not-italic">
                {evangelho?.referencia}
              </cite>
              <PrefetchLink
                href="/liturgia"
                className="border-b border-current pb-0.5 text-[15px] font-semibold hover:text-liturgical-ink"
              >
                Ver a liturgia diária
              </PrefetchLink>
            </footer>
          </blockquote>
        ) : null}
      </Container>
    </section>
  )
}
