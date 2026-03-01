"use client";

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
      <Nav activeTab={activeTab} onSwitch={switchTab} items={navItems} />

      <main className="max-w-[1040px] mx-auto pt-32 px-6">
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
