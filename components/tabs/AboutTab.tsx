"use client";

import { useState } from "react";
import Image from "next/image";
import BentoCard from "@/components/cards/BentoCard";

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
      className={`p-2 rounded-full transition-all duration-200 ${
        active
          ? "bg-white/80 dark:bg-white/20 shadow-sm text-gray-800 dark:text-white"
          : "text-gray-500/70 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/60"
      }`}
    >
      {children}
    </button>
  );
}

export default function AboutTab() {
  const [activePhotoTab, setActivePhotoTab] = useState<PhotoTab>("grid");

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left — Text heavy card */}
        <BentoCard className="lg:col-span-6 p-5 sm:p-10 md:p-12">
          <div className="space-y-5 sm:space-y-8">
            <blockquote className="font-quote italic text-[14px] sm:text-[19px] font-semibold text-primary dark:text-white leading-relaxed border-l-2 border-muted/30 pl-5">
              &ldquo;A thing of beauty is a joy forever.&rdquo;
            </blockquote>

            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted dark:text-gray-500 tracking-widest uppercase">Background</p>
              <p className="text-[13px] sm:text-[17px] text-secondary dark:text-gray-400 leading-relaxed">
                Born in Kerala, grew up partly in Saudi Arabia, came back, finished school, got into engineering.
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted dark:text-gray-500 tracking-widest uppercase">Journey</p>
              <p className="text-[13px] sm:text-[17px] text-secondary dark:text-gray-400 leading-relaxed">
                Started editing videos freelance, got curious, co-founded a design agency deep in the football world. Took on a website project without knowing how to build one, learned Webflow, over-delivered. Then AI happened and I got completely obsessed. Now I sit somewhere between a PM and a builder and that&apos;s exactly where I want to be.
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted dark:text-gray-500 tracking-widest uppercase">Outside work</p>
              <p className="text-[13px] sm:text-[17px] text-secondary dark:text-gray-400 leading-relaxed">
                Gym at least twice a week. Shoot photos, care a lot about how they turn out. Hardcore Real Madrid fan. Modern outlook. Old school feelings.
              </p>
            </div>
          </div>
        </BentoCard>

        {/* Right — Gallery + Instagram top row, Song below */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">

          {/* Gallery card */}
          <BentoCard className="col-span-2 sm:col-span-1 !p-0 overflow-hidden">
            <div className="relative w-full h-[220px] sm:aspect-square sm:h-auto">
              <Image
                src={
                  activePhotoTab === "grid" ? "/images/dp.jpg" :
                  activePhotoTab === "map"  ? "/images/igdp.jpg" :
                  activePhotoTab === "heart" ? "/images/beach.jpg" :
                  "/images/rma.jpg"
                }
                alt="Photo"
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute top-3 right-3 z-10">
                <PhotosFlowerIcon />
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-center z-10">
                <div className="bg-white/50 dark:bg-black/30 backdrop-blur-xl backdrop-saturate-150 rounded-full px-1.5 py-1.5 flex items-center gap-0.5 shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
                  <TabIcon active={activePhotoTab === "grid"} onClick={() => setActivePhotoTab("grid")}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
                      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
                      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
                      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
                    </svg>
                  </TabIcon>
                  <TabIcon active={activePhotoTab === "map"} onClick={() => setActivePhotoTab("map")}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </TabIcon>
                  <TabIcon active={activePhotoTab === "heart"} onClick={() => setActivePhotoTab("heart")}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </TabIcon>
                  <TabIcon active={activePhotoTab === "sparkle"} onClick={() => setActivePhotoTab("sparkle")}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2c0 4-2 8-2 8s4-2 8-2c-4 0-8 2-8 2s2 4 2 8c0-4-2-8-2-8s-4 2-8 2c4 0 8-2 8-2S12 6 12 2z" />
                    </svg>
                  </TabIcon>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Instagram card */}
          <BentoCard className="col-span-2 sm:col-span-1 sm:aspect-square p-5 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 sm:gap-2.5 min-w-0">
                <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 shrink-0">
                  <Image src="/images/igdp.jpg" alt="Vivekkk" width={40} height={40} className="object-cover w-full h-full" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[14px] sm:text-[13px] font-bold text-primary dark:text-white leading-tight truncate">Vivekkk</h4>
                  <p className="text-xs sm:text-[11px] text-secondary dark:text-gray-500">@notso_vivekkk</p>
                </div>
              </div>
              {/* Instagram icon */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </div>
            <p className="text-[14px] sm:text-[12px] text-primary dark:text-gray-200 leading-relaxed sm:line-clamp-3">
              Modern outlook &amp; old school feelings. 🧬
            </p>
            <p className="text-xs sm:text-[11px] text-secondary dark:text-gray-500 mt-2 sm:mt-1.5">
              Kerala, India · 1,591 followers
            </p>
            <div className="mt-4 sm:mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-center">
              <a
                href="https://www.instagram.com/notso_vivekkk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-[11px] font-semibold text-primary dark:text-gray-300 flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              >
                Stalk here
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </a>
            </div>
          </BentoCard>

          {/* Song card */}
          <BentoCard className="col-span-2 sm:col-span-1 h-[220px] sm:h-auto sm:aspect-square flex flex-col overflow-hidden !p-0">
            <div className="relative flex-1 overflow-hidden">
              <Image
                src="/images/song.jpg"
                alt="Am I Dreaming"
                fill
                className="object-cover"
              />
              {/* Play button overlay */}
              <a
                href="https://open.spotify.com/track/6Ec5LeRzkisa5KJtwLfOoW"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#111111">
                    <path d="M8 5.14v14l11-7-11-7z"/>
                  </svg>
                </div>
              </a>
            </div>
            {/* Info strip */}
            <div className="px-4 py-3 bg-card dark:bg-[#1a1a1a]">
              <p className="text-sm font-bold text-primary dark:text-white leading-tight">Am I Dreaming</p>
              <p className="text-xs text-muted dark:text-gray-500 mt-0.5">Metro Boomin · A$AP Rocky</p>
            </div>
          </BentoCard>

          {/* Email card */}
          <a href="mailto:purayathvivek@gmail.com?subject=Hey%20Vivek" className="col-span-2 sm:col-span-1 block">
            <BentoCard className="sm:aspect-square p-5 flex flex-col items-center justify-center text-center cursor-pointer group h-full">
              <div style={{ animation: "float 3s ease-in-out infinite" }}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted dark:text-gray-400"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <p className="text-[13px] font-semibold text-primary dark:text-white mt-4 leading-tight">
                Say hi.
              </p>
              <p className="text-[11px] text-secondary dark:text-gray-500 mt-1.5 leading-relaxed">
                purayathvivek@gmail.com
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 w-full flex justify-center">
                <span className="text-[11px] font-semibold text-primary dark:text-gray-300 flex items-center gap-1.5 group-hover:opacity-70 transition-opacity">
                  Send email
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                </span>
              </div>
            </BentoCard>
          </a>

        </div>
      </div>
    </div>
  );
}
