import type { Metadata } from "next"

import { FAQSection } from "@/components/sections/FAQSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { PartnersSection } from "@/components/sections/PartnersSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { JsonLd } from "@/components/JsonLd"
import { homeFaqItems } from "@/data/home"
import { buildMetadata } from "@/lib/seo"
import { canonicalUrl } from "@/lib/routes"

export const metadata: Metadata = buildMetadata({
  title: "Portal católico para oração, liturgia e formação",
  description:
    "Devocionário reúne orações, liturgia diária, santos e conteúdos católicos com leitura clara em qualquer tela.",
  pathname: "/",
})

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Devocionário",
    url: canonicalUrl("/"),
    inLanguage: "pt-BR",
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Devocionário",
    url: canonicalUrl("/"),
    logo: canonicalUrl("/logo.svg"),
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />

      <div className="relative flex w-full flex-col pb-8">
        <HeroSection />
        <FeaturesSection />
        <PartnersSection />
        <TestimonialsSection />
        <FAQSection />
      </div>
    </>
  )
}
