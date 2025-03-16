import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Separator } from "@/components/ui/separator";

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

export default function Home() {
  // Dados para as duas fileiras de avaliações
  const firstRow = [
    { name: "Maria Silva", text: "Este site tem sido uma benção para minha vida espiritual. Recomendo a todos!" },
    { name: "João Oliveira", text: "Uso o Devocionário todos os dias para acompanhar a liturgia. Excelente ferramenta!" },
    { name: "Ana Costa", text: "As orações disponíveis me ajudaram muito nos momentos difíceis. Muito obrigada!" },
    { name: "Carlos Santos", text: "O guia do rosário é muito completo e didático. Ajudou minha família inteira." },
  ];

  const secondRow = [
    { name: "Pedro Almeida", text: "O conteúdo sobre os santos me inspira diariamente. Parabéns pela iniciativa!" },
    { name: "Lúcia Ferreira", text: "Indico para todos os meus amigos do grupo de oração. Material de qualidade." },
    { name: "Roberto Gomes", text: "A interface é muito intuitiva e o conteúdo é profundo e fiel ao catecismo." },
    { name: "Fátima Mendes", text: "Graças ao Devocionário, consegui criar uma rotina de oração consistente." },
  ];

  return (
    <div className="w-full relative flex flex-col overflow-x-hidden font-base antialiased">
      <section className="w-full"><HeroSection /></section>
      <Separator />
      <section className="w-full"><FeaturesSection /></section>
      <Separator />
      <section className="w-full"><PartnersSection /></section>
      <Separator />
      <section className="w-full"><TestimonialsSection /></section>
      <Separator />
      <section className="w-full"><FAQSection /></section>
    </div>
  );
}
