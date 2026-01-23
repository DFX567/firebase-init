import { useState } from "react";
import { motion } from "framer-motion";
import StarField from "@/components/StarField";
import YearSelector from "./YearSelector";
import BirthdayGate from "./BirthdayGate";
import { cumpleData } from "./data";
import { cumpleTheme } from "./CumpleTheme";

export default function CumpleHome() {
  const [year, setYear] = useState(2025);
  const data = cumpleData[year];

  return (
    <div
      className={`min-h-screen ${cumpleTheme.background} text-white relative overflow-hidden`}
    >
      <StarField count={50} />

      <div className="relative z-10 px-6 py-16 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-12"
        >
          Cumpleaños 🎂
        </motion.h1>

        <YearSelector year={year} onChange={setYear} />

        <BirthdayGate unlockDate={data.unlockDate}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${cumpleTheme.card} rounded-3xl p-10 text-center`}
          >
            <h2 className="text-3xl font-bold mb-6">
              {data.title}
            </h2>
            <p className="text-white/80 leading-relaxed text-lg">
              {data.message}
            </p>
          </motion.div>
        </BirthdayGate>
      </div>
    </div>
  );
}