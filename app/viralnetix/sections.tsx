import type { ReactNode } from "react";
import Image from "next/image";
import LoomPlayer from "./LoomPlayer";

/* ==================================================================
   Viralnetix application page.

   Built on the main page's system, not a variation of it. Same frame
   and card, same 22/20/12px radii, same padding (32px, 44px from sm),
   the same 20px gap between blocks, and the same type scale:

     section label   14 regular, brand colour
     section title   18 medium
     body            14 regular, 16 for the hero subtext only
     hero headline   24 / 26 regular

   Only the palette changes, and it is namespaced under `vn` in the
   Tailwind config so this page cannot restyle the portfolio.

   Kept self contained in the route folder rather than reusing the
   shared Primitives, because those are hardwired to the portfolio's
   colours. Copying this folder is how the next company page starts.
   ================================================================== */

/* ---------------- Primitives, VN skin ---------------- */

function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[22px] bg-vn-frame p-0.5 ${className}`}
    >
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

/* Grey panel with the heading sitting on it and white tiles inside,
   the same structure as the main page's "What I focus on" block.

   The heading is inset a further 14px so its left edge lands exactly
   where text starts inside every card above and below it (2px frame
   plus 32px card padding, 44px from sm). The tiles keep the panel's
   own padding, so they stay as wide as they can be. */
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
      className="flex scroll-mt-8 flex-col gap-8 rounded-[22px] bg-vn-frame px-5 pb-5 pt-9 sm:gap-9 sm:px-8 sm:pb-8 sm:pt-[50px]"
    >
      <div className="px-3.5">{heading}</div>
      {children}
    </div>
  );
}

/* Identical to the main page's SectionHeading: 14 / 18 / 14 with 6px
   between. The size step does the separating. The label takes the
   brand colour, which is the one change a company page is allowed. */
function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label ? <p className="text-base text-vn-primary">{label}</p> : null}
      <h2 className="text-lg font-medium text-vn-ink">{title}</h2>
      {subtitle ? (
        <p className="max-w-[56ch] text-base text-vn-body">{subtitle}</p>
      ) : null}
    </div>
  );
}

/* Same geometry as .pf-btn: 40px tall, 20px side padding, 12px radius,
   14px medium. Primary in brand purple, secondary white on a hairline. */
function Button({
  href,
  children,
  external = false,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "primary" | "secondary";
}) {
  const skin =
    variant === "primary"
      ? "bg-vn-primary text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_1px_2px_rgba(26,26,26,0.08),0_6px_16px_-6px_rgba(123,45,139,0.45)] hover:bg-vn-primary-deep"
      : "bg-white text-vn-ink shadow-[inset_0_2px_2px_#FFFFFF,0_0_0_1px_#EBDCEF,0_6px_6px_-3px_rgba(41,41,41,0.04),0_12px_12px_-6px_rgba(41,41,41,0.04)] hover:shadow-[inset_0_2px_2px_#FFFFFF,0_0_0_1px_#D9C3DF,0_8px_8px_-3px_rgba(41,41,41,0.05),0_16px_16px_-6px_rgba(41,41,41,0.06)]";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-[12px] px-5 text-base font-medium outline-none transition-[background-color,box-shadow] duration-200 ease-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vn-primary active:scale-[0.98] sm:w-auto ${skin}`}
    >
      {children}
    </a>
  );
}

/* ---------------- Content ---------------- */

type Status = "match" | "developing";

const assessment: {
  requirement: string;
  position: string;
  status: Status;
}[] = [
  {
    requirement: "1-2 years Sales, GTM, RevOps experience",
    position:
      "No formal GTM title yet. But 6 years of client acquisition through outbound at GrowthBae. Looking for junior role, with extreme hunger to prove and own outcomes in 2-3 months.",
    status: "match",
  },
  {
    requirement: "Strong understanding of B2B sales funnels",
    position:
      "Yes I do understand and can converse with confidence. ICP research, signal detection, list building, enrichment, sequencing, campaign execution.",
    status: "match",
  },
  {
    requirement: "Clay, Instantly, HeyReach, Apollo experience",
    position:
      "Clay projects built end to end. Apollo and HeyReach used hands on. Instantly familiar. Deepline and Claude Code as additional stack.",
    status: "match",
  },
  {
    requirement: "Everything is figureoutable mindset",
    position:
      "This is my natural state. Every skill I have was learned by saying yes before knowing how.",
    status: "match",
  },
  {
    requirement: "Copywriting skills",
    position:
      "Actively developing. Six years of manual outbound messaging behind it. Write all outreach angles by hand first. AI sharpens, not replaces.",
    status: "developing",
  },
  {
    requirement: "n8n, Zapier, or Make",
    position:
      "Familiar conceptually. Have not built with them yet. On the list. Always been a Claude Code enthusiast and builder, so this is the same muscle, I believe.",
    status: "developing",
  },
];

