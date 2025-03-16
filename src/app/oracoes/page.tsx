'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function OracoesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Dados de orações (mock)
  const oracoes = [
    {
      id: 1,
      titulo: 'Pai Nosso',
      descricao: 'A oração que Jesus Cristo nos ensinou',
      categoria: 'Básicas',
      tempo: '1 min',
      texto: 'Pai Nosso que estais nos céus, santificado seja o Vosso nome...'
    },
    {
      id: 2,
      titulo: 'Ave Maria',
      descricao: 'Oração dedicada à Nossa Senhora',
      categoria: 'Básicas',
      tempo: '1 min',
      texto: 'Ave Maria, cheia de graça, o Senhor é convosco...'
    },
    {
      id: 3,
      titulo: 'Salve Rainha',
      descricao: 'Antiga oração mariana da tradição católica',
      categoria: 'Marianas',
      tempo: '2 min',
      texto: 'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!...'
    },
    {
      id: 4,
      titulo: 'Credo Apostólico',
      descricao: 'Profissão de fé dos cristãos',
      categoria: 'Básicas',
      tempo: '2 min',
      texto: 'Creio em Deus Pai todo-poderoso, criador do céu e da terra...'
    },
    {
      id: 5,
      titulo: 'Oração a São Miguel Arcanjo',
      descricao: 'Poderosa oração de proteção contra o mal',
      categoria: 'Santos',
      tempo: '1 min',
      texto: 'São Miguel Arcanjo, defendei-nos no combate...'
    },
    {
      id: 6,
      titulo: 'Magnificat',
      descricao: 'Cântico de Nossa Senhora',
      categoria: 'Marianas',
      tempo: '2 min',
      texto: 'A minha alma engrandece o Senhor...'
    },
    {
      id: 7,
      titulo: 'Ato de Contrição',
      descricao: 'Oração de arrependimento dos pecados',
      categoria: 'Penitenciais',
      tempo: '1 min',
      texto: 'Meu Deus, eu me arrependo de todo o coração...'
    },
    {
      id: 8,
      titulo: 'Angelus',
      descricao: 'Oração que relembra a Anunciação',
      categoria: 'Marianas',
      tempo: '3 min',
      texto: 'O Anjo do Senhor anunciou a Maria...'
    }
  ];

  // Extrair categorias únicas
  const categorias = ['Todas', ...new Set(oracoes.map(oracao => oracao.categoria))];

  // Filtrar orações com base na pesquisa e categoria
  const oracoesFiltradas = oracoes.filter(oracao => {
    const matchesSearch = oracao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          oracao.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || oracao.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-8 py-20 lg:py-32">
      <h1 className="text-4xl font-bold text-center mb-4 text-primary">Orações</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Uma coleção de orações católicas para todos os momentos. Encontre orações tradicionais, 
        devoções aos santos, e práticas espirituais para fortalecer sua fé.
      </p>
      
      {/* Barra de pesquisa */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Pesquisar orações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      {/* Filtros de categoria */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categorias.map(categoria => (
          <Button
            key={categoria}
            variant={selectedCategory === categoria ? "default" : "outline"}
            onClick={() => setSelectedCategory(categoria)}
            className="mb-2"
          >
            {categoria}
          </Button>
        ))}
      </div>
      
      {/* Grid de orações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {oracoesFiltradas.map(oracao => (
          <Card key={oracao.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>{oracao.titulo}</CardTitle>
              <CardDescription>{oracao.descricao}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="line-clamp-3 text-muted-foreground mb-4">{oracao.texto}</p>
              <div className="flex gap-2">
                <Badge variant="outline">{oracao.categoria}</Badge>
                <Badge variant="secondary">{oracao.tempo}</Badge>
              </div>
            </CardContent>
            <CardFooter className="mt-auto pt-2">
              <Button asChild className="w-full">
                <Link href={`/oracoes/${oracao.id}`}>Ver Oração</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {oracoesFiltradas.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-muted-foreground">Nenhuma oração encontrada para sua busca.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todas');
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 