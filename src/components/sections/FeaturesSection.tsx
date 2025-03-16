import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/utils/Wrapper";
import { AnimationContainer } from "@/components/utils/AnimationContainer";

// Interface para os dados das features
interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export function FeaturesSection() {
  // Dados das features
  const featuresData: FeatureItem[] = [
    {
      icon: "✝️",
      title: "Santo Rosário",
      description: "Explore os mistérios Gloriosos, Gozosos, Luminosos e Dolorosos do Santo Rosário.",
      link: "/rosario"
    },
    {
      icon: "📖",
      title: "Liturgia Diária",
      description: "Acompanhe as leituras diárias com primeira leitura, salmo, segunda leitura e evangelho.",
      link: "/liturgia"
    },
    {
      icon: "🙏",
      title: "Orações",
      description: "Encontre diversas orações organizadas por categorias, em latim e português.",
      link: "/oracoes"
    },
    {
      icon: "📅",
      title: "Rotina Católica",
      description: "Conheça o santo do dia e inspirações para sua rotina de fé.",
      link: "/rotina"
    }
  ];

  return (
 
      <Wrapper className="py-20 lg:py-32">
        <AnimationContainer animation="fadeUp" delay={0.2}>
          <h2 className="text-3xl font-bold text-center mb-12">Nossas Seções</h2>
        </AnimationContainer>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <AnimationContainer key={feature.title} animation="fadeUp" delay={0.4 + index * 0.2}>
              <Card className="flex flex-col h-full">
                <CardHeader className="flex-grow">
                  <div className="h-12 w-12 border rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-2">
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={feature.link}>
                      Ver mais →
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimationContainer>
          ))}
        </div>
      </Wrapper>
   
  );
} 