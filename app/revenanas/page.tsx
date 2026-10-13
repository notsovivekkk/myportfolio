import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { Frame, Card, Button as SiteButton } from "@/components/ui/Primitives";
import IcpGateAnimation from "@/components/ui/IcpGateAnimation";
import IcpGateVideo from "@/components/ui/IcpGateVideo";
import IcpGateCard, { ReadMoreHint } from "@/components/ui/IcpGateCard";
import LoomPlayer from "./LoomPlayer";
import VersionSwitch, { type Version } from "./VersionSwitch";

/* Same rule as /projects: a clip at public/videos/icp-gate.mp4 replaces
   the illustration on the next build. */
const hasIcpGateVideo = existsSync(
  path.join(process.cwd(), "public/videos/icp-gate.mp4")
);

export const metadata: Metadata = {
  title: "Vivek M, application to Revenanas",
  description:
    "Kasada: 1,335 messy rows to 10 accounts reps can work today.",
  /* Noindex on purpose. This is written for one company, and a targeted
     application page turning up in search results for other people is
     rarely what you want. Delete this block to make it public. */
  robots: { index: false, follow: false },
};

/* ==================================================================
   /revenanas

   The /vanderbuild layout, in Revenanas orange: the same nav bar in
   the hero's frame shoulder, the same frames, cards, type scale and
   800px column, on one left edge throughout (298px desktop, 50px
   phone), and one text column for every project (570px).

   Colour rule (see the `rv` block in tailwind.config.ts): their orange
   is a fill under their dark #1E1E1E, never under white text. Orange
   toned text uses the deeper `deep`.
   ================================================================== */

type Project = {
  name: string;
  headline?: string;
  copy: string;
  forRevenanas?: string;
  tags?: string[];
} & (
  | { loom: string; poster: string }
  /* No Loom: opens its write up in a modal instead of linking out. */
  | { media: "icp-gate" }
);

/* The Kasada Loom is the same in both versions. Loom's poster link for
   this recording is signed and expires, so its first frame is saved with
   the site. */
const KASADA_LOOM = {
  loom: "https://www.loom.com/embed/2c7141a8a87b4f0cb05dd405fed9efac",
  poster: "/images/looms/kasada.jpg",
};

type Step = { lead: ReactNode; rest: ReactNode[] };

type Lead = {
  title: string;
  description: string[];
  stats: { value: string; label: string }[];
  changes?: string;
  howLabel: string;
  how: Step[];
  limits?: string[];
};

/* Inline code, for file names, cookie names and domains in Dom's
   version: the under the hood words read as what they are. */
function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[5px] bg-frame px-1.5 py-0.5 font-mono text-[0.92em] text-rv-ink">
      {children}
    </code>
  );
}

/* Jack's version: the numbers and what they change for the business. */
const JACK: Lead = {
  title: "Kasada: 1,335 messy rows to 10 accounts reps can work today",
  description: [
    "Kasada stops bots. I picked one use case, content scraping, and one industry that pays for it: airlines. Every scraped fare search costs an airline money.",
    "I pulled 1,335 “airline” companies, cleaned them to 173 real passenger airlines, checked which bot tool each one already runs, and scored them on 4 sourced signals. Then I found the decision maker and a verified email for the top 10.",
  ],
  stats: [
    { value: "1,335 → 173", label: "raw companies to real passenger airlines" },
    { value: "94", label: "airlines with $1B+ revenue" },
    { value: "70", label: "already pay a bot tool (replacement deals)" },
    { value: "10", label: "top accounts with sourced signals" },
    { value: "9", label: "decision makers checked by hand, 9 verified emails" },
    { value: "6.87 credits", label: "total spend" },
  ],
  changes:
    "Instead of 1,335 rows to research, Kasada's reps start with 70 named replacement deals and 10 accounts that already have the buyer, the reason and a verified email.",
  /* Each step: the lead phrase in ink, the rest in body grey, so the
     list can be skimmed by its first words. */
  howLabel: "How I did it",
  how: [
    {
      lead: "Cleaned with reasons.",
      rest: [
        "Every removal is named: 161 airports, 160 ground handlers, 95 duplicates, 64 spam pages, 43 cargo-only and more. Input = output + every exclusion.",
      ],
    },
    {
      lead: "Scored on signals, not filters:",
      rest: [
        "lawsuits against scrapers, pushing bookings off GDS, recent data breaches, low-cost carriers. Every point has a source link. No source, no point.",
      ],
    },
    {
      lead: "Checked the bot tool on each homepage from its cookies:",
      rest: [
        "Cloudflare 34 · Akamai 21 · Imperva 13 · DataDome 1 · one airline runs two.",
        "This also checks for existing Kasada customers. None found.",
      ],
    },
    {
      lead: "Emails:",
      rest: [
        "cheapest tool first, catch-alls re-checked, guesses never marked valid. At KLM, two wrong emails got rejected before the right one passed.",
      ],
    },
  ],
  limits: [
    "The bot check reads the homepage only. Fare search can be protected differently.",
    "6 of 9 emails sit behind security gateways. First sends would be low volume and plain text, with LinkedIn alongside.",
    "I haven't run live campaigns yet. This is everything up to the send button.",
  ],
};

