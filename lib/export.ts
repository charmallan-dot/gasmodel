import { ModelResult } from "./calculate";

export function exportCSV(results: ModelResult[], filename = "gasmodel-results.csv") {
  const header = "Year,CH4 (m³/yr)\n";
  const rows = results.map((r) => `${r.year},${r.methane}`).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportPDF() {
  window.print();
}
