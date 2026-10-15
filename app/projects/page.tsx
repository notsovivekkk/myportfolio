import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCta from "@/components/sections/ContactCta";
import ProjectsHero from "@/components/sections/ProjectsHero";
import ProofOfWork from "@/components/sections/ProofOfWork";

export const metadata: Metadata = {
  title: "Projects, Vivek M",
  description:
    "6 years of freelancing and running an agency, working with premium clients (all through manual outbound). Now I’m a GTM engineer. Proof of work, walked through on Loom.",
};

/* ============================================================
   /projects

   A standalone page on the main site's system, not a variation of
   it: the same Nav bar (without the one page table of contents, since
   none of those sections live here), the same hero frame with the nav
   sitting in its shoulder, the same grey panel with white tiles as
   "What I focus on", and the same contact block to close.
   ============================================================ */

export default function ProjectsPage() {
  return (
    <>
      <Nav items={[]} />

      {/* Same shell as the main page: only the 18px strip is cleared,
          and the nav bar sits inside the hero's 66px frame shoulder. */}
      <main className="mx-auto w-full max-w-page px-4 pb-16 pt-[18px] sm:px-5">
        <div className="mx-auto flex w-full max-w-content flex-col gap-5">
          {/* ---------- Intro ---------- */}
          {/* Shared with /scalantec, see components/sections. */}
          <ProjectsHero />

          {/* ---------- Proof of work ---------- */}
          {/* Shared with /apero, see components/sections. */}
          <ProofOfWork />

          {/* ---------- Ender ---------- */}
          <div id="contact" className="scroll-mt-24">
            <ContactCta />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
