# floqer.com: 4 mobile fixes

Found and checked on floqer.com in a 390px wide iPhone viewport. Each issue has what's broken, why (the live code), and a suggested fix.

From Vivek M: https://www.notsovivek.fyi/floqer

---

## 01 · “Beyond the interface” animation

**What's broken:** A big empty black space under the globe, then the animation overlaps and pushes the globe off-screen.

**Why:**

```html
<section style="height:480vh">
  <div class="sticky top-0 h-screen … justify-start overflow-hidden">
    <canvas style="max-width:min(94vw,1120px);max-height:55vh"> <!-- 3840×2304 on a 3x iPhone -->
```

The wide canvas shrinks to about 367×220px on a phone, while the panel stays full height with content pinned to the top, which leaves about 225px of empty space. `h-screen` (100vh) also sits under Safari’s toolbar.

**Fix:**

```html
<section class="h-[260vh] md:h-[480vh]">
  <div class="sticky top-0 h-svh … justify-center md:justify-start">
    <canvas class="aspect-square max-w-[88vw] md:aspect-auto …">
```

Plus: on mobile, cap the canvas at `Math.min(devicePixelRatio, 1.5)` and use a simpler stacked fade-in instead of the desktop two-column move.

---

## 02 · Testimonials can’t scroll, stat cut off

**What's broken:** Each testimonial holds the screen, and the bottom stat is cut off (“70% FASTER FROM EVENT TO…”).

**Why:**

```html
<section style="height:318vh">
  <div class="sticky top-0 h-screen w-full overflow-hidden …">
    <div class="grid grid-cols-1 … gap-12">
```

On mobile, the quote, author, links and stat stack into a column taller than the screen, and `overflow-hidden` clips it.

**Fix:**

```html
<section class="h-auto md:h-[318vh]">
  <div class="relative md:sticky md:top-0 md:h-screen md:overflow-hidden …">
```

On mobile, show a normal list or a `snap-x snap-mandatory` swipe carousel.

---

## 03 · Hero gap

**What's broken:** A large empty gap between “Sign up for free” and the logo strip.

**Why:**

```html
<div class="… pt-[18vh] md:pt-[22vh]">…</div>
<div class="relative z-10 w-full mt-auto">…logos…</div>
```

`mt-auto` pushes the logos to the bottom of a full-screen hero.

**Fix:**

```html
<div class="… pt-[12vh] md:pt-[22vh]">…</div>
<div class="relative z-10 w-full mt-12 md:mt-auto">…</div>
```

---

## 04 · Footer empty space

**What's broken:** About 190px of empty space under each footer column, plus stray vertical borders.

**Why:**

```html
<div class="border-l border-[#D4D4D4] pr-4 min-h-[360px] pl-6">
```

`min-h-[360px]` has no breakpoint, so it also applies to the stacked mobile columns.

**Fix:**

```html
<div class="lg:border-l border-[#D4D4D4] pr-4 lg:min-h-[360px] pl-6 pb-8 lg:pb-0">
```
