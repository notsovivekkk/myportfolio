"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Frame,
  Card,
  Panel,
  Section,
  SectionHeading,
  Pill,
} from "@/components/ui/Primitives";

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
    title: "Intelligence",
    desc: "Finding who needs it and when. ICP research, signal detection, buying window identification.",
  },
  {
    num: "02",
    title: "Infrastructure",
    desc: "Building the systems that find and enrich. Clay, Deepline, Claude Code, enrichment pipelines.",
  },
  {
    num: "03",
    title: "Execution",
    desc: "Running outreach that lands. Email infrastructure, deliverability, copy, campaigns, real results.",
  },
  {
    num: "04",
    title: "Automation",
    desc: "Making it run itself. Decision engines, agents, deployed tools that work without constant input.",
  },
];

const workSteps = [
  "Understanding the ICP",
  "Mapping the signals",
  "Building the list",
  "Enriching the data",
  "Crafting the message",
  "Launching the campaign",
];

const tools = [
  { name: "Clay", src: "/images/tools/clay.png" },
  { name: "Cursor", src: "/images/tools/cursor.png" },
  { name: "HeyReach", src: "/images/tools/heyreach.png" },
  { name: "Deepline", src: "/images/tools/deepline.png" },
  { name: "Instantly", src: "/images/tools/instantly.png" },
  { name: "Smartlead", src: "/images/tools/smartlead.png" },
  { name: "Claude", src: "/images/tools/claude.png" },
  { name: "ChatGPT", src: "/images/tools/chatgpt.png" },
  { name: "Apollo", src: "/images/tools/apollo.png" },
  { name: "Prospeo", src: "/images/tools/prospeo.png" },
  { name: "Apify", src: "/images/tools/apify.png" },
  { name: "Python", src: "/images/tools/python.png" },
  { name: "Framer", src: "/images/tools/framer.png" },
  { name: "Webflow", src: "/images/tools/webflow.png" },
];

/* The five layers, top to bottom, with the feedback arc closing the
   loop back to Signal. Names only: naming tools here would date the
   diagram and duplicate the marquee below it. */
const gtmLayers = ["Signal", "Enrichment", "Intelligence", "Action", "Feedback"];

const LAYER_CYCLE = 9; // seconds for one pass plus the return
const LAYER_H = 30; // plate height
const LAYER_GAP = 6;
const LAYER_PITCH = LAYER_H + LAYER_GAP;

/* ------------------------------------------------------------------
   The GTM system, running quietly beside the claim it supports.
   Built from the same rounded plates and soft shadows as the rest of
   the page, so it reads as an object on the page rather than a
   schematic pasted onto it.
   ------------------------------------------------------------------ */
