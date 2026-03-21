import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useFirestoreContent } from "@/hooks/useFirestoreContent";
import { ArrowLeft, FastForward, SkipForward } from "lucide-react";

interface FloresLetterProps {
  onBack: () => void;
}

function SpinningSunflower({ size = 60, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ position: "absolute", width: size, height: size, ...style }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        style={{ animation: "spin-flower 8s linear infinite" }}
      >
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle) => (
          <ellipse
            key={angle}
            cx="30" cy="30" rx="7" ry="14"
            fill="#facc15" opacity="0.9"
            transform={`rotate(${angle}, 30, 30) translate(0, -16)`}
          />
        ))}
        <circle cx="30" cy="30" r="12" fill="#92400e" />
        <circle cx="30" cy="30" r="8" fill="#78350f" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <circle
            key={a}
            cx={30 + 5 * Math.cos((a * Math.PI) / 180)}
            cy={30 + 5 * Math.sin((a * Math.PI) / 180)}
            r="1.5" fill="#451a03" opacity="0.5"
          />
        ))}
      </svg>
    </div>
  );
}

export default function FloresLetter({ onBack }: FloresLetterProps) {
  const { content, loading } = useFirestoreContent({
    section: "flores",
    type: "letter",
  });
  const { display, speedUp, skip, done } = useTypewriter(loading ? "" : content);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fefce8 0%, #fef9c3 40%, #fef08a 100%)" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #fde047 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #fb923c 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl backdrop-blur-sm border transition-all shadow-lg"
          style={{ background: "rgba(251,191,36,0.15)", borderColor: "rgba(251,191,36,0.4)" }}
        >
          <ArrowLeft className="w-4 h-4 text-amber-800" />
          <span className="font-semibold text-amber-800 text-sm md:text-base">Volver</span>
        </motion.button>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight" style={{ color: "#92400e" }}>
            Día de las Flores Amarillas
          </h2>
          <p className="text-amber-700/70 text-base md:text-lg">21 de Marzo</p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-20 md:w-28" style={{ background: "linear-gradient(to right, transparent, rgba(251,191,36,0.6))" }} />
            <span className="text-2xl">🌻</span>
            <div className="h-px w-20 md:w-28" style={{ background: "linear-gradient(to left, transparent, rgba(251,191,36,0.6))" }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div
            className="absolute -inset-4 rounded-3xl blur-2xl opacity-40"
            style={{ background: "linear-gradient(135deg, #fde047, #fb923c)" }}
          />

          <div
            className="relative rounded-3xl p-8 md:p-12 border-2 shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,252,232,0.95) 100%)",
              borderColor: "rgba(251,191,36,0.5)",
            }}
          >
            <SpinningSunflower size={56} style={{ top: -10, left: -10 }} />
            <SpinningSunflower size={56} style={{ top: -10, right: -10 }} />
            <SpinningSunflower size={56} style={{ bottom: -10, left: -10 }} />
            <SpinningSunflower size={56} style={{ bottom: -10, right: -10 }} />

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(251,191,36,0.8) 28px, rgba(251,191,36,0.8) 29px)"
            }} />

            <div className="relative min-h-[80px]">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 rounded-full"
                    style={{ borderColor: "rgba(251,191,36,0.3)", borderTopColor: "#d97706" }}
                  />
                </div>
              ) : (
                <pre
                  className="whitespace-pre-wrap text-base md:text-lg leading-relaxed md:leading-loose font-sans"
                  style={{ color: "#451a03" }}
                >
                  {display}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    className="inline-block ml-0.5"
                    style={{ color: "#d97706" }}
                  >
                    |
                  </motion.span>
                </pre>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 pt-6" style={{ borderTop: "1px solid rgba(251,191,36,0.3)" }}>
              <span className="text-xl">🌻</span>
              <span className="text-xs uppercase tracking-widest" style={{ color: "#b45309" }}>Con todo mi amor</span>
              <span className="text-xl">🌻</span>
            </div>
          </div>
        </motion.div>

        {!loading && !done && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={speedUp}
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl border transition-all shadow-lg"
              style={{ background: "rgba(251,191,36,0.15)", borderColor: "rgba(251,191,36,0.4)", color: "#92400e" }}
            >
              <FastForward className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-semibold text-sm md:text-base">Acelerar x2</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={skip}
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 rounded-xl border transition-all shadow-lg"
              style={{ background: "rgba(251,191,36,0.25)", borderColor: "rgba(251,191,36,0.5)", color: "#92400e" }}
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
            className="text-center mt-6"
          >
            <p className="text-sm md:text-base" style={{ color: "#b45309" }}>🌻 Mensaje completo 🌻</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
