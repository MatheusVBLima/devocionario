import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type Props = {
  className?: string
  children: ReactNode
}

export function Wrapper({ className, children }: Props) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-10", className)}>
      {children}
    </div>
  )
}
