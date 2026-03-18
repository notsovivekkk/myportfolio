"use client";

import type { TabId, NavItem } from "@/types";

interface NavProps {
  activeTab: TabId;
  onSwitch: (tab: TabId) => void;
  items: NavItem[];
}

export default function Nav({ activeTab, onSwitch, items }: NavProps) {
  return (
    <div className="fixed bottom-4 sm:bottom-auto sm:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <nav className="relative bg-white/40 dark:bg-white/10 backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.1),0_2px_12px_rgba(0,0,0,0.2)] rounded-full px-1 sm:px-1.5 py-1 flex items-center gap-0 sm:gap-0.5 pointer-events-auto">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSwitch(item.id)}
              className={`relative px-3 sm:px-5 py-1.5 sm:py-2 text-[13px] sm:text-[14px] rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                isActive
                  ? "bg-white dark:bg-white/20 text-primary dark:text-white font-semibold shadow-[0_1px_6px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)]"
                  : "text-primary/40 dark:text-white/35 font-medium hover:text-primary/70 dark:hover:text-white/65 hover:bg-white/40 dark:hover:bg-white/8"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
