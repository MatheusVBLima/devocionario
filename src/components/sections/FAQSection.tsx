import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { homeFaqItems } from "@/data/home"
import { Wrapper } from "@/components/utils/Wrapper"

export function FAQSection() {
  return (
    <section className="home-section">
      <Wrapper className="space-y-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <span className="section-kicker">Perguntas frequentes</span>
          <h2 className="text-balance font-serif text-3xl font-light tracking-tight sm:text-4xl">
            Respostas rápidas para começar a usar o conteúdo do site.
          </h2>
        </div>

        <div className="mx-auto max-w-4xl rounded-[2rem] border border-border/70 bg-card/80 p-3 md:p-4">
          <Accordion type="single" collapsible className="w-full">
            {homeFaqItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-7 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Wrapper>
    </section>
  )
}
