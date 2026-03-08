import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy, RotateCcw, Timer } from "lucide-react";

interface WomenCelebrationMemoryProps {
  onBack: () => void;
}

const symbols = ["💜", "👩", "⭐", "💪", "🌸", "✨"];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function WomenCelebrationMemory({ onBack }: WomenCelebrationMemoryProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const initializeGame = () => {
    const shuffledSymbols = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledSymbols);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
    setTimer(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !gameWon) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameWon]);

  useEffect(() => {
    if (matches === symbols.length) {
      setGameWon(true);
      setIsPlaying(false);
    }
  }, [matches]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 1) {
      setMoves(m => m + 1);
      const firstCard = cards[flippedCards[0]];
      const secondCard = newCards[id];

      if (firstCard.symbol === secondCard.symbol) {
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[flippedCards[0]].isMatched = true;
          matchedCards[id].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatches(m => m + 1);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[flippedCards[0]].isFlipped = false;
          resetCards[id].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-900 to-purple-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        data-testid="button-back-memory"
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
          <div className="text-5xl mb-4">👩</div>
          <h1 className="text-3xl md:text-4xl font-bold text-purple-100 mb-2">Memoria del Día de la Mujer</h1>
          <p className="text-purple-200/70">Encuentra todas las parejas 💜</p>
        </motion.div>

        <AnimatePresence>
          {!gameWon ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-300/20 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-purple-300" />
                    <span className="text-purple-100 font-semibold">{formatTime(timer)}</span>
                  </div>
                  <span className="text-purple-100 font-semibold">Movimientos: {moves}</span>
                  <span className="text-purple-100 font-semibold">Parejas: {matches}/{symbols.length}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {cards.map((card) => (
                  <motion.button
                    key={card.id}
                    whileHover={!card.isFlipped && !card.isMatched ? { scale: 1.05 } : {}}
                    whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
                    onClick={() => handleCardClick(card.id)}
                    disabled={card.isFlipped || card.isMatched}
                    className={`aspect-square rounded-xl font-bold text-2xl md:text-3xl transition-all cursor-pointer flex items-center justify-center ${
                      card.isMatched
                        ? "bg-green-500/30 border border-green-400"
                        : card.isFlipped
                        ? "bg-purple-600/50 border border-purple-400"
                        : "bg-purple-500/20 border border-purple-300/50 hover:border-purple-300/80"
                    }`}
                  >
                    <motion.div
                      animate={{ rotateY: card.isFlipped || card.isMatched ? 0 : 90 }}
                      transition={{ duration: 0.6 }}
                    >
                      {card.isFlipped || card.isMatched ? card.symbol : "?"}
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="mb-6"
              >
                <Trophy className="w-20 h-20 text-yellow-400 mx-auto" />
              </motion.div>
              <h2 className="text-4xl font-bold text-purple-100 mb-4">
                ¡Ganaste!
              </h2>
              <div className="bg-white/10 rounded-2xl p-6 border border-purple-300/20 mb-6">
                <p className="text-purple-200 mb-2">Tiempo: <span className="font-bold text-purple-100">{formatTime(timer)}</span></p>
                <p className="text-purple-200">Movimientos: <span className="font-bold text-purple-100">{moves}</span></p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setGameWon(false);
                  initializeGame();
                }}
                data-testid="button-retry"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500/30 hover:bg-purple-500/40 border border-purple-300/50 text-purple-100 font-semibold mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Jugar de nuevo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
