import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save, Check, Plus, Trash2, Pencil, ChevronDown, ChevronUp,
  Star, Orbit, Globe, Wind, Layers, Eye, X, Copy, RotateCcw,
} from "lucide-react";
import {
  BackgroundConfig, PlanetConfig, NebulaConfig, CometIndividual, CustomStar,
  getBgConfigs, getBgConfig, saveBgConfig, deleteBgConfig,
  PLANET_COLOR_PRESETS, DEFAULT_BG_CONFIG, DEFAULT_PLANET, DEFAULT_COMET,
  SURFACE_DETAIL_OPTIONS, type SurfaceDetail, type StarMovement, type StarSpeed,
} from "@/utils/backgroundConfigs";
import { BACKGROUND_PRESETS } from "@/utils/customSections";
import CustomBackground from "@/components/CustomBackground";

type SubTab = "base" | "stars" | "comets" | "planets" | "nebulas";
type SaveState = "idle" | "saved";
type SelType = "planet" | "nebula" | "comet" | "customStar" | null;
interface Sel { type: SelType; id: string }

const uid = () => Math.random().toString(36).slice(2, 9);

function Slider({ label, value, min, max, step = 1, onChange, unit = "" }: {
  label: string; value: number; min: number; max: number; step?: number;
  onChange: (v: number) => void; unit?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-white/50 text-xs">{label}</span>
        <span className="text-white/80 text-xs font-mono">{typeof value === "number" ? (Number.isInteger(value) ? value : value.toFixed(2)) : value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full accent-indigo-400 cursor-pointer" />
    </div>
  );
}

const DIR_PRESETS = [
  { label: "↑", a: 270 }, { label: "↗", a: 315 }, { label: "→", a: 0 },
  { label: "↘", a: 45 }, { label: "↓", a: 90 }, { label: "↙", a: 135 },
  { label: "←", a: 180 }, { label: "↖", a: 225 },
];

function DirPicker({ angle, onChange }: { angle: number; onChange: (a: number) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-white/50 text-xs">Dirección</p>
      <div className="flex gap-1 flex-wrap">
        {DIR_PRESETS.map((d) => (
          <button key={d.a} onClick={() => onChange(d.a)}
            className={`w-9 h-9 rounded-lg text-base font-bold transition-all ${angle === d.a ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/15"}`}>
            {d.label}
          </button>
        ))}
      </div>
      <Slider label="Ángulo exacto" value={angle} min={0} max={359} onChange={onChange} unit="°" />
    </div>
  );
}

/* ─── Interactive Preview ─── */
function InteractivePreview({ config, onChange, mode }: {
  config: BackgroundConfig;
  onChange: (c: BackgroundConfig) => void;
  mode: SubTab;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState<Sel>({ type: null, id: "" });
  const dragRef = useRef<{ px: number; py: number; ex: number; ey: number } | null>(null);
  const rotRef = useRef<{ cx: number; cy: number } | null>(null);
  const [rotating, setRotating] = useState(false);

  const toPct = (cx: number, cy: number) => {
    const r = ref.current!.getBoundingClientRect();
    return { x: (cx - r.left) / r.width * 100, y: (cy - r.top) / r.height * 100 };
  };

  const findEl = (px: number, py: number): Sel => {
    for (const c of [...config.comets.list].reverse()) {
      if (Math.hypot(px - c.startX, py - c.startY) < 9) return { type: "comet", id: c.id };
    }
    for (const s of [...(config.stars.customStars ?? [])].reverse()) {
      if (Math.hypot(px - s.x, py - s.y) < 6) return { type: "customStar", id: s.id };
    }
    for (const p of [...config.planets].reverse()) {
      if (Math.abs(px - p.x) < p.sizePercent && Math.abs(py - p.y) < p.sizePercent)
        return { type: "planet", id: p.id };
    }
    for (const n of [...config.nebulas].reverse()) {
      if (Math.hypot(px - n.x, py - n.y) < n.sizePercent * 0.45) return { type: "nebula", id: n.id };
    }
    return { type: null, id: "" };
  };

  const getPos = (s: Sel) => {
    if (s.type === "planet") { const p = config.planets.find(p => p.id === s.id)!; return { x: p.x, y: p.y }; }
    if (s.type === "nebula") { const n = config.nebulas.find(n => n.id === s.id)!; return { x: n.x, y: n.y }; }
    if (s.type === "comet") { const c = config.comets.list.find(c => c.id === s.id)!; return { x: c.startX, y: c.startY }; }
    if (s.type === "customStar") { const st = (config.stars.customStars ?? []).find(s2 => s2.id === s.id)!; return { x: st.x, y: st.y }; }
    return { x: 0, y: 0 };
  };

  const applyMove = (s: Sel, x: number, y: number) => {
    const nx = Math.round(x); const ny = Math.round(y);
    if (s.type === "planet")
      onChange({ ...config, planets: config.planets.map(p => p.id === s.id ? { ...p, x: nx, y: ny } : p) });
    else if (s.type === "nebula")
      onChange({ ...config, nebulas: config.nebulas.map(n => n.id === s.id ? { ...n, x: nx, y: ny } : n) });
    else if (s.type === "comet")
      onChange({ ...config, comets: { ...config.comets, list: config.comets.list.map(c => c.id === s.id ? { ...c, startX: nx, startY: ny } : c) } });
    else if (s.type === "customStar")
      onChange({ ...config, stars: { ...config.stars, customStars: (config.stars.customStars ?? []).map(st => st.id === s.id ? { ...st, x: nx, y: ny } : st) } });
  };

  const onPD = (e: React.PointerEvent) => {
    const { x, y } = toPct(e.clientX, e.clientY);
    const found = findEl(x, y);
    if (found.type) {
      setSel(found);
      const pos = getPos(found);
      dragRef.current = { px: x, py: y, ex: pos.x, ey: pos.y };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } else {
      if (mode === "stars") {
        const newStar: CustomStar = { id: uid(), x: Math.round(x), y: Math.round(y), size: 2 };
        onChange({ ...config, stars: { ...config.stars, customStars: [...(config.stars.customStars ?? []), newStar] } });
        setSel({ type: "customStar", id: newStar.id });
      } else {
        setSel({ type: null, id: "" });
      }
    }
  };

  const onPM = (e: React.PointerEvent) => {
    if (!dragRef.current || !sel.type) return;
    const { x, y } = toPct(e.clientX, e.clientY);
    applyMove(sel, dragRef.current.ex + x - dragRef.current.px, dragRef.current.ey + y - dragRef.current.py);
  };

  const onPU = () => { dragRef.current = null; };

  const selComet = sel.type === "comet" ? config.comets.list.find(c => c.id === sel.id) : null;
  const selPlanet = sel.type === "planet" ? config.planets.find(p => p.id === sel.id) : null;
  const selNebula = sel.type === "nebula" ? config.nebulas.find(n => n.id === sel.id) : null;

  const hint = rotating ? "🔄 Girando el ángulo..."
    : sel.type === "comet" ? "↗ Mueve el cometa · Arrastra la rueda ⬤ para girar"
    : sel.type ? "↔ Arrastra para mover"
    : mode === "stars" ? "✦ Toca para añadir estrellas · Mueve las existentes"
    : "👆 Toca cualquier elemento para moverlo";

  return (
    <div ref={ref}
      className="relative rounded-2xl overflow-hidden border border-white/15 touch-none select-none"
      style={{ height: 220, cursor: sel.type && !rotating ? "move" : mode === "stars" ? "crosshair" : "pointer" }}
      onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU}
    >
      <CustomBackground config={config} />

      {/* Planet selection ring */}
      {selPlanet && (
        <div className="absolute pointer-events-none" style={{
          left: `${selPlanet.x}%`, top: `${selPlanet.y}%`,
          width: `${selPlanet.sizePercent}%`, paddingBottom: `${selPlanet.sizePercent}%`,
          transform: "translate(-50%,-50%)",
        }}>
          <div className="absolute inset-0 rounded-full" style={{
            border: "2px dashed rgba(255,255,255,0.75)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.2)",
            animation: "none",
          }} />
        </div>
      )}

      {/* Nebula selection ring */}
      {selNebula && (
        <div className="absolute pointer-events-none" style={{
          left: `${selNebula.x}%`, top: `${selNebula.y}%`,
          width: `${selNebula.sizePercent}%`, paddingBottom: `${selNebula.sizePercent}%`,
          transform: "translate(-50%,-50%)",
        }}>
          <div className="absolute inset-0 rounded-full" style={{
            border: `2px dashed ${selNebula.color}`, boxShadow: `0 0 0 1px ${selNebula.color}40`,
          }} />
        </div>
      )}

      {/* Comet rotation dial */}
      {selComet && (() => {
        const R = 32;
        const rad = (selComet.angle * Math.PI) / 180;
        const hx = Math.cos(rad) * R;
        const hy = Math.sin(rad) * R;
        return (
          <div className="absolute" style={{
            left: `${selComet.startX}%`, top: `${selComet.startY}%`,
            transform: "translate(-50%,-50%)", zIndex: 20,
            width: R * 2 + 24, height: R * 2 + 24,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width={R * 2 + 24} height={R * 2 + 24}
              viewBox={`${-R - 12} ${-R - 12} ${R * 2 + 24} ${R * 2 + 24}`}
              overflow="visible" style={{ overflow: "visible" }}>
              <circle cx="0" cy="0" r={R} fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5" strokeDasharray="5 3" />
              <line x1="0" y1="0" x2={hx * 0.78} y2={hy * 0.78}
                stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
              <circle cx="0" cy="0" r="3.5" fill="white" opacity="0.8" />
              <circle cx={hx} cy={hy} r="7"
                fill="white" stroke="rgba(0,0,0,0.5)" strokeWidth="2"
                style={{ cursor: "grab", pointerEvents: "all" }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  const rect = ref.current!.getBoundingClientRect();
                  rotRef.current = {
                    cx: selComet.startX / 100 * rect.width + rect.left,
                    cy: selComet.startY / 100 * rect.height + rect.top,
                  };
                  (e.target as SVGCircleElement).setPointerCapture(e.pointerId);
                  setRotating(true);
                }}
                onPointerMove={(e) => {
                  if (!rotRef.current) return;
                  e.stopPropagation();
                  const dx = e.clientX - rotRef.current.cx;
                  const dy = e.clientY - rotRef.current.cy;
                  const angle = Math.round(((Math.atan2(dy, dx) * 180 / Math.PI) + 360) % 360);
                  onChange({ ...config, comets: { ...config.comets, list: config.comets.list.map(c => c.id === sel.id ? { ...c, angle } : c) } });
                }}
                onPointerUp={(e) => { rotRef.current = null; setRotating(false); e.stopPropagation(); }}
              />
            </svg>
          </div>
        );
      })()}

      {/* Custom star dots — interactive */}
      {(config.stars.customStars ?? []).map((star) => (
        <div key={star.id} className="absolute" style={{
          left: `${star.x}%`, top: `${star.y}%`,
          width: (star.size + 2) * 4, height: (star.size + 2) * 4,
          transform: "translate(-50%,-50%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 5, cursor: "move", pointerEvents: "all",
        }}>
          <div style={{
            width: star.size + 3, height: star.size + 3, borderRadius: "50%",
            backgroundColor: config.stars.color,
            border: sel.id === star.id ? "2px solid white" : "1px solid rgba(255,255,255,0.5)",
            boxShadow: sel.id === star.id ? `0 0 0 2px rgba(255,255,255,0.3)` : "none",
          }} />
        </div>
      ))}

      {/* Bottom hint */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex justify-between items-end pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
        <span className="text-white/55 text-xs">{hint}</span>
        {selComet && (
          <span className="text-white/70 text-xs font-mono bg-black/50 px-2 py-0.5 rounded-lg">
            {selComet.angle}°
          </span>
        )}
      </div>

      {/* Delete custom star button */}
      {sel.type === "customStar" && (
        <button className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-red-500/80 hover:bg-red-500 text-white text-xs pointer-events-all transition-all"
          onPointerDown={(e) => {
            e.stopPropagation();
            onChange({ ...config, stars: { ...config.stars, customStars: (config.stars.customStars ?? []).filter(s => s.id !== sel.id) } });
            setSel({ type: null, id: "" });
          }}>
          ✕ Eliminar estrella
        </button>
      )}

      {/* Clear all custom stars button */}
      {mode === "stars" && (config.stars.customStars ?? []).length > 0 && (
        <button className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 text-xs pointer-events-all transition-all"
          onPointerDown={(e) => {
            e.stopPropagation();
            onChange({ ...config, stars: { ...config.stars, customStars: [] } });
            setSel({ type: null, id: "" });
          }}>
          Borrar estrellas ({(config.stars.customStars ?? []).length})
        </button>
      )}
    </div>
  );
}

/* ─── Comet card ─── */
function CometCard({ comet, onChange, onDelete }: {
  comet: CometIndividual; onChange: (c: CometIndividual) => void; onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rad = (comet.angle * Math.PI) / 180;
  const ax = Math.cos(rad) * 11; const ay = Math.sin(rad) * 11;

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all">
        <svg width="24" height="24" viewBox="-12 -12 24 24" className="flex-shrink-0">
          <line x1="0" y1="0" x2={ax} y2={ay} stroke={comet.color} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={ax} cy={ay} r="3" fill={comet.color} />
        </svg>
        <div className="flex-1 text-left">
          <p className="text-white text-sm font-medium">{comet.angle}° · {comet.speed}s · {comet.length}px</p>
          <p className="text-white/40 text-xs">Inicio: X{comet.startX}% Y{comet.startY}% · fase {Math.round(comet.phase * 100)}%</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1 text-white/30 hover:text-red-400 transition-all">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        {open ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
          <DirPicker angle={comet.angle} onChange={(v) => onChange({ ...comet, angle: v })} />
          <Slider label="Pos. X inicial" value={comet.startX} min={-15} max={115} unit="%" onChange={(v) => onChange({ ...comet, startX: v })} />
          <Slider label="Pos. Y inicial" value={comet.startY} min={-15} max={115} unit="%" onChange={(v) => onChange({ ...comet, startY: v })} />
          <Slider label="Velocidad" value={comet.speed} min={2} max={22} unit="s" onChange={(v) => onChange({ ...comet, speed: v })} />
          <Slider label="Longitud cola" value={comet.length} min={30} max={400} unit="px" onChange={(v) => onChange({ ...comet, length: v })} />
          <Slider label="Grosor" value={comet.width} min={1} max={8} unit="px" onChange={(v) => onChange({ ...comet, width: v })} />
          <Slider label="Fase inicial" value={comet.phase} min={0} max={0.99} step={0.01} onChange={(v) => onChange({ ...comet, phase: v })} />
          <div className="flex items-center gap-3 pt-1">
            <div>
              <p className="text-white/50 text-xs mb-1">Color</p>
              <input type="color" value={comet.color} onChange={(e) => onChange({ ...comet, color: e.target.value })}
                className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
            </div>
            <div className="flex gap-2 pt-4 flex-wrap">
              {["#ffffff", "#fde68a", "#fbcfe8", "#a5f3fc", "#c4b5fd", "#86efac", "#fed7aa"].map((c) => (
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

/* ─── Planet card ─── */
function PlanetCard({ planet, onChange, onDelete }: {
  planet: PlanetConfig; onChange: (p: PlanetConfig) => void; onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"base" | "surface" | "extras">("base");
  const colors = PLANET_COLOR_PRESETS[planet.colorPreset] ?? PLANET_COLOR_PRESETS["Violeta"];

  const toggleDetail = (d: SurfaceDetail) => {
    const cur = planet.surfaceDetails ?? [];
    onChange({ ...planet, surfaceDetails: cur.includes(d) ? cur.filter(x => x !== d) : [...cur, d] });
  };

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all">
        <div className="w-8 h-8 rounded-full flex-shrink-0" style={{
          background: `radial-gradient(circle at 35% 35%, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
          boxShadow: `0 0 8px ${colors[1]}50`,
        }} />
        <div className="flex-1 text-left min-w-0">
          <p className="text-white text-sm font-medium truncate">
            {planet.colorPreset} · {planet.type}
            {planet.hasRings ? " 💍" : ""}
            {planet.hasAtmosphere ? " 🌫️" : ""}
            {(planet.surfaceDetails ?? []).length > 0 ? ` · ${(planet.surfaceDetails ?? []).map(d => SURFACE_DETAIL_OPTIONS.find(o => o.value === d)?.emoji).join("")}` : ""}
          </p>
          <p className="text-white/40 text-xs">X{planet.x}% Y{planet.y}% · {planet.sizePercent}%</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1 text-white/30 hover:text-red-400 transition-all">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        {open ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>
      {open && (
        <div className="border-t border-white/10">
          <div className="flex gap-1 p-3 pb-0">
            {(["base", "surface", "extras"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === t ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                {t === "base" ? "Base" : t === "surface" ? "Superficie" : "Extras"}
              </button>
            ))}
          </div>

          <div className="px-4 pb-4 pt-3 space-y-3">
            {tab === "base" && (
              <>
                <div>
                  <p className="text-white/50 text-xs mb-2">Color del planeta</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(PLANET_COLOR_PRESETS).map(([name, cols]) => (
                      <button key={name} onClick={() => onChange({ ...planet, colorPreset: name })} title={name}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${planet.colorPreset === name ? "border-white scale-110" : "border-transparent hover:border-white/40"}`}
                        style={{ background: `radial-gradient(circle at 35% 35%, ${cols[0]}, ${cols[1]}, ${cols[2]})` }} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-2">Tipo</p>
                  <div className="flex gap-2">
                    {(["rocky", "gas", "moon"] as const).map((t) => (
                      <button key={t} onClick={() => onChange({ ...planet, type: t })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${planet.type === t ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                        {t === "rocky" ? "🪨 Rocoso" : t === "gas" ? "🌪 Gas" : "🌕 Luna"}
                      </button>
                    ))}
                  </div>
                </div>
                <Slider label="Pos. X" value={planet.x} min={0} max={100} unit="%" onChange={(v) => onChange({ ...planet, x: v })} />
                <Slider label="Pos. Y" value={planet.y} min={0} max={100} unit="%" onChange={(v) => onChange({ ...planet, y: v })} />
                <Slider label="Tamaño" value={planet.sizePercent} min={5} max={70} unit="%" onChange={(v) => onChange({ ...planet, sizePercent: v })} />
                <Slider label="Velocidad rotación" value={planet.rotationSpeed} min={10} max={300} unit="s" onChange={(v) => onChange({ ...planet, rotationSpeed: v })} />
                <Slider label="Opacidad" value={planet.opacity} min={0.1} max={1} step={0.05} onChange={(v) => onChange({ ...planet, opacity: v })} />
              </>
            )}

            {tab === "surface" && (
              <>
                <div>
                  <p className="text-white/50 text-xs mb-1">Detalles de superficie</p>
                  <p className="text-white/30 text-xs mb-2">Puedes combinar varios al mismo tiempo</p>
                  <div className="grid grid-cols-2 gap-2">
                    {SURFACE_DETAIL_OPTIONS.map((opt) => {
                      const active = (planet.surfaceDetails ?? []).includes(opt.value);
                      return (
                        <button key={opt.value} onClick={() => toggleDetail(opt.value)}
                          className={`py-2 px-2 rounded-xl text-xs flex items-center gap-2 transition-all border ${active ? "bg-indigo-500/30 border-indigo-400 text-white" : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"}`}>
                          <span className="text-base">{opt.emoji}</span>
                          <span className="font-semibold">{opt.label}</span>
                          {active && <Check className="w-3 h-3 ml-auto text-indigo-300" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {(planet.surfaceDetails ?? []).length > 0 && (
                  <>
                    <div className="flex items-center gap-3 pt-1">
                      <div>
                        <p className="text-white/50 text-xs mb-1">Color superficie</p>
                        <input type="color" value={planet.surfaceColor} onChange={(e) => onChange({ ...planet, surfaceColor: e.target.value })}
                          className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
                      </div>
                      <div className="flex gap-1.5 pt-4 flex-wrap">
                        {["#2d6a4f", "#1e3a5f", "#7f1d1d", "#e0f2fe", "#fde68a", "#6b7280", "#7c2d12", "#0f4c81"].map((c) => (
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

            {tab === "extras" && (
              <>
                {/* Rings */}
                <div className="border border-white/10 rounded-xl p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-semibold">💍 Anillos</p>
                      <p className="text-white/40 text-xs">Se muestran alrededor del planeta</p>
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
                          <p className="text-white/50 text-xs mb-1">Color</p>
                          <input type="color" value={planet.ringsColor} onChange={(e) => onChange({ ...planet, ringsColor: e.target.value })}
                            className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
                        </div>
                        <div className="flex gap-1.5 pt-4 flex-wrap">
                          {["#fde68a", "#e0f2fe", "#c4b5fd", "#86efac", "#fda4af", "#d1d5db"].map((c) => (
                            <button key={c} onClick={() => onChange({ ...planet, ringsColor: c })}
                              className={`w-6 h-6 rounded-full border-2 transition-all ${planet.ringsColor === c ? "border-white scale-110" : "border-transparent"}`}
                              style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>
                      <Slider label="Opacidad" value={planet.ringsOpacity} min={0.1} max={1} step={0.05} onChange={(v) => onChange({ ...planet, ringsOpacity: v })} />
                      <Slider label="Grosor" value={planet.ringsWidth} min={1} max={12} unit="px" onChange={(v) => onChange({ ...planet, ringsWidth: v })} />
                    </>
                  )}
                </div>

                {/* Atmosphere */}
                <div className="border border-white/10 rounded-xl p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-semibold">🌫️ Atmósfera</p>
                      <p className="text-white/40 text-xs">Halo exterior de luz</p>
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
                          <p className="text-white/50 text-xs mb-1">Color</p>
                          <input type="color" value={planet.atmosphereColor} onChange={(e) => onChange({ ...planet, atmosphereColor: e.target.value })}
                            className="w-10 h-8 rounded cursor-pointer border-0 bg-transparent" />
                        </div>
                        <div className="flex gap-1.5 pt-4 flex-wrap">
                          {["#60a5fa", "#34d399", "#f9a8d4", "#c4b5fd", "#fde68a", "#f97316"].map((c) => (
                            <button key={c} onClick={() => onChange({ ...planet, atmosphereColor: c })}
                              className={`w-6 h-6 rounded-full border-2 transition-all ${planet.atmosphereColor === c ? "border-white scale-110" : "border-transparent"}`}
                              style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>
                      <Slider label="Tamaño" value={planet.atmosphereSize} min={1.1} max={2.5} step={0.05} onChange={(v) => onChange({ ...planet, atmosphereSize: v })} />
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

/* ─── Nebula card ─── */
function NebulaCard({ nebula, onChange, onDelete }: {
  nebula: NebulaConfig; onChange: (n: NebulaConfig) => void; onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all">
        <div className="w-8 h-8 rounded-full flex-shrink-0 blur-sm" style={{ backgroundColor: nebula.color, opacity: Math.min(1, nebula.opacity + 0.4) }} />
        <div className="flex-1 text-left">
          <p className="text-white text-sm font-medium">{nebula.color} · {nebula.sizePercent}%</p>
          <p className="text-white/40 text-xs">X{nebula.x}% Y{nebula.y}% · opac. {nebula.opacity}</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-1 text-white/30 hover:text-red-400 transition-all">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
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
          <Slider label="Pos. X" value={nebula.x} min={0} max={100} unit="%" onChange={(v) => onChange({ ...nebula, x: v })} />
          <Slider label="Pos. Y" value={nebula.y} min={0} max={100} unit="%" onChange={(v) => onChange({ ...nebula, y: v })} />
          <Slider label="Tamaño" value={nebula.sizePercent} min={5} max={90} unit="%" onChange={(v) => onChange({ ...nebula, sizePercent: v })} />
          <Slider label="Opacidad" value={nebula.opacity} min={0.05} max={0.8} step={0.05} onChange={(v) => onChange({ ...nebula, opacity: v })} />
        </div>
      )}
    </div>
  );
}

/* ─── Main BackgroundEditor ─── */
const emptyConfig = (): BackgroundConfig => ({
  ...DEFAULT_BG_CONFIG,
  id: uid(), name: "", createdAt: Date.now(),
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

  const up = useCallback(<K extends keyof BackgroundConfig>(k: K, v: BackgroundConfig[K]) =>
    setConfig(c => ({ ...c, [k]: v })), []);
  const upStars = (patch: Partial<typeof config.stars>) =>
    setConfig(c => ({ ...c, stars: { ...c.stars, ...patch } }));
  const upComets = (patch: Partial<typeof config.comets>) =>
    setConfig(c => ({ ...c, comets: { ...c.comets, ...patch } }));
  const updatePlanet = (id: string, p: PlanetConfig) =>
    setConfig(c => ({ ...c, planets: c.planets.map(x => x.id === id ? p : x) }));
  const deletePlanet = (id: string) =>
    setConfig(c => ({ ...c, planets: c.planets.filter(p => p.id !== id) }));
  const addPlanet = () => setConfig(c => ({ ...c, planets: [...c.planets, { ...DEFAULT_PLANET, id: uid() }] }));
  const updateComet = (id: string, comet: CometIndividual) =>
    setConfig(c => ({ ...c, comets: { ...c.comets, list: c.comets.list.map(x => x.id === id ? comet : x) } }));
  const deleteComet = (id: string) =>
    setConfig(c => ({ ...c, comets: { ...c.comets, list: c.comets.list.filter(x => x.id !== id) } }));
  const addComet = () => {
    const id = uid();
    setConfig(c => ({ ...c, comets: { ...c.comets, list: [...c.comets.list, { ...DEFAULT_COMET, id, phase: Math.random() }] } }));
  };
  const updateNebula = (id: string, neb: NebulaConfig) =>
    setConfig(c => ({ ...c, nebulas: c.nebulas.map(n => n.id === id ? neb : n) }));
  const deleteNebula = (id: string) =>
    setConfig(c => ({ ...c, nebulas: c.nebulas.filter(n => n.id !== id) }));
  const addNebula = () =>
    setConfig(c => ({ ...c, nebulas: [...c.nebulas, { id: uid(), x: 50, y: 50, sizePercent: 30, color: "#8b5cf6", opacity: 0.3 }] }));

  const STAR_MOVEMENT_OPTIONS: { value: StarMovement; label: string; emoji: string }[] = [
    { value: "twinkle", label: "Parpadeo", emoji: "✨" },
    { value: "pulse",   label: "Pulso",    emoji: "💫" },
    { value: "drift",   label: "Deriva",   emoji: "🌊" },
    { value: "none",    label: "Fijas",    emoji: "●" },
  ];

  const subTabs: { id: SubTab; label: string; icon: React.ReactNode }[] = [
    { id: "base",    label: "Fondo",    icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "stars",   label: "Estrellas",icon: <Star className="w-3.5 h-3.5" /> },
    { id: "comets",  label: "Cometas",  icon: <Orbit className="w-3.5 h-3.5" /> },
    { id: "planets", label: "Planetas", icon: <Globe className="w-3.5 h-3.5" /> },
    { id: "nebulas", label: "Nebulas",  icon: <Wind className="w-3.5 h-3.5" /> },
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
            <p className="font-medium">No hay fondos creados todavía.</p>
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
                      {cfg.planets.length} planetas · {cfg.nebulas.length} nebulas ·{" "}
                      {cfg.stars.enabled ? `${cfg.stars.count}★` : "sin ★"} ·{" "}
                      {cfg.comets.enabled ? `${cfg.comets.list.length} cometas` : ""}
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

      {/* INTERACTIVE PREVIEW */}
      <InteractivePreview config={config} onChange={setConfig} mode={subTab} />

      {/* Sub-tab bar */}
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

            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-3 py-2 text-xs text-indigo-300">
              ✦ Toca la vista previa (en modo Estrellas) para añadir estrellas en posiciones exactas. Arrástralas para moverlas.
            </div>

            {(config.stars.customStars ?? []).length > 0 && (
              <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2">
                <p className="text-white/60 text-xs">{(config.stars.customStars ?? []).length} estrella(s) posicionadas manualmente</p>
                <button onClick={() => upStars({ customStars: [] })}
                  className="text-xs text-red-400 hover:text-red-300 transition-all">Borrar todo</button>
              </div>
            )}

            {config.stars.enabled && (
              <>
                <Slider label="Estrellas de fondo" value={config.stars.count} min={10} max={400} onChange={(v) => upStars({ count: v })} />
                <Slider label="Semilla (patrón)" value={config.stars.seed} min={1} max={100} onChange={(v) => upStars({ seed: v })} />
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
                  <p className="text-white/50 text-xs mb-2">Tipo de movimiento</p>
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
                  <DirPicker angle={config.stars.driftAngle ?? 180} onChange={(v) => upStars({ driftAngle: v })} />
                )}
                <div>
                  <p className="text-white/50 text-xs mb-2">Velocidad animación</p>
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
              <p className="text-white text-sm font-semibold">Cometas ({config.comets.list.length})</p>
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
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-3 py-2 text-xs text-yellow-300">
              💡 Arrastra el cometa en la vista previa para mover su inicio · La <strong>rueda</strong> que aparece al seleccionarlo cambia la dirección
            </div>
            {config.comets.list.length === 0 && (
              <p className="text-white/30 text-sm text-center py-6">Sin cometas todavía.</p>
            )}
            {config.comets.list.map((comet) => (
              <CometCard key={comet.id} comet={comet}
                onChange={(c) => updateComet(comet.id, c)}
                onDelete={() => deleteComet(comet.id)} />
            ))}
          </motion.div>
        )}

        {subTab === "planets" && (
          <motion.div key="planets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-white text-sm font-semibold">{config.planets.length} planeta(s)</p>
              <button onClick={addPlanet}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/30 hover:bg-indigo-500 text-indigo-300 hover:text-white text-xs font-semibold transition-all">
                <Plus className="w-3.5 h-3.5" /> Añadir planeta
              </button>
            </div>
            {config.planets.length === 0 && (
              <p className="text-white/30 text-sm text-center py-6">Sin planetas todavía.</p>
            )}
            {config.planets.map((planet) => (
              <PlanetCard key={planet.id} planet={planet}
                onChange={(p) => updatePlanet(planet.id, p)}
                onDelete={() => deletePlanet(planet.id)} />
            ))}
          </motion.div>
        )}

        {subTab === "nebulas" && (
          <motion.div key="nebulas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-white text-sm font-semibold">{config.nebulas.length} nebula(s)</p>
              <button onClick={addNebula}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/30 hover:bg-purple-500 text-purple-300 hover:text-white text-xs font-semibold transition-all">
                <Plus className="w-3.5 h-3.5" /> Añadir nebula
              </button>
            </div>
            {config.nebulas.length === 0 && (
              <p className="text-white/30 text-sm text-center py-6">Sin nebulas todavía.</p>
            )}
            {config.nebulas.map((neb) => (
              <NebulaCard key={neb.id} nebula={neb}
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
