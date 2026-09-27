export const monthNames = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
] as const

export const weekdayNames = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
] as const

const weekdayIndex: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export type CalendarDay = {
  day: number
  month: number
  year: number
  /** 0 = domingo */
  weekday: number
}

/** Data de hoje no fuso de Brasília, independente do fuso do servidor. */
export function todayInBrazil(now = new Date()): CalendarDay {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).formatToParts(now)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ""

  return {
    day: Number(get("day")),
    month: Number(get("month")),
    year: Number(get("year")),
    weekday: weekdayIndex[get("weekday")] ?? 0,
  }
}

/** "26 de setembro" */
export function formatDayMonth(day: number | string, month: number | string) {
  return `${Number(day)} de ${monthNames[Number(month) - 1] ?? ""}`
}

/** "Sábado, 26 de setembro" */
export function formatWeekdayDayMonth({ day, month, weekday }: CalendarDay) {
  const name = weekdayNames[weekday] ?? ""
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}, ${formatDayMonth(day, month)}`
}
