import BentoCard from "@/components/cards/BentoCard";

export default function AboutTab() {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <span className="text-muted text-sm flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
          Click around...{" "}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left — Text heavy card */}
        <BentoCard className="lg:col-span-7 p-10 md:p-12">
          <h1 className="text-3xl md:text-[40px] font-bold tracking-tight mb-12">
            What I&apos;m bout.
          </h1>

          <div className="space-y-10">
            <div>
              <h3 className="text-xs font-semibold text-muted tracking-widest uppercase mb-4">
                BACKGROUND
              </h3>
              <p className="text-[16px] text-secondary leading-relaxed">
                I operate at the intersection of product thinking and technical
                execution. Started in design. Scaled into shipping full-stack
                systems. Now intensely focused on AI-native products. I believe
                AI products fail when they are merely experiments, and win only
                when they seamlessly integrate into user behavior.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted tracking-widest uppercase mb-4">
                WHAT I&apos;VE DONE
              </h3>
              <p className="text-[16px] text-secondary leading-relaxed">
                Previously, I Co-founded Growthbae — where I delivered 30+
                international websites. I learned how to ship under strict
                constraints and how to turn vague ideas into tangible, shipped
                outcomes. Recently, I&apos;ve built multiple AI and SaaS products
                from 0 → usable, including a RAG-based therapy system and a
                full-stack fitness logging app.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted tracking-widest uppercase mb-4">
                HOW I THINK
              </h3>
              <ul className="text-[16px] text-secondary space-y-2">
                <li>• Systems over features</li>
                <li>• Positioning before building</li>
                <li>• UX before complexity</li>
                <li>• Execution over theory</li>
              </ul>
            </div>
          </div>
        </BentoCard>

        {/* Right — 2-col small cards grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-6">
          {/* Twitter mini */}
          <BentoCard className="p-5 col-span-2 sm:col-span-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                  V
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">Vivek</h4>
                  <p className="text-xs text-secondary">@vivek</p>
                </div>
              </div>
              <p className="text-sm text-primary">AI PM • execution obsessed</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-center">
              <span className="text-xs font-semibold text-primary flex items-center gap-1 cursor-pointer">
                Connect{" "}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </div>
          </BentoCard>

          {/* Music player / current focus */}
          <BentoCard className="p-5 col-span-2 sm:col-span-1 flex flex-col items-center text-center justify-between">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-black rounded-xl mb-4 shadow-lg flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="w-full">
              <h4 className="text-sm font-bold text-primary">Portfolio-Grade</h4>
              <p className="text-xs text-secondary">AI Products</p>
            </div>
            <div className="flex items-center gap-4 mt-4 text-muted w-full justify-center">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11 19l-7-7 7-7v14zM20 19l-7-7 7-7v14z" />
              </svg>
              <svg width="24" height="24" fill="black" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 5l7 7-7 7V5zM4 5l7 7-7 7V5z" />
              </svg>
            </div>
          </BentoCard>

          {/* Full-width bottom graphic card */}
          <BentoCard className="p-0 col-span-2 relative group h-[240px]">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h4 className="font-bold text-lg text-primary">
                Operating at AI PM Level
              </h4>
              <p className="text-sm text-secondary mt-1">Before the title.</p>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
