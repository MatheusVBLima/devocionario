import { Config } from "@remotion/cli/config"

// Saída pensada para Reels do Instagram: H.264 + AAC, 1080x1920, 30 fps.
Config.setVideoImageFormat("jpeg")
Config.setJpegQuality(95)
Config.setCodec("h264")
Config.setCrf(18)
Config.setPixelFormat("yuv420p")
Config.setColorSpace("bt709")
Config.setAudioCodec("aac")
Config.setOverwriteOutput(true)

// Permite usar um Chromium já instalado (ex.: REMOTION_BROWSER=/caminho/headless_shell).
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER)
}
