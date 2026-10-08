import type { Metadata } from "next";
import type { ReactNode } from "react";
import { existsSync } from "node:fs";
import path from "node:path";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ProjectsHero from "@/components/sections/ProjectsHero";
import { Frame, Card } from "@/components/ui/Primitives";
import IcpGateAnimation from "@/components/ui/IcpGateAnimation";
import IcpGateVideo from "@/components/ui/IcpGateVideo";
import IcpGateCard, { ReadMoreHint } from "@/components/ui/IcpGateCard";
import LoomPlayer from "./LoomPlayer";

/* Same rule as /projects: a clip at public/videos/icp-gate.mp4 replaces
   the illustration on the next build. */
const hasIcpGateVideo = existsSync(
  path.join(process.cwd(), "public/videos/icp-gate.mp4")
);

export const metadata: Metadata = {
  title: "Vivek M, GTM Engineer application to Vanderbuild",
  description:
    "I rebuilt your ArdentCode campaign from scratch: 681 UK fractional CTOs pulled, 104 kept at real companies, the top 25 enriched.",
  /* Noindex on purpose. This is written for one company, and a targeted
     application page turning up in search results for other people is
     rarely what you want. Delete this block to make it public. */
  robots: { index: false, follow: false },
};

/* ==================================================================
   /vanderbuild

   The /projects shell: the same nav bar in the hero's frame shoulder,
   the same frames, cards, type scale and 800px column, on one left
   edge throughout (298px desktop, 50px phone).

   Colour rule (see the `vb` block in tailwind.config.ts): highlighter
   their yellow is only ever the exact #FFFF54 fill under near black
   type: play buttons, card rules, buttons, tags and labels. All text is
   neutral, as on the main site.
   ================================================================== */

type Project = {
  name: string;
  headline?: string;
  copy: string;
  forVanderbuild?: string;
  tags?: string[];
} & (
  | { loom: string; poster: string }
  /* No Loom: opens its write up in a modal instead of linking out. */
  | { media: "icp-gate" }
);

const ARDENT = {
  name: "ArdentCode, rebuilt",
  loom: "https://www.loom.com/embed/d6c0e37b0c054520a9a37ababf3d68b7",
  poster: "/images/looms/ardentcode.jpg",
  /* The funnel, taken straight from the write up below. */
  stats: [
    { value: "681", label: "UK fractional CTOs pulled" },
    { value: "104", label: "at real companies of 20 to 1,000" },
    { value: "25", label: "top picks, emails enriched" },
  ],
  copy: [
    "I rebuilt Vanderbuild's ArdentCode campaign for UK fractional CTOs. They get fewer cold emails, but they join to deliver fast and they pick the tech partners. That makes them a smart persona to target.",
    "I pulled 681 from Crustdata and AI-Ark and kept 104 who sit at a real company with 20 to 1,000 staff.",
    "I enriched emails for the top 25 only. Some sit behind Proofpoint and Mimecast, so this needs multichannel outreach, with LinkedIn alongside email.",
    "Next, I'd add Sales Navigator and Prospeo to source more, with every new name checked against the ICP first.",
  ],
};

/* Posters: newer Loom recordings only hand out signed thumbnail links
   that expire, so those frames are saved in public/images/looms; older
   ones still have a stable CDN URL. */
