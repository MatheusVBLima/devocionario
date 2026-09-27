import { renderOgImage, ogSize } from "@/lib/og"
import { siteConfig } from "@/lib/site"

export const alt = siteConfig.name
export const size = ogSize
export const contentType = "image/png"

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Portal católico",
    title: "Orações, liturgia diária e conteúdo católico com leitura clara e rápida.",
    subtitle: siteConfig.description,
  })
}
