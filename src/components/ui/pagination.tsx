"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface PaginationButtonProps {
  page: number;
  isActive: boolean;
  onPageChange: (page: number) => void;
}

const MAX_PAGES_SHOWN = 6;

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <nav
      aria-label="Pagination"
      className="font-medium text-gray-700"
      role="navigation"
    >
      <ul className="flex flex-wrap items-center justify-center gap-2 dark:text-gray-400">
        <li>
          <button
            aria-label="Previous page"
            className="rounded-lg border border-gray-300 px-3.5 py-2 shadow-xs hover:bg-gray-200/50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-800/50"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            type="button"
          >
            Previous
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => {
          const isActive = currentPage === index + 1;

          if (totalPages > MAX_PAGES_SHOWN) {
            if (currentPage > 3) {
              if (index + 1 < currentPage) {
                return null;
              }

              if (index + 1 === currentPage + 3) {
                return (
                  <li key={index}>
                    <PaginationEllipsis />
                  </li>
                );
              }

              if (index + 1 < currentPage + 3 || index + 1 > totalPages - 2) {
                return (
                  <li key={index}>
                    <PaginationButton
                      isActive={isActive}
                      onPageChange={onPageChange}
                      page={index + 1}
                    />
                  </li>
                );
              }
            }

            if (index === 3) {
              return (
                <li key={index}>
                  <PaginationEllipsis />
                </li>
              );
            }

            if (index > 2 && index < totalPages - 2) {
              return null;
            }
          }

          return (
            <li key={index}>
              <PaginationButton
                isActive={isActive}
                onPageChange={onPageChange}
                page={index + 1}
              />
            </li>
          );
        })}

        <li>
          <button
            aria-label="Next page"
            className="rounded-lg border border-gray-300 px-3.5 py-2 shadow-xs hover:bg-gray-200/50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-800/50"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            type="button"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

const PaginationButton = ({
  page,
  isActive,
  onPageChange,
}: PaginationButtonProps) => {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      aria-label={`Go to page ${page}`}
      className={cn(
        "size-10 shrink-0 rounded-lg",
        isActive
          ? "bg-primary-500 text-white"
          : "hover:bg-gray-200/50 dark:hover:bg-gray-800/80",
      )}
      onClick={() => onPageChange(page)}
      type="button"
    >
      {page}
    </button>
  );
};

const PaginationEllipsis = () => {
  return (
    <button
      className="size-10 shrink-0 cursor-default rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-800/80"
      type="button"
    >
      ...
    </button>
  );
};
