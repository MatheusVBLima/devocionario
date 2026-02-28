import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { BookOpenText } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

type AppEmptyStateProps = {
  title: string
  description: string
  actionHref?: string
  actionLabel?: string
  icon?: LucideIcon
  className?: string
}

export function AppEmptyState({
  title,
  description,
  actionHref,
  actionLabel,
  icon: Icon = BookOpenText,
  className,
}: AppEmptyStateProps) {
  return (
    <Empty className={className ?? "border border-dashed border-border/80 bg-muted/20"}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon className="size-5" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {actionHref && actionLabel ? (
        <EmptyContent>
          <Button asChild variant="outline">
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  )
}
