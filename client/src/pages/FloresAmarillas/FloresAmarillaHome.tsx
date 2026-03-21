import { motion } from "framer-motion";
import { ArrowLeft, Mail, Flower2 } from "lucide-react";
import SunflowerLandscape from "./SunflowerLandscape";

interface FloresAmarillaHomeProps {
  onBack: () => void;
  onViewLetter: () => void;
}

export default function FloresAmarillaHome({ onBack, onViewLetter }: FloresAmarillaHomeProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-sky-400">
      <div className="absolute inset-0">
        <SunflowerLandscape />
      </div>

      <div className="relative z-10 pt-4 md:pt-5 px-4 md:px-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          data-testid="button-back-flores"
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl transition-all shadow-lg backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.5)" }}
        >
          <ArrowLeft className="w-4 h-4 text-amber-900" />
          <span className="font-semibold text-amber-900 text-sm md:text-base">Volver</span>
        </motion.button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start pt-6 pb-48 md:pb-56 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block mb-3"
          >
            <Flower2 className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 drop-shadow-lg" />
          </motion.div>

          <motion.div
            className="rounded-3xl px-6 md:px-10 py-4 md:py-6 mb-4 shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(12px)",
              border: "2px solid rgba(255,255,255,0.5)",
            }}
          >
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-black mb-2 tracking-tight drop-shadow-sm"
              style={{ color: "#451a03" }}
            >
              Día de las Flores
            </h1>
            <h2
              className="text-2xl md:text-4xl font-black mb-3"
              style={{ color: "#92400e" }}
            >
              Amarillas 🌻
            </h2>
            <p className="text-sm md:text-lg font-semibold" style={{ color: "#78350f" }}>
              21 de Marzo · Para ti, mi girasol
            </p>
          </motion.div>

          <motion.div
            className="flex gap-2 justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {["🌻", "💛", "🌻", "💛", "🌻"].map((em, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="text-xl md:text-2xl"
              >
                {em}
              </motion.span>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={onViewLetter}
            data-testid="button-flores-letter"
            className="group flex items-center gap-3 mx-auto px-8 md:px-10 py-4 md:py-5 rounded-2xl text-white font-bold text-base md:text-xl shadow-2xl transition-all"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
              boxShadow: "0 8px 32px rgba(217,119,6,0.5)",
            }}
          >
            <Mail className="w-5 h-5 md:w-6 md:h-6" />
            <span>Abrir mi carta</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
