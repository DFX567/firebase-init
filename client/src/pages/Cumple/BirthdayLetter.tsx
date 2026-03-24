import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cumpleContent } from "@/data/events";
import { useFirestoreContent } from "@/hooks/useFirestoreContent";
import { ArrowLeft, FastForward, SkipForward, Cake, Sparkles, PartyPopper } from "lucide-react";
import ConfettiRain from "@/components/animations/ConfettiRain";
import Planet3D from "@/components/animations/Planet3D";

interface BirthdayLetterProps {
  year: number;
  onBack: () => void;
}

export default function BirthdayLetter({ year, onBack }: BirthdayLetterProps) {
  const { content, loading } = useFirestoreContent({
    section: "cumple",
    type: "letter",
    year,
  });
  const { display, speedUp, skip, done } = useTypewriter(loading ? "" : content);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-purple-900/85 to-violet-950/90">
        <ConfettiRain count={60} />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl" />
      </div>

      <Planet3D
        size={380}
        position={{ x: "10%", y: "25%" }}
        colors={["#c084fc", "#a78bfa", "#8b5cf6"]}
        rotationSpeed={90}
        type="gas"
      />

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-5xl pointer-events-none"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: (typeof window !== "undefined" ? window.innerHeight : 1000) + 100,
          }}
          animate={{ y: -150, rotate: [0, 360] }}
          transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, delay: Math.random() * 5 }}
        >
          🎈
        </motion.div>
      ))}

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
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
          <div className="relative inline-flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Cake className="w-12 h-12 md:w-16 md:h-16 text-purple-300" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-5xl md:text-6xl"
            >
              🎉
            </motion.div>
            <PartyPopper className="w-12 h-12 md:w-16 md:h-16 text-violet-300" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-violet-100 to-purple-200 mb-3">
            {cumpleContent.letter.title}
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
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />

          <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-purple-300/30 shadow-2xl overflow-hidden">
            <div className="absolute top-4 right-4 text-4xl md:text-5xl opacity-10">🎊</div>
            <div className="absolute bottom-4 left-4 text-4xl md:text-5xl opacity-10">🎁</div>

            <div className="absolute -top-3 -left-3 md:-top-5 md:-left-5 bg-purple-500/80 backdrop-blur-sm rounded-full p-2 md:p-3 border-2 border-purple-300/50 shadow-lg">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl md:text-3xl"
              >
                👑
              </motion.div>
            </div>

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
                <pre className="whitespace-pre-wrap text-base md:text-lg leading-relaxed md:leading-loose font-sans text-purple-50/95">
                  {display}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block ml-1"
                  >
                    |
                  </motion.span>
                </pre>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-purple-300/20">
              <Sparkles className="w-3 h-3 text-purple-300/50" />
              <span className="text-xs text-purple-200/50 uppercase tracking-widest">¡Feliz cumpleaños!</span>
              <Sparkles className="w-3 h-3 text-purple-300/50" />
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
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 transition-all border border-purple-400/30 hover:border-purple-400/50 backdrop-blur-sm shadow-lg"
            >
              <FastForward className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Acelerar x2</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={skip}
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-violet-500/15 hover:bg-violet-500/25 transition-all border border-violet-400/30 hover:border-violet-400/50 backdrop-blur-sm shadow-lg"
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
            <p className="text-purple-200/70 text-sm md:text-base">🎊 Mensaje completo 🎊</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}