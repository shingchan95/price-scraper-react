import React, { useEffect, useState } from "react";
import Overview from "./components/Overview";
import GpuSearch from "./components/GpuSearch";
import GpuDetails from "./components/GpuDetails";
import DarkModeToggle from "./components/DarkModeToggle";

export default function App() {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const API_KEY = process.env.API_KEY;
  const [gpus, setGpus] = useState([]);
  const [selectedGpu, setSelectedGpu] = useState(null);
  const [search, setSearch] = useState("");         
  const [sortOption, setSortOption] = useState("name"); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${BASE_URL}/api/gpu-list`,{
      headers: {
        "API_KEY": process.env.REACT_APP_API_KEY
      }
    })
      .then((res) => res.json())
      .then((data) => setGpus(data));
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow p-4 mb-4 transition-colors">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center w-full sm:w-auto">
          GPU Price Tracker
        </h1>
        <div className="sm:ml-auto mt-2 sm:mt-0">
          <DarkModeToggle />
        </div>
      </div>
      </header>

      {!selectedGpu && (
        <>
          <Overview total={gpus.length} />
          <GpuSearch
            gpus={gpus}
            onSelect={setSelectedGpu}
            search={search}
            setSearch={setSearch}
            sortOption={sortOption}
            setSortOption={setSortOption}
            currentPage={currentPage}           
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      {selectedGpu && (
        <GpuDetails
          gpu={selectedGpu}
          onBack={() => setSelectedGpu(null)}
        />
      )}
    </main>
  );
}