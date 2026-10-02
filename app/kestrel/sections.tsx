import type { ReactNode } from "react";
import Image from "next/image";
import LoomPlayer from "./LoomPlayer";

/* ==================================================================
   Kestrel application page.

   Same system as the main portfolio and the other company pages: grey
   frame wrapping a white card, 22/20/12px radii, 32px card padding
   (44px from sm), 20px between blocks, and the same type scale:

     section label   14 regular, brand blue
     section title   18 medium
     body            14 regular, 16 for the hero subtext only
     hero headline   24 / 26 regular

   Only the palette changes: white plus Kestrel's #2B24EF, which clears
   AA both as a fill under white text and as text on white.
   ================================================================== */

/* ---------------- Primitives, Kestrel skin ---------------- */

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[22px] bg-ks-frame p-0.5">
      {children}
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[20px] bg-white ${className}`}>
      {children}
    </div>
  );
}

/* Tinted panel with the heading on it and white tiles inside. The
   heading is inset a further 14px so its left edge lands exactly where
   text starts inside every card above and below it. */
function Panel({
  heading,
  children,
  id,
}: {
  heading: ReactNode;
  children: ReactNode;
  id?: string;
}) {
  return (
    <div
      id={id}
      className="flex scroll-mt-8 flex-col gap-8 rounded-[22px] bg-ks-frame px-5 pb-5 pt-9 sm:gap-9 sm:px-8 sm:pb-8 sm:pt-[50px]"
    >
      <div className="px-3.5">{heading}</div>
      {children}
    </div>
  );
}

function SectionHeading({ label, title }: { label?: string; title: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label ? <p className="text-base text-ks-primary">{label}</p> : null}
      <h2 className="text-lg font-medium text-ks-ink">{title}</h2>
    </div>
  );
}

/* 40px tall, 20px sides, 12px radius, 14px medium, as everywhere else.
   Solid is the brand under white text; secondary is white on a hairline,
   the same pairing as the main page's contact buttons; quiet is the
   hairline alone, for the aside that should not compete. */
function Button({
  href,
  children,
  external = false,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "solid" | "secondary" | "quiet";
}) {
  const skin = {
    solid:
      "bg-ks-primary text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_1px_2px_rgba(19,18,31,0.08),0_6px_16px_-6px_rgba(43,36,239,0.55)] hover:bg-ks-hover",
    secondary:
      "bg-white text-ks-ink shadow-[inset_0_0_0_1px_#E3E2FA,0_6px_6px_-3px_rgba(41,41,41,0.04),0_12px_12px_-6px_rgba(41,41,41,0.04)] hover:shadow-[inset_0_0_0_1px_#2B24EF,0_6px_6px_-3px_rgba(41,41,41,0.05),0_12px_12px_-6px_rgba(41,41,41,0.05)]",
    quiet:
      "bg-white text-ks-body shadow-[inset_0_0_0_1px_#E3E2FA] hover:text-ks-ink hover:shadow-[inset_0_0_0_1px_#2B24EF]",
  }[variant];

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-[12px] px-5 text-base font-medium outline-none transition-[background-color,box-shadow,color] duration-200 ease-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ks-primary active:scale-[0.98] sm:w-auto ${skin}`}
    >
      {children}
    </a>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-ks-soft px-2.5 py-1 text-sm leading-none text-ks-primary">
      {children}
    </span>
  );
}

/* ---------------- Content ---------------- */

const TIGHTROPE = {
  name: "Tightrope Buying Window Engine",
  description:
    "Picked Tightrope from your case studies and rebuilt the ICP and lead list from scratch. The ICP doc doubles as the context file for Claude Code, so the agent builds in my direction instead of guessing. Mapped Tightrope's 4 AI agents to the 4 roles they replace, then found PMCs hiring for exactly those roles.",
  outcome:
    "40 scored accounts, 2 Hot. Urban Coast already pays Latchel for after-hours calls, the exact gap Tightrope closes. 18 decision-makers, 13 verified emails, MX checked, LinkedIn as backup.",
  loom: "https://www.loom.com/embed/caff966e08e24e76a6ea109b2432b84e",
  poster: "/images/looms/tightrope.jpg",
};

type Project = {
  name: string;
  tags: string[];
  description: string;
  loom: string;
  poster: string;
};

/* Posters: Loom hands out signed thumbnail links that expire for newer
   recordings, so those frames are saved into public/images/looms and
   served from this site. Older recordings still have a stable CDN URL
   and are used directly. */
