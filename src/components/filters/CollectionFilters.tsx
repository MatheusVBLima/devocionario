"use client"

import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FilterOption = {
  label: string
  value: string
}

type CollectionFiltersProps = {
  searchPlaceholder: string
  searchValue: string
  onSearchChange: (value: string) => void
  selectValue: string
  onSelectChange: (value: string) => void
  selectPlaceholder: string
  selectOptions: FilterOption[]
  isPending?: boolean
}

export function CollectionFilters({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  selectValue,
  onSelectChange,
  selectPlaceholder,
  selectOptions,
  isPending = false,
}: CollectionFiltersProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <label className="relative w-full max-w-xl">
        <span className="sr-only">{searchPlaceholder}</span>
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          value={searchValue}
          placeholder={searchPlaceholder}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-busy={isPending}
          className="pl-11"
        />
      </label>

      <Select value={selectValue} onValueChange={onSelectChange}>
        <SelectTrigger aria-label={selectPlaceholder} className="w-full md:w-[260px]">
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
  )
}
