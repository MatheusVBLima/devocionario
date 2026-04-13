import type { Metadata } from "next"

import { canonicalUrl } from "@/lib/routes"
import { siteConfig } from "@/lib/site"

type MetadataInput = {
  title: string
  description: string
  pathname?: string
  imagePath?: string
  type?: "website" | "article"
  keywords?: string[]
  section?: string
  publishedTime?: string
  modifiedTime?: string
}

export function buildMetadata({
  title,
  description,
  pathname = "/",
  imagePath = siteConfig.ogImage,
  type = "website",
  keywords = [],
  section,
  publishedTime,
  modifiedTime,
}: MetadataInput): Metadata {
  const canonical = canonicalUrl(pathname)
  const image = canonicalUrl(imagePath)
  const normalizedDescription = normalizeDescription(description)
  const imageAlt =
    imagePath === siteConfig.ogImage ? siteConfig.ogImageAlt : `${title} | ${siteConfig.name}`

  return {
    title,
    description: normalizedDescription,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: [{ name: siteConfig.defaultAuthor }],
    creator: siteConfig.defaultAuthor,
    publisher: siteConfig.name,
    category: section ?? "religion",
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: canonical,
      title,
      description: normalizedDescription,
      siteName: siteConfig.name,
      publishedTime,
      modifiedTime,
      section,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: normalizedDescription,
      images: [image],
    },
  }
}

export function normalizeDescription(text: string, maxLength = 160) {
  const normalized = text
    .replace(/<[^>]+>/g, " ")
    .replace(/\*\*/g, " ")
    .replace(/[_#>`]/g, " ")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim()

  if (normalized.length <= maxLength) return normalized

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`
}

export function parseBrazilianDate(date: string) {
  const months: Record<string, number> = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
  }

  const match = date
    .trim()
    .toLowerCase()
    .match(/^(\d{1,2})\s+de\s+([a-zçãé]+)\s+de\s+(\d{4})$/)

  if (!match) return siteConfig.defaultPublishedAt

  const [, day, monthName, year] = match
  const monthIndex = months[monthName]

  if (monthIndex === undefined) return siteConfig.defaultPublishedAt

  return new Date(Date.UTC(Number(year), monthIndex, Number(day), 12)).toISOString()
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

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: canonicalUrl("/"),
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
  }
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: canonicalUrl("/"),
    email: siteConfig.contactEmail,
    logo: canonicalUrl("/logo.svg"),
  }
}

type WebPageSchemaInput = {
  title: string
  description: string
  pathname: string
  imagePath?: string
  type?: "WebPage" | "CollectionPage" | "ProfilePage"
  mainEntity?: Record<string, unknown>
}

export function buildWebPageSchema({
  title,
  description,
  pathname,
  imagePath = siteConfig.ogImage,
  type = "WebPage",
  mainEntity,
}: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description: normalizeDescription(description),
    url: canonicalUrl(pathname),
    inLanguage: siteConfig.locale,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: canonicalUrl("/"),
    },
    primaryImageOfPage: canonicalUrl(imagePath),
    mainEntity,
  }
}

type CollectionItem = {
  name: string
  pathname: string
}

export function buildCollectionPageSchema({
  title,
  description,
  pathname,
  imagePath = siteConfig.ogImage,
  items,
}: {
  title: string
  description: string
  pathname: string
  imagePath?: string
  items: CollectionItem[]
}) {
  return buildWebPageSchema({
    title,
    description,
    pathname,
    imagePath,
    type: "CollectionPage",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: canonicalUrl(item.pathname),
      })),
    },
  })
}

export function buildArticleSchema({
  title,
  description,
  pathname,
  imagePath = siteConfig.ogImage,
  publishedTime = siteConfig.defaultPublishedAt,
  modifiedTime = siteConfig.defaultPublishedAt,
  author = siteConfig.defaultAuthor,
  tags = [],
  section,
}: {
  title: string
  description: string
  pathname: string
  imagePath?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
  section?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: normalizeDescription(description),
    image: [canonicalUrl(imagePath)],
    datePublished: publishedTime,
    dateModified: modifiedTime,
    inLanguage: siteConfig.locale,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: canonicalUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: canonicalUrl("/logo.svg"),
      },
    },
    articleSection: section,
    keywords: tags.join(", "),
    mainEntityOfPage: canonicalUrl(pathname),
  }
}

export function buildProfilePageSchema({
  title,
  description,
  pathname,
  imagePath = siteConfig.ogImage,
}: {
  title: string
  description: string
  pathname: string
  imagePath?: string
}) {
  return buildWebPageSchema({
    title,
    description,
    pathname,
    imagePath,
    type: "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: title,
      description: normalizeDescription(description),
      image: canonicalUrl(imagePath),
      url: canonicalUrl(pathname),
    },
  })
}