/* Dom's version: what's under the hood. */
const DOM: Lead = {
  title: "Kasada: how I turned 1,335 messy rows into 10 workable accounts",
  description: [
    "One ICP file as context. A cleaning script that logs a reason for every row. An agent that reads each airline's cookies to find which bot tool they run. An email waterfall that only pays when it finds something. Built for 6.87 credits.",
  ],
  stats: [
    {
      value: "1,335 \u2192 173",
      label: "rows in, real airlines out, every removal logged",
    },
    { value: "70", label: "competitor bot tools found from cookies" },
    { value: "0", label: "existing Kasada customers detected" },
    { value: "4", label: "email finders in the waterfall" },
    { value: "9 / 9", label: "verified emails" },
    { value: "6.87 credits", label: "total spend" },
  ],
  howLabel: "How it's built",
  how: [
    {
      lead: "The ICP as context:",
      rest: [
        "one markdown file every step reads from. Change the ICP, rerun, new list.",
      ],
    },
    {
      lead: (
        <>
          <Code>clean.py</Code>:
        </>
      ),
      rest: [
        "every row kept or removed gets a logged reason. Input = output + every exclusion, checked in code.",
      ],
    },
    {
      lead: "Bot-tool detector:",
      rest: [
        "one visit per homepage, read the cookies.",
        <>
          <Code>_abck</Code> = Akamai · <Code>__cf_bm</Code> = Cloudflare ·{" "}
          <Code>incap_ses</Code> = Imperva · <Code>datadome</Code> = DataDome ·{" "}
          <Code>x-kpsdk</Code> = Kasada.
        </>,
      ],
    },
    {
      lead: "Signal research:",
      rest: [
        "every point needs a source URL and a date. No source, no point.",
      ],
    },
    {
      lead: "Email waterfall:",
      rest: [
        "cheapest finder first (LeadMagic, TryKitt, Datagma, Findymail). ZeroBounce verifies. BounceBan only runs on catch-alls.",
      ],
    },
    {
      lead: "Staff email domain is not the website domain:",
      rest: [
        <>
          Southwest = <Code>wnco.com</Code>, Lufthansa Group ={" "}
          <Code>dlh.de</Code>, Qantas = <Code>qantas.com.au</Code>. 3
          “not found” became 3 verified for under 1 credit.
        </>,
      ],
    },
    {
      lead: "At KLM, two tools gave wrong emails.",
      rest: ["Both got rejected. The third finder got it right."],
    },
  ],
};

/* The /vanderbuild cards, same order. Their "For Vanderbuild" lines
   name Mateusz and Vanderbuild, so they are left off here; only ICP
   Gate carries a Revenanas line. */
const projects: Project[] = [
  {
    name: "Engagement to inbound pipeline",
    headline: "Turn post engagement into qualified pipeline",
    copy: "Scrapes everyone who engages with GTM creators' LinkedIn posts, checks whether they're a potential client, and sends each qualified lead to Slack with a personalized angle.",
    loom: "https://www.loom.com/embed/795484d9f1b8440a9899f207bd448008",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/795484d9f1b8440a9899f207bd448008-091af5b5a844764c.jpg",
  },
  {
    name: "Inbound intelligence agent",
    headline: "Every booked call arrives with a brief",
    copy: "An agent that fires on every inbound booking, researches the company, and delivers a short brief to Slack before the call.",
    loom: "https://www.loom.com/embed/dfd8168aaaf94d46aa1a7f145e7b73e5",
    poster: "/images/looms/inbound-intelligence-agent.jpg",
  },
  {
    name: "Vanta: buying-window detection",
    headline: "Multi-signal scoring to find who's buying now",
    copy: "A signal-scored pipeline that finds fintech and healthcare companies in an active buying window. It combines two data sources and seven enriched signals into one ranked list.",
    loom: "https://www.loom.com/embed/de57bc9394ad4214851fe43ba0346c65",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/de57bc9394ad4214851fe43ba0346c65-b4439463d61d1836.jpg",
  },
  {
    name: "Warm signal engine",
    headline: "Going beyond the database for warm leads",
    copy: "An outbound engine for a cybersecurity company that turns LinkedIn post reactions into a qualified prospect list. It finds leads from where buyers are actually showing interest, not only from what a database says.",
    loom: "https://www.loom.com/embed/4786ad6a872049168eb7410b40ccc1fc",
    poster: "/images/looms/warm-signal-engine.jpg",
  },
  {
    name: "ICP Gate",
    copy: "An agent that checks every company on a lead list against the client's real ICP before enrichment. It reads each company's website and returns a fit probability using Jev, so credits only go to companies that actually fit.",
    forRevenanas:
      "Gate a client's whole TAM before enrichment, so credits only go to real fits.",
    media: "icp-gate",
  },
  {
    name: "Clay Skills Showcase",
    tags: ["Infrastructure", "Intelligence"],
    copy: "A full Clay table for company enrichment and scoring, built end to end and walked through step by step.",
    loom: "https://www.loom.com/embed/2021e9d0abc34809b94251ba2cc30b7f",
    poster: "/images/looms/clay-skills-showcase.jpg",
  },
];