function GtmSystemDiagram() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-11 top-1/2 hidden w-[206px] -translate-y-1/2 md:block"
    >
      <div className="relative">
        {/* The light that travels down behind the stack. Blurred and
            wider than the plates so the falloff is what you notice,
            not an edge. */}
        <span
          className="absolute inset-x-[-14px] top-[-13px] h-[56px] rounded-full"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(10,10,10,0.13) 0%, rgba(10,10,10,0) 72%)",
            filter: "blur(5px)",
            animation: `layerLight ${LAYER_CYCLE}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
          }}
        />

        <ul
          className="relative flex flex-col"
          style={{ gap: LAYER_GAP, width: 172 }}
        >
          {gtmLayers.map((layer, i) => (
            <li
              key={layer}
              className="flex items-center rounded-[9px] px-3.5"
              style={{
                height: LAYER_H,
                backgroundColor: "#F3F4F6",
                color: "#9CA3AF",
                animation: `layerPlate ${LAYER_CYCLE}s ${(
                  i * 0.15 * LAYER_CYCLE
                ).toFixed(2)}s ease-in-out infinite`,
              }}
            >
              <span className="text-[9.5px] font-medium uppercase tracking-[0.16em]">
                {layer}
              </span>
            </li>
          ))}
        </ul>

        {/* Feedback loop. A stroke that fades at both ends, so it
            suggests a return path without drawing a bracket. */}
        <svg
          className="absolute right-0"
          style={{
            top: LAYER_H / 2,
            height: LAYER_PITCH * (gtmLayers.length - 1),
            width: 28,
            animation: `layerLoop ${LAYER_CYCLE}s ease-in-out infinite`,
          }}
          viewBox="0 0 28 144"
          fill="none"
        >
          <defs>
            <linearGradient id="pf-loop" x1="0" y1="144" x2="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0A0A0A" stopOpacity="0" />
              <stop offset="0.45" stopColor="#0A0A0A" stopOpacity="0.3" />
              <stop offset="1" stopColor="#0A0A0A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M1 142 C 25 130, 25 14, 1 2"
            stroke="url(#pf-loop)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Work approach.

   Dots on a rail read as a wireframe of a process rather than the
   process itself. This is a single soft surface that glides between
   the steps instead: one object moving, on a spring, with the numerals
   borrowed from the focus grid so the two sections rhyme. Nothing is
   drawn as a line, so there is nothing to look sharp.
   ------------------------------------------------------------------ */
const STEP_MS = 2000;
const STEP_H = 34;

function WorkApproachCard() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % workSteps.length),
      STEP_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <Frame className="h-full">
      <Card className="flex h-full flex-col p-5">
        <p className="text-sm text-body">How I work</p>

        <div className="relative mt-3">
          {/* The gliding surface. Spring easing gives it a little
              settle at the end of each move, which is what separates
              "considered" from "mechanical". */}
          <span
            className="absolute inset-x-[-12px] rounded-[10px] bg-frame"
            style={{
              height: STEP_H,
              transform: `translateY(${active * STEP_H}px)`,
              transition: "transform 620ms cubic-bezier(0.34, 1.36, 0.64, 1)",
            }}
          />

          <ul className="relative">
            {workSteps.map((step, i) => {
              const isActive = i === active;
              return (
                <li
                  key={step}
                  className="flex items-center gap-3"
                  style={{ height: STEP_H }}
                >
                  <span
                    className={`w-[16px] text-[10px] tabular-nums transition-colors duration-500 ease-default ${
                      isActive ? "text-ink" : "text-muted/70"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-base transition-colors duration-500 ease-default ${
                      isActive ? "font-medium text-ink" : "text-muted"
                    }`}
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
    </Frame>
  );
}

/* ------------------------------------------------------------------
   Tool agnosticism, stated then demonstrated.
   The claim is that the stack evolves, so the stack is the thing that
   moves while the sentence above it holds still.
   ------------------------------------------------------------------ */
function ToolsCard() {
  return (
    <Frame className="h-full">
      <Card className="flex h-full flex-col p-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium text-ink">
            Tools change. Systems don&apos;t.
          </h3>
          <p className="text-base text-body">
            I am tool agnostic. The stack evolves. The thinking behind it stays
            the same.
          </p>
        </div>

        {/* Masked at both edges so names dissolve instead of being
            chopped off by the card border. */}
        <div
          className="relative mt-auto overflow-hidden pt-6"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          {/* Listed twice; the keyframe travels exactly -50%, so the
              second copy is under the cursor when the first wraps. */}
          <div
            className="marquee-track flex items-center gap-6"
            style={{ animationDuration: "30s" }}
          >
            {[...tools, ...tools].map((tool, i) => (
              <span
                key={`${tool.name}-${i}`}
                title={tool.name}
                className="group relative flex h-7 w-7 shrink-0 items-center justify-center"
              >
                <Image
                  src={tool.src}
                  alt={tool.name}
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain transition-transform duration-300 ease-default group-hover:scale-110"
                />
              </span>
            ))}
          </div>
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
        {/* 28px rhythm, 12px for the tightest pairs. */}
        <Card className="relative flex flex-col gap-7 p-8 sm:p-11">
          <GtmSystemDiagram />

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
              <p className="text-base text-body">AI Native GTM-E</p>
            </div>
          </div>

          {/* Held to 58% so the copy never runs under the diagram */}
          <div className="relative z-[1] flex max-w-full flex-col gap-3 md:max-w-[58%]">
            <h1 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-ink sm:text-2xl">
              I build GTM systems that find the right people, at the right time,
              with the right message.
            </h1>
            <p className="text-md text-body">
              Clean lists. Right signals. Relevant outreach. I wire together
              data, AI, and messaging that lands because it is relevant, not
              because it is loud. Builder background. Revenue focus.
            </p>
          </div>
        </Card>
      </Frame>

      {/* ---------- Approach + tools ---------- */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <WorkApproachCard />
        <ToolsCard />
      </div>

      {/* ---------- Focus ---------- */}
      <Panel className="flex flex-col gap-9 sm:gap-10">
        <SectionHeading
          label="What I focus on."
          title="Where I do my best work"
          subtitle="Four areas where GTM thinking and technical execution actually compound."
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
