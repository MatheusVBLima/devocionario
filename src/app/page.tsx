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
  

  return (
    <div className="w-full relative flex flex-col ">
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
