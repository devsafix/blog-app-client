import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
};

/**
 * Generates an array of page numbers and ellipses for pagination.
 */
const generatePagination = (currentPage: number, totalPages: number) => {
  // If there are 7 or fewer pages, show all pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is near the beginning
  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
  }

  // If the current page is near the end
  if (currentPage >= totalPages - 2) {
    return [
      1,
      2,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // If the current page is somewhere in the middle
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export function BlogPagination({
  currentPage,
  totalPages,
  baseUrl = "/blog",
}: Props) {
  if (totalPages <= 1) return null; // Don't render if only 1 page

  const pageNumbers = generatePagination(currentPage, totalPages);

  return (
    <Pagination className="mt-16">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={`${baseUrl}?page=${currentPage - 1}`}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={`${baseUrl}?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={`${baseUrl}?page=${currentPage + 1}`}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
