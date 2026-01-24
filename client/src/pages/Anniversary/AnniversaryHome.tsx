import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Mail } from "lucide-react";
import YearSelector from "@/components/YearSelector";
import AnniversaryGate from "./AnniversaryGate";
import { anniversaryData } from "@/data/events";
import StarField from "@/components/StarField";
import { useCountdown } from "@/utils/countdown";

interface AnniversaryHomeProps {
  onBack: () => void;
  onViewLetter: (year: number) => void;
}

export default function AnniversaryHome({ onBack, onViewLetter }: AnniversaryHomeProps) {
  const [year, setYear] = useState(2025);
  const data = anniversaryData[year];

  // Countdown para el próximo aniversario (10 de junio)
  const countdown = useCountdown(6, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-black text-white relative overflow-hidden">
      <StarField count={50} />

      {/* Header */}
      <div className="relative z-10 pt-8 px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Hub</span>
        </button>
      </div>

      <div className="relative z-10 px-6 py-8 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-8"
        >
          Aniversario 💍
        </motion.h1>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8 text-center border border-white/20"
        >
          <p className="text-white/70 mb-4">Tiempo hasta el próximo aniversario:</p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Días", value: countdown.days },
              { label: "Horas", value: countdown.hours },
              { label: "Min", value: countdown.minutes },
              { label: "Seg", value: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 rounded-xl p-3">
                <div className="text-3xl font-bold text-pink-300">
                  {item.value}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <YearSelector year={year} onChange={setYear} theme="anniversary" />

        <AnniversaryGate unlockDate={data.unlockDate}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Mensaje principal */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 text-center border border-white/20">
              <h2 className="text-3xl font-bold mb-6 text-pink-300">
                {data.title}
              </h2>
              <p className="text-white/80 leading-relaxed text-lg">
                {data.text}
              </p>
            </div>

            {/* Botones de acciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => onViewLetter(year)}
                className="flex items-center justify-center gap-3 bg-pink-500/20 hover:bg-pink-500/30 backdrop-blur-xl rounded-2xl p-6 transition border border-pink-500/30 group"
              >
                <Mail className="w-6 h-6 text-pink-300 group-hover:scale-110 transition" />
                <span className="text-lg font-semibold">Leer carta de amor</span>
              </button>

              <button
                className="flex items-center justify-center gap-3 bg-rose-500/20 hover:bg-rose-500/30 backdrop-blur-xl rounded-2xl p-6 transition border border-rose-500/30 group"
              >
                <Heart className="w-6 h-6 text-rose-300 group-hover:scale-110 transition" />
                <span className="text-lg font-semibold">Ver galería de fotos</span>
              </button>
            </div>
          </motion.div>
        </AnniversaryGate>
      </div>
    </div>
  );
}