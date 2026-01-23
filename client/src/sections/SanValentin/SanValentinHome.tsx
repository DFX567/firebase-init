import { useState } from "react";
import { motion } from "framer-motion";
import HeartAnimation from "@/HeartAnimation";
import YearSelector from "./YearSelector";
import ValentineGate from "./ValentineGate";
import { sanValentinData } from "./data";
import { sanValentinTheme } from "./theme";

export default function SanValentinHome() {
  const [year, setYear] = useState(2025);
  const data = sanValentinData[year];

  return (
    <div
      className={`min-h-screen ${sanValentinTheme.background} text-white relative overflow-hidden`}
    >
      <HeartAnimation />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-12"
        >
          San Valentín ❤️
        </motion.h1>

        <YearSelector year={year} onChange={setYear} />

        <ValentineGate unlockDate={data.unlockDate}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${sanValentinTheme.card} rounded-3xl p-10 text-center`}
          >
            <h2 className="text-3xl font-bold mb-6 text-rose-300">
              {data.title}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              {data.message}
            </p>
          </motion.div>
        </ValentineGate>
      </div>
    </div>
  );
}