/* ---------------- Pieces ---------------- */

/* A 3px orange stroke down the card's left edge. Positioned rather than
   a border, so it sits inside the rounded corners. */
function Rule() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-[3px] bg-rv-orange"
    />
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-base text-rv-body">{children}</p>;
}

/* Small caps label, the site's eyebrow treatment, for the parts of the
   lead project. */
function PartLabel({ children }: { children: ReactNode }) {
  return (
    <h4 className="text-sm font-medium uppercase tracking-[0.04em] text-rv-muted">
      {children}
    </h4>
  );
}

/* Orange pill label: the orange as a fill under dark text. */
function Pill({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-full bg-rv-orange px-2.5 py-1 text-sm font-medium uppercase leading-none tracking-[0.04em] text-rv-ink">
      {children}
    </p>
  );
}

function ForRevenanas({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-tile bg-frame px-4 py-3.5">
      <Pill>For Revenanas</Pill>
      <p className="text-base leading-[1.6] text-rv-ink">{children}</p>
    </div>
  );
}

function ProjectText({ project }: { project: Project }) {
  const title = "text-md font-medium leading-[1.35] text-rv-ink";
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        {project.headline ? (
          <>
            <Eyebrow>{project.name}</Eyebrow>
            <h3 className={title}>{project.headline}</h3>
          </>
        ) : (
          <h3 className={title}>{project.name}</h3>
        )}
        {project.tags ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-rv-orange px-2.5 py-1 text-sm leading-none text-rv-ink"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <p className="text-base leading-[1.6] text-rv-body">{project.copy}</p>
      {project.forRevenanas ? (
        <ForRevenanas>{project.forRevenanas}</ForRevenanas>
      ) : null}
    </div>
  );
}

/* 40px, 20px sides, 12px radius, 14px medium, as everywhere else. Solid
   is their orange under their dark text. */
