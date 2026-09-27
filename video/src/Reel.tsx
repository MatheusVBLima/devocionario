import { Audio } from "@remotion/media"
import { fade } from "@remotion/transitions/fade"
import { linearTiming, TransitionSeries } from "@remotion/transitions"
import { useEffect, useState } from "react"
import { cancelRender, continueRender, delayRender, interpolate, Sequence, staticFile } from "remotion"

import { Intro } from "./components/Intro"
import { Outro } from "./components/Outro"
import { PhoneShow } from "./components/PhoneShow"
import { fontsLoaded } from "./fonts"
import {
  INTRO_DURATION,
  OUTRO_DURATION,
  PHONE_DURATION,
  PHONE_START,
  SCENE_FADE,
  segments,
  segmentStarts,
  TOTAL_FRAMES,
} from "./timeline"

const taps = segments.flatMap((segment, index) =>
  segment.taps.map((tap) => PHONE_START + segmentStarts[index] + tap.at),
)

export function Reel() {
  const [handle] = useState(() => delayRender("Carregando fontes"))

  useEffect(() => {
    fontsLoaded.then(() => continueRender(handle)).catch((error) => cancelRender(error))
  }, [handle])

  return (
    <>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO_DURATION}>
          <Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: SCENE_FADE })} />
        <TransitionSeries.Sequence durationInFrames={PHONE_DURATION}>
          <PhoneShow />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: SCENE_FADE })} />
        <TransitionSeries.Sequence durationInFrames={OUTRO_DURATION}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Audio
        src={staticFile("audio/trilha.wav")}
        volume={(frame) =>
          interpolate(frame, [0, 10, TOTAL_FRAMES - 45, TOTAL_FRAMES], [0, 0.9, 0.9, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      {taps.map((frame) => (
        <Sequence key={frame} from={frame} durationInFrames={12} layout="none">
          <Audio src={staticFile("audio/toque.wav")} volume={0.45} />
        </Sequence>
      ))}
    </>
  )
}
