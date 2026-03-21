import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Save, Check, Edit3, ChevronRight, Loader2 } from "lucide-react";
import { getContentKey, getContent, setContent, getDefaultContent } from "@/utils/contentOverrides";

interface AdminEditorProps {
  onBack: () => void;
}

const SECTIONS = [
  { id: "sanvalentin", label: "San Valentín", emoji: "💕", types: ["letter", "poem"] as const, typeLabels: { letter: "Carta", poem: "Poema" }, years: [2025, 2026, 2027, 2028, 2029, 2030], hasDays: false },
  { id: "anniversary", label: "Aniversario", emoji: "💍", types: ["letter", "poem"] as const, typeLabels: { letter: "Carta", poem: "Poema" }, years: [2024, 2025, 2026, 2027, 2028, 2029, 2030], hasDays: false },
  { id: "cumple", label: "Cumpleaños", emoji: "🎂", types: ["letter"] as const, typeLabels: { letter: "Carta", poem: "" }, years: [2024, 2025, 2026, 2027, 2028, 2029, 2030], hasDays: false },
  { id: "flores", label: "Flores Amarillas", emoji: "🌻", types: ["letter"] as const, typeLabels: { letter: "Carta", poem: "" }, years: null as number[] | null, hasDays: false },
  { id: "memories", label: "Poema del Día", emoji: "📖", types: ["poem"] as const, typeLabels: { letter: "", poem: "Poema" }, years: null as number[] | null, hasDays: true },
];

const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
type Step = "section" | "editor";
type SaveState = "idle" | "saving" | "saved" | "error";

export default function AdminEditor({ onBack }: AdminEditorProps) {
  const [step, setStep] = useState<Step>("section");
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0]);
  const [selectedType, setSelectedType] = useState<"letter" | "poem">("letter");
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [editText, setEditText] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    if (step !== "editor") return;
    const key = getContentKey(selectedSection.id, selectedType, selectedYear, selectedDay);
    const def = getDefaultContent(selectedSection.id, selectedType, selectedYear, selectedDay);
    setLoadingContent(true);
    setSaveState("idle");
    getContent(key, def).then((value) => {
      setEditText(value);
      setLoadingContent(false);
    });
  }, [step, selectedSection, selectedType, selectedYear, selectedDay]);

  const handleSave = async () => {
    if (saveState === "saving") return;
    setSaveState("saving");
    const key = getContentKey(selectedSection.id, selectedType, selectedYear, selectedDay);
    try {
      await setContent(key, editText);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 3000);
    }
  };

  const handleOpenEditor = (section: typeof SECTIONS[0]) => {
    setSelectedSection(section);
    setSelectedType(section.types[0]);
    if (section.years) setSelectedYear(section.years[0]);
    if (section.hasDays) setSelectedDay(new Date().getDay());
    setStep("editor");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          onClick={step === "editor" ? () => setStep("section") : onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 mb-8 text-white/80"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{step === "editor" ? "Secciones" : "Volver al Hub"}</span>
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-indigo-500/20 border border-indigo-300/30 mb-4">
            <Edit3 className="w-10 h-10 text-indigo-300" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Panel de Administración</h1>
          <p className="text-white/40 text-sm">Los cambios se sincronizan en todos los dispositivos</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === "section" ? (
            <motion.div key="section" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
              <p className="text-white/50 text-sm mb-4">Selecciona una sección para editar:</p>
              {SECTIONS.map((section) => (
                <motion.button key={section.id} whileHover={{ x: 4, scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenEditor(section)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{section.emoji}</span>
                    <div className="text-left">
                      <p className="text-white font-semibold">{section.label}</p>
                      <p className="text-white/40 text-xs mt-0.5">
                        {section.types.map(t => section.typeLabels[t]).filter(Boolean).join(" · ")}
                        {section.years ? ` · ${section.years[0]}–${section.years[section.years.length - 1]}` : ""}
                        {section.hasDays ? " · 7 días" : ""}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30" />
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div key="editor" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              {selectedSection.types.length > 1 && (
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Tipo de contenido</p>
                  <div className="flex gap-2">
                    {selectedSection.types.map((t) => (
                      <button key={t} onClick={() => setSelectedType(t)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedType === t ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                        {selectedSection.typeLabels[t]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedSection.years && (
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Año</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSection.years.map((y) => (
                      <button key={y} onClick={() => setSelectedYear(y)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${selectedYear === y ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedSection.hasDays && (
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Día de la semana</p>
                  <div className="flex flex-wrap gap-2">
                    {DAY_NAMES.map((d, i) => (
                      <button key={i} onClick={() => setSelectedDay(i)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${selectedDay === i ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/50 text-xs uppercase tracking-wider">
                    Contenido — {selectedSection.label}
                    {selectedSection.years ? ` ${selectedYear}` : ""}
                    {selectedSection.hasDays ? ` (${DAY_NAMES[selectedDay]})` : ""}
                  </p>
                  <span className="text-white/30 text-xs">{editText.length} chars</span>
                </div>
                {loadingContent ? (
                  <div className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-indigo-300 animate-spin" />
                  </div>
                ) : (
                  <textarea value={editText} onChange={(e) => { setEditText(e.target.value); setSaveState("idle"); }}
                    rows={16}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white/90 placeholder:text-white/20 focus:outline-none focus:border-indigo-400/50 resize-none font-mono text-sm leading-relaxed"
                    placeholder="Escribe el contenido aquí..."
                  />
                )}
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave}
                disabled={!editText.trim() || saveState === "saving" || loadingContent}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base transition-all ${
                  saveState === "saved" ? "bg-green-500 text-white" :
                  saveState === "error" ? "bg-red-500 text-white" :
                  "bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                }`}>
                {saveState === "saving" ? <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</> :
                 saveState === "saved" ? <><Check className="w-5 h-5" /> Guardado en todos los dispositivos</> :
                 saveState === "error" ? <>❌ Error al guardar</> :
                 <><Save className="w-5 h-5" /> Guardar cambios</>}
              </motion.button>

              <p className="text-white/25 text-xs text-center">Los cambios se guardan en Firebase y se sincronizan en todos los dispositivos.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
