import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { buildSearchHref } from "@/lib/routes"
import { getPaginationItems } from "@/lib/pagination"

type CollectionPaginationProps = {
  pathname: string
  currentPage: number
  totalPages: number
  params: Record<string, string | number | undefined | null>
}

export function CollectionPagination({
  pathname,
  currentPage,
  totalPages,
  params,
}: CollectionPaginationProps) {
  if (totalPages <= 1) return null

  const items = getPaginationItems(currentPage, totalPages)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildSearchHref(pathname, {
              ...params,
              page: Math.max(currentPage - 1, 1),
            })}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

        {items.map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={buildSearchHref(pathname, { ...params, page: item })}
                isActive={item === currentPage}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={buildSearchHref(pathname, {
              ...params,
              page: Math.min(currentPage + 1, totalPages),
            })}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
