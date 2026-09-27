"use client"

import { Button } from "@/components/ui/button"

type ShareButtonsProps = {
  title: string
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${title} - ${window.location.href}`)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <section className="flex flex-col gap-4 border-t pt-8">
      <h2 className="font-mono text-xs tracking-[0.08em] text-liturgical-ink uppercase">
        Compartilhar este conteúdo
      </h2>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={shareWhatsApp}>
          Compartilhar no WhatsApp
        </Button>
        <Button variant="outline" onClick={shareTwitter}>
          Compartilhar no Twitter
        </Button>
      </div>
    </section>
  )
}
