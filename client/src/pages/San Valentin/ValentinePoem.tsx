import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { sanValentinContent } from "@/data/events";
import { useFirestoreContent } from "@/hooks/useFirestoreContent";
import { ArrowLeft, FastForward, SkipForward, Heart, Sparkles, BookOpen } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";

interface ValentinePoemProps {
  year: number;
  onBack: () => void;
}

export default function ValentinePoem({ year, onBack }: ValentinePoemProps) {
  const { content, loading } = useFirestoreContent({
    section: "sanvalentin",
    type: "poem",
    year,
  });
  const { display, speedUp, skip, done } = useTypewriter(loading ? "" : content, 60);

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
          <div className="relative inline-block mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-purple-500/30 rounded-full blur-2xl"
            />
            <BookOpen className="relative w-12 h-12 md:w-16 md:h-16 text-purple-300" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-100 to-purple-200 mb-3">
            {sanValentinContent.poem.title}
          </h2>

          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
            <Sparkles className="w-5 h-5 text-purple-300" />
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-purple-300/50 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-2xl" />

          <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-purple-300/30 shadow-2xl">
            <div className="relative min-h-[80px]">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-purple-300/30 border-t-purple-300 rounded-full"
                  />
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-base md:text-lg leading-relaxed md:leading-loose font-sans text-purple-50/95 text-center">
                  {display}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block ml-1 text-purple-300"
                  >|</motion.span>
                </pre>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-purple-300/20">
              <Heart className="w-3 h-3 text-purple-300/50 fill-purple-300/50" />
              <span className="text-xs text-purple-200/50 uppercase tracking-widest">Con todo mi amor</span>
              <Heart className="w-3 h-3 text-purple-300/50 fill-purple-300/50" />
            </div>
          </div>
        </motion.div>

        {!loading && !done && (
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
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 transition-all border border-purple-400/30 backdrop-blur-sm shadow-lg"
            >
              <FastForward className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Acelerar x2</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={skip}
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 transition-all border border-pink-400/30 backdrop-blur-sm shadow-lg"
            >
              <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Mostrar todo</span>
            </motion.button>
          </motion.div>
        )}

        {!loading && done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-8"
          >
            <p className="text-purple-200/70 text-sm md:text-base">✨ Poema completo ✨</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
