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
    const safeDiff = (curr, hist) => {
      if (curr == null || hist == null) return 0;
      return curr - hist;
    };
    
    switch (sortOption) {
      case "highest":
        return b.current_buy_price - a.current_buy_price;
      case "lowest":
        return a.current_buy_price - b.current_buy_price;
      case "buy_gain_highest":
        return safeDiff(b.current_buy_price, b.historic_buy_price) -
                safeDiff(a.current_buy_price, a.historic_buy_price);
      case "buy_gain_lowest":
        return safeDiff(a.current_buy_price, a.historic_buy_price) -
                safeDiff(b.current_buy_price, b.historic_buy_price);
      case "sell_cash_gain_highest":
        return safeDiff(b.current_sell_cash, b.historic_sell_cash) -
                safeDiff(a.current_sell_cash, a.historic_sell_cash);
      case "sell_cash_gain_lowest":
        return safeDiff(a.current_sell_cash, a.historic_sell_cash) -
                safeDiff(b.current_sell_cash, b.historic_sell_cash);
      case "sell_store_gain_highest":
        return safeDiff(b.current_sell_store, b.historic_sell_store) -
                safeDiff(a.current_sell_store, a.historic_sell_store);
      case "sell_store_gain_lowest":
        return safeDiff(a.current_sell_store, a.historic_sell_store) -
                safeDiff(b.current_sell_store, b.historic_sell_store);
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
          <option value="highest">Sort by Highest Price (£)</option>
          <option value="lowest">Sort by Lowest Price (£)</option>
          <option value="buy_gain_highest">Buy Price ↑</option>
          <option value="buy_gain_lowest">Buy Price ↓</option>
          <option value="sell_cash_gain_highest">Cash Sell ↑</option>
          <option value="sell_cash_gain_lowest">Cash Sell ↓</option>
          <option value="sell_store_gain_highest">Store Credit ↑</option>
          <option value="sell_store_gain_lowest">Store Credit ↓</option>
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
