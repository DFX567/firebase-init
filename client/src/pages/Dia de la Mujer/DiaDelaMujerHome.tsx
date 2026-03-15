import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Mail, BookOpen, Sparkles, Gamepad2, Grid3X3 } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";
import YearSelector from "@/components/YearSelector";
import DiaDelaMujerGate from "./DiaDelaMujerGate";
import { diaDelaMujerData } from "@/data/events";
import { useSmartCountdown } from "@/hooks/useSmartCountdown";

interface DiaDelaMujerHomeProps {
  onBack: () => void;
  onViewLetter: (year: number) => void;
  onViewPoem: (year: number) => void;
  onViewQuiz: () => void;
  onViewMemory: () => void;
}

export default function DiaDelaMujerHome({ 
  onBack, 
  onViewLetter,
  onViewPoem,
  onViewQuiz,
  onViewMemory
}: DiaDelaMujerHomeProps) {
  const [year, setYear] = useState(2026);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const data = diaDelaMujerData[year];
  const countdown = useSmartCountdown(3, 8, year);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <SpaceBackground variant="default" />

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            data-testid="button-back-mujer"
            className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 transition-all backdrop-blur-2xl border border-purple-300/30 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold text-purple-100 text-sm md:text-base">Volver</span>
          </motion.button>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="relative inline-block mb-4 md:mb-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-purple-500/30 rounded-full blur-2xl"
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative p-5 md:p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-xl border border-purple-300/30 shadow-xl"
              >
                <Heart className="w-10 h-10 md:w-14 md:h-14 text-purple-200 fill-purple-200" />
              </motion.div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-100 to-purple-200 mb-3 tracking-tight">
              Día de la Mujer
            </h1>
            <p className="text-base md:text-xl text-purple-100/70 max-w-2xl mx-auto">
              Celebrando tu fuerza, tu esencia y tu amor
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-5 md:p-8 border border-purple-300/20">
              <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-purple-300 fill-purple-300" />
                <h3 className="text-base md:text-lg font-bold text-purple-100">
                  {countdown.isPast ? "Dias desde Día de la Mujer" : "Cuenta regresiva"}
                </h3>
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-purple-300 fill-purple-300" />
              </div>

              <div className="grid grid-cols-4 gap-2 md:gap-4 mb-4">
                {[
                  { label: "Dias", value: countdown.days },
                  { label: "Hrs", value: countdown.hours },
                  { label: "Min", value: countdown.minutes },
                  { label: "Seg", value: countdown.seconds },
                ].map((item) => (
                  <div key={item.label} className="bg-purple-500/20 rounded-xl p-3 md:p-4 text-center">
                    <motion.div 
                      key={item.value}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-2xl md:text-4xl font-black text-purple-50"
                    >
                      {item.value}
                    </motion.div>
                    <div className="text-[10px] md:text-xs text-purple-200/70 uppercase tracking-wider">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-purple-200/60 text-sm">{countdown.message}</p>
            </div>
          </motion.div>

          <YearSelector year={year} onChange={setYear} theme="women" />

          <DiaDelaMujerGate unlockDate={data.unlockDate}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-purple-300/20">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-200" />
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-purple-50 text-center mb-3">
                  {data.title}
                </h2>
                <p className="text-base md:text-lg text-purple-100/80 text-center max-w-2xl mx-auto">
                  {data.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <motion.button
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewLetter(year)}
                  onHoverStart={() => setHoveredCard('letter')}
                  onHoverEnd={() => setHoveredCard(null)}
                  data-testid="button-letter-mujer"
                  className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-purple-300/30 hover:border-purple-300/50 transition-all"
                >
                  <Mail className="w-8 h-8 md:w-10 md:h-10 text-purple-200 mx-auto mb-3" />
                  <h3 className="text-lg md:text-xl font-bold text-purple-50">Carta</h3>
                  <p className="text-xs md:text-sm text-purple-200/70">Mis sentimientos</p>
                </motion.button>

                <motion.button
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewPoem(year)}
                  data-testid="button-poem-mujer"
                  className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-pink-300/30 hover:border-pink-300/50 transition-all"
                >
                  <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-pink-200 mx-auto mb-3" />
                  <h3 className="text-lg md:text-xl font-bold text-pink-50">Poema</h3>
                  <p className="text-xs md:text-sm text-pink-200/70">Versos de amor</p>
                </motion.button>
              </div>

              <div className="pt-4">
                <h3 className="text-center text-purple-200/70 text-sm mb-4 flex items-center justify-center gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  Minijuegos
                </h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <motion.button
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onViewQuiz}
                    data-testid="button-quiz-mujer"
                    className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-pink-300/30 hover:border-pink-300/50 transition-all"
                  >
                    <Heart className="w-8 h-8 md:w-10 md:h-10 text-pink-200 mx-auto mb-3" />
                    <h3 className="text-base md:text-lg font-bold text-pink-50">Quiz</h3>
                    <p className="text-xs text-pink-200/70">Prueba tu conocimiento</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onViewMemory}
                    data-testid="button-memory-mujer"
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-purple-300/30 hover:border-purple-300/50 transition-all"
                  >
                    <Grid3X3 className="w-8 h-8 md:w-10 md:h-10 text-purple-200 mx-auto mb-3" />
                    <h3 className="text-base md:text-lg font-bold text-purple-50">Memoria</h3>
                    <p className="text-xs text-purple-200/70">Encuentra las parejas</p>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </DiaDelaMujerGate>
        </div>
    </div>
  );
}
