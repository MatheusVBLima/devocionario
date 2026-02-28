import Image from "next/image"

import { homePartners } from "@/data/home"
import { Wrapper } from "@/components/utils/Wrapper"

export function PartnersSection() {
  return (
    <section className="home-section">
      <Wrapper className="space-y-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <span className="section-kicker">Rede de apoio</span>
          <h2 className="text-balance font-serif text-3xl font-light tracking-tight sm:text-4xl">
            Comunidades e iniciativas que fortalecem a presença católica no ambiente digital.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {homePartners.map((partner) => (
            <article
              key={partner.name}
              className="flex h-full flex-col items-center gap-4 rounded-[1.75rem] border border-border/70 bg-card/75 px-6 py-8 text-center"
            >
              <div className="relative size-24 overflow-hidden rounded-full border border-border/70 bg-slate-100 dark:bg-slate-200">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  className="object-cover object-top"
                  sizes="96px"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{partner.name}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{partner.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}
