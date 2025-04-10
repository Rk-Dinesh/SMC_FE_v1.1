import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationBar = ({
  itemsPerPage = 6,
  totalItems = 30,
  currentPage = 1,
  onItemsPerPageChange = () => {},
  onPageChange = () => {},
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalItems);

  return (
    <div className="flex items-center justify-end space-x-4   text-gray-100 px-4 py-2 rounded-md">
      <div className="flex items-center space-x-2">
        <span className="text-xs font-normal">Items per page</span>
        <select
          className="bg-popup-gray border-2 border-gray-100 rounded px-2 py-1 text-sm outline-none"
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
            onPageChange(1); 
          }}
        >
          {[6, 10, 20].map((num) => (
            <option key={num} value={num}>
              {String(num).padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>
      <span className="text-sm">
        {String(start).padStart(2, "0")}–{String(end).padStart(2, "0")} of {totalItems}
      </span>

      <div className="flex items-center ">
        <button
          className=" hover:bg-gray-700 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={30} />
        </button>
        <button
          className=" hover:bg-gray-700 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;
