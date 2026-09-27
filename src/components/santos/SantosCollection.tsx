import { Church } from "lucide-react"
import { AppEmptyState } from "@/components/AppEmptyState"
import { PrefetchLink } from "@/components/PrefetchLink"
import { SantoImage } from "@/components/SantoImage"
import type { santo } from "@/data/santos"

type Month = { value: string; label: string }

export function SantosCollection({ items, months }: { items: santo[]; months: Month[] }) {
  return items.length ? <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
    {items.map((santo) => <li key={santo.id}>
      <PrefetchLink href={`/santos/${santo.id}`} className="group flex h-full flex-col gap-4 border-t border-foreground pt-5">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-card">
          <SantoImage src={santo.imagem} alt={santo.nome} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px" />
        </div>
        <span className="font-mono text-xs tracking-[0.08em] text-liturgical-ink uppercase">{Number(santo.dia)} de {months.find((item) => item.value === santo.mes)?.label ?? santo.mes}</span>
        <h2 className="line-clamp-2 font-serif text-[1.9rem] leading-[1.05] group-hover:text-liturgical-ink">{santo.nome}</h2>
        <p className="line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">{santo.sobre}</p>
        <span className="mt-auto text-sm font-medium">Ver detalhes →</span>
      </PrefetchLink>
    </li>)}
  </ul> : <AppEmptyState title="Nenhum santo encontrado" description="Tente outro nome ou selecione um mês diferente." actionHref="/santos" actionLabel="Limpar filtros" icon={Church} />
}
