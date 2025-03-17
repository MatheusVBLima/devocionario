'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Noticia {
  id: number;
  titulo: string;
  resumo: string;
  data: string;
  autor: string;
  categoria: string;
  imagem: string;
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNoticias, setFilteredNoticias] = useState<Noticia[]>([]);
  const itemsPerPage = 9;
  
  const noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Papa Francisco convoca Jubileu de 2025 com o tema "Peregrinos de Esperança"',
      resumo: 'O Vaticano divulgou detalhes sobre o próximo Ano Santo que atrairá milhões de peregrinos a Roma.',
      data: '15 de março de 2024',
      autor: 'Redação',
      categoria: 'Vaticano',
      imagem: '/images/jubileu-2025.jpg'
    },
    {
      id: 2,
      titulo: 'Concluído importante trabalho de restauração na Basílica da Natividade em Belém',
      resumo: 'Após 10 anos de meticuloso trabalho, a histórica igreja construída sobre o local de nascimento de Jesus brilha novamente.',
      data: '12 de março de 2024',
      autor: 'Redação',
      categoria: 'Terra Santa',
      imagem: '/images/basilica-natividade.jpg'
    },
    {
      id: 3,
      titulo: 'Anunciadas duas novas canonizações para outubro',
      resumo: 'O Papa Francisco anunciou a data para a canonização da Beata Maria Antonia de Paz y Figueroa e do Beato José Gregorio Hernández.',
      data: '8 de março de 2024',
      autor: 'Redação',
      categoria: 'Santos',
      imagem: '/images/canonizacoes.jpg'
    },
    {
      id: 4,
      titulo: 'Como se preparar espiritualmente para o Jubileu de 2025',
      resumo: 'Confira orientações práticas para viver intensamente o próximo Ano Santo que terá como tema a esperança.',
      data: '5 de março de 2024',
      autor: 'Pe. Carlos Oliveira',
      categoria: 'Espiritualidade',
      imagem: '/images/preparacao-jubileu.jpg'
    },
    {
      id: 5,
      titulo: 'Diocese promove romaria ao Santuário Nacional de Aparecida',
      resumo: 'Mais de cinco mil fiéis participarão da peregrinação anual ao maior santuário mariano do Brasil.',
      data: '28 de fevereiro de 2024',
      autor: 'Colaboradores',
      categoria: 'Brasil',
      imagem: '/images/romaria-aparecida.jpg'
    },
    {
      id: 6,
      titulo: 'Documentário sobre vida monástica recebe prêmio internacional',
      resumo: 'Filme que retrata o cotidiano de mosteiro beneditino foi reconhecido por sua profundidade espiritual e qualidade estética.',
      data: '22 de fevereiro de 2024',
      autor: 'Redação',
      categoria: 'Cultura',
      imagem: '/images/documentario-monastico.jpg'
    },
    {
      id: 7,
      titulo: 'Anunciadas duas novas canonizações para outubro',
      resumo: 'O Papa Francisco anunciou a data para a canonização da Beata Maria Antonia de Paz y Figueroa e do Beato José Gregorio Hernández.',
      data: '8 de março de 2024',
      autor: 'Redação',
      categoria: 'Santos',
      imagem: '/images/canonizacoes.jpg'
    },
    {
      id: 8,
      titulo: 'Como se preparar espiritualmente para o Jubileu de 2025',
      resumo: 'Confira orientações práticas para viver intensamente o próximo Ano Santo que terá como tema a esperança.',
      data: '5 de março de 2024',
      autor: 'Pe. Carlos Oliveira',
      categoria: 'Espiritualidade',
      imagem: '/images/preparacao-jubileu.jpg'
    },
    {
      id: 9,
      titulo: 'Diocese promove romaria ao Santuário Nacional de Aparecida',
      resumo: 'Mais de cinco mil fiéis participarão da peregrinação anual ao maior santuário mariano do Brasil.',
      data: '28 de fevereiro de 2024',
      autor: 'Colaboradores',
      categoria: 'Brasil',
      imagem: '/images/romaria-aparecida.jpg'
    },
    {
      id: 10,
      titulo: 'Documentário sobre vida monástica recebe prêmio internacional',
      resumo: 'Filme que retrata o cotidiano de mosteiro beneditino foi reconhecido por sua profundidade espiritual e qualidade estética.',
      data: '22 de fevereiro de 2024',
      autor: 'Redação',
      categoria: 'Cultura',
      imagem: '/images/documentario-monastico.jpg'
    },
    {
      id: 11,
      titulo: 'Anunciadas duas novas canonizações para outubro',
      resumo: 'O Papa Francisco anunciou a data para a canonização da Beata Maria Antonia de Paz y Figueroa e do Beato José Gregorio Hernández.',
      data: '8 de março de 2024',
      autor: 'Redação',
      categoria: 'Santos',
      imagem: '/images/canonizacoes.jpg'
    },
    {
      id: 12,
      titulo: 'Como se preparar espiritualmente para o Jubileu de 2025',
      resumo: 'Confira orientações práticas para viver intensamente o próximo Ano Santo que terá como tema a esperança.',
      data: '5 de março de 2024',
      autor: 'Pe. Carlos Oliveira',
      categoria: 'Espiritualidade',
      imagem: '/images/preparacao-jubileu.jpg'
    }
  ];

  const categorias = ['Todas', ...new Set(noticias.map(noticia => noticia.categoria))];

  useEffect(() => {
    let filtered = noticias;
    
    if (searchTerm) {
      filtered = filtered.filter(noticia => 
        noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        noticia.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        noticia.autor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter(noticia => noticia.categoria === selectedCategory);
    }
    
    setFilteredNoticias(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    setFilteredNoticias(noticias);
  }, []);

  const totalPages = Math.ceil(filteredNoticias.length / itemsPerPage);
  
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredNoticias.slice(startIndex, endIndex);
  };

  return (
    <div className="container mx-auto px-8 py-20 lg:py-32">
      <h1 className="text-4xl font-bold text-center mb-4 text-primary">Blog</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Acompanhe as últimas notícias e reflexões sobre a Igreja Católica no Brasil e no mundo.
      </p>
      
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-lg">
          <Input
            type="text"
            placeholder="Pesquisar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categorias.map(categoria => (
          <Button
            key={categoria}
            variant={selectedCategory === categoria ? "default" : "outline"}
            className="mb-2"
            onClick={() => setSelectedCategory(categoria)}
          >
            {categoria}
          </Button>
        ))}
      </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCurrentPageItems().map(noticia => (
          <Card key={noticia.id} className="h-full flex flex-col">
            <div className="relative h-48 w-full">
              {noticia.imagem ? (
                <Image
                  src="/placeholder.svg"
                  alt={noticia.titulo}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/placeholder.svg?height=192&width=384"
                  alt={noticia.titulo}
                  fill
                  className="object-cover bg-muted"
                />
              )}
            </div>
            <CardHeader>
              <div className="flex justify-between items-start gap-2 mb-2">
                <Badge variant="outline">{noticia.categoria}</Badge>
                <span className="text-xs text-muted-foreground">{noticia.data}</span>
              </div>
              <CardTitle className="line-clamp-2">
                {noticia.titulo}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {noticia.resumo}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">
                Por <span className="font-medium">{noticia.autor}</span>
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/blog/${noticia.id}`}>Ler mais</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredNoticias.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Nenhum artigo encontrado com os filtros selecionados.</p>
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
      
      {filteredNoticias.length > 0 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
                {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                
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
    </div>
  );
} 