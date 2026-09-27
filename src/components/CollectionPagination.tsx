import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { getPaginationItems } from "@/lib/pagination"
import { buildSearchHref } from "@/lib/routes"

export function CollectionPagination({
  currentPage, totalPages, pathname, filters = {},
}: {
  currentPage: number
  totalPages: number
  pathname: string
  filters?: Record<string, string>
}) {
  if (totalPages <= 1) return null
  const href = (page: number) => buildSearchHref(pathname, { ...filters, page })

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious href={href(currentPage - 1)} />
          ) : <span className="px-3 text-muted-foreground" aria-disabled>Anterior</span>}
        </PaginationItem>
        {getPaginationItems(currentPage, totalPages).map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {item === "ellipsis" ? <PaginationEllipsis /> : (
              <PaginationLink href={href(item)} isActive={item === currentPage}>
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationNext href={href(currentPage + 1)} />
          ) : <span className="px-3 text-muted-foreground" aria-disabled>Próxima</span>}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
