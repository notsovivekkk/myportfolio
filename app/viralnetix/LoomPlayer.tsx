"use client";

import { useState } from "react";
import Image from "next/image";

/* ==================================================================
   Click to play Loom.

   Why this exists, because it is the whole fix.

   A Loom embed is not one network request. Measured on the live page
   with a cold cache: each embed pulls its document plus roughly 680
   separate JavaScript chunks off cdn.loom.com. Three embeds on one
   page came to 2058 requests. Nothing paints inside that frame until
   a large share of them have landed, and three players booting at once
   fight each other for connections, so the box sits empty for seconds.
   On a reload the chunks are cached and it looks instant, which is
   exactly the "blank first time, fine second time" behaviour.

   Eager loading and preconnects could not fix that, because the cost
   was never the handshake. It was the payload.

   So the page ships a poster instead. The visitor sees the first frame
   of the video immediately, at the correct size, with a play button.
   Nothing touches loom.com until they press it. Then one player boots,
   not three, and it autoplays straight into the video.

   This is the same pattern YouTube facades use. The trade is one extra
   click for a page that is never blank.
   ================================================================== */

/* Loom's ratio, from the padding-bottom in their own embed snippet.
   64.86% rather than 16:9 because Loom sizes the frame to the
   recording. The poster and the iframe share it, so pressing play
   swaps one for the other without moving a pixel below. */
const LOOM_RATIO = "100 / 64.86161251504213";

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

  if (playing) {
    return (
      <div
        style={{ aspectRatio: LOOM_RATIO }}
        className="relative w-full overflow-hidden rounded-[12px] bg-vn-frame"
      >
        {/* The poster stays underneath while the player boots. The
            iframe paints over it the moment it is ready, so the gap
            between pressing play and the video appearing shows the
            first frame rather than an empty purple box. It is already
            decoded and on screen, so this costs nothing. */}
        {poster && (
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 720px"
            className="object-cover"
          />
        )}

        <iframe
          /* autoplay so the click that dismissed the poster is the same
             click that starts the video. Two clicks to watch would be a
             worse trade than the one we already made. */
          src={`${src}?autoplay=1`}
          title={title}
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      style={{ aspectRatio: LOOM_RATIO }}
      className="group relative w-full overflow-hidden rounded-[12px] bg-vn-frame outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vn-primary"
    >
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          /* The card column is 800px at most and never full bleed, so
             there is no point letting Next generate 1920w candidates. */
          sizes="(max-width: 640px) 100vw, 720px"
          priority={priority}
          className="object-cover"
        />
      )}

      {/* A soft scrim, not a heavy one. It has two jobs: keep the white
          play button legible over a bright screen recording, and make
          the poster read as a video rather than as a screenshot. */}
      <span className="absolute inset-0 bg-vn-ink/10 transition-colors duration-200 ease-default group-hover:bg-vn-ink/[0.18]" />

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-vn-primary shadow-[0_4px_20px_-4px_rgba(26,26,26,0.45)] transition-transform duration-200 ease-spring group-hover:scale-[1.08]">
          {/* Nudged 2px right: a triangle's optical centre sits left of
              its bounding box, so a centred one always looks off. */}
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="#FFFFFF"
            aria-hidden="true"
            className="ml-[3px]"
          >
            <path d="M19 9.27a2 2 0 0 1 0 3.46L3 21.99a2 2 0 0 1-3-1.73V1.74A2 2 0 0 1 3 .01l16 9.26Z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
