import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, RotateCcw, Star } from "lucide-react";

interface WishWheelProps {
  onBack: () => void;
}

const wishes = [
  { text: "Mucho amor", color: "from-pink-500 to-rose-500" },
  { text: "Salud infinita", color: "from-green-500 to-emerald-500" },
  { text: "Alegria siempre", color: "from-yellow-500 to-amber-500" },
  { text: "Exito total", color: "from-blue-500 to-indigo-500" },
  { text: "Paz interior", color: "from-purple-500 to-violet-500" },
  { text: "Suerte maxima", color: "from-orange-500 to-red-500" },
  { text: "Felicidad eterna", color: "from-cyan-500 to-teal-500" },
  { text: "Abundancia", color: "from-fuchsia-500 to-pink-500" },
];

export default function WishWheel({ onBack }: WishWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedWish, setSelectedWish] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    
    const spins = 5 + Math.random() * 5;
    const extraDegrees = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + extraDegrees;
    
    setRotation(totalRotation);
    
    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentAngle = 360 / wishes.length;
      const index = Math.floor((360 - normalizedRotation + segmentAngle / 2) % 360 / segmentAngle);
      setSelectedWish(wishes[index].text);
      setIsSpinning(false);
      setShowResult(true);
    }, 5000);
  };

  const reset = () => {
    setShowResult(false);
    setSelectedWish(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        data-testid="button-back-wheel"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-sm border border-purple-300/30 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-purple-100 text-sm md:text-base">Volver</span>
      </motion.button>

      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-purple-300 mx-auto mb-3" />
          <h1 className="text-2xl md:text-4xl font-bold text-purple-100 mb-2">Rueda de Deseos</h1>
          <p className="text-purple-200/70 text-sm">Gira la rueda y descubre tu deseo</p>
        </motion.div>

        <div className="relative mb-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg" />
          </div>

          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 5, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full border-4 border-purple-300/30 shadow-2xl overflow-hidden"
          >
            {wishes.map((wish, i) => {
              const angle = (360 / wishes.length) * i;
              return (
                <div
                  key={i}
                  className={`absolute w-1/2 h-1/2 origin-bottom-right bg-gradient-to-br ${wish.color}`}
                  style={{
                    transform: `rotate(${angle}deg) skewY(${90 - 360 / wishes.length}deg)`,
                    transformOrigin: '0% 100%',
                    left: '50%',
                    top: '0%',
                  }}
                >
                  <span
                    className="absolute text-[8px] md:text-[10px] font-bold text-white whitespace-nowrap"
                    style={{
                      transform: `skewY(${-(90 - 360 / wishes.length)}deg) rotate(${360 / wishes.length / 2}deg)`,
                      transformOrigin: 'left center',
                      left: '20%',
                      top: '40%',
                    }}
                  >
                    {wish.text}
                  </span>
                </div>
              );
            })}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-900 rounded-full border-4 border-purple-300 flex items-center justify-center shadow-xl">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {showResult ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-purple-300/20 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-5xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-purple-100 mb-2">Tu deseo es:</h2>
              <p className="text-2xl md:text-3xl font-black text-yellow-400 mb-6">{selectedWish}</p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={reset}
                  data-testid="button-spin-again"
                  className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-semibold"
                >
                  <RotateCcw className="w-5 h-5" />
                  Girar de nuevo
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: isSpinning ? 1 : 1.05 }}
                whileTap={{ scale: isSpinning ? 1 : 0.95 }}
                onClick={spinWheel}
                disabled={isSpinning}
                data-testid="button-spin-wheel"
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
                  isSpinning
                    ? "bg-purple-500/50 text-purple-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-xl"
                }`}
              >
                {isSpinning ? "Girando..." : "Girar Rueda"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
