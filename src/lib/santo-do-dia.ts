import { santos } from "@/data/santos"
import { type CalendarDay, todayInBrazil } from "@/lib/calendar"

/** Santo celebrado no dia (fuso de Brasília). */
export function getSantoDoDia(today: CalendarDay = todayInBrazil()) {
  const day = String(today.day).padStart(2, "0")
  const month = String(today.month).padStart(2, "0")

  return santos.find((santo) => santo.dia === day && santo.mes === month) ?? santos[0]
}
