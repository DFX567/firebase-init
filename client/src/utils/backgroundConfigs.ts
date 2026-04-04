export interface PlanetConfig {
  id: string;
  sizePercent: number;
  x: number;
  y: number;
  colorPreset: string;
  type: "rocky" | "gas" | "moon";
  rotationSpeed: number;
  opacity: number;
}

export interface NebulaConfig {
  id: string;
  x: number;
  y: number;
  sizePercent: number;
  color: string;
  opacity: number;
}

export interface BackgroundConfig {
  id: string;
  name: string;
  bgGradient: string;
  stars: {
    enabled: boolean;
    count: number;
    seed: number;
    color: string;
  };
  comets: {
    enabled: boolean;
    count: number;
    seed: number;
    speed: "slow" | "medium" | "fast";
  };
  planets: PlanetConfig[];
  nebulas: NebulaConfig[];
  createdAt: number;
}

const KEY = "bg-configs-v1";

export const getBgConfigs = (): BackgroundConfig[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getBgConfig = (id: string): BackgroundConfig | null =>
  getBgConfigs().find((c) => c.id === id) ?? null;

export const saveBgConfig = (config: BackgroundConfig): void => {
  const all = getBgConfigs();
  const idx = all.findIndex((c) => c.id === config.id);
  if (idx >= 0) all[idx] = config;
  else all.push(config);
  localStorage.setItem(KEY, JSON.stringify(all));
};

export const deleteBgConfig = (id: string): void => {
  localStorage.setItem(KEY, JSON.stringify(getBgConfigs().filter((c) => c.id !== id)));
};

export const PLANET_COLOR_PRESETS: Record<string, [string, string, string]> = {
  Rosa: ["#fda4af", "#fb7185", "#e11d48"],
  Violeta: ["#c4b5fd", "#8b5cf6", "#6d28d9"],
  Azul: ["#93c5fd", "#3b82f6", "#1d4ed8"],
  Verde: ["#86efac", "#22c55e", "#15803d"],
  Naranja: ["#fdba74", "#f97316", "#c2410c"],
  Dorado: ["#fde68a", "#fbbf24", "#d97706"],
  Gris: ["#d1d5db", "#9ca3af", "#6b7280"],
  Cian: ["#a5f3fc", "#06b6d4", "#0e7490"],
};

export const COMET_DURATIONS = { slow: [8, 14], medium: [4, 8], fast: [2, 4] };

export const DEFAULT_BG_CONFIG: Omit<BackgroundConfig, "id" | "name" | "createdAt"> = {
  bgGradient: "linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)",
  stars: { enabled: true, count: 80, seed: 17, color: "#ffffff" },
  comets: { enabled: true, count: 6, seed: 5, speed: "medium" },
  planets: [],
  nebulas: [],
};
