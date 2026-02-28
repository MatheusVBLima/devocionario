export function getPaginationItems(currentPage: number, totalPages: number) {
  const items: Array<number | "ellipsis"> = []

  for (let page = 1; page <= totalPages; page += 1) {
    const isEdge = page === 1 || page === totalPages
    const isNearCurrent = page >= currentPage - 1 && page <= currentPage + 1

    if (isEdge || isNearCurrent) {
      items.push(page)
      continue
    }

    const previous = items[items.length - 1]
    if (previous !== "ellipsis") {
      items.push("ellipsis")
    }
  }

  return items
}
