import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { JetBrains_Mono } from "next/font/google";
import GlitchGrid from "./GlitchGrid";

/* Floqer sets its labels, stats and code in monospace. JetBrains Mono
   is the open font from their own stack, loaded only on this page. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fq-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.notsovivek.fyi"),
  title: "Vivek × Floqer",
  description:
    "My application, for all things growth at Floqer. What I'd own, and 4 mobile fixes for floqer.com.",
  /* Personal application page: kept out of search. */
  robots: { index: false, follow: false },
};

/* ==================================================================
   /floqer

   The /viralnetix building blocks (identity header, short headings
   that end in a full stop, numbered cards, status badges, the
   background link and the closing CTA) in Floqer's own taste, read off
   floqer.com: an off-white ground with their fine dot grid, near black
   ink, monospace labels, dotted rules, and a black "night" section
   where the work is, the way their site switches to black for its
   product moments. Their orange is the one accent.

   Mobile first, because the page is about mobile bugs: one column,
   16px gutters, nothing wider than the screen (code scrolls inside its
   own box), and no 100vh anywhere.
   ================================================================== */

/* ---------------- Pieces (the /viralnetix set, Floqer skin) ---------------- */

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[22px] bg-fq-frame p-0.5">
      {children}
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[20px] bg-white ${className}`}>
      {children}
    </div>
  );
}

/* A short heading ending in a full stop, led by Floqer's orange square,
   the mark they put before their own labels. */
function Heading({
  children,
  as: Tag = "h2",
  tone = "light",
}: {
  children: ReactNode;
  as?: "h2" | "h3";
  tone?: "light" | "night";
}) {
  return (
    <Tag
      className={`flex items-center gap-2.5 text-lg font-medium ${
        tone === "night" ? "text-fq-ground" : "text-fq-ink"
      }`}
    >
      <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-fq-orange" />
      {children}
    </Tag>
  );
}

/* 40px, 20px sides, 14px medium, as everywhere else. Primary is black
   under white, as on floqer.com, with the arrow in their orange. */
function Button({
  href,
  children,
  external = false,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const skin =
    variant === "primary"
      ? "bg-fq-ink text-white shadow-[0_1px_2px_rgba(4,3,5,0.2),0_6px_16px_-6px_rgba(4,3,5,0.45)] hover:bg-[#1c1a1e]"
      : "bg-white text-fq-ink shadow-[inset_0_0_0_1px_#D4D4D4,0_6px_6px_-3px_rgba(41,41,41,0.04),0_12px_12px_-6px_rgba(41,41,41,0.04)] hover:shadow-[inset_0_0_0_1px_#040305,0_6px_6px_-3px_rgba(41,41,41,0.05),0_12px_12px_-6px_rgba(41,41,41,0.05)]";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] px-5 text-base font-medium outline-none transition-[background-color,box-shadow] duration-200 ease-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fq-orange active:scale-[0.98] sm:w-auto ${skin} ${className}`}
    >
      {children}
    </a>
  );
}

const Arrow = () => (
  <span aria-hidden="true" className="text-fq-orange">
    &rarr;
  </span>
);

/* ---------------- Content ---------------- */

/* Each card's body is a list of short paragraphs, so every point gets
   its own line and nothing is buried in a block of text. */
const OWN: {
  title: string;
  body: ReactNode[];
  tags?: string[];
  /* A link out under the card, for the proof behind it. */
  more?: { href: string; label: string };
}[] = [
  {
    title: "GTM engineering",
    body: [
      "I know the GTM layers end to end: ICP, list building, signals, enrichment, verification, sequencing.",
      "I can do the same for Floqer to find the next enterprise customer.",
      "When something repeats, I can turn it into an agent. Claude Code-maxxing for over a year now.",
    ],
    tags: [
      "Clay",
      "Cursor",
      "Claude Code",
      "Python Script",
      "Floqer (signup pending approval)",
    ],
    more: { href: "/projects", label: "More projects and builds here" },
  },
  {
    title: "AEO for Floqer",
    body: [
      <>
        Floqer has a headless API and an MCP server, so the next buyer might
        be asking an AI agent. Being the tool AI recommends is a
        non-negotiable here.
      </>,
      "I\u2019m not an AEO expert yet, but here\u2019s how I\u2019d go at it: find the prompts buyers actually type, see what\u2019s lacking in the answers, and curate content suggestions so Floqer ranks high in them.",
      "I\u2019d also build an internal tool that tracks all those prompts, and where we and the competitors stand in each.",
    ],
  },
  {
    title: "Communities",
    body: [
      "I\u2019m active in GTM communities. When someone asks a question Floqer genuinely solves, I\u2019ll be there with a real answer, not a pitch.",
    ],
  },
  {
    title: "Finding the next customer",
    body: [
      "LinkedIn, email, communities, even WhatsApp follow-ups: wherever the buyer is. Every touch logged to CRM and Slack.",
      "Your JD for business operations says \u2018customer obsessed, not customer driven\u2019. That\u2019s me.",
    ],
  },
  {
    title: "Product, from customer feedback",
    body: [
      "And it doesn\u2019t end there. I have product knowledge too: I learned product management through different courses, and I can take any customer feedback into a POC for the engineers to work on.",
      "I\u2019ve done this before, while building apps for clients at my agency.",
    ],
  },
];

