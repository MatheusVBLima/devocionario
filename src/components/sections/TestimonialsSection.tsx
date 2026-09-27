import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
import { homeTestimonials } from "@/data/home"

export function TestimonialsSection() {
  return (
    <section className="border-t">
      <Container className="section-y">
        <div className="mb-12 flex flex-col gap-6">
          <Kicker>Quem usa</Kicker>
          <h2 className="text-display max-w-4xl text-[clamp(2.5rem,5vw,4.25rem)] leading-none">
            Relatos de quem já incorporou o Devocionário à rotina de oração.
          </h2>
        </div>

        <ul className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {homeTestimonials.map((review) => (
            <li key={review.name} className="border-t py-8">
              <figure className="flex h-full flex-col justify-between gap-6">
                <blockquote className="font-serif text-[1.65rem] leading-[1.2] text-balance">
                  <span className="text-liturgical-ink">“</span>
                  {review.text}
                  <span className="text-liturgical-ink">”</span>
                </blockquote>
                <figcaption className="font-mono text-xs tracking-[0.06em] text-muted-foreground uppercase">
                  {review.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
