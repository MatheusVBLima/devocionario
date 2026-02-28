import { PrefetchLink } from "@/components/PrefetchLink"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { homeFeatures } from "@/data/home"
import { Wrapper } from "@/components/utils/Wrapper"

export function FeaturesSection() {
  return (
    <section className="home-section">
      <Wrapper className="space-y-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <span className="section-kicker">Seções principais</span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Tudo o que você precisa para organizar a leitura e a oração em um só lugar.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {homeFeatures.map((feature) => (
            <Card key={feature.title} className="flex h-full flex-col rounded-[1.75rem] border-border/70 bg-card/80">
              <CardHeader className="flex-1 gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-background text-xl">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-sm leading-7">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <PrefetchLink
                  href={feature.href}
                  className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Ver seção
                </PrefetchLink>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}
