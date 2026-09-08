"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Frame,
  Card,
  Panel,
  Section,
  SectionHeading,
  Eyebrow,
  ArrowIcon,
} from "@/components/ui/Primitives";
import { InstagramIcon, MailIcon } from "@/components/ui/SocialIcons";

type PhotoTab = "grid" | "map" | "heart" | "sparkle";

const photos: Record<PhotoTab, { src: string; alt: string }> = {
  grid: { src: "/images/dp.jpg", alt: "Portrait" },
  map: { src: "/images/igdp.jpg", alt: "On location" },
  heart: { src: "/images/beach.jpg", alt: "Beach" },
  sparkle: { src: "/images/rma.jpg", alt: "Real Madrid" },
};

const stats = [
  { value: "4+", label: "Years building" },
  { value: "30+", label: "Projects shipped" },
  { value: "3", label: "Products live" },
  { value: "1", label: "Day fastest ship" },
];

const contactLinks = [
  {
    label: "purayathvivek@gmail.com",
    href: "mailto:purayathvivek@gmail.com?subject=Hey%20Vivek",
  },
  { label: "Kerala, India", href: null },
  { label: "@notso_vivekkk", href: "https://www.instagram.com/notso_vivekkk" },
];

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

export default function AboutTab() {
  const [activePhotoTab, setActivePhotoTab] = useState<PhotoTab>("grid");
  const photo = photos[activePhotoTab];

  return (
    <div className="flex flex-col gap-5">
      {/* ---------- Story ---------- */}
      <Frame hero>
        <Card className="flex flex-col gap-7 p-8 sm:gap-10 sm:p-11">
          <SectionHeading
            label="About myself."
            title="Somewhere between a PM and a builder"
            subtitle="Product thinking built the long way round: design, freelance, an agency, and a lot of shipping."
          />

          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <Eyebrow>Background</Eyebrow>
              <p className="text-md text-body">
                Born in Kerala, grew up partly in Saudi Arabia, came back,
                finished school, got into engineering.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Eyebrow>Journey</Eyebrow>
              <p className="text-md text-body">
                Started editing videos freelance, got curious, co-founded a
                design agency deep in the football world. Took on a website
                project without knowing how to build one, learned Webflow,
                over-delivered. Then AI happened and I got completely obsessed.
                Now I sit somewhere between a PM and a builder and that&apos;s
                exactly where I want to be.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Eyebrow>Outside work</Eyebrow>
              <p className="text-md text-body">
                Gym at least twice a week. Shoot photos, care a lot about how
                they turn out. Hardcore Real Madrid fan. Modern outlook. Old
                school feelings.
              </p>
            </div>
          </div>

          {/* Inline contact row, dot separators keep it compact */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {contactLinks.map((item, i) => (
              <div key={item.label} className="flex items-center gap-3">
                {i > 0 ? (
                  <span className="h-1 w-1 rounded-full bg-muted" />
                ) : null}
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-base text-ink transition-opacity duration-200 hover:opacity-60"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-base text-ink">{item.label}</span>
                )}
              </div>
            ))}
          </div>

          {/* Counters */}
          <div className="grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5">
                <span className="text-3xl font-medium text-ink">
                  {stat.value}
                </span>
                <span className="text-base text-body">{stat.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </Frame>

      {/* ---------- Life ---------- */}
      <Panel className="flex flex-col gap-9 sm:gap-10">
        <SectionHeading
          label="Off the clock."
          title="The rest of it"
          subtitle="Photos I took, music on repeat, and the fastest way to reach me."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Gallery */}
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

          {/* Instagram */}
          <Card className="flex flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/images/igdp.jpg"
                    alt="Vivekkk"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-medium text-ink">
                    Vivekkk
                  </p>
                  <p className="text-sm text-muted">@notso_vivekkk</p>
                </div>
              </div>

              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile text-white"
                style={{
                  background:
                    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                }}
              >
                <InstagramIcon size={18} />
              </span>
            </div>

            <p className="mt-4 text-base text-body">
              Modern outlook &amp; old school feelings. 🧬
            </p>
            <p className="mt-2 text-sm text-muted">
              Kerala, India · 1,591 followers
            </p>

            <div className="mt-auto pt-4">
              <a
                href="https://www.instagram.com/notso_vivekkk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-medium text-ink transition-opacity duration-200 hover:opacity-60"
              >
                Stalk here <ArrowIcon />
              </a>
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

          {/* Email */}
          <a
            href="mailto:purayathvivek@gmail.com?subject=Hey%20Vivek"
            className="group block aspect-square"
          >
            <Card className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-tile text-body shadow-control"
                style={{ animation: "float 3s ease-in-out infinite" }}
              >
                <MailIcon size={24} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-lg font-medium text-ink">Say hi.</p>
                <p className="text-base text-body">purayathvivek@gmail.com</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-base font-medium text-ink transition-opacity duration-200 group-hover:opacity-60">
                Send email <ArrowIcon />
              </span>
            </Card>
          </a>
        </div>
      </Panel>

      {/* ---------- Quote ---------- */}
      <Section cardClassName="flex flex-col gap-3 py-10 text-center items-center sm:py-12">
        <blockquote className="max-w-[42ch] text-xl font-normal text-ink">
          &ldquo;A thing of beauty is a joy forever.&rdquo;
        </blockquote>
        <p className="text-base text-body">John Keats</p>
      </Section>
    </div>
  );
}
