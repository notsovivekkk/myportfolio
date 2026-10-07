import type { Metadata } from "next";
import type { ReactNode } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ProjectsHero from "@/components/sections/ProjectsHero";
import { Frame, Card } from "@/components/ui/Primitives";
import LoomPlayer from "./LoomPlayer";

export const metadata: Metadata = {
  title: "Vivek M, GTM Engineer application to Scalantec",
  description:
    "I rebuilt your Seven Senders engine from scratch: 212 lookalike shops across DACH, 65 real fits through an ICP gate, ranked on buying-window signals.",
  /* Noindex on purpose. This is written for one company, and a targeted
     application page turning up in search results for other people is
     rarely what you want. Delete this block to make it public. */
  robots: { index: false, follow: false },
};

/* ==================================================================
   /scalantec

   The /projects shell: the same nav bar sitting in the hero's frame
   shoulder, the same frames, cards, type scale and 800px column. White
   and Scalantec's gradient only.

   Colour rule (see the `sc` block in tailwind.config.ts): the gradient
   is decoration (card rules, play buttons, the quote mark); buttons use
   the solid red end, which carries white text; brand text uses `deep`.
   ================================================================== */

type Project = {
  name: string;
  headline?: string;
  copy: string;
  forScalantec?: string;
  tags?: string[];
  loom: string;
  poster: string;
};

/* Ordered by outcome: the case study proof first, then two systems
   Scalantec can switch on for its own growth, then plays it can sell. */
const featured: Project = {
  name: "Seven Senders, rebuilt",
  copy: "I started from Seven Senders' own customers and testimonials, found 212 lookalike shops across DACH, and ran every website through an ICP gate agent to get 65 real fits. Then I ranked them on buying-window signals (new logistics leaders, customs and transport hiring, EU expansion) and found the right contact at each, with a verified email and a personalized angle.",
  forScalantec:
    "The same data and intelligence layers you built for Seven Senders, done on a fresh list in an afternoon.",
  loom: "https://www.loom.com/embed/7e201c42c0884ffebd287ae4141064b6",
  poster: "/images/looms/seven-senders.jpg",
};

/* Posters: newer Loom recordings only hand out signed thumbnail links
   that expire, so those frames are saved in public/images/looms; older
   ones still have a stable CDN URL. */
