import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

/**
 * Reusable Pagination Component
 * 
 * @param {number} currentPage - Active page index (1-based)
 * @param {number} totalItems - Total count of items
 * @param {number} itemsPerPage - Number of items per page
 * @param {function} onPageChange - Handler for changing page
 * @param {function} [onItemsPerPageChange] - Optional handler for changing page size
 * @param {Array<number>} [pageSizeOptions=[5, 10, 20, 50]] - Options for page size dropdown
 */
function Pagination({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [5, 10, 20, 50]
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(totalItems, currentPage * itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-3 text-xs">
      
      {/* Items Range Info & Page Size Selector */}
      <div className="flex items-center gap-3 text-slate-500 font-medium">
        <span>
          Showing <strong className="text-slate-900 font-bold">{startItem}</strong> to{" "}
          <strong className="text-slate-900 font-bold">{endItem}</strong> of{" "}
          <strong className="text-indigo-600 font-extrabold">{totalItems}</strong> entries
        </span>

        {onItemsPerPageChange && (
          <div className="flex items-center gap-2 ml-2">
            <span className="text-xs text-slate-500">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="bg-white border border-slate-200 text-slate-800 font-bold rounded-xl px-2.5 py-1 text-xs focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 outline-none shadow-2xs cursor-pointer"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl bg-white hover:bg-indigo-50 border border-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-40 disabled:bg-slate-50 disabled:border-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-2xs transition-all"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl bg-white hover:bg-indigo-50 border border-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-40 disabled:bg-slate-50 disabled:border-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-2xs transition-all"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[34px] h-8 px-2.5 rounded-xl text-xs font-bold transition-all ${
                currentPage === page
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/25 border border-indigo-600"
                  : "bg-white hover:bg-indigo-50 border border-indigo-100 text-slate-700 hover:text-indigo-600 shadow-2xs"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl bg-white hover:bg-indigo-50 border border-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-40 disabled:bg-slate-50 disabled:border-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-2xs transition-all"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl bg-white hover:bg-indigo-50 border border-indigo-100 text-slate-600 hover:text-indigo-600 disabled:opacity-40 disabled:bg-slate-50 disabled:border-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-2xs transition-all"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}

export default Pagination;