type Project = {
  name: string;
  tags: string[];
  /* One sentence. What the system does, not how it was built. */
  description: string;
  /* Optional: a walkthrough of a skill, rather than a system with a
     result, has no outcome to report. */
  outcome?: string;
  loom?: string;
  /* Loom's own poster frame, from their oEmbed endpoint. Hardcoded
     rather than fetched so the page stays fully static and the poster
     is in the HTML on first paint. Newer Looms only hand out signed
     thumbnail links that expire, so those are saved into
     public/images/looms and served from the site instead. */
  poster?: string;
};

/* Built for Viralnetix: their campaign, their site, their client. */
const vnProjects: Project[] = [
  {
    name: "Warm Signal Engine",
    tags: ["Infrastructure", "Execution"],
    description:
      "Viralnetix's cybersecurity campaign method, rebuilt on an open source stack of Apify, Python, Claude API and Deepline.",
    outcome: "40 raw engagers to 4 verified leads.",
    loom: "https://www.loom.com/embed/416ea66b152341a1be9831d7dd3973c4",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/416ea66b152341a1be9831d7dd3973c4-839f46d30f07eda4.jpg",
  },
  {
    name: "Inbound Intelligence Agent",
    tags: ["Automation", "Intelligence"],
    description:
      "Researches every company that books a call on the Viralnetix site and sends a brief to Slack before the call.",
    outcome:
      "Tested on Adacta and Vanta. Output named real customers, specific traction data, and a pilot campaign idea. Response time under 25 seconds.",
    loom: "https://www.loom.com/embed/24009c3a33ef4ef195811aaffc50adda",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/24009c3a33ef4ef195811aaffc50adda-924e826af7865e86.jpg",
  },
  {
    name: "Adacta Client Expansion System",
    tags: ["Intelligence", "Infrastructure"],
    description:
      "Finds lookalike European insurers with live buying signals, seeded from Adacta's closed won customers.",
    outcome:
      "10 ranked lookalike European insurers. NURNBERGER ranked first, with a new CIO who joined 6 days before detection. SIGNAL IDUNA Romania flagged as a land and expand opportunity.",
    loom: "https://www.loom.com/embed/cf390641fb2a4c3eb62f77312be2b253",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/cf390641fb2a4c3eb62f77312be2b253-b17e2a50c405437e.jpg",
  },
];

/* Not built for Viralnetix. Here to show range in GTM thinking. */
const showcaseProjects: Project[] = [
  {
    name: "Engagement to Inbound Pipeline",
    tags: ["Intelligence", "Automation"],
    description:
      "Turns people engaging with GTM content on LinkedIn into a qualified client pipeline for GTM agencies.",
    outcome:
      "Post content. Agent finds the buyers. Engagers matched to the ICP, enriched, and pushed to Slack with the exact message to send.",
    loom: "https://www.loom.com/embed/795484d9f1b8440a9899f207bd448008",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/795484d9f1b8440a9899f207bd448008-091af5b5a844764c.jpg",
  },
  {
    name: "Vanta Active Buying Window Detection",
    tags: ["Intelligence", "Infrastructure"],
    description:
      "Finds fintech and healthcare SaaS companies in an active buying window for Vanta, scored on 7 signals.",
    outcome:
      "106 companies sourced, 67 passed the ICP filter, 10 hotlisted. Papaya Global ranked first with 5 signals firing. 8 of 10 emails found, all MX safe.",
    loom: "https://www.loom.com/embed/de57bc9394ad4214851fe43ba0346c65",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/de57bc9394ad4214851fe43ba0346c65-b4439463d61d1836.jpg",
  },
  {
    name: "Clay Skills Showcase",
    tags: ["Infrastructure", "Intelligence"],
    description:
      "A full Clay table for company enrichment and scoring, built end to end and walked through step by step.",
    loom: "https://www.loom.com/embed/2021e9d0abc34809b94251ba2cc30b7f",
    poster: "/images/looms/clay-skills-showcase.jpg",
  },
];

/* ---------------- Pieces ---------------- */

