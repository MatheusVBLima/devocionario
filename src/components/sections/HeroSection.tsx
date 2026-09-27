import Image from "next/image"

import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
import { PrefetchLink } from "@/components/PrefetchLink"
import { Button } from "@/components/ui/button"
import type { santo } from "@/data/santos"

type HeroSectionProps = {
  dateLabel: string
  santoDoDia: santo
}

export function HeroSection({ dateLabel, santoDoDia }: HeroSectionProps) {
  return (
    <section>
      <Container className="grid items-end gap-[clamp(2.25rem,5vw,4.5rem)] pt-[clamp(1.75rem,5vw,4rem)] pb-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        <div>
          <Kicker>
            Portal católico <span aria-hidden>·</span> {dateLabel}
          </Kicker>
          <h1 className="text-display my-7 text-[clamp(2.75rem,5.4vw,5rem)]">
            Um lugar simples para rezar, ler e acompanhar a vida da Igreja{" "}
            <em className="text-liturgical-ink transition-colors duration-500">todos os dias.</em>
          </h1>
          <p className="mb-9 max-w-[34rem] text-lg leading-relaxed text-pretty text-muted-foreground">
            Encontre orações, liturgia diária, calendário dos santos e conteúdos organizados para uma leitura calma e direta.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <PrefetchLink href="/rosario">Rezar o Santo Rosário</PrefetchLink>
            </Button>
            <Button asChild size="lg" variant="outline">
              <PrefetchLink href="/liturgia">Ver a liturgia diária</PrefetchLink>
            </Button>
          </div>
        </div>

        <figure className="mx-auto flex w-full max-w-[420px] flex-col gap-4 lg:mr-0">
          <div className="arch relative aspect-[4/5] overflow-hidden border bg-card">
            <Image
              src="/hero-virgem-em-oracao.jpg"
              alt="A Virgem em oração, pintura de Sassoferrato"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 420px"
            />
          </div>
          <figcaption className="flex items-end justify-between gap-4 border-t border-foreground pt-3">
            <div className="flex min-w-0 flex-col gap-1">
              <span className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase">
                Santo do dia
              </span>
              <span className="line-clamp-1 font-serif text-2xl">{santoDoDia.nome}</span>
            </div>
            <PrefetchLink
              href={`/santos/${santoDoDia.id}`}
              className="shrink-0 pb-1 text-[13px] font-medium whitespace-nowrap hover:text-liturgical-ink"
            >
              Ver detalhes →
            </PrefetchLink>
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}
