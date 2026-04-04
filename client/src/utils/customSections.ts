export interface CustomSectionConfig {
  id: string;
  title: string;
  emoji: string;
  dateLabel: string;
  cardGradient: string;
  mainBg: string;
  contentBg: string;
  logoType: "emoji" | "image";
  logoValue: string;
  contentTypes: ("letter" | "poem")[];
  hasYears: boolean;
  yearStart: number;
  yearEnd: number;
  position: "main" | "custom";
  createdAt: number;
}

export interface SectionVisualOverride {
  cardGradient?: string;
  mainBg?: string;
  contentBg?: string;
  logoValue?: string;
  logoType?: "emoji" | "image";
}

const SECTIONS_KEY = "custom-sections-v1";
const VISUAL_PREFIX = "visual-override-";

export const getCustomSections = (): CustomSectionConfig[] => {
  try {
    const raw = localStorage.getItem(SECTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getCustomSection = (id: string): CustomSectionConfig | null =>
  getCustomSections().find((s) => s.id === id) ?? null;

export const saveCustomSection = (section: CustomSectionConfig): void => {
  const all = getCustomSections();
  const idx = all.findIndex((s) => s.id === section.id);
  if (idx >= 0) all[idx] = section;
  else all.push(section);
  localStorage.setItem(SECTIONS_KEY, JSON.stringify(all));
};

export const deleteCustomSection = (id: string): void => {
  const filtered = getCustomSections().filter((s) => s.id !== id);
  localStorage.setItem(SECTIONS_KEY, JSON.stringify(filtered));
};

export const getVisualOverride = (sectionId: string): SectionVisualOverride => {
  try {
    const raw = localStorage.getItem(VISUAL_PREFIX + sectionId);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const setVisualOverride = (
  sectionId: string,
  override: SectionVisualOverride
): void => {
  localStorage.setItem(VISUAL_PREFIX + sectionId, JSON.stringify(override));
};

export const GRADIENT_PRESETS = [
  { name: "Rosa", value: "linear-gradient(135deg,#f43f5e,#ec4899)" },
  { name: "Violeta", value: "linear-gradient(135deg,#8b5cf6,#6366f1)" },
  { name: "Azul", value: "linear-gradient(135deg,#3b82f6,#06b6d4)" },
  { name: "Verde", value: "linear-gradient(135deg,#22c55e,#10b981)" },
  { name: "Naranja", value: "linear-gradient(135deg,#f97316,#ef4444)" },
  { name: "Dorado", value: "linear-gradient(135deg,#eab308,#f97316)" },
  { name: "Índigo", value: "linear-gradient(135deg,#4f46e5,#7c3aed)" },
  { name: "Coral", value: "linear-gradient(135deg,#f43f5e,#fb923c)" },
];

export const BACKGROUND_PRESETS = [
  { name: "Cosmos", value: "linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)" },
  { name: "Noche", value: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)" },
  { name: "Rosa oscuro", value: "linear-gradient(135deg,#500724 0%,#831843 50%,#9d174d 100%)" },
  { name: "Violeta", value: "linear-gradient(135deg,#2e1065 0%,#4c1d95 50%,#5b21b6 100%)" },
  { name: "Índigo", value: "linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#3730a3 100%)" },
  { name: "Azul profundo", value: "linear-gradient(135deg,#0c4a6e 0%,#075985 50%,#0369a1 100%)" },
  { name: "Verde bosque", value: "linear-gradient(135deg,#14532d 0%,#166534 50%,#15803d 100%)" },
  { name: "Girasol", value: "linear-gradient(135deg,#fefce8 0%,#fef9c3 50%,#fef08a 100%)" },
  { name: "Atardecer", value: "linear-gradient(135deg,#7c2d12 0%,#b45309 50%,#92400e 100%)" },
  { name: "Oscuro puro", value: "linear-gradient(135deg,#09090b 0%,#18181b 100%)" },
];

export const BUILTIN_DEFAULTS: Record<string, SectionVisualOverride> = {
  sanvalentin: {
    cardGradient: "linear-gradient(135deg,#f43f5e,#ec4899,#e11d48)",
    mainBg: "linear-gradient(135deg,#500724 0%,#831843 50%,#9d174d 100%)",
    contentBg: "linear-gradient(135deg,#0f172a,#1e1b4b)",
    logoValue: "💕",
    logoType: "emoji",
  },
  anniversary: {
    cardGradient: "linear-gradient(135deg,#ec4899,#f43f5e,#db2777)",
    mainBg: "linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#3730a3 100%)",
    contentBg: "linear-gradient(135deg,#0f172a,#1e1b4b)",
    logoValue: "💍",
    logoType: "emoji",
  },
  cumple: {
    cardGradient: "linear-gradient(135deg,#8b5cf6,#a78bfa,#4f46e5)",
    mainBg: "linear-gradient(135deg,#2e1065 0%,#4c1d95 50%,#5b21b6 100%)",
    contentBg: "linear-gradient(135deg,#0f172a,#1e1b4b)",
    logoValue: "🎂",
    logoType: "emoji",
  },
  amoramistad: {
    cardGradient: "linear-gradient(135deg,#f59e0b,#f97316,#eab308)",
    mainBg: "linear-gradient(135deg,#7c2d12 0%,#b45309 50%,#92400e 100%)",
    contentBg: "linear-gradient(135deg,#0f172a,#1e1b4b)",
    logoValue: "🫶",
    logoType: "emoji",
  },
  floresamarillas: {
    cardGradient: "linear-gradient(135deg,#eab308,#d97706,#f59e0b)",
    mainBg: "linear-gradient(135deg,#fefce8 0%,#fef9c3 50%,#fef08a 100%)",
    contentBg: "linear-gradient(135deg,#fefce8,#fef9c3)",
    logoValue: "🌻",
    logoType: "emoji",
  },
};
