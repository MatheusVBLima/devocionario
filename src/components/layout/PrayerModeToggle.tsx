"use client"

import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

/** Alterna entre o tema claro e o "modo oração" (escuro). */
export function PrayerModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[13px] whitespace-nowrap hover:border-liturgical",
        className,
      )}
    >
      <span aria-hidden className="size-2 rounded-full bg-liturgical" />
      <span className="dark:hidden">Modo oração</span>
      <span className="hidden dark:inline">Modo claro</span>
    </button>
  )
}