const BACKGROUND = [
  "I ran my own web dev agency and won premium UK clients through persistent outbound.",
];

/* ---------------- Page ---------------- */

export default function FloqerPage() {
  return (
    <div
      className={`${mono.variable} relative min-h-svh overflow-x-clip bg-fq-ground`}
    >
      {/* Floqer's dot grid, held to the top of the page and faded out. */}
      <div
        aria-hidden="true"
        className="fq-dots pointer-events-none absolute inset-x-0 top-0 h-[560px]"
      />

      <main className="relative mx-auto w-full max-w-page px-4 sm:px-5">
        <div className="mx-auto flex w-full max-w-content flex-col gap-5 pb-16 pt-6 sm:pb-20 sm:pt-10">
          {/* ---------- 0. Header ---------- */}
          <Frame>
            <Card className="flex flex-col gap-7 p-7 sm:p-11">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-[72px] sm:w-[72px]">
                  <Image
                    src="/images/dp.jpg"
                    alt="Vivek M"
                    width={72}
                    height={72}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-lg font-medium text-fq-ink">Vivek M</p>
                  <p className="font-[family-name:var(--font-fq-mono)] text-xs uppercase tracking-[0.12em] text-fq-deep sm:text-sm">
                    GTM Engineer Application · Floqer
                  </p>
                </div>
              </div>

              <div className="flex max-w-full flex-col gap-3 md:max-w-[86%]">
                <h1 className="text-[24px] font-normal leading-[1.25] tracking-[-0.02em] text-fq-ink sm:text-2xl">
                  Hi Shivam. My application, for all things growth at Floqer.
                </h1>
                <p className="text-md text-fq-body">
                  I’d love to be part of the 0 &rarr; 1 journey, and I’m
                  ready to contribute from day one.
                </p>
              </div>
            </Card>
          </Frame>

          {/* ---------- 1. Titles ---------- */}
          <Frame>
            <Card className="flex flex-col gap-3 p-7 sm:p-11">
              <Heading>Titles are just labels.</Heading>
              <p className="max-w-[62ch] text-base leading-[1.7] text-fq-body">
                I don&apos;t believe in job titles or the brief that comes with
                them. I&apos;d rather own anything and everything that gets
                Floqer to its next customer.
              </p>
            </Card>
          </Frame>

          {/* ---------- 2. What I'd own ---------- */}
          {/* The /viralnetix numbered rows on the grey panel. */}
          <section className="flex flex-col gap-7 rounded-[22px] bg-fq-frame px-4 pb-4 pt-8 sm:gap-8 sm:px-8 sm:pb-8 sm:pt-11">
            <div className="px-3 sm:px-3.5">
              <Heading>What I&apos;d own.</Heading>
            </div>
            <ol className="flex flex-col gap-3">
              {OWN.map((item, i) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[30px_minmax(0,1fr)] gap-x-3 rounded-[20px] bg-white p-5 sm:grid-cols-[40px_minmax(0,1fr)] sm:gap-x-4 sm:p-6"
                >
                  <span className="pt-0.5 font-[family-name:var(--font-fq-mono)] text-base text-fq-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex min-w-0 flex-col gap-2">
                    <h3 className="text-md font-medium leading-[1.4] text-fq-ink">
                      {item.title}
                    </h3>
                    <div className="flex max-w-[62ch] flex-col gap-2.5">
                      {item.body.map((para, j) => (
                        <p
                          key={j}
                          className="text-base leading-[1.7] text-fq-body"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                    {item.tags ? (
                      <ul
                        aria-label="Stack"
                        className="mt-1.5 flex flex-wrap gap-1.5"
                      >
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-[6px] border border-dotted border-fq-line bg-fq-ground px-2 py-1 font-[family-name:var(--font-fq-mono)] text-xs text-fq-ink"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {/* Same site, so same tab. The URL is shown, so the
                        reader knows where it goes before clicking. */}
                    {item.more ? (
                      <div className="pt-2">
                        {/* On a phone the label can wrap, so the button
                            grows with it instead of spilling out. */}
                        <Button
                          href={item.more.href}
                          variant="secondary"
                          className="h-auto min-h-10 py-2.5 sm:h-10 sm:py-0"
                        >
                          {item.more.label}
                          <Arrow />
                          <span className="hidden font-[family-name:var(--font-fq-mono)] text-xs font-normal text-fq-muted sm:inline">
                            notsovivek.fyi/projects
                          </span>
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ---------- 3. First things first ---------- */}
          {/* The night section: Floqer turns its site black for product
              moments, so the fixes, the actual work, sit on black. */}
          <section
            id="fixes"
            className="flex scroll-mt-6 flex-col gap-7 rounded-[22px] bg-fq-night px-4 pb-4 pt-8 sm:gap-8 sm:px-8 sm:pb-8 sm:pt-11"
          >
            <div className="flex flex-col gap-3 px-3 sm:px-3.5">
              <Heading tone="night">First things first.</Heading>
              <p className="max-w-[62ch] text-base leading-[1.7] text-fq-night-body">
                I used to run a web dev agency, so the website is always the
                first thing I check. I found 4 mobile issues that shouldn&apos;t
                be on a site like Floqer&apos;s. I read your live code, and
                here&apos;s the cause and the fix for each.
              </p>
            </div>

            <GlitchGrid />

            <div className="px-3 sm:px-3.5">
              <a
                href="/floqer/floqer-mobile-fixes.md"
                download
                className="inline-flex items-center gap-2 rounded-[6px] font-[family-name:var(--font-fq-mono)] text-sm text-fq-night-body underline decoration-fq-night-line underline-offset-4 outline-none transition-colors duration-200 ease-default hover:text-fq-ground hover:decoration-fq-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fq-orange"
              >
                Download all fixes for your dev (.md)
                <span aria-hidden="true" className="text-fq-orange">
                  &darr;
                </span>
              </a>
            </div>
          </section>

          {/* ---------- 4. Where I'm coming from ---------- */}
          <Frame>
            <Card className="flex flex-col gap-4 p-7 sm:p-11">
              <Heading>Where I&apos;m coming from.</Heading>
              <ul className="flex max-w-[62ch] flex-col gap-2.5">
                {BACKGROUND.map((line) => (
                  <li
                    key={line}
                    className="grid grid-cols-[14px_minmax(0,1fr)] gap-x-2 text-base leading-[1.65] text-fq-body"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[10px] h-[5px] w-[5px] bg-fq-orange"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base leading-[1.65] text-fq-body">
                Full story, click below.
              </p>
              <div className="pt-1">
                <Button href="https://www.notsovivek.fyi/#story" variant="secondary">
                  My full background is here
                  <Arrow />
                </Button>
              </div>
            </Card>
          </Frame>

          {/* ---------- 5. Let's talk ---------- */}
          <div id="contact" className="scroll-mt-6">
            <Frame>
              <Card className="flex flex-col items-center gap-7 px-7 py-14 text-center sm:px-11 sm:py-16">
                <div className="flex flex-col items-center gap-3">
                  <h2 className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-fq-ink sm:text-2xl">
                    Let&apos;s talk.
                  </h2>
                  <p className="max-w-[50ch] text-base leading-[1.65] text-fq-body">
                    I noticed part of the team already works remotely from
                    India, so I&apos;d fit right into that setup. Happy to start
                    with a call, a trial project, or just a message.
                  </p>
                </div>
                <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                  <Button href="https://www.linkedin.com/in/vivek-m12/" external>
                    Message on LinkedIn
                    <Arrow />
                  </Button>
                  <Button href="mailto:purayathvivek@gmail.com" variant="secondary">
                    Send an email
                  </Button>
                </div>
              </Card>
            </Frame>
          </div>

          {/* ---------- 6. Ender ---------- */}
          {/* The sign photo, and beside it the line and the closing quote
              from the main page, in his hand, signed. The photo leads on
              a phone; side by side from md. */}
          <Frame>
            <Card className="grid grid-cols-1 items-center gap-8 p-5 sm:p-7 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-10">
              <div className="relative aspect-[1024/1536] w-full overflow-hidden rounded-[14px] bg-fq-frame">
                <Image
                  src="/floqer/floqer-board.jpg"
                  alt="Vivek holding a sign: Wanted 100 leads enriched, but with Clay's new pricing I only got 20. Use floqer.com"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-8 px-2 pb-4 md:px-0 md:pb-0 md:pr-4">
                <p className="text-[22px] font-normal leading-[1.3] tracking-[-0.015em] text-fq-ink sm:text-[24px]">
                  Gutsy to do this as well ;)
                </p>

                {/* The main page's closing quote, same hand, same mark. */}
                <figure className="flex flex-col gap-5 border-t border-dotted border-fq-line pt-7">
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-1 -top-10 select-none font-hand text-[110px] leading-none text-fq-frame"
                    >
                      &ldquo;
                    </span>
                    <blockquote className="relative font-hand text-[28px] leading-[1.3] text-fq-ink sm:text-[30px]">
                      Leverage isn&apos;t just code or capital, it&apos;s
                      clarity. The clearer your thinking, the faster your
                      systems compound.
                    </blockquote>
                  </div>
                  <Image
                    src="/images/sign.png"
                    alt="Vivek M signature"
                    width={480}
                    height={323}
                    className="w-[130px] -rotate-3 self-end mix-blend-multiply sm:w-[150px]"
                  />
                </figure>
              </div>
            </Card>
          </Frame>
        </div>
      </main>
    </div>
  );
}
