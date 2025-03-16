'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Oracao, oracoes } from "@/data/oracoes";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OracoesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [filteredOracoes, setFilteredOracoes] = useState<Oracao[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Extrair categorias únicas das orações reais
  const [categorias, setCategorias] = useState<string[]>(['Todas']);

  // Inicializar dados quando o componente é montado
  useEffect(() => {
    // Ordenar por ordem (order) e depois por título
    const sortedOracoes = [...oracoes].sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.title.localeCompare(b.title);
    });
    
    // Extrair categorias únicas
    const uniqueCategories = ['Todas', ...new Set(oracoes.map(oracao => oracao.category))];
    setCategorias(uniqueCategories);
    
    setFilteredOracoes(sortedOracoes);
    setLoading(false);
  }, []);

  // Filtrar orações com base na pesquisa e categoria
  useEffect(() => {
    let filtered = [...oracoes];
    
    // Filtrar por termo de pesquisa
    if (searchTerm) {
      filtered = filtered.filter(oracao => 
        oracao.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        oracao.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por categoria
    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter(oracao => oracao.category === selectedCategory);
    }
    
    // Ordenar por ordem (order) e depois por título
    filtered.sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.title.localeCompare(b.title);
    });
    
    setFilteredOracoes(filtered);
    setCurrentPage(1); // Resetar para a primeira página quando filtros mudam
  }, [searchTerm, selectedCategory]);

  // Calcular número total de páginas
  const totalPages = Math.ceil(filteredOracoes.length / itemsPerPage);
  
  // Obter orações para a página atual
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOracoes.slice(startIndex, endIndex);
  };

  // Formatar a duração estimada baseada no tamanho do conteúdo
  const estimarTempo = (content: string) => {
    const palavras = content.split(/\s+/).length;
    const minutos = Math.max(1, Math.ceil(palavras / 150)); // ~150 palavras por minuto
    return `${minutos} min`;
  };

  // Componente de skeleton para os cards
  const SkeletonCard = () => (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <Skeleton className="h-6 w-[70%] mb-1" />
        <Skeleton className="h-4 w-[90%]" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-40 w-full mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-[80%] mb-2" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-2">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto px-8 py-20 lg:py-32">
      <h1 className="text-4xl font-bold text-center mb-4 text-primary">Orações</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Uma coleção de orações católicas para todos os momentos. Encontre orações tradicionais, 
        devoções aos santos, e práticas espirituais para fortalecer sua fé.
      </p>
      
      {/* Barra de pesquisa e filtro de categoria */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Pesquisar orações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full md:w-auto min-w-[200px]">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map(categoria => (
                <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Skeleton Loading */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          {/* Grid de orações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentPageItems().map(oracao => (
              <Card key={oracao.id} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{oracao.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{oracao.category}</Badge>
                    <Badge variant="secondary">{estimarTempo(oracao.content)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  {oracao.imageUrl && (
                    <div className="relative h-40 w-full mb-4">
                      <Image
                        src={oracao.imageUrl}
                        alt={oracao.title}
                        fill
                        className="object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg?height=160&width=320";
                        }}
                      />
                    </div>
                  )}
                  <p className="line-clamp-3 text-muted-foreground">
                    {oracao.content.replace(/\n/g, ' ').replace(/\*\*/g, '')}
                  </p>
                </CardContent>
                <CardFooter className="mt-auto pt-2">
                  <Button asChild className="w-full">
                    <Link href={`/oracoes/${oracao.id}`}>Ver Oração</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Mensagem quando não há resultados */}
          {filteredOracoes.length === 0 && (
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
          
          {/* Paginação */}
          {filteredOracoes.length > 0 && totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {/* Renderizar links de páginas */}
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    
                    // Mostrar apenas páginas próximas da atual para não sobrecarregar a UI
                    if (
                      pageNumber === 1 || 
                      pageNumber === totalPages || 
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink 
                            isActive={currentPage === pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      (pageNumber === currentPage - 2 && currentPage > 3) || 
                      (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
} 