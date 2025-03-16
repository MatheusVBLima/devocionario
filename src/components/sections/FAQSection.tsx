import { Wrapper } from "@/components/utils/Wrapper";
import { AnimationContainer } from "@/components/utils/AnimationContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Interface para os dados das perguntas frequentes
interface FAQItem {
  question: string;
  answer: string;
  value: string;
}

export function FAQSection() {
  // Dados das perguntas frequentes
  const faqData: FAQItem[] = [
    {
      question: "Como posso rezar o Santo Rosário?",
      answer: "Na seção do Santo Rosário, temos um guia completo sobre como rezar cada mistério, com todas as orações necessárias.",
      value: "item-1"
    },
    {
      question: "Como acompanho a liturgia diária?",
      answer: "Nossa seção de Liturgia é atualizada diariamente com as leituras do dia, organizadas em abas para facilitar a leitura.",
      value: "item-2"
    },
    {
      question: "Posso contribuir com o site?",
      answer: "Sim! Entre em contato conosco através do formulário no rodapé da página para saber como pode ajudar.",
      value: "item-3"
    }
  ];

  return (
    
      <Wrapper className="py-20 lg:py-32">
        <AnimationContainer animation="fadeUp" delay={0.2}>
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
        </AnimationContainer>
        
        <div className="max-w-3xl mx-auto">
          <AnimationContainer animation="fadeUp" delay={0.4}>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className="text-xl font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimationContainer>
        </div>
      </Wrapper>
    
  );
} 