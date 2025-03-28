import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
      <button
        onClick={() => setDark(!dark)}
        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
          dark ? "bg-gray-700" : "bg-gray-300"
        }`}
      >
        <span
          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-300 ${
            dark ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
