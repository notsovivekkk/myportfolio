/* ============================================================
   ICP Gate, as a looping illustration.

   Blank company cards travel left to right toward a thin arch labelled
   ICP GATE. Each one gets a fit score just before the arch. High scores
   pass through and settle into a list labelled CLEAN LIST; low scores
   drop away and fade. When the list is full it fades out together and
   the loop starts again from an empty frame, so the seam is invisible.

   Pure SVG and CSS: no JavaScript, nothing to load. Every card's motion
   is generated from one timeline below, so the spacing between cards is
   worked out rather than tuned by eye, and no two cards ever overlap.

   Reduced motion: the animation only attaches inside
   (prefers-reduced-motion: no-preference). Otherwise each card keeps
   its inline style, which together form one static frame of the story.
   ============================================================ */

/* Colours from the site's tokens (tailwind.config.ts). */
const INK = "#0A0A0A";
const BODY = "#4A4F54";
const MUTED = "#9CA3AF";
const LINE = "#E5E7EB";
const FRAME = "#F3F4F6";

/* Geometry, in viewBox units. 400 x 260 matches the Loom posters'
   64.98% ratio, so this tile lines up with every video tile. */
const W = 400;
const H = 260;
const CARD_W = 64;
const CARD_H = 36;
const LANE_Y = 112; // the conveyor
const START_X = -70; // just off canvas
const STOP_X = 92; // waits here, right edge clear of the arch
/* Where a passing card leaves the arch: left edge clear of the right
   pillar (236), right edge clear of the list (304), so the turn toward
   its slot never brushes either. */
const EXIT_X = 238;
const LIST_X = 304;
const SLOTS = [70, 112, 154];

/* Timeline, in seconds. The conveyor runs at constant speed, so the
   spacing is exact: 1.8s apart is a 69 unit gap between cards, which
   gives a turned away card time to drop clear before the next arrives.
   Checked by seeking the animation and testing for overlap. */
const T = 14;
const STAGGER = 1.8;
const ENTER = 2.2; // off canvas to the stop
const SCORE_AT = 2.2;
const HOLD = 0.4; // scored, waiting at the gate
const LIST_HOLD_UNTIL = 12.6;
const LIST_FADE_UNTIL = 13.2;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const EASE_OUT = "cubic-bezier(0, 0, 0.2, 1)";

type Card = {
  score: string;
  pass: boolean;
  slot?: number;
  /* The single frame shown when motion is reduced. */
  still: { x: number; y: number; opacity: number; scored: boolean };
};

const cards: Card[] = [
  {
    score: "0.94",
    pass: true,
    slot: 0,
    still: { x: LIST_X, y: SLOTS[0], opacity: 1, scored: true },
  },
  {
    score: "0.12",
    pass: false,
    still: { x: STOP_X - 4, y: LANE_Y + 40, opacity: 0.35, scored: true },
  },
  {
    score: "0.91",
    pass: true,
    slot: 1,
    still: { x: LIST_X, y: SLOTS[1], opacity: 1, scored: true },
  },
  {
    score: "0.07",
    pass: false,
    still: { x: START_X, y: LANE_Y, opacity: 0, scored: false },
  },
  {
    score: "0.88",
    pass: true,
    slot: 2,
    still: { x: STOP_X, y: LANE_Y, opacity: 1, scored: true },
  },
];

const pct = (t: number) =>
  `${Math.min(100, Math.max(0, (t / T) * 100)).toFixed(3)}%`;
const at = (x: number, y: number) => `translate(${x}px, ${y}px)`;

/* Each keyframe names the easing of the segment that starts at it: the
   conveyor is linear, everything the gate decides is eased. */
function cardKeyframes(c: Card, i: number) {
  const s = i * STAGGER;
  const gate = s + ENTER;
  const go = gate + HOLD;
  const f: string[] = [];
  const k = (t: number, x: number, y: number, o: number, ease = "linear") =>
    f.push(
      `${pct(t)} { transform: ${at(x, y)}; opacity: ${o}; animation-timing-function: ${ease}; }`,
    );

  k(0, START_X, LANE_Y, 0);
  k(s, START_X, LANE_Y, 0);
  /* Fade in over the first 0.3s, already moving at conveyor speed. */
  k(s + 0.3, START_X + ((STOP_X - START_X) * 0.3) / ENTER, LANE_Y, 1);
  k(gate, STOP_X, LANE_Y, 1);

  if (c.pass) {
    const slotY = SLOTS[c.slot ?? 0];
    k(go, STOP_X, LANE_Y, 1, EASE);
    k(go + 0.9, EXIT_X, LANE_Y, 1, EASE); // through the arch
    k(go + 1.3, EXIT_X, slotY, 1, EASE); // up or down to its row
    k(go + 1.8, LIST_X, slotY, 1); // into the list
    k(LIST_HOLD_UNTIL, LIST_X, slotY, 1);
    k(LIST_FADE_UNTIL, LIST_X, slotY, 0);
    k(T, LIST_X, slotY, 0);
  } else {
    /* Turned away: drops and fades, never reaches the arch. Eased out,
       so most of the drop happens early, before the next card closes. */
    k(go, STOP_X, LANE_Y, 1, EASE_OUT);
    k(go + 0.5, STOP_X, LANE_Y + 44, 0);
    k(T, STOP_X, LANE_Y + 44, 0);
  }
  return `@keyframes icpg-card-${i} { ${f.join(" ")} }`;
}

