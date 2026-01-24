import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Mail, BookOpen } from "lucide-react";
import FloatingHearts from "@/components/animations/FloatingHearts";
import YearSelector from "@/components/YearSelector";
import ValentineGate from "./ValentineGate";
import { sanValentinData } from "@/data/events";
import { sanValentinTheme } from "@/lib/themes";
import { useCountdown } from "@/utils/countdown";
import PageTransition from "@/components/animations/PageTransition";

interface SanValentinHomeProps {
  onBack: () => void;
  onViewLetter: (year: number) => void;
  onViewPoem: (year: number) => void;
}

export default function SanValentinHome({ 
  onBack, 
  onViewLetter,
  onViewPoem 
}: SanValentinHomeProps) {
  const [year, setYear] = useState(2025);
  const data = sanValentinData[year];
  const countdown = useCountdown(2, 14);

  return (
    <PageTransition pageKey="sanvalentin-home" variant="scale">
      <div className={`min-h-screen ${sanValentinTheme.background} text-white relative overflow-hidden`}>
        <FloatingHearts count={25} />

        {/* Pulsing hearts in corners */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-10 left-10 text-6xl"
        >
          💕
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute top-10 right-10 text-6xl"
        >
          💖
        </motion.div>

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

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center mb-8"
          >
            San Valentín{" "}
            <motion.span
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block"
            >
              ❤️
            </motion.span>
          </motion.h1>

          {/* Resto del código igual... */}
        </div>
      </div>
    </PageTransition>
  );
}