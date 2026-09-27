"use client"

import type { ReactNode } from "react"

import { AppEmptyState } from "@/components/AppEmptyState"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getValidReading, hasText, splitVerses, type LiturgiaData } from "@/lib/liturgia"

type LiturgiaTabsProps = {
  liturgia: Pick<LiturgiaData, "oracoes" | "leituras" | "antifonas">
}

function VerseText({ text }: { text: string }) {
  return splitVerses(text).map((part, index) =>
    index % 2 === 1 ? (
      <sup key={index} className="mr-0.5 font-mono text-[0.6em] text-liturgical-ink">
        {part.replace(/\s+/g, "")}
      </sup>
    ) : (
      part
    ),
  )
}

function ReadingCard({
  title,
  description,
  text,
  response,
}: {
  title: string
  description?: string
  text: string
  response?: { primary: string; secondary: string }
}) {
  return (
    <article className="mx-auto max-w-[68ch]">
      <header className="mb-10 flex flex-col gap-3 border-b pb-8">
        <h2 className="text-display text-[clamp(2.5rem,5vw,4rem)] leading-none">{title}</h2>
        {description ? (
          <p className="font-serif text-xl text-balance text-muted-foreground italic">{description}</p>
        ) : null}
      </header>
      <div className="text-lg leading-[1.85] whitespace-pre-line sm:text-xl sm:leading-[1.85]">
        <VerseText text={text} />
      </div>
      {response ? (
        <div className="mt-10 flex flex-col gap-1 border-t pt-6 font-serif text-2xl text-liturgical-ink italic">
          <p>— {response.primary}</p>
          <p>— {response.secondary}</p>
        </div>
      ) : null}
    </article>
  )
}

function PrayerBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-t pt-6">
      <h3 className="font-mono text-xs tracking-[0.08em] text-liturgical-ink uppercase">{title}</h3>
      <div className="flex flex-col gap-4 text-lg leading-[1.85] sm:text-xl sm:leading-[1.85]">
        {children}
      </div>
    </section>
  )
}

function Unavailable({ title, description }: { title: string; description: string }) {
  return <AppEmptyState title={title} description={description} />
}

export function LiturgiaTabs({ liturgia }: LiturgiaTabsProps) {
  const primeiraLeitura = getValidReading(liturgia.leituras.primeiraLeitura)
  const salmo = getValidReading(liturgia.leituras.salmo)
  const segundaLeitura = getValidReading(liturgia.leituras.segundaLeitura)
  const evangelho = getValidReading(liturgia.leituras.evangelho)
  const extras = liturgia.oracoes.extras.filter((item) => hasText(item))
  const hasOracoes =
    hasText(liturgia.oracoes.coleta) ||
    hasText(liturgia.oracoes.oferendas) ||
    hasText(liturgia.oracoes.comunhao) ||
    extras.length > 0
  const hasAntifonas =
    hasText(liturgia.antifonas.entrada) || hasText(liturgia.antifonas.comunhao)

  return (
    <Tabs defaultValue="primeira" className="gap-14">
      <TabsList aria-label="Partes da liturgia" className="mx-auto justify-center">
        <TabsTrigger value="primeira">Primeira leitura</TabsTrigger>
        <TabsTrigger value="salmo">Salmo</TabsTrigger>
        <TabsTrigger value="segunda">Segunda leitura</TabsTrigger>
        <TabsTrigger value="evangelho">Evangelho</TabsTrigger>
        <TabsTrigger value="oracoes">Orações</TabsTrigger>
        <TabsTrigger value="antifonas">Antífonas</TabsTrigger>
      </TabsList>

      <TabsContent value="primeira">
        {primeiraLeitura ? (
          <ReadingCard
            title={primeiraLeitura.referencia}
            description={primeiraLeitura.titulo}
            text={primeiraLeitura.texto}
            response={{ primary: "Palavra do Senhor.", secondary: "Graças a Deus." }}
          />
        ) : (
          <Unavailable
            title="Primeira leitura indisponível"
            description="A primeira leitura não está disponível na liturgia de hoje."
          />
        )}
      </TabsContent>

      <TabsContent value="salmo">
        {salmo ? (
          <ReadingCard title={salmo.referencia} description={salmo.refrao} text={salmo.texto} />
        ) : (
          <Unavailable
            title="Salmo indisponível"
            description="O salmo não está disponível na liturgia de hoje."
          />
        )}
      </TabsContent>

      <TabsContent value="segunda">
        {segundaLeitura ? (
          <ReadingCard
            title={segundaLeitura.referencia}
            description={segundaLeitura.titulo}
            text={segundaLeitura.texto}
            response={{ primary: "Palavra do Senhor.", secondary: "Graças a Deus." }}
          />
        ) : (
          <Unavailable
            title="Segunda leitura indisponível"
            description="A segunda leitura não está disponível na liturgia de hoje."
          />
        )}
      </TabsContent>

      <TabsContent value="evangelho">
        {evangelho ? (
          <ReadingCard
            title={evangelho.referencia}
            description={evangelho.titulo}
            text={evangelho.texto}
            response={{ primary: "Palavra da Salvação.", secondary: "Glória a vós, Senhor." }}
          />
        ) : (
          <Unavailable
            title="Evangelho indisponível"
            description="O evangelho não está disponível na liturgia de hoje."
          />
        )}
      </TabsContent>

      <TabsContent value="oracoes">
        {hasOracoes ? (
          <article className="mx-auto flex max-w-[68ch] flex-col gap-10">
            <h2 className="text-display text-[clamp(2.5rem,5vw,4rem)] leading-none">Orações do dia</h2>
            {hasText(liturgia.oracoes.coleta) ? (
              <PrayerBlock title="Oração da coleta">
                <p>{liturgia.oracoes.coleta}</p>
              </PrayerBlock>
            ) : null}
            {hasText(liturgia.oracoes.oferendas) ? (
              <PrayerBlock title="Oração sobre as oferendas">
                <p>{liturgia.oracoes.oferendas}</p>
              </PrayerBlock>
            ) : null}
            {hasText(liturgia.oracoes.comunhao) ? (
              <PrayerBlock title="Oração depois da comunhão">
                <p>{liturgia.oracoes.comunhao}</p>
              </PrayerBlock>
            ) : null}
            {extras.length ? (
              <PrayerBlock title="Orações extras">
                {extras.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </PrayerBlock>
            ) : null}
          </article>
        ) : (
          <Unavailable
            title="Orações indisponíveis"
            description="As orações desta celebração não estão disponíveis na liturgia de hoje."
          />
        )}
      </TabsContent>

      <TabsContent value="antifonas">
        {hasAntifonas ? (
          <article className="mx-auto flex max-w-[68ch] flex-col gap-10">
            <h2 className="text-display text-[clamp(2.5rem,5vw,4rem)] leading-none">Antífonas</h2>
            {hasText(liturgia.antifonas.entrada) ? (
              <PrayerBlock title="Antífona de entrada">
                <p>{liturgia.antifonas.entrada}</p>
              </PrayerBlock>
            ) : null}
            {hasText(liturgia.antifonas.comunhao) ? (
              <PrayerBlock title="Antífona da comunhão">
                <p>{liturgia.antifonas.comunhao}</p>
              </PrayerBlock>
            ) : null}
          </article>
        ) : (
          <Unavailable
            title="Antífonas indisponíveis"
            description="As antífonas desta celebração não estão disponíveis na liturgia de hoje."
          />
        )}
      </TabsContent>
    </Tabs>
  )
}
