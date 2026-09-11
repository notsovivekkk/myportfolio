import type { ReactNode } from "react";

/* ==================================================================
   Viralnetix application page.

   Same design language as the portfolio: grey frame wrapping a white
   card, 22/20/12px radii, the same type scale, and the same 20px gap
   between blocks. Only the palette changes, and it is namespaced under
   `vn` in the Tailwind config so this page cannot restyle the
   portfolio.

   Spacing note: sections carry no vertical padding of their own. The
   page composes them in a flex column with one gap, so the rhythm is
   set in a single place and cannot drift section by section.

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
    /* The three levels were 12 / 20 / 14 at one weight apart, which is
       too close to lead the eye. Now 12 semibold / 22 semibold / 16
       regular: the size jump does the ranking and the weight drop at
       the subtitle marks where reading starts. */
    <div className="flex flex-col gap-2">
      {label ? (
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-vn-primary">
          {label}
        </p>
      ) : null}
      <h2 className="text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] text-vn-ink">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-[56ch] text-md leading-[1.6] text-vn-body">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Button({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[12px] bg-vn-primary px-5 text-base font-medium text-white shadow-[0_1px_2px_rgba(26,26,26,0.08),0_6px_16px_-6px_rgba(123,45,139,0.45)] outline-none transition-colors duration-200 ease-default hover:bg-vn-primary-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vn-primary sm:w-auto"
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

