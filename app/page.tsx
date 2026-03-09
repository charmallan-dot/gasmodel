import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-emerald-700">GasModel.io</span>
        <div className="flex items-center gap-4">
          <Link href="/learn" className="text-sm text-gray-500 hover:text-gray-700">Learn</Link>
          <Link href="/model"
            className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition">
            Start Modelling →
          </Link>
        </div>
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
            { title: "Region Presets", desc: "Pre-loaded k and L₀ defaults for UK, US, Gulf (arid), and International climates." },
            { title: "Instant Results", desc: "Enter waste acceptance data, hit calculate, and see yearly methane generation charted instantly." },
            { title: "Export & Share", desc: "Download results as CSV or generate a print-friendly PDF report in one click." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-emerald-700 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>

        <Link href="/model"
          className="mt-8 rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-700 transition">
          Launch the Model
        </Link>
      </section>

      {/* Who is this for? */}
      <section className="bg-white border-t py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Who is this for?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { role: "Environmental Engineers", desc: "Quick screening-level LFG estimates for permit applications, gas collection design, and closure planning." },
              { role: "Consultants", desc: "Produce client-ready methane projections without expensive desktop software or licence renewals." },
              { role: "Regulators & Reviewers", desc: "Independently verify LFG estimates submitted by operators using a transparent, open model." },
              { role: "Students & Researchers", desc: "Learn first-order decay modelling interactively — adjust parameters and see results in real time." },
            ].map((item) => (
              <div key={item.role} className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <h3 className="font-semibold">{item.role}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">How does it compare?</h2>
          <p className="text-center text-gray-500 mb-8">LandGEM vs GasSim vs GasModel.io</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-3 font-semibold">Feature</th>
                  <th className="px-4 py-3 font-semibold">LandGEM</th>
                  <th className="px-4 py-3 font-semibold">GasSim</th>
                  <th className="px-4 py-3 font-semibold text-emerald-700">GasModel.io</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Cost", "Free", "£2,500+/yr", "Free"],
                  ["Platform", "Excel (Windows)", "Windows only", "Any browser"],
                  ["Model type", "First-order decay", "Stochastic / multi-phase", "First-order decay"],
                  ["Setup required", "Download + Excel", "Install + licence", "None — open URL"],
                  ["Region presets", "US only", "UK only", "UK, US, Gulf, International"],
                  ["Export", "Excel sheets", "PDF reports", "CSV + PDF"],
                  ["Open source", "No", "No", "Yes"],
                ].map(([feature, landgem, gassim, gm]) => (
                  <tr key={feature}>
                    <td className="px-4 py-2.5 font-medium">{feature}</td>
                    <td className="px-4 py-2.5 text-gray-500">{landgem}</td>
                    <td className="px-4 py-2.5 text-gray-500">{gassim}</td>
                    <td className="px-4 py-2.5 text-emerald-700 font-medium">{gm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            GasModel.io is a screening tool. For complex regulatory submissions, GasSim&apos;s stochastic modelling may be required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} GasModel.io — Open-source LFG modelling |{" "}
        <Link href="/learn" className="hover:underline">Learning Resources</Link>
      </footer>
    </div>
  );
}
