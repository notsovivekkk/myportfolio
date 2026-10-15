"use client";

import { useState, type ReactNode } from "react";
import { Frame, Card } from "@/components/ui/Primitives";

/* ==================================================================
   Version switch, shared (/revenanas, /apero).

   A page written for two readers. Both versions are rendered on the
   server and passed in, so switching is instant and needs no request.
   Only `hero` (inside the hero card) and `lead` (right after it) swap;
   the identity row above and everything outside this component never
   change.

   The URL follows the switch (?v=<value>, or no parameter for the
   default) with replaceState: no reload, no new history entry, and the
   link a reader copies opens the version they were looking at. The
   page reads the same parameter on the server, so a direct link renders
   the right version from the first paint.

   Each page brings its own colours through `styles`, so the control
   matches the brand it sits in.
   ================================================================== */

export type SwitchStyles = {
  active: string;
  inactive: string;
  focus: string;
};

export default function VersionSwitch<V extends string>({
  options,
  defaultValue,
  initial,
  identity,
  hero,
  lead,
  styles,
  label = "Choose who this page is for",
}: {
  options: { value: V; label: string }[];
  defaultValue: V;
  initial: V;
  identity: ReactNode;
  hero: Record<V, ReactNode>;
  lead?: Record<V, ReactNode>;
  styles: SwitchStyles;
  label?: string;
}) {
  const [version, setVersion] = useState<V>(initial);

  const choose = (next: V) => {
    setVersion(next);
    const url = new URL(window.location.href);
    if (next === defaultValue) url.searchParams.delete("v");
    else url.searchParams.set("v", next);
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      {/* The /projects hero's exact frame and padding. */}
      <Frame hero>
        <Card className="flex flex-col gap-7 p-8 sm:p-11 sm:pl-14">
          {identity}

          {/* A two option segmented control: the chosen side is a chip in
              the page's colour, the other sits back on the grey track. */}
          <div
            role="group"
            aria-label={label}
            className="flex w-full rounded-full bg-frame p-1 sm:w-auto sm:self-start"
          >
            {options.map((option) => {
              const active = option.value === version;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(option.value)}
                  className={`relative flex-1 rounded-full px-5 py-2 text-base font-medium outline-none transition-[background-color,color,box-shadow] duration-200 ease-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:flex-none ${styles.focus} ${
                    active ? styles.active : styles.inactive
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

      {lead ? lead[version] : null}
    </>
  );
}
