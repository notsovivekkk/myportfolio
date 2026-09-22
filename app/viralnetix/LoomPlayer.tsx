import Image from "next/image";

/* ==================================================================
   Loom poster that opens the video on Loom.

   Every in-page approach traded one kind of friction for another. A
   Loom embed boots by downloading about 760 JavaScript files, so live
   embeds sat blank on a first visit, and a click to play facade could
   still stall or resume badly inside the iframe.

   So the page no longer plays video at all. Each project shows the
   video's own first frame with a play button, and the whole poster is
   a link to the video on loom.com in a new tab. Loom's own page is
   the fastest and most reliable place a Loom plays: their player,
   their controls, their speed settings, full screen, and this page is
   still open behind it when the reviewer comes back.

   Nothing here touches loom.com until someone clicks, so the
   application page itself stays light and instant.
   ================================================================== */

/* Loom's ratio, from the padding-bottom in their own embed snippet.
   64.86% rather than 16:9 because Loom sizes the frame to the
   recording. */
const LOOM_RATIO = "100 / 64.86161251504213";

/* The data holds embed URLs, the format Loom's snippet gives. The
   watch page is the same id under /share/. */
function shareUrl(src: string) {
  return src.replace("/embed/", "/share/");
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
    <a
      href={shareUrl(src)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${title} on Loom (opens in a new tab)`}
      style={{ aspectRatio: LOOM_RATIO }}
      className="group relative block w-full overflow-hidden rounded-[12px] bg-vn-frame outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vn-primary"
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

      {/* Soft scrim: keeps the button legible over a bright recording
          and makes the poster read as a video, not a screenshot. */}
      <span className="absolute inset-0 bg-vn-ink/10 transition-colors duration-200 ease-default group-hover:bg-vn-ink/[0.18]" />

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-vn-primary shadow-[0_4px_20px_-4px_rgba(26,26,26,0.45)] transition-transform duration-200 ease-default group-hover:scale-[1.06]">
          {/* Nudged right: a triangle's optical centre sits left of its
              bounding box, so a centred one always looks off. */}
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
        </span>
      </span>

      {/* Says where the click goes before it happens, so a new tab is
          expected rather than a surprise. */}
      <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-sm font-medium leading-none text-vn-ink shadow-[0_1px_3px_rgba(26,26,26,0.12)]">
        Watch on Loom
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </span>
    </a>
  );
}
