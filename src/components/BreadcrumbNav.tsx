import Link from "next/link"
import { Fragment } from "react"

import { Container } from "@/components/layout/Container"

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbNavProps = {
  items: BreadcrumbItem[]
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const trail: BreadcrumbItem[] = [{ label: "Início", href: "/" }, ...items]

  return (
    <nav aria-label="Trilha de navegação" className="border-b">
      <Container>
        <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 py-4 font-mono text-xs tracking-[0.06em] text-muted-foreground uppercase">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1
            return (
              <Fragment key={`${item.label}-${index}`}>
                <li className={isLast ? "line-clamp-1 text-foreground" : undefined}>
                  {item.href && !isLast ? (
                    <Link href={item.href} className="hover:text-liturgical-ink">
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
                  )}
                </li>
                {!isLast ? (
                  <li aria-hidden className="text-border">
                    /
                  </li>
                ) : null}
              </Fragment>
            )
          })}
        </ol>
      </Container>
    </nav>
  )
}
