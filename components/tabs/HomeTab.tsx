import BentoCard from "@/components/cards/BentoCard";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

export default function HomeTab() {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <span className="text-muted text-sm flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
          Look around...{" "}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left — Hero text card */}
        <BentoCard className="lg:col-span-7 p-10 md:p-12">
          <h1 className="text-3xl md:text-[40px] font-semibold tracking-tight mb-12">
            <span className="text-primary font-bold">Vivek</span> is shipping{" "}
            <u className="decoration-2 underline-offset-4 decoration-black">AI products</u>.
          </h1>
          <div className="space-y-6 text-[17px] text-secondary leading-relaxed">
            <p>i turn messy ideas into shipped AI products.</p>
            <p>product-first.</p>
            <p>execution-obsessed.</p>
            <p>AI-native.</p>
            <p>
              i operate at the intersection of product thinking and technical
              execution. i started in design, scaled into shipping full-stack
              systems, and am now focused on AI-native products.
            </p>
            <p>i don&apos;t just explore ideas.</p>
            <p>i ship them.</p>
          </div>
        </BentoCard>

        {/* Right column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Focus card */}
          <BentoCard className="p-6 pb-8 relative group cursor-pointer">
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-muted group-hover:text-primary transition-colors">
              <ArrowIcon />
            </div>
            <h3 className="text-xs font-semibold text-muted tracking-widest uppercase mb-6 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>{" "}
              FOCUS
            </h3>

            <div className="bg-bg rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                AI
              </div>
              <div>
                <h4 className="text-sm font-semibold text-primary">AI Agents</h4>
                <p className="text-xs text-secondary">Autonomous Systems</p>
              </div>
            </div>

            <div className="bg-bg rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                RG
              </div>
              <div>
                <h4 className="text-sm font-semibold text-primary">RAG Systems</h4>
                <p className="text-xs text-secondary">Memory + Retrieval Logic</p>
              </div>
            </div>
          </BentoCard>

          {/* Twitter card */}
          <BentoCard className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg">
                    V
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary leading-tight">Vivek</h4>
                    <p className="text-xs text-secondary">@vivek</p>
                  </div>
                </div>
                <div className="text-[#1DA1F2]">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </div>
              </div>
              <p className="text-[15px] text-primary">
                shipping ai products ✷ ai pm{" "}
                <span className="text-blue-500">@rag-systems</span> ✷ prev{" "}
                <span className="text-blue-500">@growthbae</span>
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
              <span className="text-xs font-semibold text-primary flex items-center gap-1 cursor-pointer">
                Read more tweets{" "}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
