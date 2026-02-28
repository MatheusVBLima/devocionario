import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e7",
    theme_color: siteConfig.themeColor,
    lang: siteConfig.locale,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
