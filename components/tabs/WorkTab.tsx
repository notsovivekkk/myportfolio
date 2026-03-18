"use client";

import { useState, useEffect } from "react";
import BentoCard from "@/components/cards/BentoCard";

const PM_PHRASES = [
  "Deliberating...",
  "Scoping...",
  "Architecting...",
  "Roadmapping...",
  "Prioritising...",
  "Validating...",
];

function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center bg-bg dark:bg-white/5 rounded-full px-3 py-1 text-xs font-medium text-secondary dark:text-gray-400 border border-gray-200 dark:border-white/8">
      {label}
    </span>
  );
}

function AskAuriAnimation() {
  return (
    <div className="h-[150px] sm:h-[180px] bg-[#F0EEFF] dark:bg-[#1E1830] rounded-2xl overflow-hidden p-4 flex flex-col gap-3">
      {/* Persona pills */}
      <div className="flex gap-2">
        {["Core", "Shadow", "Oracle"].map((p, i) => (
          <span
            key={p}
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
              i === 1
                ? "bg-[#7C5CFC] text-white"
                : "bg-white/70 text-[#7C5CFC]"
            }`}
          >
            {p}
          </span>
        ))}
      </div>
      {/* Chat messages */}
      <div className="flex flex-col gap-2">
        <div
          className="flex justify-end"
          style={{ animation: "msgIn 0.5s ease-out 0.3s both" }}
        >
          <div className="bg-white rounded-2xl rounded-tr-sm px-3 py-1.5 text-[11px] text-gray-500 max-w-[78%] shadow-sm">
            I feel overwhelmed lately.
          </div>
        </div>
        <div
          className="flex justify-start"
          style={{ animation: "msgIn 0.5s ease-out 0.9s both" }}
        >
          <div className="bg-[#7C5CFC]/15 rounded-2xl rounded-tl-sm px-3 py-1.5 text-[11px] text-[#5B3FDB] dark:text-[#A78BFA] max-w-[80%]">
            Let&apos;s explore that together.
          </div>
        </div>
        <div
          className="flex justify-start"
          style={{ animation: "msgIn 0.5s ease-out 1.5s both" }}
        >
          <div className="bg-[#7C5CFC]/15 rounded-2xl rounded-tl-sm px-3 py-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#7C5CFC] rounded-full animate-pulse" />
            <span className="w-1.5 h-1.5 bg-[#7C5CFC] rounded-full animate-pulse [animation-delay:200ms]" />
            <span className="w-1.5 h-1.5 bg-[#7C5CFC] rounded-full animate-pulse [animation-delay:400ms]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GryttpAnimation() {
  return (
    <div className="h-[150px] sm:h-[180px] bg-[#FFF4E6] dark:bg-[#1F1500] rounded-2xl overflow-hidden p-4 flex items-stretch gap-2">
      {/* Mobile — client log */}
      <div className="flex-1 bg-white dark:bg-white/8 rounded-xl p-2.5 flex flex-col gap-1.5 shadow-sm">
        <p className="text-[9px] font-bold text-[#FF9500] tracking-widest uppercase mb-0.5">
          Client Log
        </p>
        {["Bench Press", "Squat"].map((exercise, i) => (
          <div
            key={exercise}
            className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 rounded-lg px-2 py-1.5"
          >
            <span
              className="w-4 h-4 rounded-full bg-[#FF9500] flex items-center justify-center text-white text-[9px] shrink-0"
              style={{ animation: `checkTick 0.4s ease-out ${0.5 + i * 0.4}s both` }}
            >
              ✓
            </span>
            <span className="text-[10px] text-gray-600 dark:text-gray-300 truncate">
              {exercise}
            </span>
          </div>
        ))}
      </div>

      {/* Sync indicator */}
      <div className="flex flex-col items-center justify-center w-5 gap-1 shrink-0">
        <div
          className="w-2 h-2 bg-[#FF9500] rounded-full"
          style={{ animation: "syncPulse 2s linear infinite" }}
        />
        <div className="w-px flex-1 bg-[#FF9500]/20" />
        <div
          className="w-2 h-2 bg-[#FF9500] rounded-full"
          style={{ animation: "syncPulse 2s linear 1s infinite" }}
        />
      </div>

      {/* Web — trainer dashboard */}
      <div className="flex-1 bg-white dark:bg-white/8 rounded-xl p-2.5 flex flex-col gap-1.5 shadow-sm">
        <p className="text-[9px] font-bold text-[#FF9500] tracking-widest uppercase mb-0.5">
          Dashboard
        </p>
        {["Alex", "Jordan", "Sam"].map((client, i) => (
          <div
            key={client}
            className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 rounded-lg px-2 py-1"
            style={{ animation: `sectionFill 0.3s ease-out ${0.8 + i * 0.3}s both` }}
          >
            <div className="w-3 h-3 rounded-full bg-[#FF9500]/50 shrink-0" />
            <span className="text-[10px] text-gray-600 dark:text-gray-300 flex-1 truncate">
              {client}
            </span>
            <div className="w-6 h-1.5 bg-[#FF9500]/30 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ContextBridgeAnimation() {
  const sections = ["Problem Statement", "Key Decisions", "Open Threads", "Next Steps"];
  return (
    <div className="h-[150px] sm:h-[180px] bg-[#E8FAF4] dark:bg-[#0A1F15] rounded-2xl overflow-hidden flex flex-col">
      {/* Browser chrome */}
      <div className="bg-white dark:bg-white/8 border-b border-gray-100 dark:border-white/8 px-3 py-2 flex items-center gap-2 shrink-0">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-gray-100 dark:bg-white/10 rounded-md h-4 mx-1" />
        <div className="w-5 h-5 bg-[#34C759] rounded-md flex items-center justify-center text-white text-[9px] font-bold shrink-0">
          C
        </div>
      </div>

      {/* Blurred page content */}
      <div className="px-4 py-2 opacity-20 space-y-1.5 shrink-0">
        <div className="h-1.5 bg-gray-400 rounded w-3/4" />
        <div className="h-1.5 bg-gray-400 rounded w-full" />
        <div className="h-1.5 bg-gray-400 rounded w-2/3" />
      </div>

      {/* Extension popup sliding up */}
      <div
        className="mx-3 bg-white dark:bg-[#111] rounded-t-xl shadow-lg border border-gray-100 dark:border-white/10 p-3 mt-auto"
        style={{ animation: "popupSlide 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both" }}
      >
        <div className="text-[10px] font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 bg-[#34C759] rounded-sm" />
          Context Brief
        </div>
        <div className="grid grid-cols-2 gap-1">
          {sections.map((s, i) => (
            <div
              key={s}
              className="h-5 bg-[#34C759]/15 rounded text-[9px] text-[#22A355] dark:text-[#4ADE80] flex items-center px-2 font-medium"
              style={{ animation: `sectionFill 0.3s ease-out ${1 + i * 0.15}s both` }}
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
    <div className="h-[150px] sm:h-[180px] rounded-2xl bg-[#F0F0F0] dark:bg-white/5 flex flex-col items-center justify-center gap-2">
      <span
        className="text-3xl text-muted dark:text-white/50 select-none leading-none inline-block"
        style={{ animation: "spinStar 4s linear infinite" }}
      >
        ✳
      </span>
      <span
        key={phrase}
        className="text-sm font-medium text-secondary dark:text-gray-400 italic"
        style={{ animation: "phraseIn 0.4s ease-out both" }}
      >
        {phrase}
      </span>
      <span className="text-[10px] tracking-widest uppercase text-muted/60 dark:text-white/25 mt-1">
        Coming soon
      </span>
    </div>
  );
}

export default function WorkTab() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % PM_PHRASES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

      {/* AskAuri */}
      <BentoCard className="p-5 sm:p-7 flex flex-col gap-3 sm:gap-5">
        <AskAuriAnimation />
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-primary dark:text-white">AskAuri</h3>
            <span className="text-xs font-semibold text-muted dark:text-gray-500">Production ready</span>
          </div>
          <div className="border-t border-gray-200 dark:border-white/8 pt-2 sm:pt-3 mb-2 sm:mb-3 space-y-2 sm:space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted dark:text-gray-500 tracking-widest uppercase mb-1.5">Problem</p>
              <p className="text-[12px] sm:text-[15px] text-secondary dark:text-gray-400 leading-relaxed">Therapy is expensive, appointment-based, and unavailable when you actually need it.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted dark:text-gray-500 tracking-widest uppercase mb-1.5">Solution</p>
              <p className="text-[12px] sm:text-[15px] text-secondary dark:text-gray-400 leading-relaxed">AI therapy with distinct personas that adapt to your personality. Structured, not a generic chatbot. Available any time.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["AI Product", "Subscription SaaS", "UX Design", "0 to 1"].map((t) => (
              <TagPill key={t} label={t} />
            ))}
          </div>
        </div>
      </BentoCard>

      {/* Grytt */}
      <BentoCard className="p-5 sm:p-7 flex flex-col gap-3 sm:gap-5">
        <GryttpAnimation />
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-primary dark:text-white">Grytt</h3>
            <span className="text-xs font-semibold text-muted dark:text-gray-500">App Store + Play</span>
          </div>
          <div className="border-t border-gray-200 dark:border-white/8 pt-2 sm:pt-3 mb-2 sm:mb-3 space-y-2 sm:space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted dark:text-gray-500 tracking-widest uppercase mb-1.5">Problem</p>
              <p className="text-[12px] sm:text-[15px] text-secondary dark:text-gray-400 leading-relaxed">Coaches manage clients across WhatsApp, sheets and DMs. No single place to see how someone is actually progressing.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted dark:text-gray-500 tracking-widest uppercase mb-1.5">Solution</p>
              <p className="text-[12px] sm:text-[15px] text-secondary dark:text-gray-400 leading-relaxed">Clients log workouts on mobile. Trainers see live strength and rep progression on a dashboard. No chasing, no reporting. Data just appears.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Mobile + Web", "B2B SaaS", "Dual Surface", "0 to 1"].map((t) => (
              <TagPill key={t} label={t} />
            ))}
          </div>
        </div>
      </BentoCard>

      {/* ContextBridge */}
      <BentoCard className="p-5 sm:p-7 flex flex-col gap-3 sm:gap-5">
        <ContextBridgeAnimation />
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-primary dark:text-white">ContextBridge</h3>
            <span className="text-xs font-semibold text-muted dark:text-gray-500">Shipped in 1 day</span>
          </div>
          <div className="border-t border-gray-200 dark:border-white/8 pt-2 sm:pt-3 mb-2 sm:mb-3 space-y-2 sm:space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted dark:text-gray-500 tracking-widest uppercase mb-1.5">Problem</p>
              <p className="text-[12px] sm:text-[15px] text-secondary dark:text-gray-400 leading-relaxed">When an LLM session hits the context limit everything has to be re-explained from scratch. Happens 3 to 4 times on a heavy day.</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted dark:text-gray-500 tracking-widest uppercase mb-1.5">Solution</p>
              <p className="text-[12px] sm:text-[15px] text-secondary dark:text-gray-400 leading-relaxed">Captures the session, generates a structured handoff brief via Claude API in one click. Works across Claude, ChatGPT and Gemini. Pick up exactly where you left off.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Chrome Extension", "Developer Tool", "Solo Build", "1 Day Ship"].map((t) => (
              <TagPill key={t} label={t} />
            ))}
          </div>
        </div>
      </BentoCard>

      {/* Coming Soon — hidden on mobile */}
      <BentoCard className="hidden sm:flex p-7 sm:p-8 flex-col gap-5">
        <ComingSoonAnimation phrase={PM_PHRASES[phraseIndex]} />
        <div>
          <div className="mb-2" />
          <p className="text-sm text-muted/60 dark:text-gray-600 italic mb-2">
            Something new is being built.
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-muted/40 dark:text-white/20 mb-4">Next Project</h3>
          <div className="border-t border-gray-200/50 dark:border-white/5 pt-3">
            <p className="text-xs font-semibold text-muted/50 dark:text-gray-600 tracking-widest uppercase mb-2">
              Status
            </p>
            <p className="text-[15px] text-muted/60 dark:text-gray-600 leading-relaxed">
              In discovery. Problem space identified. Scoping begins soon.
            </p>
          </div>
        </div>
      </BentoCard>

      {/* GrowthBae strip */}
      <BentoCard className="md:col-span-2 pt-5 sm:pt-8 overflow-hidden">
        {/* Top info row */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 px-5 sm:px-8 pb-5 sm:pb-6">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted dark:text-gray-500 mb-2">
              Background
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-primary dark:text-white mb-2 leading-snug">
              GrowthBae — Founder
            </h3>
            <p className="text-[15px] text-secondary dark:text-gray-400 leading-relaxed max-w-lg">
              4 years of building brands, websites, and digital products for football clubs, sports agencies, and lifestyle brands across the US and UK. Where my product instincts were built.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-row gap-8 shrink-0">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-primary dark:text-white leading-none">4+</p>
              <p className="text-xs text-muted dark:text-gray-500 mt-1">Years</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-primary dark:text-white leading-none">30+</p>
              <p className="text-xs text-muted dark:text-gray-500 mt-1">Projects</p>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative w-full overflow-hidden border-t border-gray-100 dark:border-white/6">
          <div className="flex gap-3 py-4 marquee-track">
            {["/images/lp1.jpg", "/images/lp2.jpg", "/images/lp5.png", "/images/lp6.png",
              "/images/lp1.jpg", "/images/lp2.jpg", "/images/lp5.png", "/images/lp6.png"].map((src, i) => (
              <div
                key={i}
                className="shrink-0 w-[220px] sm:w-[280px] h-[140px] sm:h-[170px] rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5"
              >
                <img
                  src={src}
                  alt={`GrowthBae work ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </BentoCard>

    </div>
  );
}
