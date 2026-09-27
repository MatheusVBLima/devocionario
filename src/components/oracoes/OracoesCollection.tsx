import Image from "next/image"
import { HandHeart } from "lucide-react"
import { AppEmptyState } from "@/components/AppEmptyState"
import { PrefetchLink } from "@/components/PrefetchLink"
import type { Oracao } from "@/data/oracoes"

export function OracoesCollection({ items }: { items: Oracao[] }) {
  return items.length ? <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
    {items.map((oracao) => <li key={oracao.id}>
      <PrefetchLink href={`/oracoes/${oracao.id}`} className="group flex h-full flex-col gap-4 border-t border-foreground pt-5">
        {oracao.imageUrl ? <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-card">
          <Image src={oracao.imageUrl} alt={oracao.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px" />
        </div> : null}
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.08em] uppercase">
          <span className="text-liturgical-ink">{oracao.category}</span><span aria-hidden className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{Math.max(1, Math.ceil(oracao.content.split(/\s+/).length / 150))} min</span>
        </span>
        <h2 className="line-clamp-2 font-serif text-[1.9rem] leading-[1.05] group-hover:text-liturgical-ink">{oracao.title}</h2>
        <p className="line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">{oracao.content.replace(/\n/g, " ").replace(/\*\*/g, "")}</p>
        <span className="mt-auto text-sm font-medium">Ver oração →</span>
      </PrefetchLink>
    </li>)}
  </ul> : <AppEmptyState title="Nenhuma oração encontrada" description="Tente outra busca ou selecione uma categoria diferente." actionHref="/oracoes" actionLabel="Limpar filtros" icon={HandHeart} />
}
