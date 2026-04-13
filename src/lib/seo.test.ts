import { describe, expect, test } from "bun:test"

import { parseBrazilianDate } from "./seo"

describe("parseBrazilianDate", () => {
  test("parses abbreviated blog dates with dots", () => {
    expect(parseBrazilianDate("22.Set.2025")).toBe("2025-09-22T12:00:00.000Z")
  })
})
