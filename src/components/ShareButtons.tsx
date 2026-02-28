"use client"

import { Button } from "@/components/ui/button"

type ShareButtonsProps = {
  title: string
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const shareWhatsApp = () => {
    if (typeof window === "undefined") return
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${title} - ${window.location.href}`)}`,
      "_blank",
    )
  }

  const shareTwitter = () => {
    if (typeof window === "undefined") return
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
    )
  }

  return (
    <div className="mt-12 border-t pt-6">
      <h2 className="text-xl font-semibold">Compartilhar este conteúdo</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="outline" onClick={shareWhatsApp}>
          Compartilhar no WhatsApp
        </Button>
        <Button variant="outline" onClick={shareTwitter}>
          Compartilhar no Twitter
        </Button>
      </div>
    </div>
  )
}
