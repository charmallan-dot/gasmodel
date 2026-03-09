export interface RegionPreset {
  label: string;
  k: number; // decay rate (1/yr)
  L0: number; // methane generation potential (m³/Mg)
  description: string;
}

export const REGION_PRESETS: Record<string, RegionPreset> = {
  uk: {
    label: "UK",
    k: 0.05,
    L0: 85,
    description: "Temperate / wet climate (GasSim defaults)",
  },
  us: {
    label: "US (EPA)",
    k: 0.04,
    L0: 100,
    description: "EPA AP-42 / LandGEM defaults",
  },
  gulf: {
    label: "Gulf (Arid)",
    k: 0.02,
    L0: 60,
    description: "Arid climate — lower moisture, slower decay",
  },
  international: {
    label: "International",
    k: 0.05,
    L0: 80,
    description: "IPCC default values",
  },
};
