import type { Metadata } from "next"

import { FAQSection } from "@/components/sections/FAQSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { LiturgiaHojeSection } from "@/components/sections/LiturgiaHojeSection"
import { PartnersSection } from "@/components/sections/PartnersSection"
import { RosarioSection } from "@/components/sections/RosarioSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { JsonLd } from "@/components/JsonLd"
import { homeFaqItems } from "@/data/home"
import { getRosarioMysteryForWeekday, rosarioMysteries } from "@/data/rosario"
import { formatWeekdayDayMonth, todayInBrazil, weekdayNames } from "@/lib/calendar"
import { getLiturgiaDoDia } from "@/lib/liturgia"
import { getSantoDoDia } from "@/lib/santo-do-dia"
import {
  buildMetadata,
  buildOrganizationSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
} from "@/lib/seo"

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: "Portal católico para oração, liturgia e formação",
  description:
    "Devocionário reúne orações, liturgia diária, santos e conteúdos católicos com leitura clara em qualquer tela.",
  pathname: "/",
})

export default async function Home() {
  const today = todayInBrazil()
  const liturgia = await getLiturgiaDoDia()
  const santoDoDia = getSantoDoDia(today)
  const rosarioDoDia = getRosarioMysteryForWeekday(today.weekday)

  const websiteSchema = buildWebsiteSchema()
  const organizationSchema = buildOrganizationSchema()
  const homePageSchema = buildWebPageSchema({
    title: "Portal católico para oração, liturgia e formação",
    description:
      "Devocionário reúne orações, liturgia diária, santos e conteúdos católicos com leitura clara em qualquer tela.",
    pathname: "/",
  })

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
      <JsonLd data={homePageSchema} />
      <JsonLd data={faqSchema} />

      <div className="flex w-full flex-col">
        <HeroSection dateLabel={formatWeekdayDayMonth(today)} santoDoDia={santoDoDia} />
        {liturgia ? <LiturgiaHojeSection liturgia={liturgia} /> : null}
        <RosarioSection
          mysteries={rosarioMysteries}
          todayId={rosarioDoDia.id}
          weekdayLabel={weekdayNames[today.weekday]}
        />
        <FeaturesSection />
        <PartnersSection />
        <TestimonialsSection />
        <FAQSection />
      </div>
    </>
  )
}