function scoreKeyframes(i: number) {
  const reveal = i * STAGGER + SCORE_AT;
  return `@keyframes icpg-score-${i} { 0% { opacity: 0; } ${pct(reveal)} { opacity: 0; } ${pct(
    reveal + 0.3,
  )} { opacity: 1; } 100% { opacity: 1; } }`;
}

const css = `
${cards.map(cardKeyframes).join("\n")}
${cards.map((_, i) => scoreKeyframes(i)).join("\n")}
@media (prefers-reduced-motion: no-preference) {
${cards
  .map(
    (
      _,
      i,
    ) => `  .icpg-card-${i} { animation: icpg-card-${i} ${T}s ${EASE} infinite; }
  .icpg-score-${i} { animation: icpg-score-${i} ${T}s ${EASE} infinite; }`,
  )
  .join("\n")}
}
`;

/* The arch: two pillars and a half circle, open at the bottom. Inner
   width 72 against a 64 wide card, so a card visibly fits through. */
const ARCH_L = 164;
const ARCH_R = 236;
const ARCH_FOOT = 166;
const ARCH_SPRING = 132;
const ARCH_PATH = `M${ARCH_L} ${ARCH_FOOT} V${ARCH_SPRING} A36 36 0 0 1 ${ARCH_R} ${ARCH_SPRING} V${ARCH_FOOT}`;

export default function IcpGateAnimation() {
  return (
    <div
      style={{ aspectRatio: "100 / 64.98194945848375" }}
      className="relative w-full overflow-hidden rounded-tile bg-frame"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Company cards are scored at an ICP gate. Scores of 0.94, 0.91 and 0.88 pass into a clean list; 0.12 and 0.07 are turned away."
        style={{ fontFamily: "inherit" }}
      >
        {/* Everything drawn spans y 48 to 190; this centres that band in
            the 260 tall frame instead of leaving the bottom empty. */}
        <g transform="translate(0 11)">
          {/* Labels: small, tracked caps, the site's eyebrow treatment. */}
          <text
            x={(ARCH_L + ARCH_R) / 2}
            y={84}
            textAnchor="middle"
            fontSize="9"
            fontWeight="500"
            letterSpacing="1.4"
            fill={MUTED}
          >
            ICP GATE
          </text>
          <text
            x={LIST_X + CARD_W / 2}
            y={56}
            textAnchor="middle"
            fontSize="9"
            fontWeight="500"
            letterSpacing="1.4"
            fill={MUTED}
          >
            CLEAN LIST
          </text>

          {cards.map((c, i) => (
            <g
              key={c.score}
              className={`icpg-card-${i}`}
              style={{
                transform: at(c.still.x, c.still.y),
                opacity: c.still.opacity,
              }}
            >
              <rect
                width={CARD_W}
                height={CARD_H}
                rx="7"
                fill="#FFFFFF"
                stroke={LINE}
              />
              {/* Blank company: a logo dot and two text bars, no name. Bars
                end at x 33, clear of the score, which starts near 39. */}
              <circle cx="11" cy="18" r="4" fill={LINE} />
              <rect x="19" y="12" width="14" height="4" rx="2" fill={LINE} />
              <rect x="19" y="20" width="9" height="4" rx="2" fill={FRAME} />
              <text
                className={`icpg-score-${i}`}
                x={CARD_W - 6}
                y="22"
                textAnchor="end"
                fontSize="9.5"
                fontWeight="500"
                fill={c.pass ? INK : MUTED}
                style={{
                  fontVariantNumeric: "tabular-nums",
                  opacity: c.still.scored ? 1 : 0,
                }}
              >
                {c.score}
              </text>
            </g>
          ))}

          {/* Drawn after the cards, so a passing card reads as going
            under the arch rather than over it. */}
          <path
            d={ARCH_PATH}
            fill="none"
            stroke={BODY}
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
