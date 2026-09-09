import Image from "next/image";

/* ------------------------------------------------------------------
   The story so far.

   Deliberately outside the frame/card system that carries the rest of
   the page. Every other block on this site is a surface you look at;
   this one is meant to read as writing, so it sits directly on the
   page with nothing around it. The break in rhythm is the point.
   ------------------------------------------------------------------ */

/* An avatar that lives inside a sentence rather than beside it.

   inline-flex plus align-middle is what keeps it in the text flow: the
   circle sits on the same line box as the words, so the line wraps
   around it naturally instead of the image floating on its own row. */
function InlineAvatar({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href?: string;
}) {
  /* 28px is not an arbitrary "a bit smaller". The prose runs 18px on a
     1.8 line height, so each line box is 32.4px tall. A 34px circle is
     taller than that box, which forces the line to grow and makes the
     image look like it is hanging below the text. At 28px the circle
     fits inside the box, so the line keeps its rhythm and the image
     sits on the line rather than under it.

     Margin on the left only. JSX strips the newlines around an element,
     so the avatar sits flush against whatever text node follows it, and
     that text carries its own punctuation. A right margin here would
     put a gap before every comma. */
  const shell =
    "ml-1.5 inline-flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-frame align-middle";

  const img = (
    <Image
      src={src}
      alt={alt}
      width={56}
      height={56}
      className="h-full w-full object-cover"
    />
  );

  // No href means no link affordance: a plain span, no pointer cursor,
  // nothing that looks clickable but is not.
  if (!href) {
    return (
      <span className={shell} aria-hidden="true">
        {img}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className={`${shell} align-middle transition-transform duration-200 ease-default hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-story`}
    >
      {img}
    </a>
  );
}

export default function StorySection() {
  /* Padding is asymmetric on purpose. The top gap separates the story
     from the focus grid above it; the bottom one only has to clear the
     next card, so it does not need to match. Equal padding left a hole
     under the last line. */
  return (
    <section className="px-6 pb-10 pt-14 sm:px-8 sm:pb-12 sm:pt-20">
      {/* The only handwritten type on the site, and the only colour.
          Both are doing the same job: signalling that this is Vivek
          talking, not the site describing him. */}
      <h2 className="font-hand text-[36px] leading-none text-story sm:text-[42px]">
        The story so far
      </h2>

      {/* 68ch keeps the measure readable. The column is 800px wide, and
          18px prose run at full width would be past 85 characters a
          line, which is where the eye starts losing its place. */}
      <div className="mt-10 flex max-w-[68ch] flex-col gap-7 text-lg leading-[1.8] text-body sm:mt-12">
        <p>
          Started with video editing. Freelance. Figuring things out during
          engineering undergrad.
        </p>

        <p>
          One day a client asked if I could build a website. Said yes. Had no
          idea how. Figured it out overnight, over-delivered, and that became
          GrowthBae
          <InlineAvatar
            src="/images/story-growthbae.jpg"
            alt="GrowthBae"
            href="https://www.growthbae.com"
          />
          .
        </p>

        <p>
          Six years. Football agencies, top tier clients across the UK and US.
        </p>

        <p>
          AI happened next
          <InlineAvatar src="/images/story-claude.png" alt="Claude" />
          . Started building products natively with AI. Got pulled into product
          along the way. Helped ship a fitness app on the App Store
          <InlineAvatar
            src="/images/story-grytt.png"
            alt="Grytt"
            href="https://www.grytt.club/"
          />
          .
        </p>

        {/* The turn in the story. mark is the right element here: it means
            "relevant to the reader right now", which is exactly the job a
            highlighter does on a page. */}
        <p>
          <mark className="pf-highlight">
            GTM engineering is where everything clicked.
          </mark>{" "}
          Every skill I had built compounded into one.
        </p>

        <p>
          The idea that you could find exactly who needs what your client sells,
          detect when they are ready, and reach them with something relevant
          enough to get a reply.
        </p>

        {/* The resolution. The highlight above is the peak of the story,
            this is where it lands, so it takes weight rather than colour. */}
        <p className="text-ink">Now I build the systems that do that.</p>
      </div>
    </section>
  );
}
