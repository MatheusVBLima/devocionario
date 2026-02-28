import { parseAsInteger, parseAsString, parseAsStringLiteral, throttle } from "nuqs"

export const santosMonthValues = [
  "Todos",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
] as const

export const queryUrlUpdateThrottle = throttle(200)

export const collectionQueryParser = parseAsString
  .withDefault("")
  .withOptions({ clearOnDefault: true })

export const collectionPageParser = parseAsInteger
  .withDefault(1)
  .withOptions({ clearOnDefault: true })

export const collectionCategoryParser = parseAsString
  .withDefault("Todas")
  .withOptions({ clearOnDefault: true })

export const santosMonthParser = parseAsStringLiteral(santosMonthValues)
  .withDefault("Todos")
  .withOptions({ clearOnDefault: true })

export const sharedQueryOptions = {
  history: "replace" as const,
  scroll: false,
}
