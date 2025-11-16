import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  searchQuery?: string;
};

/**
 * Generates an array of page numbers and ellipses for pagination.
 * Smart algorithm that shows relevant pages based on current position.
 */
const generatePagination = (currentPage: number, totalPages: number) => {
  // Show all pages if 7 or fewer
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Show first pages + ellipsis + last pages
  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  // Show first + ellipsis + middle pages + ellipsis + last
  if (currentPage >= totalPages - 2) {
    return [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  // Show first + ellipsis + current neighbors + ellipsis + last
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
  searchQuery = "",
}: Props) {
  // Don't render if only one page
  if (totalPages <= 1) return null;

  const pageNumbers = generatePagination(currentPage, totalPages);

  /**
   * Creates a URL with page number and optional search query
   */
  const createPageUrl = (page: number | string) => {
    const params = new URLSearchParams();
    params.set("page", String(page));

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Page Info */}
      <div className="text-sm text-gray-600">
        Page <span className="font-semibold text-gray-900">{currentPage}</span>{" "}
        of <span className="font-semibold text-gray-900">{totalPages}</span>
      </div>

      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href={isFirstPage ? "#" : createPageUrl(currentPage - 1)}
              aria-disabled={isFirstPage}
              className={
                isFirstPage
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </PaginationPrevious>
          </PaginationItem>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) => (
            <PaginationItem key={`${page}-${index}`}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={createPageUrl(page)}
                  isActive={page === currentPage}
                  className={
                    page === currentPage
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "hover:bg-gray-100"
                  }
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href={isLastPage ? "#" : createPageUrl(currentPage + 1)}
              aria-disabled={isLastPage}
              className={
                isLastPage
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Quick Jump (optional - show on large screens with many pages) */}
      {totalPages > 10 && (
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <span>Jump to:</span>
          <select
            className="px-3 py-1 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currentPage}
            onChange={(e) => {
              window.location.href = createPageUrl(Number(e.target.value));
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <option key={page} value={page}>
                Page {page}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
