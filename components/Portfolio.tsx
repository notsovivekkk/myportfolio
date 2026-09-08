"use client";

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
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

      {/* Only the 18px strip is cleared. The nav bar itself sits inside
          each tab's 66px frame shoulder, both the same grey, so the two
          read as one continuous shape rather than a bar floating above
          a separate block. */}
      <main className="mx-auto w-full max-w-page px-4 pb-16 pt-[18px] sm:px-5">
        <div className="mx-auto w-full max-w-content">
          {(Object.keys(tabMap) as TabId[]).map((tabId) => (
            <div
              key={tabId}
              className={`tab-content ${activeTab === tabId ? "active" : ""}`}
            >
              {tabMap[tabId]}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
