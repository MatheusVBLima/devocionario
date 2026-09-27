import { Skeleton } from "@/components/ui/skeleton"

type CollectionFallbackProps = {
  cardCount?: number
}

export function CollectionFallback({ cardCount = 6 }: CollectionFallbackProps) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-11 w-full max-w-xl rounded-full" />
        <Skeleton className="h-11 w-full rounded-full md:w-[260px]" />
      </div>

      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: cardCount }).map((_, index) => (
          <div key={index} className="flex flex-col gap-4 border-t pt-5">
            <Skeleton className="aspect-[4/3] w-full rounded-md" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
          </div>
        ))}
      </div>
    </div>
  )
}
