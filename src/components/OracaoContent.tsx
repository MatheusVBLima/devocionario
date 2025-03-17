'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';
import { Oracao } from "@/data/oracoes";

interface OracaoContentProps {
  oracao: Oracao;
}

export function OracaoContent({ oracao }: OracaoContentProps) {
  const estimarTempo = (content: string) => {
    const palavras = content.split(/\s+/).length;
    const minutos = Math.max(1, Math.ceil(palavras / 150));
    return `${minutos} min de leitura`;
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${oracao.title} - ${window.location.href}`)}`, '_blank');
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== 'undefined') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${oracao.title}`)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <Badge className="text-sm">{oracao.category}</Badge>
        <span className="text-sm text-muted-foreground">
          {estimarTempo(oracao.content)}
        </span>
      </div>
      
      <h1 className="text-4xl font-bold text-primary mb-8">{oracao.title}</h1>
      
      {oracao.imageUrl && (
        <div className="relative h-[350px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={oracao.imageUrl}
            alt={oracao.title}
            fill
            className="object-cover object-center"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg?height=300&width=900";
            }}
          />
        </div>
      )}
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown>
          {oracao.content}
        </ReactMarkdown>
      </div>
      
      <div className="mt-12 pt-6 border-t">
        <h2 className="text-xl font-semibold mb-4">Compartilhar esta oração</h2>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            onClick={handleShareWhatsApp}
          >
            Compartilhar no WhatsApp
          </Button>
          <Button 
            variant="outline"
            onClick={handleShareTwitter}
          >
            Compartilhar no Twitter
          </Button>
        </div>
      </div>
    </>
  );
} 