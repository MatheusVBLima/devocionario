// Gera a trilha original do vídeo (e o som de toque) sem dependências.
// Arranjo suave sobre a progressão do Cânone de Pachelbel (domínio público):
// pad, arpejo tipo harpa, baixo, melodia de sino e reverb de igreja.
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const outDir = path.join(root, "public", "audio")
const SR = 44100
const DURATION = Number(process.env.MUSIC_SECONDS ?? 42)
const BPM = 76
const BEAT = 60 / BPM
const BAR = BEAT * 4

const midiToHz = (m) => 440 * 2 ** ((m - 69) / 12)

// Acordes (triade em midi, oitava 4) e nota da melodia por compasso.
const chords = {
  D: [62, 66, 69],
  A: [57, 61, 64],
  Bm: [59, 62, 66],
  "F#m": [54, 57, 61],
  G: [55, 59, 62],
}
const progression = ["D", "A", "Bm", "F#m", "G", "D", "G", "A", "D", "A", "Bm", "F#m", "G", "D"]
const melody = [78, 76, 74, 73, 71, 69, 71, 73, 74, 73, 71, 69, 67, 66]

const total = Math.ceil(DURATION * SR)
const L = new Float32Array(total)
const R = new Float32Array(total)

function addTone({ start, length, freq, gain, pan = 0, attack = 0.01, release = 0.3, decay = 0, harmonics = [1], detune = 0 }) {
  const s0 = Math.floor(start * SR)
  const n = Math.floor((length + release) * SR)
  const gl = gain * Math.cos(((pan + 1) * Math.PI) / 4)
  const gr = gain * Math.sin(((pan + 1) * Math.PI) / 4)
  const phases = harmonics.map(() => Math.random() * Math.PI * 2)
  for (let i = 0; i < n; i++) {
    const idx = s0 + i
    if (idx < 0 || idx >= total) continue
    const t = i / SR
    let env = Math.min(1, t / attack)
    if (decay) env *= Math.exp(-t / decay)
    if (t > length) env *= Math.max(0, 1 - (t - length) / release)
    if (env <= 0) continue
    let v = 0
    for (let h = 0; h < harmonics.length; h++) {
      const f = freq * (h + 1) * (1 + detune)
      // Harmônicos agudos somem mais rápido (timbre de corda dedilhada / sino).
      const hEnv = decay ? Math.exp(-t * h * 1.6) : 1
      v += harmonics[h] * hEnv * Math.sin(2 * Math.PI * f * t + phases[h])
    }
    v *= env
    L[idx] += v * gl
    R[idx] += v * gr
  }
}

progression.forEach((name, bar) => {
  const start = bar * BAR
  if (start >= DURATION) return
  const last = bar === progression.length - 1
  const length = last ? Math.max(BAR, DURATION - start - 2.5) : BAR
  const [root, third, fifth] = chords[name]

  // Pad: vozes levemente desafinadas, ataque lento.
  for (const note of [root, third, fifth, root + 12]) {
    for (const [detune, pan] of [[-0.0025, -0.5], [0.0025, 0.5]]) {
      addTone({
        start: start - 0.15, length: length + 0.2, freq: midiToHz(note - 12), gain: 0.028,
        pan, attack: 1.1, release: 1.6, harmonics: [1, 0.35, 0.18, 0.08, 0.04], detune,
      })
    }
  }

  // Baixo a partir do 2º compasso.
  if (bar >= 1) {
    addTone({ start, length: length - 0.1, freq: midiToHz(root - 24), gain: 0.12, attack: 0.25, release: 1.2, harmonics: [1, 0.3, 0.1] })
  }

  // Arpejo de harpa em colcheias.
  if (!last) {
    const pattern = [root, fifth, root + 12, third + 12, fifth + 12, third + 12, root + 12, fifth]
    pattern.forEach((note, step) => {
      addTone({
        start: start + step * (BEAT / 2), length: 0.05, freq: midiToHz(note), gain: 0.055,
        pan: step % 2 ? 0.35 : -0.35, attack: 0.004, decay: 1.1, release: 1.4,
        harmonics: [1, 0.5, 0.25, 0.12, 0.06],
      })
    })
  } else {
    [root, fifth, root + 12, third + 12, fifth + 12].forEach((note, step) => {
      addTone({
        start: start + step * 0.12, length: 0.05, freq: midiToHz(note), gain: 0.06,
        pan: step % 2 ? 0.3 : -0.3, attack: 0.004, decay: 2.2, release: 2.5, harmonics: [1, 0.5, 0.25, 0.12],
      })
    })
  }

  // Melodia de sino a partir do 3º compasso.
  if (bar >= 2) {
    addTone({
      start, length: 0.1, freq: midiToHz(melody[bar]), gain: 0.07, attack: 0.006,
      decay: 2.4, release: 2.4, harmonics: [1, 0, 0.22, 0, 0.08],
    })
    addTone({
      start: start + BEAT * 2.5, length: 0.1, freq: midiToHz(bar % 2 ? third + 12 : fifth + 12), gain: 0.035, attack: 0.006,
      decay: 1.6, release: 1.6, harmonics: [1, 0, 0.2],
    })
  }
})

