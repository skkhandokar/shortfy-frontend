"use client";
import { useDarkMode } from "../context/DarkModeContext";

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`fixed top-4 right-4 z-50 px-3 py-1 rounded shadow ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"
      }`}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
