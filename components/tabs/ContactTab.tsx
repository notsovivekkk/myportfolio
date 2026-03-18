"use client";

import Image from "next/image";

import BentoCard from "@/components/cards/BentoCard";

const ArrowIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

export default function ContactTab() {
  return (
    <div className="max-w-[600px] mx-auto space-y-4 sm:space-y-5">

      {/* Email card */}
      <a href="mailto:purayathvivek@gmail.com?subject=Hey%20Vivek" className="block">
        <BentoCard className="p-6 sm:p-10 cursor-pointer group">

          {/* Floating envelope icon */}
          <div className="flex justify-center mb-5 sm:mb-8">
            <div className="w-14 h-14 rounded-2xl border border-gray-200 dark:border-white/15 flex items-center justify-center" style={{ animation: "float 3s ease-in-out infinite" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#737373" className="dark:stroke-gray-400" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
          </div>

          {/* Copy */}
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-primary dark:text-white">
              Let&apos;s talk.
            </h3>
            <p className="text-[15px] text-secondary dark:text-gray-400 leading-relaxed max-w-sm mx-auto">
              Just say hi. I read every email.
            </p>
          </div>

          {/* Email pill */}
          <div className="flex justify-center">
            <div className="border border-gray-300 dark:border-white/20 rounded-full px-5 py-2.5 flex items-center gap-2 group-hover:border-gray-500 dark:group-hover:border-white/40 transition-colors duration-200">
              <span className="text-[15px] text-secondary dark:text-gray-400">purayathvivek@gmail.com</span>
              <span className="text-muted dark:text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                <ArrowIcon />
              </span>
            </div>
          </div>

        </BentoCard>
      </a>

      {/* Instagram + LinkedIn row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

        {/* Instagram */}
        <BentoCard className="p-5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 shrink-0">
                <Image src="/images/igdp.jpg" alt="Vivekkk" width={36} height={36} className="object-cover w-full h-full" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13px] font-bold text-primary dark:text-white leading-tight truncate">Vivekkk</h4>
                <p className="text-[11px] text-secondary dark:text-gray-500">@notso_vivekkk</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>
          <p className="text-[12px] text-primary dark:text-gray-200 leading-relaxed line-clamp-2">
            Modern outlook &amp; old school feelings. 🧬
          </p>
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-center">
            <a
              href="https://www.instagram.com/notso_vivekkk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-primary dark:text-gray-300 flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              Stalk here <ArrowIcon />
            </a>
          </div>
        </BentoCard>

        {/* LinkedIn */}
        <BentoCard className="p-5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 shrink-0">
                <Image src="/images/dp.jpg" alt="Vivek M" width={36} height={36} className="object-cover w-full h-full" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13px] font-bold text-primary dark:text-white leading-tight truncate">Vivek M</h4>
                <p className="text-[11px] text-secondary dark:text-gray-500">@vivekm</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#0A66C2] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          </div>
          <p className="text-[12px] text-primary dark:text-gray-200 leading-relaxed line-clamp-2">
            Building MVP&apos;s &amp; AI Systems. Smart Context Coder <span className="text-[#0A66C2]">@growthbae</span>
          </p>
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-center">
            <a
              href="https://www.linkedin.com/in/vivek-m12/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-primary dark:text-gray-300 flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              View profile <ArrowIcon />
            </a>
          </div>
        </BentoCard>

      </div>
    </div>
  );
}
