import { useState } from "react";
import { getCustomSection } from "@/utils/customSections";
import CustomSectionHome from "./CustomSectionHome";
import CustomSectionContent from "./CustomSectionContent";

interface Props {
  sectionId: string;
  onBack: () => void;
}

type View =
  | { type: "home" }
  | { type: "letter"; year?: number }
  | { type: "poem"; year?: number };

export default function CustomSectionRouter({ sectionId, onBack }: Props) {
  const [view, setView] = useState<View>({ type: "home" });
  const config = getCustomSection(sectionId);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-white/60 mb-4">Sección no encontrada</p>
          <button
            onClick={onBack}
            className="px-6 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (view.type === "home") {
    return (
      <CustomSectionHome
        config={config}
        onBack={onBack}
        onNavigate={(type, year) => setView({ type, year })}
      />
    );
  }

  return (
    <CustomSectionContent
      config={config}
      contentType={view.type as "letter" | "poem"}
      year={view.year}
      onBack={() => setView({ type: "home" })}
    />
  );
}