const projects: Project[] = [
  {
    name: "Engagement to inbound pipeline",
    headline: "Turn post engagement into qualified pipeline",
    copy: "Scrapes everyone who engages with GTM creators' LinkedIn posts, checks whether they're a potential client, and sends each qualified lead to Slack with a personalized angle.",
    forVanderbuild:
      "Mateusz, your posts reach 12k+ followers. The founders and sales leaders liking and commenting are warm Vanderbuild prospects, and this turns them into a daily qualified list.",
    loom: "https://www.loom.com/embed/795484d9f1b8440a9899f207bd448008",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/795484d9f1b8440a9899f207bd448008-091af5b5a844764c.jpg",
  },
  {
    name: "Inbound intelligence agent",
    headline: "Every booked call arrives with a brief",
    copy: "An agent that fires on every inbound booking, researches the company, and delivers a short brief to Slack before the call.",
    forVanderbuild:
      "If it's useful, this could plug into Vanderbuild's own booking flow, so every discovery call starts with the research already done. Happy to set it up and adapt it to how your team runs calls.",
    loom: "https://www.loom.com/embed/dfd8168aaaf94d46aa1a7f145e7b73e5",
    poster: "/images/looms/inbound-intelligence-agent.jpg",
  },
  {
    name: "Vanta: buying-window detection",
    headline: "Multi-signal scoring to find who's buying now",
    copy: "A signal-scored pipeline that finds fintech and healthcare companies in an active buying window. It combines two data sources and seven enriched signals into one ranked list.",
    forVanderbuild:
      "Built on the same idea as the multi-signal scoring you do for clients, applied to a different market. I'd love to learn your approach and bring this into it wherever it helps.",
    loom: "https://www.loom.com/embed/de57bc9394ad4214851fe43ba0346c65",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/de57bc9394ad4214851fe43ba0346c65-b4439463d61d1836.jpg",
  },
  {
    name: "Warm signal engine",
    headline: "Going beyond the database for warm leads",
    copy: "An outbound engine for a cybersecurity company that turns LinkedIn post reactions into a qualified prospect list. It finds leads from where buyers are actually showing interest, not only from what a database says.",
    forVanderbuild:
      "A ready warm-signal play for any client whose market is active on LinkedIn, with no reliance on a single data source.",
    loom: "https://www.loom.com/embed/4786ad6a872049168eb7410b40ccc1fc",
    poster: "/images/looms/warm-signal-engine.jpg",
  },
  {
    name: "ICP Gate",
    copy: "An agent that checks every company on a lead list against the client's real ICP before enrichment. It reads each company's website and returns a fit probability using Jev, so credits only go to companies that actually fit.",
    forVanderbuild:
      "Qualify every account in a client's CRM before spending on enrichment. 20,000 accounts would cost a few cents to gate. Most efficient way to make the lists accurate.",
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

/* A 3px highlighter stroke down the card's left edge. Positioned rather
   than a border, so it sits inside the rounded corners. */
function Rule() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-[3px] bg-vb-hl"
    />
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-base text-vb-body">{children}</p>;
}

/* What the project means for them, on the main site's grey panel, led
   by a label in their exact yellow, so a reader skimming the page finds
   these lines first. */
function ForVanderbuild({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-tile bg-frame px-4 py-3.5">
      <p className="rounded-full bg-vb-hl px-2.5 py-1 text-sm font-medium uppercase leading-none tracking-[0.04em] text-vb-ink">
        For Vanderbuild
      </p>
      <p className="text-base leading-[1.6] text-vb-ink">{children}</p>
    </div>
  );
}

function ProjectText({ project }: { project: Project }) {
  const title = "text-md font-medium leading-[1.35] text-vb-ink";
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        {/* With a headline: name as the small label, headline as the
            title. Without one, the name is the title. */}
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
                className="inline-flex items-center rounded-full bg-vb-hl px-2.5 py-1 text-sm leading-none text-vb-ink"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <p className="text-base leading-[1.6] text-vb-body">{project.copy}</p>
      {project.forVanderbuild ? (
        <ForVanderbuild>{project.forVanderbuild}</ForVanderbuild>
      ) : null}
    </div>
  );
}

