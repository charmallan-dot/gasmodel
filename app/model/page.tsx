"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { REGION_PRESETS, type RegionPreset } from "@/lib/presets";
import { runFirstOrderDecay, type WasteEntry, type ModelResult } from "@/lib/calculate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const currentYear = new Date().getFullYear();

function defaultWaste(): WasteEntry[] {
  const entries: WasteEntry[] = [];
  for (let y = currentYear - 5; y <= currentYear + 10; y++) {
    entries.push({ year: y, mass: 50000 });
  }
  return entries;
}

export default function ModelPage() {
  const [region, setRegion] = useState("gulf");
  const [k, setK] = useState(REGION_PRESETS.gulf.k);
  const [L0, setL0] = useState(REGION_PRESETS.gulf.L0);
  const [projectionYears, setProjectionYears] = useState(30);
  const [wasteData, setWasteData] = useState<WasteEntry[]>(defaultWaste);
  const [results, setResults] = useState<ModelResult[] | null>(null);

  function applyPreset(key: string) {
    const p = REGION_PRESETS[key];
    if (!p) return;
    setRegion(key);
    setK(p.k);
    setL0(p.L0);
  }

  function updateWaste(index: number, field: "year" | "mass", value: number) {
    setWasteData((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addRow() {
    const lastYear = wasteData.length > 0 ? wasteData[wasteData.length - 1].year + 1 : currentYear;
    setWasteData((prev) => [...prev, { year: lastYear, mass: 50000 }]);
  }

  function removeRow(index: number) {
    setWasteData((prev) => prev.filter((_, i) => i !== index));
  }

  function calculate() {
    const r = runFirstOrderDecay(wasteData, k, L0, projectionYears);
    setResults(r);
  }

  const chartData = useMemo(() => {
    if (!results) return null;
    return {
      labels: results.map((r) => r.year.toString()),
      datasets: [
        {
          label: "CH₄ Generation (m³/yr)",
          data: results.map((r) => r.methane),
          backgroundColor: "rgba(16, 185, 129, 0.6)",
          borderColor: "rgb(16, 185, 129)",
          borderWidth: 1,
        },
      ],
    };
  }, [results]);

  const preset = REGION_PRESETS[region];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-emerald-700">
          GasModel.io
        </Link>
        <span className="text-sm text-gray-400">First-Order Decay Model</span>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 grid lg:grid-cols-[340px_1fr] gap-8">
        {/* Sidebar controls */}
        <div className="space-y-6">
          {/* Region */}
          <section className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">
              Region
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(REGION_PRESETS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    region === key
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {preset && (
              <p className="text-xs text-gray-400">{preset.description}</p>
            )}
          </section>

          {/* Parameters */}
          <section className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">
              Parameters
            </h2>
            <label className="block">
              <span className="text-sm font-medium">
                k — Decay Rate (1/yr)
              </span>
              <input
                type="number"
                step="0.001"
                min="0.001"
                value={k}
                onChange={(e) => setK(parseFloat(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">
                L₀ — CH₄ Potential (m³/Mg)
              </span>
              <input
                type="number"
                step="1"
                min="1"
                value={L0}
                onChange={(e) => setL0(parseFloat(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">
                Projection (years after last waste)
              </span>
              <input
                type="number"
                step="1"
                min="1"
                max="100"
                value={projectionYears}
                onChange={(e) =>
                  setProjectionYears(parseInt(e.target.value) || 30)
                }
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              />
            </label>
          </section>

          {/* Waste Data */}
          <section className="rounded-xl border bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">
                Waste Acceptance (Mg/yr)
              </h2>
              <button
                onClick={addRow}
                className="text-xs text-emerald-600 hover:underline"
              >
                + Add Year
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
              {wasteData.map((w, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={w.year}
                    onChange={(e) =>
                      updateWaste(i, "year", parseInt(e.target.value) || 0)
                    }
                    className="w-24 rounded border px-2 py-1 text-sm"
                  />
                  <input
                    type="number"
                    value={w.mass}
                    onChange={(e) =>
                      updateWaste(i, "mass", parseFloat(e.target.value) || 0)
                    }
                    className="flex-1 rounded border px-2 py-1 text-sm"
                  />
                  <button
                    onClick={() => removeRow(i)}
                    className="text-red-400 hover:text-red-600 text-sm px-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>

          <button
            onClick={calculate}
            className="w-full rounded-lg bg-emerald-600 py-3 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Calculate
          </button>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {!results && (
            <div className="rounded-xl border bg-white p-12 shadow-sm text-center text-gray-400">
              <p className="text-lg">Configure parameters and click Calculate</p>
              <p className="text-sm mt-2">
                Results will appear here as a chart and data table.
              </p>
            </div>
          )}

          {results && chartData && (
            <>
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="font-semibold mb-4">
                  Methane Generation Over Time
                </h2>
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (ctx) =>
                            `${(ctx.parsed.y ?? 0).toLocaleString()} m³/yr`,
                        },
                      },
                    },
                    scales: {
                      x: {
                        title: { display: true, text: "Year" },
                        ticks: {
                          maxTicksLimit: 20,
                        },
                      },
                      y: {
                        title: { display: true, text: "CH₄ (m³/yr)" },
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>

              {/* Summary */}
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="font-semibold mb-3">Summary</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">
                      {Math.round(
                        Math.max(...results.map((r) => r.methane))
                      ).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Peak CH₄ (m³/yr)</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">
                      {results
                        .find(
                          (r) =>
                            r.methane ===
                            Math.max(...results.map((x) => x.methane))
                        )
                        ?.year}
                    </p>
                    <p className="text-xs text-gray-500">Peak Year</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">
                      {Math.round(
                        results.reduce((s, r) => s + r.methane, 0)
                      ).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Total CH₄ (m³)</p>
                  </div>
                </div>
              </div>

              {/* Data table */}
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="font-semibold mb-3">Yearly Data</h2>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b text-left text-gray-500">
                        <th className="py-2 pr-4">Year</th>
                        <th className="py-2">CH₄ (m³/yr)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((r) => (
                        <tr key={r.year} className="border-b last:border-0">
                          <td className="py-1.5 pr-4">{r.year}</td>
                          <td className="py-1.5">
                            {r.methane.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
