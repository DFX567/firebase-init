import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Feather, CalendarDays } from "lucide-react";
import { CustomSectionConfig } from "@/utils/customSections";
import { getContent } from "@/utils/contentOverrides";

interface Props {
  config: CustomSectionConfig;
  onBack: () => void;
  onNavigate: (view: "letter" | "poem", year?: number) => void;
}

export default function CustomSectionHome({ config, onBack, onNavigate }: Props) {
  const years = config.hasYears
    ? Array.from(
        { length: config.yearEnd - config.yearStart + 1 },
        (_, i) => config.yearStart + i
      )
    : [];

  const currentYear = new Date().getFullYear();

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: config.mainBg }}
    >
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 p-4 md:p-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:text-white hover:bg-white/15 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Inicio</span>
        </motion.button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 md:px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full blur-3xl opacity-40"
              style={{ background: config.cardGradient, transform: "scale(1.5)" }} />
            {config.logoType === "image" && config.logoValue ? (
              <img
                src={config.logoValue}
                alt={config.title}
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-2xl border-4 border-white/20"
              />
            ) : (
              <div className="relative text-7xl md:text-9xl">{config.logoValue || config.emoji}</div>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-3">
            {config.title}
          </h1>
          <p className="text-white/60 text-base md:text-lg font-medium">{config.dateLabel}</p>
        </motion.div>

        {config.hasYears && years.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-lg"
          >
            <div className="flex items-center gap-2 text-white/50 text-sm font-medium mb-4 justify-center">
              <CalendarDays className="w-4 h-4" />
              Selecciona un año
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {years.map((year, i) => {
                const isLocked = year > currentYear;
                const hasLetter = config.contentTypes.includes("letter");
                const hasPoem = config.contentTypes.includes("poem");
                return (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    {isLocked ? (
                      <div className="rounded-xl p-3 text-center bg-white/5 border border-white/10 cursor-not-allowed opacity-40">
                        <div className="text-lg mb-1">🔒</div>
                        <div className="text-white/50 text-sm font-bold">{year}</div>
                      </div>
                    ) : (
                      <div className="rounded-xl overflow-hidden border border-white/15 bg-white/8 backdrop-blur-sm">
                        <div className="px-3 pt-2 pb-1 text-center text-white font-bold text-sm border-b border-white/10">
                          {year}
                        </div>
                        <div className="flex">
                          {hasLetter && (
                            <button
                              onClick={() => onNavigate("letter", year)}
                              className="flex-1 flex flex-col items-center py-2 px-1 hover:bg-white/10 transition-all text-white/70 hover:text-white gap-1"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span className="text-xs">Carta</span>
                            </button>
                          )}
                          {hasPoem && (
                            <button
                              onClick={() => onNavigate("poem", year)}
                              className="flex-1 flex flex-col items-center py-2 px-1 hover:bg-white/10 transition-all text-white/70 hover:text-white gap-1 border-l border-white/10"
                            >
                              <Feather className="w-3.5 h-3.5" />
                              <span className="text-xs">Poema</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {config.contentTypes.includes("letter") && (
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("letter")}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl border border-white/20 backdrop-blur-sm transition-all"
                style={{ background: config.cardGradient }}
              >
                <BookOpen className="w-6 h-6" />
                Carta
              </motion.button>
            )}
            {config.contentTypes.includes("poem") && (
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("poem")}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl border border-white/20 backdrop-blur-sm transition-all bg-white/10"
              >
                <Feather className="w-6 h-6" />
                Poema
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
