import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion"

import { colors, fonts, PHONE_Y } from "../constants"
import { PHONE_DURATION, segments, segmentStarts } from "../timeline"
import { Highlighted, Kicker } from "./Brand"

const captions = segments.flatMap((segment, index) =>
  segment.captions.map((caption) => ({ ...caption, start: segmentStarts[index] + caption.at })),
)

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const

/** Faixa superior com as chamadas; fica por cima do celular durante o zoom. */
export function Captions() {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill
      style={{
        height: PHONE_Y - 6,
        background: `linear-gradient(to bottom, ${colors.background} 90%, rgba(245, 244, 240, 0))`,
      }}
    >
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 12, background: colors.liturgical }} />
      {captions.map((caption, index) => {
        const end = captions[index + 1]?.start ?? PHONE_DURATION + 30
        if (frame < caption.start - 2 || frame > end) return null
        const local = frame - caption.start
        const enter = interpolate(local, [0, 16], [0, 1], clamp)
        const titleEnter = interpolate(local, [4, 22], [0, 1], clamp)
        const exit = interpolate(frame, [end - 10, end], [1, 0], clamp)

        return (
          <div key={caption.start} style={{ position: "absolute", left: 90, right: 90, top: 196, opacity: exit }}>
            <div style={{ opacity: enter, transform: `translateY(${(1 - enter) * 20}px)` }}>
              <Kicker>{caption.kicker}</Kicker>
            </div>
            <div
              style={{
                marginTop: 30,
                fontFamily: fonts.serif,
                fontSize: 100,
                lineHeight: 1.0,
                letterSpacing: "-0.015em",
                color: colors.foreground,
                opacity: titleEnter,
                transform: `translateY(${(1 - titleEnter) * 36}px)`,
              }}
            >
              <Highlighted text={caption.title} accent={colors.liturgical} />
            </div>
          </div>
        )
      })}
    </AbsoluteFill>
  )
}
