import { motion } from "framer-motion";
import { ArrowLeft, Heart, Sparkles, Construction } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";

interface AmorAmistadHomeProps {
  onBack: () => void;
}

export default function AmorAmistadHome({ onBack }: AmorAmistadHomeProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <SpaceBackground variant="friendship" />

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          data-testid="button-back"
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 transition-all backdrop-blur-2xl border border-cyan-300/30 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold text-cyan-100 text-sm md:text-base">Volver al Hub</span>
        </motion.button>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-cyan-500/30 rounded-full blur-3xl"
              />
              <Construction className="relative w-24 h-24 md:w-32 md:h-32 text-cyan-300" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-teal-100 to-cyan-200 mb-6"
          >
            Amor y Amistad
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-cyan-300/20 shadow-2xl"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-cyan-300 fill-cyan-300" />
              </motion.div>
              <Sparkles className="w-6 h-6 text-teal-300" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <Heart className="w-8 h-8 text-emerald-300 fill-emerald-300" />
              </motion.div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-cyan-100 mb-4">
              En desarrollo...
            </h2>
            
            <p className="text-lg md:text-xl text-cyan-200/80 mb-6">
              Espera porfavor
            </p>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl md:text-6xl"
            >
              🫶
            </motion.div>

            <p className="text-sm text-cyan-200/50 mt-6">
              Estamos preparando algo especial para ti
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex items-center justify-center gap-2"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
            <Sparkles className="w-4 h-4 text-cyan-300/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-cyan-300/30 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
