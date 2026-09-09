"use client";

import { useCallback, useEffect, useState } from "react";
import { socialLinks } from "@/components/ui/SocialIcons";
import type { NavItem } from "@/types";

interface NavProps {
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
        Bangalore, India
      </span>
    </div>
  );
}

/* Hamburger that morphs into a close mark. The middle bar fades while
   the outer two converge and rotate, so it reads as one object
   changing state rather than two icons swapping. */
function MenuToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
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
      <span className={bar} style={{ top: "50%", opacity: open ? 0 : 1 }} />
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

export default function Nav({ items }: NavProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");

  const go = useCallback((id: string) => {
    setOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // scrollIntoView honours the scroll-margin-top on the target, which
    // is what keeps the section clear of the fixed bar.
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

  /* Scroll spy. Walks the sections top down and keeps the last one whose
     top has passed the nav, which is the section you are actually
     reading. The bottom-of-page case is special: the final section is
     often shorter than the viewport, so it would never become "current"
     on scroll position alone. */
  useEffect(() => {
    const ids = items.map((i) => i.id).filter((id) => id !== "top");
    let raf = 0;

    const update = () => {
      const y = window.scrollY + 120;
      let current = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= y) current = id;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
      ) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

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
                const isActive = active === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.id === "top" ? "#" : `#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={`pf-navlink cursor-pointer text-base outline-none transition-colors duration-200 ease-default focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-muted ${
                      isActive
                        ? "font-medium text-ink"
                        : "font-medium text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
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
                  const isActive = active === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.id === "top" ? "#" : `#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.id);
                      }}
                      tabIndex={open ? 0 : -1}
                      aria-current={isActive ? "true" : undefined}
                      className={`text-lg outline-none transition-colors duration-200 ease-default ${
                        isActive ? "font-medium text-ink" : "text-body"
                      }`}
                    >
                      {item.label}
                    </a>
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
