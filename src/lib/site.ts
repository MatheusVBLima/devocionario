export const siteConfig = {
  name: "Devocionário",
  shortName: "Devocionário",
  url: "https://www.devocionario.app",
  description:
    "Portal católico com orações, liturgia diária, santos e conteúdos para fortalecer a vida espiritual.",
  locale: "pt-BR",
  themeColor: "#f6f1e7",
  ogImage: "/opengraph-image",
  contactEmail: "contato@devocionario.com",
} as const

export const navLinks = [
  { name: "Santo Rosário", href: "/rosario" },
  { name: "Liturgia", href: "/liturgia" },
  { name: "Orações", href: "/oracoes" },
  { name: "Rotina Católica", href: "/rotina" },
  { name: "Santos", href: "/santos" },
  { name: "Blog", href: "/blog" },
] as const
