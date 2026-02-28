"use client"

import Link, { type LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import type { ComponentProps } from "react"
import { startTransition } from "react"

type PrefetchLinkProps = LinkProps &
  Omit<ComponentProps<typeof Link>, keyof LinkProps> & {
    href: string
  }

export function PrefetchLink({ href, onMouseEnter, onFocus, ...props }: PrefetchLinkProps) {
  const router = useRouter()

  const prefetch = () => {
    startTransition(() => {
      router.prefetch(href)
    })
  }

  return (
    <Link
      href={href}
      onMouseEnter={(event) => {
        prefetch()
        onMouseEnter?.(event)
      }}
      onFocus={(event) => {
        prefetch()
        onFocus?.(event)
      }}
      {...props}
    />
  )
}
