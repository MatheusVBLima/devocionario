import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion"

import { colors, fonts } from "../constants"
import { Highlighted, Kicker, Wordmark } from "./Brand"

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const
const accent = "#7fcb9d"

function InstagramGlyph({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function Outro() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const rise = (delay: number) => interpolate(frame, [delay, delay + 16], [0, 1], clamp)
  const pill = spring({ frame: frame - 26, fps, config: { damping: 14 }, durationInFrames: 30 })
  const arch = spring({ frame: frame - 8, fps, config: { damping: 22 }, durationInFrames: 40 })

  return (
    <AbsoluteFill style={{ background: colors.dark, alignItems: "center" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 12, background: colors.liturgical }} />
      <div
        style={{
          position: "absolute",
          top: 1180,
          width: 640,
          height: 900,
          borderRadius: "320px 320px 0 0",
          overflow: "hidden",
          opacity: arch * 0.9,
          transform: `translateY(${(1 - arch) * 300}px)`,
        }}
      >
        <Img src={staticFile("hero-virgem-em-oracao.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <AbsoluteFill style={{ background: `linear-gradient(to bottom, rgba(21,20,19,0) 40%, ${colors.dark} 96%)` }} />
      </div>

      <div style={{ position: "absolute", top: 230, opacity: rise(0), transform: `translateY(${(1 - rise(0)) * 20}px)` }}>
        <Wordmark size={92} dark />
      </div>

      <div
        style={{
          position: "absolute",
          top: 430,
          left: 90,
          right: 90,
          textAlign: "center",
          fontFamily: fonts.serif,
          fontSize: 118,
          lineHeight: 1.0,
          letterSpacing: "-0.015em",
          color: colors.darkForeground,
          whiteSpace: "pre-line",
          opacity: rise(8),
          transform: `translateY(${(1 - rise(8)) * 30}px)`,
        }}
      >
        <Highlighted text={"Reze com a Igreja\n*todos os dias.*"} accent={accent} />
      </div>

      <div style={{ position: "absolute", top: 790, display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
        <div style={{ opacity: rise(20) }}>
          <Kicker color={accent}>Acesse agora</Kicker>
        </div>
        <div
          style={{
            transform: `scale(${pill})`,
            background: colors.darkForeground,
            color: colors.dark,
            borderRadius: 999,
            padding: "28px 60px",
            fontFamily: fonts.sans,
            fontWeight: 600,
            fontSize: 64,
            letterSpacing: "-0.01em",
          }}
        >
          devocionario.app
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: colors.darkForeground,
            fontFamily: fonts.sans,
            fontSize: 40,
            opacity: rise(40),
          }}
        >
          <InstagramGlyph size={42} />
          @devocionarioapp
        </div>
      </div>
    </AbsoluteFill>
  )
}
