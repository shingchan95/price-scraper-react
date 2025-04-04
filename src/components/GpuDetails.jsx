import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Loading from "./Loading";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

export default function GpuDetails({ gpu, onBack }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fallbackImage =
    "https://uk.static.webuy.com/product_images/Computing/Graphics Cards - PCI-E/SGRAACEA77016G01_m.jpg";

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/api/gpu-prices?gpu=${encodeURIComponent(gpu.gpu_name)}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, [gpu]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (loading) return <Loading />;

  if (!data.length)
    return (
      <>
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onBack}
        >
          ← Back to List
        </button>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No data found for this GPU.
        </div>
      </>
    );

  const latest = data[data.length - 1];
  const earliest = data[0];
  const priceChange = latest.buy_price - earliest.buy_price;

  return (
    <section className="transition-colors">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={onBack}
      >
        ← Back to List
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-4 rounded shadow text-gray-900 dark:text-gray-100">
        <div>
          <h2 className="text-xl font-semibold mb-2">{gpu.gpu_name}</h2>
          <img
            src={gpu.image || fallbackImage}
            alt={gpu.gpu_name}
            className="w-full h-40 object-contain rounded bg-white dark:bg-gray-700 p-2"
          />
          <a
            href={gpu.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            View on CeX
          </a>
        </div>

        <div className="space-y-2">
          <p><strong>Current Price:</strong> £{latest.buy_price}</p>
          <p><strong>Sell to Store:</strong> £{latest.sell_store ?? '-'}</p>
          <p><strong>Sell for Cash:</strong> £{latest.sell_cash ?? '-'}</p>
          {/* <p><strong>Historical Change:</strong> £{priceChange.toFixed(2)}</p> */}
          <p><strong>Online Stock:</strong> {gpu.online_stock_status} ({gpu.online_stock_count ?? 0})</p>
          <p><strong>Store Stock:</strong> {gpu.store_stock_status}</p>
          <p><strong>Rating:</strong> {gpu.rating ?? "N/A"}</p>
          <p><strong>Grade:</strong> {gpu.box_grade ?? "N/A"}</p>
        </div>
      </div>

      <div className="mt-6 h-[400px]">
        <Line
          data={{
            labels: data.map((d) => d.date),
            datasets: [
              {
                label: "Buy Price",
                data: data.map((d) => d.buy_price),
                borderColor: "#3b82f6",
              },
              {
                label: "Cash Price",
                data: data.map((d) => d.sell_cash),
                borderColor: "#f59e0b",
              },
              {
                label: "Store Credit",
                data: data.map((d) => d.sell_store),
                borderColor: "#10b981",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: isDarkMode ? "#f3f4f6" : "#1f2937",
                },
              },
              tooltip: {
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                titleColor: isDarkMode ? "#f9fafb" : "#111827",
                bodyColor: isDarkMode ? "#d1d5db" : "#4b5563",
              },
            },
            scales: {
              x: {
                ticks: { color: isDarkMode ? "#d1d5db" : "#4b5563" },
                grid: { color: isDarkMode ? "#374151" : "#e5e7eb" },
              },
              y: {
                ticks: { color: isDarkMode ? "#d1d5db" : "#4b5563" },
                grid: { color: isDarkMode ? "#374151" : "#e5e7eb" },
              },
            },
          }}
        />
      </div>
    </section>
  );
}
