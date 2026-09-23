import type { Metadata } from "next";
import {
  Hero,
  Featured,
  Projects,
  Expectations,
  BackgroundLink,
  Contact,
} from "./sections";

export const metadata: Metadata = {
  title: "Vivek M, Junior GTM Engineer application to Digital Creativs",
  description:
    "I studied your Label Match campaign, then I rebuilt it. A signal-scored list of 50 craft beverage companies in an active buying window, 9 signals checked, 14 hot-tier accounts.",
  /* Noindex on purpose. This is written for one company, and a targeted
     application page turning up in search results for other people is
     rarely what you want. Delete this block to make it public. */
  robots: { index: false, follow: false },
};

export default function DigitalCreativsPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* The brand yellow, held to the top of the page. Running it the
          full height would leave a long page washed in it; landing in
          white by the end of the hero keeps it as an entrance rather
          than a tint over everything. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-dc-tint to-white"
      />

      <main className="relative mx-auto w-full max-w-page px-4 sm:px-5">
        {/* 860px, per the brief. One gap governs the whole page, hero
            included, so every block is the same width off the same
            left edge. */}
        <div className="mx-auto flex w-full max-w-[860px] flex-col gap-5 pb-16 pt-6 sm:pb-20 sm:pt-10">
          <Hero />
          <Featured />
          <Projects />
          <Expectations />
          <BackgroundLink />
          <Contact />
        </div>
      </main>
    </div>
  );
}
