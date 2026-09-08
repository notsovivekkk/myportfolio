"use client";

import { useEffect, useState } from "react";
import { socialLinks } from "@/components/ui/SocialIcons";
import type { TabId, NavItem } from "@/types";

interface NavProps {
  activeTab: TabId;
  onSwitch: (tab: TabId) => void;
  items: NavItem[];
}

/* Live clock. Renders a fixed-width blank on the server so the bar
   never changes width when the real time arrives. Layout shift on a
   sticky nav is the kind of bug everyone feels and nobody reports. */
function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="w-[88px] font-medium tabular-nums tracking-[-0.04em] text-ink text-base">
        {time ?? " "}
      </span>
      <span className="whitespace-nowrap text-base text-body">
        Kerala, India
      </span>
    </div>
  );
}

/* Hamburger that morphs into a close mark. The middle bar fades while
   the outer two converge and rotate, so it reads as one object
   changing state rather than two icons swapping. */
function MenuToggle({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  const bar =
    "absolute left-[10px] h-px w-5 bg-ink transition-all duration-300 ease-default";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="relative h-10 w-10 shrink-0 rounded-tile outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-muted sm:hidden"
    >
      <span
        className={bar}
        style={{
          top: open ? "50%" : "14px",
          transform: open ? "rotate(45deg)" : "none",
        }}
      />
      <span
        className={bar}
        style={{ top: "50%", opacity: open ? 0 : 1 }}
      />
      <span
        className={bar}
        style={{
          top: open ? "50%" : "26px",
          transform: open ? "rotate(-45deg)" : "none",
        }}
      />
    </button>
  );
}

export default function Nav({ activeTab, onSwitch, items }: NavProps) {
  const [open, setOpen] = useState(false);

  const select = (tab: TabId) => {
    onSwitch(tab);
    setOpen(false);
  };

  // Escape closes the menu. Cheap to add, and its absence is the kind
  // of thing that makes a menu feel like a trap on a phone.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Solid strip so content scrolling under the blurred bar
          disappears cleanly instead of peeking above it. */}
      <div className="h-[18px] w-full bg-surface" />

      <div className="flex justify-center px-4 sm:px-5">
        <div className="w-full max-w-content overflow-hidden rounded-card bg-[rgba(242,243,245,0.8)] backdrop-blur-xl">
          {/* Bar: 64px tall at every breakpoint, which is what the
              66px frame shoulder below is sized against. */}
          <nav className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5 sm:py-4">
            <Clock />

            <div className="hidden items-center gap-5 sm:flex">
              {items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => select(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`pf-navlink cursor-pointer text-base outline-none transition-colors duration-200 ease-default focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-muted ${
                      isActive
                        ? "font-medium text-ink"
                        : "font-medium text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="pf-icon-btn"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <MenuToggle open={open} onClick={() => setOpen((o) => !o)} />
          </nav>

          {/* Mobile menu */}
          <div id="mobile-menu" className="pf-menu sm:hidden" data-open={open}>
            <div>
              <div className="flex flex-col items-center gap-5 px-4 pb-7 pt-3">
                {items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => select(item.id)}
                      tabIndex={open ? 0 : -1}
                      aria-current={isActive ? "page" : undefined}
                      className={`text-lg outline-none transition-colors duration-200 ease-default ${
                        isActive ? "font-medium text-ink" : "text-body"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                <div className="flex items-center gap-2 pt-2">
                  {socialLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      tabIndex={open ? 0 : -1}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="pf-icon-btn"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
