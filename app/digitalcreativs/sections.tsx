import type { ReactNode } from "react";
import Image from "next/image";
import LoomPlayer from "./LoomPlayer";

/* ==================================================================
   Digital Creativs application page.

   Same system as the main portfolio and the Viralnetix page: grey
   frame wrapping a white card, 22/20/12px radii, 32px card padding
   (44px from sm), 20px between blocks, and the same type scale:

     section label   14 regular, brand voice
     section title   18 medium
     body            14 regular, 16 for the hero subtext only
     hero headline   24 / 26 regular

   Only the palette changes. Digital Creativs' brand is a yellow
   (#FFCC00) that cannot carry white text, so the rule on this page is:
   yellow is a FILL, always under near black type, and the brand speaks
   in text through `dc-deep`, a dark amber that clears AA on white.
   ================================================================== */

/* ---------------- Primitives, DC skin ---------------- */

function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[22px] bg-dc-frame p-0.5 ${className}`}
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

/* Grey panel with the heading on it and white tiles inside. The
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
      className="flex scroll-mt-8 flex-col gap-8 rounded-[22px] bg-dc-frame px-5 pb-5 pt-9 sm:gap-9 sm:px-8 sm:pb-8 sm:pt-[50px]"
    >
      <div className="px-3.5">{heading}</div>
      {children}
    </div>
  );
}

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
      {label ? <p className="text-base text-dc-deep">{label}</p> : null}
      <h2 className="text-lg font-medium text-dc-ink">{title}</h2>
      {subtitle ? (
        <p className="max-w-[56ch] text-base text-dc-body">{subtitle}</p>
      ) : null}
    </div>
  );
}

/* 40px tall, 20px sides, 12px radius, 14px medium, as everywhere else.
   Solid is brand yellow under near black text. Outline is the same
   shape drawn in the brand instead of filled with it. */
function Button({
  href,
  children,
  external = false,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "solid" | "outline" | "quiet";
}) {
  const skin = {
    solid:
      "bg-dc-primary text-dc-ink shadow-[0_1px_2px_rgba(20,20,20,0.08),0_6px_16px_-6px_rgba(255,204,0,0.75)] hover:bg-dc-hover",
    outline:
      "bg-white text-dc-ink shadow-[inset_0_0_0_1.5px_#FFCC00] hover:bg-dc-soft",
    /* A hairline, no fill. Present enough to be pressed, quiet enough
       not to compete with the two buttons that close the page. */
    quiet:
      "bg-white text-dc-body shadow-[inset_0_0_0_1px_#F0E5C2] hover:text-dc-ink hover:shadow-[inset_0_0_0_1px_#FFCC00]",
  }[variant];

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-[12px] px-5 text-base font-medium outline-none transition-[background-color,box-shadow] duration-200 ease-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dc-deep active:scale-[0.98] sm:w-auto ${skin}`}
    >
      {children}
    </a>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-dc-soft px-2.5 py-1 text-sm leading-none text-dc-deep">
      {children}
    </span>
  );
}

/* ---------------- Content ---------------- */

type Project = {
  name: string;
  tags: string[];
  description: string;
  loom: string;
  poster: string;
};

const featured: Project = {
  name: "Label Match Signal Engine",
  tags: ["Intelligence", "Infrastructure"],
  description:
    "Studied Digital Creativs' Label Match campaign. Rebuilt the same signal-based methodology using Claude Code, Deepline, and AI Ark. 50 ICP-qualified craft beverage companies scored across 9 signals. Two segments: expanding US brands and international brands entering the US market.",
  loom: "https://www.loom.com/embed/31a10536a6224f23b920cd3df4fe8841",
  poster: "/images/looms/label-match.jpg",
};

/* The output itself, as a sheet anyone can open without a Clay seat. */
const LIST_URL =
  "https://docs.google.com/spreadsheets/d/1goVu-YnupBbKI9oymaNZtbUFCELHROlRJQ2QgcdljIo/edit?usp=sharing";

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

const expectations: {
  title: string;
  text: string;
  icon: ReactNode;
}[] = [
  {
    title: "Stacking wins in your Slack channel",
    text: "I want to be the person adding to the wins channel, not the one waiting to be told what to do.",
    icon: (
      <>
        <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
        <path d="M7 5H4v1a4 4 0 0 0 3 3.9M17 5h3v1a4 4 0 0 1-3 3.9" />
        <path d="M12 14v3m-3 3h6l-.5-3h-5L9 20Z" />
      </>
    ),
  },
  {
    title: "No more SOP worries",
    text: "I document everything I build. Every system, every logic, every decision.",
    icon: (
      <>
        <path d="M6 3h8l4 4v14H6V3Z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6M9 16h6" />
      </>
    ),
  },
  {
    title: "Full ownership",
    text: "Not overconfident. I will make mistakes. But I will own them, ask questions to fix them fast, and never leave something half-done.",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </>
    ),
  },
];

/* ---------------- Pieces ---------------- */

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-md font-medium leading-[1.35] text-dc-ink">
          {project.name}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      <p className="text-base leading-[1.6] text-dc-body">
        {project.description}
      </p>
    </div>
  );
}

/* ---------------- Sections ---------------- */

