import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save, Check, Plus, Trash2, Pencil, ChevronDown, ChevronUp,
  Star, Orbit, Globe, Wind, Layers, Eye, X, Copy
} from "lucide-react";
import {
  BackgroundConfig, PlanetConfig, NebulaConfig,
  getBgConfigs, getBgConfig, saveBgConfig, deleteBgConfig,
  PLANET_COLOR_PRESETS, DEFAULT_BG_CONFIG, COMET_DURATIONS
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

function PlanetEditor({ planet, onChange, onDelete }: {
  planet: PlanetConfig;
  onChange: (p: PlanetConfig) => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const colors = PLANET_COLOR_PRESETS[planet.colorPreset] ?? PLANET_COLOR_PRESETS["Violeta"];
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all"
      >
        <div className="w-8 h-8 rounded-full flex-shrink-0"
          style={{ background: `radial-gradient(circle at 35% 35%, ${colors[0]}, ${colors[1]}, ${colors[2]})` }} />
        <div className="flex-1 text-left">
          <p className="text-white text-sm font-medium">{planet.colorPreset} · {planet.type}</p>
          <p className="text-white/40 text-xs">X:{planet.x}% Y:{planet.y}% · Tamaño:{planet.sizePercent}%</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-1 text-white/30 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
        {open ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
          <div>
            <p className="text-white/50 text-xs mb-2">Color</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PLANET_COLOR_PRESETS).map(([name, cols]) => (
                <button key={name} onClick={() => onChange({ ...planet, colorPreset: name })}
                  title={name}
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
                  {t === "rocky" ? "Rocoso" : t === "gas" ? "Gas" : "Luna"}
                </button>
              ))}
            </div>
          </div>
          <Slider label="Posición X" value={planet.x} min={0} max={100} unit="%" onChange={(v) => onChange({ ...planet, x: v })} />
          <Slider label="Posición Y" value={planet.y} min={0} max={100} unit="%" onChange={(v) => onChange({ ...planet, y: v })} />
          <Slider label="Tamaño" value={planet.sizePercent} min={5} max={60} unit="%" onChange={(v) => onChange({ ...planet, sizePercent: v })} />
          <Slider label="Vel. rotación" value={planet.rotationSpeed} min={20} max={180} unit="s" onChange={(v) => onChange({ ...planet, rotationSpeed: v })} />
          <Slider label="Opacidad" value={planet.opacity} min={0.1} max={1} step={0.05} onChange={(v) => onChange({ ...planet, opacity: v })} />
        </div>
      )}
    </div>
  );
}

