import GraphIllustration from "@/components/ui/GraphIllustration";

function SynthesisIllustration() {
  return (
    <svg viewBox="0 0 300 300" fill="none" className="h-full w-full">
      <rect x="60" y="40" width="140" height="180" rx="8" fill="#1c1730" stroke="#cebdff" strokeOpacity="0.25" />
      <rect x="90" y="70" width="140" height="180" rx="8" fill="#241b3f" stroke="#cebdff" strokeOpacity="0.4" />
      <rect x="120" y="100" width="140" height="180" rx="8" fill="#2f2050" stroke="#cebdff" strokeOpacity="0.6" />
      <g stroke="#e8ddff" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round">
        <line x1="145" y1="140" x2="235" y2="140" />
        <line x1="145" y1="165" x2="220" y2="165" />
        <line x1="145" y1="190" x2="235" y2="190" />
        <line x1="145" y1="215" x2="200" y2="215" />
      </g>
    </svg>
  );
}

export default function BentoSection() {
  return (
    <section id="features" className="py-24 px-4 md:px-12 max-w-360 mx-auto scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full md:h-175">
        <div className="md:col-span-8 etched-border bg-[#211e27] rounded-xl p-10 flex flex-col justify-between group overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[#c0c1ff] mb-4">
              <span className="material-symbols-outlined">account_tree</span>
              <span className="font-label-mono text-label-mono uppercase">
                Neural Persistence
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-3xl mb-4">
              Graph Memory
            </h3>
            <p className="font-body-md text-body-md text-[#c7c4d7] max-w-md">
              Every session adds to your knowledge graph, connecting new
              material to what you&apos;ve already covered.
            </p>
          </div>
          <div className="absolute right-[-5%] bottom-[-5%] w-2/3 h-2/3 opacity-40 pointer-events-none group-hover:opacity-60 transition-opacity duration-700">
            <GraphIllustration />
          </div>
        </div>

        <div className="md:col-span-4 etched-border bg-[#2b2832] rounded-xl p-10 flex flex-col group">
          <div className="flex items-center gap-2 text-[#f3aeff] mb-4">
            <span className="material-symbols-outlined">chat_bubble</span>
            <span className="font-label-mono text-label-mono uppercase">
              Context Engine
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md text-2xl mb-4">
            Session Intelligence
          </h3>
          <p className="font-body-sm text-body-sm text-[#c7c4d7] mb-8">
            Questions stay grounded in the material you uploaded, with
            citations back to the source whenever you need to check one.
          </p>
          <div className="mt-auto h-32 w-full bg-[#15121b] rounded-lg border border-white/5 p-4 overflow-hidden">
            <div className="h-2 w-2/3 bg-[#c0c1ff]/20 rounded mb-2" />
            <div className="h-2 w-full bg-white/5 rounded mb-2" />
            <div className="h-2 w-1/2 bg-white/5 rounded" />
          </div>
        </div>

        <div className="md:col-span-12 etched-border bg-[#13103A] rounded-xl p-10 flex flex-col md:flex-row items-center gap-12 overflow-hidden">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[#cebdff] mb-4">
              <span className="material-symbols-outlined">biotech</span>
              <span className="font-label-mono text-label-mono uppercase">
                Deep Discovery
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-3xl mb-4">
              Deep Research Mode
            </h3>
            <p className="font-body-md text-body-md text-[#c7c4d7] max-w-xl">
              Point it at your whole resource library and get a structured
              report back — organized by theme, with citations to the source
              material.
            </p>
            <div className="mt-8 flex gap-4">
              <span className="font-label-mono text-[10px] border border-white/10 px-2 py-1 rounded bg-white/5">
                PDF · DOCX · SLIDES
              </span>
              <span className="font-label-mono text-[10px] border border-white/10 px-2 py-1 rounded bg-white/5">
                URLS · NOTES
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-[#0f0d15] rounded-lg border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 p-6 opacity-90 group-hover:scale-105 transition-transform duration-700">
              <SynthesisIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
