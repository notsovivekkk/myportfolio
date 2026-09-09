import { Frame, Card, SectionHeading } from "@/components/ui/Primitives";
import WorkMarquee from "@/components/sections/WorkMarquee";

/* Where the GTM instinct came from, told as background rather than as
   a credential. The marquee sits flush to the bottom edge of the card
   with no padding under it, so the work reads as running past the
   frame instead of being parked inside it. */
export default function BackgroundSection() {
  return (
    <Frame>
      <Card className="flex flex-col overflow-hidden">
        <div className="flex flex-col gap-4 p-8 sm:p-11">
          <SectionHeading
            label="Background."
            title="GrowthBae, Founder"
            subtitle="6 years of building brands, websites, and digital products for football clubs, sports agencies, and lifestyle brands across the US and UK."
          />

          <p className="max-w-[52ch] text-base text-body">
            Every client came from outbound. Cold outreach, manual research,
            finding the right person at the right time. That is where my GTM
            instincts were built before I knew what GTM engineering was.
          </p>
        </div>

        <WorkMarquee />
      </Card>
    </Frame>
  );
}
