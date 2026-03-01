"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark((d) => !d);
    try {
      navigator.vibrate(10);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="fixed top-[18px] sm:top-5 right-4 sm:right-6 z-50 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute transition-all duration-500 sm:w-[18px] sm:h-[18px] ${
          dark
            ? "opacity-0 scale-50 rotate-90"
            : "opacity-100 scale-100 rotate-0"
        }`}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute transition-all duration-500 sm:w-[16px] sm:h-[16px] ${
          dark
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-50 -rotate-90"
        }`}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
