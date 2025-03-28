export default function Overview({ total }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Total GPUs</h3>
          <p className="text-2xl text-gray-900 dark:text-white">{total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Biggest Price Drop</h3>
          <p className="text-lg text-red-600 dark:text-red-400">Coming soon...</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Top Gainer</h3>
          <p className="text-lg text-green-600 dark:text-green-400">Coming soon...</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Average Price</h3>
          <p className="text-lg text-gray-900 dark:text-white">Coming soon...</p>
        </div>
      </div>
    </section>
  );
}
