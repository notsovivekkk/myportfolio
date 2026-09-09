import type { Metadata } from "next";
import {
  Hero,
  WhyViralnetix,
  Assessment,
  Projects,
  Contact,
} from "./sections";

export const metadata: Metadata = {
  title: "Vivek M, GTM Engineer application to Viralnetix",
  description:
    "I built three things for Viralnetix before applying. A warm signal engine, an inbound intelligence agent, and a client expansion system.",
  /* Noindex on purpose. This is written for one company, and a targeted
     application page turning up in search results for other people is
     rarely what you want. Delete this block to make it public. */
  robots: { index: false, follow: false },
};

export default function ViralnetixPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* The brand gradient, held to the top of the page. Running it the
          full height would leave a long page washed pink; landing it in
          white by the end of the hero keeps the colour as an entrance
          rather than a tint over everything. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-vn-blush to-white"
      />

      <main className="relative mx-auto w-full max-w-page px-4 sm:px-5">
        <div className="mx-auto w-full max-w-content">
          <Hero />

          {/* One gap governs the whole page, the same 20px the portfolio
              uses between blocks. Per-section padding is what let the
              spacing drift apart in the first place. */}
          <div className="flex flex-col gap-5 pb-16 sm:pb-20">
            <WhyViralnetix />
            <Assessment />
            <Projects />
            <Contact />
          </div>
        </div>
      </main>
    </div>
  );
}