export function Hero() {
  return (
    <Frame>
      <Card className="flex flex-col gap-7 p-8 sm:p-11">
        {/* A portrait, not an avatar. The shot is full length on their
            own yellow, so a circle would crop it to nothing; a 4:5 tile
            keeps the frame and lets the brand colour sit in the page
            without being painted on. */}
        <div className="flex items-center gap-5">
          <div className="h-[116px] w-[93px] shrink-0 overflow-hidden rounded-[14px] bg-dc-primary sm:h-[132px] sm:w-[106px]">
            <Image
              src="/images/dc_dp.png"
              alt="Vivek M"
              width={212}
              height={264}
              className="h-full w-full object-cover object-[50%_12%]"
              priority
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium text-dc-ink">Vivek M</p>
            <p className="text-base text-dc-deep">
              GTM Engineer Application (Junior GTM-E)
            </p>
            <p className="max-w-[40ch] text-base italic text-dc-muted">
              Already LinkedIn, DC styled headshot ready, lol.
            </p>
          </div>
        </div>

        {/* The opening. Quotation marks do the work, so the words are
            marked as someone else's without a rule or a tint around
            them. The opening mark is pulled into the left margin so the
            first letter still lines up with everything below it. */}
        <figure className="flex flex-col gap-2.5">
          <blockquote className="max-w-[46ch] text-[20px] font-normal leading-[1.45] tracking-[-0.015em] text-dc-ink sm:text-[22px]">
            <span aria-hidden="true" className="-ml-[0.45em]">
              &ldquo;
            </span>
            You can&apos;t build something great on top of people. You have to
            build it with them.&rdquo;
          </blockquote>
          <figcaption className="text-base text-dc-body">
            It stuck with me and I wish to work with people who believe in
            the same :)
          </figcaption>
        </figure>

        <div className="flex max-w-full flex-col gap-3 md:max-w-[88%]">
          <h1 className="text-[24px] font-normal leading-[1.25] tracking-[-0.02em] text-dc-ink sm:text-2xl">
            I did not want to apply empty handed. So I rebuilt your Label
            Match campaign.
          </h1>
          <p className="text-md text-dc-body">
            Signal-scored list of 50 craft beverage companies in an active
            buying window. 9 signals checked. 14 hot-tier accounts. 10 contacts
            ready for outreach today.
          </p>
        </div>
      </Card>
    </Frame>
  );
}

/* The featured project. Given the room the other five do not get: its
   own card rather than a tile on a panel, a full width video, and the
   name at section size, so it reads as the reason the page exists. */
export function Featured() {
  return (
    <div id="label-match" className="scroll-mt-8">
      <Frame>
        {/* The 3px accent rule eats into the padding, so the left
            padding is 3px short to compensate. Without it this card's
            heading sits 3px right of every other heading on the page. */}
        <Card className="flex flex-col gap-6 border-l-[3px] border-dc-primary p-8 pl-[29px] sm:p-11 sm:pl-[41px]">
          <SectionHeading
            label="The project."
            title="Built specifically for Digital Creativs"
          />

          {/* Side by side, so the video is an invitation rather than a
              slab. Full width it was the loudest thing on the page and
              pushed the description and the workbook link off screen. */}
          <div className="grid gap-6 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:items-start md:gap-7">
            <LoomPlayer
              src={featured.loom}
              poster={featured.poster}
              title={`${featured.name} walkthrough`}
              priority
              sizes="(max-width: 768px) 100vw, 320px"
            />

            <div className="flex flex-col gap-5">
              <ProjectMeta project={featured} />
              <div className="flex">
                <Button href={LIST_URL} external variant="outline">
                  Here is the list
                  <span aria-hidden="true">&rarr;</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Frame>
    </div>
  );
}

/* One project per row, video left, words right, the same shape as the
   featured card above. Two to a row made five video posters the loudest
   thing on the page; in a row each poster is a thumbnail beside its
   description, which is what a reviewer actually reads first. */
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
            className="flex flex-col gap-4 rounded-[20px] border-l-[3px] border-dc-primary bg-white p-4 md:grid md:grid-cols-[minmax(0,248px)_minmax(0,1fr)] md:items-center md:gap-6 md:p-5"
          >
            <LoomPlayer
              src={project.loom}
              poster={project.poster}
              title={`${project.name} walkthrough`}
              sizes="(max-width: 768px) 100vw, 248px"
              compact
            />
            <div className="px-1 pb-1 md:p-0">
              <ProjectMeta project={project} />
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}

export function Expectations() {
  return (
    <Panel
      heading={
        <SectionHeading title="Working together" />
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {expectations.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-3 rounded-[20px] bg-white p-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-dc-soft">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#141414"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
            </span>
            <h3 className="text-base font-medium leading-[1.4] text-dc-ink">
              {item.title}
            </h3>
            <p className="text-base leading-[1.6] text-dc-body">{item.text}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* A line, not a button. The buttons on this page are for the two things
   worth doing at the end; this is an aside for anyone who wants more. */
export function BackgroundLink() {
  return (
    <Frame>
      <Card className="flex items-center justify-center px-8 py-8 text-center sm:px-11">
        {/* Straight to the story, not the top: the main page runs from
            video editing through to GTM engineering, so landing there
            means reading it in order. */}
        <Button href="https://www.notsovivek.fyi/#story" external variant="quiet">
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
            <h2 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-dc-ink sm:text-2xl">
              Let&apos;s talk
            </h2>
            <p className="max-w-[44ch] text-base text-dc-body">
              Happy to jump on a call, answer questions, or just start with a
              message.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Button href="https://www.linkedin.com/in/vivek-m12/" external>
              Message on LinkedIn
            </Button>
            <Button href="mailto:purayathvivek@gmail.com">Send an email</Button>
          </div>
        </Card>
      </Frame>
    </div>
  );
}
