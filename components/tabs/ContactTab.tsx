"use client";

import Image from "next/image";
import {
  Frame,
  Card,
  Panel,
  SectionHeading,
  Button,
  ArrowIcon,
} from "@/components/ui/Primitives";
import {
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/ui/SocialIcons";

const EMAIL = "purayathvivek@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Hey%20Vivek`;

/* One shape for both social cards, same rhythm, different content. */
function SocialCard({
  avatar,
  name,
  handle,
  bio,
  meta,
  cta,
  href,
  badge,
}: {
  avatar: string;
  name: string;
  handle: string;
  bio: React.ReactNode;
  meta: string;
  cta: string;
  href: string;
  badge: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={avatar}
              alt={name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-medium text-ink">{name}</p>
            <p className="text-sm text-muted">{handle}</p>
          </div>
        </div>
        {badge}
      </div>

      <p className="mt-4 text-base text-body">{bio}</p>
      <p className="mt-2 text-sm text-muted">{meta}</p>

      <div className="mt-auto pt-4">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-base font-medium text-ink transition-opacity duration-200 hover:opacity-60"
        >
          {cta} <ArrowIcon />
        </a>
      </div>
    </Card>
  );
}

export default function ContactTab() {
  return (
    <div className="flex flex-col gap-5">
      {/* ---------- Primary ---------- */}
      <Frame hero>
        <Card className="relative flex flex-col items-center gap-7 p-8 text-center sm:p-11">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-tile text-body shadow-control"
            style={{ animation: "float 3s ease-in-out infinite" }}
          >
            <MailIcon size={26} />
          </span>

          <div className="flex flex-col items-center gap-3">
            <h1 className="max-w-[20ch] text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-ink sm:text-2xl">
              Available for GTM Engineering contracts. Let&apos;s build your
              revenue system.
            </h1>
            <p className="max-w-[46ch] text-md text-body">
              Always open to new opportunities, collaborations, and creative
              conversations. Just say hi, I read every email.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Button href={MAILTO} variant="primary" className="w-full sm:w-auto">
              Send an email
            </Button>
            <Button
              href="https://www.linkedin.com/in/vivek-m12/"
              variant="secondary"
              external
              className="w-full sm:w-auto"
            >
              Message on LinkedIn
            </Button>
          </div>

          <a
            href={MAILTO}
            className="group inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-line px-5 py-2.5 transition-colors duration-200 hover:border-muted"
          >
            <span className="text-base text-body">{EMAIL}</span>
            <span className="text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </a>
        </Card>
      </Frame>

      {/* ---------- Elsewhere ---------- */}
      <Panel className="flex flex-col gap-9 sm:gap-10">
        <SectionHeading
          label="Elsewhere."
          title="Find me around the internet"
          subtitle="Work updates on LinkedIn, everything else on Instagram."
        />

        <div className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-card sm:grid-cols-2">
          <SocialCard
            avatar="/images/dp.jpg"
            name="Vivek M"
            handle="@vivekm"
            bio={
              <>
                Building MVP&apos;s &amp; AI Systems. Smart Context Coder{" "}
                <span className="text-[#0A66C2]">@growthbae</span>
              </>
            }
            meta="India · 2,153 followers · 500+ connections"
            cta="View profile"
            href="https://www.linkedin.com/in/vivek-m12/"
            badge={
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile bg-[#0A66C2] text-white">
                <LinkedInIcon size={18} />
              </span>
            }
          />

          <SocialCard
            avatar="/images/igdp.jpg"
            name="Vivekkk"
            handle="@notso_vivekkk"
            bio="Modern outlook & old school feelings. 🧬"
            meta="Kerala, India · 1,591 followers"
            cta="Stalk here"
            href="https://www.instagram.com/notso_vivekkk"
            badge={
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-tile text-white"
                style={{
                  background:
                    "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                }}
              >
                <InstagramIcon size={18} />
              </span>
            }
          />
        </div>
      </Panel>
    </div>
  );
}
