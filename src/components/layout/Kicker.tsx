import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type KickerProps = {
  children: ReactNode
  className?: string
  /** "line": traço na cor litúrgica antes do texto; "accent": texto na cor litúrgica. */
  variant?: "line" | "accent"
}

/** Rótulo em monoespaçada que abre seções e cabeçalhos. */
export function Kicker({ children, className, variant = "line" }: KickerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em]",
        variant === "accent" ? "text-liturgical-ink" : "text-muted-foreground",
        className,
      )}
    >
      {variant === "line" ? <span aria-hidden className="h-px w-7 shrink-0 bg-liturgical" /> : null}
      <span>{children}</span>
    </div>
  )
}