// Reverb estilo Freeverb (8 combs + 4 allpass por canal).
function reverb(input, spread) {
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((d) => d + spread)
  const allpasses = [556, 441, 341, 225].map((d) => d + spread)
  const feedback = 0.86
  const damp = 0.3
  const out = new Float32Array(input.length)
  for (const delay of combs) {
    const buf = new Float32Array(delay)
    let pos = 0
    let store = 0
    for (let i = 0; i < input.length; i++) {
      const y = buf[pos]
      store = y * (1 - damp) + store * damp
      buf[pos] = input[i] * 0.015 + store * feedback
      out[i] += y
      pos = (pos + 1) % delay
    }
  }
  for (const delay of allpasses) {
    const buf = new Float32Array(delay)
    let pos = 0
    for (let i = 0; i < out.length; i++) {
      const bufout = buf[pos]
      const x = out[i]
      out[i] = -x + bufout
      buf[pos] = x + bufout * 0.5
      pos = (pos + 1) % delay
    }
  }
  return out
}

const wetL = reverb(L, 0)
const wetR = reverb(R, 23)
const mixL = new Float32Array(total)
const mixR = new Float32Array(total)
for (let i = 0; i < total; i++) {
  const t = i / SR
  const fade = Math.min(1, t / 1.2) * Math.min(1, (DURATION - t) / 3)
  mixL[i] = Math.tanh((L[i] * 0.8 + wetL[i] * 0.9) * 1.1) * fade
  mixR[i] = Math.tanh((R[i] * 0.8 + wetR[i] * 0.9) * 1.1) * fade
}

function writeWav(file, channels) {
  let peak = 0
  for (const ch of channels) for (const v of ch) peak = Math.max(peak, Math.abs(v))
  const gain = peak > 0 ? 0.84 / peak : 1
  const frames = channels[0].length
  const buffer = Buffer.alloc(44 + frames * channels.length * 2)
  buffer.write("RIFF", 0)
  buffer.writeUInt32LE(36 + frames * channels.length * 2, 4)
  buffer.write("WAVEfmt ", 8)
  buffer.writeUInt32LE(16, 16)
  buffer.writeUInt16LE(1, 20)
  buffer.writeUInt16LE(channels.length, 22)
  buffer.writeUInt32LE(SR, 24)
  buffer.writeUInt32LE(SR * channels.length * 2, 28)
  buffer.writeUInt16LE(channels.length * 2, 32)
  buffer.writeUInt16LE(16, 34)
  buffer.write("data", 36)
  buffer.writeUInt32LE(frames * channels.length * 2, 40)
  let offset = 44
  for (let i = 0; i < frames; i++) {
    for (const ch of channels) {
      buffer.writeInt16LE(Math.round(Math.max(-1, Math.min(1, ch[i] * gain)) * 32767), offset)
      offset += 2
    }
  }
  return writeFile(path.join(outDir, file), buffer)
}

// Som de toque: "tic" curto e macio.
const tapLength = Math.floor(0.12 * SR)
const tap = new Float32Array(tapLength)
for (let i = 0; i < tapLength; i++) {
  const t = i / SR
  tap[i] = Math.sin(2 * Math.PI * 1500 * t) * Math.exp(-t / 0.012) * 0.8
    + Math.sin(2 * Math.PI * 520 * t) * Math.exp(-t / 0.03) * 0.5
}

await mkdir(outDir, { recursive: true })
await writeWav("trilha.wav", [mixL, mixR])
await writeWav("toque.wav", [tap])
console.log(`trilha.wav: ${DURATION}s`)
