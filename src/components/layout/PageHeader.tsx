import type { ReactNode } from "react"

import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"

type PageHeaderProps = {
  kicker: ReactNode
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
}

/** Cabeçalho editorial das páginas internas. */
export function PageHeader({ kicker, title, description, children }: PageHeaderProps) {
  return (
    <header className="border-b">
      <Container className="grid items-end gap-8 pt-[clamp(2rem,5vw,4rem)] pb-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-16">
        <div>
          <Kicker>{kicker}</Kicker>
          <h1 className="text-display mt-7 text-[clamp(3rem,7.5vw,6.5rem)]">{title}</h1>
        </div>
        {description || children ? (
          <div className="flex flex-col gap-4 lg:pb-3">
            {description ? (
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : null}
            {children}
          </div>
        ) : null}
      </Container>
    </header>
  )
}
