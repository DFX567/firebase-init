import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gift, Trophy, RotateCcw, Timer, Star } from "lucide-react";

interface GiftCatcherProps {
  onBack: () => void;
}

interface FallingGift {
  id: number;
  x: number;
  type: 'gift' | 'star' | 'cake';
  points: number;
  caught: boolean;
}

const GAME_DURATION = 30;

export default function GiftCatcher({ onBack }: GiftCatcherProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gifts, setGifts] = useState<FallingGift[]>([]);
  const [catcherX, setCatcherX] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const catcherRef = useRef(50);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
    setGameOver(false);
    setGifts([]);
    setCatcherX(50);
    catcherRef.current = 50;
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = setInterval(() => {
      const types = ['gift', 'star', 'cake'] as const;
      const type = types[Math.floor(Math.random() * types.length)];
      const points = type === 'cake' ? 30 : type === 'star' ? 20 : 10;
      
      const newGift: FallingGift = {
        id: Date.now() + Math.random(),
        x: Math.random() * 70 + 15,
        type,
        points,
        caught: false
      };

      setGifts(prev => [...prev, newGift]);

      setTimeout(() => {
        setGifts(prev => {
          const gift = prev.find(g => g.id === newGift.id);
          if (gift && !gift.caught) {
            const catcherPos = catcherRef.current;
            if (Math.abs(gift.x - catcherPos) < 18) {
              setScore(s => s + gift.points);
              return prev.map(g => g.id === newGift.id ? { ...g, caught: true } : g);
            }
          }
          return prev;
        });
      }, 3500);

      setTimeout(() => {
        setGifts(prev => prev.filter(g => g.id !== newGift.id));
      }, 4000);

    }, 1200);

    return () => clearInterval(spawnInterval);
  }, [isPlaying]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const newX = Math.max(10, Math.min(90, x));
    setCatcherX(newX);
    catcherRef.current = newX;
  };

  const getEmoji = (type: string) => {
    switch (type) {
      case 'cake': return '🎂';
      case 'star': return '⭐';
      default: return '🎁';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        data-testid="button-back-catcher"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-sm border border-purple-300/30 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-purple-100 text-sm md:text-base">Volver</span>
      </motion.button>

      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <Gift className="w-10 h-10 md:w-12 md:h-12 text-purple-300 mx-auto mb-2" />
          <h1 className="text-2xl md:text-3xl font-bold text-purple-100 mb-1">Atrapa Regalos</h1>
          <p className="text-purple-200/70 text-sm">Mueve la canasta para atrapar regalos</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isPlaying && !gameOver ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-300/20 text-center"
            >
              <div className="text-6xl mb-6">🎁</div>
              <h2 className="text-xl font-bold text-purple-100 mb-4">Cómo jugar</h2>
              <p className="text-purple-200/80 mb-6 text-sm">
                Mueve la canasta con el mouse o dedo para atrapar los regalos que caen. 
                Cada regalo vale puntos diferentes!
              </p>
              <div className="flex justify-center gap-4 mb-6 text-sm">
                <span>🎁 10pts</span>
                <span>⭐ 20pts</span>
                <span>🎂 30pts</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                data-testid="button-start-catcher"
                className="px-8 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-semibold"
              >
                Comenzar
              </motion.button>
            </motion.div>
          ) : gameOver ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-300/20 text-center"
            >
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-purple-50 mb-2">Tiempo!</h2>
              <p className="text-4xl md:text-5xl font-black text-purple-300 mb-2">{score}</p>
              <p className="text-purple-200 mb-6">puntos</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                data-testid="button-restart-catcher"
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-semibold"
              >
                <RotateCcw className="w-5 h-5" />
                Jugar de nuevo
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-300/30 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-purple-100 font-bold">{score}</span>
                </div>
                <div className="bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-300/30 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-100 font-bold">{timeLeft}s</span>
                </div>
              </div>

              <div 
                ref={containerRef}
                className="relative h-[400px] md:h-[500px] bg-purple-900/30 rounded-3xl border border-purple-300/20 overflow-hidden select-none"
                onMouseMove={(e) => handleMove(e.clientX)}
                onTouchMove={(e) => {
                  e.preventDefault();
                  handleMove(e.touches[0].clientX);
                }}
                style={{ touchAction: 'none' }}
              >
                {gifts.map(gift => !gift.caught && (
                  <div
                    key={gift.id}
                    className="absolute text-3xl md:text-4xl pointer-events-none"
                    style={{ 
                      left: `${gift.x}%`, 
                      transform: 'translateX(-50%)',
                      animation: 'giftFall 4s linear forwards'
                    }}
                  >
                    {getEmoji(gift.type)}
                  </div>
                ))}

                <div
                  className="absolute bottom-4 text-4xl md:text-5xl pointer-events-none"
                  style={{ left: `${catcherX}%`, transform: 'translateX(-50%)' }}
                >
                  🧺
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes giftFall {
          0% { top: -50px; opacity: 1; }
          90% { opacity: 1; }
          100% { top: calc(100% - 60px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