/* 40px, 20px sides, 12px radius, 14px medium, as everywhere else. Solid
   is highlighter yellow under near black text, the brand's own pairing. */
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
      "bg-vb-hl text-vb-ink shadow-[inset_0_0_0_1px_rgba(20,20,20,0.06),0_1px_2px_rgba(20,20,20,0.08),0_6px_16px_-6px_rgba(200,200,0,0.6)] hover:bg-vb-hover",
    secondary:
      "bg-white text-vb-ink shadow-[inset_0_0_0_1px_#E5E7EB,0_6px_6px_-3px_rgba(41,41,41,0.04),0_12px_12px_-6px_rgba(41,41,41,0.04)] hover:shadow-[inset_0_0_0_1px_#141414,0_6px_6px_-3px_rgba(41,41,41,0.05),0_12px_12px_-6px_rgba(41,41,41,0.05)]",
  }[variant];

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-[12px] px-5 text-base font-medium outline-none transition-[background-color,box-shadow] duration-200 ease-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vb-ink active:scale-[0.98] sm:w-auto ${skin}`}
    >
      {children}
    </a>
  );
}

/* ---------------- Page ---------------- */

export default function VanderbuildPage() {
  return (
    <>
      <Nav items={[]} />

      {/* The /projects shell: only the 18px strip is cleared, and the
          nav bar sits inside the hero's 66px frame shoulder. */}
      <main className="mx-auto w-full max-w-page px-4 pb-16 pt-[18px] sm:px-5">
        <div className="mx-auto flex w-full max-w-content flex-col gap-5">
          {/* ---------- Intro ---------- */}
          {/* The /projects hero itself, shared, so they stay identical.
              It carries the background button too. */}
          <ProjectsHero />

          {/* ---------- Why Vanderbuild ---------- */}
          {/* The pitch, its own card, on the hero's left padding. */}
          <Frame>
            <Card className="flex flex-col gap-5 p-8 sm:p-11 sm:pl-14">
              <p className="max-w-[46ch] text-lg leading-[1.6] text-vb-ink">
                Mateusz, the bar to work with you is high. You&apos;re the
                &ldquo;Clay Cup Vice Champion&rdquo;. That&apos;s exactly why I want to work with you: to raise my
                own standards and deliver real impact. :)
              </p>
              <h2 className="max-w-[40ch] text-[20px] font-medium leading-[1.3] tracking-[-0.015em] text-vb-ink sm:text-[22px]">
                I didn&apos;t want to apply empty-handed, so I rebuilt your
                ArdentCode campaign from scratch.
              </h2>
            </Card>
          </Frame>

          {/* ---------- 1. Featured: ArdentCode ---------- */}
          {/* Video first, but at thumbnail size beside the title and the
              funnel in three numbers, not a full width slab. The write up
              runs underneath at reading width. Same 248px video column as
              the rows below, so the page keeps one grid. */}
          <div id="ardentcode" className="scroll-mt-24">
            <Frame>
              <Card className="relative flex flex-col gap-7 p-8 sm:p-11 sm:pl-14">
                <Rule />
                <div className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,248px)_minmax(0,1fr)] md:items-start md:gap-6">
                  <LoomPlayer
                    src={ARDENT.loom}
                    poster={ARDENT.poster}
                    title={`${ARDENT.name} walkthrough`}
                    priority
                    sizes="(max-width: 768px) 100vw, 248px"
                    compact
                  />

                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <Eyebrow>The project.</Eyebrow>
                      <h3 className="text-lg font-medium leading-[1.3] text-vb-ink">
                        {ARDENT.name}
                      </h3>
                    </div>

                    {/* Three numbers, one hairline apart: 2px gaps on the
                        main site's line grey, no borders drawn. */}
                    <dl className="grid grid-cols-3 gap-0.5 overflow-hidden rounded-tile bg-line">
                      {ARDENT.stats.map((stat) => (
                        <div
                          key={stat.value}
                          className="flex flex-col gap-1 bg-white px-3 py-3"
                        >
                          <dt className="order-2 text-sm leading-[1.4] text-vb-muted">
                            {stat.label}
                          </dt>
                          <dd className="order-1 text-[22px] font-normal leading-none tracking-[-0.02em] text-vb-ink tabular-nums">
                            {stat.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="flex max-w-[62ch] flex-col gap-3">
                  {ARDENT.copy.map((para) => (
                    <p
                      key={para}
                      className="text-base leading-[1.7] text-vb-body"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </Card>
            </Frame>
          </div>

          {/* ---------- 2 to 7 ---------- */}
          {/* The main page's grey panel with white tiles, one project per
              row: video left, words right. */}
          <div id="work" className="scroll-mt-24">
            <div className="flex flex-col gap-8 rounded-frame bg-frame px-5 pb-5 pt-9 sm:gap-9 sm:px-8 sm:pb-8 sm:pt-[50px]">
              {/* Inset so the heading starts where the hero's text does:
                  32 + 26 from sm matches the hero's 56. */}
              <div className="flex flex-col gap-1.5 px-3.5 sm:px-[26px]">
                <Eyebrow>Everything else.</Eyebrow>
                <h2 className="text-lg font-medium text-vb-ink">
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

                  /* ICP Gate: same row shape, but the whole row opens the
                     full write up in a modal, as on /projects. */
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
                          <ReadMoreHint className="text-vb-ink" />
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
                  <h2 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-vb-ink sm:text-2xl">
                    Let&apos;s talk
                  </h2>
                  <p className="max-w-[44ch] text-base text-vb-body">
                    Happy to jump on a call, answer questions, or just start
                    with a message.
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
