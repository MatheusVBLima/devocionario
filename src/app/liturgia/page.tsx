'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LiturgiaData {
  data: string;
  liturgia: string;
  cor: string;
  oracoes: {
    coleta: string;
    oferendas: string;
    comunhao: string;
    extras: string[];
  };
  leituras: {
    primeiraLeitura: Array<{
      referencia: string;
      titulo: string;
      texto: string;
    }>;
    salmo: Array<{
      referencia: string;
      refrao: string;
      texto: string;
    }>;
    segundaLeitura: Array<{
      referencia: string;
      titulo: string;
      texto: string;
    }>;
    evangelho: Array<{
      referencia: string;
      titulo: string;
      texto: string;
    }>;
    extras: any[];
  };
  antifonas: {
    entrada: string;
    comunhao: string;
  };
}

export default function LiturgiaPage() {
  const [activeTab, setActiveTab] = useState('primeira');
  const [liturgia, setLiturgia] = useState<LiturgiaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLiturgia() {
      try {
        setLoading(true);
        const response = await fetch('https://liturgia.up.railway.app/v2/');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar dados da liturgia');
        }
        
        const data = await response.json();
        setLiturgia(data);
        setError('');
      } catch (err) {
        console.error('Erro ao buscar liturgia:', err);
        setError('Não foi possível carregar a liturgia do dia. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    fetchLiturgia();
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const formatarData = (dataString: string) => {
    if (!dataString) return '';
    
    const [dia, mes, ano] = dataString.split('/');
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]}, ${ano}`;
  };

  const obterDiaSemana = () => {
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return diasSemana[new Date().getDay()];
  };

  const LoadingContent = () => (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-8 w-60" />
        <Skeleton className="h-6 w-40" />
      </div>
      
      <div className="mt-8">
        <Skeleton className="h-10 w-full mb-4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-4/5 mb-2" />
            <Skeleton className="h-4 w-3/5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-8 py-20 lg:py-32">
      <h1 className="text-4xl font-bold text-center mb-4 text-primary">Liturgia Diária</h1>
      
      {loading ? (
        <LoadingContent />
      ) : error ? (
        <Alert variant="destructive" className="my-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : liturgia ? (
        <>
          <div className="text-center mb-10">
            <p className="text-xl text-muted-foreground mb-2">
              {formatarData(liturgia.data)} - {obterDiaSemana()}
            </p>
            <p className="text-lg">
              <span className="font-medium">{liturgia.liturgia}</span>
              <span className="mx-2">•</span>
              <span>Cor: {liturgia.cor}</span>
            </p>
          </div>
          
          <div className="block md:hidden mb-6">
            <Select value={activeTab} onValueChange={handleTabChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma leitura" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primeira">Primeira Leitura</SelectItem>
                <SelectItem value="salmo">Salmo</SelectItem>
                <SelectItem value="segunda">Segunda Leitura</SelectItem>
                <SelectItem value="evangelho">Evangelho</SelectItem>
                <SelectItem value="oracoes">Orações</SelectItem>
                <SelectItem value="antifonas">Antífonas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
            <TabsList className="hidden md:grid grid-cols-6 w-full">
              <TabsTrigger value="primeira">Primeira Leitura</TabsTrigger>
              <TabsTrigger value="salmo">Salmo</TabsTrigger>
              <TabsTrigger value="segunda">Segunda Leitura</TabsTrigger>
              <TabsTrigger value="evangelho">Evangelho</TabsTrigger>
              <TabsTrigger value="oracoes">Orações</TabsTrigger>
              <TabsTrigger value="antifonas">Antífonas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="primeira">
              {liturgia.leituras.primeiraLeitura.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{liturgia.leituras.primeiraLeitura[0].referencia}</CardTitle>
                    <CardDescription className="italic">{liturgia.leituras.primeiraLeitura[0].titulo}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-foreground mb-6 leading-relaxed whitespace-pre-line">
                      {liturgia.leituras.primeiraLeitura[0].texto}
                    </div>
                    <div className="text-primary font-medium">
                      <p>Palavra do Senhor.</p>
                      <p className="text-muted-foreground">Graças a Deus!</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="salmo">
              {liturgia.leituras.salmo.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{liturgia.leituras.salmo[0].referencia}</CardTitle>
                    <CardDescription className="italic">{liturgia.leituras.salmo[0].refrao}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-foreground mb-6 leading-relaxed whitespace-pre-line">
                      {liturgia.leituras.salmo[0].texto}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="segunda">
              {liturgia.leituras.segundaLeitura.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{liturgia.leituras.segundaLeitura[0].referencia}</CardTitle>
                    <CardDescription className="italic">{liturgia.leituras.segundaLeitura[0].titulo}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-foreground mb-6 leading-relaxed whitespace-pre-line">
                      {liturgia.leituras.segundaLeitura[0].texto}
                    </div>
                    <div className="text-primary font-medium">
                      <p>Palavra do Senhor.</p>
                      <p className="text-muted-foreground">Graças a Deus!</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="evangelho">
              {liturgia.leituras.evangelho.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{liturgia.leituras.evangelho[0].referencia}</CardTitle>
                    <CardDescription className="italic">{liturgia.leituras.evangelho[0].titulo}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-foreground mb-6 leading-relaxed whitespace-pre-line">
                      {liturgia.leituras.evangelho[0].texto}
                    </div>
                    <div className="text-primary font-medium">
                      <p>Palavra da Salvação.</p>
                      <p className="text-muted-foreground">Glória a vós, Senhor!</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="oracoes">
              <Card>
                <CardHeader>
                  <CardTitle>Orações do Dia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Oração da Coleta</h3>
                    <p className="text-foreground">{liturgia.oracoes.coleta}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Oração sobre as Oferendas</h3>
                    <p className="text-foreground">{liturgia.oracoes.oferendas}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Oração depois da Comunhão</h3>
                    <p className="text-foreground">{liturgia.oracoes.comunhao}</p>
                  </div>
                  
                  {liturgia.oracoes.extras.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Orações Extras</h3>
                      {liturgia.oracoes.extras.map((oracao, index) => (
                        <p key={index} className="text-foreground mb-2">{oracao}</p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="antifonas">
              <Card>
                <CardHeader>
                  <CardTitle>Antífonas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Antífona de Entrada</h3>
                    <p className="text-foreground">{liturgia.antifonas.entrada}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Antífona da Comunhão</h3>
                    <p className="text-foreground">{liturgia.antifonas.comunhao}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Alert className="my-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Aviso</AlertTitle>
          <AlertDescription>Nenhum dado da liturgia disponível no momento.</AlertDescription>
        </Alert>
      )}
    </div>
  );
} 