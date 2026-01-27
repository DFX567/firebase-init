import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, RotateCcw, Star } from "lucide-react";
import ConfettiRain from "@/components/animations/ConfettiRain";
import Planet3D from "@/components/animations/Planet3D";

interface CatchGameProps {
  onBack: () => void;
}

interface FallingItem {
  id: number;
  x: number;
  y: number;
  type: 'gift' | 'cake' | 'balloon' | 'bomb';
  emoji: string;
  speed: number;
}

export default function CatchGame({ onBack }: CatchGameProps) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [basketX, setBasketX] = useState(50);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameRef = useRef<NodeJS.Timeout | null>(null);

  const itemTypes = [
    { type: 'gift' as const, emoji: '🎁', points: 10, weight: 40 },
    { type: 'cake' as const, emoji: '🎂', points: 15, weight: 30 },
    { type: 'balloon' as const, emoji: '🎈', points: 5, weight: 20 },
    { type: 'bomb' as const, emoji: '💣', points: -10, weight: 10 },
  ];

  const startGame = () => {
    setScore(0);
    setLives(3);
    setItems([]);
    setGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;

    gameRef.current = setInterval(() => {
      const random = Math.random() * 100;
      let cumulative = 0;
      let selectedType = itemTypes[0];

      for (const type of itemTypes) {
        cumulative += type.weight;
        if (random <= cumulative) {
          selectedType = type;
          break;
        }
      }

      const newItem: FallingItem = {
        id: Date.now(),
        x: Math.random() * 90 + 5,
        y: -10,
        type: selectedType.type,
        emoji: selectedType.emoji,
        speed: Math.random() * 2 + 3,
      };

      setItems((prev) => [...prev, newItem]);
    }, 1000);

    return () => {
      if (gameRef.current) clearInterval(gameRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setItems((prev) => {
        const updated = prev
          .map((item) => ({ ...item, y: item.y + item.speed }))
          .filter((item) => {
            if (item.y > 85 && item.y < 95) {
              const caught = Math.abs(item.x - basketX) < 8;
              if (caught) {
                if (item.type === 'bomb') {
                  setLives((l) => l - 1);
                } else {
                  setScore((s) => s + (itemTypes.find(t => t.type === item.type)?.points || 0));
                }
                return false;
              }
            }
            return item.y < 100;
          });

        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, basketX]);

  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [lives]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isPlaying) return;
      const x = (e.clientX / window.innerWidth) * 100;
      setBasketX(Math.max(10, Math.min(90, x)));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPlaying) return;
      const touch = e.touches[0];
      const x = (touch.clientX / window.innerWidth) * 100;
      setBasketX(Math.max(10, Math.min(90, x)));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isPlaying]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-purple-900/85 to-violet-950/90">
        <ConfettiRain count={60} />
      </div>

      <Planet3D 
        size={380} 
        position={{ x: "10%", y: "75%" }}
        colors={["#c084fc", "#a78bfa", "#8b5cf6"]}
        rotationSpeed={90}
        type="gas"
      />

      {/* Estrellas brillantes */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-300 rounded-full pointer-events-none"
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

      {/* Globos de fondo */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`balloon-${i}`}
          className="absolute text-4xl opacity-20 pointer-events-none"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100
          }}
          animate={{
            y: -100,
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            delay: Math.random() * 10
          }}
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-violet-100 to-purple-200 mb-3">
            ¡Atrapa los Regalos!
          </h1>
          <p className="text-purple-100/70 text-base md:text-xl mb-6">
            Mueve tu mouse o dedo para atrapar 🎁🎂🎈 ¡Evita las bombas! 💣
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-4 md:gap-8 mb-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl px-6 py-3 border border-purple-300/30">
              <div className="text-3xl font-black text-purple-200">{score}</div>
              <div className="text-xs text-purple-300/70 uppercase tracking-wider">Puntos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl px-6 py-3 border border-purple-300/30">
              <div className="text-3xl font-black text-purple-200 flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className={i < lives ? 'opacity-100' : 'opacity-20'}>
                    ❤️
                  </span>
                ))}
              </div>
              <div className="text-xs text-purple-300/70 uppercase tracking-wider">Vidas</div>
            </div>
          </div>

          {!isPlaying && !gameOver && (
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-violet-600 transition-all shadow-lg"
            >
              Iniciar Juego
            </button>
          )}

          {gameOver && (
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-violet-600 transition-all shadow-lg mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Jugar de nuevo
            </button>
          )}
        </motion.div>

        {/* Game Area */}
        {isPlaying && (
          <div className="relative h-[500px] bg-white/5 backdrop-blur-xl rounded-3xl border border-purple-300/30 overflow-hidden">
            {/* Falling Items */}
            {items.map((item) => (
              <motion.div
                key={item.id}
                className="absolute text-5xl pointer-events-none"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                }}
              >
                {item.emoji}
              </motion.div>
            ))}

            {/* Basket */}
            <div
              className="absolute bottom-4 text-6xl transition-all duration-100 ease-linear"
              style={{
                left: `${basketX}%`,
                transform: 'translateX(-50%)',
              }}
            >
              🧺
            </div>
          </div>
        )}

        {gameOver && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-purple-300/30 text-center"
          >
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-violet-200 mb-4">
              ¡Juego Terminado!
            </h2>
            <p className="text-purple-100/80 mb-2">Puntuación final:</p>
            <p className="text-6xl font-black text-purple-200 mb-4">{score}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}