import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RosarioPage() {
  // Dados dos mistérios do Rosário
  const misterios = [
    {
      id: 'gloriosos',
      nome: 'Mistérios Gloriosos',
      descricao: 'Celebram a vitória de Jesus sobre a morte e a glorificação de Nossa Senhora.',
      dias: 'Quartas e Domingos',
      misteriosDetalhados: [
        'A Ressurreição de Jesus',
        'A Ascensão de Jesus ao Céu',
        'A Vinda do Espírito Santo',
        'A Assunção de Nossa Senhora',
        'A Coroação de Nossa Senhora'
      ]
    },
    {
      id: 'dolorosos',
      nome: 'Mistérios Dolorosos',
      descricao: 'Meditam os sofrimentos de Jesus durante sua Paixão.',
      dias: 'Terças e Sextas',
      misteriosDetalhados: [
        'A Agonia de Jesus no Horto',
        'A Flagelação de Jesus',
        'A Coroação de Espinhos',
        'Jesus carrega a Cruz',
        'A Crucificação e Morte de Jesus'
      ]
    },
    {
      id: 'gozosos',
      nome: 'Mistérios Gozosos',
      descricao: 'Contemplam a alegria da encarnação e infância de Jesus.',
      dias: 'Segundos e Sábados',
      misteriosDetalhados: [
        'A Anunciação do Anjo a Nossa Senhora',
        'A Visitação de Nossa Senhora a Isabel',
        'O Nascimento de Jesus',
        'A Apresentação de Jesus no Templo',
        'O Encontro de Jesus no Templo'
      ]
    },
    {
      id: 'luminosos',
      nome: 'Mistérios Luminosos',
      descricao: 'Contemplam a vida pública de Jesus e seu ministério.',
      dias: 'Quintas',
      misteriosDetalhados: [
        'O Batismo de Jesus no Jordão',
        'As Bodas de Caná',
        'O Anúncio do Reino de Deus',
        'A Transfiguração de Jesus',
        'A Instituição da Eucaristia'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-8 py-20 lg:py-32">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary">Santo Rosário</h1>
      <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-12 text-center">
        O Santo Rosário é uma devoção tradicional da Igreja Católica que nos convida a meditar os mistérios da vida de Jesus e Maria. 
        Escolha um dos mistérios abaixo para rezar o Rosário completo.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {misterios.map((misterio) => (
          <Card key={misterio.id} >
            <CardHeader>
              <CardTitle>{misterio.nome}</CardTitle>
              <CardDescription>{misterio.descricao}</CardDescription>
              <p className="text-sm text-muted-foreground">Dias recomendados: {misterio.dias}</p>
            </CardHeader>
            
            <CardContent>
              <h3 className="font-semibold mb-2">Os cinco mistérios:</h3>
              <ol className="list-decimal pl-5 mb-6 space-y-1">
                {misterio.misteriosDetalhados.map((item, index) => (
                  <li key={index} className="text-muted-foreground">{item}</li>
                ))}
              </ol>
            </CardContent>
            
            <CardFooter>
              <Button asChild>
                <Link href={`/rosario/${misterio.id}`}>
                  Rezar estes mistérios
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 