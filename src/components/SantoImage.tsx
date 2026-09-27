"use client"

import Image from "next/image"
import { useState } from "react"

interface SantoImageProps {
  src?: string | null
  alt: string
  className?: string
  sizes?: string
}

function initialsOf(name: string) {
  return name
    .replace(/^(São|Santa|Santo|Santos|Beato|Beata|Nossa Senhora)\s+/i, "")
    .trim()
    .charAt(0)
    .toUpperCase()
}

/** Imagem do santo com fallback tipográfico quando a imagem falta ou não carrega. */
export function SantoImage({ src, alt, className, sizes }: SantoImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  if (!src || src.startsWith("/placeholder") || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex items-center justify-center bg-card font-serif text-[clamp(4rem,10vw,7rem)] text-liturgical-ink/70 italic"
      >
        {initialsOf(alt)}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className || "object-cover"}
      sizes={sizes ?? "(max-width: 1024px) 100vw, 33vw"}
      onError={() => setFailedSrc(src)}
    />
  )
}
