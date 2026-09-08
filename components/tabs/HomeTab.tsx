"use client";

import Image from "next/image";
import {
  Frame,
  Card,
  Panel,
  Section,
  SectionHeading,
  Button,
  Pill,
  ArrowIcon,
} from "@/components/ui/Primitives";
import { LinkedInIcon } from "@/components/ui/SocialIcons";

/* ------------------------------------------------------------------
   Content
   ------------------------------------------------------------------ */

const skillItems = [
  { label: "Product Strategy", color: "#007AFF" },
  { label: "User Research", color: "#007AFF" },
  { label: "PRDs", color: "#007AFF" },
  { label: "Roadmapping", color: "#007AFF" },
  { label: "Agile / Scrum", color: "#007AFF" },
  { label: "Customer Discovery", color: "#007AFF" },
  { label: "Hypothesis Testing", color: "#007AFF" },
  { label: "LLMs", color: "#AF52DE" },
  { label: "RAG Systems", color: "#AF52DE" },
  { label: "AI Agents", color: "#AF52DE" },
  { label: "Prompt Eng.", color: "#AF52DE" },
  { label: "Cursor", color: "#AF52DE" },
  { label: "Claude Code", color: "#AF52DE" },
  { label: "Vibe Coding", color: "#AF52DE" },
  { label: "Figma", color: "#FF9500" },
  { label: "UX Design", color: "#FF9500" },
  { label: "Wireframing", color: "#FF9500" },
  { label: "Systems Thinking", color: "#FF9500" },
];

const focusItems = [
  {
    num: "01",
    title: "AI Product Systems",
    desc: "From concept to shipped.",
  },
  {
    num: "02",
    title: "Human-AI Interaction",
    desc: "Designing for trust and behavior.",
  },
  {
    num: "03",
    title: "Customer Discovery",
    desc: "Turning conversations into product clarity.",
  },
  {
    num: "04",
    title: "MVP Velocity",
    desc: "Shipping under ambiguity.",
  },
];

const workSteps = [
  "Facing the problem",
  "Talking to users",
  "Scoping the solution",
  "Prioritising",
  "Building",
  "Shipping",
];

/* ------------------------------------------------------------------
   Hero backdrop, decorative line grid.
   Gradient-faded strokes so the lines dissolve rather than stop, which
   keeps them reading as texture instead of as content.
   ------------------------------------------------------------------ */
function HeroBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute -bottom-9 -right-7 h-[260px] w-[215px] sm:h-[420px] sm:w-[347px]"
      viewBox="0 0 347 420"
      fill="none"
      aria-hidden="true"
    >
      {/* userSpaceOnUse, not the default objectBoundingBox: a straight
          line has a zero-width (or zero-height) bounding box, and Chrome
          declines to paint an objectBoundingBox gradient into one, the
          strokes silently vanish. */}
      <defs>
        <linearGradient
          id="pf-v"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="420"
        >
          <stop stopColor="#D8DBE0" stopOpacity="0" />
          <stop offset="0.44" stopColor="#D8DBE0" />
          <stop offset="1" stopColor="#D8DBE0" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="pf-h"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="347"
          y2="0"
        >
          <stop stopColor="#D8DBE0" stopOpacity="0" />
          <stop offset="0.44" stopColor="#D8DBE0" />
          <stop offset="1" stopColor="#D8DBE0" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="pf-fill"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="60"
          x2="0"
          y2="250"
        >
          <stop stopColor="#D8DBE0" />
          <stop offset="1" stopColor="#D8DBE0" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <g strokeWidth="1">
        <path d="M152.9 0V273.5" stroke="url(#pf-v)" />
        <path d="M195.5 0V298.1" stroke="url(#pf-v)" />
        <path d="M238.1 0V344.6" stroke="url(#pf-v)" />
        <path d="M280.7 78V419.7" stroke="url(#pf-v)" />
        <path d="M152.4 197.6H346.3" stroke="url(#pf-h)" />
        <path d="M0.4 119.7H346.3" stroke="url(#pf-h)" />
      </g>

      {/* Two filled cells anchor the grid so it reads as deliberate. */}
      <rect
        x="238.6"
        y="198.1"
        width="41.6"
        height="44.4"
        fill="url(#pf-fill)"
        opacity="0.4"
      />
      <rect
        x="196"
        y="75.9"
        width="41.6"
        height="44.4"
        fill="url(#pf-fill)"
        opacity="0.4"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Work approach, vertical ticker of the process steps
   ------------------------------------------------------------------ */
