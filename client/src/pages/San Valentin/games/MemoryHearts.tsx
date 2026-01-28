import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Trophy, RotateCcw, Timer } from "lucide-react";

interface MemoryHeartsProps {
  onBack: () => void;
}

const symbols = ["💕", "💖", "💗", "💘", "💝", "💞"];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryHearts({ onBack }: MemoryHeartsProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900 to-red-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        data-testid="button-back-memory"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 backdrop-blur-sm border border-rose-300/30 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-rose-100 text-sm md:text-base">Volver</span>
      </motion.button>

      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Heart className="w-10 h-10 md:w-12 md:h-12 text-rose-300 mx-auto mb-3" />
          <h1 className="text-2xl md:text-4xl font-bold text-rose-100 mb-2">Memoria de Corazones</h1>
          <p className="text-rose-200/70 text-sm">Encuentra las parejas de corazones</p>
        </motion.div>

        <div className="flex justify-center gap-4 md:gap-6 mb-6 text-sm md:text-base">
          <div className="bg-rose-500/20 px-4 py-2 rounded-xl border border-rose-300/30">
            <span className="text-rose-200">Movimientos: </span>
            <span className="text-rose-100 font-bold">{moves}</span>
          </div>
          <div className="bg-rose-500/20 px-4 py-2 rounded-xl border border-rose-300/30 flex items-center gap-2">
            <Timer className="w-4 h-4 text-rose-300" />
            <span className="text-rose-100 font-bold">{formatTime(timer)}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!gameWon ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-3 gap-3 md:gap-4"
            >
              {cards.map((card) => (
                <motion.button
                  key={card.id}
                  whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(card.id)}
                  data-testid={`card-${card.id}`}
                  className={`aspect-square rounded-2xl text-3xl md:text-4xl flex items-center justify-center transition-all duration-300 ${
                    card.isMatched
                      ? "bg-green-500/30 border-2 border-green-400"
                      : card.isFlipped
                      ? "bg-rose-400/30 border-2 border-rose-300"
                      : "bg-rose-500/20 border border-rose-300/30 hover:bg-rose-500/30"
                  }`}
                >
                  <motion.span
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: card.isFlipped || card.isMatched ? 0 : 180 }}
                    className="block"
                  >
                    {card.isFlipped || card.isMatched ? card.symbol : "❓"}
                  </motion.span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-rose-300/20 text-center"
            >
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-rose-50 mb-2">Ganaste!</h2>
              <p className="text-rose-200 mb-2">Tiempo: {formatTime(timer)}</p>
              <p className="text-rose-200 mb-6">Movimientos: {moves}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={initializeGame}
                data-testid="button-restart-memory"
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-semibold"
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
