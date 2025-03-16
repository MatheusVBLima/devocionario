'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function LiturgiaPage() {
  const [activeTab, setActiveTab] = useState('primeira');
  
  // Dados da liturgia do dia (mock)
  const liturgiaHoje = {
    data: '16 de Março, 2025',
    diaSemana: 'Domingo',
    tempoLiturgico: 'Tempo da Quaresma',
    cor: 'Roxo',
    leituras: {
      primeira: {
        titulo: 'Primeira Leitura (Êx 20,1-17)',
        subtitulo: 'A lei foi dada por Moisés',
        conteudo: `Naqueles dias, Deus pronunciou todas estas palavras: "Eu sou o Senhor teu Deus que te tirou do Egito, da casa da escravidão. Não terás outros deuses além de mim. Não farás para ti imagem esculpida, nem figura alguma do que existe em cima, nos céus, ou embaixo, na terra, ou do que existe nas águas, debaixo da terra. Não te prostrarás diante desses deuses nem lhes prestarás culto, pois eu sou o Senhor teu Deus, um Deus ciumento. Castigo a culpa dos pais nos filhos até à terceira e quarta geração dos que me odeiam, mas uso de misericórdia por mil gerações com aqueles que me amam e guardam os meus mandamentos. Não pronunciarás o nome do Senhor teu Deus em vão, porque o Senhor não deixará sem castigo quem pronunciar seu nome em vão. Lembra-te de santificar o dia de sábado. Trabalharás durante seis dias e farás todos os teus trabalhos, mas o sétimo dia é sábado dedicado ao Senhor teu Deus. Não farás trabalho algum, nem tu, nem teu filho, nem tua filha, nem teu escravo, nem tua escrava, nem teu gado, nem o estrangeiro que vive em tuas cidades. Porque o Senhor fez em seis dias o céu, a terra, o mar e tudo o que eles contêm; mas no sétimo dia descansou. Por isso o Senhor abençoou o dia do sábado e o santificou. Honra teu pai e tua mãe, para que vivas longos anos na terra que o Senhor teu Deus te dará. Não matarás. Não cometerás adultério. Não furtarás. Não levantarás falso testemunho contra o teu próximo. Não cobiçarás a casa do teu próximo. Não cobiçarás a mulher do teu próximo, nem seu escravo, nem sua escrava, nem seu boi, nem seu jumento, nem coisa alguma que pertença ao teu próximo".`,
        referencia: 'Palavra do Senhor.',
        resposta: 'Graças a Deus!'
      },
      salmo: {
        titulo: 'Salmo Responsorial (Sl 18)',
        subtitulo: 'Senhor, tens palavras de vida eterna',
        conteudo: `R. Senhor, tens palavras de vida eterna.

A lei do Senhor Deus é perfeita,
conforto para a alma!
O testemunho do Senhor é fiel,
sabedoria dos humildes. R.

Os preceitos do Senhor são precisos,
alegria ao coração.
O mandamento do Senhor é brilhante,
para os olhos é uma luz. R.

É puro o temor do Senhor,
imutável para sempre.
Os julgamentos do Senhor são corretos
e justos igualmente. R.

Mais desejáveis do que o ouro são eles,
do que o ouro refinado.
Suas palavras são mais doces que o mel,
que o mel que sai dos favos. R.`,
        referencia: '',
        resposta: ''
      },
      segunda: {
        titulo: 'Segunda Leitura (1Cor 1,22-25)',
        subtitulo: 'Nós pregamos Cristo crucificado, escândalo para os homens, mas sabedoria de Deus para os que são chamados',
        conteudo: `Irmãos: Os judeus pedem sinais milagrosos, os gregos procuram sabedoria, mas nós pregamos Cristo crucificado, escândalo para os judeus e insensatez para os pagãos. Mas para os que são chamados, tanto judeus como gregos, esse Cristo é poder de Deus e sabedoria de Deus. Pois o que parece ser loucura de Deus é mais sábio do que os homens, e o que parece ser fraqueza de Deus é mais forte do que os homens.`,
        referencia: 'Palavra do Senhor.',
        resposta: 'Graças a Deus!'
      },
      evangelho: {
        titulo: 'Evangelho (Jo 2,13-25)',
        subtitulo: 'Destruí este templo, e em três dias eu o levantarei',
        conteudo: `Naquele tempo, estava próxima a Páscoa dos judeus e Jesus subiu a Jerusalém. No Templo, encontrou os vendedores de bois, ovelhas e pombas e os cambistas que estavam aí sentados. Fez então um chicote de cordas e expulsou todos do Templo, junto com as ovelhas e os bois; espalhou as moedas e derrubou as mesas dos cambistas. E disse aos que vendiam pombas: "Tirai isto daqui! Não façais da casa de meu Pai uma casa de comércio". Seus discípulos lembraram-se do que está na Escritura: "O zelo por tua casa me consumirá".

Então os judeus perguntaram a Jesus: "Que sinal nos mostras para agir assim?" Ele respondeu: "Destruí este Templo, e em três dias eu o levantarei". Os judeus disseram: "Este Templo foi construído em quarenta e seis anos, e tu o levantarás em três dias?" Mas Jesus estava falando do Templo do seu corpo. Quando Jesus ressuscitou, os discípulos lembraram-se do que ele tinha dito e acreditaram na Escritura e na palavra de Jesus.

Enquanto Jesus estava em Jerusalém, para a festa da Páscoa, muitos creram no seu nome, vendo os sinais que ele fazia. Mas Jesus não confiava neles, pois conhecia a todos; e não precisava do testemunho de ninguém acerca do ser humano, porque ele conhecia o que havia no interior do ser humano.`,
        referencia: 'Palavra da Salvação.',
        resposta: 'Glória a vós, Senhor!'
      }
    }
  };

  // Função para atualizar a tab ativa
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="container mx-auto px-8 py-20 lg:py-32">
      <h1 className="text-4xl font-bold text-center mb-4 text-primary">Liturgia Diária</h1>
      
      <div className="text-center mb-10">
        <p className="text-xl text-muted-foreground mb-2">{liturgiaHoje.data} - {liturgiaHoje.diaSemana}</p>
        <p className="text-lg">
          <span className="font-medium">{liturgiaHoje.tempoLiturgico}</span>
          <span className="mx-2">•</span>
          <span>Cor: {liturgiaHoje.cor}</span>
        </p>
      </div>
      
      {/* Controle para dispositivos móveis */}
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
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        {/* TabsList apenas para telas maiores */}
        <TabsList className="hidden md:grid grid-cols-4 w-full">
          <TabsTrigger value="primeira">Primeira Leitura</TabsTrigger>
          <TabsTrigger value="salmo">Salmo</TabsTrigger>
          <TabsTrigger value="segunda">Segunda Leitura</TabsTrigger>
          <TabsTrigger value="evangelho">Evangelho</TabsTrigger>
        </TabsList>
        
        <TabsContent value="primeira">
          <Card>
            <CardHeader>
              <CardTitle>{liturgiaHoje.leituras.primeira.titulo}</CardTitle>
              <CardDescription className="italic">{liturgiaHoje.leituras.primeira.subtitulo}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-foreground mb-6 leading-relaxed whitespace-pre-line">
                {liturgiaHoje.leituras.primeira.conteudo}
              </div>
              <div className="text-primary font-medium">
                <p>{liturgiaHoje.leituras.primeira.referencia}</p>
                <p className="text-muted-foreground">{liturgiaHoje.leituras.primeira.resposta}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="salmo">
          <Card>
            <CardHeader>
              <CardTitle>{liturgiaHoje.leituras.salmo.titulo}</CardTitle>
              <CardDescription className="italic">{liturgiaHoje.leituras.salmo.subtitulo}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-foreground mb-6 leading-relaxed whitespace-pre-line">
                {liturgiaHoje.leituras.salmo.conteudo}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="segunda">
          <Card>
            <CardHeader>
              <CardTitle>{liturgiaHoje.leituras.segunda.titulo}</CardTitle>
              <CardDescription className="italic">{liturgiaHoje.leituras.segunda.subtitulo}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-foreground mb-6 leading-relaxed whitespace-pre-line">
                {liturgiaHoje.leituras.segunda.conteudo}
              </div>
              <div className="text-primary font-medium">
                <p>{liturgiaHoje.leituras.segunda.referencia}</p>
                <p className="text-muted-foreground">{liturgiaHoje.leituras.segunda.resposta}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="evangelho">
          <Card>
            <CardHeader>
              <CardTitle>{liturgiaHoje.leituras.evangelho.titulo}</CardTitle>
              <CardDescription className="italic">{liturgiaHoje.leituras.evangelho.subtitulo}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-foreground mb-6 leading-relaxed whitespace-pre-line">
                {liturgiaHoje.leituras.evangelho.conteudo}
              </div>
              <div className="text-primary font-medium">
                <p>{liturgiaHoje.leituras.evangelho.referencia}</p>
                <p className="text-muted-foreground">{liturgiaHoje.leituras.evangelho.resposta}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 