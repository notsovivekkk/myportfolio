import Image from "next/image";
import { Frame, Card } from "@/components/ui/Primitives";

/* The last thing on the page.

   No attribution line: the whole site is already in first person, so a
   name under something the author wrote reads as a stock quote, which
   is the opposite of what it is. The signature says it instead, and
   says it in his own hand.

   Set in Caveat rather than Inter. At 34px the handwriting reads
   smaller than the 26px sans it replaced, because Caveat's x-height is
   roughly a third of its point size against Inter's half. Bigger
   number, quieter voice. */
export default function ClosingQuote() {
  return (
    <Frame>
      <Card className="relative flex flex-col items-center overflow-hidden px-8 py-16 sm:px-16 sm:py-20">
        {/* The mark is positioned against this wrapper, not the card, so
            adding the signature underneath cannot shift it off the text. */}
        <div className="relative flex w-full justify-center">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[62%] select-none font-hand text-[150px] leading-none text-frame sm:text-[220px]"
          >
            &ldquo;
          </span>

          <blockquote className="relative max-w-[440px] text-center font-hand text-[30px] leading-[1.3] text-ink sm:max-w-[540px] sm:text-[34px]">
            Leverage isn&apos;t just code or capital, it&apos;s clarity. The
            clearer your thinking, the faster your systems compound.
          </blockquote>
        </div>

        {/* Signed, off to one side and a few degrees off level, the way a
            signature lands when it is written rather than placed.
            multiply drops the scan's white ground so only the ink sits
            on the card. */}
        <Image
          src="/images/sign.png"
          alt="Vivek M signature"
          width={480}
          height={323}
          className="mt-8 w-[140px] -rotate-3 self-center mix-blend-multiply sm:mt-10 sm:w-[170px] sm:self-end"
        />
      </Card>
    </Frame>
  );
}