function WorkApproachCard() {
  return (
    <Frame className="h-full">
      <Card className="flex h-full flex-col p-5">
        <p className="text-sm text-body">How I work</p>

        {/* Fixed viewport height, the keyframes translate a known
            distance, so letting this stretch would expose the whole
            track instead of a moving window onto it. */}
        <div
          className="relative mt-2 h-[168px] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 28%, black 72%, transparent 100%)",
          }}
        >
          {/* Hairlines marking the "current" slot */}
          <div
            className="pointer-events-none absolute inset-x-0 z-10"
            style={{ top: "calc(50% - 23px)", height: 46 }}
          >
            <div className="h-px w-full bg-line" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-line" />
          </div>

          {/* Duplicated so the loop has no visible seam */}
          <div style={{ animation: "workFlowScroll 12s linear infinite" }}>
            {[...workSteps, ...workSteps].map((step, i) => (
              <div
                key={i}
                className="flex h-[46px] items-center text-base font-medium text-ink"
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Frame>
  );
}

/* ------------------------------------------------------------------
   LinkedIn preview card
   ------------------------------------------------------------------ */
function LinkedInCard() {
  return (
    <Frame className="h-full">
      <Card className="flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/dp.jpg"
                alt="Vivek M"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-medium text-ink">Vivek M</p>
              <p className="text-sm text-muted">@vivekm</p>
            </div>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile bg-[#0A66C2] text-white">
            <LinkedInIcon size={18} />
          </span>
        </div>

        <p className="mt-4 text-base text-body">
          Building MVP&apos;s &amp; AI Systems. Smart Context Coder{" "}
          <span className="text-[#0A66C2]">@growthbae</span>
        </p>

        <p className="mt-2 text-sm text-muted">
          India · 2,153 followers · 500+ connections
        </p>

        <div className="mt-auto pt-4">
          <a
            href="https://www.linkedin.com/in/vivek-m12/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-base font-medium text-ink transition-opacity duration-200 hover:opacity-60"
          >
            View profile <ArrowIcon />
          </a>
        </div>
      </Card>
    </Frame>
  );
}

/* ------------------------------------------------------------------
   Tab
   ------------------------------------------------------------------ */
export default function HomeTab() {
  return (
    <div className="flex flex-col gap-5">
      {/* ---------- Hero ---------- */}
      <Frame hero>
        {/* Everything inside sits on a 28px rhythm, with 12px for the
            tightest pairs. Nesting the headline and buttons into one
            block keeps them reading as a single unit. */}
        <Card className="relative flex flex-col gap-7 p-8 sm:p-11">
          <HeroBackdrop />

          {/* Identity */}
          <div className="relative z-[1] flex items-center gap-5">
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
              <h2 className="text-lg font-medium text-ink">Vivek M</h2>
              <p className="text-base text-body">AI Product Builder</p>
            </div>
          </div>

          {/* Headline + actions, one unit */}
          <div className="relative z-[1] flex flex-col gap-7">
            {/* 80% keeps the copy clear of the backdrop grid */}
            <div className="flex max-w-full flex-col gap-3 sm:max-w-[80%]">
              <h1 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-ink sm:text-2xl">
                I turn messy ideas into shipped AI products.
              </h1>
              <p className="text-md text-body">
                Product-first. Execution-obsessed. AI-native. I operate at the
                intersection of product thinking and technical execution.
                Started in design, scaled into shipping full-stack systems, now
                focused on AI-native products. I don&apos;t just explore ideas,
                I ship them.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                href="mailto:purayathvivek@gmail.com?subject=Hey%20Vivek"
                variant="primary"
                className="w-full sm:w-auto"
              >
                Book a Free Call
              </Button>
              <Button
                href="https://www.linkedin.com/in/vivek-m12/"
                variant="secondary"
                external
                className="w-full sm:w-auto"
              >
                See my LinkedIn
              </Button>
            </div>
          </div>
        </Card>
      </Frame>

      {/* ---------- Approach + LinkedIn ---------- */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <WorkApproachCard />
        <LinkedInCard />
      </div>

      {/* ---------- Focus ---------- */}
      <Panel className="flex flex-col gap-9 sm:gap-10">
        <SectionHeading
          label="What I focus on."
          title="Where I do my best work"
          subtitle="Four areas where product thinking and technical execution actually compound."
        />

        {/* 2px gaps on a grey frame turn into hairline rules between
            cards, a grid without drawing a single border. */}
        <div className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-card sm:grid-cols-2">
          {focusItems.map((item) => (
            <div
              key={item.num}
              className="flex min-h-[200px] flex-col justify-between gap-8 bg-surface p-6 sm:min-h-[240px] sm:p-8"
            >
              <span className="text-3xl text-body opacity-20">{item.num}</span>
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-normal text-ink">{item.title}</h3>
                <p className="text-base text-body">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* ---------- Skill stack ---------- */}
      <Section cardClassName="flex flex-col gap-7">
        <SectionHeading
          label="Skill stack."
          title="Tools and thinking I build with"
        />
        <div className="flex flex-wrap gap-2">
          {skillItems.map((skill) => (
            <Pill key={skill.label}>
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: skill.color }}
              />
              {skill.label}
            </Pill>
          ))}
        </div>
      </Section>

      {/* ---------- Quote ---------- */}
      <Frame>
        <Card className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-16 sm:py-14">
          <blockquote className="max-w-[46ch] text-xl font-normal text-ink">
            Leverage isn&apos;t just code or capital, it&apos;s clarity. The
            clearer your thinking, the faster your systems compound.
          </blockquote>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-line" />
            <span className="text-sm font-medium uppercase tracking-[0.04em] text-muted">
              Vivek
            </span>
            <span className="h-px w-8 bg-line" />
          </div>
        </Card>
      </Frame>
    </div>
  );
}
