import { Composition } from "remotion"

import { FPS, HEIGHT, WIDTH } from "./constants"
import { Reel } from "./Reel"
import { TOTAL_FRAMES } from "./timeline"

export const RemotionRoot = () => (
  <Composition
    id="DevocionarioReel"
    component={Reel}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
)
