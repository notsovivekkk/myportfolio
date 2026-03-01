"use client";

import type { TabId, NavItem } from "@/types";

interface NavProps {
  activeTab: TabId;
  onSwitch: (tab: TabId) => void;
  items: NavItem[];
}

export default function Nav({ activeTab, onSwitch, items }: NavProps) {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav className="bg-white/90 backdrop-blur-md shadow-nav border border-gray-100 rounded-full px-2 py-1.5 flex items-center gap-1 pointer-events-auto">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSwitch(item.id)}
              className={`px-4 py-2 text-[15px] font-medium rounded-full hover:bg-gray-50 transition-colors flex items-center gap-1.5 ${
                isActive ? "text-primary" : "text-secondary hover:text-primary"
              }`}
            >
              <span className={`text-reddot ${isActive ? "block" : "hidden"}`}>
                •
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
