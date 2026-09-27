"use client"

import { useState } from "react"

import { Container } from "@/components/layout/Container"
import { PrefetchLink } from "@/components/PrefetchLink"
import type { RosarioMystery } from "@/data/rosario"
import { cn } from "@/lib/utils"

const romanNumerals = ["I", "II", "III", "IV", "V"]

type RosarioSectionProps = {
  mysteries: readonly RosarioMystery[]
  todayId: string
  weekdayLabel: string
}

function shortName(nome: string) {
  return nome.replace(/^Mistérios\s+/i, "")
}

export function RosarioSection({ mysteries, todayId, weekdayLabel }: RosarioSectionProps) {
  const [selectedId, setSelectedId] = useState(todayId)
  const [activeIndex, setActiveIndex] = useState(0)
  const selected = mysteries.find((mystery) => mystery.id === selectedId) ?? mysteries[0]

  return (
    <section id="rosario" className="bg-foreground text-background transition-colors duration-500">
      <Container className="section-y grid gap-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-2">
        <div className="flex flex-col gap-7">
          <div className="font-mono text-xs tracking-[0.08em] uppercase opacity-70">
            Santo Rosário <span aria-hidden>·</span> {weekdayLabel}
          </div>
          <h2 className="text-display text-[clamp(3rem,6vw,5.25rem)] leading-[0.95]">
            Mistérios <em>{shortName(selected.nome)}</em>
          </h2>

          <div role="group" aria-label="Conjuntos de mistérios" className="flex flex-wrap gap-2">
            {mysteries.map((mystery) => {
              const isSelected = mystery.id === selected.id
              return (
                <button
                  key={mystery.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedId(mystery.id)
                    setActiveIndex(0)
                  }}
                  className={cn(
                    "h-10 rounded-full border px-4 text-sm",
                    isSelected
                      ? "border-background bg-background text-foreground"
                      : "border-background/25 hover:border-background/60",
                  )}
                >
                  {shortName(mystery.nome)}
                </button>
              )
            })}
          </div>

          <p className="max-w-md leading-relaxed text-pretty opacity-75">
            {selected.descricao} {selected.dias}.
          </p>

          <PrefetchLink
            href={`/rosario/${selected.id}`}
            className="inline-flex h-[52px] items-center self-start rounded-full bg-liturgical px-[26px] text-[15px] font-semibold text-white hover:opacity-90"
          >
            Rezar {selected.nome.toLowerCase()}
          </PrefetchLink>
        </div>

        <ol className="flex flex-col">
          {selected.misteriosDetalhados.map((mystery, index) => {
            const isActive = index === activeIndex
            return (
              <li key={mystery.titulo}>
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "grid w-full grid-cols-[3.5rem_1fr] items-start gap-4 border-t border-background/20 py-5 text-left sm:grid-cols-[3.5rem_1fr_auto]",
                    isActive ? "opacity-100" : "opacity-55 hover:opacity-80",
                  )}
                >
                  <span className="pt-2 font-mono text-[13px] opacity-60">{romanNumerals[index]}</span>
                  <span className="flex flex-col gap-2">
                    <span className="font-serif text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.15]">
                      {mystery.titulo}
                    </span>
                    {isActive ? (
                      <span className="max-w-md text-[15px] leading-relaxed opacity-75">
                        {mystery.descricao}
                      </span>
                    ) : null}
                  </span>
                  <span aria-hidden className="hidden gap-1 pt-3.5 sm:flex">
                    {Array.from({ length: 10 }, (_, bead) => (
                      <span
                        key={bead}
                        className={cn(
                          "size-[5px] rounded-full",
                          index < activeIndex || isActive ? "bg-liturgical" : "bg-background/25",
                        )}
                      />
                    ))}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
