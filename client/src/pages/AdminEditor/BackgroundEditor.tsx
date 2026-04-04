import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save, Check, Plus, Trash2, Pencil, ChevronDown, ChevronUp,
  Star, Orbit, Globe, Wind, Layers, Eye, X, Copy, RotateCcw
} from "lucide-react";
import {
  BackgroundConfig, PlanetConfig, NebulaConfig, CometIndividual,
  getBgConfigs, getBgConfig, saveBgConfig, deleteBgConfig,
  PLANET_COLOR_PRESETS, DEFAULT_BG_CONFIG, DEFAULT_PLANET, DEFAULT_COMET,
  type SurfaceDetail, type StarMovement, type StarSpeed,
} from "@/utils/backgroundConfigs";
import { BACKGROUND_PRESETS } from "@/utils/customSections";
import CustomBackground from "@/components/CustomBackground";

type SubTab = "base" | "stars" | "comets" | "planets" | "nebulas";
type SaveState = "idle" | "saved";

const uid = () => Math.random().toString(36).slice(2, 9);

function Slider({ label, value, min, max, step = 1, onChange, unit = "" }: {
  label: string; value: number; min: number; max: number; step?: number;
  onChange: (v: number) => void; unit?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-white/50 text-xs">{label}</span>
        <span className="text-white/80 text-xs font-mono">{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full accent-indigo-400 cursor-pointer" />
    </div>
  );
}

const DIRECTION_PRESETS = [
  { label: "↑", angle: 270 }, { label: "↗", angle: 315 }, { label: "→", angle: 0 },
  { label: "↘", angle: 45 },  { label: "↓", angle: 90 },  { label: "↙", angle: 135 },
  { label: "←", angle: 180 }, { label: "↖", angle: 225 },
];

function DirectionPicker({ angle, onChange }: { angle: number; onChange: (a: number) => void }) {
  const active = DIRECTION_PRESETS.find((d) => d.angle === angle);
  return (
    <div className="space-y-2">
      <p className="text-white/50 text-xs">Dirección</p>
      <div className="flex gap-1 flex-wrap">
        {DIRECTION_PRESETS.map((d) => (
          <button key={d.angle} onClick={() => onChange(d.angle)}
            className={`w-9 h-9 rounded-lg text-base font-bold transition-all ${angle === d.angle ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/15"}`}>
            {d.label}
          </button>
        ))}
      </div>
      <Slider label="Ángulo exacto" value={angle} min={0} max={359} onChange={onChange} unit="°" />
    </div>
  );
}

function CometEditor({ comet, onChange, onDelete }: {
  comet: CometIndividual; onChange: (c: CometIndividual) => void; onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rad = (comet.angle * Math.PI) / 180;
  const arrowX = Math.cos(rad) * 12;
  const arrowY = Math.sin(rad) * 12;

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <button onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all">
        <div className="w-8 h-8 rounded-full flex-shrink-0 relative flex items-center justify-center bg-white/5">
          <svg width="20" height="20" viewBox="-14 -14 28 28">
            <line x1="0" y1="0" x2={arrowX} y2={arrowY} stroke={comet.color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx={arrowX} cy={arrowY} r="3" fill={comet.color} />
          </svg>
        </div>
        <div className="flex-1 text-left">
          <p className="text-white text-sm font-medium">Cometa · {comet.angle}° · {comet.speed}s</p>
          <p className="text-white/40 text-xs">X:{comet.startX}% Y:{comet.startY}% · {comet.length}px</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-1 text-white/30 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
        {open ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
          <DirectionPicker angle={comet.angle} onChange={(v) => onChange({ ...comet, angle: v })} />
          <Slider label="Pos X inicial" value={comet.startX} min={-10} max={110} unit="%" onChange={(v) => onChange({ ...comet, startX: v })} />
          <Slider label="Pos Y inicial" value={comet.startY} min={-10} max={110} unit="%" onChange={(v) => onChange({ ...comet, startY: v })} />
          <Slider label="Velocidad" value={comet.speed} min={2} max={20} unit="s" onChange={(v) => onChange({ ...comet, speed: v })} />
          <Slider label="Longitud cola" value={comet.length} min={30} max={400} unit="px" onChange={(v) => onChange({ ...comet, length: v })} />
          <Slider label="Grosor" value={comet.width} min={1} max={8} unit="px" onChange={(v) => onChange({ ...comet, width: v })} />
          <Slider label="Fase inicial (0=inicio, 1=mitad)" value={comet.phase} min={0} max={0.99} step={0.01} onChange={(v) => onChange({ ...comet, phase: v })} />
          <div className="flex items-center gap-3">
            <div>
              <p className="text-white/50 text-xs mb-1">Color</p>
              <input type="color" value={comet.color} onChange={(e) => onChange({ ...comet, color: e.target.value })}
                className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
            </div>
            <div className="flex gap-2 pt-4">
              {["#ffffff", "#fde68a", "#fbcfe8", "#a5f3fc", "#c4b5fd", "#86efac"].map((c) => (
                <button key={c} onClick={() => onChange({ ...comet, color: c })}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${comet.color === c ? "border-white scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const SURFACE_OPTIONS: { value: SurfaceDetail; label: string; emoji: string }[] = [
  { value: "none", label: "Ninguno", emoji: "○" },
  { value: "continents", label: "Continentes", emoji: "🌍" },
  { value: "craters", label: "Cráteres", emoji: "🌑" },
  { value: "storm", label: "Tormenta", emoji: "🌀" },
  { value: "lava", label: "Lava", emoji: "🌋" },
  { value: "icecaps", label: "Casquetes", emoji: "❄️" },
];

function PlanetEditor({ planet, onChange, onDelete }: {
  planet: PlanetConfig; onChange: (p: PlanetConfig) => void; onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"base" | "surface" | "extra">("base");
  const colors = PLANET_COLOR_PRESETS[planet.colorPreset] ?? PLANET_COLOR_PRESETS["Violeta"];

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <button onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all">
        <div className="w-8 h-8 rounded-full flex-shrink-0"
          style={{ background: `radial-gradient(circle at 35% 35%, ${colors[0]}, ${colors[1]}, ${colors[2]})` }} />
        <div className="flex-1 text-left">
          <p className="text-white text-sm font-medium">
            {planet.colorPreset} · {planet.type}
            {planet.hasRings ? " 💍" : ""}
            {planet.hasAtmosphere ? " 🌫️" : ""}
            {planet.surfaceDetail !== "none" ? ` · ${SURFACE_OPTIONS.find(s => s.value === planet.surfaceDetail)?.emoji}` : ""}
          </p>
          <p className="text-white/40 text-xs">X:{planet.x}% Y:{planet.y}% · {planet.sizePercent}%</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-1 text-white/30 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
        {open ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>
      {open && (
        <div className="border-t border-white/10 pt-3">
          <div className="flex gap-1 px-4 mb-3">
            {(["base", "surface", "extra"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === t ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                {t === "base" ? "Base" : t === "surface" ? "Superficie" : "Extras"}
              </button>
            ))}
          </div>

          <div className="px-4 pb-4 space-y-3">
            {tab === "base" && (
              <>
                <div>
                  <p className="text-white/50 text-xs mb-2">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(PLANET_COLOR_PRESETS).map(([name, cols]) => (
                      <button key={name} onClick={() => onChange({ ...planet, colorPreset: name })} title={name}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${planet.colorPreset === name ? "border-white scale-110" : "border-transparent"}`}
                        style={{ background: `radial-gradient(circle at 35% 35%, ${cols[0]}, ${cols[1]}, ${cols[2]})` }} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-2">Tipo</p>
                  <div className="flex gap-2">
                    {(["rocky", "gas", "moon"] as const).map((t) => (
                      <button key={t} onClick={() => onChange({ ...planet, type: t })}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${planet.type === t ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                        {t === "rocky" ? "🪨 Rocoso" : t === "gas" ? "🌪 Gas" : "🌕 Luna"}
                      </button>
                    ))}
                  </div>
                </div>
                <Slider label="Posición X" value={planet.x} min={0} max={100} unit="%" onChange={(v) => onChange({ ...planet, x: v })} />
                <Slider label="Posición Y" value={planet.y} min={0} max={100} unit="%" onChange={(v) => onChange({ ...planet, y: v })} />
                <Slider label="Tamaño" value={planet.sizePercent} min={5} max={70} unit="%" onChange={(v) => onChange({ ...planet, sizePercent: v })} />
                <Slider label="Vel. rotación" value={planet.rotationSpeed} min={15} max={240} unit="s" onChange={(v) => onChange({ ...planet, rotationSpeed: v })} />
                <Slider label="Opacidad" value={planet.opacity} min={0.1} max={1} step={0.05} onChange={(v) => onChange({ ...planet, opacity: v })} />
              </>
            )}

            {tab === "surface" && (
              <>
                <div>
                  <p className="text-white/50 text-xs mb-2">Detalle de superficie</p>
                  <div className="grid grid-cols-3 gap-2">
                    {SURFACE_OPTIONS.map((opt) => (
                      <button key={opt.value} onClick={() => onChange({ ...planet, surfaceDetail: opt.value })}
                        className={`py-2 px-2 rounded-xl text-xs flex flex-col items-center gap-1 transition-all ${planet.surfaceDetail === opt.value ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                        <span className="text-lg">{opt.emoji}</span>
                        <span className="font-semibold">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {planet.surfaceDetail !== "none" && (
                  <>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-white/50 text-xs mb-1">Color superficie</p>
                        <input type="color" value={planet.surfaceColor} onChange={(e) => onChange({ ...planet, surfaceColor: e.target.value })}
                          className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
                      </div>
                      <div className="flex gap-2 pt-4">
                        {["#2d6a4f", "#1e3a5f", "#7f1d1d", "#e0f2fe", "#fde68a", "#6b7280"].map((c) => (
                          <button key={c} onClick={() => onChange({ ...planet, surfaceColor: c })}
                            className={`w-6 h-6 rounded-full border-2 transition-all ${planet.surfaceColor === c ? "border-white scale-110" : "border-transparent"}`}
                            style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                    <Slider label="Intensidad" value={planet.surfaceIntensity} min={0.1} max={1} step={0.05} onChange={(v) => onChange({ ...planet, surfaceIntensity: v })} />
                  </>
                )}
              </>
            )}

            {tab === "extra" && (
              <>
                <div className="space-y-3 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-semibold">💍 Anillos</p>
                      <p className="text-white/40 text-xs">Anillos tipo Saturno</p>
                    </div>
                    <button onClick={() => onChange({ ...planet, hasRings: !planet.hasRings })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${planet.hasRings ? "bg-indigo-500 text-white" : "bg-white/10 text-white/50"}`}>
                      {planet.hasRings ? "ON" : "OFF"}
                    </button>
                  </div>
                  {planet.hasRings && (
                    <>
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-white/50 text-xs mb-1">Color anillos</p>
                          <input type="color" value={planet.ringsColor} onChange={(e) => onChange({ ...planet, ringsColor: e.target.value })}
                            className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
                        </div>
                        <div className="flex gap-2 pt-4">
                          {["#fde68a", "#e0f2fe", "#c4b5fd", "#86efac", "#fda4af", "#d1d5db"].map((c) => (
                            <button key={c} onClick={() => onChange({ ...planet, ringsColor: c })}
                              className={`w-6 h-6 rounded-full border-2 transition-all ${planet.ringsColor === c ? "border-white scale-110" : "border-transparent"}`}
                              style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>
                      <Slider label="Opacidad anillos" value={planet.ringsOpacity} min={0.1} max={1} step={0.05} onChange={(v) => onChange({ ...planet, ringsOpacity: v })} />
                    </>
                  )}
                </div>

                <div className="space-y-3 border border-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-semibold">🌫️ Atmósfera</p>
                      <p className="text-white/40 text-xs">Halo exterior brillante</p>
                    </div>
                    <button onClick={() => onChange({ ...planet, hasAtmosphere: !planet.hasAtmosphere })}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${planet.hasAtmosphere ? "bg-indigo-500 text-white" : "bg-white/10 text-white/50"}`}>
                      {planet.hasAtmosphere ? "ON" : "OFF"}
                    </button>
                  </div>
                  {planet.hasAtmosphere && (
                    <>
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-white/50 text-xs mb-1">Color atmósfera</p>
                          <input type="color" value={planet.atmosphereColor} onChange={(e) => onChange({ ...planet, atmosphereColor: e.target.value })}
                            className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
                        </div>
                        <div className="flex gap-2 pt-4">
                          {["#60a5fa", "#34d399", "#f9a8d4", "#c4b5fd", "#fde68a", "#e0f2fe"].map((c) => (
                            <button key={c} onClick={() => onChange({ ...planet, atmosphereColor: c })}
                              className={`w-6 h-6 rounded-full border-2 transition-all ${planet.atmosphereColor === c ? "border-white scale-110" : "border-transparent"}`}
                              style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>
                      <Slider label="Tamaño atmósfera" value={planet.atmosphereSize} min={1.1} max={2.5} step={0.05} onChange={(v) => onChange({ ...planet, atmosphereSize: v })} />
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NebulaEditor({ nebula, onChange, onDelete }: {
  nebula: NebulaConfig; onChange: (n: NebulaConfig) => void; onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <button onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all">
        <div className="w-8 h-8 rounded-full flex-shrink-0 blur-sm"
          style={{ backgroundColor: nebula.color, opacity: nebula.opacity + 0.3 }} />
        <div className="flex-1 text-left">
          <p className="text-white text-sm font-medium">{nebula.color} · {nebula.sizePercent}%</p>
          <p className="text-white/40 text-xs">X:{nebula.x}% Y:{nebula.y}%</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-1 text-white/30 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
        {open ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-white/50 text-xs mb-1">Color</p>
              <input type="color" value={nebula.color} onChange={(e) => onChange({ ...nebula, color: e.target.value })}
                className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
            </div>
          </div>
          <Slider label="Posición X" value={nebula.x} min={0} max={100} unit="%" onChange={(v) => onChange({ ...nebula, x: v })} />
          <Slider label="Posición Y" value={nebula.y} min={0} max={100} unit="%" onChange={(v) => onChange({ ...nebula, y: v })} />
          <Slider label="Tamaño" value={nebula.sizePercent} min={5} max={90} unit="%" onChange={(v) => onChange({ ...nebula, sizePercent: v })} />
          <Slider label="Opacidad" value={nebula.opacity} min={0.05} max={0.8} step={0.05} onChange={(v) => onChange({ ...nebula, opacity: v })} />
        </div>
      )}
    </div>
  );
}

const emptyConfig = (): BackgroundConfig => ({
  ...DEFAULT_BG_CONFIG,
  id: uid(),
  name: "",
  createdAt: Date.now(),
});

interface Props {
  onAssign?: (configId: string, sectionId: string, target: "main" | "content") => void;
  customSectionIds?: { id: string; title: string }[];
}

export default function BackgroundEditor({ onAssign, customSectionIds = [] }: Props) {
  const [view, setView] = useState<"editor" | "list">("list");
  const [config, setConfig] = useState<BackgroundConfig>(emptyConfig);
  const [subTab, setSubTab] = useState<SubTab>("base");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [configs, setConfigs] = useState(getBgConfigs);
  const [assignModal, setAssignModal] = useState<{ configId: string } | null>(null);

  const refreshConfigs = () => setConfigs(getBgConfigs());

  const handleSave = () => {
    if (!config.name.trim()) { alert("Ponle un nombre al fondo antes de guardar."); return; }
    saveBgConfig({ ...config, name: config.name.trim() });
    refreshConfigs();
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2000);
  };

  const handleEdit = (id: string) => {
    const c = getBgConfig(id);
    if (c) { setConfig(c); setView("editor"); setSubTab("base"); setSaveState("idle"); }
  };

  const handleNew = () => { setConfig(emptyConfig()); setView("editor"); setSubTab("base"); setSaveState("idle"); };

  const handleDuplicate = (id: string) => {
    const c = getBgConfig(id);
    if (!c) return;
    saveBgConfig({ ...c, id: uid(), name: `${c.name} (copia)`, createdAt: Date.now() });
    refreshConfigs();
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este fondo?")) return;
    deleteBgConfig(id);
    refreshConfigs();
  };

  const up = useCallback(<K extends keyof BackgroundConfig>(field: K, value: BackgroundConfig[K]) =>
    setConfig((c) => ({ ...c, [field]: value })), []);

  const upStars = (patch: Partial<typeof config.stars>) =>
    setConfig((c) => ({ ...c, stars: { ...c.stars, ...patch } }));

  const upComets = (patch: Partial<typeof config.comets>) =>
    setConfig((c) => ({ ...c, comets: { ...c.comets, ...patch } }));

  const updatePlanet = (id: string, planet: PlanetConfig) =>
    setConfig((c) => ({ ...c, planets: c.planets.map((p) => p.id === id ? planet : p) }));

  const deletePlanet = (id: string) =>
    setConfig((c) => ({ ...c, planets: c.planets.filter((p) => p.id !== id) }));

  const addPlanet = () => {
    const id = uid();
    setConfig((c) => ({ ...c, planets: [...c.planets, { ...DEFAULT_PLANET, id }] }));
    setSubTab("planets");
  };

  const updateComet = (id: string, comet: CometIndividual) =>
    setConfig((c) => ({ ...c, comets: { ...c.comets, list: c.comets.list.map((x) => x.id === id ? comet : x) } }));

  const deleteComet = (id: string) =>
    setConfig((c) => ({ ...c, comets: { ...c.comets, list: c.comets.list.filter((x) => x.id !== id) } }));

  const addComet = () => {
    const id = uid();
    const phase = Math.random();
    setConfig((c) => ({ ...c, comets: { ...c.comets, list: [...c.comets.list, { ...DEFAULT_COMET, id, phase }] } }));
    setSubTab("comets");
  };

  const updateNebula = (id: string, neb: NebulaConfig) =>
    setConfig((c) => ({ ...c, nebulas: c.nebulas.map((n) => n.id === id ? neb : n) }));

  const deleteNebula = (id: string) =>
    setConfig((c) => ({ ...c, nebulas: c.nebulas.filter((n) => n.id !== id) }));

  const addNebula = () => {
    setConfig((c) => ({ ...c, nebulas: [...c.nebulas, { id: uid(), x: 50, y: 50, sizePercent: 30, color: "#8b5cf6", opacity: 0.3 }] }));
    setSubTab("nebulas");
  };

  const subTabs: { id: SubTab; label: string; icon: React.ReactNode }[] = [
    { id: "base", label: "Fondo", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "stars", label: "Estrellas", icon: <Star className="w-3.5 h-3.5" /> },
    { id: "comets", label: "Cometas", icon: <Orbit className="w-3.5 h-3.5" /> },
    { id: "planets", label: "Planetas", icon: <Globe className="w-3.5 h-3.5" /> },
    { id: "nebulas", label: "Nebulas", icon: <Wind className="w-3.5 h-3.5" /> },
  ];

  const STAR_MOVEMENT_OPTIONS: { value: StarMovement; label: string; emoji: string }[] = [
    { value: "twinkle", label: "Parpadeo", emoji: "✨" },
    { value: "pulse", label: "Pulso", emoji: "💫" },
    { value: "drift", label: "Deriva", emoji: "🌊" },
    { value: "none", label: "Fijas", emoji: "●" },
  ];

  if (view === "list") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-white font-bold text-lg">Fondos animados</p>
          <button onClick={handleNew}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold transition-all">
            <Plus className="w-4 h-4" /> Nuevo fondo
          </button>
        </div>

        {configs.length === 0 ? (
          <div className="text-center py-14 text-white/30">
            <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No hay fondos creados todavía.</p>
            <p className="text-sm mt-1">Crea un fondo y asígnalo a tus secciones personalizadas.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {configs.map((cfg) => (
              <div key={cfg.id} className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg" style={{ height: 100 }}>
                <CustomBackground config={cfg} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 flex items-center px-4 gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold truncate">{cfg.name}</p>
                    <p className="text-white/40 text-xs">
                      {cfg.planets.length} planetas · {cfg.nebulas.length} nebulas ·
                      {cfg.stars.enabled ? ` ${cfg.stars.count}★` : " sin ★"} ·
                      {cfg.comets.enabled ? ` ${cfg.comets.list.length} cometas` : ""}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {onAssign && customSectionIds.length > 0 && (
                      <button onClick={() => setAssignModal({ configId: cfg.id })}
                        className="p-2 rounded-xl bg-black/30 hover:bg-indigo-500/50 text-white/70 hover:text-white transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => handleDuplicate(cfg.id)}
                      className="p-2 rounded-xl bg-black/30 hover:bg-white/20 text-white/60 hover:text-white transition-all">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleEdit(cfg.id)}
                      className="p-2 rounded-xl bg-black/30 hover:bg-indigo-500/50 text-white/60 hover:text-white transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(cfg.id)}
                      className="p-2 rounded-xl bg-black/30 hover:bg-red-500/50 text-white/60 hover:text-red-400 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {assignModal && onAssign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-bold">Asignar fondo</p>
                <button onClick={() => setAssignModal(null)}><X className="w-5 h-5 text-white/50" /></button>
              </div>
              <p className="text-white/50 text-sm mb-3">Selecciona la sección y el destino:</p>
              {customSectionIds.map((sec) => (
                <div key={sec.id} className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-white text-sm">{sec.title}</span>
                  <div className="flex gap-2">
                    <button onClick={() => { onAssign(assignModal.configId, sec.id, "main"); setAssignModal(null); }}
                      className="px-2 py-1 rounded-lg bg-indigo-500/30 hover:bg-indigo-500 text-white text-xs transition-all">Inicio</button>
                    <button onClick={() => { onAssign(assignModal.configId, sec.id, "content"); setAssignModal(null); }}
                      className="px-2 py-1 rounded-lg bg-purple-500/30 hover:bg-purple-500 text-white text-xs transition-all">Contenido</button>
                  </div>
                </div>
              ))}
              <button onClick={() => setAssignModal(null)}
                className="w-full mt-4 py-2 rounded-xl bg-white/5 text-white/60 text-sm hover:bg-white/10 transition-all">Cancelar</button>
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setView("list")}
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-all">
          <RotateCcw className="w-4 h-4" /> Mis fondos
        </button>
        <div className="flex gap-2">
          <button onClick={addNebula}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 text-xs transition-all">
            <Plus className="w-3 h-3" /> Nebula
          </button>
          <button onClick={addComet}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300 text-xs transition-all">
            <Plus className="w-3 h-3" /> Cometa
          </button>
          <button onClick={addPlanet}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 text-xs transition-all">
            <Plus className="w-3 h-3" /> Planeta
          </button>
        </div>
      </div>

      <input type="text" value={config.name} onChange={(e) => up("name", e.target.value)}
        placeholder="Nombre del fondo (ej: Cosmos Violeta)"
        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-400/50 text-sm" />

      <div className="relative rounded-2xl overflow-hidden border border-white/15" style={{ height: 200 }}>
        <CustomBackground config={config} />
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/50 text-white/40 text-xs">Vista previa en vivo</div>
      </div>

      <div className="flex gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
        {subTabs.map((t) => (
          <button key={t.id} onClick={() => setSubTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold transition-all ${subTab === t.id ? "bg-indigo-500 text-white" : "text-white/40 hover:text-white/70"}`}>
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {subTab === "base" && (
          <motion.div key="base" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <p className="text-white/50 text-xs uppercase tracking-wider">Gradiente de fondo</p>
            <div className="grid grid-cols-5 gap-2">
              {BACKGROUND_PRESETS.map((p) => (
                <button key={p.name} onClick={() => up("bgGradient", p.value)} title={p.name}
                  className={`h-10 rounded-xl border-2 transition-all ${config.bgGradient === p.value ? "border-white scale-105" : "border-transparent hover:border-white/40"}`}
                  style={{ background: p.value }} />
              ))}
            </div>
            <input type="text" value={config.bgGradient} onChange={(e) => up("bgGradient", e.target.value)}
              placeholder="CSS personalizado..."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white/80 text-xs focus:outline-none focus:border-indigo-400/50" />
          </motion.div>
        )}

        {subTab === "stars" && (
          <motion.div key="stars" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-white text-sm font-semibold">Estrellas</p>
              <button onClick={() => upStars({ enabled: !config.stars.enabled })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${config.stars.enabled ? "bg-indigo-500 text-white" : "bg-white/10 text-white/50"}`}>
                {config.stars.enabled ? "Activado" : "Desactivado"}
              </button>
            </div>
            {config.stars.enabled && (
              <>
                <Slider label="Cantidad" value={config.stars.count} min={10} max={400} onChange={(v) => upStars({ count: v })} />
                <Slider label="Semilla (cambia el patrón)" value={config.stars.seed} min={1} max={100} onChange={(v) => upStars({ seed: v })} />
                <div>
                  <p className="text-white/50 text-xs mb-2">Color</p>
                  <div className="flex items-center gap-3">
                    <input type="color" value={config.stars.color} onChange={(e) => upStars({ color: e.target.value })}
                      className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
                    <div className="flex gap-2">
                      {["#ffffff", "#fde68a", "#fbcfe8", "#a5f3fc", "#c4b5fd", "#86efac"].map((c) => (
                        <button key={c} onClick={() => upStars({ color: c })}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${config.stars.color === c ? "border-white scale-110" : "border-transparent"}`}
                          style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-2">Movimiento</p>
                  <div className="grid grid-cols-2 gap-2">
                    {STAR_MOVEMENT_OPTIONS.map((opt) => (
                      <button key={opt.value} onClick={() => upStars({ movement: opt.value })}
                        className={`py-2 px-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${config.stars.movement === opt.value ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                        <span>{opt.emoji}</span> {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                {config.stars.movement === "drift" && (
                  <DirectionPicker angle={config.stars.driftAngle ?? 180} onChange={(v) => upStars({ driftAngle: v })} />
                )}
                <div>
                  <p className="text-white/50 text-xs mb-2">Velocidad de animación</p>
                  <div className="flex gap-2">
                    {(["slow", "medium", "fast"] as const).map((s) => (
                      <button key={s} onClick={() => upStars({ speed: s })}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${config.stars.speed === s ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                        {s === "slow" ? "Lenta" : s === "medium" ? "Media" : "Rápida"}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}

        {subTab === "comets" && (
          <motion.div key="comets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-white text-sm font-semibold">
                Cometas ({config.comets.list.length})
              </p>
              <div className="flex gap-2">
                <button onClick={() => upComets({ enabled: !config.comets.enabled })}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${config.comets.enabled ? "bg-indigo-500 text-white" : "bg-white/10 text-white/50"}`}>
                  {config.comets.enabled ? "ON" : "OFF"}
                </button>
                <button onClick={addComet}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/30 hover:bg-yellow-500 text-yellow-300 hover:text-white text-xs font-semibold transition-all">
                  <Plus className="w-3.5 h-3.5" /> Añadir
                </button>
              </div>
            </div>
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-3 py-2 text-xs text-indigo-300">
              💡 Cada cometa es independiente: elige su dirección (ángulo), velocidad, longitud y posición de salida. La <strong>Fase</strong> controla cuándo empieza dentro de su ciclo.
            </div>
            {config.comets.list.length === 0 && (
              <p className="text-white/30 text-sm text-center py-6">Sin cometas. Añade uno con el botón de arriba.</p>
            )}
            {config.comets.list.map((comet) => (
              <CometEditor key={comet.id} comet={comet}
                onChange={(c) => updateComet(comet.id, c)}
                onDelete={() => deleteComet(comet.id)} />
            ))}
          </motion.div>
        )}

        {subTab === "planets" && (
          <motion.div key="planets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-white text-sm font-semibold">{config.planets.length} planetas</p>
              <button onClick={addPlanet}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/30 hover:bg-indigo-500 text-indigo-300 hover:text-white text-xs font-semibold transition-all">
                <Plus className="w-3.5 h-3.5" /> Añadir planeta
              </button>
            </div>
            {config.planets.length === 0 && (
              <p className="text-white/30 text-sm text-center py-6">Sin planetas todavía.</p>
            )}
            {config.planets.map((planet) => (
              <PlanetEditor key={planet.id} planet={planet}
                onChange={(p) => updatePlanet(planet.id, p)}
                onDelete={() => deletePlanet(planet.id)} />
            ))}
          </motion.div>
        )}

        {subTab === "nebulas" && (
          <motion.div key="nebulas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-white text-sm font-semibold">{config.nebulas.length} nebulas</p>
              <button onClick={addNebula}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/30 hover:bg-purple-500 text-purple-300 hover:text-white text-xs font-semibold transition-all">
                <Plus className="w-3.5 h-3.5" /> Añadir nebula
              </button>
            </div>
            {config.nebulas.length === 0 && (
              <p className="text-white/30 text-sm text-center py-6">Sin nebulas todavía.</p>
            )}
            {config.nebulas.map((neb) => (
              <NebulaEditor key={neb.id} nebula={neb}
                onChange={(n) => updateNebula(neb.id, n)}
                onDelete={() => deleteNebula(neb.id)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave}
        className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base transition-all ${saveState === "saved" ? "bg-green-500 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white"}`}>
        {saveState === "saved" ? <><Check className="w-5 h-5" /> Guardado</> : <><Save className="w-5 h-5" /> Guardar fondo</>}
      </motion.button>
    </div>
  );
}
