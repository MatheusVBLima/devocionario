import manifest from "./shots.json"

export type ShotName = keyof typeof manifest.shots
type PointName = Exclude<keyof typeof manifest.points, "header">

export const shots = manifest.shots
export const HEADER_HEIGHT = manifest.points.header.height

const pt = (name: PointName) => manifest.points[name]

export type Caption = {
  at: number
  kicker: string
  /** Trechos entre *asteriscos* ficam em itálico na cor litúrgica. */
  title: string
}

export type Tap = { at: number; x: number; y: number }

export type Zoom = {
  from: number
  to: number
  /** Foco em coordenadas da página (px CSS). */
  x: number
  y: number
  scale: number
}

export type Segment = {
  id: string
  duration: number
  captions: Caption[]
  states: { at: number; shot: ShotName }[]
  /** Pares [frame, scrollY em px CSS], interpolados com easing. */
  scroll: [number, number][]
  taps: Tap[]
  zooms: Zoom[]
}

/** Quantos frames depois do toque a tela muda de estado. */
const REACTION = 4

const tapAt = (at: number, point: { x: number; y: number }): Tap => ({ at, x: point.x, y: point.y })

const typing = (start: number, step: number) => {
  const length = manifest.query.length
  return Array.from({ length }, (_, index) => ({
    at: start + index * step + (index === length - 1 ? 10 : 0),
    shot: `oracoes-busca-${index + 1}` as ShotName,
  }))
}

// Rolagem até deixar o título do rosário logo abaixo do cabeçalho.
const rosarioScroll = pt("rosarioTitle").top - 110
const coroacaoScroll = pt("coroacao").y - 360
const liturgiaScroll = pt("evangelho").y - 320
const buscaScroll = pt("busca").y - 250
const dicasScroll = pt("tip1").y - 190

export const segments: Segment[] = [
  {
    id: "home",
    duration: 345,
    captions: [
      { at: 0, kicker: "Portal católico", title: "Orações, liturgia e santos *em um só lugar.*" },
      { at: 140, kicker: "Santo Rosário", title: "Reze o terço com os *mistérios do dia.*" },
    ],
    states: [
      { at: 0, shot: "home" },
      { at: 208 + REACTION, shot: "home-dolorosos" },
      { at: 296 + REACTION, shot: "home-coroacao" },
    ],
    scroll: [
      [0, 0],
      [22, 0],
      [110, 880],
      [135, 880],
      [178, rosarioScroll],
      [255, rosarioScroll],
      [278, coroacaoScroll],
    ],
    taps: [tapAt(208, pt("dolorosos")), tapAt(296, pt("coroacao"))],
    zooms: [
      { from: 185, to: 252, x: 200, y: pt("dolorosos").y + 20, scale: 1.6 },
      { from: 280, to: 340, x: 200, y: pt("coroacao").y + 40, scale: 1.45 },
    ],
  },
  {
    id: "liturgia",
    duration: 165,
    captions: [{ at: 0, kicker: "Liturgia diária", title: "As leituras do dia, *sempre à mão.*" }],
    states: [
      { at: 0, shot: "liturgia" },
      { at: 66 + REACTION, shot: "liturgia-evangelho" },
    ],
    scroll: [
      [0, 0],
      [18, 0],
      [40, liturgiaScroll],
      [120, liturgiaScroll],
      [160, liturgiaScroll + 380],
    ],
    taps: [tapAt(66, pt("evangelho"))],
    zooms: [{ from: 42, to: 122, x: 200, y: pt("evangelho").y + 40, scale: 1.6 }],
  },
  {
    id: "oracoes",
    duration: 200,
    captions: [{ at: 0, kicker: "Orações", title: "A oração certa *para cada momento.*" }],
    states: [{ at: 0, shot: "oracoes" }, ...typing(64, 6)],
    scroll: [
      [0, 0],
      [12, 0],
      [34, buscaScroll],
      [140, buscaScroll],
      [195, buscaScroll + 760],
    ],
    taps: [tapAt(54, pt("busca"))],
    zooms: [{ from: 36, to: 142, x: pt("busca").x, y: pt("busca").y + 90, scale: 1.4 }],
  },
  {
    id: "rotina",
    duration: 180,
    captions: [{ at: 0, kicker: "Rotina católica", title: "Cultive hábitos *de oração.*" }],
    states: [
      { at: 0, shot: "rotina-0" },
      { at: 96 + REACTION, shot: "rotina-1" },
      { at: 128 + REACTION, shot: "rotina-2" },
    ],
    scroll: [
      [0, 0],
      [28, 0],
      [70, dicasScroll],
    ],
    taps: [tapAt(96, pt("tip1")), tapAt(128, pt("tip2"))],
    zooms: [{ from: 74, to: 175, x: 220, y: (pt("tip1").y + pt("tip2").y) / 2 - 20, scale: 1.4 }],
  },
  {
    id: "tema",
    duration: 200,
    captions: [
      { at: 0, kicker: "Modo oração", title: "Tema escuro para *rezar à noite.*" },
      { at: 104, kicker: "Tempo litúrgico", title: "As cores acompanham *o ano da Igreja.*" },
    ],
    states: [
      { at: 0, shot: "home" },
      { at: 40 + REACTION, shot: "tema-menu" },
      { at: 70 + REACTION, shot: "home-escuro" },
      { at: 104 + REACTION, shot: "tema-menu-escuro" },
      { at: 136 + REACTION, shot: "home-advento" },
    ],
    scroll: [
      [0, 0],
      [168, 0],
      [198, 260],
    ],
    taps: [
      tapAt(40, pt("tema")),
      tapAt(70, pt("escuro")),
      tapAt(104, pt("tema")),
      tapAt(136, pt("advento")),
    ],
    zooms: [{ from: 14, to: 168, x: 230, y: 200, scale: 1.5 }],
  },
]

export const SCREEN_TRANSITION = 18
export const INTRO_DURATION = 80
export const OUTRO_DURATION = 125
export const SCENE_FADE = 15

/** Frame (dentro do bloco do celular) em que cada segmento começa. */
export const segmentStarts = segments.map((_, index) =>
  segments.slice(0, index).reduce((sum, segment) => sum + segment.duration - SCREEN_TRANSITION, 0),
)

export const PHONE_DURATION =
  segments.reduce((sum, segment) => sum + segment.duration, 0) - SCREEN_TRANSITION * (segments.length - 1)

export const PHONE_START = INTRO_DURATION - SCENE_FADE
export const OUTRO_START = PHONE_START + PHONE_DURATION - SCENE_FADE
export const TOTAL_FRAMES = OUTRO_START + OUTRO_DURATION