const projects: Project[] = [
  {
    name: "Engagement to inbound pipeline",
    headline: "Turn post engagement into qualified pipeline",
    copy: "Scrapes everyone who engages with GTM creators' LinkedIn posts, checks whether they're a potential client, and sends each qualified lead to Slack with a personalized angle.",
    forScalantec:
      "Nicolas, your posts reach 10k+ followers. The founders and sales leaders liking and commenting are warm Scalantec prospects, and this turns them into a daily qualified list.",
    loom: "https://www.loom.com/embed/795484d9f1b8440a9899f207bd448008",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/795484d9f1b8440a9899f207bd448008-091af5b5a844764c.jpg",
  },
  {
    name: "Inbound intelligence agent",
    headline: "Every booked call arrives with a brief",
    copy: "An agent that fires on every inbound booking, researches the company, and delivers a short brief to Slack before the call.",
    forScalantec:
      "Your own booking flow doesn't have this yet. Plug it in, and every discovery call with a prospect arrives already researched. Less manual prep, faster calls, and more time spent selling.",
    loom: "https://www.loom.com/embed/dfd8168aaaf94d46aa1a7f145e7b73e5",
    poster: "/images/looms/inbound-intelligence-agent.jpg",
  },
  {
    name: "Vanta: buying-window detection",
    headline: "Multi-signal scoring to find who's buying now",
    copy: "A signal-scored pipeline that finds fintech and healthcare companies in an active buying window. It combines two data sources and seven enriched signals into one ranked list.",
    forScalantec:
      "This is your multi-signal lead scoring, applied to a different market. Different ICP, same engine, ready to reuse for any client.",
    loom: "https://www.loom.com/embed/de57bc9394ad4214851fe43ba0346c65",
    poster:
      "https://cdn.loom.com/sessions/thumbnails/de57bc9394ad4214851fe43ba0346c65-b4439463d61d1836.jpg",
  },
  {
    name: "Warm signal engine",
    headline: "Going beyond the database for warm leads",
    copy: "An outbound engine for a cybersecurity company that turns LinkedIn post reactions into a qualified prospect list. It finds leads from where buyers are actually showing interest, not only from what a database says.",
    forScalantec:
      "A ready warm-signal play for any client whose market is active on LinkedIn, with no reliance on a single data source.",
    loom: "https://www.loom.com/embed/4786ad6a872049168eb7410b40ccc1fc",
    poster: "/images/looms/warm-signal-engine.jpg",
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

/* Their gradient as a 3px rule down the card's left edge. A positioned
   bar rather than border-image, which would ignore the rounded corners. */
function GradientRule() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-sc-red via-sc-orange to-sc-amber"
    />
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-base text-sc-deep">{children}</p>;
}

/* What the project means for them, set apart on a warm panel so a
   reader skimming the page reads these lines first. */
function ForScalantec({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 rounded-tile bg-sc-soft px-4 py-3.5">
      <p className="text-sm font-medium uppercase tracking-[0.04em] text-sc-deep">
        For Scalantec
      </p>
      <p className="text-base leading-[1.6] text-sc-ink">{children}</p>
    </div>
  );
}

function ProjectText({
  project,
  titleClass,
}: {
  project: Project;
  titleClass: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        {/* With a headline: name as the small label, headline as the
            title. Without one, the name is the title, so no card is left
            with only a label on top. */}
        {project.headline ? (
          <>
            <Eyebrow>{project.name}</Eyebrow>
            <h3 className={titleClass}>{project.headline}</h3>
          </>
        ) : (
          <h3 className={titleClass}>{project.name}</h3>
        )}
        {project.tags ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-sc-soft px-2.5 py-1 text-sm leading-none text-sc-deep"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <p className="text-base leading-[1.6] text-sc-body">{project.copy}</p>
      {project.forScalantec ? (
        <ForScalantec>{project.forScalantec}</ForScalantec>
      ) : null}
    </div>
  );
}

/* 40px, 20px sides, 12px radius, 14px medium, as everywhere else. */
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
      "bg-sc-red text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_1px_2px_rgba(23,17,15,0.08),0_6px_16px_-6px_rgba(197,72,71,0.55)] hover:bg-sc-hover",
    secondary:
      "bg-white text-sc-ink shadow-[inset_0_0_0_1px_#F2E1D8,0_6px_6px_-3px_rgba(41,41,41,0.04),0_12px_12px_-6px_rgba(41,41,41,0.04)] hover:shadow-[inset_0_0_0_1px_#C54847,0_6px_6px_-3px_rgba(41,41,41,0.05),0_12px_12px_-6px_rgba(41,41,41,0.05)]",
    quiet:
      "bg-white text-sc-body shadow-[inset_0_0_0_1px_#F2E1D8] hover:text-sc-ink hover:shadow-[inset_0_0_0_1px_#C54847]",
  }[variant];

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-[12px] px-5 text-base font-medium outline-none transition-[background-color,box-shadow,color] duration-200 ease-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sc-red active:scale-[0.98] sm:w-auto ${skin}`}
    >
      {children}
    </a>
  );
}

/* ---------------- Page ---------------- */

export default function ScalantecPage() {
  return (
    <>
      <Nav items={[]} />

      {/* The /projects shell: only the 18px strip is cleared, and the
          nav bar sits inside the hero's 66px frame shoulder. */}
      <main className="mx-auto w-full max-w-page px-4 pb-16 pt-[18px] sm:px-5">
        <div className="mx-auto flex w-full max-w-content flex-col gap-5">
          {/* ---------- Intro ---------- */}
          {/* The /projects hero itself, shared, so the two stay
              identical. It carries the background button too. */}
          <ProjectsHero />

          {/* ---------- Why Scalantec ---------- */}
          {/* The pitch, its own card. Same left padding as the hero
              (sm:pl-14), so every line on the page starts from one edge. */}
          <Frame>
            <Card className="flex flex-col gap-6 p-8 sm:p-11 sm:pl-14">
              {/* Quote marks do the work: the opening one in their red,
                  hung into the margin so the first letter lines up with
                  everything below it. */}
              <figure className="flex flex-col gap-2">
                <blockquote className="max-w-[40ch] text-[20px] font-normal leading-[1.45] tracking-[-0.015em] text-sc-ink sm:text-[22px]">
                  <span
                    aria-hidden="true"
                    className="-ml-[0.45em] text-sc-red"
                  >
                    &ldquo;
                  </span>
                  We don&apos;t hire for the resume. We hire for
                  trajectory.&rdquo;
                </blockquote>
                <figcaption className="text-base text-sc-deep">
                  Nicolas Schell, CEO Scalantec
                </figcaption>
              </figure>

              <div className="flex max-w-full flex-col gap-3 md:max-w-[82%]">
                <p className="text-md text-sc-body">
                  Read this and knew it was written for people like me. I
                  refuse to lose, and I have plenty of stories (even in
                  outbound) supporting the same. Happy to share them on a call
                  :)
                </p>
                <h2 className="text-[20px] font-medium leading-[1.3] tracking-[-0.015em] text-sc-ink sm:text-[22px]">
                  I did not want to apply empty handed. So I rebuilt your
                  Seven Senders engine from scratch.
                </h2>
              </div>
            </Card>
          </Frame>

          {/* ---------- 1. Featured: Seven Senders ---------- */}
          {/* Its own card, video beside the write up: the proof the page
              is built on, given room without becoming a slab. */}
          <div id="seven-senders" className="scroll-mt-24">
            <Frame>
              {/* sm:pl-14 matches the hero's left padding, so the video's
                  edge lines up with the quote and headline above it. */}
              <Card className="relative p-8 sm:p-11 sm:pl-14">
                <GradientRule />
                {/* Same 248px video column and 24px gap as the rows below,
                    so the text column starts at the same x on every card. */}
                <div className="grid gap-6 md:grid-cols-[minmax(0,248px)_minmax(0,1fr)] md:items-start md:gap-6">
                  <LoomPlayer
                    src={featured.loom}
                    poster={featured.poster}
                    title={`${featured.name} walkthrough`}
                    priority
                    sizes="(max-width: 768px) 100vw, 248px"
                  />
                  <ProjectText
                    project={featured}
                    titleClass="text-lg font-medium leading-[1.3] text-sc-ink"
                  />
                </div>
              </Card>
            </Frame>
          </div>

          {/* ---------- 2 to 6 ---------- */}
          {/* The main page's grey panel with white tiles, one project per
              row: video left, words right, the same shape as the featured
              card, so the page reads on one rhythm. */}
          <div id="work" className="scroll-mt-24">
            <div className="flex flex-col gap-8 rounded-frame bg-frame px-5 pb-5 pt-9 sm:gap-9 sm:px-8 sm:pb-8 sm:pt-[50px]">
              {/* Inset so the heading starts exactly where the hero's
                  text starts: 32 + 26 from sm matches the hero's 56. */}
              <div className="flex flex-col gap-1.5 px-3.5 sm:px-[26px]">
                <Eyebrow>Everything else.</Eyebrow>
                <h2 className="text-lg font-medium text-sc-ink">
                  More systems I have built
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {projects.map((project) => (
                  <article
                    key={project.name}
                    /* Left padding set so content starts on the page's one
                       edge: 14px on phones (16 + 20 + 14 = 50), 26px from
                       md (240 + 32 + 26 = 298). */
                    className="relative flex flex-col gap-5 overflow-hidden rounded-card bg-surface p-4 pl-[14px] md:grid md:grid-cols-[minmax(0,248px)_minmax(0,1fr)] md:items-start md:gap-6 md:p-5 md:pl-[26px]"
                  >
                    <GradientRule />
                    <LoomPlayer
                      src={project.loom}
                      poster={project.poster}
                      title={`${project.name} walkthrough`}
                      sizes="(max-width: 768px) 100vw, 248px"
                      compact
                    />
                    <div className="pb-1 md:p-0">
                      <ProjectText
                        project={project}
                        titleClass="text-md font-medium leading-[1.35] text-sc-ink"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- Contact ---------- */}
          <div id="contact" className="scroll-mt-24">
            <Frame>
              <Card className="flex flex-col items-center gap-7 px-8 py-14 text-center sm:px-11 sm:py-16">
                <div className="flex flex-col items-center gap-2">
                  <h2 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-sc-ink sm:text-2xl">
                    Let&apos;s talk
                  </h2>
                  <p className="max-w-[44ch] text-base text-sc-body">
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