const projects: Project[] = [
  {
    name: "Warm Signal Engine",
    tags: ["Infrastructure", "Execution"],
    description:
      "Engagement-based outbound engine that turns LinkedIn post reactions into a qualified prospect list for a cybersecurity company.",
    loom: "https://www.loom.com/embed/4786ad6a872049168eb7410b40ccc1fc",
    poster: "/images/looms/warm-signal-engine.jpg",
  },
  {
    name: "Vanta Buying Window Detection",
    tags: ["Intelligence", "Infrastructure"],
    description:
      "Signal-scored pipeline finding companies in an active buying window across fintech and healthcare segments using two parallel data sources and seven enriched signals.",
    loom: "https://www.loom.com/embed/de57bc9394ad4214851fe43ba0346c65",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/de57bc9394ad4214851fe43ba0346c65-b4439463d61d1836.jpg",
  },
  {
    name: "Engagement to Inbound Pipeline",
    tags: ["Intelligence", "Automation"],
    description:
      "Scrapes LinkedIn post engagers from GTM influencers, qualifies them as potential agency clients, and pushes personalised outreach angles to Slack.",
    loom: "https://www.loom.com/embed/795484d9f1b8440a9899f207bd448008",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/795484d9f1b8440a9899f207bd448008-091af5b5a844764c.jpg",
  },
  {
    name: "Inbound Intelligence Agent",
    tags: ["Automation", "Intelligence"],
    description:
      "Automated pre-call research agent that fires on every inbound booking and delivers a company brief to Slack before the call.",
    loom: "https://www.loom.com/embed/dfd8168aaaf94d46aa1a7f145e7b73e5",
    poster: "/images/looms/inbound-intelligence-agent.jpg",
  },
  {
    name: "Clay Skills Showcase",
    tags: ["Infrastructure"],
    description:
      "A full Clay table for company enrichment and scoring, built end to end and walked through step by step.",
    loom: "https://www.loom.com/embed/2021e9d0abc34809b94251ba2cc30b7f",
    poster: "/images/looms/clay-skills-showcase.jpg",
  },
];

/* Kestrel is a one person GTM agency, run by Lirim. So nothing here
   speaks of founders in the plural or of a team: the work frees up one
   person, the outbound represents one brand, and the content engine is
   two voices, Lirim's and mine. */
const contributions: {
  title: string;
  text: string;
  note?: string;
  outcome: string[];
}[] = [
  {
    title: "Owning outcomes from day one",
    text: "Whatever you throw at me I learn it, apply it, and own the result. Full client pipelines, orchestrated end to end, so you stay focused on growing MRR.",
    outcome: [
      "Handling clients with zero handholding within 2 months.",
      "More time for you to focus on client acquisition, and capacity to handle clients increases without any quality drop.",
    ],
  },
  {
    title: "Outbound, representing Kestrel",
    text: "Finding and bringing in clients by being active on LinkedIn and running unconventional campaigns. 6 years of agency and freelance experience gets put to work here directly for Kestrel.",
    outcome: ["More clients for Kestrel, increasing its MRR."],
  },
  {
    title: "Inbound EGC",
    text: "Building an Employee Generated Content engine across your account and mine. Two voices instead of one, consistent value, attracting clients instead of chasing them. The flywheel that compounds over time.",
    note: "Learned how agencies like StackOptimise drive inbound this way and they even built a product around it, which says everything about how much it works.",
    outcome: [
      "More brand presence and value, thereby attracting clients inbound, also by scraping the engagers and creating an inbound pipeline.",
    ],
  },
];

/* ---------------- Sections ---------------- */

export function Hero() {
  return (
    <Frame>
      <Card className="flex flex-col gap-7 p-8 sm:p-11">
        {/* A portrait, not an avatar. The shot is full length on their
            own blue, so a circle would crop it to nothing; a 4:5 tile
            keeps the frame and lets the brand colour sit in the page. */}
        <div className="flex items-center gap-5">
          <div className="h-[116px] w-[93px] shrink-0 overflow-hidden rounded-[14px] bg-ks-primary sm:h-[132px] sm:w-[106px]">
            <Image
              src="/images/kestrel_dp.png"
              alt="Vivek M"
              width={212}
              height={264}
              className="h-full w-full object-cover object-[50%_12%]"
              priority
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium text-ks-ink">Vivek M</p>
            <p className="text-base text-ks-primary">
              GTM Engineer Application (Junior GTM-E)
            </p>
          </div>
        </div>

        <div className="flex max-w-full flex-col gap-3 md:max-w-[88%]">
          <h1 className="text-[24px] font-normal leading-[1.25] tracking-[-0.02em] text-ks-ink sm:text-2xl">
            I did not want to apply empty handed. So I built an ICP doc +
            lead list for Tightrope.
          </h1>
          <p className="text-md text-ks-body">
            Signal-scored list of 40 property management companies in an
            active buying window. 9 signals checked. 2 hot-tier accounts. 18
            decision-makers, 13 verified emails, ready for outreach today.
          </p>
        </div>

        {/* The walkthrough sits right under the claim it proves, video
            beside its write up: an invitation to watch, not a slab that
            pushes everything else down. A hairline separates the project
            from the pitch above it. */}
        <div className="grid gap-6 border-t border-ks-line pt-7 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:items-start md:gap-7">
          <LoomPlayer
            src={TIGHTROPE.loom}
            poster={TIGHTROPE.poster}
            title={`${TIGHTROPE.name} walkthrough`}
            priority
            sizes="(max-width: 768px) 100vw, 320px"
          />

          <div className="flex flex-col gap-4">
            <h3 className="text-md font-medium leading-[1.35] text-ks-ink">
              {TIGHTROPE.name}
            </h3>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium uppercase tracking-[0.04em] text-ks-muted">
                Description
              </p>
              <p className="text-base leading-[1.6] text-ks-body">
                {TIGHTROPE.description}
              </p>
            </div>
            {/* The proof, so full ink, the same as every Outcome on the
                page. */}
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium uppercase tracking-[0.04em] text-ks-muted">
                Outcome
              </p>
              <p className="text-base leading-[1.6] text-ks-ink">
                {TIGHTROPE.outcome}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Frame>
  );
}

