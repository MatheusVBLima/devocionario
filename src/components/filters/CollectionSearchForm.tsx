"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

type Option = { value: string; label: string }

export function CollectionSearchForm({
  pathname, search, selected, filterName, options, placeholder,
}: {
  pathname: string
  search: string
  selected: string
  filterName: string
  options: Option[]
  placeholder: string
}) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  function navigate() {
    if (!formRef.current) return
    const data = new FormData(formRef.current)
    const q = String(data.get("q") ?? "").trim()
    const filter = String(data.get(filterName) ?? "Todas")
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (filter !== "Todas") params.set(filterName, filter)
    router.replace(params.size ? `${pathname}?${params}` : pathname, { scroll: false })
  }

  return (
    <form
      ref={formRef}
      action={pathname}
      method="get"
      onSubmit={(event) => {
        event.preventDefault()
        if (timerRef.current) clearTimeout(timerRef.current)
        navigate()
      }}
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <input
        name="q"
        type="search"
        defaultValue={search}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={() => {
          if (timerRef.current) clearTimeout(timerRef.current)
          timerRef.current = setTimeout(navigate, 300)
        }}
        className="h-11 w-full max-w-xl rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <div className="flex w-full gap-2 md:w-[320px]">
        <select
          name={filterName}
          defaultValue={selected}
          aria-label="Filtrar coleção"
          onChange={() => {
            if (timerRef.current) clearTimeout(timerRef.current)
            navigate()
          }}
          className="h-11 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <button type="submit" className="h-11 rounded-md border px-4 text-sm font-medium">
          Buscar
        </button>
      </div>
    </form>
  )
}
