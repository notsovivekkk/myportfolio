"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/* ============================================================
   The ICP Gate card, clickable, with its full write-up in a modal.

   Built on the native <dialog> with showModal(): the browser puts it in
   the top layer, makes the rest of the page inert (so keyboard focus
   cannot leave it), moves focus inside on open, and closes it on Esc.
   On top of that this component adds:

   - scroll lock on the page while open, with the scrollbar's width
     padded back so the page behind does not shift sideways
   - close on a click outside (a click that lands on the dialog itself,
     i.e. on its backdrop, since the content fills the dialog)
   - focus returned to the card explicitly on close, rather than relying
     on every browser to do it
   - a real focus trap: the native dialog stops focus reaching the page,
     but Tab can still step out to the browser's own toolbar. Tab and
     Shift+Tab are wrapped here so focus cycles inside the modal only.

   Styling and the fade and scale-in live in globals.css (.pf-modal),
   where prefers-reduced-motion turns the motion off.
   ============================================================ */

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5">
      {/* The site's Eyebrow treatment. */}
      <h3 className="text-sm font-medium uppercase tracking-[0.04em] text-muted">
        {label}
      </h3>
      {children}
    </section>
  );
}

export default function IcpGateCard({
  name,
  description,
  media,
  modalMedia,
  className = "",
}: {
  name: string;
  description: string;
  media: ReactNode;
  modalMedia: ReactNode;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    dialogRef.current?.showModal();
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  /* Scroll lock, only while open. */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const gap = window.innerWidth - root.clientWidth;
    const prev = { overflow: root.style.overflow, pad: root.style.paddingRight };
    root.style.overflow = "hidden";
    if (gap > 0) root.style.paddingRight = `${gap}px`;
    return () => {
      root.style.overflow = prev.overflow;
      root.style.paddingRight = prev.pad;
    };
  }, [open]);

  return (
    <>
      {/* The whole card is one target: an invisible button stretched over
          it, so the card stays an article with a heading and paragraph,
          and the focus ring is drawn on the card itself. */}
      <article
        className={`group relative flex flex-col gap-5 rounded-card bg-surface p-4 transition-shadow duration-200 ease-default hover:shadow-lift has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink sm:p-5 ${className}`}
      >
        {media}
        <div className="flex flex-col gap-2 px-1 pb-1">
          <h3 className="text-md font-medium leading-[1.35] text-ink">
            {name}
          </h3>
          <p className="text-base leading-[1.6] text-body">{description}</p>
          <p
            aria-hidden="true"
            className="mt-1 inline-flex items-center gap-1 text-base font-medium text-ink"
          >
            Read more
            <span className="transition-transform duration-200 ease-default group-hover:translate-x-0.5">
              &rarr;
            </span>
          </p>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={show}
          aria-haspopup="dialog"
          aria-label={`Read more about ${name}`}
          className="absolute inset-0 cursor-pointer rounded-card outline-none"
        />
      </article>

      <dialog
        ref={dialogRef}
        aria-labelledby="icp-gate-title"
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) hide();
        }}
        onKeyDown={(e) => {
          if (e.key !== "Tab" || !dialogRef.current) return;
          const focusable = Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          );
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          const active = document.activeElement;
          if (e.shiftKey && (active === first || active === dialogRef.current)) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && (active === last || active === dialogRef.current)) {
            e.preventDefault();
            first.focus();
          }
        }}
        className="pf-modal"
      >
        {/* Only rendered while open, so the modal's animation starts from
            its first frame each time it is opened. */}
        {open && (
          <div className="relative">
            {/* Sticky, so the close button stays in reach on a long read
                on a phone. Pulled up over the media with a negative
                margin, so it costs no height. */}
            <div className="pointer-events-none sticky top-0 z-10 -mb-14 flex justify-end p-3 sm:p-4">
              <button
                type="button"
                onClick={hide}
                aria-label="Close"
                autoFocus
                className="pf-icon-btn pointer-events-auto h-9 w-9 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M2 2l8 8M10 2l-8 8" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-8 px-5 pb-10 pt-5 sm:px-8 sm:pb-10 sm:pt-8">
              {modalMedia}

              <header className="flex flex-col gap-2 px-1">
                <h2
                  id="icp-gate-title"
                  className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-ink sm:text-2xl"
                >
                  ICP Gate
                </h2>
                <p className="text-md text-body">
                  Filters build the list. The gate decides who gets in.
                </p>
              </header>

              <div className="flex flex-col gap-8 px-1">
                <Section label="The problem">
                  <p className="text-base leading-[1.65] text-body">
                    No matter how many filters you stack when sourcing data,
                    they open up segments, and segments carry companies that
                    match the filters but aren&apos;t the ICP. Manual QA works
                    on 50 companies. On 10,000, it&apos;s a serious time tax,
                    so most teams skip it and enrich everything.
                  </p>
                </Section>

                <Section label="How it works">
                  <ol className="flex flex-col gap-3">
                    {[
                      "Give it the company you're building the list for. No ICP doc? It drafts one from their website.",
                      "It turns that ICP into one clear yes/no question, which you approve once.",
                      "Run any list. For every company, it reads the website and Jev returns a fit probability.",
                      "Each row gets a verdict (Fit, Review or Not a fit) plus the probability, so you can sort, filter and enrich only the fits.",
                    ].map((step, i) => (
                      <li
                        key={step}
                        className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-2"
                      >
                        <span className="text-base tabular-nums text-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base leading-[1.65] text-body">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </Section>

                <Section label="Why it matters">
                  <ul className="flex flex-col gap-2">
                    {[
                      "Enrichment credits only go to companies that fit",
                      "Cleaner, sharper lists before scoring, execution or any further orchestration",
                      "The same approved question for every row: consistent, explainable, cheap to re-run",
                    ].map((point) => (
                      <li
                        key={point}
                        className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-2"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[10px] h-[5px] w-[5px] rounded-full bg-muted"
                        />
                        <span className="text-base leading-[1.65] text-body">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Section>

                {/* The proof, so it sits on its own tinted panel and in
                    full ink, the way outcomes read across the site. */}
                <Section label="In practice">
                  <p className="rounded-tile bg-frame p-4 text-base leading-[1.65] text-ink sm:p-5">
                    On a final signal-scored list of 50 companies in an active
                    buying window: 45 clear fits, 1 flagged for review, 4 off,
                    all outside the client&apos;s shipping regions. 18 seconds.
                    Under 1 cent.
                  </p>
                </Section>

                <Section label="Built with">
                  <p className="text-base text-body">
                    Claude Code · Jev by TypeSafe · Python
                  </p>
                </Section>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
