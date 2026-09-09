"use client";

import { useState } from "react";
import Image from "next/image";
import { Panel, Card, SectionHeading } from "@/components/ui/Primitives";

type PhotoTab = "grid" | "map" | "heart" | "sparkle";

const photos: Record<PhotoTab, { src: string; alt: string }> = {
  grid: { src: "/images/dp.jpg", alt: "Portrait" },
  map: { src: "/images/igdp.jpg", alt: "On location" },
  heart: { src: "/images/beach.jpg", alt: "Beach" },
  sparkle: { src: "/images/rma.jpg", alt: "Real Madrid" },
};

function TabIcon({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`rounded-full p-2 transition-all duration-200 ease-default ${
        active
          ? "bg-white/85 text-ink shadow-sm"
          : "text-white/70 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export default function PersonalSection() {
  const [activePhotoTab, setActivePhotoTab] = useState<PhotoTab>("grid");
  const photo = photos[activePhotoTab];

  return (
    <Panel className="flex flex-col gap-9 sm:gap-10">
      <SectionHeading
        label="Off the clock."
        title="The rest of it"
        subtitle="Photos I took, and whatever is on repeat."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Photos */}
        <Card className="relative aspect-square overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
          />
          {/* Scrim so the controls stay legible over any photo */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
          <div className="absolute inset-x-3 bottom-3 flex justify-center">
            <div className="flex items-center gap-0.5 rounded-[var(--radius-pill)] bg-black/25 p-1.5 backdrop-blur-xl">
              <TabIcon
                active={activePhotoTab === "grid"}
                onClick={() => setActivePhotoTab("grid")}
                label="Portrait"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
                  <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
                  <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
                  <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
                </svg>
              </TabIcon>
              <TabIcon
                active={activePhotoTab === "map"}
                onClick={() => setActivePhotoTab("map")}
                label="On location"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </TabIcon>
              <TabIcon
                active={activePhotoTab === "heart"}
                onClick={() => setActivePhotoTab("heart")}
                label="Beach"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </TabIcon>
              <TabIcon
                active={activePhotoTab === "sparkle"}
                onClick={() => setActivePhotoTab("sparkle")}
                label="Real Madrid"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2c0 4-2 8-2 8s4-2 8-2c-4 0-8 2-8 2s2 4 2 8c0-4-2-8-2-8s-4 2-8 2c4 0 8-2 8-2S12 6 12 2z" />
                </svg>
              </TabIcon>
            </div>
          </div>
        </Card>

        {/* Song */}
        <Card className="relative aspect-square overflow-hidden">
          <Image
            src="/images/song.jpg"
            alt="Am I Dreaming"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
          />
          <a
            href="https://open.spotify.com/track/6Ec5LeRzkisa5KJtwLfOoW"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Play Am I Dreaming on Spotify"
            className="group absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lift backdrop-blur-sm transition-transform duration-200 ease-spring group-hover:scale-110">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A0A0A">
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            </span>
          </a>
          <div className="absolute inset-x-0 bottom-0 bg-white/90 px-5 py-3 backdrop-blur-sm">
            <p className="text-base font-medium text-ink">Am I Dreaming</p>
            <p className="text-sm text-muted">Metro Boomin · A$AP Rocky</p>
          </div>
        </Card>
      </div>
    </Panel>
  );
}
