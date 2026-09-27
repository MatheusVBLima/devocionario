import type { Metadata, Viewport } from "next"
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"
import { getLiturgiaDoDia, liturgicalColorFor } from "@/lib/liturgia"
import { canonicalUrl } from "@/lib/routes"
import { siteConfig } from "@/lib/site"
import "./globals.css"

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
})

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.defaultAuthor }],
  creator: siteConfig.defaultAuthor,
  publisher: siteConfig.name,
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: canonicalUrl("/"),
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
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: canonicalUrl("/"),
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: canonicalUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [canonicalUrl(siteConfig.ogImage)],
  },
  category: "religion",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.themeColor },
    { media: "(prefers-color-scheme: dark)", color: "#151413" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // O site se veste com a cor do tempo litúrgico em que a Igreja está.
  const liturgia = await getLiturgiaDoDia()
  const liturgicalStyle = {
    "--liturgical": liturgicalColorFor(liturgia?.cor),
  } as React.CSSProperties

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      style={liturgicalStyle}
      className={`${hankenGrotesk.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <a
              href="#conteudo"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
            >
              Pular para o conteúdo
            </a>
            <div className="relative flex min-h-screen w-full flex-col">
              <Header />
              <main id="conteudo" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </NuqsAdapter>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
