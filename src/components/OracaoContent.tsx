import Image from "next/image"
import ReactMarkdown from "react-markdown"

import { Kicker } from "@/components/layout/Kicker"
import { ShareButtons } from "@/components/ShareButtons"
import type { Oracao } from "@/data/oracoes"

type OracaoContentProps = {
  oracao: Oracao
}

export function OracaoContent({ oracao }: OracaoContentProps) {
  const words = oracao.content.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 150))

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-7">
        <Kicker>
          {oracao.category} <span aria-hidden>·</span> {minutes} min de leitura
        </Kicker>
        <h1 className="text-display text-[clamp(2.75rem,6.5vw,5.5rem)]">{oracao.title}</h1>
      </header>

      {oracao.imageUrl ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border bg-card">
          <Image
            src={oracao.imageUrl}
            alt={oracao.title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 900px) 100vw, 820px"
          />
        </div>
      ) : null}

      <div className="prose prose-lg max-w-none sm:prose-xl">
        <ReactMarkdown>{oracao.content}</ReactMarkdown>
      </div>

      <ShareButtons title={oracao.title} />
    </article>
  )
}