function StatusMark({ status }: { status: Status }) {
  if (status === "match") {
    return (
      <span
        title="Strong match"
        className="mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1E7F4A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 12.5 9.5 18 20 6.5" />
        </svg>
        <span className="sr-only">Strong match</span>
      </span>
    );
  }

  return (
    <span
      title="Developing"
      className="mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center"
    >
      <span className="h-[7px] w-[7px] rounded-full bg-vn-developing" />
      <span className="sr-only">Developing</span>
    </span>
  );
}

/* Label and text, the main page's Eyebrow over body copy. */
function ProjectBlock({
  label,
  children,
  lead = false,
}: {
  label: string;
  children: ReactNode;
  lead?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium uppercase tracking-[0.04em] text-vn-muted">
        {label}
      </p>
      {/* The outcome is the proof, so it takes full ink. Colour alone,
          not weight: the main page never bolds body copy. */}
      <p
        className={`text-base leading-[1.6] ${
          lead ? "text-vn-ink" : "text-vn-body"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

/* A white tile on the panel, like the focus tiles on the main page.

   Two shapes. "stack" is video over text, used two to a row. "wide" is
   for a tile left alone on its row: it fills the full width, but lays
   out side by side so the video stays exactly the size of the videos
   above it instead of doubling.

   The wide tile's column gap is 12px (the gap between tiles) plus 20px
   of padding on each side. That puts its video under the left tile's
   video and its text under the right tile's text, edge for edge. */
function ProjectTile({
  project,
  priority,
  wide = false,
}: {
  project: Project;
  priority: boolean;
  wide?: boolean;
}) {
  return (
    <article
      className={`flex flex-col gap-5 rounded-[20px] bg-white p-4 sm:p-5 ${
        wide
          ? "md:col-span-2 md:grid md:grid-cols-2 md:items-center md:gap-x-[52px] md:gap-y-0"
          : ""
      }`}
    >
      <LoomPlayer
        src={project.loom}
        poster={project.poster}
        title={`${project.name} walkthrough`}
        priority={priority}
      />

      <div className="flex flex-col gap-4 px-1 pb-1">
        <div className="flex flex-col gap-2">
          <h3 className="text-md font-medium leading-[1.35] text-vn-ink">
            {project.name}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-vn-primary-soft px-2.5 py-1 text-sm leading-none text-vn-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <ProjectBlock label="Description">{project.description}</ProjectBlock>
        {project.outcome ? (
          <ProjectBlock label="Outcome" lead>
            {project.outcome}
          </ProjectBlock>
        ) : null}
      </div>
    </article>
  );
}

/* Two per row from md up, one per row on phones.

   Rows stretch, so the two tiles in a row are always exactly the same
   height and their bottom edges line up. On phones, where tiles stack,
   auto-rows-fr gives every tile the height of the tallest, so the
   stack reads as a set too. Not from md up: there it would pull the
   short wide tile up to the height of a stacked one. Copy is kept to a similar
   length across tiles so the stretch never leaves a large empty band.

   An odd count leaves the last tile alone on its row; it becomes the
   wide shape and fills the row. Add a project and the layout follows
   with no changes here. */
function ProjectGrid({
  projects,
  priorityCount = 0,
}: {
  projects: Project[];
  priorityCount?: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 max-md:auto-rows-fr md:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectTile
          key={project.name}
          project={project}
          priority={i < priorityCount}
          wide={projects.length % 2 === 1 && i === projects.length - 1}
        />
      ))}
    </div>
  );
}

/* ---------------- Sections ---------------- */

/* Same shape as the main page hero: identity row, headline, subtext,
   all inside one card at the standard padding, so the left edge of
   every block below lines up with it. */
export function Hero() {
  return (
    <Frame>
      <Card className="flex flex-col gap-7 p-8 sm:p-11">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-[72px] sm:w-[72px]">
            <Image
              src="/images/dp.jpg"
              alt="Vivek M"
              width={72}
              height={72}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-lg font-medium text-vn-ink">Vivek M</p>
            <p className="text-base text-vn-primary">
              GTM Engineer Application (Junior GTM-E)
            </p>
          </div>
        </div>

        <div className="flex max-w-full flex-col gap-3 md:max-w-[82%]">
          <h1 className="text-[24px] font-normal leading-[1.25] tracking-[-0.02em] text-vn-ink sm:text-2xl">
            I spent the last week building three projects for the role :) in
            context to Viralnetix.
          </h1>
          <p className="text-md text-vn-body">
            Saw Danilo&apos;s post about Ljubica. Did not want to show up empty
            handed.
          </p>
          {/* An instruction, not a claim, so it sits last and muted. */}
          <p className="text-base text-vn-muted">
            (Please scroll to the bottom to watch the loom)
          </p>
        </div>
      </Card>
    </Frame>
  );
}

export function WhyViralnetix() {
  return (
    <Frame>
      <Card className="flex flex-col gap-4 p-8 sm:p-11">
        <SectionHeading label="Why Viralnetix." title="The signal I acted on" />

        <p className="max-w-[62ch] text-base leading-[1.7] text-vn-body">
          I came across Danilo&apos;s post about Ljubica joining as the first
          GTM Engineer. Eight months later she ran a campaign that hit 8.9%
          reply rate and 81% positive replies. That story told me everything
          about how Viralnetix invests in people. I saw my own path in that. I
          wish to be a part of Viralnetix&apos;s growth journey and be a person
          with real outcomes for Viralnetix and your clientele.
        </p>

        {/* The line the whole page turns on, so it gets the only
            highlight on the page. */}
        <p className="text-base leading-[1.7] text-vn-ink">
          That was the <mark className="vn-highlight">signal detected</mark>{" "}
          that triggered my job application ;)
        </p>
      </Card>
    </Frame>
  );
}

export function Assessment() {
  return (
    <div id="fit" className="scroll-mt-8">
      <Frame>
        <Card className="flex flex-col gap-6 p-8 sm:p-11">
          <SectionHeading
            label="Where I stand."
            title="Honest assessment against your requirements (mentioned in the website)"
            subtitle="Four strong matches, two still developing."
          />

          <ul className="flex flex-col gap-0.5 overflow-hidden rounded-[12px]">
            {assessment.map((row) => (
              <li
                key={row.requirement}
                className="grid gap-x-8 gap-y-1.5 bg-vn-frame px-4 py-3.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:px-5"
              >
                <p className="text-base font-medium leading-[1.6] text-vn-ink">
                  {row.requirement}
                </p>
                <div className="flex gap-2.5">
                  <StatusMark status={row.status} />
                  <p className="text-base leading-[1.6] text-vn-body">
                    {row.position}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* A key, because a tick and a dot only mean something once
              the reader is told what they mean. */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2">
              <StatusMark status="match" />
              <span className="text-sm text-vn-muted">Strong match</span>
            </span>
            <span className="flex items-center gap-2">
              <StatusMark status="developing" />
              <span className="text-sm text-vn-muted">Developing</span>
            </span>
          </div>
        </Card>
      </Frame>
    </div>
  );
}

export function Projects() {
  return (
    <Panel
      id="projects"
      heading={
        <SectionHeading
          label="Built for Viralnetix."
          title="Three things I built for the role"
          subtitle="Each one is a working system, not a mockup. Walkthrough on each."
        />
      }
    >
      <ProjectGrid projects={vnProjects} priorityCount={2} />
    </Panel>
  );
}

export function Showcase() {
  return (
    <Panel
      id="showcase"
      heading={
        <SectionHeading
          label="GTM showcase."
          title="Three more things I built"
          subtitle="Here to show how I think about signals, scoring and pipeline."
        />
      }
    >
      <ProjectGrid projects={showcaseProjects} />
    </Panel>
  );
}

/* The step between the work and the ask. Points at #story rather than
   #background: the story runs from video editing through to GTM
   engineering, so landing there means reading it in order. */
export function FullBackgroundLink() {
  return (
    <Frame>
      <Card className="flex items-center justify-center px-8 py-9 text-center sm:px-11">
        <Button href="https://notsovivek.fyi/#story" external>
          My full background is here
          <span aria-hidden="true">&rarr;</span>
        </Button>
      </Card>
    </Frame>
  );
}

/* Same shape as the main page contact block: headline at the hero
   size, one line under it, a primary and a secondary button. */
export function Contact() {
  return (
    <div id="contact" className="scroll-mt-8">
      <Frame>
        <Card className="flex flex-col items-center gap-7 px-8 py-14 text-center sm:px-11 sm:py-16">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-vn-ink sm:text-2xl">
              Let&apos;s talk
            </h2>
            <p className="max-w-[44ch] text-base text-vn-body">
              Happy to jump on a call, answer questions, or just start with a
              message.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Button href="https://www.linkedin.com/in/vivek-m12" external>
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
