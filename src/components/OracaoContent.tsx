import Image from "next/image"
import ReactMarkdown from "react-markdown"

import { ShareButtons } from "@/components/ShareButtons"
import { Badge } from "@/components/ui/badge"
import type { Oracao } from "@/data/oracoes"

type OracaoContentProps = {
  oracao: Oracao
}

export function OracaoContent({ oracao }: OracaoContentProps) {
  const words = oracao.content.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 150))

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Badge className="text-sm">{oracao.category}</Badge>
        <span className="text-sm text-muted-foreground">{minutes} min de leitura</span>
      </div>

      <h1 className="mb-8 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        {oracao.title}
      </h1>

      {oracao.imageUrl ? (
        <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border/70 bg-muted">
          <Image
            src={oracao.imageUrl}
            alt={oracao.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1200px) 100vw, 960px"
          />
        </div>
      ) : null}

      <div className="prose prose-stone max-w-none leading-8 dark:prose-invert">
        <ReactMarkdown>{oracao.content}</ReactMarkdown>
      </div>

      <ShareButtons title={oracao.title} />
    </>
  )
}
