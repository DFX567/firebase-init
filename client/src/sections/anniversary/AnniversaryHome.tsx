import { useState } from "react";
import { motion } from "framer-motion";
import YearSelector from "./YearSelector";
import AnniversaryGate from "./AnniversaryGate";
import { anniversaryData } from "./data";
import StarField from "@/components/StarField";

export default function AnniversaryHome() {
  const [year, setYear] = useState(2025);
  const data = anniversaryData[year];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-black text-white relative overflow-hidden">
      <StarField count={50} />

      <div className="relative z-10 px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">
          Aniversario 💍
        </h1>

        <YearSelector year={year} onChange={setYear} />

        <AnniversaryGate unlockDate={data.unlockDate}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">{data.title}</h2>
            <p className="text-white/80 leading-relaxed text-lg">
              {data.text}
            </p>
          </motion.div>
        </AnniversaryGate>
      </div>
    </div>
  );
}