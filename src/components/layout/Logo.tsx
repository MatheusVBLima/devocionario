import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  size?: "md" | "sm"
}

/** Marca do Devocionário: símbolo + nome em serifa e o ponto na cor litúrgica. */
export function Logo({ className, size = "md" }: LogoProps) {
  const iconHeight = size === "md" ? 34 : 28
  const iconWidth = Math.round((iconHeight * 28) / 57)

  return (
    <Link
      href="/"
      aria-label="Devocionário — página inicial"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={iconWidth}
        height={iconHeight}
        priority
        className="dark:hidden"
      />
      <Image
        src="/logo-white.svg"
        alt=""
        width={iconWidth}
        height={iconHeight}
        priority
        className="hidden dark:block"
      />
      <span
        className={cn(
          "font-serif leading-none tracking-[-0.01em]",
          size === "md" ? "text-[30px]" : "text-[22px]",
        )}
      >
        Devocionário
      </span>
      <span aria-hidden className="size-[7px] self-end rounded-full bg-liturgical mb-1.5" />
    </Link>
  )
}
