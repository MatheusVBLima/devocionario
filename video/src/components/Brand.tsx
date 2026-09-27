import { Fragment } from "react"
import { Img, staticFile } from "remotion"

import { colors, fonts } from "../constants"

/** Símbolo + "Devocionário" + ponto na cor litúrgica, como no cabeçalho do site. */
export function Wordmark({ size, dark = false }: { size: number; dark?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.28 }}>
      <Img src={staticFile(dark ? "logo-white.svg" : "logo.svg")} style={{ height: size * 1.05, width: "auto" }} />
      <span
        style={{
          fontFamily: fonts.serif,
          fontSize: size,
          lineHeight: 1,
          letterSpacing: "-0.01em",
          color: dark ? colors.darkForeground : colors.foreground,
        }}
      >
        Devocionário
      </span>
      <span
        style={{
          width: size * 0.13,
          height: size * 0.13,
          borderRadius: "50%",
          background: dark ? "#6fbf8f" : colors.liturgical,
          alignSelf: "flex-end",
          marginBottom: size * 0.02,
          marginLeft: -size * 0.1,
        }}
      />
    </div>
  )
}

/** Renderiza *trechos* em itálico na cor de destaque. */
export function Highlighted({ text, accent }: { text: string; accent: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, index) =>
        part.startsWith("*") ? (
          <em key={index} style={{ fontStyle: "italic", color: accent }}>
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  )
}

export function Kicker({ children, color = colors.liturgical, size = 28 }: { children: string; color?: string; size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
      <span style={{ width: 64, height: 2, background: color }} />
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: size,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color,
        }}
      >
        {children}
      </span>
    </div>
  )
}