const projects: {
  name: string;
  tags: string[];
  description: string;
  process: string;
  outcome: string;
  loom?: string;
}[] = [
  {
    name: "Warm Signal Engine",
    tags: ["Infrastructure", "Execution"],
    description:
      "Studied Viralnetix's cybersecurity campaign breakdown on YouTube. Rebuilt the same methodology using Apify, Python, Claude API, and Deepline instead of Trigify and Clay. Same philosophy. Open source stack.",
    process:
      "Scraped LinkedIn post reactions from a top cybersecurity influencer using Apify. Classified 40 engagers as partner or direct buyer using Claude API. Enriched top prospects via Deepline harvestapi. Re-scored with real company context. Found verified emails via findymail waterfall.",
    outcome: "40 raw engagers to 4 verified leads.",
    loom: "https://www.loom.com/embed/416ea66b152341a1be9831d7dd3973c4",
  },
  {
    name: "Inbound Intelligence Agent",
    tags: ["Automation", "Intelligence"],
    description:
      "Every time someone books a call on the Viralnetix site this agent fires automatically. It researches the company from the work email domain and delivers a company brief to Slack before the call. Eliminates manual pre-call research entirely.",
    process:
      "Work email entered on a form matching Viralnetix's exact design. Agent extracts domain. Deepline enriches company. Exa runs four parallel searches for product, customers, traction, and GTM motion. Claude writes a structured brief. PDF delivered to Slack in under 25 seconds.",
    outcome:
      "Tested on Adacta and Vanta. Output named real customers, specific traction data, and a pilot campaign idea. Response time under 25 seconds.",
    loom: "https://www.loom.com/embed/24009c3a33ef4ef195811aaffc50adda",
  },
  {
    name: "Adacta Client Expansion System",
    tags: ["Intelligence", "Infrastructure"],
    description:
      "Built client expansion project for Adacta. Seed from Adacta's existing close won customers. Find lookalike European insurers showing active buying signals. Output a ranked hotlist with verified contacts and signal specific messaging angles.",
    process:
      "Five confirmed close won customers used as seeds. DiscoLike through Deepline finds lookalike companies. Signal layer checks for new CIO hired, tech hiring spike, modernisation announcements, regulatory deadlines. Top 3 enriched with decision maker, verified email, MX check, and messaging angle.",
    outcome:
      "10 ranked lookalike European insurers. NURNBERGER ranked first. New CIO Markus Svanda joined 6 days before detection. Email found and MX safe. SIGNAL IDUNA Romania flagged as land and expand opportunity, same group as existing Adacta customer.",
    loom: "https://www.loom.com/embed/cf390641fb2a4c3eb62f77312be2b253",
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

/* Loom slot.

   The ratio is Loom's own, taken from the padding-bottom in their embed
   snippet. It is 64.86%, not 16:9, because Loom sizes the frame to the
   recording rather than to video convention. Using aspect-video here
   would letterbox every one of them.

   The placeholder carries the same ratio, so a card is exactly as tall
   before a video is added as after, and nothing below it moves. */
const LOOM_RATIO = "100 / 64.86161251504213";

function LoomEmbed({ src, title }: { src?: string; title: string }) {
  if (!src) {
    return (
      <div
        style={{ aspectRatio: LOOM_RATIO }}
        className="flex w-full items-center justify-center rounded-[12px] border border-dashed border-vn-line bg-vn-frame"
      >
        <span className="text-base text-vn-muted">Loom embed here</span>
      </div>
    );
  }

  return (
    <div
      style={{ aspectRatio: LOOM_RATIO }}
      className="w-full overflow-hidden rounded-[12px] bg-vn-frame"
    >
      {/* lazy because three video frames on one page is three network
          conversations nobody has asked for until they scroll. */}
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        allow="fullscreen; picture-in-picture"
        className="h-full w-full border-0"
      />
    </div>
  );
}

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
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-vn-muted">
        {label}
      </p>
      {/* The outcome is the proof, so it is the one block in the card
          set in full ink. Description and process are context and stay a
          step back, which means a reader skimming for results finds them
          without reading the rest. */}
      <p
        className={`text-md leading-[1.65] ${
          lead ? "font-medium text-vn-ink" : "text-vn-body"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

/* ---------------- Sections ---------------- */

export function Hero() {
  return (
    <section className="pb-9 pt-8 sm:pb-11 sm:pt-10">
      {/* Company mark, deliberately quiet. This is his page about them,
          not a page pretending to be theirs. */}
      <div className="flex items-center gap-2.5">
        <span className="h-6 w-6 rounded-[7px] bg-vn-primary" />
        <span className="text-md font-medium tracking-[-0.01em] text-vn-ink">
          Viralnetix
        </span>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:mt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-vn-primary">
          GTM Engineer Application (Junior GTM-E)
        </p>
        {/* Headline and its note are grouped at a tighter 8px so the
            aside reads as belonging to the headline rather than as a
            third stacked line competing with the subtext below. */}
        <div className="flex flex-col gap-2">
          <h1 className="max-w-[26ch] text-[28px] font-medium leading-[1.15] tracking-[-0.022em] text-vn-ink sm:text-[32px]">
            I spent the last week building three projects for the role :) in
            context to Viralnetix.
          </h1>
          {/* Muted and a size down: it is an instruction, not a claim,
              so it should not carry the weight of the sentence above. */}
          <p className="text-md leading-[1.6] text-vn-muted">
            (Please scroll to the bottom to watch the loom)
          </p>
        </div>

        <p className="max-w-[52ch] text-md leading-[1.65] text-vn-body">
          Saw Danilo&apos;s post about Ljubica. Did not want to show up empty
          handed.
        </p>
      </div>
    </section>
  );
}

export function WhyViralnetix() {
  return (
    <Frame>
      <Card className="flex flex-col gap-6 p-8 sm:p-11">
        <SectionHeading title="Why Viralnetix" />

        <p className="max-w-[64ch] text-md leading-[1.75] text-vn-body">
          I came across Danilo&apos;s post about Ljubica joining as the first
          GTM Engineer. Eight months later she ran a campaign that hit 8.9%
          reply rate and 81% positive replies. That story told me everything
          about how Viralnetix invests in people. I saw my own path in that. I
          wish to be a part of Viralnetix&apos;s growth journey and be a person
          with real outcomes for Viralnetix and your clientele.
        </p>

        {/* The line the whole page turns on, so it gets the only
            highlight on the page. */}
        <p className="text-md leading-[1.75] text-vn-ink">
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
        <Card className="flex flex-col gap-7 p-8 sm:p-11">
          <SectionHeading
            label="Where I stand against the role"
            title="Honest assessment against your requirements (mentioned in the website)"
            subtitle="Four strong matches, two still developing."
          />

          <ul className="flex flex-col gap-0.5 overflow-hidden rounded-[12px]">
            {assessment.map((row) => (
              <li
                key={row.requirement}
                /* The purple rule is a left border on each row rather than
                   a table gridline, so the eye tracks down one edge
                   instead of reading a grid. */
                className="grid gap-x-8 gap-y-2 border-l-2 border-vn-primary/35 bg-vn-frame/60 py-4 pl-5 pr-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
              >
                {/* The requirement is their words, so it carries the
                    weight and the darkest ink: it is the thing a reader
                    is scanning for. The answer sits a weight below. */}
                <p className="text-md font-semibold leading-[1.5] text-vn-ink">
                  {row.requirement}
                </p>
                <div className="flex gap-2.5">
                  <StatusMark status={row.status} />
                  <p className="text-md leading-[1.6] text-vn-body">
                    {row.position}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* A key, because a green tick and an amber dot only mean
              something if the reader is told what they mean. */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-2">
              <StatusMark status="match" />
              <span className="text-base text-vn-muted">Strong match</span>
            </span>
            <span className="flex items-center gap-2">
              <StatusMark status="developing" />
              <span className="text-base text-vn-muted">Developing</span>
            </span>
          </div>
        </Card>
      </Frame>
    </div>
  );
}

export function Projects() {
  return (
    <div id="projects" className="flex scroll-mt-8 flex-col gap-5">
      <div className="px-1 pt-3 sm:px-2">
        <SectionHeading
          label="Three Projects"
          title="Three things I built for Viralnetix"
          subtitle="Each one is a working system, not a mockup. Walkthrough on each."
        />
      </div>

      {projects.map((project, i) => (
        <Frame key={project.name}>
          <Card className="flex flex-col gap-6 border-l-[3px] border-vn-primary p-8 sm:p-11">
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline gap-3">
                {/* Numbered in the brand colour so a skimmer registers
                    that there are three of these, not one long block. */}
                <span className="text-md font-semibold tabular-nums text-vn-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] text-vn-ink">
                  {project.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-vn-primary-soft px-3 py-1 text-sm font-semibold uppercase tracking-[0.04em] text-vn-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <ProjectBlock label="Description">
                {project.description}
              </ProjectBlock>
              <ProjectBlock label="Process">{project.process}</ProjectBlock>
              <ProjectBlock label="Outcome" lead>
                {project.outcome}
              </ProjectBlock>
            </div>

            <LoomEmbed
              src={project.loom}
              title={`${project.name} walkthrough`}
            />
          </Card>
        </Frame>
      ))}
    </div>
  );
}

/* The step between the work and the ask, in the same card and the same
   button as everything else on the page. It was a bare text link first
   and read as a footnote, which is the wrong weight for the one place
   the reader can go and check the claims.

   Points at #story rather than #background: the story runs from video
   editing through to GTM engineering, so landing there means reading it
   in order instead of arriving halfway through. */
export function FullBackgroundLink() {
  return (
    <Frame>
      <Card className="flex items-center justify-center px-8 py-9 text-center sm:px-11 sm:py-10">
        <Button href="https://notsovivek.fyi/#story" external>
          My full background is here
          {/* Hidden from assistive tech so the accessible name stays a
              sentence rather than ending in "right arrow". */}
          <span aria-hidden="true">&rarr;</span>
        </Button>
      </Card>
    </Frame>
  );
}

export function Contact() {
  return (
    <div id="contact" className="scroll-mt-8 pt-3">
      <Frame>
        <Card className="flex flex-col items-center gap-6 px-8 py-12 text-center sm:px-11 sm:py-14">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-[28px] font-medium leading-[1.15] tracking-[-0.022em] text-vn-ink sm:text-[32px]">
              Let&apos;s talk
            </h2>
            <p className="max-w-[46ch] text-md leading-[1.65] text-vn-body">
              Happy to jump on a call, answer questions, or just start with a
              message.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Button href="https://www.linkedin.com/in/vivek-m12" external>
              Message on LinkedIn
            </Button>
            <Button href="mailto:purayathvivek@gmail.com">Send an email</Button>
          </div>
        </Card>
      </Frame>
    </div>
  );
}
