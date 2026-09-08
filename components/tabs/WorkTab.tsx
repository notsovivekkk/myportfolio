"use client";

import { useState, useEffect } from "react";
import {
  Frame,
  Card,
  Panel,
  SectionHeading,
  Eyebrow,
  Pill,
} from "@/components/ui/Primitives";

const PM_PHRASES = [
  "Deliberating...",
  "Scoping...",
  "Architecting...",
  "Roadmapping...",
  "Prioritising...",
  "Validating...",
];

/* ------------------------------------------------------------------
   Per-project preview animations.
   Each keeps its own accent tint, the color IS the project's
   identity, so it earns the exception to the neutral palette.
   ------------------------------------------------------------------ */

function AskAuriAnimation() {
  return (
    <div className="flex h-[170px] flex-col gap-3 overflow-hidden rounded-tile bg-[#F0EEFF] p-4 sm:h-[190px]">
      <div className="flex gap-2">
        {["Core", "Shadow", "Oracle"].map((p, i) => (
          <span
            key={p}
            className={`rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-medium ${
              i === 1 ? "bg-[#7C5CFC] text-white" : "bg-white/70 text-[#7C5CFC]"
            }`}
          >
            {p}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div
          className="flex justify-end"
          style={{ animation: "msgIn 0.5s ease-out 0.3s both" }}
        >
          <div className="max-w-[78%] rounded-2xl rounded-tr-sm bg-white px-3 py-1.5 text-xs text-body shadow-sm">
            I feel overwhelmed lately.
          </div>
        </div>
        <div
          className="flex justify-start"
          style={{ animation: "msgIn 0.5s ease-out 0.9s both" }}
        >
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-[#7C5CFC]/15 px-3 py-1.5 text-xs text-[#5B3FDB]">
            Let&apos;s explore that together.
          </div>
        </div>
        <div
          className="flex justify-start"
          style={{ animation: "msgIn 0.5s ease-out 1.5s both" }}
        >
          <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-[#7C5CFC]/15 px-3 py-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7C5CFC]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7C5CFC] [animation-delay:200ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7C5CFC] [animation-delay:400ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GryttAnimation() {
  return (
    <div className="flex h-[170px] items-stretch gap-2 overflow-hidden rounded-tile bg-[#FFF4E6] p-4 sm:h-[190px]">
      <div className="flex flex-1 flex-col gap-1.5 rounded-xl bg-white p-2.5 shadow-sm">
        <p className="mb-0.5 text-xs font-semibold uppercase tracking-[0.04em] text-[#FF9500]">
          Client Log
        </p>
        {["Bench Press", "Squat"].map((exercise, i) => (
          <div
            key={exercise}
            className="flex items-center gap-1.5 rounded-lg bg-orange-50 px-2 py-1.5"
          >
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FF9500] text-[9px] text-white"
              style={{
                animation: `checkTick 0.4s ease-out ${0.5 + i * 0.4}s both`,
              }}
            >
              ✓
            </span>
            <span className="truncate text-xs text-body">{exercise}</span>
          </div>
        ))}
      </div>

      <div className="flex w-5 shrink-0 flex-col items-center justify-center gap-1">
        <div
          className="h-2 w-2 rounded-full bg-[#FF9500]"
          style={{ animation: "syncPulse 2s linear infinite" }}
        />
        <div className="w-px flex-1 bg-[#FF9500]/20" />
        <div
          className="h-2 w-2 rounded-full bg-[#FF9500]"
          style={{ animation: "syncPulse 2s linear 1s infinite" }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 rounded-xl bg-white p-2.5 shadow-sm">
        <p className="mb-0.5 text-xs font-semibold uppercase tracking-[0.04em] text-[#FF9500]">
          Dashboard
        </p>
        {["Alex", "Jordan", "Sam"].map((client, i) => (
          <div
            key={client}
            className="flex items-center gap-1.5 rounded-lg bg-orange-50 px-2 py-1"
            style={{
              animation: `sectionFill 0.3s ease-out ${0.8 + i * 0.3}s both`,
            }}
          >
            <div className="h-3 w-3 shrink-0 rounded-full bg-[#FF9500]/50" />
            <span className="flex-1 truncate text-xs text-body">{client}</span>
            <div className="h-1.5 w-6 rounded-full bg-[#FF9500]/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ContextBridgeAnimation() {
  const sections = [
    "Problem Statement",
    "Key Decisions",
    "Open Threads",
    "Next Steps",
  ];

  return (
    <div className="flex h-[170px] flex-col overflow-hidden rounded-tile bg-[#E8FAF4] sm:h-[190px]">
      <div className="flex shrink-0 items-center gap-2 border-b border-line bg-white px-3 py-2">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-red-400" />
          <div className="h-2 w-2 rounded-full bg-yellow-400" />
          <div className="h-2 w-2 rounded-full bg-green-400" />
        </div>
        <div className="mx-1 h-4 flex-1 rounded-md bg-frame" />
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#34C759] text-[9px] font-bold text-white">
          C
        </div>
      </div>

      <div className="shrink-0 space-y-1.5 px-4 py-2 opacity-20">
        <div className="h-1.5 w-3/4 rounded bg-muted" />
        <div className="h-1.5 w-full rounded bg-muted" />
        <div className="h-1.5 w-2/3 rounded bg-muted" />
      </div>

      <div
        className="mx-3 mt-auto rounded-t-xl border border-line bg-white p-3 shadow-lg"
        style={{
          animation:
            "popupSlide 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both",
        }}
      >
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink">
          <span className="h-2 w-2 rounded-sm bg-[#34C759]" />
          Context Brief
        </div>
        <div className="grid grid-cols-2 gap-1">
          {sections.map((s, i) => (
            <div
              key={s}
              className="flex h-5 items-center rounded bg-[#34C759]/15 px-2 text-[9px] font-medium text-[#22A355]"
              style={{
                animation: `sectionFill 0.3s ease-out ${1 + i * 0.15}s both`,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComingSoonAnimation({ phrase }: { phrase: string }) {
  return (
    <div className="flex h-[170px] flex-col items-center justify-center gap-2 rounded-tile bg-frame sm:h-[190px]">
      <span
        className="inline-block select-none text-3xl leading-none text-muted"
        style={{ animation: "spinStar 4s linear infinite" }}
      >
        ✳
      </span>
      <span
        key={phrase}
        className="text-md text-body"
        style={{ animation: "phraseIn 0.4s ease-out both" }}
      >
        {phrase}
      </span>
      <span className="mt-1 text-sm uppercase tracking-[0.04em] text-muted">
        Coming soon
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------
   Project card, one shape, reused. Consistency across four cards is
   what makes them scannable side by side.
   ------------------------------------------------------------------ */
function ProjectCard({
  preview,
  category,
  title,
  status,
  problem,
  solution,
  tags,
  dimmed = false,
}: {
  preview: React.ReactNode;
  category: string;
  title: string;
  status: string;
  problem: string;
  solution: string;
  tags: string[];
  dimmed?: boolean;
}) {
  return (
    <Card className="flex flex-col gap-4 p-5 sm:p-6">
      {preview}

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-base text-body">{category}</p>
          <h3
            className={`text-lg font-medium ${dimmed ? "text-muted" : "text-ink"}`}
          >
            {title}
          </h3>
        </div>
        <span className="shrink-0 whitespace-nowrap pt-1 text-sm text-muted">
          {status}
        </span>
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-4">
        <div className="flex flex-col gap-1.5">
          <Eyebrow>Problem</Eyebrow>
          <p className="text-base text-body">{problem}</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Eyebrow>Solution</Eyebrow>
          <p className="text-base text-body">{solution}</p>
        </div>
      </div>

      {tags.length ? (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

/* ------------------------------------------------------------------
   Tab
   ------------------------------------------------------------------ */
export default function WorkTab() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % PM_PHRASES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* ---------- Projects ---------- */}
      <Panel hero className="flex flex-col gap-9 sm:gap-10">
        <SectionHeading
          label="Selected work."
          title="Case Studies & Projects"
          subtitle="A selection of products showcasing strategy, design thinking, and measurable impact."
        />

        <div className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-card md:grid-cols-2">
          <ProjectCard
            preview={<AskAuriAnimation />}
            category="AI Product"
            title="AskAuri"
            status="Production ready"
            problem="Therapy is expensive, appointment-based, and unavailable when you actually need it."
            solution="AI therapy with distinct personas that adapt to your personality. Structured, not a generic chatbot. Available any time."
            tags={["AI Product", "Subscription SaaS", "UX Design", "0 to 1"]}
          />

          <ProjectCard
            preview={<GryttAnimation />}
            category="Mobile + Web"
            title="Grytt"
            status="App Store + Play"
            problem="Coaches manage clients across WhatsApp, sheets and DMs. No single place to see how someone is actually progressing."
            solution="Clients log workouts on mobile. Trainers see live strength and rep progression on a dashboard. No chasing, no reporting. Data just appears."
            tags={["Mobile + Web", "B2B SaaS", "Dual Surface", "0 to 1"]}
          />

          <ProjectCard
            preview={<ContextBridgeAnimation />}
            category="Developer Tool"
            title="ContextBridge"
            status="Shipped in 1 day"
            problem="When an LLM session hits the context limit everything has to be re-explained from scratch. Happens 3 to 4 times on a heavy day."
            solution="Captures the session, generates a structured handoff brief via Claude API in one click. Works across Claude, ChatGPT and Gemini. Pick up exactly where you left off."
            tags={["Chrome Extension", "Developer Tool", "Solo Build", "1 Day Ship"]}
          />

          <ProjectCard
            preview={<ComingSoonAnimation phrase={PM_PHRASES[phraseIndex]} />}
            category="In discovery"
            title="Next Project"
            status="Scoping"
            problem="Something new is being built. Problem space identified, still being pressure-tested."
            solution="Scoping begins soon. Check back, or reach out if you want to build it with me."
            tags={[]}
            dimmed
          />
        </div>
      </Panel>

      {/* ---------- GrowthBae ---------- */}
      <Frame hero>
        <Card className="flex flex-col overflow-hidden">
          <div className="flex flex-col gap-7 p-8 sm:p-11">
            <SectionHeading
              label="Background."
              title="GrowthBae, Founder"
              subtitle="4 years of building brands, websites, and digital products for football clubs, sports agencies, and lifestyle brands across the US and UK. Where my product instincts were built."
            />

            <div className="flex gap-10">
              <div className="flex flex-col gap-1.5">
                <span className="text-3xl font-medium text-ink">4+</span>
                <span className="text-base text-body">Years</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-3xl font-medium text-ink">30+</span>
                <span className="text-base text-body">Projects</span>
              </div>
            </div>
          </div>

          {/* Marquee, masked at both edges so work scrolls out of view
              rather than getting clipped by a hard boundary. */}
          <div
            className="relative w-full overflow-hidden border-t border-line"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            }}
          >
            <div className="marquee-track flex gap-3 py-5">
              {[
                "/images/lp1.jpg",
                "/images/lp2.jpg",
                "/images/lp5.png",
                "/images/lp6.png",
                "/images/lp1.jpg",
                "/images/lp2.jpg",
                "/images/lp5.png",
                "/images/lp6.png",
              ].map((src, i) => (
                <div
                  key={i}
                  className="h-[140px] w-[220px] shrink-0 overflow-hidden rounded-tile bg-frame sm:h-[170px] sm:w-[280px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`GrowthBae work ${(i % 4) + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Frame>
    </div>
  );
}
