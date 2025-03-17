import { Separator } from "@/components/ui/separator";
import { Wrapper } from "./utils/Wrapper";

export default function Footer() {
  return (
    <footer className="w-full py-20">
      <Separator className="my-6 md:my-8" />
      <Wrapper>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-3 md:mb-4">Devocionário</h3>
                <p className="text-muted-foreground max-w-md mx-auto md:mx-0">
                  Seu portal católico para orações, liturgia diária e conteúdo para sua vida espiritual.
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-3 md:mb-4">Contato</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Email: contato@devocionario.com</li>
                  <li>Telefone: (00) 0000-0000</li>
                </ul>
              </div>
            </div>
            <Separator className="my-6 md:my-8" />
            <div className="text-center text-muted-foreground text-sm md:text-base">
              <p>&copy; 2025 Devocionário. Todos os direitos reservados.</p>
            </div>  
      </Wrapper>
    </footer>
  );
} 