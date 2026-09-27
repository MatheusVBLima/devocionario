"use client"

import { useEffect, useState } from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type RoutineTip = {
  title: string
  description: string
  type: string
}

type RoutineChecklistProps = {
  tips: RoutineTip[]
  /** Chave do dia (ex.: "2026-09-26"): as marcações recomeçam a cada dia. */
  dayKey: string
}

const STORAGE_PREFIX = "devocionario:rotina:"

export function RoutineChecklist({ tips, dayKey }: RoutineChecklistProps) {
  const [done, setDone] = useState<string[]>([])
  const storageKey = `${STORAGE_PREFIX}${dayKey}`

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey)
      if (saved) setDone(JSON.parse(saved))
    } catch {
      // Sem acesso ao armazenamento: a lista funciona só na sessão.
    }
  }, [storageKey])

  function toggle(title: string) {
    setDone((current) => {
      const next = current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        // Ignora falhas de armazenamento.
      }
      return next
    })
  }

  return (
    <ul className="grid gap-px border-t border-b border-t-foreground bg-border sm:grid-cols-2 lg:grid-cols-3">
      {tips.map((tip) => {
        const isDone = done.includes(tip.title)
        return (
          <li key={tip.title} className="bg-background">
            <button
              type="button"
              aria-pressed={isDone}
              onClick={() => toggle(tip.title)}
              className="flex h-full w-full flex-col gap-9 px-5 pt-5 pb-7 text-left hover:bg-card"
            >
              <span className="flex w-full items-center justify-between">
                <span className="font-mono text-[13px] text-muted-foreground">{tip.type}</span>
                <span
                  aria-hidden
                  className={cn(
                    "flex size-[18px] items-center justify-center rounded-full border border-liturgical transition-colors",
                    isDone && "bg-liturgical text-white",
                  )}
                >
                  {isDone ? <CheckIcon className="size-3" strokeWidth={3} /> : null}
                </span>
              </span>
              <span className="flex flex-col gap-2">
                <span
                  className={cn(
                    "font-serif text-[1.9rem] leading-none",
                    isDone && "text-muted-foreground line-through decoration-1",
                  )}
                >
                  {tip.title}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{tip.description}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
