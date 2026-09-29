import Image from "next/image";

/* ============================================================
   Loom poster that opens the video on Loom.

   The main site's version of the poster used on the company pages,
   in the portfolio's own monochrome: a near black play disc with a
   white mark, no brand colour.

   A Loom embed boots by downloading roughly 760 JavaScript files, so
   live embeds leave blank boxes on a first visit. Each video is shown
   as its own first frame instead, and the poster links to the video on
   loom.com in a new tab: Loom's player, Loom's controls, and this page
   still open behind it. Nothing touches loom.com until someone clicks.
   ============================================================ */

/* Loom's ratio, from the padding-bottom in their embed snippet. */
const LOOM_RATIO = "100 / 64.98194945848375";

function shareUrl(src: string) {
  return src.replace("/embed/", "/share/");
}

export default function LoomPoster({
  src,
  poster,
  title,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 380px",
}: {
  src: string;
  poster: string;
  title: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <a
      href={shareUrl(src)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${title} on Loom (opens in a new tab)`}
      style={{ aspectRatio: LOOM_RATIO }}
      className="group relative block w-full overflow-hidden rounded-tile bg-frame outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <Image
        src={poster}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />

      {/* Soft scrim: keeps the button legible over a bright recording
          and makes the poster read as a video, not a screenshot. */}
      <span className="absolute inset-0 bg-ink/10 transition-colors duration-200 ease-default group-hover:bg-ink/[0.18]" />

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink shadow-[0_4px_20px_-4px_rgba(10,10,10,0.45)] transition-transform duration-200 ease-default group-hover:scale-[1.06]">
          {/* Nudged right: a triangle's optical centre sits left of its
              bounding box, so a centred one always looks off. */}
          <svg
            width="16"
            height="18"
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
      <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-sm font-medium leading-none text-ink shadow-[0_1px_3px_rgba(10,10,10,0.12)]">
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
