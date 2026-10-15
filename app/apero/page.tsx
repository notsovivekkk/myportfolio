import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactCta from "@/components/sections/ContactCta";
import ProofOfWork from "@/components/sections/ProofOfWork";
import LoomPoster from "@/components/ui/LoomPoster";
import VersionSwitch from "@/components/ui/VersionSwitch";

export const metadata: Metadata = {
  title: "Vivek M, for Apero",
  description: "My intro, a project walkthrough, and my proof of work.",
  /* Noindex, matching /revenanas: written for one company, and a
     targeted page turning up in search results for other people is
     rarely what you want. Delete this block to make it public. */
  robots: { index: false, follow: false },
};

/* ==================================================================
   /apero

   The /revenanas layout and switch, for two readers: Ben (default) and
   Michael (?v=michael). Only the intro text swaps. The intro Loom, the
   proof of work (shared with /projects) and the contact block are the
   same for both.

   Colour: Apero's near black green, #0F1614, as a solid fill under
   white: the chosen side of the switch and the intro video's play
   button. Everything else is the main site's own palette.
   ================================================================== */

type Reader = "ben" | "michael";

const INTRO_LOOM = {
  src: "https://www.loom.com/embed/3ff5b0fffbd044b1ad6cb62e175e58b3",
  /* Loom's poster link for this recording is signed and expires, so its
     first frame is saved with the site. */
  poster: "/images/looms/apero-intro.jpg",
};

/* The intro text, line breaks kept: each version is two paragraphs.
   The first leads in full ink at reading size; the second, which says
   what is below, sits a step back. */
const INTRO: Record<Reader, [string, string]> = {
  ben: [
    "Yo Ben, I know you love my name lol. Jokes aside.",
    "Here's my intro Loom below, plus a GitHub project walkthrough, my take on one of your concerns, and the freedom for you to decide if I'm a fit or not ;)",
  ],
  michael: [
    "I did myself a disservice by positioning myself for an intern role. It came across like I don't have client management experience. I'd like to own that mistake and the confusion it created.",
    "Here's my intro, a project walkthrough, and the hope that I'll get some feedback from you.",
  ],
};

/* The intro video, the same in both versions. Directly after the text,
   no title or description. A poster that opens the video on Loom, like
   every video on the site, at a width that invites a click rather than
   filling the card. */
function IntroLoom() {
  return (
    <div className="w-full md:max-w-[440px]">
      <LoomPoster
        src={INTRO_LOOM.src}
        poster={INTRO_LOOM.poster}
        title="Vivek M intro"
        priority
        disc="bg-ap-hl"
        sizes="(max-width: 768px) 100vw, 440px"
      />
    </div>
  );
}

function Intro({ reader }: { reader: Reader }): ReactNode {
  const [lead, rest] = INTRO[reader];
  return (
    <>
      <div className="flex max-w-full flex-col gap-3 md:max-w-[82%]">
        <p className="text-[20px] font-normal leading-[1.4] tracking-[-0.015em] text-ink sm:text-[22px]">
          {lead}
        </p>
        <p className="text-md text-body">{rest}</p>
      </div>
      <IntroLoom />
    </>
  );
}

/* Reads ?v=michael on the server, so Michael's link renders his text
   from the first paint. Anything else, ?v=ben included, is Ben. */
export default async function AperoPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string | string[] }>;
}) {
  const { v } = await searchParams;
  const initial: Reader = v === "michael" ? "michael" : "ben";

  return (
    <>
      <Nav items={[]} />

      {/* The /projects shell: only the 18px strip is cleared, and the
          nav bar sits inside the hero's 66px frame shoulder. */}
      <main className="mx-auto w-full max-w-page px-4 pb-16 pt-[18px] sm:px-5">
        <div className="mx-auto flex w-full max-w-content flex-col gap-5">
          <VersionSwitch<Reader>
            options={[
              { value: "ben", label: "I'm Ben" },
              { value: "michael", label: "I'm Michael" },
            ]}
            defaultValue="ben"
            initial={initial}
            label="Choose who is reading"
            styles={{
              active:
                "bg-ap-hl text-white shadow-[0_1px_2px_rgba(15,22,20,0.2),0_4px_12px_-4px_rgba(15,22,20,0.5)]",
              inactive: "text-body hover:text-ink",
              focus: "focus-visible:outline-ap-hl",
            }}
            identity={
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full sm:h-[90px] sm:w-[90px]">
                  <Image
                    src="/images/dp.jpg"
                    alt="Vivek M"
                    width={90}
                    height={90}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h1 className="text-lg font-medium text-ink">Vivek M</h1>
                  <p className="text-base text-body">
                    Freelancer · Agency Founder · GTM-E
                  </p>
                </div>
              </div>
            }
            hero={{
              ben: <Intro reader="ben" />,
              michael: <Intro reader="michael" />,
            }}
          />

          {/* The /projects cards, shared: same data, same order. */}
          <ProofOfWork />

          <div id="contact" className="scroll-mt-24">
            <ContactCta />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
