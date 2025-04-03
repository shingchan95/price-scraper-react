import React from "react";
import GpuCard from "./GpuCard";

export default function GpuSearch({
  gpus,
  onSelect,
  search,
  setSearch,
  sortOption,
  setSortOption,
  currentPage,
  setCurrentPage
}) {
  const itemsPerPage = 12;
  const filtered = gpus.filter((g) =>
    g.gpu_name.toLowerCase().includes(search.toLowerCase())
  );


  const sorted = [...filtered].sort((a, b) => {

    switch (sortOption) {
      // case "drop":
      //   return a.change - b.change;
      // case "gain":
      //   return b.change - a.change;
      case "highest":
        return b.current_buy_price - a.current_buy_price;
      case "lowest":
        return a.current_buy_price - b.current_buy_price;
      default:
        return a.gpu_name.localeCompare(b.gpu_name);
    }
  });
  
  

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const currentGpus = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search GPU name..."
          className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded"
        />

        <select
          className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="name">Sort by Name</option>
          {/* <option value="drop">Sort by Price Drop (▼)</option>
          <option value="gain">Sort by Price Gain (▲)</option> */}
          <option value="highest">Sort by Highest Price (£)</option>
          <option value="lowest">Sort by Lowest Price (£)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentGpus.map((gpu) => (
          <GpuCard key={gpu.id} gpu={gpu} onSelect={onSelect} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            ⏮ First
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            ← Prev
          </button>
          <span className="px-3 py-1 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            Next →
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-white rounded disabled:opacity-50"
          >
            Last ⏭
          </button>
        </div>
      )}
    </section>
  );
}
