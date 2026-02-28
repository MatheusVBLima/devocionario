"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { buildSearchHref } from "@/lib/routes"

type FilterOption = {
  label: string
  value: string
}

type CollectionFiltersProps = {
  searchPlaceholder: string
  searchParamKey?: string
  selectParamKey: string
  selectPlaceholder: string
  selectOptions: FilterOption[]
}

export function CollectionFilters({
  searchPlaceholder,
  searchParamKey = "q",
  selectParamKey,
  selectPlaceholder,
  selectOptions,
}: CollectionFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const hasMountedRef = useRef(false)
  const [searchValue, setSearchValue] = useState(searchParams.get(searchParamKey) ?? "")
  const [selectedValue, setSelectedValue] = useState(
    searchParams.get(selectParamKey) ?? selectOptions[0]?.value ?? "",
  )

  useEffect(() => {
    setSearchValue(searchParams.get(searchParamKey) ?? "")
    setSelectedValue(searchParams.get(selectParamKey) ?? selectOptions[0]?.value ?? "")
  }, [searchParamKey, searchParams, selectOptions, selectParamKey])

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }

    const handle = window.setTimeout(() => {
      const href = buildSearchHref(pathname, {
        [searchParamKey]: searchValue,
        [selectParamKey]: selectedValue,
      })

      startTransition(() => {
        router.push(href, { scroll: false })
      })
    }, 250)

    return () => window.clearTimeout(handle)
  }, [pathname, router, searchValue, searchParamKey, selectedValue, selectParamKey])

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full max-w-xl">
        <Input
          value={searchValue}
          placeholder={searchPlaceholder}
          onChange={(event) => setSearchValue(event.target.value)}
          aria-busy={isPending}
        />
      </div>

      <div className="w-full md:w-[260px]">
        <Select
          value={selectedValue}
          onValueChange={(value) => setSelectedValue(value)}
        >
          <SelectTrigger aria-label={selectPlaceholder}>
            <SelectValue placeholder={selectPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {selectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
