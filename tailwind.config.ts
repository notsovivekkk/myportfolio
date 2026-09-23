import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        hand: ["var(--font-caveat)", "ui-rounded", "cursive"],
      },
      colors: {
        // Semantic names — say what a color is FOR, not what it looks like.
        // Swapping the palette later means editing one block, not 40 files.
        surface: "#FFFFFF",
        frame: "#F3F4F6",
        ink: "#0A0A0A", // primary text
        body: "#4A4F54", // secondary text
        muted: "#9CA3AF", // captions, labels
        line: "#E5E7EB", // borders, dividers
        accent: "#178D00",
        "accent-soft": "#E2F9DD",
        story: "#4C5FD7", // handwritten story heading only

        /* Company page palettes. Additive: the main site's tokens above
           are untouched, so a company page can never restyle the
           portfolio by accident. Duplicate this block per company. */
        vn: {
          primary: "#7B2D8B",
          "primary-deep": "#66246F", // hover, keeps white text at AA
          "primary-soft": "#F5E7F8", // pill and accent fills
          blush: "#FDE8F0", // gradient start
          frame: "#F8F1FA", // the grey frame, tinted purple
          line: "#EBDCEF",
          ink: "#1A1A1A",
          body: "#4A4550",
          muted: "#7A7280", // 4.9:1 on white, safe for captions
          match: "#1E7F4A", // honest tick
          developing: "#B57209", // amber dot
        },

        /* Digital Creativs. Their brand yellow, read off their own
           stylesheet, set to the #FFCC00 they use as the brand yellow.

           Yellow cannot carry white text, so it is a FILL colour only,
           always under near black type. Where the brand needs to speak
           in text (eyebrows, links) it does so through `deep`, a dark
           amber that clears AA on white at 5.3:1. */
        dc: {
          primary: "#FFCC00", // fills: buttons, rules, pills
          hover: "#E6B800",
          soft: "#FFF5CC", // pill fill
          tint: "#FFFAE6", // gradient start
          frame: "#FBF7EA", // the panel grey, tinted warm
          line: "#F0E5C2",
          deep: "#7A5C00", // brand voice in TEXT, AA on white
          ink: "#141414",
          body: "#4A4740",
          muted: "#7A7668", // 4.7:1 on white
        },

        // Kept as aliases so nothing silently breaks.
        primary: "#0A0A0A",
        secondary: "#4A4F54",
        card: "#FFFFFF",
        bg: "#F3F4F6",
      },
      fontSize: {
        // The scale. No arbitrary sizes in components.
        xs: ["11px", { lineHeight: "1.4" }],
        sm: ["12px", { lineHeight: "1.4" }],
        base: ["14px", { lineHeight: "1.5" }],
        md: ["16px", { lineHeight: "1.6" }], // body copy
        lg: ["18px", { lineHeight: "1.5" }],
        xl: ["20px", { lineHeight: "1.4" }],
        // The top of the scale is deliberately short. Nothing here needs
        // to shout — hierarchy comes from weight and spacing, not size.
        "2xl": ["26px", { lineHeight: "1.2", letterSpacing: "-0.02em" }], // hero
        "3xl": ["28px", { lineHeight: "1.2", letterSpacing: "-0.02em" }], // display
      },
      borderRadius: {
        frame: "22px",
        card: "20px",
        tile: "12px",
        control: "12px",
      },
      boxShadow: {
        // Named after intent so usage stays consistent.
        control:
          "inset 0 2px 2px #FFFFFF, 0 12px 12px -6px rgba(41,41,41,0.04), 0 6px 6px -3px rgba(41,41,41,0.04), 0 3px 3px -1.5px rgba(41,41,41,0.02), 0 0 0 1px #E5E7EB",
        lift: "0 12px 24px -8px rgba(41,41,41,0.08), 0 0 0 1px #E5E7EB",
      },
      transitionTimingFunction: {
        default: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      maxWidth: {
        content: "800px", // the reading column
        page: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
