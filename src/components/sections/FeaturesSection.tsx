import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
import { PrefetchLink } from "@/components/PrefetchLink"
import { homeFeatures } from "@/data/home"

export function FeaturesSection() {
  return (
    <section>
      <Container className="section-y">
        <div className="mb-12 flex flex-col gap-6">
          <Kicker>Seções principais</Kicker>
          <h2 className="text-display max-w-4xl text-[clamp(2.5rem,5vw,4.25rem)] leading-none">
            Tudo o que você precisa para organizar a leitura e a oração em um só lugar.
          </h2>
        </div>

        <ul className="flex flex-col border-b">
          {homeFeatures.map((feature, index) => (
            <li key={feature.title}>
              <PrefetchLink
                href={feature.href}
                className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-3 border-t py-7 hover:text-liturgical-ink md:grid-cols-[4rem_minmax(0,1.2fr)_minmax(0,1fr)_auto] md:gap-x-10"
              >
                <span className="font-mono text-[13px] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-[clamp(2rem,4.4vw,3.75rem)] leading-none tracking-[-0.02em]">
                  {feature.title}
                </span>
                <span className="col-start-2 row-start-2 text-[15px] leading-relaxed text-muted-foreground md:col-start-3 md:row-start-1">
                  {feature.description}
                </span>
                <span
                  aria-hidden
                  className="col-start-3 row-start-1 text-xl transition-transform group-hover:translate-x-1 md:col-start-4"
                >
                  →
                </span>
                <span className="sr-only">Ver seção</span>
              </PrefetchLink>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
