import { oracoes } from "@/data/oracoes";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OracaoContent } from "@/components/OracaoContent";
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

export default async function OracaoPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const oracaoId = parseInt(id);
  const oracao = oracoes.find(o => o.id === oracaoId);
  
  if (!oracao) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Orações", href: "/oracoes" },
    { label: oracao.title, href: `/oracoes/${oracao.id}` },
  ];

  return (
    <div className="container mx-auto px-4 py-20 lg:py-32">
     <BreadcrumbNav items={breadcrumbItems}/>
      
      <OracaoContent oracao={oracao} />
      
      <div className="mt-8 flex justify-center">
        <Button asChild variant="secondary">
          <Link href="/oracoes">Ver todas as orações</Link>
        </Button>
      </div>
    </div>
  );
} 