import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Cake, Mail } from "lucide-react";
import ConfettiRain from "@/components/animations/ConfettiRain";
import YearSelector from "@/components/YearSelector";
import BirthdayGate from "./BirthdayGate";
import { cumpleData } from "@/data/events";
import { cumpleTheme } from "@/lib/themes";
import { useCountdown } from "@/utils/countdown";
import PageTransition from "@/components/animations/PageTransition";

interface CumpleHomeProps {
  onBack: () => void;
  onViewLetter: (year: number) => void;
}

export default function CumpleHome({ onBack, onViewLetter }: CumpleHomeProps) {
  const [year, setYear] = useState(2025);
  const data = cumpleData[year];
  const countdown = useCountdown(2, 14);

  return (
    <PageTransition pageKey="cumple-home" variant="slide">
      <div className={`min-h-screen ${cumpleTheme.background} text-white relative overflow-hidden`}>
        <ConfettiRain count={60} />

        {/* Header */}
        <div className="relative z-10 pt-8 px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Hub</span>
          </motion.button>
        </div>

        <div className="relative z-10 px-6 py-8 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center mb-8"
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              🎂
            </motion.span>
            {" Cumpleaños "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block"
            >
              🎉
            </motion.span>
          </motion.h1>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8 text-center border border-white/20"
          >
            <p className="text-white/70 mb-4">Tiempo hasta tu próximo cumpleaños:</p>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Días", value: countdown.days },
                { label: "Horas", value: countdown.hours },
                { label: "Min", value: countdown.minutes },
                { label: "Seg", value: countdown.seconds },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white/5 rounded-xl p-3"
                >
                  <div className="text-3xl font-bold text-purple-300">
                    {item.value}
                  </div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <YearSelector year={year} onChange={setYear} theme="birthday" />

          <BirthdayGate unlockDate={data.unlockDate}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Mensaje principal */}
              <div className={`${cumpleTheme.card} rounded-3xl p-10 text-center border border-white/20`}>
                <h2 className="text-3xl font-bold mb-6 text-purple-300">
                  {data.title}
                </h2>
                <p className="text-white/80 leading-relaxed text-lg">
                  {data.message}
                </p>
              </div>

              {/* Botones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onViewLetter(year)}
                  className="flex items-center justify-center gap-3 bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-xl rounded-2xl p-6 transition border border-purple-500/30 group"
                >
                  <Mail className="w-6 h-6 text-purple-300 group-hover:scale-110 transition" />
                  <span className="text-lg font-semibold">Leer carta</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 bg-indigo-500/20 hover:bg-indigo-500/30 backdrop-blur-xl rounded-2xl p-6 transition border border-indigo-500/30 group"
                >
                  <Cake className="w-6 h-6 text-indigo-300 group-hover:scale-110 transition" />
                  <span className="text-lg font-semibold">Ver sorpresas</span>
                </motion.button>
              </div>
            </motion.div>
          </BirthdayGate>
        </div>
      </div>
    </PageTransition>
  );
}
