import type { Metadata, Viewport } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";

// One family, loaded as a variable font. Inter's character variants
// (set in globals.css) give us the display-ish feel without a second file.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Second and final family. Used only for the story heading, where a
// handwritten mark reads as a personal aside rather than another
// section header in the system.
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Vivek M, AI Native GTM-E",
  description:
    "I build GTM systems that find the right people, at the right time, with the right message. Clean lists. Right signals. Relevant outreach."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <body className="min-h-screen bg-surface font-sans antialiased selection:bg-ink selection:text-white">
        {children}
      </body>
    </html>
  );
}
