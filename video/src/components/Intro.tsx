import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion"

import { colors, fonts } from "../constants"
import { Highlighted, Kicker, Wordmark } from "./Brand"

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const
const lines = ["Um lugar simples", "para rezar, ler e", "acompanhar a vida da", "Igreja *todos os dias.*"]

export function Intro() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const logo = interpolate(frame, [0, 14], [0, 1], clamp)
  const arch = spring({ frame: frame - 16, fps, config: { damping: 20 }, durationInFrames: 40 })

  return (
    <AbsoluteFill style={{ background: colors.background, alignItems: "center" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 12, background: colors.liturgical }} />
      <div style={{ position: "absolute", top: 200, opacity: logo, transform: `translateY(${(1 - logo) * 20}px)` }}>
        <Wordmark size={88} />
      </div>
      <div style={{ position: "absolute", top: 380, left: 90, right: 90 }}>
        <div style={{ opacity: interpolate(frame, [6, 18], [0, 1], clamp) }}>
          <Kicker>Portal católico</Kicker>
        </div>
        <div style={{ marginTop: 28, fontFamily: fonts.serif, fontSize: 96, lineHeight: 1.0, letterSpacing: "-0.015em", color: colors.foreground }}>
          {lines.map((line, index) => {
            const progress = interpolate(frame, [8 + index * 5, 24 + index * 5], [0, 1], clamp)
            return (
              <div key={line} style={{ opacity: progress, transform: `translateY(${(1 - progress) * 30}px)` }}>
                <Highlighted text={line} accent={colors.liturgical} />
              </div>
            )
          })}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 880,
          width: 700,
          height: 1000,
          borderRadius: "350px 350px 0 0",
          overflow: "hidden",
          transform: `translateY(${(1 - arch) * 500}px)`,
          opacity: arch,
          boxShadow: "0 30px 80px rgba(27, 26, 24, 0.2)",
        }}
      >
        <Img
          src={staticFile("hero-virgem-em-oracao.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${interpolate(frame, [0, 80], [1.15, 1.02], clamp)})`,
          }}
        />
      </div>
    </AbsoluteFill>
  )
}
