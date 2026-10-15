import { existsSync } from "node:fs";
import path from "node:path";
import { Panel, SectionHeading } from "@/components/ui/Primitives";
import LoomPoster from "@/components/ui/LoomPoster";
import IcpGateAnimation from "@/components/ui/IcpGateAnimation";
import IcpGateVideo from "@/components/ui/IcpGateVideo";
import IcpGateCard from "@/components/ui/IcpGateCard";

/* ============================================================
   Proof of work, shared.

   The /projects project cards, data and layout in one place, so every
   page that shows them (/projects, /apero) shows exactly the same
   cards in the same order. Edit a project here and it changes
   everywhere.
   ============================================================ */

/* A project shows either a Loom poster (and links to it) or, with no
   Loom, the ICP Gate media in the same slot, unlinked. */
type Project = {
  name: string;
  description: string;
} & ({ loom: string; poster: string } | { media: "icp-gate" });

/* Checked at build time: drop a clip at public/videos/icp-gate.mp4 and
   the next build uses it in place of the illustration. */
const hasIcpGateVideo = existsSync(
  path.join(process.cwd(), "public/videos/icp-gate.mp4"),
);

/* In the order given. Posters: newer Loom recordings only hand out
   signed thumbnail links that expire, so those frames are saved in
   public/images/looms; older ones still have a stable CDN URL. */
const projects: Project[] = [
  {
    name: "ICP Gate",
    description:
      "An agent that checks every company on a lead list against the client's real ICP before enrichment. It reads each company's website and returns a fit probability using Jev, so credits only go to companies that actually fit.",
    media: "icp-gate",
  },
  {
    name: "Warm Signal Engine",
    description:
      "Engagement-based outbound engine that turns LinkedIn post reactions into a qualified prospect list for a cybersecurity company.",
    loom: "https://www.loom.com/embed/4786ad6a872049168eb7410b40ccc1fc",
    poster: "/images/looms/warm-signal-engine.jpg",
  },
  {
    name: "Vanta Buying Window Detection",
    description:
      "Signal-scored pipeline finding companies in an active buying window across fintech and healthcare segments using two parallel data sources and seven enriched signals.",
    loom: "https://www.loom.com/embed/de57bc9394ad4214851fe43ba0346c65",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/de57bc9394ad4214851fe43ba0346c65-b4439463d61d1836.jpg",
  },
  {
    name: "Inbound Intelligence Agent",
    description:
      "Automated pre-call research agent that fires on every inbound booking and delivers a company brief to Slack before the call.",
    loom: "https://www.loom.com/embed/dfd8168aaaf94d46aa1a7f145e7b73e5",
    poster: "/images/looms/inbound-intelligence-agent.jpg",
  },
  {
    name: "Engagement to Inbound Pipeline",
    description:
      "Scrapes LinkedIn post engagers from GTM influencers, qualifies them as potential agency clients, and pushes personalised outreach angles to Slack.",
    loom: "https://www.loom.com/embed/795484d9f1b8440a9899f207bd448008",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/795484d9f1b8440a9899f207bd448008-091af5b5a844764c.jpg",
  },
  {
    name: "Clay Skills Showcase",
    description:
      "A full Clay table for company enrichment and scoring, built end to end and walked through step by step.",
    loom: "https://www.loom.com/embed/2021e9d0abc34809b94251ba2cc30b7f",
    poster: "/images/looms/clay-skills-showcase.jpg",
  },
];

export default function ProofOfWork() {
  /* The same grey panel with white tiles as "What I focus on". Two per
   row from md up; rows stretch so each pair shares a bottom edge.
   With an odd count the last tile fills its row and lays out side by
   side, which keeps its video the same size as the videos above it
   instead of doubling. */
  return (
    <div id="work" className="scroll-mt-24">
      <Panel className="flex flex-col gap-9 sm:gap-10">
        <SectionHeading title="Proof of work" />

        <div className="grid grid-cols-1 gap-3 max-md:auto-rows-fr md:grid-cols-2">
          {projects.map((project, i) => {
            const alone =
              projects.length % 2 === 1 && i === projects.length - 1;
            const aloneLayout = alone
              ? "md:col-span-2 md:grid md:grid-cols-2 md:items-center md:gap-x-[52px] md:gap-y-0"
              : "";

            /* No Loom: the card opens its write up in a modal
                 instead of linking out. */
            if (!("loom" in project)) {
              const media = hasIcpGateVideo ? (
                <IcpGateVideo />
              ) : (
                <IcpGateAnimation />
              );
              return (
                <IcpGateCard
                  key={project.name}
                  name={project.name}
                  description={project.description}
                  media={media}
                  modalMedia={media}
                  className={aloneLayout}
                />
              );
            }

            return (
              <article
                key={project.name}
                className={`flex flex-col gap-5 rounded-card bg-surface p-4 sm:p-5 ${aloneLayout}`}
              >
                <LoomPoster
                  src={project.loom}
                  poster={project.poster}
                  title={`${project.name} walkthrough`}
                  priority={i < 2}
                />
                <div className="flex flex-col gap-2 px-1 pb-1">
                  <h3 className="text-md font-medium leading-[1.35] text-ink">
                    {project.name}
                  </h3>
                  <p className="text-base leading-[1.6] text-body">
                    {project.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
