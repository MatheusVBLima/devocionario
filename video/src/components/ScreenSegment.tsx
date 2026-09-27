import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion"

import { SCREEN_CSS_WIDTH, SCREEN_SCALE } from "../constants"
import { scrollAt } from "../motion"
import { HEADER_HEIGHT, shots, type Segment, type ShotName } from "../timeline"
import { TapIndicator } from "./TapIndicator"

const FADE = 4

function Shot({ name, scroll, opacity }: { name: ShotName; scroll: number; opacity: number }) {
  const shot = shots[name]
  const src = staticFile(shot.src)
  const width = SCREEN_CSS_WIDTH * SCREEN_SCALE
  const height = shot.height * SCREEN_SCALE

  return (
    <AbsoluteFill style={{ opacity }}>
      <Img src={src} style={{ position: "absolute", left: 0, top: -scroll * SCREEN_SCALE, width, height }} />
      {/* Cabeçalho fixo do site, recortado da própria captura. */}
      {scroll > 0 ? (
        <div style={{ position: "absolute", left: 0, top: 0, width, height: HEADER_HEIGHT * SCREEN_SCALE, overflow: "hidden" }}>
          <Img src={src} style={{ position: "absolute", left: 0, top: 0, width, height }} />
        </div>
      ) : null}
    </AbsoluteFill>
  )
}

export function ScreenSegment({ segment }: { segment: Segment }) {
  const frame = useCurrentFrame()
  const scroll = scrollAt(segment, frame)

  let current = 0
  segment.states.forEach((state, index) => {
    if (frame >= state.at) current = index
  })
  const fadeIn = current === 0 ? 1 : interpolate(frame, [segment.states[current].at, segment.states[current].at + FADE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })

  return (
    <AbsoluteFill style={{ backgroundColor: "#f5f4f0", overflow: "hidden" }}>
      {current > 0 && fadeIn < 1 ? <Shot name={segment.states[current - 1].shot} scroll={scroll} opacity={1} /> : null}
      <Shot name={segment.states[current].shot} scroll={scroll} opacity={fadeIn} />
      {segment.taps.map((tap) => (
        <TapIndicator key={tap.at} frame={frame - tap.at} x={tap.x} y={tap.y - scroll} />
      ))}
    </AbsoluteFill>
  )
}
