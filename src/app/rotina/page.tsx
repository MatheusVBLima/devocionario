import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function RotinaPage() {
  // Dados do santo do dia (mock)
  const santoDoDia = {
    nome: 'Santa Teresa de Ávila',
    titulo: 'Doutora da Igreja',
    data: '15 de outubro',
    imagem: '/images/santos/teresa-avila.jpg',
    descricao: 'Santa Teresa de Ávila (1515-1582) foi uma freira carmelita, mística e escritora espanhola. Conhecida por sua profunda vida espiritual e obras literárias como "O Castelo Interior", foi declarada Doutora da Igreja pelo Papa Paulo VI em 1970.',
    citacao: '"Nada te perturbe, nada te espante, tudo passa. Deus não muda. A paciência tudo alcança. Quem a Deus tem, nada lhe falta: só Deus basta."',
    curiosidades: [
      'Foi a primeira mulher a ser declarada Doutora da Igreja Católica',
      'Escreveu vários livros sobre oração e vida espiritual',
      'Reformou a Ordem Carmelita junto com São João da Cruz'
    ]
  };

  // Dicas para rotina católica (mock)
  const dicas = [
    {
      titulo: 'Oração pela Manhã',
      descricao: 'Começar o dia com uma breve oração de agradecimento',
      icone: '☀️',
      tipo: 'Diária'
    },
    {
      titulo: 'Exame de Consciência',
      descricao: 'Refletir sobre as ações do dia antes de dormir',
      icone: '🌙',
      tipo: 'Diária'
    },
    {
      titulo: 'Rosário',
      descricao: 'Dedicar 20 minutos para rezar o Santo Rosário',
      icone: '📿',
      tipo: 'Diária'
    },
    {
      titulo: 'Leitura Espiritual',
      descricao: 'Ler um trecho da Bíblia ou de um livro espiritual',
      icone: '📖',
      tipo: 'Diária'
    },
    {
      titulo: 'Jejum às Sextas',
      descricao: 'Praticar alguma forma de penitência às sextas-feiras',
      icone: '🍞',
      tipo: 'Semanal'
    },
    {
      titulo: 'Confissão',
      descricao: 'Buscar o sacramento da reconciliação regularmente',
      icone: '🙏',
      tipo: 'Mensal'
    }
  ];

  return (
    <div className="container mx-auto px-8 py-20 lg:py-32">
      <h1 className="text-4xl font-bold text-center mb-4 text-primary">Rotina Católica</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Sugestões para incorporar a fé no dia-a-dia e conhecer o santo celebrado hoje.
      </p>
      
      {/* Santo do dia */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Santo do Dia</h2>
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 relative h-64 md:h-full px-4">
              {santoDoDia.imagem ? (
                <div className="relative h-full">
                  <Image 
                    src="/placeholder.svg"
                    alt={santoDoDia.nome}
                    fill
                    className="object-cover  rounded-lg"
                  />
                </div>
              ) : (
                <div className="bg-muted flex items-center justify-center h-full">
                  <span className="text-6xl">✝️</span>
                </div>
              )}
            </div>
            
            <div className="md:col-span-2 p-6">
              <div className="mb-2">
                <Badge variant="outline" className="mb-2">{santoDoDia.data}</Badge>
              </div>
              <h3 className="text-2xl font-bold mb-1">{santoDoDia.nome}</h3>
              <p className="text-muted-foreground mb-4">{santoDoDia.titulo}</p>
              
              <p className="mb-4">{santoDoDia.descricao}</p>
              
              {santoDoDia.citacao && (
                <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                  {santoDoDia.citacao}
                </blockquote>
              )}
              
              {santoDoDia.curiosidades && santoDoDia.curiosidades.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium mb-2">Curiosidades:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {santoDoDia.curiosidades.map((curiosidade, index) => (
                      <li key={index} className="text-muted-foreground">{curiosidade}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-6">
                <Button asChild>
                  <Link href="/santos">Ver Calendário de Santos</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <Separator className="my-12" />
      
      {/* Dicas para rotina */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Dicas para sua Rotina</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dicas.map((dica, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{dica.icone}</span>
                  <CardTitle>{dica.titulo}</CardTitle>
                </div>
                <CardDescription>
                  <Badge variant="secondary" className="mt-1">
                    {dica.tipo}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{dica.descricao}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 