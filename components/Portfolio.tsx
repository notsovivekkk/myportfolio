"use client";

import ThemeToggle from "@/components/ui/ThemeToggle";
import Nav from "@/components/layout/Nav";
import HomeTab from "@/components/tabs/HomeTab";
import AboutTab from "@/components/tabs/AboutTab";
import WorkTab from "@/components/tabs/WorkTab";
import ContactTab from "@/components/tabs/ContactTab";
import { useTab } from "@/hooks/useTab";
import { navItems } from "@/lib/data";
import type { TabId } from "@/types";

const tabMap: Record<TabId, React.ReactNode> = {
  home: <HomeTab />,
  about: <AboutTab />,
  work: <WorkTab />,
  contact: <ContactTab />,
};

export default function Portfolio() {
  const { activeTab, switchTab } = useTab("home");

  return (
    <>
      <ThemeToggle />
      <Nav activeTab={activeTab} onSwitch={switchTab} items={navItems} />

      <main className="max-w-[1200px] mx-auto pt-6 sm:pt-32 pb-20 sm:pb-6 px-4 sm:px-6">
        {(Object.keys(tabMap) as TabId[]).map((tabId) => (
          <div
            key={tabId}
            className={`tab-content ${activeTab === tabId ? "active" : ""}`}
          >
            {tabMap[tabId]}
          </div>
        ))}
      </main>
    </>
  );
}
