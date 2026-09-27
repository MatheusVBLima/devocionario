import { InstagramIcon } from "@/components/icons/InstagramIcon"
import { Container } from "@/components/layout/Container"
import { Kicker } from "@/components/layout/Kicker"
import { Logo } from "@/components/layout/Logo"
import { PrefetchLink } from "@/components/PrefetchLink"
import { navLinks, siteConfig } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-14 pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <Kicker>{siteConfig.name}</Kicker>
            <h2 className="max-w-2xl font-serif text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.12] text-balance italic">
              Um portal católico para leitura, oração e acompanhamento da liturgia diária.
            </h2>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              Conteúdo organizado para facilitar a vida espiritual no cotidiano, com leitura confortável em desktop e mobile.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs tracking-[0.08em] text-liturgical-ink uppercase">
                Navegação
              </h3>
              <ul className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <PrefetchLink href={link.href} className="text-sm hover:text-liturgical-ink">
                      {link.name}
                    </PrefetchLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs tracking-[0.08em] text-liturgical-ink uppercase">
                Contato
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li>
                  <a
                    href="https://instagram.com/devocionarioapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-liturgical-ink"
                  >
                    <InstagramIcon className="size-4" />
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            © 2026 {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  )
}
