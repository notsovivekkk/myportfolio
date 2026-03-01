import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vivek — AI Product Builder",
  description:
    "I turn messy ideas into shipped AI products. Product-first. Execution-obsessed. AI-native.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen pb-20 antialiased selection:bg-black selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
