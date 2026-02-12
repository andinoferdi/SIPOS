type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => i + Math.max(currentPage - 1, 1)
  );

  return (
    <div className="flex items-center ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-[var(--token-gray-300)] bg-[var(--token-white)] px-3.5 py-2.5 text-[var(--token-gray-700)] shadow-theme-xs hover:bg-[var(--token-gray-50)] disabled:opacity-50 dark:border-[var(--token-gray-700)] dark:bg-[var(--token-gray-800)] dark:text-[var(--token-gray-400)] dark:hover:bg-[var(--token-white-3)] text-sm"
      >
        Previous
      </button>
      <div className="flex items-center gap-2">
        {currentPage > 3 && <span className="px-2">...</span>}
        {pagesAroundCurrent.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-brand-500 text-[var(--token-white)]"
                : "text-[var(--token-gray-700)] dark:text-[var(--token-gray-400)]"
            } flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-[var(--token-blue-500-8)] hover:text-brand-500 dark:hover:text-brand-500`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages - 2 && <span className="px-2">...</span>}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ml-2.5 flex items-center justify-center rounded-lg border border-[var(--token-gray-300)] bg-[var(--token-white)] px-3.5 py-2.5 text-[var(--token-gray-700)] shadow-theme-xs text-sm hover:bg-[var(--token-gray-50)] h-10 disabled:opacity-50 dark:border-[var(--token-gray-700)] dark:bg-[var(--token-gray-800)] dark:text-[var(--token-gray-400)] dark:hover:bg-[var(--token-white-3)]"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
