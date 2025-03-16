import { santos } from "@/data/santos";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { SantoImage } from "@/components/SantoImage";

export default async function SantoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const santoId = parseInt(id);
  const santo = santos.find(s => s.id === santoId);
  
  if (!santo) {
    notFound();
  }
  
  // Formatação do nome do mês por extenso
  const formatarData = (dia: string, mes: string) => {
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    const mesIndex = parseInt(mes) - 1;
    return `${parseInt(dia)} de ${meses[mesIndex]}`;
  };

  const breadcrumbItems = [
    { label: "Calendário de Santos", href: "/santos" },
    { label: santo.nome, href: `/santos/${santo.id}` },
  ];

  return (
    <div className="container mx-auto px-4 py-20 lg:py-32">
      <BreadcrumbNav items={breadcrumbItems}/>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna de imagem */}
        <div className="relative h-[300px] lg:h-full rounded-lg overflow-hidden">
          {santo.imagem ? (
            <SantoImage 
              src={santo.imagem} 
              alt={santo.nome} 
              className="object-cover rounded-lg" 
            />
          ) : (
            <Image
              src="/placeholder.svg?height=600&width=400"
              alt={santo.nome}
              fill
              className="object-cover rounded-lg bg-muted"
              priority
            />
          )}
        </div>
        
        {/* Coluna de conteúdo */}
        <div className="lg:col-span-2">
          <Badge variant="outline" className="mb-2">
            {formatarData(santo.dia, santo.mes)}
          </Badge>
          
          <h1 className="text-4xl font-bold text-primary mb-4">{santo.nome}</h1>
          
          {/* Seção Sobre */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Sobre</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>{santo.sobre}</p>
            </div>
          </div>
          
          {/* Seção Oração */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Oração</h2>
            <blockquote className="border-l-4 border-primary p-4 bg-muted/50 rounded-r-lg italic">
              <p className="text-lg text-muted-foreground">{santo.oracao}</p>
            </blockquote>
          </div>
          
          {/* Detalhes adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Data de celebração</h3>
              <p>{formatarData(santo.dia, santo.mes)}</p>
            </div>
          </div>
          
          {/* Ações */}
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href={`/rotina`}>
                Ver Rotina Católica
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/santos">
                Ver todos os Santos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 