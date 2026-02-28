import { Skeleton } from "@/components/ui/skeleton"

type CollectionFallbackProps = {
  cardCount?: number
}

export function CollectionFallback({ cardCount = 6 }: CollectionFallbackProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-full max-w-xl" />
        <Skeleton className="h-10 w-full md:w-[260px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: cardCount }).map((_, index) => (
          <div
            key={index}
            className={`flex flex-col gap-4 rounded-[2rem] bg-muted/30 p-6 ${
              index === 0 ? "md:col-span-2 xl:col-span-2" : ""
            }`}
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="mt-4 h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
