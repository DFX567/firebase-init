import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Mail, Sparkles, Calendar, Gamepad2, Clock, Layers } from "lucide-react";
import YearSelector from "@/components/YearSelector";
import AnniversaryGate from "./AnniversaryGate";
import { anniversaryData } from "@/data/events";
import StarField from "@/components/StarField";
import Planet3D from "@/components/animations/Planet3D";
import { useSmartCountdown } from "@/hooks/useSmartCountdown";

interface AnniversaryHomeProps {
  onBack: () => void;
  onViewLetter: (year: number) => void;
  onViewTimeline: () => void;
  onViewCards: () => void;
}

export default function AnniversaryHome({ onBack, onViewLetter, onViewTimeline, onViewCards }: AnniversaryHomeProps) {
  const [year, setYear] = useState(2024);
  const data = anniversaryData[year];
  const countdown = useSmartCountdown(11, 2, year);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-950/90 via-pink-950/80 to-purple-950/90">
        <StarField count={100} />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-pink-500/15 rounded-full blur-3xl" 
        />
      </div>

      <Planet3D 
        size={400} 
        position={{ x: "88%", y: "20%" }}
        colors={["#fecdd3", "#fb7185", "#e11d48"]}
        rotationSpeed={90}
        type="moon"
      />

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          data-testid="button-back-anniversary"
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-all backdrop-blur-2xl border border-rose-300/30 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold text-rose-100 text-sm md:text-base">Volver</span>
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
              className="absolute inset-0 bg-rose-500/30 rounded-full blur-2xl"
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative p-5 md:p-6 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl backdrop-blur-xl border border-rose-300/30 shadow-xl"
            >
              <Calendar className="w-10 h-10 md:w-14 md:h-14 text-rose-200" />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 mb-3 tracking-tight">
            Aniversario
          </h1>
          <p className="text-base md:text-xl text-rose-100/70 max-w-2xl mx-auto">
            2 de Noviembre 2024 - El dia que todo comenzo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-5 md:p-8 border border-rose-300/20">
            <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
              <Heart className="w-4 h-4 md:w-5 md:h-5 text-rose-300 fill-rose-300" />
              <h3 className="text-base md:text-lg font-bold text-rose-100">
                {countdown.isPast ? "Tiempo juntos" : "Cuenta regresiva"}
              </h3>
              <Heart className="w-4 h-4 md:w-5 md:h-5 text-rose-300 fill-rose-300" />
            </div>

            <div className="grid grid-cols-4 gap-2 md:gap-4 mb-4">
              {[
                { label: "Dias", value: countdown.days },
                { label: "Hrs", value: countdown.hours },
                { label: "Min", value: countdown.minutes },
                { label: "Seg", value: countdown.seconds },
              ].map((item) => (
                <div key={item.label} className="bg-rose-500/20 rounded-xl p-3 md:p-4 text-center">
                  <motion.div 
                    key={item.value}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl md:text-4xl font-black text-rose-50"
                  >
                    {item.value}
                  </motion.div>
                  <div className="text-[10px] md:text-xs text-rose-200/70 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-rose-200/60 text-sm">{countdown.message}</p>
          </div>
        </motion.div>

        <YearSelector year={year} onChange={setYear} theme="anniversary" />

        <AnniversaryGate unlockDate={data.unlockDate}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-rose-300/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-rose-200" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-rose-50 text-center mb-3">
                {data.title}
              </h2>
              <p className="text-base md:text-lg text-rose-100/80 text-center max-w-2xl mx-auto">
                {data.text}
              </p>
            </div>

            <motion.button
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewLetter(year)}
              data-testid="button-letter-anniversary"
              className="w-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-rose-300/30 hover:border-rose-300/50 transition-all"
            >
              <Mail className="w-10 h-10 md:w-12 md:h-12 text-rose-200 mx-auto mb-3" />
              <h3 className="text-xl md:text-2xl font-bold text-rose-50">Carta de Amor</h3>
              <p className="text-sm text-rose-200/70">Palabras desde el corazon</p>
            </motion.button>

            <div className="pt-4">
              <h3 className="text-center text-rose-200/70 text-sm mb-4 flex items-center justify-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                Minijuegos
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <motion.button
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onViewTimeline}
                  data-testid="button-timeline"
                  className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-pink-300/30 hover:border-pink-300/50 transition-all"
                >
                  <Clock className="w-8 h-8 md:w-10 md:h-10 text-pink-200 mx-auto mb-3" />
                  <h3 className="text-base md:text-lg font-bold text-pink-50">Linea del Tiempo</h3>
                  <p className="text-xs text-pink-200/70">Ordena nuestra historia</p>
                </motion.button>

                <motion.button
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onViewCards}
                  data-testid="button-cards"
                  className="bg-gradient-to-br from-rose-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-rose-300/30 hover:border-rose-300/50 transition-all"
                >
                  <Layers className="w-8 h-8 md:w-10 md:h-10 text-rose-200 mx-auto mb-3" />
                  <h3 className="text-base md:text-lg font-bold text-rose-50">Cartas de Amor</h3>
                  <p className="text-xs text-rose-200/70">Mensajes especiales</p>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnniversaryGate>
      </div>
    </div>
  );
}
