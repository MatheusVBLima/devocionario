import { describe, expect, test } from "bun:test"

import { todayInBrazil, formatWeekdayDayMonth } from "@/lib/calendar"
import { excerptOf, liturgicalColorFor, splitVerses, stripVerseNumbers } from "@/lib/liturgia"

describe("liturgia", () => {
  test("mapeia a cor litúrgica da API para o tom do site", () => {
    expect(liturgicalColorFor("Verde")).toBe("oklch(0.5 0.1 155)")
    expect(liturgicalColorFor("Roxo")).toBe("oklch(0.46 0.12 305)")
    expect(liturgicalColorFor("Branco")).toBe(liturgicalColorFor("dourado"))
    expect(liturgicalColorFor(undefined)).toBe(liturgicalColorFor("verde"))
    expect(liturgicalColorFor("Desconhecida")).toBe(liturgicalColorFor("verde"))
  })

  test("remove e separa a numeração de versículos", () => {
    const text = "Naquele tempo, 43btodos estavam admirados. 44“Prestai atenção”."
    expect(stripVerseNumbers(text)).toBe("Naquele tempo, todos estavam admirados. “Prestai atenção”.")
    expect(splitVerses("11, 9Alegra-te. 10Tira")).toEqual(["", "11, 9", "Alegra-te. ", "10", "Tira"])
  })

  test("extrai as primeiras frases para a citação", () => {
    const text =
      "Naquele tempo, 43btodos estavam admirados. Então Jesus disse aos discípulos: 44“Prestai atenção”. 45Mas eles não compreendiam o que Jesus dizia naquele momento."
    expect(excerptOf(text, 100)).toBe(
      "Naquele tempo, todos estavam admirados. Então Jesus disse aos discípulos: “Prestai atenção”.",
    )
  })
})

describe("calendar", () => {
  test("usa o fuso de Brasília", () => {
    // 02:30 UTC de 27/09 ainda é 26/09 (sábado) em Brasília.
    const today = todayInBrazil(new Date("2026-09-27T02:30:00Z"))
    expect(today).toEqual({ day: 26, month: 9, year: 2026, weekday: 6 })
    expect(formatWeekdayDayMonth(today)).toBe("Sábado, 26 de setembro")
  })
})
