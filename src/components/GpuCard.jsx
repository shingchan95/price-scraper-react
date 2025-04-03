import React from "react";

export default function GpuCard({ gpu, onSelect }) {
    const fallbackImage =
        "https://uk.static.webuy.com/product_images/Computing/Graphics Cards - PCI-E/SGRAACEA77016G01_m.jpg";

    // 🧠 Shared logic: handles formatting + coloring
    const getChangeDisplay = (current, historic, type) => {
        const diff = current - historic;
        let color = "text-gray-400";

        if (type === "buy") {
            // Higher buy price = worse for consumer
            color = diff > 0 ? "text-red-600" : diff < 0 ? "text-green-600" : "text-gray-400";
        } else if (type === "sell") {
            // Higher sell price = better for consumer
            color = diff > 0 ? "text-green-600" : diff < 0 ? "text-red-600" : "text-gray-400";
        }

        const sign = diff > 0 ? "+" : "";
        return (
            <span className={color}>
                {sign}£{diff.toFixed(2)}
            </span>
        );
    };

    return (
        <div
            onClick={() => onSelect(gpu.gpu_name)}
            className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 flex flex-col justify-between min-h-[290px]"
        >
            <div className="mb-2">
                <p className="font-semibold break-words">{gpu.gpu_name}</p>
            </div>

            <div className="text-sm space-y-1">
                <p>💷 Buy: £{gpu.current_buy_price ?? "-"}</p>
                <p>🏪 Store Credit: £{gpu.current_sell_store ?? "-"}</p>
                <p>💵 Cash: £{gpu.current_sell_cash ?? "-"}</p>

                <p>
                    📉 Buy price change:{" "}
                    {getChangeDisplay(gpu.current_buy_price, gpu.historic_buy_price, "buy")}
                </p>
                <p>
                    📈 Store credit change:{" "}
                    {getChangeDisplay(gpu.current_sell_store, gpu.historic_sell_store, "sell")}
                </p>
                <p>
                    📈 Cash sell price change:{" "}
                    {getChangeDisplay(gpu.current_sell_cash, gpu.historic_sell_cash, "sell")}
                </p>

                {gpu.online_stock_status && (
                    <p>
                        🌐 Online: {gpu.online_stock_status} ({gpu.online_stock_count ?? 0})
                    </p>
                )}
                {gpu.store_stock_status && <p>🏛️ Store: {gpu.store_stock_status}</p>}
                {gpu.rating && <p>⭐ Rating: {gpu.rating}</p>}
                {gpu.box_grade && <p>🔹 Grade: {gpu.box_grade}</p>}
            </div>

            <div className="mt-3">
                <img
                    src={gpu.image || fallbackImage}
                    alt={gpu.gpu_name}
                    className="w-full h-24 object-contain rounded"
                />
            </div>
        </div>
    );
}
