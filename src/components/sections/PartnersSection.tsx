import Image from "next/image"

import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
import { homePartners } from "@/data/home"

export function PartnersSection() {
  return (
    <section className="border-t bg-card/50">
      <Container className="section-y">
        <div className="mb-12 flex flex-col gap-6">
          <Kicker>Rede de apoio</Kicker>
          <h2 className="text-display max-w-4xl text-[clamp(2.5rem,5vw,4.25rem)] leading-none">
            Comunidades e iniciativas que fortalecem a presença católica no ambiente digital.
          </h2>
        </div>

        <ul className="grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
          {homePartners.map((partner) => (
            <li key={partner.name} className="flex flex-col gap-5">
              <div className="arch relative aspect-[4/5] overflow-hidden border bg-white">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  className="object-contain p-6 pt-10"
                  sizes="(max-width: 1024px) 45vw, 280px"
                />
              </div>
              <div className="flex flex-col gap-2 border-t border-foreground pt-4">
                <h3 className="font-serif text-[1.4rem] leading-[1.1] sm:text-[1.75rem]">{partner.name}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{partner.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
