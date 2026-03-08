import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { diaDelaMujerContent } from "@/data/events";
import { ArrowLeft, FastForward, SkipForward, Heart, Sparkles } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";

interface DiaDelaMujerPoemProps {
  year: number;
  onBack: () => void;
}

export default function DiaDelaMujerPoem({ year, onBack }: DiaDelaMujerPoemProps) {
  const content = diaDelaMujerContent.poem.text(year);
  const { display, speedUp, skip, done } = useTypewriter(content);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <SpaceBackground variant="default" />

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          data-testid="button-back"
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 transition-all backdrop-blur-2xl border border-purple-300/30 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold text-purple-100 text-sm md:text-base">Volver</span>
        </motion.button>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="relative inline-flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl md:text-5xl"
            >
              📖
            </motion.div>
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-purple-500/40 rounded-full blur-2xl"
              />
              <Heart className="relative w-14 h-14 md:w-18 md:h-18 text-purple-300 fill-purple-400" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-4xl md:text-5xl"
            >
              ✨
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-100 to-purple-200 mb-3 drop-shadow-lg">
            {diaDelaMujerContent.poem.title}
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-purple-200/70 text-sm md:text-base mt-2"
          >
            Día de la Mujer {year}
          </motion.p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-5 h-5 text-purple-300" />
            </motion.div>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-purple-300/50 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/25 via-pink-500/25 to-purple-500/25 rounded-3xl blur-2xl animate-pulse" />
          
          <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-purple-300/30 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-5 rounded-2xl md:rounded-3xl" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
            }} />
            
            <div className="relative prose prose-invert max-w-none">
              <p className="text-purple-50 leading-relaxed whitespace-pre-wrap font-light md:text-lg text-base text-center italic">
                {display}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1 inline-block w-2 h-6 bg-purple-400"
                />
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-3 justify-center flex-wrap"
        >
          {!done && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={speedUp}
                data-testid="button-speedup"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-all backdrop-blur-sm border border-purple-300/30"
              >
                <FastForward className="w-4 h-4" />
                <span className="text-purple-100 text-sm">Rapido</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={skip}
                data-testid="button-skip"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-all backdrop-blur-sm border border-purple-300/30"
              >
                <SkipForward className="w-4 h-4" />
                <span className="text-purple-100 text-sm">Saltar</span>
              </motion.button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
