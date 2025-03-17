'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
import { santos, santo } from "@/data/santos";
import { SantoImage } from "@/components/SantoImage";

export default function SantosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMes, setSelectedMes] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSantos, setFilteredSantos] = useState<santo[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;
  
  const meses = [
    { valor: 'Todos', nome: 'Todos os meses' },
    { valor: '01', nome: 'Janeiro' },
    { valor: '02', nome: 'Fevereiro' },
    { valor: '03', nome: 'Março' },
    { valor: '04', nome: 'Abril' },
    { valor: '05', nome: 'Maio' },
    { valor: '06', nome: 'Junho' },
    { valor: '07', nome: 'Julho' },
    { valor: '08', nome: 'Agosto' },
    { valor: '09', nome: 'Setembro' },
    { valor: '10', nome: 'Outubro' },
    { valor: '11', nome: 'Novembro' },
    { valor: '12', nome: 'Dezembro' }
  ];

  useEffect(() => {
    let filtered = [...santos];
    
    if (searchTerm) {
      filtered = filtered.filter(santo => 
        santo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        santo.sobre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedMes !== 'Todos') {
      filtered = filtered.filter(santo => santo.mes === selectedMes);
    }
    
    filtered.sort((a, b) => {
      if (a.mes !== b.mes) {
        return parseInt(a.mes) - parseInt(b.mes);
      }
      return parseInt(a.dia) - parseInt(b.dia);
    });
    
    setFilteredSantos(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedMes]);

  useEffect(() => {
    const sortedSantos = [...santos].sort((a, b) => {
      if (a.mes !== b.mes) {
        return parseInt(a.mes) - parseInt(b.mes);
      }
      return parseInt(a.dia) - parseInt(b.dia);
    });
    
    setFilteredSantos(sortedSantos);
    setLoading(false);
  }, []);

  const totalPages = Math.ceil(filteredSantos.length / itemsPerPage);
  
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSantos.slice(startIndex, endIndex);
  };

  const formatarData = (dia: string, mes: string) => {
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    const mesIndex = parseInt(mes) - 1;
    return `${parseInt(dia)} de ${meses[mesIndex]}`;
  };

  const SkeletonCard = () => (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 mb-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-6 w-[80%] mb-1" />
      </CardHeader>
      <CardContent className="flex-grow">
        <Skeleton className="h-48 w-full mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-[80%] mb-2" />
        <Skeleton className="h-4 w-[60%]" />
      </CardContent>
      <CardFooter className="mt-auto pt-2">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto px-8 py-20 lg:py-32">
      <h1 className="text-4xl font-bold text-center mb-4 text-primary">Calendário dos Santos</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Conheça os santos e santas celebrados ao longo do ano litúrgico.
      </p>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <div className="relative w-full max-w-lg">
          <Input
            type="text"
            placeholder="Pesquisar santos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full md:w-auto min-w-[200px]">
          <Select value={selectedMes} onValueChange={setSelectedMes}>
            <SelectTrigger>
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {meses.map(mes => (
                <SelectItem key={mes.valor} value={mes.valor}>{mes.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentPageItems().map(santo => (
              <Card key={santo.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline">
                      {formatarData(santo.dia, santo.mes)}
                    </Badge>
                    
                  </div>
                  <CardTitle className="line-clamp-2">{santo.nome}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="relative h-48 w-full mb-4">
                    {santo.imagem ? (
                      <SantoImage
                        src={santo.imagem}
                        alt={santo.nome}
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <Image
                        src="/placeholder.svg?height=192&width=384"
                        alt={santo.nome}
                        fill
                        className="object-cover rounded-lg bg-muted"
                      />
                    )}
                  </div>
                  <p className="line-clamp-3 text-muted-foreground">
                    {santo.sobre}
                  </p>
                </CardContent>
                <CardFooter className="mt-auto pt-2">
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/santos/${santo.id}`}>Ver detalhes</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredSantos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Nenhum santo encontrado com os filtros selecionados.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedMes('Todos');
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
          
          {filteredSantos.length > 0 && (
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
        </>
      )}
    </div>
  );
} 