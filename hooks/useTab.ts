"use client";

import { useState, useCallback } from "react";
import type { TabId } from "@/types";

export function useTab(initial: TabId = "home") {
  const [activeTab, setActiveTab] = useState<TabId>(initial);

  const switchTab = useCallback((tab: TabId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return { activeTab, switchTab };
}
