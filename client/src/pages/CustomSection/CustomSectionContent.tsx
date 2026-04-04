import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, SkipForward, BookOpen, Feather } from "lucide-react";
import { CustomSectionConfig } from "@/utils/customSections";
import { getBgConfig } from "@/utils/backgroundConfigs";
import CustomBackground from "@/components/CustomBackground";
import { useTypewriter } from "@/hooks/useTypewriter";

interface Props {
  config: CustomSectionConfig;
  contentType: "letter" | "poem";
  year?: number;
  onBack: () => void;
}

const PLACEHOLDER_LETTER = `Aquí irá tu carta para esta sección.

Puedes editarla desde el panel de administrador.

Ve a Modo Desarrollador → Contenido → selecciona esta sección.`;

const PLACEHOLDER_POEM = `Aquí irá tu poema para esta sección.

Puedes editarlo desde el panel de administrador.

Ve a Modo Desarrollador → Contenido → selecciona esta sección.`;

export default function CustomSectionContent({ config, contentType, year, onBack }: Props) {
  const [spedup, setSpedUp] = useState(false);

  const key = year
    ? `edit-custom-${config.id}-${contentType}-${year}`
    : `edit-custom-${config.id}-${contentType}`;

  const rawContent = localStorage.getItem(key) ||
    (contentType === "letter" ? PLACEHOLDER_LETTER : PLACEHOLDER_POEM);

  const { display, speedUp, skip, done } = useTypewriter(rawContent, 30);

  const handleSpeedUp = () => {
    setSpedUp(true);
    speedUp();
  };

  const Icon = contentType === "letter" ? BookOpen : Feather;
  const label = contentType === "letter" ? "Carta" : "Poema";

  const bgConfig = config.contentBgConfigId ? getBgConfig(config.contentBgConfigId) : null;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={bgConfig ? undefined : { background: config.contentBg }}
    >
      {bgConfig && <CustomBackground config={bgConfig} />}
      {!bgConfig && (
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 60%)" }}
        />
      )}

      <div className="relative z-10 p-4 md:p-6 flex items-center justify-between">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/15 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Volver</span>
        </motion.button>

        <div className="flex gap-2">
          {!done && !spedup && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSpeedUp}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white/70 hover:text-white text-sm transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              Acelerar
            </motion.button>
          )}
          {!done && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={skip}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white/70 hover:text-white text-sm transition-all"
            >
              <SkipForward className="w-3.5 h-3.5" />
              Saltar
            </motion.button>
          )}
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="text-5xl mb-3">
            {config.logoType === "image" && config.logoValue ? (
              <img src={config.logoValue} alt="" className="w-14 h-14 rounded-full object-cover inline-block" />
            ) : (
              config.logoValue || config.emoji
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            {config.title}
          </h2>
          <p className="text-white/50 text-sm mt-1 flex items-center gap-2 justify-center">
            <Icon className="w-3.5 h-3.5" />
            {label}{year ? ` · ${year}` : ""}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div
            className="absolute -inset-3 rounded-3xl blur-2xl opacity-20"
            style={{ background: config.cardGradient }}
          />
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/20 shadow-2xl">
            <pre className="whitespace-pre-wrap text-base md:text-lg leading-relaxed font-sans text-white/90">
              {display}
              {!done && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-0.5 h-5 bg-white/70 ml-0.5 align-middle"
                />
              )}
            </pre>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
