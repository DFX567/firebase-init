import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
import { ArrowLeft, Save, Check, Edit3, ChevronRight, Loader2 } from "lucide-react";
import { getContentKey, getContent, setContent, getDefaultContent } from "@/utils/contentOverrides";
=======
import {
  ArrowLeft, Save, Check, Edit3, ChevronRight, Loader2,
  Palette, PlusCircle, Layers, Trash2, Pencil, ImagePlus, X
} from "lucide-react";
import {
  getContentKey,
  getContent,
  setContent,
  getDefaultContent,
} from "@/utils/contentOverrides";
import {
  getCustomSections,
  getCustomSection,
  saveCustomSection,
  deleteCustomSection,
  getVisualOverride,
  setVisualOverride,
  GRADIENT_PRESETS,
  BACKGROUND_PRESETS,
  BUILTIN_DEFAULTS,
  type CustomSectionConfig,
} from "@/utils/customSections";
>>>>>>> c0004e4b62f689f03e73f6e42b85f38118ba9e2a

interface AdminEditorProps {
  onBack: () => void;
}

<<<<<<< HEAD
const SECTIONS = [
=======
const BUILTIN_SECTIONS = [
>>>>>>> c0004e4b62f689f03e73f6e42b85f38118ba9e2a
  { id: "sanvalentin", label: "San Valentín", emoji: "💕", types: ["letter", "poem"] as const, typeLabels: { letter: "Carta", poem: "Poema" }, years: [2025, 2026, 2027, 2028, 2029, 2030], hasDays: false },
  { id: "anniversary", label: "Aniversario", emoji: "💍", types: ["letter", "poem"] as const, typeLabels: { letter: "Carta", poem: "Poema" }, years: [2024, 2025, 2026, 2027, 2028, 2029, 2030], hasDays: false },
  { id: "cumple", label: "Cumpleaños", emoji: "🎂", types: ["letter"] as const, typeLabels: { letter: "Carta", poem: "" }, years: [2024, 2025, 2026, 2027, 2028, 2029, 2030], hasDays: false },
  { id: "flores", label: "Flores Amarillas", emoji: "🌻", types: ["letter"] as const, typeLabels: { letter: "Carta", poem: "" }, years: null as number[] | null, hasDays: false },
  { id: "memories", label: "Poema del Día", emoji: "📖", types: ["poem"] as const, typeLabels: { letter: "", poem: "Poema" }, years: null as number[] | null, hasDays: true },
];

const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
<<<<<<< HEAD
type Step = "section" | "editor";
type SaveState = "idle" | "saving" | "saved" | "error";
=======
type Tab = "content" | "visuals" | "create" | "manage";
type SaveState = "idle" | "saving" | "saved" | "error";

function GradientPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-white/50 text-xs uppercase tracking-wider mb-2">{label}</p>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {GRADIENT_PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => onChange(p.value)}
            title={p.name}
            className={`h-10 rounded-lg border-2 transition-all ${value === p.value ? "border-white scale-105" : "border-transparent hover:border-white/40"}`}
            style={{ background: p.value }}
          />
        ))}
      </div>
    </div>
  );
}

function BgPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [custom, setCustom] = useState("");
  return (
    <div>
      <p className="text-white/50 text-xs uppercase tracking-wider mb-2">{label}</p>
      <div className="grid grid-cols-5 gap-2 mb-2">
        {BACKGROUND_PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => onChange(p.value)}
            title={p.name}
            className={`h-9 rounded-lg border-2 transition-all ${value === p.value ? "border-white scale-105" : "border-transparent hover:border-white/40"}`}
            style={{ background: p.value }}
          />
        ))}
      </div>
      <input
        type="text"
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
        onBlur={() => { if (custom.trim()) onChange(custom.trim()); }}
        placeholder="CSS personalizado (gradient, color...)"
        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white/80 text-xs placeholder:text-white/20 focus:outline-none focus:border-indigo-400/50"
      />
    </div>
  );
}

