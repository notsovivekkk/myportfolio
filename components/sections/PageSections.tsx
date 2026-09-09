"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Frame,
  Card,
  Panel,
  SectionHeading,
} from "@/components/ui/Primitives";
import StorySection from "@/components/sections/StorySection";
import BackgroundSection from "@/components/sections/BackgroundSection";
import ContactCta from "@/components/sections/ContactCta";
import ClosingQuote from "@/components/sections/ClosingQuote";
import PersonalSection from "@/components/sections/PersonalSection";

/* ------------------------------------------------------------------
   Content
   ------------------------------------------------------------------ */

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
export default function PageSections() {
  return (
    <div className="flex flex-col gap-5">
      {/* ---------- Hero ---------- */}
      <Frame hero>
        {/* 28px rhythm, 12px for the tightest pairs. */}
        <Card className="flex flex-col gap-7 p-8 sm:p-11 sm:pl-14">
          {/* Identity */}
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
              <h2 className="text-lg font-medium text-ink">Vivek M</h2>
              <p className="text-base text-body">AI Native GTM-E</p>
            </div>
          </div>

          {/* Capped so the line length stays readable, not because anything
              sits to the right of it any more */}
          <div className="flex max-w-full flex-col gap-3 md:max-w-[72%]">
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

      {/* ---------- Story ---------- */}
      <div id="story" className="scroll-mt-24">
        <StorySection />
      </div>

      {/* ---------- Background ---------- */}
      <div id="background" className="scroll-mt-24">
        <BackgroundSection />
      </div>

      {/* ---------- Contact ---------- */}
      <div id="contact" className="scroll-mt-24">
        <ContactCta />
      </div>

      {/* ---------- Off the clock ---------- */}
      <PersonalSection />

      {/* ---------- Closing ---------- */}
      <ClosingQuote />
    </div>
  );
}
