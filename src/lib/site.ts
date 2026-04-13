export const siteConfig = {
  name: "Devocionário",
  shortName: "Devocionário",
  url: "https://www.devocionario.app",
  description:
    "Portal católico com orações, liturgia diária, santos e conteúdos para fortalecer a vida espiritual.",
  locale: "pt-BR",
  themeColor: "#f6f1e7",
  ogImage: "/opengraph-image",
  ogImageAlt:
    "Devocionário com orações, liturgia diária, santos e conteúdo católico para compartilhar.",
  contactEmail: "contato@devocionario.com",
  defaultAuthor: "Equipe Devocionário",
  keywords: [
    "devocionário",
    "orações católicas",
    "liturgia diária",
    "santos do dia",
    "santo rosário",
    "rotina católica",
    "oração do dia",
    "conteúdo católico",
    "fé católica",
  ],
  defaultPublishedAt: "2026-04-13T00:00:00.000Z",
} as const

export const navLinks = [
  { name: "Santo Rosário", href: "/rosario" },
  { name: "Liturgia", href: "/liturgia" },
  { name: "Orações", href: "/oracoes" },
  { name: "Rotina Católica", href: "/rotina" },
  { name: "Santos", href: "/santos" },
  { name: "Blog", href: "/blog" },
] as const
