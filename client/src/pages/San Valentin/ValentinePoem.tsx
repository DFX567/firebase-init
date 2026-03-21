import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { sanValentinContent } from "@/data/events";
import { getContent, getContentKey } from "@/utils/contentOverrides";
import { ArrowLeft, FastForward, SkipForward, Heart, Sparkles, BookOpen } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";

interface ValentinePoemProps {
  year: number;
  onBack: () => void;
}

export default function ValentinePoem({ year, onBack }: ValentinePoemProps) {
  const content = getContent(
    getContentKey("sanvalentin", "poem", year),
    sanValentinContent.poem.text(year)
  );
  const { display, speedUp, skip, done } = useTypewriter(content, 60);

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
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 transition-all backdrop-blur-2xl border border-purple-300/30 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold text-purple-100 text-sm md:text-base">Volver</span>
        </motion.button>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="relative inline-flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-3xl md:text-4xl"
            >
              📜
            </motion.div>
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-purple-500/40 rounded-full blur-2xl"
              />
              <BookOpen className="relative w-12 h-12 md:w-16 md:h-16 text-purple-200" />
            </div>
            <motion.div
              animate={{ rotate: [5, -5, 5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="text-3xl md:text-4xl"
            >
              🌹
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-rose-100 to-pink-200 mb-3 drop-shadow-lg">
            {sanValentinContent.poem.title}
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-purple-200/70 text-sm md:text-base mt-2 italic"
          >
            Un poema para ti - San Valentin {year}
          </motion.p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-purple-300/50 to-transparent"
            />
            <motion.div 
              animate={{ rotate: [0, 180, 360] }} 
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-rose-300" />
            </motion.div>
            <motion.div
              animate={{ x: [5, -5, 5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-purple-300/50 to-transparent"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-8 perspective-1000"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-rose-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
          
          <div className="relative bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-8 md:p-12 border border-purple-300/25 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-10 rounded-2xl md:rounded-3xl" style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
            }} />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-gradient-to-br from-purple-500 to-rose-500 rounded-full p-3 md:p-4 border-2 border-purple-300/50 shadow-xl"
              >
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-white fill-white" />
              </motion.div>
            </div>

            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl opacity-5"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
              >
                {['✨', '💫', '🌟', '💕', '🌸', '🦋'][i]}
              </motion.div>
            ))}

            <div className="relative pt-6 md:pt-8">
              <pre className="whitespace-pre-wrap text-lg md:text-xl leading-loose md:leading-[2] font-serif italic text-center text-purple-50/95">
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

            <div className="flex items-center justify-center gap-3 mt-10 pt-6 border-t border-purple-300/15">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-purple-300/50" />
              </motion.div>
              <span className="text-xs text-purple-200/50 uppercase tracking-[0.2em]">Para mi amor eterno</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Sparkles className="w-4 h-4 text-rose-300/50" />
              </motion.div>
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
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 transition-all border border-purple-400/30 hover:border-purple-400/50 backdrop-blur-sm shadow-lg"
            >
              <FastForward className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Acelerar x2</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={skip}
              data-testid="button-skip"
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 transition-all border border-rose-400/30 hover:border-rose-400/50 backdrop-blur-sm shadow-lg"
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
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-purple-500/20 border border-purple-400/30"
            >
              <BookOpen className="w-4 h-4 text-purple-300" />
              <span className="text-purple-200/80 text-sm md:text-base italic">Poema completo</span>
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
