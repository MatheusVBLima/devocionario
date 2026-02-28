import type { Metadata } from "next"

import { canonicalUrl } from "@/lib/routes"
import { siteConfig } from "@/lib/site"

type MetadataInput = {
  title: string
  description: string
  pathname?: string
  imagePath?: string
  type?: "website" | "article"
}

export function buildMetadata({
  title,
  description,
  pathname = "/",
  imagePath = siteConfig.ogImage,
  type = "website",
}: MetadataInput): Metadata {
  const canonical = canonicalUrl(pathname)
  const image = canonicalUrl(imagePath)

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

type BreadcrumbItem = {
  name: string
  url: string
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
