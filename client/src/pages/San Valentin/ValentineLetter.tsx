import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { sanValentinContent } from "@/data/events";
import { ArrowLeft, FastForward, SkipForward, Heart, Sparkles } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";

interface ValentineLetterProps {
  year: number;
  onBack: () => void;
}

export default function ValentineLetter({ year, onBack }: ValentineLetterProps) {
  const content = sanValentinContent.letter.text(year);
  const { display, speedUp, skip, done } = useTypewriter(content);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <SpaceBackground variant="valentine" />

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          data-testid="button-back"
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-all backdrop-blur-2xl border border-rose-300/30 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold text-rose-100 text-sm md:text-base">Volver</span>
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
              💌
            </motion.div>
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-rose-500/40 rounded-full blur-2xl"
              />
              <Heart className="relative w-14 h-14 md:w-18 md:h-18 text-rose-300 fill-rose-400" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-4xl md:text-5xl"
            >
              💝
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 mb-3 drop-shadow-lg">
            {sanValentinContent.letter.title}
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-rose-200/70 text-sm md:text-base mt-2"
          >
            San Valentin {year}
          </motion.p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-5 h-5 text-rose-300" />
            </motion.div>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-rose-300/50 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/25 via-pink-500/25 to-red-500/25 rounded-3xl blur-2xl animate-pulse" />
          
          <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-rose-300/30 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-5 rounded-2xl md:rounded-3xl" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
            }} />

            <div className="absolute top-4 left-4 text-4xl md:text-5xl opacity-10">
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                💕
              </motion.span>
            </div>
            <div className="absolute bottom-4 right-4 text-4xl md:text-5xl opacity-10">
              <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
                💗
              </motion.span>
            </div>

            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-gradient-to-br from-rose-500 to-pink-600 backdrop-blur-sm rounded-full p-3 md:p-4 border-2 border-rose-300/50 shadow-lg">
              <motion.div
                animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl md:text-2xl"
              >
                💌
              </motion.div>
            </div>

            <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-gradient-to-br from-pink-500 to-rose-600 backdrop-blur-sm rounded-full p-2 md:p-3 border-2 border-pink-300/50 shadow-lg">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5 text-white fill-white" />
              </motion.div>
            </div>

            <div className="relative pt-4">
              <pre className="whitespace-pre-wrap text-base md:text-lg leading-relaxed md:leading-loose font-sans text-rose-50/95">
                {display}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block ml-1 text-rose-300"
                >
                  |
                </motion.span>
              </pre>
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-rose-300/20">
              <Heart className="w-3 h-3 text-rose-300/60 fill-rose-300/60" />
              <span className="text-xs text-rose-200/60 uppercase tracking-widest">Con todo mi amor</span>
              <Heart className="w-3 h-3 text-rose-300/60 fill-rose-300/60" />
            </div>
          </div>
        </motion.div>

        {!done && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={speedUp}
              data-testid="button-speedup"
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 transition-all border border-rose-400/30 hover:border-rose-400/50 backdrop-blur-sm shadow-lg"
            >
              <FastForward className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Acelerar x2</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={skip}
              data-testid="button-skip"
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 transition-all border border-pink-400/30 hover:border-pink-400/50 backdrop-blur-sm shadow-lg"
            >
              <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Mostrar todo</span>
            </motion.button>
          </motion.div>
        )}

        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500/20 border border-rose-400/30"
            >
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
              <span className="text-rose-200/80 text-sm md:text-base">Carta completa</span>
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
