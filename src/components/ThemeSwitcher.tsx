"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useTheme } from "next-themes"
import { useEffect, useState, useSyncExternalStore } from "react"
import { Check, ChevronDown, Monitor, Moon, Palette, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tempoThemes = [
  { id: "comum", name: "Tempo comum", description: "Verde · cotidiano da Igreja", swatch: "bg-emerald-600" },
  { id: "advento-quaresma", name: "Advento e Quaresma", description: "Roxo · espera e conversão", swatch: "bg-violet-700" },
  { id: "festas-solenidades", name: "Festas e solenidades", description: "Dourado · celebração", swatch: "bg-amber-500" },
  { id: "martires-pentecostes", name: "Mártires e Pentecostes", description: "Vermelho · testemunho e fogo", swatch: "bg-red-700" },
] as const

type TempoTheme = (typeof tempoThemes)[number]["id"]
const storageKey = "devocionario-tempo"
const subscribe = () => () => {}

function savedTempo(): TempoTheme {
  try {
    const value = window.localStorage.getItem(storageKey)
    return tempoThemes.find((item) => item.id === value)?.id ?? "comum"
  } catch {
    return "comum"
  }
}

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const [tempoTheme, setTempoTheme] = useState<TempoTheme>(() => typeof window === "undefined" ? "comum" : savedTempo())

  useEffect(() => {
    if (!mounted) return
    document.documentElement.dataset.tempo = tempoTheme
    try { window.localStorage.setItem(storageKey, tempoTheme) } catch { /* Preferência só na sessão. */ }
  }, [mounted, tempoTheme])

  if (!mounted) return <div aria-hidden className="h-9 w-[76px]" />

  const currentTempo = tempoThemes.find((item) => item.id === tempoTheme) ?? tempoThemes[0]
  const mode = theme === "dark" || theme === "light" ? theme : "system"
  const modeLabel = mode === "dark" ? "Escuro" : mode === "light" ? "Claro" : "Sistema"
  const ModeIcon = mode === "dark" ? Moon : mode === "light" ? Sun : Monitor

  return <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <Button variant="outline" size="sm" className="gap-1.5 border-border/70 bg-background/70 px-2.5" aria-label={`Tema: ${currentTempo.name}. Modo: ${modeLabel}`}>
        <span className={cn("size-2.5 rounded-full", currentTempo.swatch)} aria-hidden />
        <ModeIcon className="size-3.5 text-muted-foreground" aria-hidden />
        <ChevronDown className="size-3.5 text-muted-foreground" aria-hidden />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content align="end" sideOffset={8} className="z-[70] w-64 rounded-md border bg-popover p-1 text-popover-foreground shadow-lg">
        <DropdownMenu.Label className="flex items-center gap-2 px-2 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
          <Palette className="size-3.5" aria-hidden /> Aparência
        </DropdownMenu.Label>
        <DropdownMenu.RadioGroup value={mode} onValueChange={setTheme}>
          {([ ["light", "Claro", Sun], ["dark", "Escuro", Moon], ["system", "Sistema", Monitor] ] as const).map(([value, label, Icon]) =>
            <DropdownMenu.RadioItem key={value} value={value} className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none focus:bg-accent">
              <Icon className="size-4" aria-hidden /> {label}
              <DropdownMenu.ItemIndicator className="ml-auto"><Check className="size-3.5" aria-hidden /></DropdownMenu.ItemIndicator>
            </DropdownMenu.RadioItem>
          )}
        </DropdownMenu.RadioGroup>
        <DropdownMenu.Separator className="my-1 h-px bg-border" />
        <DropdownMenu.Label className="px-2 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Tempo litúrgico</DropdownMenu.Label>
        {tempoThemes.map((tempo) => <DropdownMenu.CheckboxItem
          key={tempo.id} checked={tempo.id === tempoTheme} onCheckedChange={() => setTempoTheme(tempo.id)}
          className="flex cursor-pointer items-start gap-2 rounded-sm px-2 py-2 text-sm outline-none focus:bg-accent"
        >
          <span className={cn("mt-1 size-2.5 shrink-0 rounded-full", tempo.swatch)} aria-hidden />
          <span className="flex min-w-0 flex-1 flex-col gap-0.5"><span>{tempo.name}</span><span className="text-xs text-muted-foreground">{tempo.description}</span></span>
          <DropdownMenu.ItemIndicator><Check className="size-3.5" aria-hidden /></DropdownMenu.ItemIndicator>
        </DropdownMenu.CheckboxItem>)}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
}
