import BentoCard from "@/components/cards/BentoCard";

const ExternalArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

export default function WorkTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Card 1 — AI Therapy */}
      <BentoCard className="p-10 flex flex-col group cursor-pointer relative">
        <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-muted group-hover:text-primary group-hover:border-gray-300 transition-all">
          <ExternalArrow />
        </div>

        <h2 className="text-3xl font-bold text-primary mb-2">AI Therapy</h2>
        <p className="text-[17px] text-secondary mb-10">RAG-Based chat system</p>

        <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col justify-end mt-4 relative overflow-hidden h-[300px]">
          <div className="absolute top-6 left-6 right-6 bottom-6 bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
            <div className="h-8 bg-gray-100 rounded-lg mb-4 w-3/4" />
            <div className="h-8 bg-blue-50 rounded-lg mb-4 w-1/2 ml-auto" />
            <div className="h-8 bg-gray-100 rounded-lg mb-4 w-5/6" />
            <div className="mt-auto text-xs text-muted font-medium">
              • Positioning &amp; Persona mapped
              <br />
              • Memory + retrieval logic
              <br />
              • Emotional UX prioritized
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Card 2 — Fitness App */}
      <BentoCard className="p-10 flex flex-col group cursor-pointer relative">
        <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-muted group-hover:text-primary group-hover:border-gray-300 transition-all">
          <ExternalArrow />
        </div>

        <h2 className="text-3xl font-bold text-primary mb-2">Fitness App</h2>
        <p className="text-[17px] text-secondary mb-10">React Native + PostgreSQL</p>

        <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-6 flex items-center justify-center mt-4 relative overflow-hidden h-[300px]">
          <div className="w-[180px] h-[350px] bg-white rounded-[2rem] shadow-lg border-4 border-gray-800 p-4 translate-y-12">
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <div className="w-full h-24 bg-red-50 rounded-xl mb-4 flex items-center justify-center text-red-400 font-medium text-sm">
              Voice Log
            </div>
            <div className="w-full h-12 bg-gray-50 rounded-xl mb-2" />
            <div className="w-full h-12 bg-gray-50 rounded-xl" />
          </div>
        </div>
      </BentoCard>

      {/* Card 3 — Growthbae (full width) */}
      <BentoCard className="p-10 md:col-span-2 flex flex-col md:flex-row gap-10 group cursor-pointer relative">
        <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-muted group-hover:text-primary group-hover:border-gray-300 transition-all">
          <ExternalArrow />
        </div>

        <div className="md:w-1/3">
          <h2 className="text-3xl font-bold text-primary mb-2">Growthbae</h2>
          <p className="text-[17px] text-secondary mb-6">Agency Co-Founder</p>
          <p className="text-sm text-secondary leading-relaxed mb-4">
            Built and delivered 30+ international websites. Focused on product
            discovery, brand positioning, UX architecture, and rapid MVP
            execution.
          </p>
          <p className="text-sm font-semibold text-primary">
            Learned how to ship under constraints.
          </p>
        </div>

        <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden min-h-[200px]">
          <div className="grid grid-cols-3 gap-4 p-8 w-full opacity-60">
            <div className="h-16 bg-white shadow-sm rounded-lg" />
            <div className="h-16 bg-white shadow-sm rounded-lg" />
            <div className="h-16 bg-white shadow-sm rounded-lg" />
            <div className="h-16 bg-white shadow-sm rounded-lg col-span-2" />
            <div className="h-16 bg-white shadow-sm rounded-lg" />
          </div>
        </div>
      </BentoCard>

    </div>
  );
}
