import { Wrapper } from "@/components/utils/Wrapper";
import { AnimationContainer } from "@/components/utils/AnimationContainer";
import { Marquee } from "@/components/magicui/marquee";

// Componente ReviewCard para as avaliações
function ReviewCard({ name, text, stars = 5 }: { name: string; text: string; stars?: number }) {
  return (
    <div className="mx-4 p-4 border rounded-lg min-w-80 group-hover:pause">
      <div className="flex items-center mb-2">
        <span className="text-yellow-400 text-xl">{Array(stars).fill('★').join('')}</span>
      </div>
      <p className="italic text-muted-foreground">{text}</p>
      <p className="font-semibold mt-2">- {name}</p>
    </div>
  );
}

// Interface para os dados dos depoimentos
interface Testimonial {
  name: string;
  text: string;
  stars?: number;
}

export function TestimonialsSection() {
  // Dados para as duas fileiras de avaliações
  const firstRow: Testimonial[] = [
    { name: "Maria Silva", text: "Este site tem sido uma benção para minha vida espiritual. Recomendo a todos!" },
    { name: "João Oliveira", text: "Uso o Devocionário todos os dias para acompanhar a liturgia. Excelente ferramenta!" },
    { name: "Ana Costa", text: "As orações disponíveis me ajudaram muito nos momentos difíceis. Muito obrigada!" },
    { name: "Carlos Santos", text: "O guia do rosário é muito completo e didático. Ajudou minha família inteira." },
  ];

  const secondRow: Testimonial[] = [
    { name: "Pedro Almeida", text: "O conteúdo sobre os santos me inspira diariamente. Parabéns pela iniciativa!" },
    { name: "Lúcia Ferreira", text: "Indico para todos os meus amigos do grupo de oração. Material de qualidade." },
    { name: "Roberto Gomes", text: "A interface é muito intuitiva e o conteúdo é profundo e fiel ao catecismo." },
    { name: "Fátima Mendes", text: "Graças ao Devocionário, consegui criar uma rotina de oração consistente." },
  ];

  return (
      <Wrapper className="py-20 lg:py-32">
        <AnimationContainer animation="fadeUp" delay={0.2}>
          <h2 className="text-3xl font-bold text-center mb-6">O que dizem sobre nós</h2>
        </AnimationContainer>
      
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <AnimationContainer animation="fadeRight" delay={0.4}>
            <Marquee pauseOnHover className="[--duration:60s]">
              {firstRow.map((review, index) => (
                <ReviewCard key={`first-${index}`} {...review} />
              ))}
            </Marquee>
          </AnimationContainer>
          
          <AnimationContainer animation="fadeLeft" delay={0.6}>
            <Marquee reverse pauseOnHover className="[--duration:60s]">
              {secondRow.map((review, index) => (
                <ReviewCard key={`second-${index}`} {...review} />
              ))}
            </Marquee>
          </AnimationContainer>
          
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </Wrapper>
   
  );
} 