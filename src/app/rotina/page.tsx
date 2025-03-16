'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { santos, santo } from "@/data/santos";
import { SantoImage } from "@/components/SantoImage";

export default function RotinaPage() {
  const [santoDoDia, setSantoDoDia] = useState<santo | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Buscar o santo do dia atual
  useEffect(() => {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // +1 porque janeiro é 0
    
    const santoHoje = santos.find(s => s.dia === dia && s.mes === mes);
    if (santoHoje) {
      setSantoDoDia(santoHoje);
    } else {
      // Fallback para o primeiro santo se não encontrar
      setSantoDoDia(santos[0]);
    }
    setLoading(false);
  }, []);

  // Dicas para rotina católica
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

  // Formatação do nome do mês por extenso
  const formatarData = (dia: string, mes: string) => {
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    const mesIndex = parseInt(mes) - 1;
    return `${parseInt(dia)} de ${meses[mesIndex]}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-20 lg:py-32 text-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-20 lg:py-32">
      <h1 className="text-4xl font-bold text-center mb-4 text-primary">Rotina Católica</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Sugestões para incorporar a fé no dia-a-dia e conhecer o santo celebrado hoje.
      </p>
      
      {/* Santo do dia */}
      {santoDoDia && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Santo do Dia</h2>
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 relative h-64 md:h-full px-4 py-4">
                {santoDoDia.imagem ? (
                  <div className="relative h-full">
                    <SantoImage 
                      src={santoDoDia.imagem}
                      alt={santoDoDia.nome}
                      className="object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="relative h-full">
                    <Image 
                      src="/placeholder.svg?height=300&width=300"
                      alt={santoDoDia.nome}
                      fill
                      className="object-cover rounded-lg bg-muted"
                    />
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2 p-6">
                <div className="mb-2">
                  <Badge variant="outline" className="mb-2">
                    {formatarData(santoDoDia.dia, santoDoDia.mes)}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">{santoDoDia.nome}</h3>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Sobre:</h4>
                  <p className="mb-4">{santoDoDia.sobre}</p>
                </div>
                
                {santoDoDia.oracao && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Oração:</h4>
                    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                      {santoDoDia.oracao}
                    </blockquote>
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
      )}
      
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