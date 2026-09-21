import type { Metadata } from "next";
import {
  Hero,
  WhyViralnetix,
  Assessment,
  Projects,
  Showcase,
  FullBackgroundLink,
  Contact,
} from "./sections";

export const metadata: Metadata = {
  title: "Vivek M, Junior GTM Engineer application to Viralnetix",
  description:
    "I spent the last week building three projects for the role. A warm signal engine, an inbound intelligence agent, and a client expansion system.",
  /* Noindex on purpose. This is written for one company, and a targeted
     application page turning up in search results for other people is
     rarely what you want. Delete this block to make it public. */
  robots: { index: false, follow: false },
};

export default function ViralnetixPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Warm the handshake to Loom. cdn.loom.com serves the poster
          frames, which are wanted on first paint; www.loom.com serves
          the player, wanted the moment someone presses play. React
          hoists these into <head>, so DNS, TCP and TLS are already
          done by the time either is asked for. */}
      <link rel="preconnect" href="https://cdn.loom.com" />
      <link rel="preconnect" href="https://cdn.loom.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.loom.com" />

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
          {/* One gap governs the whole page, the same 20px the portfolio
              uses between blocks, hero included. Every block is a frame
              at the same width, so every left edge lines up. */}
          <div className="flex flex-col gap-5 pb-16 pt-6 sm:pb-20 sm:pt-10">
            <Hero />
            <WhyViralnetix />
            <Assessment />
            <Projects />
            <Showcase />
            <FullBackgroundLink />
            <Contact />
          </div>
        </div>
      </main>
    </div>
  );
}
