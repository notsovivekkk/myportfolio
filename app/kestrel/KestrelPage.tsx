/* ==================================================================
   The Kestrel application page, PARKED.

   Hidden for now, not deleted. Next.js only routes a file named
   page.tsx, so this file is invisible to visitors; /kestrel currently
   shows a "page moved" notice instead (see page.tsx in this folder).

   To put it back live, replace the whole of page.tsx with:

     export { default, kestrelMetadata as metadata } from "./KestrelPage";
   ================================================================== */
import type { Metadata } from "next";
import {
  Hero,
  Projects,
  Contribution,
  BackgroundLink,
  Contact,
} from "./sections";

export const kestrelMetadata: Metadata = {
  title: "Vivek M, Junior GTM Engineer application to Kestrel",
  description:
    "I built an ICP doc and lead list for Tightrope. A signal-scored list of 40 property management companies in an active buying window, 9 signals checked, 18 decision-makers ready for outreach.",
  /* Noindex on purpose. This is written for one company, and a targeted
     application page turning up in search results for other people is
     rarely what you want. Delete this block to make it public. */
  robots: { index: false, follow: false },
};

export default function KestrelPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* The brand blue, held to the top of the page as a faint wash
          that lands in white by the end of the hero: an entrance, not a
          tint over everything. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-ks-tint to-white"
      />

      <main className="relative mx-auto w-full max-w-page px-4 sm:px-5">
        {/* 860px, the same width as the Digital Creativs page. One gap
            governs the whole page, so every block is the same width off
            the same left edge. */}
        <div className="mx-auto flex w-full max-w-[860px] flex-col gap-5 pb-16 pt-6 sm:pb-20 sm:pt-10">
          <Hero />
          <Projects />
          <Contribution />
          <BackgroundLink />
          <Contact />
        </div>
      </main>
    </div>
  );
}
