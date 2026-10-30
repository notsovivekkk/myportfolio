/* ==================================================================
   The four mobile issues on floqer.com, with cause and fix.

   Every "why" snippet is taken from floqer.com's live HTML, and the
   numbers were measured on the live site in a 390px wide iPhone
   viewport. The same content is in public/floqer/floqer-mobile-fixes.md
   for Floqer's developers: keep the two in step.

   In the prose fields, `backticks` mark inline code.
   ================================================================== */

export type Glitch = {
  n: string;
  title: string;
  media: { kind: "video" | "image"; src: string; poster: string };
  broken: string;
  whyCode: string;
  why: string;
  fixCode: string;
  fixNote?: string;
};

export const GLITCHES: Glitch[] = [
  {
    n: "01",
    title: "“Beyond the interface” animation",
    media: {
      kind: "video",
      src: "/floqer/glitch-01-beyond-interface.mp4",
      poster: "/floqer/glitch-01-beyond-interface.jpg",
    },
    broken:
      "A big empty black space under the globe, then the animation overlaps and pushes the globe off-screen.",
    whyCode: `<section style="height:480vh">
  <div class="sticky top-0 h-screen … justify-start overflow-hidden">
    <canvas style="max-width:min(94vw,1120px);max-height:55vh"> <!-- 3840×2304 on a 3x iPhone -->`,
    why: "The wide canvas shrinks to about 367×220px on a phone, while the panel stays full height with content pinned to the top, which leaves about 225px of empty space. `h-screen` (100vh) also sits under Safari’s toolbar.",
    fixCode: `<section class="h-[260vh] md:h-[480vh]">
  <div class="sticky top-0 h-svh … justify-center md:justify-start">
    <canvas class="aspect-square max-w-[88vw] md:aspect-auto …">`,
    fixNote:
      "Plus: on mobile, cap the canvas at `Math.min(devicePixelRatio, 1.5)` and use a simpler stacked fade-in instead of the desktop two-column move.",
  },
  {
    n: "02",
    title: "Testimonials can’t scroll, stat cut off",
    media: {
      kind: "video",
      src: "/floqer/glitch-02-testimonials.mp4",
      poster: "/floqer/glitch-02-testimonials.jpg",
    },
    broken:
      "Each testimonial holds the screen, and the bottom stat is cut off (“70% FASTER FROM EVENT TO…”).",
    whyCode: `<section style="height:318vh">
  <div class="sticky top-0 h-screen w-full overflow-hidden …">
    <div class="grid grid-cols-1 … gap-12">`,
    why: "On mobile, the quote, author, links and stat stack into a column taller than the screen, and `overflow-hidden` clips it.",
    fixCode: `<section class="h-auto md:h-[318vh]">
  <div class="relative md:sticky md:top-0 md:h-screen md:overflow-hidden …">`,
    fixNote:
      "On mobile, show a normal list or a `snap-x snap-mandatory` swipe carousel.",
  },
  {
    n: "03",
    title: "Hero gap",
    media: {
      kind: "video",
      src: "/floqer/glitch-03-hero.mp4",
      poster: "/floqer/glitch-03-hero.jpg",
    },
    broken:
      "A large empty gap between “Sign up for free” and the logo strip.",
    whyCode: `<div class="… pt-[18vh] md:pt-[22vh]">…</div>
<div class="relative z-10 w-full mt-auto">…logos…</div>`,
    why: "`mt-auto` pushes the logos to the bottom of a full-screen hero.",
    fixCode: `<div class="… pt-[12vh] md:pt-[22vh]">…</div>
<div class="relative z-10 w-full mt-12 md:mt-auto">…</div>`,
  },
  {
    n: "04",
    title: "Footer empty space",
    media: {
      kind: "image",
      src: "/floqer/glitch-04-footer.jpg",
      poster: "/floqer/glitch-04-footer.jpg",
    },
    broken:
      "About 190px of empty space under each footer column, plus stray vertical borders.",
    whyCode: `<div class="border-l border-[#D4D4D4] pr-4 min-h-[360px] pl-6">`,
    why: "`min-h-[360px]` has no breakpoint, so it also applies to the stacked mobile columns.",
    fixCode: `<div class="lg:border-l border-[#D4D4D4] pr-4 lg:min-h-[360px] pl-6 pb-8 lg:pb-0">`,
  },
];
