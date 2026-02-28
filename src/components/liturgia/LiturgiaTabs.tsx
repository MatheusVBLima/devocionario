"use client"

import { useState } from "react"

import { AppEmptyState } from "@/components/AppEmptyState"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type LiturgiaLeitura = {
  referencia: string
  titulo?: string
  refrao?: string
  texto: string
}

type LiturgiaData = {
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

type LiturgiaTabsProps = {
  liturgia: LiturgiaData
}

function hasText(value?: string | null) {
  return Boolean(value?.trim())
}

function getValidReading(readings: LiturgiaLeitura[]) {
  return readings.find(
    (reading) =>
      hasText(reading.referencia) ||
      hasText(reading.titulo) ||
      hasText(reading.refrao) ||
      hasText(reading.texto)
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
    <div className="mx-auto max-w-prose rounded-[2rem] border border-transparent bg-muted/30 px-6 py-10 transition-all duration-500 hover:bg-muted/50 sm:px-12 sm:py-14">
      <div className="mb-8 text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        {description ? <p className="mt-2 text-lg italic text-muted-foreground">{description}</p> : null}
        <div className="mx-auto mt-8 h-px w-16 bg-border/50" />
      </div>
      <div className="mb-10 whitespace-pre-line text-lg leading-loose text-foreground sm:text-xl sm:leading-loose">
        {text}
      </div>
      {response ? (
        <div className="flex flex-col items-center gap-2 text-center text-lg italic text-red-700/80 dark:text-red-400/80 sm:text-xl">
          <p>— {response.primary}</p>
          <p className="font-semibold">— {response.secondary}</p>
        </div>
      ) : null}
    </div>
  )
}

export function LiturgiaTabs({ liturgia }: LiturgiaTabsProps) {
  const [activeTab, setActiveTab] = useState("primeira")

  const primeiraLeitura = getValidReading(liturgia.leituras.primeiraLeitura)
  const salmo = getValidReading(liturgia.leituras.salmo)
  const segundaLeitura = getValidReading(liturgia.leituras.segundaLeitura)
  const evangelho = getValidReading(liturgia.leituras.evangelho)
  const hasOracoes =
    hasText(liturgia.oracoes.coleta) ||
    hasText(liturgia.oracoes.oferendas) ||
    hasText(liturgia.oracoes.comunhao) ||
    liturgia.oracoes.extras.some((item) => hasText(item))
  const hasAntifonas =
    hasText(liturgia.antifonas.entrada) || hasText(liturgia.antifonas.comunhao)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <div className="block md:hidden">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma leitura" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primeira">Primeira leitura</SelectItem>
            <SelectItem value="salmo">Salmo</SelectItem>
            <SelectItem value="segunda">Segunda leitura</SelectItem>
            <SelectItem value="evangelho">Evangelho</SelectItem>
            <SelectItem value="oracoes">Orações</SelectItem>
            <SelectItem value="antifonas">Antífonas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TabsList className="hidden h-auto w-full grid-cols-6 md:grid">
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
            response={{
              primary: "Palavra do Senhor.",
              secondary: "Graças a Deus.",
            }}
          />
        ) : (
          <AppEmptyState
            title="Primeira leitura indisponível"
            description="A primeira leitura não está disponível na liturgia de hoje."
            className="border border-dashed border-border/80 bg-muted/20 py-12"
          />
        )}
      </TabsContent>

      <TabsContent value="salmo">
        {salmo ? (
          <ReadingCard
            title={salmo.referencia}
            description={salmo.refrao}
            text={salmo.texto}
          />
        ) : (
          <AppEmptyState
            title="Salmo indisponível"
            description="O salmo não está disponível na liturgia de hoje."
            className="border border-dashed border-border/80 bg-muted/20 py-12"
          />
        )}
      </TabsContent>

      <TabsContent value="segunda">
        {segundaLeitura ? (
          <ReadingCard
            title={segundaLeitura.referencia}
            description={segundaLeitura.titulo}
            text={segundaLeitura.texto}
            response={{
              primary: "Palavra do Senhor.",
              secondary: "Graças a Deus.",
            }}
          />
        ) : (
          <AppEmptyState
            title="Segunda leitura indisponível"
            description="A segunda leitura não está disponível na liturgia de hoje."
            className="border border-dashed border-border/80 bg-muted/20 py-12"
          />
        )}
      </TabsContent>

      <TabsContent value="evangelho">
        {evangelho ? (
          <ReadingCard
            title={evangelho.referencia}
            description={evangelho.titulo}
            text={evangelho.texto}
            response={{
              primary: "Palavra da Salvação.",
              secondary: "Glória a vós, Senhor.",
            }}
          />
        ) : (
          <AppEmptyState
            title="Evangelho indisponível"
            description="O evangelho não está disponível na liturgia de hoje."
            className="border border-dashed border-border/80 bg-muted/20 py-12"
          />
        )}
      </TabsContent>

      <TabsContent value="oracoes">
        {hasOracoes ? (
          <div className="mx-auto max-w-prose rounded-[2rem] border border-transparent bg-muted/30 px-6 py-10 transition-all duration-500 hover:bg-muted/50 sm:px-12 sm:py-14">
            <div className="mb-12 text-center">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Orações do dia
              </h2>
              <div className="mx-auto mt-8 h-px w-16 bg-border/50" />
            </div>
            <div className="space-y-12 text-lg leading-loose sm:text-xl sm:leading-loose">
              {hasText(liturgia.oracoes.coleta) ? (
                <div>
                  <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-red-700/80 dark:text-red-400/80">
                    Oração da coleta
                  </h3>
                  <p className="text-foreground">{liturgia.oracoes.coleta}</p>
                </div>
              ) : null}
              {hasText(liturgia.oracoes.oferendas) ? (
                <div>
                  <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-red-700/80 dark:text-red-400/80">
                    Oração sobre as oferendas
                  </h3>
                  <p className="text-foreground">{liturgia.oracoes.oferendas}</p>
                </div>
              ) : null}
              {hasText(liturgia.oracoes.comunhao) ? (
                <div>
                  <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-red-700/80 dark:text-red-400/80">
                    Oração depois da comunhão
                  </h3>
                  <p className="text-foreground">{liturgia.oracoes.comunhao}</p>
                </div>
              ) : null}
              {liturgia.oracoes.extras.some((item) => hasText(item)) ? (
                <div>
                  <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-red-700/80 dark:text-red-400/80">
                    Orações extras
                  </h3>
                  <div className="space-y-4 text-foreground">
                    {liturgia.oracoes.extras
                      .filter((item) => hasText(item))
                      .map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <AppEmptyState
            title="Orações indisponíveis"
            description="As orações desta celebração não estão disponíveis na liturgia de hoje."
            className="border border-dashed border-border/80 bg-muted/20 py-12"
          />
        )}
      </TabsContent>

      <TabsContent value="antifonas">
        {hasAntifonas ? (
          <div className="mx-auto max-w-prose rounded-[2rem] border border-transparent bg-muted/30 px-6 py-10 transition-all duration-500 hover:bg-muted/50 sm:px-12 sm:py-14">
            <div className="mb-12 text-center">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Antífonas
              </h2>
              <div className="mx-auto mt-8 h-px w-16 bg-border/50" />
            </div>
            <div className="space-y-12 text-lg leading-loose sm:text-xl sm:leading-loose">
              {hasText(liturgia.antifonas.entrada) ? (
                <div>
                  <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-red-700/80 dark:text-red-400/80">
                    Antífona de entrada
                  </h3>
                  <p className="text-foreground">{liturgia.antifonas.entrada}</p>
                </div>
              ) : null}
              {hasText(liturgia.antifonas.comunhao) ? (
                <div>
                  <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-red-700/80 dark:text-red-400/80">
                    Antífona da comunhão
                  </h3>
                  <p className="text-foreground">{liturgia.antifonas.comunhao}</p>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <AppEmptyState
            title="Antífonas indisponíveis"
            description="As antífonas desta celebração não estão disponíveis na liturgia de hoje."
            className="border border-dashed border-border/80 bg-muted/20 py-12"
          />
        )}
      </TabsContent>
    </Tabs>
  )
}
