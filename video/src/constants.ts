// Formato Reels / Stories do Instagram (9:16).
export const WIDTH = 1080
export const HEIGHT = 1920
export const FPS = 30

export const colors = {
  background: "#f5f4f0",
  foreground: "#1b1a18",
  muted: "#6b675f",
  border: "#dedad1",
  liturgical: "#2e7650",
  dark: "#151413",
  darkForeground: "#ece9e2",
}

export const fonts = {
  serif: "'Instrument Serif', serif",
  sans: "'Hanken Grotesk', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

// Celular: a tela mostra o site em 400px CSS, ampliado 2x.
export const SCREEN_SCALE = 2
export const SCREEN_CSS_WIDTH = 400
export const SCREEN_CSS_HEIGHT = 860
export const BEZEL = 22
export const SCREEN_X = (WIDTH - SCREEN_CSS_WIDTH * SCREEN_SCALE) / 2
export const SCREEN_Y = 590
export const PHONE_X = SCREEN_X - BEZEL
export const PHONE_Y = SCREEN_Y - BEZEL

// Ponto para onde o zoom leva o toque (centro da área visível do celular).
export const CAMERA_CENTER = { x: WIDTH / 2, y: 1130 }