function Button({
  href,
  children,
  external = false,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "solid" | "secondary";
}) {
  const skin = {
    solid:
      "bg-rv-orange text-rv-ink shadow-[inset_0_0_0_1px_rgba(30,30,30,0.06),0_1px_2px_rgba(30,30,30,0.08),0_6px_16px_-6px_rgba(243,111,19,0.55)] hover:bg-rv-hover",
    secondary:
      "bg-white text-rv-ink shadow-[inset_0_0_0_1px_#E5E7EB,0_6px_6px_-3px_rgba(41,41,41,0.04),0_12px_12px_-6px_rgba(41,41,41,0.04)] hover:shadow-[inset_0_0_0_1px_#1E1E1E,0_6px_6px_-3px_rgba(41,41,41,0.05),0_12px_12px_-6px_rgba(41,41,41,0.05)]",
  }[variant];

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-[12px] px-5 text-base font-medium outline-none transition-[background-color,box-shadow] duration-200 ease-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rv-ink active:scale-[0.98] sm:w-auto ${skin}`}
    >
      {children}
    </a>
  );
}

/* ---------------- Page ---------------- */

/* Hero copy per version. The identity row above it and the switch are
   shared and live in VersionSwitch. */
const HERO: Record<Version, ReactNode> = {
  jack: (
    <>
      <div className="flex max-w-full flex-col gap-3 md:max-w-[82%]">
        <p className="text-md text-rv-body">Hey Jack,</p>
        <h1 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-rv-ink sm:text-2xl">
          You said almost nobody tells you what their build changed about a
          number the business cares about.
        </h1>
        {/* The turn of the page: full ink, slightly heavier, so it reads
            as the answer to the line above. */}
        <p className="text-md font-medium text-rv-ink">
          So I picked one of your clients, Kasada, and did the work. Numbers
          first.
        </p>
      </div>
      <div className="flex flex-col items-start gap-4">
        <p className="max-w-[52ch] text-base text-rv-body">
          6 years of freelancing and running my own agency. Premium clients,
          mostly through manual outbound.
        </p>
        <BackgroundButton />
      </div>
    </>
  ),
  dom: (
    <>
      <div className="flex max-w-full flex-col gap-3 md:max-w-[82%]">
        <p className="text-md text-rv-body">Hey Dom,</p>
        <h1 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-rv-ink sm:text-2xl">
          Jack gets the numbers. This tab is for you: what&apos;s under the
          hood.
        </h1>
        <p className="text-md font-medium text-rv-ink">
          I rebuilt your Kasada case study in Claude Code, end to end. No table
          dragging.
        </p>
      </div>
      <div className="flex flex-col items-start gap-4">
        <BackgroundButton />
      </div>
    </>
  ),
};

/* Same tab, straight to the story on the main page. */
function BackgroundButton() {
  return (
    <SiteButton href="/#story" variant="secondary" className="w-full sm:w-auto">
      Full background
      <span aria-hidden="true">&rarr;</span>
    </SiteButton>
  );
}

/* The lead project, from either version's copy. The Loom is the same in
   both. Optional parts (What it changes, Honest limits) only render when
   that version has them. */
function LeadProject({ lead }: { lead: Lead }) {
  return (
    <div id="kasada" className="scroll-mt-24">
      <Frame>
        <Card className="relative flex flex-col gap-8 p-8 sm:p-11 sm:pl-14">
          <Rule />

          <div className="flex flex-col gap-4">
            <h2 className="max-w-[34ch] text-[20px] font-medium leading-[1.3] tracking-[-0.015em] text-rv-ink sm:text-[22px]">
              {lead.title}
            </h2>
            <div className="flex max-w-[62ch] flex-col gap-3">
              {lead.description.map((para) => (
                <p key={para} className="text-base leading-[1.7] text-rv-body">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* The Loom beside the numbers, the /vanderbuild grid: 248px
              video column, 24px gap. The six stats sit three across on the
              right and stack to one column on phones. */}
          <div className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,248px)_minmax(0,1fr)] md:items-start md:gap-6">
            <LoomPlayer
              src={KASADA_LOOM.loom}
              poster={KASADA_LOOM.poster}
              title="Kasada walkthrough"
              priority
              sizes="(max-width: 768px) 100vw, 248px"
              compact
            />

            {/* 2px gaps on the line grey read as hairlines between the
                cards, no borders drawn. */}
            <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-tile bg-line sm:grid-cols-3">
              {lead.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1.5 bg-white px-3 py-3"
                >
                  <dt className="order-2 text-sm leading-[1.4] text-rv-muted">
                    {stat.label}
                  </dt>
                  <dd className="order-1 whitespace-nowrap text-[18px] font-normal leading-tight tracking-[-0.02em] text-rv-ink tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {lead.changes ? (
            <div className="flex flex-col items-start gap-2.5 rounded-tile bg-rv-tint px-5 py-4 shadow-[inset_0_0_0_1px_rgba(243,111,19,0.2)]">
              <Pill>What it changes</Pill>
              <p className="max-w-[62ch] text-md leading-[1.6] text-rv-ink">
                {lead.changes}
              </p>
            </div>
          ) : null}

          <div className="flex flex-col gap-3">
            <PartLabel>{lead.howLabel}</PartLabel>
            <ul className="flex flex-col gap-3">
              {lead.how.map((step, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[16px_minmax(0,1fr)] gap-x-2"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-[6px] w-[6px] rounded-full bg-rv-orange"
                  />
                  <div className="flex max-w-[62ch] flex-col gap-1">
                    <p className="text-base leading-[1.65] text-rv-body">
                      <span className="font-medium text-rv-ink">
                        {step.lead}
                      </span>{" "}
                      {step.rest[0]}
                    </p>
                    {step.rest.slice(1).map((line, j) => (
                      <p
                        key={j}
                        className="text-base leading-[1.65] text-rv-body"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {lead.limits ? (
            <div className="flex flex-col gap-2 border-t border-line pt-5">
              <PartLabel>Honest limits</PartLabel>
              <ul className="flex max-w-[62ch] flex-col gap-1.5">
                {lead.limits.map((line) => (
                  <li
                    key={line}
                    className="grid grid-cols-[16px_minmax(0,1fr)] gap-x-2 text-sm leading-[1.6] text-rv-muted"
                  >
                    <span aria-hidden="true">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Card>
      </Frame>
    </div>
  );
}

/* Reads ?v=dom on the server, so a Dom link renders Dom from the first
   paint rather than flashing Jack's copy first. */
export default async function RevenanasPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string | string[] }>;
}) {
  const { v } = await searchParams;
  const initial: Version = v === "dom" ? "dom" : "jack";

  return (
    <>
      <Nav items={[]} />

      {/* The /vanderbuild shell: only the 18px strip is cleared, and the
          nav bar sits inside the hero's 66px frame shoulder. */}
      <main className="mx-auto w-full max-w-page px-4 pb-16 pt-[18px] sm:px-5">
        <div className="mx-auto flex w-full max-w-content flex-col gap-5">
          {/* ---------- Hero + lead project, per version ---------- */}
          {/* The identity row and the switch are the same in both; the
              hero copy and the Kasada project swap. */}
          <VersionSwitch
            initial={initial}
            identity={
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full sm:h-[90px] sm:w-[90px]">
                  <Image
                    src="/images/dp.jpg"
                    alt="Vivek M"
                    width={90}
                    height={90}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-lg font-medium text-rv-ink">Vivek M</p>
                  <p className="text-base text-rv-body">
                    Application to Revenanas · Bangalore
                  </p>
                </div>
              </div>
            }
            hero={HERO}
            lead={{
              jack: <LeadProject lead={JACK} />,
              dom: <LeadProject lead={DOM} />,
            }}
          />

          {/* ---------- More systems ---------- */}
          <div id="work" className="scroll-mt-24">
            <div className="flex flex-col gap-8 rounded-frame bg-frame px-5 pb-5 pt-9 sm:gap-9 sm:px-8 sm:pb-8 sm:pt-[50px]">
              {/* Inset so the heading starts where the hero's text does:
                  32 + 26 from sm matches the hero's 56. */}
              <div className="flex flex-col gap-1.5 px-3.5 sm:px-[26px]">
                <Eyebrow>Everything else.</Eyebrow>
                <h2 className="text-lg font-medium text-rv-ink">
                  More systems I have built
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {projects.map((project) => {
                  /* Content on the page's one edge: 14px on phones
                     (16 + 20 + 14 = 50), 26px from md (240 + 32 + 26 =
                     298). Text column at 298 + 248 + 24 = 570. */
                  const row =
                    "flex flex-col gap-5 overflow-hidden rounded-card bg-surface p-4 pl-[14px] md:grid md:grid-cols-[minmax(0,248px)_minmax(0,1fr)] md:items-start md:gap-6 md:p-5 md:pl-[26px]";

                  if ("media" in project) {
                    const media = hasIcpGateVideo ? (
                      <IcpGateVideo />
                    ) : (
                      <IcpGateAnimation />
                    );
                    return (
                      <IcpGateCard
                        key={project.name}
                        name={project.name}
                        modalMedia={media}
                        layout={row}
                      >
                        <Rule />
                        {media}
                        <div className="flex flex-col gap-4 pb-1 md:p-0">
                          <ProjectText project={project} />
                          <ReadMoreHint className="text-rv-ink" />
                        </div>
                      </IcpGateCard>
                    );
                  }

                  return (
                    <article key={project.name} className={`relative ${row}`}>
                      <Rule />
                      <LoomPlayer
                        src={project.loom}
                        poster={project.poster}
                        title={`${project.name} walkthrough`}
                        sizes="(max-width: 768px) 100vw, 248px"
                        compact
                      />
                      <div className="pb-1 md:p-0">
                        <ProjectText project={project} />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ---------- Contact ---------- */}
          <div id="contact" className="scroll-mt-24">
            <Frame>
              <Card className="flex flex-col items-center gap-7 px-8 py-14 text-center sm:px-11 sm:py-16">
                <div className="flex flex-col items-center gap-2">
                  <h2 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-rv-ink sm:text-2xl">
                    Let&apos;s talk.
                  </h2>
                  <p className="max-w-[44ch] text-base text-rv-body">
                    A call, a question, or just a &ldquo;no&rdquo;. All fine.
                  </p>
                </div>
                <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                  <Button href="https://www.linkedin.com/in/vivek-m12/" external>
                    Message on LinkedIn
                  </Button>
                  <Button
                    href="mailto:purayathvivek@gmail.com"
                    variant="secondary"
                  >
                    Send an email
                  </Button>
                </div>
              </Card>
            </Frame>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