function LogoPicker({ logoType, logoValue, onChange }: {
  logoType: "emoji" | "image";
  logoValue: string;
  onChange: (type: "emoji" | "image", value: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange("image", reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Logo / Imagen de la sección</p>
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => onChange("emoji", logoValue)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${logoType === "emoji" ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}
        >
          Emoji
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${logoType === "image" ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}
        >
          <ImagePlus className="w-4 h-4" />
          Subir imagen
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {logoType === "emoji" ? (
        <input
          type="text"
          value={logoValue}
          onChange={(e) => onChange("emoji", e.target.value)}
          placeholder="Emoji o texto"
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-2xl text-center placeholder:text-white/20 focus:outline-none focus:border-indigo-400/50"
        />
      ) : (
        <div className="flex items-center gap-3">
          {logoValue && <img src={logoValue} alt="logo" className="w-14 h-14 rounded-full object-cover border border-white/20" />}
          <button
            onClick={() => onChange("emoji", "❤️")}
            className="text-xs text-white/40 hover:text-white/70 flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Quitar imagen
          </button>
        </div>
      )}
    </div>
  );
}
>>>>>>> c0004e4b62f689f03e73f6e42b85f38118ba9e2a

export default function AdminEditor({ onBack }: AdminEditorProps) {
  const [tab, setTab] = useState<Tab>("content");

  const [contentStep, setContentStep] = useState<"section" | "editor">("section");
  const [contentSection, setContentSection] = useState(BUILTIN_SECTIONS[0] as typeof BUILTIN_SECTIONS[0] | null);
  const [contentCustomId, setContentCustomId] = useState<string | null>(null);
  const [contentType, setContentType] = useState<"letter" | "poem">("letter");
  const [contentYear, setContentYear] = useState(2026);
  const [contentDay, setContentDay] = useState(new Date().getDay());
  const [editText, setEditText] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [loadingContent, setLoadingContent] = useState(false);
<<<<<<< HEAD

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
=======

  const [customSections, setCustomSections] = useState(getCustomSections);

  const [visualSectionId, setVisualSectionId] = useState<string>("sanvalentin");
  const [visualCardGrad, setVisualCardGrad] = useState("");
  const [visualMainBg, setVisualMainBg] = useState("");
  const [visualContentBg, setVisualContentBg] = useState("");
  const [visualLogoType, setVisualLogoType] = useState<"emoji" | "image">("emoji");
  const [visualLogoValue, setVisualLogoValue] = useState("");
  const [visualSaveState, setVisualSaveState] = useState<SaveState>("idle");

  const [createForm, setCreateForm] = useState({
    id: "",
    title: "",
    emoji: "❤️",
    dateLabel: "",
    cardGradient: GRADIENT_PRESETS[0].value,
    mainBg: BACKGROUND_PRESETS[0].value,
    contentBg: BACKGROUND_PRESETS[1].value,
    logoType: "emoji" as "emoji" | "image",
    logoValue: "❤️",
    contentTypes: ["letter"] as ("letter" | "poem")[],
    hasYears: true,
    yearStart: 2025,
    yearEnd: 2030,
  });
  const [editingCustomId, setEditingCustomId] = useState<string | null>(null);
  const [createSaveState, setCreateSaveState] = useState<SaveState>("idle");

  const refreshCustom = () => setCustomSections(getCustomSections());

  const allSectionsForVisuals = [
    ...BUILTIN_SECTIONS.map((s) => ({ id: s.id, label: s.label, emoji: s.emoji, isCustom: false })),
    ...customSections.map((s) => ({ id: s.id, label: s.title, emoji: s.emoji, isCustom: true })),
  ];

  const allSectionsForContent = [
    ...BUILTIN_SECTIONS,
    ...customSections.map((s) => ({
      id: s.id,
      label: s.title,
      emoji: s.emoji,
      types: s.contentTypes,
      typeLabels: { letter: "Carta", poem: "Poema" } as { letter: string; poem: string },
      years: s.hasYears ? Array.from({ length: s.yearEnd - s.yearStart + 1 }, (_, i) => s.yearStart + i) : null,
      hasDays: false,
      isCustom: true,
    })),
  ];

  useEffect(() => {
    if (contentStep !== "editor") return;
    setLoadingContent(true);
    setSaveState("idle");

    const run = async () => {
      let text = "";
      if (contentCustomId) {
        const cfg = getCustomSection(contentCustomId);
        if (cfg) {
          const key = contentYear
            ? `edit-custom-${cfg.id}-${contentType}-${contentYear}`
            : `edit-custom-${cfg.id}-${contentType}`;
          text = localStorage.getItem(key) || "";
        }
      } else if (contentSection) {
        const key = getContentKey(contentSection.id, contentType, contentYear, contentDay);
        const def = getDefaultContent(contentSection.id, contentType, contentYear, contentDay);
        text = await getContent(key, def);
      }
      setEditText(text);
      setLoadingContent(false);
    };
    run();
  }, [contentStep, contentSection, contentCustomId, contentType, contentYear, contentDay]);

  const handleSaveContent = async () => {
    if (saveState === "saving") return;
    setSaveState("saving");
    try {
      if (contentCustomId) {
        const cfg = getCustomSection(contentCustomId);
        if (cfg) {
          const key = cfg.hasYears
            ? `edit-custom-${cfg.id}-${contentType}-${contentYear}`
            : `edit-custom-${cfg.id}-${contentType}`;
          localStorage.setItem(key, editText);
        }
        setSaveState("saved");
      } else if (contentSection) {
        const key = getContentKey(contentSection.id, contentType, contentYear, contentDay);
        await setContent(key, editText);
        setSaveState("saved");
      }
>>>>>>> c0004e4b62f689f03e73f6e42b85f38118ba9e2a
      setTimeout(() => setSaveState("idle"), 2500);
    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 3000);
    }
  };

  const handleOpenContentEditor = (sec: typeof allSectionsForContent[0]) => {
    const isCustom = "isCustom" in sec && sec.isCustom;
    if (isCustom) {
      setContentCustomId(sec.id);
      setContentSection(null);
    } else {
      setContentCustomId(null);
      setContentSection(BUILTIN_SECTIONS.find((s) => s.id === sec.id) ?? null);
    }
    setContentType(sec.types[0]);
    if (sec.years) setContentYear(sec.years[0]);
    if (sec.hasDays) setContentDay(new Date().getDay());
    setContentStep("editor");
  };

  useEffect(() => {
    const defaults = BUILTIN_DEFAULTS[visualSectionId];
    const override = getVisualOverride(visualSectionId);
    const custom = customSections.find((s) => s.id === visualSectionId);

    if (custom) {
      setVisualCardGrad(custom.cardGradient);
      setVisualMainBg(custom.mainBg);
      setVisualContentBg(custom.contentBg);
      setVisualLogoType(custom.logoType);
      setVisualLogoValue(custom.logoValue);
    } else {
      setVisualCardGrad(override.cardGradient ?? defaults?.cardGradient ?? GRADIENT_PRESETS[0].value);
      setVisualMainBg(override.mainBg ?? defaults?.mainBg ?? BACKGROUND_PRESETS[0].value);
      setVisualContentBg(override.contentBg ?? defaults?.contentBg ?? BACKGROUND_PRESETS[1].value);
      setVisualLogoType(override.logoType ?? defaults?.logoType ?? "emoji");
      setVisualLogoValue(override.logoValue ?? defaults?.logoValue ?? "❤️");
    }
  }, [visualSectionId, customSections]);

  const handleSaveVisuals = () => {
    setVisualSaveState("saving");
    const custom = customSections.find((s) => s.id === visualSectionId);
    if (custom) {
      saveCustomSection({ ...custom, cardGradient: visualCardGrad, mainBg: visualMainBg, contentBg: visualContentBg, logoType: visualLogoType, logoValue: visualLogoValue });
      refreshCustom();
    } else {
      setVisualOverride(visualSectionId, { cardGradient: visualCardGrad, mainBg: visualMainBg, contentBg: visualContentBg, logoType: visualLogoType, logoValue: visualLogoValue });
    }
    setVisualSaveState("saved");
    setTimeout(() => setVisualSaveState("idle"), 2500);
  };

  const handleCreateSection = () => {
    if (!createForm.title.trim()) return;
    setCreateSaveState("saving");
    const id = editingCustomId ?? `custom-${Date.now()}`;
    const section: CustomSectionConfig = {
      id,
      title: createForm.title.trim(),
      emoji: createForm.emoji,
      dateLabel: createForm.dateLabel,
      cardGradient: createForm.cardGradient,
      mainBg: createForm.mainBg,
      contentBg: createForm.contentBg,
      logoType: createForm.logoType,
      logoValue: createForm.logoValue,
      contentTypes: createForm.contentTypes,
      hasYears: createForm.hasYears,
      yearStart: createForm.yearStart,
      yearEnd: createForm.yearEnd,
      createdAt: editingCustomId ? (customSections.find((s) => s.id === id)?.createdAt ?? Date.now()) : Date.now(),
    };
    saveCustomSection(section);
    refreshCustom();
    setCreateSaveState("saved");
    setEditingCustomId(null);
    setCreateForm({ id: "", title: "", emoji: "❤️", dateLabel: "", cardGradient: GRADIENT_PRESETS[0].value, mainBg: BACKGROUND_PRESETS[0].value, contentBg: BACKGROUND_PRESETS[1].value, logoType: "emoji", logoValue: "❤️", contentTypes: ["letter"], hasYears: true, yearStart: 2025, yearEnd: 2030 });
    setTimeout(() => { setCreateSaveState("idle"); setTab("manage"); }, 1500);
  };

  const handleEditCustom = (id: string) => {
    const s = getCustomSection(id);
    if (!s) return;
    setEditingCustomId(id);
    setCreateForm({ id: s.id, title: s.title, emoji: s.emoji, dateLabel: s.dateLabel, cardGradient: s.cardGradient, mainBg: s.mainBg, contentBg: s.contentBg, logoType: s.logoType, logoValue: s.logoValue, contentTypes: s.contentTypes, hasYears: s.hasYears, yearStart: s.yearStart, yearEnd: s.yearEnd });
    setTab("create");
  };

  const handleDeleteCustom = (id: string) => {
    if (!confirm("¿Eliminar esta sección? Esta acción no se puede deshacer.")) return;
    deleteCustomSection(id);
    refreshCustom();
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "content", label: "Contenido", icon: <Edit3 className="w-4 h-4" /> },
    { id: "visuals", label: "Visuales", icon: <Palette className="w-4 h-4" /> },
    { id: "create", label: editingCustomId ? "Editar" : "Crear", icon: <PlusCircle className="w-4 h-4" /> },
    { id: "manage", label: "Mis Secciones", icon: <Layers className="w-4 h-4" /> },
  ];

  const activeContentSec = contentCustomId
    ? allSectionsForContent.find((s) => s.id === contentCustomId)
    : contentSection;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
<<<<<<< HEAD
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          onClick={step === "editor" ? () => setStep("section") : onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 mb-8 text-white/80"
=======
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            if (tab === "content" && contentStep === "editor") setContentStep("section");
            else onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 mb-6 text-white/80"
>>>>>>> c0004e4b62f689f03e73f6e42b85f38118ba9e2a
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{tab === "content" && contentStep === "editor" ? "Secciones" : "Volver al Hub"}</span>
        </motion.button>

<<<<<<< HEAD
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-indigo-500/20 border border-indigo-300/30 mb-4">
            <Edit3 className="w-10 h-10 text-indigo-300" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Panel de Administración</h1>
          <p className="text-white/40 text-sm">Los cambios se sincronizan en todos los dispositivos</p>
=======
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="inline-flex p-4 rounded-2xl bg-indigo-500/20 border border-indigo-300/30 mb-3">
            <Edit3 className="w-9 h-9 text-indigo-300" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Modo Desarrollador</h1>
          <p className="text-white/40 text-sm">Panel de administración avanzado</p>
>>>>>>> c0004e4b62f689f03e73f6e42b85f38118ba9e2a
        </motion.div>

        <div className="flex gap-1 bg-white/5 rounded-2xl p-1 mb-6 border border-white/10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); if (t.id === "content") setContentStep("section"); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${tab === t.id ? "bg-indigo-500 text-white shadow-lg" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
<<<<<<< HEAD
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
=======
          {tab === "content" && (
            <motion.div key="content" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              {contentStep === "section" ? (
                <div className="space-y-3">
                  <p className="text-white/50 text-sm mb-4">Selecciona una sección para editar su contenido:</p>
                  {allSectionsForContent.map((section) => (
                    <motion.button
                      key={section.id}
                      whileHover={{ x: 4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOpenContentEditor(section)}
                      className="w-full flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{section.emoji}</span>
                        <div className="text-left">
                          <p className="text-white font-semibold">{section.label}</p>
                          <p className="text-white/40 text-xs mt-0.5">
                            {section.types.map((t) => section.typeLabels[t]).filter(Boolean).join(" · ")}
                            {section.years ? ` · ${section.years[0]}–${section.years[section.years.length - 1]}` : ""}
                            {section.hasDays ? " · 7 días" : ""}
                            {"isCustom" in section && section.isCustom ? " · Personalizada" : ""}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/30" />
                    </motion.button>
                  ))}
                </div>
              ) : activeContentSec ? (
                <div className="space-y-5">
                  {activeContentSec.types.length > 1 && (
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Tipo de contenido</p>
                      <div className="flex gap-2">
                        {activeContentSec.types.map((t) => (
                          <button key={t} onClick={() => setContentType(t as "letter" | "poem")}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${contentType === t ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                            {activeContentSec.typeLabels[t as "letter" | "poem"]}
                          </button>
                        ))}
                      </div>
>>>>>>> c0004e4b62f689f03e73f6e42b85f38118ba9e2a
                    </div>
                  )}
                  {activeContentSec.years && (
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Año</p>
                      <div className="flex flex-wrap gap-2">
                        {activeContentSec.years.map((y) => (
                          <button key={y} onClick={() => setContentYear(y)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${contentYear === y ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                            {y}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeContentSec.hasDays && (
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Día de la semana</p>
                      <div className="flex flex-wrap gap-2">
                        {DAY_NAMES.map((d, i) => (
                          <button key={i} onClick={() => setContentDay(i)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${contentDay === i ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white/50 text-xs uppercase tracking-wider">
                        {activeContentSec.label}{activeContentSec.years ? ` ${contentYear}` : ""}{activeContentSec.hasDays ? ` (${DAY_NAMES[contentDay]})` : ""}
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
                        placeholder="Escribe el contenido aquí..." />
                    )}
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSaveContent}
                    disabled={saveState === "saving" || loadingContent}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base transition-all ${saveState === "saved" ? "bg-green-500 text-white" : saveState === "error" ? "bg-red-500 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-40"}`}>
                    {saveState === "saving" ? <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</>
                      : saveState === "saved" ? <><Check className="w-5 h-5" /> Guardado</>
                      : saveState === "error" ? <>❌ Error al guardar</>
                      : <><Save className="w-5 h-5" /> Guardar cambios</>}
                  </motion.button>
                </div>
              ) : null}
            </motion.div>
<<<<<<< HEAD
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
=======
          )}
>>>>>>> c0004e4b62f689f03e73f6e42b85f38118ba9e2a

          {tab === "visuals" && (
            <motion.div key="visuals" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Sección a editar</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allSectionsForVisuals.map((s) => (
                    <button key={s.id} onClick={() => setVisualSectionId(s.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${visualSectionId === s.id ? "bg-indigo-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
                      <span>{s.emoji}</span>
                      <span className="truncate">{s.label}</span>
                    </button>
                  ))}
                </div>
<<<<<<< HEAD
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
=======
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-2">
                <p className="text-white/50 text-xs mb-2">Vista previa</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: visualCardGrad }}>
                    {visualLogoType === "image" && visualLogoValue
                      ? <img src={visualLogoValue} alt="" className="w-full h-full rounded-xl object-cover" />
                      : visualLogoValue}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{allSectionsForVisuals.find((s) => s.id === visualSectionId)?.label}</div>
                    <div className="text-white/40 text-xs">Card del Hub</div>
                  </div>
                  <div className="ml-auto w-20 h-8 rounded-lg" style={{ background: visualMainBg }} title="Fondo principal" />
                </div>
              </div>

              <GradientPicker label="Gradiente del card (Hub)" value={visualCardGrad} onChange={setVisualCardGrad} />
              <BgPicker label="Fondo de la sección principal" value={visualMainBg} onChange={setVisualMainBg} />
              <BgPicker label="Fondo de cartas / subsecciones" value={visualContentBg} onChange={setVisualContentBg} />
              <LogoPicker logoType={visualLogoType} logoValue={visualLogoValue}
                onChange={(type, val) => { setVisualLogoType(type); setVisualLogoValue(val); }} />

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSaveVisuals}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base transition-all ${visualSaveState === "saved" ? "bg-green-500 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white"}`}>
                {visualSaveState === "saving" ? <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</>
                  : visualSaveState === "saved" ? <><Check className="w-5 h-5" /> Guardado</>
                  : <><Save className="w-5 h-5" /> Guardar visuales</>}
              </motion.button>
            </motion.div>
          )}

          {tab === "create" && (
            <motion.div key="create" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-white font-bold text-lg">{editingCustomId ? "Editar sección" : "Nueva sección"}</p>
                {editingCustomId && (
                  <button onClick={() => { setEditingCustomId(null); setCreateForm({ id: "", title: "", emoji: "❤️", dateLabel: "", cardGradient: GRADIENT_PRESETS[0].value, mainBg: BACKGROUND_PRESETS[0].value, contentBg: BACKGROUND_PRESETS[1].value, logoType: "emoji", logoValue: "❤️", contentTypes: ["letter"], hasYears: true, yearStart: 2025, yearEnd: 2030 }); }}
                    className="text-white/40 hover:text-white/70 text-xs flex items-center gap-1">
                    <X className="w-3 h-3" /> Cancelar edición
                  </button>
                )}
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-1">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Emoji</p>
                  <input type="text" value={createForm.emoji} onChange={(e) => setCreateForm((f) => ({ ...f, emoji: e.target.value }))}
                    className="w-full px-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-2xl text-center focus:outline-none focus:border-indigo-400/50" />
                </div>
                <div className="col-span-3">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Nombre</p>
                  <input type="text" value={createForm.title} onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Ej: Nuestro Primer Viaje"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-400/50" />
                </div>
              </div>

              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Fecha / Descripción</p>
                <input type="text" value={createForm.dateLabel} onChange={(e) => setCreateForm((f) => ({ ...f, dateLabel: e.target.value }))}
                  placeholder="Ej: 15 de Junio · Primer viaje juntos"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-400/50" />
              </div>

              <GradientPicker label="Gradiente del card" value={createForm.cardGradient} onChange={(v) => setCreateForm((f) => ({ ...f, cardGradient: v }))} />
              <BgPicker label="Fondo de la sección" value={createForm.mainBg} onChange={(v) => setCreateForm((f) => ({ ...f, mainBg: v }))} />
              <BgPicker label="Fondo de cartas / subsecciones" value={createForm.contentBg} onChange={(v) => setCreateForm((f) => ({ ...f, contentBg: v }))} />
              <LogoPicker logoType={createForm.logoType} logoValue={createForm.logoValue}
                onChange={(type, val) => setCreateForm((f) => ({ ...f, logoType: type, logoValue: val }))} />

              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Tipos de contenido</p>
                <div className="flex gap-3">
                  {(["letter", "poem"] as const).map((t) => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={createForm.contentTypes.includes(t)}
                        onChange={(e) => setCreateForm((f) => ({ ...f, contentTypes: e.target.checked ? [...f.contentTypes, t] : f.contentTypes.filter((c) => c !== t) }))}
                        className="w-4 h-4 rounded accent-indigo-500" />
                      <span className="text-white text-sm">{t === "letter" ? "📝 Carta" : "🪶 Poema"}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={createForm.hasYears}
                      onChange={(e) => setCreateForm((f) => ({ ...f, hasYears: e.target.checked }))}
                      className="w-4 h-4 rounded accent-indigo-500" />
                    <span className="text-white text-sm font-semibold">📅 Selector de años</span>
                  </label>
                </div>
                {createForm.hasYears && (
                  <div className="grid grid-cols-2 gap-3 ml-6">
                    <div>
                      <p className="text-white/50 text-xs mb-1">Desde</p>
                      <input type="number" value={createForm.yearStart} min={2020} max={2040}
                        onChange={(e) => setCreateForm((f) => ({ ...f, yearStart: Number(e.target.value) }))}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-400/50 text-sm" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs mb-1">Hasta</p>
                      <input type="number" value={createForm.yearEnd} min={2020} max={2040}
                        onChange={(e) => setCreateForm((f) => ({ ...f, yearEnd: Number(e.target.value) }))}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-400/50 text-sm" />
                    </div>
                  </div>
                )}
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCreateSection}
                disabled={!createForm.title.trim() || createForm.contentTypes.length === 0 || createSaveState === "saving"}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base transition-all ${createSaveState === "saved" ? "bg-green-500 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-40"}`}>
                {createSaveState === "saving" ? <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</>
                  : createSaveState === "saved" ? <><Check className="w-5 h-5" /> {editingCustomId ? "Actualizada" : "Sección creada"}</>
                  : <><PlusCircle className="w-5 h-5" /> {editingCustomId ? "Guardar cambios" : "Crear sección"}</>}
              </motion.button>
            </motion.div>
          )}

          {tab === "manage" && (
            <motion.div key="manage" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-white font-bold text-lg">Secciones personalizadas</p>
                <button onClick={() => { setEditingCustomId(null); setTab("create"); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold transition-all">
                  <PlusCircle className="w-4 h-4" /> Nueva
                </button>
              </div>

              {customSections.length === 0 ? (
                <div className="text-center py-16 text-white/30">
                  <Layers className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>No hay secciones personalizadas todavía.</p>
                  <p className="text-sm mt-1">Crea una desde la pestaña "Crear".</p>
                </div>
              ) : (
                customSections.map((s) => (
                  <motion.div key={s.id} layout className="flex items-center gap-4 px-5 py-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: s.cardGradient }}>
                      {s.logoType === "image" && s.logoValue
                        ? <img src={s.logoValue} alt="" className="w-full h-full rounded-xl object-cover" />
                        : s.logoValue || s.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{s.title}</p>
                      <p className="text-white/40 text-xs">
                        {s.dateLabel} · {s.contentTypes.map((t) => t === "letter" ? "Carta" : "Poema").join(" + ")}
                        {s.hasYears ? ` · ${s.yearStart}–${s.yearEnd}` : ""}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleEditCustom(s.id)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-indigo-500/30 text-white/60 hover:text-white transition-all">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteCustom(s.id)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-red-500/30 text-white/60 hover:text-red-400 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
>>>>>>> c0004e4b62f689f03e73f6e42b85f38118ba9e2a
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
