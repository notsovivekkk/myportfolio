"use client";

import { useState } from "react";
import Image from "next/image";
import BentoCard from "@/components/cards/BentoCard";

const skillItems = [
  { label: "Product Strategy", color: "#007AFF" },
  { label: "User Research", color: "#007AFF" },
  { label: "PRDs", color: "#007AFF" },
  { label: "Roadmapping", color: "#007AFF" },
  { label: "TypeScript", color: "#34C759" },
  { label: "Next.js", color: "#34C759" },
  { label: "React", color: "#34C759" },
  { label: "Python", color: "#34C759" },
  { label: "Node.js", color: "#34C759" },
  { label: "LLMs", color: "#AF52DE" },
  { label: "RAG Systems", color: "#AF52DE" },
  { label: "AI Agents", color: "#AF52DE" },
  { label: "Prompt Eng.", color: "#AF52DE" },
  { label: "Figma", color: "#FF9500" },
  { label: "UX Design", color: "#FF9500" },
];

const focusItems = [
  {
    num: "01",
    title: "AI Product Systems",
    desc: "From concept → shipped.",
    gradient: "from-blue-500 to-violet-500",
  },
  {
    num: "02",
    title: "Human-AI Interaction",
    desc: "Designing for trust and behavior.",
    gradient: "from-rose-400 to-orange-400",
  },
  {
    num: "03",
    title: "Customer Discovery",
    desc: "Turning conversations into product clarity.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    num: "04",
    title: "MVP Velocity",
    desc: "Shipping under ambiguity.",
    gradient: "from-amber-400 to-yellow-500",
  },
];

type PhotoTab = "grid" | "map" | "heart" | "sparkle";

const PhotosFlowerIcon = () => (
  <div className="w-9 h-9 rounded-[9px] bg-white/90 dark:bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center">
    <svg width="20" height="20" viewBox="0 0 28 28">
      {[
        { angle: 0, color: "#FF3B30" },
        { angle: 45, color: "#FF9500" },
        { angle: 90, color: "#FFCC00" },
        { angle: 135, color: "#34C759" },
        { angle: 180, color: "#5AC8FA" },
        { angle: 225, color: "#007AFF" },
        { angle: 270, color: "#5856D6" },
        { angle: 315, color: "#AF52DE" },
      ].map(({ angle, color }, i) => (
        <ellipse
          key={i}
          cx="14"
          cy="14"
          rx="3.2"
          ry="7"
          fill={color}
          opacity={0.9}
          transform={`rotate(${angle} 14 14)`}
        />
      ))}
      <circle cx="14" cy="14" r="3.5" fill="white" />
    </svg>
  </div>
);

const LinkedInIcon = () => (
  <div className="w-10 h-10 rounded-lg bg-[#0A66C2] flex items-center justify-center shadow-sm shrink-0">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  </div>
);

const ArrowIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

