import Image from "next/image";
import { Frame, Card, Button } from "@/components/ui/Primitives";

/* ============================================================
   The /projects intro, shared.

   Used as-is on /projects and on company pages that open with the
   same introduction (/scalantec), so the two can never drift apart.
   It sits in the hero frame, whose 66px shoulder holds the nav bar.
   ============================================================ */
export default function ProjectsHero() {
  return (
    <Frame hero>
      <Card className="flex flex-col gap-7 p-8 sm:p-11 sm:pl-14">
        {/* Identity, as on the main page. The eyebrow takes the place
            of the role line under the name, so who he is and what he
            has been sit together. */}
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
            <p className="text-lg font-medium text-ink">Vivek M</p>
            <p className="text-base text-body">
              Freelancer · Agency Founder · GTM-E
            </p>
          </div>
        </div>

        <div className="flex max-w-full flex-col gap-3 md:max-w-[78%]">
          <h1 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-ink sm:text-2xl">
            6 years of freelancing and running an agency, working with
            premium clients (all through manual outbound).
          </h1>
          <p className="text-md text-body">
            Now I&apos;m transitioning fully into GTM engineering. Looking to
            capitalise on that hunger, own real outcomes, and be the person
            who drives revenue from the front.
          </p>
        </div>

        {/* The secondary button, so it reads as an option rather than
            the page's main call to action. Same site, so same tab,
            straight to the story, which runs in order from video editing
            to GTM engineering. */}
        <div className="flex">
          <Button href="/#story" variant="secondary" className="w-full sm:w-auto">
            My full background is here
            <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
      </Card>
    </Frame>
  );
}
