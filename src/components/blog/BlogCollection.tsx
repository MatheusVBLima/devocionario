import Link from "next/link"
import { Newspaper } from "lucide-react"
import { AppEmptyState } from "@/components/AppEmptyState"
import { isIndexablePost, type BlogPost } from "@/data/blog"

export function BlogCollection({ items }: { items: BlogPost[] }) {
  return items.length ? <ul className="flex flex-col border-b">
    {items.map((post) => {
      const external = Boolean(post.externalUrl && !isIndexablePost(post))
      return <li key={post.id}>
        <Link href={external ? post.externalUrl! : `/blog/${post.id}`} prefetch={external ? false : undefined} className="group grid gap-x-10 gap-y-3 border-t py-8 md:grid-cols-[10rem_minmax(0,1.3fr)_minmax(0,1fr)]">
          <span className="flex flex-col gap-1 font-mono text-xs tracking-[0.08em] uppercase">
            <span className="text-liturgical-ink">{post.category}</span>
            {post.date ? <span className="text-muted-foreground">{post.date}</span> : null}
          </span>
          <h2 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] text-balance group-hover:text-liturgical-ink">{post.title}</h2>
          <span className="flex flex-col gap-3">
            {post.summary && isIndexablePost(post) ? <span className="line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">{post.summary}</span> : null}
            <span className="text-sm text-muted-foreground">Por <span className="font-medium text-foreground">{post.author}</span></span>
            <span className="text-sm font-medium">{external ? "Ler na fonte ↗" : "Ler artigo →"}</span>
          </span>
        </Link>
      </li>
    })}
  </ul> : <AppEmptyState title="Nenhum artigo encontrado" description="Ajuste a pesquisa ou escolha outra categoria." actionHref="/blog" actionLabel="Limpar filtros" icon={Newspaper} />
}
