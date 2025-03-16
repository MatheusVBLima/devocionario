import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbNav } from '@/components/BreadcrumbNav';


const noticiasData = [
  {
    id: 1,
    titulo: 'Papa Francisco convoca Jubileu de 2025 com o tema "Peregrinos de Esperança"',
    resumo: 'O Vaticano divulgou detalhes sobre o próximo Ano Santo que atrairá milhões de peregrinos a Roma.',
    data: '15 de março de 2024',
    autor: 'Redação',
    categoria: 'Vaticano',

    conteudo: `
      <p>O Papa Francisco oficialmente anunciou que o Jubileu de 2025 terá como tema "Peregrinos de Esperança". Em documento divulgado pelo Vaticano, o pontífice destacou que este Ano Santo será uma oportunidade para renovar a esperança em tempos difíceis.</p>
      
      <p>"Em um mundo marcado por guerras, pandemias e divisões crescentes, a esperança é o combustível que mantém viva a fé", afirmou o Papa. "Queremos que este Jubileu seja um tempo de cura e renovação para toda a Igreja e para o mundo."</p>
      
      <p>O Jubileu é uma tradição que remonta ao Antigo Testamento e ocorre a cada 25 anos na Igreja Católica moderna. Durante este período especial, os fiéis podem obter indulgências plenárias e são incentivados a fazer peregrinações a Roma e outros lugares santos.</p>
      
      <p>Preparativos já estão em andamento na Cidade Eterna, com reformas nas principais basílicas e organização de infraestrutura para receber os milhões de peregrinos esperados. O evento começará oficialmente com a abertura da Porta Santa na Basílica de São Pedro em 24 de dezembro de 2024 e se estenderá por todo o ano de 2025.</p>
      
      <p>Além das celebrações em Roma, dioceses em todo o mundo são encorajadas a organizar eventos locais que permitam que os fiéis participem do espírito do Jubileu mesmo sem viajar para o Vaticano.</p>
      
      <p>"Queremos que este seja um Jubileu descentralizado, que alcance as periferias geográficas e existenciais", explicou o Cardeal responsável pela organização do evento.</p>
    `,
    tags: ['Jubileu', 'Papa Francisco', 'Vaticano', 'Peregrinação', 'Ano Santo']
  },
  {
    id: 2,
    titulo: 'Concluído importante trabalho de restauração na Basílica da Natividade em Belém',
    resumo: 'Após 10 anos de meticuloso trabalho, a histórica igreja construída sobre o local de nascimento de Jesus brilha novamente.',
    data: '12 de março de 2024',
    autor: 'Redação',
    categoria: 'Terra Santa',
    
    conteudo: `
      <p>A Basílica da Natividade em Belém, um dos templos cristãos mais antigos do mundo, construída sobre o local tradicional do nascimento de Jesus Cristo, acaba de passar pelo mais extensivo projeto de restauração de sua história recente.</p>
      
      <p>Iniciado em 2013, o projeto envolveu especialistas de diversos países e custou aproximadamente 18 milhões de euros, financiados por doações internacionais. O trabalho incluiu a restauração de mosaicos do século XII, colunas antigas, madeiras históricas e a reforma completa do telhado que apresentava infiltrações sérias.</p>
      
      <p>"O resultado é simplesmente espetacular", comentou o padre franciscano responsável pela custódia do local. "Mosaicos que estavam escondidos sob séculos de fuligem agora revelam cores vibrantes e detalhes impressionantes. É como se a basílica tivesse ganhado vida novamente."</p>
      
      <p>Uma das descobertas mais significativas durante o trabalho foi um mosaico de um anjo que estava completamente coberto por modificações posteriores. Outras revelações incluíram inscrições antigas nas paredes e evidências arqueológicas da estrutura original da igreja do século IV.</p>
      
      <p>A Basílica da Natividade é administrada conjuntamente pela Igreja Católica Romana, pela Igreja Ortodoxa Grega e pela Igreja Apostólica Armênia, em um raro exemplo de cooperação ecumênica. O local recebe mais de dois milhões de peregrinos e turistas anualmente.</p>
      
      <p>As autoridades palestinas esperam que a restauração atraia ainda mais visitantes à região, impulsionando o turismo religioso em Belém. "Esta basílica é não apenas um tesouro da fé cristã, mas também um patrimônio da humanidade", afirmou o ministro do turismo palestino.</p>
    `,
    tags: ['Terra Santa', 'Belém', 'Restauração', 'Basílica da Natividade', 'Patrimônio']
  }
];

export default async function NoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const noticiaId = parseInt(id);
  const noticia = noticiasData.find(n => n.id === noticiaId);
  
  if (!noticia) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: noticia.titulo }
  ];

  return (
    <article className="container mx-auto px-8 py-20 lg:py-32">
      
        <BreadcrumbNav items={breadcrumbItems} />
        
        {/* Cabeçalho da notícia */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">{noticia.categoria}</Badge>
            <Badge variant="secondary">{noticia.data}</Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-primary">{noticia.titulo}</h1>
          <p className="text-xl text-muted-foreground mb-6">{noticia.resumo}</p>
          
          <div className="text-sm text-muted-foreground mb-6">
            Por <span className="font-medium">{noticia.autor}</span>
          </div>
        </header>
        
     
        <div className="relative w-full h-[400px] mb-10 rounded-lg overflow-hidden">
        <Image
          src="/placeholder.svg"
          alt="Imagem não disponível"
          width={1200}
          height={400}
          className="object-cover w-full h-full"
        />
        </div>
        
        {/* Conteúdo da notícia */}
        <div 
          className="prose prose-stone dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
        />
        
        {/* Tags */}
        <Separator className="my-8" />
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {noticia.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Compartilhar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Compartilhar</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
                Facebook
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
                LinkedIn
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                </svg>
                Instagram
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Botão de voltar */}
        <div className="text-center">
          <Button asChild>
            <Link href="/blog">Voltar para todas as notícias</Link>
          </Button>
        </div>
      
    </article>
  );
} 