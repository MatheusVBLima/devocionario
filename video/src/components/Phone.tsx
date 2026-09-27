import type { ReactNode } from "react"

import { BEZEL, PHONE_X, PHONE_Y, SCREEN_CSS_HEIGHT, SCREEN_CSS_WIDTH, SCREEN_SCALE } from "../constants"

export const SCREEN_RADIUS = 78

/** Moldura de celular; a parte de baixo fica cortada pela borda do vídeo. */
export function Phone({ children }: { children: ReactNode }) {
  const width = SCREEN_CSS_WIDTH * SCREEN_SCALE
  const height = SCREEN_CSS_HEIGHT * SCREEN_SCALE

  return (
    <div
      style={{
        position: "absolute",
        left: PHONE_X,
        top: PHONE_Y,
        width: width + BEZEL * 2,
        height: height + BEZEL * 2,
        borderRadius: SCREEN_RADIUS + BEZEL,
        background: "linear-gradient(145deg, #2a2926, #0f0e0d)",
        boxShadow: "0 40px 90px rgba(27, 26, 24, 0.28), 0 0 0 2px #3a3833 inset",
        padding: BEZEL,
      }}
    >
      <div
        style={{
          position: "relative",
          width,
          height,
          borderRadius: SCREEN_RADIUS,
          overflow: "hidden",
          background: "#f5f4f0",
        }}
      >
        {children}
      </div>
    </div>
  )
}
