import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, RotateCcw, Gift, Heart, Star, PartyPopper } from "lucide-react";

interface WishWheelProps {
  onBack: () => void;
}

const wishes = [
  { text: "Mucho amor", icon: Heart, color: "from-pink-500 to-rose-500" },
  { text: "Salud infinita", icon: Sparkles, color: "from-green-500 to-emerald-500" },
  { text: "Alegría siempre", icon: PartyPopper, color: "from-yellow-500 to-amber-500" },
  { text: "Éxito total", icon: Star, color: "from-blue-500 to-indigo-500" },
  { text: "Paz interior", icon: Heart, color: "from-purple-500 to-violet-500" },
  { text: "Suerte máxima", icon: Gift, color: "from-orange-500 to-red-500" },
  { text: "Felicidad eterna", icon: Sparkles, color: "from-cyan-500 to-teal-500" },
  { text: "Abundancia", icon: Star, color: "from-fuchsia-500 to-pink-500" },
  { text: "Amor verdadero", icon: Heart, color: "from-rose-500 to-pink-500" },
  { text: "Sueños cumplidos", icon: Sparkles, color: "from-indigo-500 to-purple-500" },
  { text: "Momentos mágicos", icon: PartyPopper, color: "from-amber-500 to-orange-500" },
  { text: "Risas infinitas", icon: Gift, color: "from-teal-500 to-cyan-500" },
];

export default function WishWheel({ onBack }: WishWheelProps) {
  const [currentWish, setCurrentWish] = useState<number | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedWishes, setRevealedWishes] = useState<number[]>([]);

  const revealWish = () => {
    if (isRevealing) return;
    
    setIsRevealing(true);
    setCurrentWish(null);
    
    const availableWishes = wishes
      .map((_, i) => i)
      .filter(i => !revealedWishes.includes(i));
    
    if (availableWishes.length === 0) {
      setRevealedWishes([]);
      const randomIndex = Math.floor(Math.random() * wishes.length);
      setTimeout(() => {
        setCurrentWish(randomIndex);
        setRevealedWishes([randomIndex]);
        setIsRevealing(false);
      }, 1500);
      return;
    }
    
    const randomIndex = availableWishes[Math.floor(Math.random() * availableWishes.length)];
    
    setTimeout(() => {
      setCurrentWish(randomIndex);
      setRevealedWishes(prev => [...prev, randomIndex]);
      setIsRevealing(false);
    }, 1500);
  };

  const reset = () => {
    setCurrentWish(null);
    setRevealedWishes([]);
  };

  const wish = currentWish !== null ? wishes[currentWish] : null;
  const Icon = wish?.icon || Sparkles;

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
          className="text-center mb-8"
        >
          <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-purple-300 mx-auto mb-3" />
          <h1 className="text-2xl md:text-4xl font-bold text-purple-100 mb-2">Caja de Deseos</h1>
          <p className="text-purple-200/70 text-sm">Toca la caja mágica para descubrir tu deseo</p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: isRevealing ? 1 : 1.05 }}
            whileTap={{ scale: isRevealing ? 1 : 0.95 }}
            onClick={revealWish}
            disabled={isRevealing}
            data-testid="button-reveal-wish"
            className="relative"
          >
            <motion.div
              animate={isRevealing ? { 
                rotateY: [0, 360, 720],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-40 h-40 md:w-52 md:h-52 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl border-4 border-purple-300/30 cursor-pointer"
            >
              <Gift className="w-20 h-20 md:w-28 md:h-28 text-white" />
            </motion.div>
            
            {!isRevealing && currentWish === null && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-2"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            )}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {wish && !isRevealing && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-purple-300/20 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${wish.color} mb-4`}
              >
                <Icon className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-purple-100 mb-2">Tu deseo es:</h2>
                <p className="text-2xl md:text-3xl font-black text-yellow-400">{wish.text}</p>
              </motion.div>
              
              <p className="text-purple-200/60 text-sm mt-4">
                Deseos revelados: {revealedWishes.length} de {wishes.length}
              </p>
            </motion.div>
          )}
          
          {isRevealing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-12 h-12 text-yellow-400 mx-auto" />
              </motion.div>
              <p className="text-purple-200 mt-4">Descubriendo tu deseo...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={revealWish}
            disabled={isRevealing}
            data-testid="button-another-wish"
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              isRevealing
                ? "bg-purple-500/30 text-purple-300 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            }`}
          >
            {currentWish === null ? "Revelar Deseo" : "Otro Deseo"}
          </motion.button>
          
          {revealedWishes.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              data-testid="button-reset-wishes"
              className="flex items-center gap-2 px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl border border-purple-300/30 text-purple-100 font-semibold"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
