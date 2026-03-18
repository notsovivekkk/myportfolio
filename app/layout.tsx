import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["italic", "normal"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Vivek — AI Product Builder",
  description:
    "I turn messy ideas into shipped AI products. Product-first. Execution-obsessed. AI-native.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${playfair.variable} min-h-screen antialiased selection:bg-black selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
