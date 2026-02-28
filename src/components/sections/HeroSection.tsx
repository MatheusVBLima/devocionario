import Image from "next/image"

import { PrefetchLink } from "@/components/PrefetchLink"
import { Button } from "@/components/ui/button"
import { Wrapper } from "@/components/utils/Wrapper"

export function HeroSection() {
  return (
    <section className="home-section pt-8 sm:pt-12">
      <Wrapper>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Portal católico
            </span>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Um lugar simples para rezar, ler e acompanhar a vida da Igreja todos os dias.
              </h1>
              <p className="max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
                Encontre orações, liturgia diária, calendário dos santos e conteúdos organizados para uma leitura calma e direta.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <PrefetchLink href="/rosario">Rezar o Santo Rosário</PrefetchLink>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <PrefetchLink href="/liturgia">Ver a liturgia diária</PrefetchLink>
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card p-3 shadow-[0_24px_80px_-40px_rgba(77,49,25,0.45)]">
            <div className="relative aspect-[16/12] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/hero.webp"
                alt="Devocionário católico"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-background/10 to-transparent" />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}
