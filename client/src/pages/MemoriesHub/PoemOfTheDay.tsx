import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { defaultPoems } from "@/utils/contentOverrides";
import { useFirestoreContent } from "@/hooks/useFirestoreContent";
import { useTypewriter } from "@/hooks/useTypewriter";
import { FastForward, SkipForward } from "lucide-react";

interface PoemOfTheDayProps {
  onBack: () => void;
}

export default function PoemOfTheDay({ onBack }: PoemOfTheDayProps) {
  const today = new Date().getDay();
  const defaultPoem = defaultPoems[today];

  const { content, loading } = useFirestoreContent({
    section: "memories",
    type: "poem",
    day: today,
  });

  const { display, speedUp, skip, done } = useTypewriter(loading ? "" : content, 60);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/90 via-fuchsia-900/85 to-pink-950/90" />

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }} whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 transition-all backdrop-blur-2xl border border-violet-300/30 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 text-violet-200" />
          <span className="font-semibold text-violet-100 text-sm">Volver</span>
        </motion.button>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl mb-4">📝</motion.div>
          <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-fuchsia-200 to-pink-200 mb-2">
            {defaultPoem?.title ?? "Poema del Día"}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />
            <Sparkles className="w-4 h-4 text-violet-300" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-violet-300/50 to-transparent" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="relative mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
          <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl p-6 md:p-10 border border-violet-300/30 shadow-2xl">
            <div className="relative min-h-[80px]">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-8 h-8 border-2 border-violet-300/30 border-t-violet-300 rounded-full" />
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-base md:text-lg leading-relaxed font-sans text-violet-50/95 text-center">
                  {display}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block ml-1 text-violet-300">|</motion.span>
                </pre>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-violet-300/20">
              <BookOpen className="w-3 h-3 text-violet-300/50" />
              <span className="text-xs text-violet-200/50 uppercase tracking-widest">Con todo mi amor</span>
              <BookOpen className="w-3 h-3 text-violet-300/50" />
            </div>
          </div>
        </motion.div>

        {!loading && !done && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} onClick={speedUp} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-500/15 hover:bg-violet-500/25 transition-all border border-violet-400/30 backdrop-blur-sm">
              <FastForward className="w-4 h-4" />
              <span className="font-semibold text-sm">Acelerar x2</span>
            </motion.button>
            <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} onClick={skip} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-fuchsia-500/15 hover:bg-fuchsia-500/25 transition-all border border-fuchsia-400/30 backdrop-blur-sm">
              <SkipForward className="w-4 h-4" />
              <span className="font-semibold text-sm">Mostrar todo</span>
            </motion.button>
          </motion.div>
        )}

        {!loading && done && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mt-8">
            <p className="text-violet-200/70 text-sm">✨ Poema completo ✨</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
