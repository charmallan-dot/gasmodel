/**
 * First-order decay model for landfill methane generation.
 *
 * Q(t) = Σ  2 · k · L₀ · Mᵢ · e^(−k · tᵢⱼ)
 *
 * Where:
 *   Mᵢ  = waste accepted in year i (Mg)
 *   tᵢⱼ = age of waste section j at calculation year t  (= t − i − 0.5)
 *   k   = decay rate constant (1/yr)
 *   L₀  = methane generation potential (m³ CH₄ / Mg waste)
 */

export interface WasteEntry {
  year: number;
  mass: number; // Mg (tonnes)
}

export interface ModelResult {
  year: number;
  methane: number; // m³ CH₄
}

export function runFirstOrderDecay(
  wasteData: WasteEntry[],
  k: number,
  L0: number,
  projectionYears: number = 30
): ModelResult[] {
  if (wasteData.length === 0) return [];

  const firstYear = Math.min(...wasteData.map((w) => w.year));
  const lastWasteYear = Math.max(...wasteData.map((w) => w.year));
  const endYear = lastWasteYear + projectionYears;

  const results: ModelResult[] = [];

  for (let t = firstYear; t <= endYear; t++) {
    let Q = 0;
    for (const { year: i, mass: Mi } of wasteData) {
      const tij = t - i - 0.5; // mid-year convention
      if (tij < 0 || Mi <= 0) continue;
      Q += 2 * k * L0 * Mi * Math.exp(-k * tij);
    }
    results.push({ year: t, methane: Math.round(Q * 100) / 100 });
  }

  return results;
}