export default function HomeTab() {
  const [activePhotoTab, setActivePhotoTab] = useState<PhotoTab>("grid");

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Hero */}
        <BentoCard className="lg:col-span-6 p-7 sm:p-10 md:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-[40px] font-semibold tracking-tight mb-8 sm:mb-12 dark:text-white">
            <span className="text-primary dark:text-white font-bold">Vivek</span> is shipping{" "}
            <u className="decoration-2 underline-offset-4 decoration-black dark:decoration-white">AI products</u>.
          </h1>
          <div className="space-y-4 sm:space-y-6 text-[15px] sm:text-[17px] text-secondary dark:text-gray-400 leading-relaxed">
            <p>i turn messy ideas into shipped AI products.</p>
            <p>product-first.</p>
            <p>execution-obsessed.</p>
            <p>AI-native.</p>
            <p>
              i operate at the intersection of product thinking and technical execution. i started in design, scaled
              into shipping full-stack systems, and am now focused on AI-native products.
            </p>
            <p>i don&apos;t just explore ideas.</p>
            <p>i ship them.</p>
          </div>
        </BentoCard>

        {/* Right column */}
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
          {/* Photos + LinkedIn: stacked on mobile, side-by-side squares on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Photos */}
            <BentoCard className="!p-0 overflow-hidden">
              <div className="relative w-full h-[220px] sm:aspect-square sm:h-auto">
                <Image
                  src="/images/dp.jpg"
                  alt="Photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-3 right-3 z-10">
                  <PhotosFlowerIcon />
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-center z-10">
                  <div className="bg-white/50 dark:bg-black/30 backdrop-blur-xl backdrop-saturate-150 rounded-full px-1.5 py-1.5 flex items-center gap-1 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                    <TabIcon active={activePhotoTab === "grid"} onClick={() => setActivePhotoTab("grid")}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
                        <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
                        <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
                        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
                      </svg>
                    </TabIcon>
                    <TabIcon active={activePhotoTab === "map"} onClick={() => setActivePhotoTab("map")}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </TabIcon>
                    <TabIcon active={activePhotoTab === "heart"} onClick={() => setActivePhotoTab("heart")}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </TabIcon>
                    <TabIcon active={activePhotoTab === "sparkle"} onClick={() => setActivePhotoTab("sparkle")}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2c0 4-2 8-2 8s4-2 8-2c-4 0-8 2-8 2s2 4 2 8c0-4-2-8-2-8s-4 2-8 2c4 0 8-2 8-2S12 6 12 2z" />
                      </svg>
                    </TabIcon>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* LinkedIn */}
            <BentoCard className="sm:aspect-square p-5 sm:p-5 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 sm:gap-2.5 min-w-0">
                  <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 shrink-0">
                    <Image src="/images/dp.jpg" alt="Vivek M" width={40} height={40} className="object-cover w-full h-full" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[14px] sm:text-[13px] font-bold text-primary dark:text-white leading-tight truncate">Vivek M</h4>
                    <p className="text-xs sm:text-[11px] text-secondary dark:text-gray-500">@vivekm</p>
                  </div>
                </div>
                <LinkedInIcon />
              </div>
              <p className="text-[14px] sm:text-[12px] text-primary dark:text-gray-200 leading-relaxed sm:line-clamp-3">
                Building MVP&apos;s & AI Systems . Smart Context Coder{" "}
                <span className="text-[#0A66C2]">@growthbae</span>
              </p>
              <p className="text-xs sm:text-[11px] text-secondary dark:text-gray-500 mt-2 sm:mt-1.5">
                India · 2,153 followers · 500+ connections
              </p>
              <div className="mt-4 sm:mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-center">
                <span className="text-xs sm:text-[11px] font-semibold text-primary dark:text-gray-300 flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity">
                  View profile <ArrowIcon />
                </span>
              </div>
            </BentoCard>
          </div>

          {/* Focus fills remaining gap on desktop */}
          <BentoCard className="p-5 sm:p-6 flex-1">
            <h3 className="text-xs font-semibold text-muted dark:text-gray-500 tracking-widest uppercase mb-4 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>{" "}
              FOCUS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {focusItems.map((item) => (
                <div
                  key={item.num}
                  className="bg-bg dark:bg-white/5 rounded-2xl p-3 sm:p-4 border border-gray-100 dark:border-white/5"
                >
                  <span className={`text-[11px] font-bold tracking-wider bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                    {item.num}
                  </span>
                  <h4 className="text-[13px] sm:text-sm font-semibold text-primary dark:text-white mt-1.5 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-secondary dark:text-gray-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>

        {/* Skill Stack — same width as Hero */}
        <BentoCard className="lg:col-span-6 p-5 sm:p-6">
          <h3 className="text-xs font-semibold text-muted dark:text-gray-500 tracking-widest uppercase mb-4 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>{" "}
            SKILL STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {skillItems.map((skill) => (
              <span
                key={skill.label}
                className="group inline-flex items-center gap-1.5 bg-bg dark:bg-white/5 rounded-full px-3 py-1.5 text-xs font-medium text-secondary dark:text-gray-400 border border-gray-100 dark:border-white/5 cursor-default transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:text-primary dark:hover:text-white hover:border-gray-200 dark:hover:border-white/10"
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-150" style={{ backgroundColor: skill.color }} />
                {skill.label}
              </span>
            ))}
          </div>
        </BentoCard>

        {/* Quote — next to Skill Stack */}
        <BentoCard className="lg:col-span-6 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
          <span className="font-quote text-4xl sm:text-5xl text-muted/30 dark:text-white/10 leading-none select-none mb-2">&ldquo;</span>
          <blockquote className="font-quote italic text-[16px] sm:text-[19px] leading-relaxed text-primary dark:text-gray-200 max-w-md">
            Leverage isn&apos;t just code or capital — it&apos;s clarity. The clearer your thinking, the faster your systems compound.
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <span className="block w-8 h-px bg-muted/30 dark:bg-white/10" />
            <span className="text-xs font-semibold tracking-widest uppercase text-muted dark:text-gray-500">Vivek</span>
            <span className="block w-8 h-px bg-muted/30 dark:bg-white/10" />
          </div>
        </BentoCard>
      </div>
    </div>
  );
}

function TabIcon({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 ${
        active
          ? "bg-white/80 dark:bg-white/20 shadow-sm text-gray-800 dark:text-white"
          : "text-gray-500/70 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/60"
      }`}
    >
      {children}
    </button>
  );
}
