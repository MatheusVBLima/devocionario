import { interpolate } from "remotion"

import { SCREEN_SCALE } from "../constants"

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const

/** Marca de toque: o "dedo" aparece, pressiona e solta uma onda. */
export function TapIndicator({ frame, x, y }: { frame: number; x: number; y: number }) {
  if (frame < -12 || frame > 24) return null

  const size = 46 * SCREEN_SCALE
  const approach = interpolate(frame, [-12, 0], [0, 1], clamp)
  const press = interpolate(frame, [0, 3, 8], [1, 0.78, 1], clamp)
  const scale = interpolate(approach, [0, 1], [1.5, 1]) * press
  const opacity = approach * interpolate(frame, [10, 20], [1, 0], clamp)
  const ripple = interpolate(frame, [0, 22], [0, 1], clamp)

  return (
    <div style={{ position: "absolute", left: x * SCREEN_SCALE, top: y * SCREEN_SCALE, pointerEvents: "none" }}>
      {frame >= 0 ? (
        <div
          style={{
            position: "absolute",
            width: size,
            height: size,
            left: -size / 2,
            top: -size / 2,
            borderRadius: "50%",
            border: "5px solid rgba(46, 118, 80, 0.9)",
            transform: `scale(${1 + ripple * 1.6})`,
            opacity: 1 - ripple,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          left: -size / 2,
          top: -size / 2,
          borderRadius: "50%",
          background: "rgba(27, 26, 24, 0.28)",
          border: "4px solid rgba(255, 255, 255, 0.95)",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.25)",
          transform: `scale(${scale})`,
          opacity,
        }}
      />
    </div>
  )
}
