export type SurfaceDetail = "none" | "continents" | "craters" | "storm" | "lava" | "icecaps";
export type StarMovement = "twinkle" | "drift" | "pulse" | "none";
export type StarSpeed = "slow" | "medium" | "fast";

export interface PlanetConfig {
  id: string;
  sizePercent: number;
  x: number;
  y: number;
  colorPreset: string;
  type: "rocky" | "gas" | "moon";
  rotationSpeed: number;
  opacity: number;
  surfaceDetail: SurfaceDetail;
  surfaceColor: string;
  surfaceIntensity: number;
  hasRings: boolean;
  ringsColor: string;
  ringsOpacity: number;
  hasAtmosphere: boolean;
  atmosphereColor: string;
  atmosphereSize: number;
}

export interface NebulaConfig {
  id: string;
  x: number;
  y: number;
  sizePercent: number;
  color: string;
  opacity: number;
}

export interface CometIndividual {
  id: string;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  length: number;
  color: string;
  width: number;
  phase: number;
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
    movement: StarMovement;
    driftAngle: number;
    speed: StarSpeed;
  };
  comets: {
    enabled: boolean;
    list: CometIndividual[];
  };
  planets: PlanetConfig[];
  nebulas: NebulaConfig[];
  createdAt: number;
}

const KEY = "bg-configs-v1";

export const getBgConfigs = (): BackgroundConfig[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map(migrateBgConfig);
  } catch {
    return [];
  }
};

function migrateBgConfig(c: BackgroundConfig & { comets?: unknown }): BackgroundConfig {
  const comets = c.comets as BackgroundConfig["comets"] & { count?: number; seed?: number; speed?: string };
  if (comets && typeof comets.count === "number") {
    return { ...c, comets: { enabled: comets.enabled, list: [] } };
  }
  return {
    ...c,
    stars: {
      movement: "twinkle",
      driftAngle: 0,
      speed: "medium",
      ...c.stars,
    },
    comets: c.comets ?? { enabled: true, list: [] },
    planets: (c.planets ?? []).map((p: PlanetConfig) => ({
      surfaceDetail: "none",
      surfaceColor: "#2d6a4f",
      surfaceIntensity: 0.5,
      hasRings: false,
      ringsColor: "#fde68a",
      ringsOpacity: 0.5,
      hasAtmosphere: false,
      atmosphereColor: "#60a5fa",
      atmosphereSize: 1.4,
      ...p,
    })),
  };
}

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
  Rojo: ["#fca5a5", "#ef4444", "#b91c1c"],
  Turquesa: ["#99f6e4", "#14b8a6", "#0f766e"],
};

export const STAR_SPEED_DURATIONS: Record<StarSpeed, [number, number]> = {
  slow: [5, 9],
  medium: [2.5, 5],
  fast: [1, 2.5],
};

export const DEFAULT_BG_CONFIG: Omit<BackgroundConfig, "id" | "name" | "createdAt"> = {
  bgGradient: "linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)",
  stars: { enabled: true, count: 80, seed: 17, color: "#ffffff", movement: "twinkle", driftAngle: 180, speed: "medium" },
  comets: { enabled: true, list: [] },
  planets: [],
  nebulas: [],
};

export const DEFAULT_PLANET: Omit<PlanetConfig, "id"> = {
  sizePercent: 20, x: 50, y: 30,
  colorPreset: "Violeta", type: "rocky", rotationSpeed: 60, opacity: 0.85,
  surfaceDetail: "none", surfaceColor: "#2d6a4f", surfaceIntensity: 0.5,
  hasRings: false, ringsColor: "#fde68a", ringsOpacity: 0.5,
  hasAtmosphere: false, atmosphereColor: "#60a5fa", atmosphereSize: 1.4,
};

export const DEFAULT_COMET: Omit<CometIndividual, "id"> = {
  startX: 20, startY: -2, angle: 135, speed: 6, length: 120, color: "#ffffff", width: 2, phase: 0,
};