/* One project per row, video left, words right. In a row each poster
   is a thumbnail beside its description, which is what a reviewer
   actually reads first, rather than five posters shouting at once. */
export function Projects() {
  return (
    <Panel
      id="projects"
      heading={
        <SectionHeading
          label="Everything else."
          title="More systems I have built"
        />
      }
    >
      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <article
            key={project.name}
            className="flex flex-col gap-4 rounded-[20px] border-l-[3px] border-ks-primary bg-white p-4 md:grid md:grid-cols-[minmax(0,248px)_minmax(0,1fr)] md:items-center md:gap-6 md:p-5"
          >
            <LoomPlayer
              src={project.loom}
              poster={project.poster}
              title={`${project.name} walkthrough`}
              sizes="(max-width: 768px) 100vw, 248px"
              compact
            />
            <div className="flex flex-col gap-4 px-1 pb-1 md:p-0">
              <div className="flex flex-col gap-2">
                <h3 className="text-md font-medium leading-[1.35] text-ks-ink">
                  {project.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
              <p className="text-base leading-[1.6] text-ks-body">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

/* Numbered rows rather than three columns: each point is a short
   paragraph plus an outcome, and columns at this width would squeeze
   every one into a narrow, tall block. Rows read like a plan. */
export function Contribution() {
  return (
    <Panel
      id="contribution"
      heading={
        <SectionHeading
          label="Once I'm in."
          title="Where I wish to contribute"
        />
      }
    >
      <ol className="flex flex-col gap-3">
        {contributions.map((item, i) => (
          <li
            key={item.title}
            className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 rounded-[20px] bg-white p-5 sm:grid-cols-[36px_minmax(0,1fr)] sm:gap-x-4 sm:p-6"
          >
            <span className="pt-px text-base font-medium tabular-nums text-ks-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-md font-medium leading-[1.4] text-ks-ink">
                {item.title}
              </h3>
              <p className="max-w-[62ch] text-base leading-[1.65] text-ks-body">
                {item.text}
              </p>
              {item.note ? (
                <p className="mt-1.5 max-w-[62ch] text-base italic leading-[1.65] text-ks-muted">
                  {item.note}
                </p>
              ) : null}

              <div className="mt-3 flex flex-col gap-1 border-t border-ks-line pt-3">
                <p className="text-sm font-medium uppercase tracking-[0.04em] text-ks-muted">
                  Outcome
                </p>
                <div className="flex flex-col gap-1.5">
                  {item.outcome.map((line) => (
                    <p
                      key={line}
                      className="max-w-[62ch] text-base leading-[1.65] text-ks-ink"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

/* Straight to the story, not the top: the main page runs from video
   editing through to GTM engineering, so landing there means reading
   it in order. */
export function BackgroundLink() {
  return (
    <Frame>
      <Card className="flex items-center justify-center px-8 py-8 text-center sm:px-11">
        <Button
          href="https://www.notsovivek.fyi/#story"
          external
          variant="quiet"
        >
          My full background is here
          <span aria-hidden="true">&rarr;</span>
        </Button>
      </Card>
    </Frame>
  );
}

export function Contact() {
  return (
    <div id="contact" className="scroll-mt-8">
      <Frame>
        <Card className="flex flex-col items-center gap-7 px-8 py-14 text-center sm:px-11 sm:py-16">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-ks-ink sm:text-2xl">
              Let&apos;s talk
            </h2>
            <p className="max-w-[44ch] text-base text-ks-body">
              Happy to jump on a call, answer questions, or just start with a
              message.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Button href="https://www.linkedin.com/in/vivek-m12/" external>
              Message on LinkedIn
            </Button>
            <Button href="mailto:purayathvivek@gmail.com" variant="secondary">
              Send an email
            </Button>
          </div>
        </Card>
      </Frame>
    </div>
  );
}
