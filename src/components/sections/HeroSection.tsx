import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/utils/Wrapper";
import { AnimationContainer } from "@/components/utils/AnimationContainer";

export function HeroSection() {
  return (
    <section className="w-full">
      <Wrapper className="pt-32 lg:pt-40 pb-10 min-h-screen w-full flex-1">
        <div className="flex flex-col items-center">
          <div className="text-center mb-16">
            <AnimationContainer animation="fadeUp" delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Bem-vindo ao Devocionário
              </h1>
            </AnimationContainer>
            
            <AnimationContainer animation="fadeUp" delay={0.4}>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
                Seu portal católico para fortalecer sua fé, encontrar orações e acompanhar a liturgia diária
              </p>
            </AnimationContainer>
            
            <AnimationContainer animation="fadeUp" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default" size="lg" className="px-6">
                  <Link href="/rosario">
                    Santo Rosário
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-6">
                  <Link href="/liturgia">
                    Liturgia Diária
                  </Link>
                </Button>
              </div>
            </AnimationContainer>
          </div>
          
          <AnimationContainer animation="fadeUp" delay={0.8}>
            <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/hero.webp" 
                alt="Devocionário Católico" 
                width={1200}
                height={600}
                priority
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
            </div>
          </AnimationContainer>
        </div>
      </Wrapper>
    </section>
  );
} 