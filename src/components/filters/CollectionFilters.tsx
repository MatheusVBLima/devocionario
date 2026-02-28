"use client"

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
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full max-w-xl">
        <Input
          value={searchValue}
          placeholder={searchPlaceholder}
          onChange={(event) => onSearchChange(event.target.value)}
          aria-busy={isPending}
        />
      </div>

      <div className="w-full md:w-[260px]">
        <Select value={selectValue} onValueChange={onSelectChange}>
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
