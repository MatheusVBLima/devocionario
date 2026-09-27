import { SantoImage } from "@/components/SantoImage"
import { cn } from "@/lib/utils"

type SaintPortraitProps = {
  src?: string | null
  alt: string
  className?: string
  sizes?: string
}

/** Imagem do santo em moldura de arco. */
export function SaintPortrait({
  src,
  alt,
  className,
  sizes = "(max-width: 1024px) 90vw, 420px",
}: SaintPortraitProps) {
  return (
    <div className={cn("arch relative aspect-[4/5] w-full overflow-hidden border bg-card", className)}>
      <SantoImage src={src} alt={alt} className="object-cover object-top" sizes={sizes} />
    </div>
  )
}
