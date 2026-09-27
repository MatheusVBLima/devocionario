import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { homeFaqItems } from "@/data/home"

export function FAQSection() {
  return (
    <section className="border-t">
      <Container className="section-y grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
        <div className="flex flex-col gap-6">
          <Kicker>Perguntas frequentes</Kicker>
          <h2 className="text-display text-[clamp(2.5rem,5vw,4.25rem)] leading-none">
            Respostas rápidas para começar a usar o conteúdo do site.
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {homeFaqItems.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="font-serif text-[clamp(1.5rem,2.4vw,1.9rem)] leading-[1.15]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-xl text-base leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
