"use client";

import { useState, type ReactNode } from "react";
import { Frame, Card } from "@/components/ui/Primitives";

/* ==================================================================
   Jack / Dom switch for /revenanas.

   Both versions are rendered on the server and passed in, so switching
   is instant and needs no request. Only the hero copy and the lead
   project swap; the identity row above and everything below the lead
   project are outside this component and never change.

   The URL follows the switch (?v=dom, or no parameter for Jack) with
   replaceState: no reload, no new history entry, and the link a reader
   copies opens the version they were looking at. The server reads the
   same parameter, so /revenanas?v=dom renders Dom from the first paint.
   ================================================================== */

export type Version = "jack" | "dom";

const OPTIONS: { value: Version; label: string }[] = [
  { value: "jack", label: "Jack here" },
  { value: "dom", label: "Dommi here" },
];

export default function VersionSwitch({
  initial,
  identity,
  hero,
  lead,
}: {
  initial: Version;
  identity: ReactNode;
  hero: Record<Version, ReactNode>;
  lead: Record<Version, ReactNode>;
}) {
  const [version, setVersion] = useState<Version>(initial);

  const choose = (next: Version) => {
    setVersion(next);
    const url = new URL(window.location.href);
    if (next === "dom") url.searchParams.set("v", "dom");
    else url.searchParams.delete("v");
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      {/* The /projects hero's exact frame and padding. */}
      <Frame hero>
        <Card className="flex flex-col gap-7 p-8 sm:p-11 sm:pl-14">
          {identity}

          {/* A two option segmented control: the chosen side is a chip in
              their orange, the other sits back on the grey track. */}
          <div
            role="group"
            aria-label="Choose who this page is for"
            className="flex w-full rounded-full bg-frame p-1 sm:w-auto sm:self-start"
          >
            {OPTIONS.map((option) => {
              const active = option.value === version;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(option.value)}
                  className={`relative flex-1 rounded-full px-5 py-2 text-base font-medium outline-none transition-[background-color,color,box-shadow] duration-200 ease-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rv-ink sm:flex-none ${
                    active
                      ? "bg-rv-orange text-rv-ink shadow-[0_1px_2px_rgba(30,30,30,0.1),0_4px_12px_-4px_rgba(243,111,19,0.6)]"
                      : "text-rv-body hover:text-rv-ink"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {hero[version]}
        </Card>
      </Frame>

      {lead[version]}
    </>
  );
}
