import { navLinks, siteConfig } from "@/lib/site"
import { PrefetchLink } from "@/components/PrefetchLink"

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/60">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-6 lg:px-10">
        <div className="space-y-4">
          <p className="text-sm font-medium tracking-[0.22em] text-muted-foreground uppercase">
            {siteConfig.name}
          </p>
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight">
            Um portal católico para leitura, oração e acompanhamento da liturgia diária.
          </h2>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            Conteúdo organizado para facilitar a vida espiritual no cotidiano, com leitura confortável em desktop e mobile.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Navegação
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <PrefetchLink
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </PrefetchLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>{siteConfig.contactEmail}</li>
              <li>{siteConfig.url}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 text-sm text-muted-foreground md:px-6 lg:px-10">
          <p>© 2026 {siteConfig.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
