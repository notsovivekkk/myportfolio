import BentoCard from "@/components/cards/BentoCard";

const TwitterIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

export default function ContactTab() {
  return (
    <div className="max-w-[600px] mx-auto space-y-6">

      {/* iMessage chat card */}
      <BentoCard className="p-8">
        <div className="flex items-end gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center font-bold text-gray-500 text-xs">
            U
          </div>
          <div className="bg-gray-100 text-[#111] px-5 py-3 rounded-[20px] rounded-bl-[4px] text-[15px] max-w-[85%]">
            want to work together? just want to chat? send me a text here (no, for real)
          </div>
        </div>

        <div className="flex justify-end mb-8">
          <div className="bg-[#007AFF] text-white px-5 py-3 rounded-[20px] rounded-br-[4px] text-[15px]">
            sounds good 🙏
          </div>
        </div>

        {/* Fake input bar */}
        <div className="flex items-center gap-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A3A3A3" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 flex items-center justify-between">
            <span className="text-gray-400 text-sm">iMessage</span>
            <div className="w-6 h-6 rounded-full bg-[#007AFF] flex items-center justify-center opacity-50">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Email + Twitter row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Email card */}
        <BentoCard className="p-6 cursor-pointer group">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-primary">Vivek</h3>
              <p className="text-xs text-secondary">hello@vivek.fyi</p>
            </div>
            <div className="w-10 h-10 bg-black rounded-[10px] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-secondary mb-4">
            <p className="mb-2">
              <span className="text-primary font-medium">To</span>{" "}
              hello@vivek.fyi
            </p>
            <p className="mb-4">Let&apos;s build</p>
            <p className="text-gray-400">Say hello...</p>
          </div>
          <div className="text-center w-full bg-gray-50 hover:bg-gray-100 transition-colors py-3 rounded-xl border border-gray-100 text-sm font-semibold text-primary">
            Email Me ↗
          </div>
        </BentoCard>

        {/* Twitter / X card */}
        <BentoCard className="p-6 flex flex-col justify-between cursor-pointer group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                  V
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary leading-tight">Vivek</h4>
                  <p className="text-xs text-secondary">@vivek</p>
                </div>
              </div>
              <div className="text-[#1DA1F2]">
                <TwitterIcon />
              </div>
            </div>
            <p className="text-[15px] text-primary leading-relaxed">
              i build ai products ✷ execution obsessed ✷ prev @growthbae
            </p>
          </div>
          <div className="text-center w-full bg-gray-50 hover:bg-gray-100 transition-colors py-3 rounded-xl border border-gray-100 text-sm font-semibold text-primary mt-6">
            DM Me ↗
          </div>
        </BentoCard>
      </div>

    </div>
  );
}
