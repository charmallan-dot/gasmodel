import Link from "next/link";

const resources = [
  {
    title: "EPA LFG Energy Project Development Handbook",
    desc: "Comprehensive guide to landfill gas energy project development, including gas generation estimation methods.",
    url: "https://www.epa.gov/sites/default/files/2016-07/documents/pdh_full.pdf",
    tag: "PDF",
  },
  {
    title: "LandGEM — Landfill Gas Emissions Model (v3.03)",
    desc: "EPA's Excel-based first-order decay model. Industry standard for US landfill gas estimation.",
    url: "https://www.epa.gov/catc/clean-air-technology-center-products#702702702702702702702",
    tag: "Tool",
  },
  {
    title: "IPCC Guidelines — Chapter 3: Solid Waste Disposal",
    desc: "IPCC 2006 guidelines for national greenhouse gas inventories. Defines the FOD methodology used worldwide.",
    url: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/5_Volume5/V5_3_Ch3_SWDS.pdf",
    tag: "PDF",
  },
  {
    title: "UK LFTGN 03 — Guidance on the Management of Landfill Gas",
    desc: "Environment Agency technical guidance for landfill gas risk assessment and management in England & Wales.",
    url: "https://www.gov.uk/government/publications/landfill-technical-guidance",
    tag: "Guidance",
  },
  {
    title: "GasSim Model",
    desc: "Stochastic landfill gas risk assessment model used in the UK for regulatory submissions.",
    url: "https://www.gassim.co.uk",
    tag: "Tool",
  },
  {
    title: "World Bank — Handbook for the Preparation of LFG to Energy Projects",
    desc: "Practical guidance for developing countries on landfill gas capture and utilisation.",
    url: "https://openknowledge.worldbank.org/handle/10986/23101",
    tag: "Guide",
  },
];

const trainingProgram = [
  { week: "Week 1–2", topic: "Fundamentals", detail: "Landfill gas composition, generation mechanisms, and first-order decay theory." },
  { week: "Week 3", topic: "Model Parameters", detail: "Understanding k, L₀, waste composition, moisture, and climate effects on decay rates." },
  { week: "Week 4", topic: "Hands-On: GasModel.io", detail: "Run models with different presets. Compare UK vs arid climate outputs." },
  { week: "Week 5", topic: "LandGEM Deep Dive", detail: "Work through EPA's LandGEM model. Understand CAA defaults vs inventory defaults." },
  { week: "Week 6", topic: "UK Regulatory Context", detail: "LFTGN guidance, GasSim requirements, and PPC permit applications." },
  { week: "Week 7", topic: "Gas Collection & Energy", detail: "Collection efficiency, flare design, and gas-to-energy feasibility screening." },
  { week: "Week 8", topic: "Capstone Project", detail: "Model a real landfill scenario end-to-end. Produce a professional LFG assessment report." },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-emerald-700">GasModel.io</Link>
        <div className="flex items-center gap-4">
          <Link href="/model" className="text-sm text-gray-500 hover:text-gray-700">Model</Link>
          <span className="text-sm font-medium text-emerald-700">Learn</span>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-16">
        {/* Resources */}
        <section>
          <h1 className="text-3xl font-extrabold mb-2">Learning Resources</h1>
          <p className="text-gray-500 mb-8">Free guides, tools, and reference documents for landfill gas modelling.</p>
          <div className="grid gap-4">
            {resources.map((r) => (
              <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer"
                className="rounded-xl border bg-white p-5 shadow-sm hover:border-emerald-300 transition block">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-emerald-700">{r.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{r.desc}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                    {r.tag}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Training Program */}
        <section>
          <h2 className="text-2xl font-bold mb-2">8-Week Training Program</h2>
          <p className="text-gray-500 mb-6">
            A structured self-study program to go from beginner to confident LFG modeller.
            All resources referenced are freely available online.
          </p>
          <div className="space-y-3">
            {trainingProgram.map((w) => (
              <div key={w.week} className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="flex items-baseline gap-3">
                  <span className="shrink-0 text-xs font-bold text-emerald-600 uppercase tracking-wide w-20">
                    {w.week}
                  </span>
                  <div>
                    <h3 className="font-semibold">{w.topic}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{w.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} GasModel.io — Open-source LFG modelling
      </footer>
    </div>
  );
}
