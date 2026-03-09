import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-emerald-700">GasModel.io</span>
        <Link
          href="/model"
          className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
        >
          Start Modelling →
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto gap-6 py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Landfill Gas Modelling,{" "}
          <span className="text-emerald-600">Made Simple</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl">
          GasModel.io is a free, web-based tool for estimating methane generation
          from landfills using the <strong>IPCC First-Order Decay</strong> model.
          No downloads, no licence fees — just open your browser and go.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mt-8 w-full text-left">
          {[
            {
              title: "Region Presets",
              desc: "Pre-loaded k and L₀ defaults for UK, US, Gulf (arid), and International climates.",
            },
            {
              title: "Instant Results",
              desc: "Enter waste acceptance data, hit calculate, and see yearly methane generation charted instantly.",
            },
            {
              title: "100% Client-Side",
              desc: "Your data never leaves your browser. No sign-up, no server, no tracking.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <h3 className="font-semibold text-emerald-700 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>

        <Link
          href="/model"
          className="mt-8 rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-700 transition"
        >
          Launch the Model
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} GasModel.io — Open-source LFG modelling
      </footer>
    </div>
  );
}
