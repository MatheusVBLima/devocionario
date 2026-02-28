import { homeTestimonials } from "@/data/home"
import { Wrapper } from "@/components/utils/Wrapper"

export function TestimonialsSection() {
  return (
    <section className="home-section">
      <Wrapper className="space-y-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <span className="section-kicker">Quem usa</span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Relatos de quem já incorporou o Devocionário à rotina de oração.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {homeTestimonials.map((review) => (
            <article
              key={review.name}
              className="flex h-full flex-col gap-4 rounded-[1.75rem] border border-border/70 bg-card/80 p-6"
            >
              <div className="text-sm tracking-[0.18em] text-amber-500 uppercase">
                ★★★★★
              </div>
              <p className="flex-1 text-sm leading-7 text-muted-foreground">“{review.text}”</p>
              <p className="text-sm font-medium">{review.name}</p>
            </article>
          ))}
        </div>
      </Wrapper>
    </section>
  )
}
