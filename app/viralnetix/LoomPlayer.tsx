"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ==================================================================
   Click to play Loom, with the player warmed ahead of the click.

   The cost of a Loom embed is its player, not the video. Measured cold,
   one embed pulls about 757 separate JavaScript files off cdn.loom.com
   and takes around 12 seconds to finish them. That was the delay after
   pressing play.

   Two parts to the fix:

   1. The page ships posters, not players. Nothing touches loom.com on
      first paint, so the page itself is never blank or slow.

   2. While the reader is still on the hero and the assessment, one
      hidden, silent Loom frame loads in the background purely to pull
      the player code into the browser cache. All five videos use the
      same player build, so warming it once warms every one of them. By
      the time anyone presses play, the player boots from cache.

   The warm up waits until the page is idle, so it never competes with
   the page's own loading. It is skipped on data saver and 2G, where a
   few MB nobody asked for is a real cost; there, hovering, focusing or
   touching a play button still starts it, which buys back most of the
   gap between intent and click.
   ================================================================== */

/* Loom's ratio, from the padding-bottom in their own embed snippet.
   The poster and the iframe share it, so pressing play swaps one for
   the other without moving a pixel below. */
const LOOM_RATIO = "100 / 64.86161251504213";

/* Any public embed works, since the player build is shared. Set by the
   first player that mounts. */
let warmSrc: string | null = null;
let warmed = false;

function warmPlayer() {
  if (warmed || !warmSrc || typeof document === "undefined") return;
  warmed = true;

  const frame = document.createElement("iframe");
  /* No autoplay: this frame exists to fill the cache, not to play. */
  frame.src = warmSrc;
  frame.title = "";
  frame.tabIndex = -1;
  frame.setAttribute("aria-hidden", "true");
  /* Rendered, so the browser really runs it, but 1px, invisible, off
     screen and untouchable. display:none frames can be deprioritised. */
  frame.style.cssText =
    "position:fixed;left:-10px;top:-10px;width:1px;height:1px;opacity:0;pointer-events:none;border:0;";
  document.body.appendChild(frame);

  /* Leave it long enough for the player to request its lazy chunks,
     then drop it. The cache keeps what it fetched. */
  frame.addEventListener("load", () => {
    window.setTimeout(() => frame.remove(), 20000);
  });
}

function shouldWarmOnIdle() {
  const c = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!c) return true;
  if (c.saveData) return false;
  return !/(^|-)2g$/.test(c.effectiveType ?? "");
}

export default function LoomPlayer({
  src,
  poster,
  title,
  priority = false,
}: {
  src?: string;
  poster?: string;
  title: string;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!src || warmSrc) return;
    warmSrc = src;
    if (!shouldWarmOnIdle()) return;

    /* After the page has fully loaded and the main thread is free.
       Safari has no requestIdleCallback, so it gets a plain delay. */
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(warmPlayer, { timeout: 4000 });
      } else {
        timeoutId = window.setTimeout(warmPlayer, 1500);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [src]);

  if (!src) {
    return (
      <div
        style={{ aspectRatio: LOOM_RATIO }}
        className="flex w-full items-center justify-center rounded-[12px] border border-dashed border-vn-line bg-vn-frame"
      >
        <span className="text-base text-vn-muted">Loom embed here</span>
      </div>
    );
  }

  return (
    <div
      style={{ aspectRatio: LOOM_RATIO }}
      className="relative w-full overflow-hidden rounded-[12px] bg-vn-frame"
    >
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          /* The tile column is never wider than about 370px, so there is
             no point letting Next generate 1920w candidates. */
          sizes="(max-width: 768px) 100vw, 380px"
          priority={priority}
          className="object-cover"
        />
      )}

      {playing && (
        <iframe
          /* autoplay so the click that dismissed the poster is the same
             click that starts the video. */
          src={`${src}?autoplay=1`}
          title={title}
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          onLoad={() => setReady(true)}
          /* Invisible until its document has loaded, then a short fade.
             Without this the frame flashes an empty white box over the
             poster for a beat before the player paints. */
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ease-default ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* The poster's controls. Stays on top until the player is ready,
          and the play mark turns into a spinner the instant it is
          pressed, so the click is acknowledged even on a slow network. */}
      {!ready && (
        <button
          type="button"
          onClick={() => {
            warmPlayer();
            setPlaying(true);
          }}
          onPointerEnter={warmPlayer}
          onFocus={warmPlayer}
          onTouchStart={warmPlayer}
          disabled={playing}
          aria-label={playing ? `Loading ${title}` : `Play ${title}`}
          aria-busy={playing}
          className="group absolute inset-0 flex items-center justify-center outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vn-primary disabled:cursor-progress"
        >
          {/* Soft scrim: keeps the button legible over a bright
              recording and makes the poster read as a video. */}
          <span className="absolute inset-0 bg-vn-ink/10 transition-colors duration-200 ease-default group-hover:bg-vn-ink/[0.18]" />

          <span
            className={`relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-vn-primary shadow-[0_4px_20px_-4px_rgba(26,26,26,0.45)] transition-transform duration-200 ease-default ${
              playing ? "" : "group-hover:scale-[1.06]"
            }`}
          >
            {playing ? (
              <span
                aria-hidden="true"
                className="h-5 w-5 animate-spin rounded-full border-2 border-white/35 border-t-white"
              />
            ) : (
              /* Nudged right: a triangle's optical centre sits left of
                 its bounding box, so a centred one always looks off. */
              <svg
                width="18"
                height="20"
                viewBox="0 0 20 22"
                fill="#FFFFFF"
                aria-hidden="true"
                className="ml-[3px]"
              >
                <path d="M19 9.27a2 2 0 0 1 0 3.46L3 21.99a2 2 0 0 1-3-1.73V1.74A2 2 0 0 1 3 .01l16 9.26Z" />
              </svg>
            )}
          </span>
        </button>
      )}
    </div>
  );
}
