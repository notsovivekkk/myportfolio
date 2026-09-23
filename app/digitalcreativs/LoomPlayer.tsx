import Image from "next/image";

/* ==================================================================
   Loom poster that opens the video on Loom.

   Same approach as the Viralnetix page, in Digital Creativs colours.
   A Loom embed boots by downloading roughly 760 JavaScript files, so
   live embeds leave blank boxes on a first visit. Instead each project
   shows the video's own first frame with a play button, and the poster
   links to the video on loom.com in a new tab: their player, their
   controls, and this page still open behind it.
   ================================================================== */

/* Loom's ratio, from the padding-bottom in their embed snippet. */
const LOOM_RATIO = "100 / 64.98194945848375";

function shareUrl(src: string) {
  return src.replace("/embed/", "/share/");
}

export default function LoomPlayer({
  src,
  poster,
  title,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 420px",
  compact = false,
}: {
  src: string;
  poster: string;
  title: string;
  priority?: boolean;
  sizes?: string;
  /* A thumbnail beside a paragraph, rather than the main event. The
     controls scale with it: a 52px disc on a 248px poster covers a
     quarter of the frame and reads as clutter. */
  compact?: boolean;
}) {
  return (
    <a
      href={shareUrl(src)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${title} on Loom (opens in a new tab)`}
      style={{ aspectRatio: LOOM_RATIO }}
      className="group relative block w-full overflow-hidden rounded-[12px] bg-dc-frame outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dc-deep"
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
      <span className="absolute inset-0 bg-dc-ink/10 transition-colors duration-200 ease-default group-hover:bg-dc-ink/[0.18]" />

      <span className="absolute inset-0 flex items-center justify-center">
        {/* Yellow disc, near black mark. White on yellow would be
            illegible, and this is the brand's own pairing. */}
        <span
          className={`flex items-center justify-center rounded-full bg-dc-primary shadow-[0_4px_20px_-4px_rgba(20,20,20,0.45)] transition-transform duration-200 ease-default group-hover:scale-[1.06] ${
            compact ? "h-10 w-10" : "h-[52px] w-[52px]"
          }`}
        >
          {/* Nudged right: a triangle's optical centre sits left of its
              bounding box, so a centred one always looks off. */}
          <svg
            width={compact ? 14 : 18}
            height={compact ? 16 : 20}
            viewBox="0 0 20 22"
            fill="#141414"
            aria-hidden="true"
            className="ml-[3px]"
          >
            <path d="M19 9.27a2 2 0 0 1 0 3.46L3 21.99a2 2 0 0 1-3-1.73V1.74A2 2 0 0 1 3 .01l16 9.26Z" />
          </svg>
        </span>
      </span>

      {/* Says where the click goes before it happens, so a new tab is
          expected rather than a surprise. */}
      <span
        className={`absolute inline-flex items-center gap-1 rounded-full bg-white/95 font-medium leading-none text-dc-ink shadow-[0_1px_3px_rgba(20,20,20,0.12)] ${
          compact
            ? "bottom-2 right-2 px-2 py-0.5 text-xs"
            : "bottom-2.5 right-2.5 px-2.5 py-1 text-sm"
        }`}
      >
        Watch on Loom
        <svg
          width={compact ? 8 : 9}
          height={compact ? 8 : 9}
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
