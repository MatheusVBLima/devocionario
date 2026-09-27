import { loadFont } from "@remotion/fonts"
import { staticFile } from "remotion"

const faces = [
  { family: "Instrument Serif", file: "InstrumentSerif.woff2", style: "normal", weight: "400" },
  { family: "Instrument Serif", file: "InstrumentSerif-Italic.woff2", style: "italic", weight: "400" },
  { family: "Hanken Grotesk", file: "HankenGrotesk.woff2", style: "normal", weight: "400 600" },
  { family: "JetBrains Mono", file: "JetBrainsMono.woff2", style: "normal", weight: "400 500" },
] as const

export const fontsLoaded = Promise.all(
  faces.map((face) =>
    loadFont({
      family: face.family,
      url: staticFile(`fonts/${face.file}`),
      style: face.style,
      weight: face.weight,
    }),
  ),
)
