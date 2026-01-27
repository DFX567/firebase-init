import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { anniversaryContent } from "@/data/events";
import { ArrowLeft, FastForward, SkipForward, Heart, Sparkles } from "lucide-react";
import StarField from "@/components/StarField";
import Planet3D from "@/components/animations/Planet3D";

interface LoveLetterProps {
  year: number;
  onBack: () => void;
}

export default function LoveLetter({ year, onBack }: LoveLetterProps) {
  const content = anniversaryContent.letter.text(year);
  const { display, speedUp, skip, done } = useTypewriter(content);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Fondo romántico */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-950/90 via-pink-900/85 to-purple-950/90">
        <StarField count={80} />
      </div>

      {/* Planeta decorativo */}
      <Planet3D 
        size={350} 
        position={{ x: "90%", y: "20%" }}
        colors={["#fecdd3", "#fb7185", "#e11d48"]}
        rotationSpeed={100}
        type="moon"
      />

      {/* Corazones flotantes sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300/10 text-4xl"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 50
            }}
            animate={{
              y: -50,
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              delay: Math.random() * 10
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-all backdrop-blur-2xl border border-rose-300/30 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold text-rose-100 text-sm md:text-base">Volver</span>
        </motion.button>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Título con efecto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="relative inline-block mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-rose-500/30 rounded-full blur-2xl"
            />
            <Heart className="relative w-12 h-12 md:w-16 md:h-16 text-rose-300 fill-rose-300" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 mb-3">
            {anniversaryContent.letter.title}
          </h2>
          
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
            <Sparkles className="w-5 h-5 text-rose-300" />
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-rose-300/50 to-transparent" />
          </div>
        </motion.div>

        {/* Carta con efecto papel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mb-8"
        >
          {/* Glow exterior */}
          <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-rose-500/20 rounded-3xl blur-2xl" />
          
          {/* Papel de carta */}
          <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-10 border border-rose-300/30 shadow-2xl">
            {/* Textura de papel */}
            <div className="absolute inset-0 opacity-5 rounded-2xl md:rounded-3xl" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
            }} />

            {/* Sello de amor */}
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-rose-500/80 backdrop-blur-sm rounded-full p-3 md:p-4 border-2 border-rose-300/50 shadow-lg">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💌
              </motion.div>
            </div>

            {/* Contenido de la carta */}
            <div className="relative">
              <pre className="whitespace-pre-wrap text-base md:text-lg leading-relaxed md:leading-loose font-sans text-rose-50/95">
                {display}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block ml-1"
                >
                  |
                </motion.span>
              </pre>
            </div>

            {/* Decoración inferior */}
            <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-rose-300/20">
              <Heart className="w-3 h-3 text-rose-300/50 fill-rose-300/50" />
              <span className="text-xs text-rose-200/50 uppercase tracking-widest">Con todo mi amor</span>
              <Heart className="w-3 h-3 text-rose-300/50 fill-rose-300/50" />
            </div>
          </div>
        </motion.div>

        {/* Controles */}
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
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 transition-all border border-rose-400/30 hover:border-rose-400/50 backdrop-blur-sm shadow-lg"
            >
              <FastForward className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Acelerar x2</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={skip}
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
            <p className="text-rose-200/70 text-sm md:text-base">
              ✨ Mensaje completo ✨
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}