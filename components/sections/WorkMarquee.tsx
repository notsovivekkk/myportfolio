/* The GrowthBae work strip.

   Shared by the Work tab and the Home background section. One image
   list in one place, because two copies of the same list is two copies
   that drift the moment a project is swapped out. */

const works = [
  "/images/lp1.jpg",
  "/images/lp2.jpg",
  "/images/lp5.png",
  "/images/lp6.png",
];

export default function WorkMarquee() {
  return (
    /* Masked at both edges so work scrolls out of view rather than
       getting clipped by a hard boundary. */
    <div
      className="relative w-full overflow-hidden border-t border-line"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      {/* Listed twice; the keyframe travels exactly -50%, so the second
          copy is in place when the first wraps. */}
      <div className="marquee-track flex gap-3 py-5">
        {[...works, ...works].map((src, i) => (
          <div
            key={i}
            className="h-[140px] w-[220px] shrink-0 overflow-hidden rounded-tile bg-frame sm:h-[170px] sm:w-[280px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`GrowthBae work ${(i % works.length) + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
