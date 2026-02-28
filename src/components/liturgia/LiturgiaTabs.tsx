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
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription className="italic">{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <div className="mb-6 whitespace-pre-line leading-8 text-foreground">{text}</div>
        {response ? (
          <div className="font-medium text-primary">
            <p>{response.primary}</p>
            <p className="text-muted-foreground">{response.secondary}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
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
            <SelectItem value="oracoes">Oracoes</SelectItem>
            <SelectItem value="antifonas">Antifonas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TabsList className="hidden h-auto w-full grid-cols-6 md:grid">
        <TabsTrigger value="primeira">Primeira leitura</TabsTrigger>
        <TabsTrigger value="salmo">Salmo</TabsTrigger>
        <TabsTrigger value="segunda">Segunda leitura</TabsTrigger>
        <TabsTrigger value="evangelho">Evangelho</TabsTrigger>
        <TabsTrigger value="oracoes">Oracoes</TabsTrigger>
        <TabsTrigger value="antifonas">Antifonas</TabsTrigger>
      </TabsList>

      <TabsContent value="primeira">
        {primeiraLeitura ? (
          <ReadingCard
            title={primeiraLeitura.referencia}
            description={primeiraLeitura.titulo}
            text={primeiraLeitura.texto}
            response={{
              primary: "Palavra do Senhor.",
              secondary: "Gracas a Deus.",
            }}
          />
        ) : (
          <AppEmptyState
            title="Primeira leitura indisponivel"
            description="A primeira leitura nao esta disponivel na liturgia de hoje."
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
            title="Salmo indisponivel"
            description="O salmo nao esta disponivel na liturgia de hoje."
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
              secondary: "Gracas a Deus.",
            }}
          />
        ) : (
          <AppEmptyState
            title="Segunda leitura indisponivel"
            description="A segunda leitura nao esta disponivel na liturgia de hoje."
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
              primary: "Palavra da Salvacao.",
              secondary: "Gloria a vos, Senhor.",
            }}
          />
        ) : (
          <AppEmptyState
            title="Evangelho indisponivel"
            description="O evangelho nao esta disponivel na liturgia de hoje."
            className="border border-dashed border-border/80 bg-muted/20 py-12"
          />
        )}
      </TabsContent>

      <TabsContent value="oracoes">
        {hasOracoes ? (
          <Card>
            <CardHeader>
              <CardTitle>Oracoes do dia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 leading-8">
              {hasText(liturgia.oracoes.coleta) ? (
                <div>
                  <h3 className="font-semibold">Oracao da coleta</h3>
                  <p className="text-muted-foreground">{liturgia.oracoes.coleta}</p>
                </div>
              ) : null}
              {hasText(liturgia.oracoes.oferendas) ? (
                <div>
                  <h3 className="font-semibold">Oracao sobre as oferendas</h3>
                  <p className="text-muted-foreground">{liturgia.oracoes.oferendas}</p>
                </div>
              ) : null}
              {hasText(liturgia.oracoes.comunhao) ? (
                <div>
                  <h3 className="font-semibold">Oracao depois da comunhao</h3>
                  <p className="text-muted-foreground">{liturgia.oracoes.comunhao}</p>
                </div>
              ) : null}
              {liturgia.oracoes.extras.some((item) => hasText(item)) ? (
                <div>
                  <h3 className="font-semibold">Oracoes extras</h3>
                  <div className="space-y-2 text-muted-foreground">
                    {liturgia.oracoes.extras
                      .filter((item) => hasText(item))
                      .map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ) : (
          <AppEmptyState
            title="Oracoes indisponiveis"
            description="As oracoes desta celebracao nao estao disponiveis na liturgia de hoje."
            className="border border-dashed border-border/80 bg-muted/20 py-12"
          />
        )}
      </TabsContent>

      <TabsContent value="antifonas">
        {hasAntifonas ? (
          <Card>
            <CardHeader>
              <CardTitle>Antifonas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 leading-8">
              {hasText(liturgia.antifonas.entrada) ? (
                <div>
                  <h3 className="font-semibold">Antifona de entrada</h3>
                  <p className="text-muted-foreground">{liturgia.antifonas.entrada}</p>
                </div>
              ) : null}
              {hasText(liturgia.antifonas.comunhao) ? (
                <div>
                  <h3 className="font-semibold">Antifona da comunhao</h3>
                  <p className="text-muted-foreground">{liturgia.antifonas.comunhao}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ) : (
          <AppEmptyState
            title="Antifonas indisponiveis"
            description="As antifonas desta celebracao nao estao disponiveis na liturgia de hoje."
            className="border border-dashed border-border/80 bg-muted/20 py-12"
          />
        )}
      </TabsContent>
    </Tabs>
  )
}
