import { linearTiming, TransitionSeries } from "@remotion/transitions"
import { slide } from "@remotion/transitions/slide"
import { Fragment } from "react"
import { AbsoluteFill, Easing, spring, useCurrentFrame, useVideoConfig } from "remotion"

import { colors } from "../constants"
import { cameraAt } from "../motion"
import { SCREEN_TRANSITION, segments } from "../timeline"
import { Captions } from "./Captions"
import { Phone } from "./Phone"
import { ScreenSegment } from "./ScreenSegment"

export function PhoneShow() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const enter = spring({ frame, fps, config: { damping: 18, mass: 0.9 }, durationInFrames: 36 })
  const camera = cameraAt(frame)

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 60% at 50% 100%, rgba(46, 118, 80, 0.10), rgba(46, 118, 80, 0) 70%), ${colors.background}`,
      }}
    >
      <AbsoluteFill
        style={{
          transformOrigin: "0 0",
          transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`,
        }}
      >
        <AbsoluteFill style={{ transform: `translateY(${(1 - enter) * 900}px)` }}>
          <Phone>
            <TransitionSeries>
              {segments.map((segment, index) => (
                <Fragment key={segment.id}>
                  {index > 0 ? (
                    <TransitionSeries.Transition
                      presentation={slide({ direction: "from-right" })}
                      timing={linearTiming({ durationInFrames: SCREEN_TRANSITION, easing: Easing.bezier(0.65, 0, 0.35, 1) })}
                    />
                  ) : null}
                  <TransitionSeries.Sequence durationInFrames={segment.duration}>
                    <ScreenSegment segment={segment} />
                  </TransitionSeries.Sequence>
                </Fragment>
              ))}
            </TransitionSeries>
          </Phone>
        </AbsoluteFill>
      </AbsoluteFill>
      <Captions />
    </AbsoluteFill>
  )
}
