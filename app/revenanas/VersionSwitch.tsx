import type { ReactNode } from "react";
import SharedVersionSwitch from "@/components/ui/VersionSwitch";

/* ==================================================================
   Jack / Dom switch for /revenanas: the shared VersionSwitch with this
   page's options and orange. Behaviour lives in the shared component.
   ================================================================== */

export type Version = "jack" | "dom";

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
  return (
    <SharedVersionSwitch<Version>
      options={[
        { value: "jack", label: "Jack here" },
        { value: "dom", label: "Dommi here" },
      ]}
      defaultValue="jack"
      initial={initial}
      identity={identity}
      hero={hero}
      lead={lead}
      styles={{
        active:
          "bg-rv-orange text-rv-ink shadow-[0_1px_2px_rgba(30,30,30,0.1),0_4px_12px_-4px_rgba(243,111,19,0.6)]",
        inactive: "text-rv-body hover:text-rv-ink",
        focus: "focus-visible:outline-rv-ink",
      }}
    />
  );
}
