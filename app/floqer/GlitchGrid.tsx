"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { GLITCHES, type Glitch } from "./glitches";

/* ==================================================================
   The four glitch cards and their modal.

   Native <dialog> with showModal(): the browser puts it in the top
   layer, makes the page inert, and closes it on Esc. On top of that:
   scroll lock, close on a click outside, a real Tab / Shift+Tab trap
   (the native one still lets Tab reach the browser's toolbar), and
   focus returned to the card that opened it.

   Videos only exist inside the open modal, so nothing heavy loads with
   the page: the cards show still posters. In the modal the recording
   plays the way iOS allows inline autoplay, muted and playsinline.
   ================================================================== */

/* Renders `backticks` in a string as inline code. */
function Prose({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <code
            key={i}
            className="rounded-[5px] bg-white/[0.08] px-1.5 py-0.5 font-[family-name:var(--font-fq-mono)] text-[0.88em] text-fq-ground"
          >
            {part}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

/* A phone: dark bezel, rounded screen, at the recordings' own ratio
   (540×1170), so nothing is cropped. */
function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[26px] bg-black p-[5px] shadow-[0_0_0_1px_#2A282C,0_18px_40px_-18px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="relative aspect-[540/1170] overflow-hidden rounded-[21px] bg-fq-night">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({
  code,
  copy = false,
  label,
}: {
  code: string;
  copy?: boolean;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      /* Older Safari or an insecure context: fall back to a selection. */
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="overflow-hidden rounded-tile border border-fq-night-line bg-black">
      <div className="flex items-center justify-between gap-3 border-b border-dotted border-fq-night-line px-4 py-2">
        <span className="font-[family-name:var(--font-fq-mono)] text-xs uppercase tracking-[0.12em] text-fq-night-muted">
          {label}
        </span>
        {copy ? (
          <button
            type="button"
            onClick={onCopy}
            className="rounded-[6px] px-2 py-1 font-[family-name:var(--font-fq-mono)] text-xs uppercase tracking-[0.12em] text-fq-orange outline-none transition-colors duration-200 ease-default hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-fq-orange"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        ) : null}
      </div>
      {/* Scrolls sideways inside its own box, never the page. */}
      <pre className="overflow-x-auto px-4 py-3.5 font-[family-name:var(--font-fq-mono)] text-[12.5px] leading-[1.7] text-fq-ground">
        <code>{code}</code>
      </pre>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}

function Part({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5">
      <h3 className="font-[family-name:var(--font-fq-mono)] text-xs uppercase tracking-[0.14em] text-fq-orange">
        {label}
      </h3>
      {children}
    </section>
  );
}

export default function GlitchGrid() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);

  const open = useCallback((i: number) => {
    setActive(i);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  /* Scroll lock, with the scrollbar's width padded back so the page
     behind does not shift sideways. */
  useEffect(() => {
    if (active === null) return;
    const root = document.documentElement;
    const gap = window.innerWidth - root.clientWidth;
    const prev = { overflow: root.style.overflow, pad: root.style.paddingRight };
    root.style.overflow = "hidden";
    if (gap > 0) root.style.paddingRight = `${gap}px`;
    return () => {
      root.style.overflow = prev.overflow;
      root.style.paddingRight = prev.pad;
    };
  }, [active]);

  const g: Glitch | null = active === null ? null : GLITCHES[active];

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {GLITCHES.map((item, i) => (
          <li key={item.n}>
            <button
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              type="button"
              onClick={() => open(i)}
              aria-haspopup="dialog"
              className="group grid h-full w-full grid-cols-[76px_minmax(0,1fr)] items-start gap-4 rounded-card border border-fq-night-line bg-fq-night-card p-4 text-left outline-none transition-[border-color,background-color] duration-200 ease-default hover:border-[#3d3a40] hover:bg-[#19181b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fq-orange sm:grid-cols-[88px_minmax(0,1fr)] sm:p-5"
            >
              <Phone className="rounded-[16px] p-[3px]">
                <Image
                  src={item.media.poster}
                  alt=""
                  fill
                  sizes="88px"
                  className="object-cover object-top"
                />
              </Phone>

              <span className="flex min-w-0 flex-col gap-2">
                <span className="flex items-center justify-between gap-3">
                  <span className="font-[family-name:var(--font-fq-mono)] text-sm text-fq-orange">
                    {item.n}
                  </span>
                  {/* Status badge: the fix exists and is in the modal. */}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-fq-night-line px-2 py-0.5 font-[family-name:var(--font-fq-mono)] text-[10.5px] uppercase tracking-[0.12em] text-fq-night-body">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#FF4F12" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12.5 9.5 18 20 6.5" />
                    </svg>
                    Fix ready
                  </span>
                </span>
                <span className="text-md font-medium leading-[1.35] text-fq-ground">
                  {item.title}
                </span>
                <span className="text-base leading-[1.55] text-fq-night-body">
                  {item.broken}
                </span>
                <span className="mt-1 inline-flex items-center gap-1 text-base font-medium text-fq-ground">
                  Cause and fix
                  <span className="text-fq-orange transition-transform duration-200 ease-default group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="fq-modal-title"
        className="fq-modal"
        onClose={() => {
          const i = active;
          setActive(null);
          if (i !== null) cardRefs.current[i]?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
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
          const now = document.activeElement;
          if (e.shiftKey && (now === first || now === dialogRef.current)) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && (now === last || now === dialogRef.current)) {
            e.preventDefault();
            first.focus();
          }
        }}
      >
        {g ? (
          <div className="relative">
            {/* Sticky close, always in reach on a long read on a phone. */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-dotted border-fq-night-line bg-fq-night/95 px-5 py-3.5 backdrop-blur sm:px-7">
              <span className="font-[family-name:var(--font-fq-mono)] text-xs uppercase tracking-[0.14em] text-fq-night-muted">
                Issue {g.n} of 04
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                autoFocus
                className="flex h-9 w-9 items-center justify-center rounded-full border border-fq-night-line text-fq-ground outline-none transition-colors duration-200 ease-default hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-fq-orange"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 2l8 8M10 2l-8 8" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-7 px-5 pb-10 pt-6 sm:grid sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start sm:gap-8 sm:px-7 sm:pb-8">
              {/* The recording, in its phone. */}
              {/* On a phone it sits at about half the screen's height, so the
                  title and "What's broken" show without scrolling. */}
              <Phone className="mx-auto w-[min(42vw,180px)] sm:sticky sm:top-20 sm:w-full">
                {g.media.kind === "video" ? (
                  <video
                    key={g.media.src}
                    src={g.media.src}
                    poster={g.media.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={`Screen recording: ${g.title}`}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <Image
                    src={g.media.src}
                    alt={`Screenshot: ${g.title}`}
                    fill
                    sizes="240px"
                    className="object-cover object-top"
                  />
                )}
              </Phone>

              <div className="flex min-w-0 flex-col gap-6">
                <h2
                  id="fq-modal-title"
                  className="text-[20px] font-medium leading-[1.3] tracking-[-0.015em] text-fq-ground sm:text-[22px]"
                >
                  {g.title}
                </h2>

                <Part label="What's broken">
                  <p className="text-base leading-[1.65] text-fq-night-body">
                    {g.broken}
                  </p>
                </Part>

                <Part label="Why">
                  <CodeBlock code={g.whyCode} label="Live on floqer.com" />
                  <p className="text-base leading-[1.65] text-fq-night-body">
                    <Prose text={g.why} />
                  </p>
                </Part>

                <Part label="Fix">
                  <CodeBlock code={g.fixCode} label="Suggested" copy />
                  {g.fixNote ? (
                    <p className="text-base leading-[1.65] text-fq-night-body">
                      <Prose text={g.fixNote} />
                    </p>
                  ) : null}
                </Part>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
