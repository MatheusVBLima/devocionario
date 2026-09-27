import { Easing, interpolate } from "remotion"

import { CAMERA_CENTER, SCREEN_SCALE, SCREEN_X, SCREEN_Y } from "./constants"
import { segments, segmentStarts, type Segment } from "./timeline"

const ease = Easing.bezier(0.65, 0, 0.35, 1)
export const ZOOM_EASE_FRAMES = 16

/** Interpola entre pares [frame, valor] com easing suave entre cada par. */
export function keyframes(frame: number, points: [number, number][]) {
  if (points.length === 1 || frame <= points[0][0]) return points[0][1]
  for (let i = 1; i < points.length; i++) {
    const [f0, v0] = points[i - 1]
    const [f1, v1] = points[i]
    if (frame <= f1) {
      return interpolate(frame, [f0, f1], [v0, v1], { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    }
  }
  return points[points.length - 1][1]
}

export const scrollAt = (segment: Segment, frame: number) => keyframes(frame, segment.scroll)

/** Câmera (escala + translação) aplicada ao celular para aproximar os toques. */
export function cameraAt(phoneFrame: number) {
  let index = 0
  for (let i = 0; i < segments.length; i++) if (phoneFrame >= segmentStarts[i]) index = i
  const segment = segments[index]
  const frame = phoneFrame - segmentStarts[index]

  for (const zoom of segment.zooms) {
    if (frame < zoom.from || frame > zoom.to) continue
    const progress = interpolate(
      frame,
      [zoom.from, zoom.from + ZOOM_EASE_FRAMES, zoom.to - ZOOM_EASE_FRAMES, zoom.to],
      [0, 1, 1, 0],
      { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    )
    const scroll = scrollAt(segment, frame)
    const focus = {
      x: SCREEN_X + zoom.x * SCREEN_SCALE,
      y: SCREEN_Y + (zoom.y - scroll) * SCREEN_SCALE,
    }
    const scale = 1 + (zoom.scale - 1) * progress
    const target = {
      x: focus.x + (CAMERA_CENTER.x - focus.x) * progress,
      y: focus.y + (CAMERA_CENTER.y - focus.y) * progress,
    }
    return { scale, x: target.x - focus.x * scale, y: target.y - focus.y * scale }
  }
  return { scale: 1, x: 0, y: 0 }
}