function NebulaEditor({ nebula, onChange, onDelete }: {
  nebula: NebulaConfig;
  onChange: (n: NebulaConfig) => void;
  onDelete: () => void;
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
          <p className="text-white/40 text-xs">X:{nebula.x}% Y:{nebula.y}% · Op:{nebula.opacity}</p>
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
          <Slider label="Tamaño" value={nebula.sizePercent} min={5} max={80} unit="%" onChange={(v) => onChange({ ...nebula, sizePercent: v })} />
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

  const handleNew = () => {
    setConfig(emptyConfig());
    setView("editor");
    setSubTab("base");
    setSaveState("idle");
  };

  const handleDuplicate = (id: string) => {
    const c = getBgConfig(id);
    if (!c) return;
    const copy = { ...c, id: uid(), name: `${c.name} (copia)`, createdAt: Date.now() };
    saveBgConfig(copy);
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
    const newP: PlanetConfig = { id: uid(), sizePercent: 20, x: 50, y: 30, colorPreset: "Violeta", type: "rocky", rotationSpeed: 60, opacity: 0.85 };
    setConfig((c) => ({ ...c, planets: [...c.planets, newP] }));
    setSubTab("planets");
  };

  const updateNebula = (id: string, neb: NebulaConfig) =>
    setConfig((c) => ({ ...c, nebulas: c.nebulas.map((n) => n.id === id ? neb : n) }));

  const deleteNebula = (id: string) =>
    setConfig((c) => ({ ...c, nebulas: c.nebulas.filter((n) => n.id !== id) }));

  const addNebula = () => {
    const newN: NebulaConfig = { id: uid(), x: 50, y: 50, sizePercent: 30, color: "#8b5cf6", opacity: 0.3 };
    setConfig((c) => ({ ...c, nebulas: [...c.nebulas, newN] }));
    setSubTab("nebulas");
  };

  const subTabs: { id: SubTab; label: string; icon: React.ReactNode }[] = [
    { id: "base", label: "Fondo", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "stars", label: "Estrellas", icon: <Star className="w-3.5 h-3.5" /> },
    { id: "comets", label: "Cometas", icon: <Orbit className="w-3.5 h-3.5" /> },
    { id: "planets", label: "Planetas", icon: <Globe className="w-3.5 h-3.5" /> },
    { id: "nebulas", label: "Nebulas", icon: <Wind className="w-3.5 h-3.5" /> },
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
                      {cfg.stars.enabled ? ` ${cfg.stars.count} estrellas` : " sin estrellas"} ·
                      {cfg.comets.enabled ? ` ${cfg.comets.count} cometas` : " sin cometas"}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {onAssign && customSectionIds.length > 0 && (
                      <button onClick={() => setAssignModal({ configId: cfg.id })}
                        className="p-2 rounded-xl bg-black/30 hover:bg-indigo-500/50 text-white/70 hover:text-white transition-all text-xs flex items-center gap-1">
                        <Eye className="w-4 h-4" /> Asignar
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
          <ChevronDown className="w-4 h-4 rotate-90" /> Mis fondos
        </button>
        <div className="flex gap-2">
          <button onClick={addNebula}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 text-xs transition-all">
            <Plus className="w-3 h-3" /> Nebula
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

      <div className="relative rounded-2xl overflow-hidden border border-white/15" style={{ height: 180 }}>
        <CustomBackground config={config} />
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/50 text-white/50 text-xs">Vista previa en vivo</div>
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
                <Slider label="Cantidad" value={config.stars.count} min={10} max={300} onChange={(v) => upStars({ count: v })} />
                <Slider label="Semilla aleatoria" value={config.stars.seed} min={1} max={100} onChange={(v) => upStars({ seed: v })} />
                <div>
                  <p className="text-white/50 text-xs mb-2">Color de estrellas</p>
                  <div className="flex items-center gap-3">
                    <input type="color" value={config.stars.color} onChange={(e) => upStars({ color: e.target.value })}
                      className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
                    <div className="flex gap-2">
                      {["#ffffff", "#fde68a", "#fbcfe8", "#a5f3fc", "#c4b5fd"].map((c) => (
                        <button key={c} onClick={() => upStars({ color: c })}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${config.stars.color === c ? "border-white scale-110" : "border-transparent"}`}
                          style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}

        {subTab === "comets" && (
          <motion.div key="comets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-white text-sm font-semibold">Cometas / Trayectorias</p>
              <button onClick={() => upComets({ enabled: !config.comets.enabled })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${config.comets.enabled ? "bg-indigo-500 text-white" : "bg-white/10 text-white/50"}`}>
                {config.comets.enabled ? "Activado" : "Desactivado"}
              </button>
            </div>
            {config.comets.enabled && (
              <>
                <Slider label="Cantidad" value={config.comets.count} min={1} max={20} onChange={(v) => upComets({ count: v })} />
                <Slider label="Semilla aleatoria" value={config.comets.seed} min={1} max={100} onChange={(v) => upComets({ seed: v })} />
                <div>
                  <p className="text-white/50 text-xs mb-2">Velocidad</p>
                  <div className="flex gap-2">
                    {(["slow", "medium", "fast"] as const).map((s) => (
                      <button key={s} onClick={() => upComets({ speed: s })}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${config.comets.speed === s ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                        {s === "slow" ? "Lenta" : s === "medium" ? "Media" : "Rápida"}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
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
              <p className="text-white/30 text-sm text-center py-6">Sin planetas todavía. Añade uno arriba.</p>
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
              <p className="text-white/30 text-sm text-center py-6">Sin nebulas todavía. Añade una arriba.</p>
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
