import { Wrapper } from "@/components/utils/Wrapper";
import { AnimationContainer } from "@/components/utils/AnimationContainer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Interface para os dados dos parceiros
interface Partner {
  name: string;
  description: string;
  image: string;
}

export function PartnersSection() {
  // Dados dos parceiros
  const partnersData: Partner[] = [
    {
      name: "Paróquia São Pedro",
      description: "Comunidade católica parceira do Devocionário",
      image: "/amigo-1.avif"
    },
    {
      name: "Diocese de São Paulo",
      description: "Apoiadores oficiais de nosso trabalho",
      image: "/amigo-2.avif"
    },
    {
      name: "Editora Católica",
      description: "Parceiros na evangelização digital",
      image: "/amigo-3.avif"
    },
    {
      name: "Congregação Mariana",
      description: "Apoio espiritual e formação católica",
      image: "/amigo-4.avif"
    }
  ];

  return (
    <section className="w-full py-20">
      <Wrapper className="py-20 lg:py-32">
        <AnimationContainer animation="fadeUp" delay={0.2}>
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Amigos</h2>
        </AnimationContainer>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnersData.map((partner, index) => (
            <AnimationContainer key={partner.name} animation="fadeUp" delay={0.4 + index * 0.1}>
              <div className="text-center">
              <Avatar className="size-26 mx-auto">
                <AvatarImage src={partner.image} alt={partner.name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
                <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                <p className="text-muted-foreground">
                  {partner.description}
                </p>
              </div>
            </AnimationContainer>
          ))}
        </div>
      </Wrapper>
    </section>
  );
} 