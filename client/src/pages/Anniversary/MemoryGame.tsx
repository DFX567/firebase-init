import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Star, Trophy, RotateCcw } from "lucide-react";
import StarField from "@/components/StarField";
import Planet3D from "@/components/animations/Planet3D";

interface MemoryGameProps {
  onBack: () => void;
}

const emojis = ["💕", "💖", "💗", "💝", "💘", "💞", "💓", "💌"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame({ onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || cards[id].isMatched) return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;

      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatches(matches + 1);
          setFlippedCards([]);

          if (matches + 1 === emojis.length) {
            setIsWon(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-950/90 via-pink-900/85 to-purple-950/90">
        <StarField count={100} />
      </div>

      <Planet3D 
        size={350} 
        position={{ x: "90%", y: "20%" }}
        colors={["#fecdd3", "#fb7185", "#e11d48"]}
        rotationSpeed={100}
        type="moon"
      />

      {/* Corazones cayendo */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl pointer-events-none"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: -50,
            rotate: 0,
            opacity: 0.6
          }}
          animate={{
            y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 50,
            rotate: 360,
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          {['💕', '💖', '💗', '💝'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      {/* Estrellas brillantes */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-rose-300 rounded-full pointer-events-none"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            opacity: 0
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 2, 0]
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        />
      ))}

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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 mb-3">
            Juego de Memoria del Amor
          </h1>
          <p className="text-rose-100/70 text-base md:text-xl mb-6">
            Encuentra todas las parejas de corazones 💕
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-4 md:gap-8 mb-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl px-4 md:px-6 py-3 border border-rose-300/30">
              <div className="text-2xl md:text-3xl font-black text-rose-200">{moves}</div>
              <div className="text-xs text-rose-300/70 uppercase tracking-wider">Movimientos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl px-4 md:px-6 py-3 border border-rose-300/30">
              <div className="text-2xl md:text-3xl font-black text-rose-200">{matches}/{emojis.length}</div>
              <div className="text-xs text-rose-300/70 uppercase tracking-wider">Parejas</div>
            </div>
          </div>

          <button
            onClick={initializeGame}
            className="flex items-center gap-2 px-6 py-3 bg-rose-500/20 hover:bg-rose-500/30 rounded-xl border border-rose-400/30 transition-all mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar</span>
          </button>
        </motion.div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
              className={`aspect-square rounded-2xl border-2 transition-all ${
                card.isMatched 
                  ? 'bg-rose-500/30 border-rose-400/50' 
                  : 'bg-white/10 border-rose-300/30 hover:border-rose-300/50'
              } backdrop-blur-xl`}
            >
              <AnimatePresence mode="wait">
                {card.isFlipped || card.isMatched ? (
                  <motion.div
                    key="front"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 90 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl md:text-5xl"
                  >
                    {card.emoji}
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: 90 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl md:text-5xl"
                  >
                    ❤️
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Win Modal */}
      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-rose-300/30 text-center max-w-md"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-4"
              >
                🏆
              </motion.div>
              <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-200 to-pink-200 mb-4">
                ¡Ganaste!
              </h2>
              <p className="text-rose-100/80 mb-2">Completaste el juego en</p>
              <p className="text-5xl font-black text-rose-200 mb-6">{moves}</p>
              <p className="text-rose-100/80 mb-8">movimientos</p>
              <button
                onClick={initializeGame}
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl font-bold hover:from-rose-600 hover:to-pink-600 transition-all"
              >
                Jugar de nuevo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}