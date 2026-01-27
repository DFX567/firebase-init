import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, RotateCcw } from "lucide-react";
import FloatingHearts from "@/components/animations/FloatingHearts";
import Planet3D from "@/components/animations/Planet3D";

interface CupidGameProps {
  onBack: () => void;
}

interface Target {
  id: number;
  x: number;
  y: number;
  hit: boolean;
}

export default function CupidGame({ onBack }: CupidGameProps) {
  const [score, setScore] = useState(0);
  const [arrows, setArrows] = useState(10);
  const [targets, setTargets] = useState<Target[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  const startGame = () => {
    setScore(0);
    setArrows(10);
    setTargets([]);
    setGameOver(false);
    setLevel(1);
    spawnTargets(1);
  };

  const spawnTargets = (currentLevel: number) => {
    const count = Math.min(3 + currentLevel, 8);
    const newTargets: Target[] = [];

    for (let i = 0; i < count; i++) {
      newTargets.push({
        id: Date.now() + i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10,
        hit: false,
      });
    }

    setTargets(newTargets);
  };

  const shootArrow = (targetId: number) => {
    if (arrows <= 0 || gameOver) return;

    setArrows(arrows - 1);
    setTargets((prev) =>
      prev.map((t) => (t.id === targetId ? { ...t, hit: true } : t))
    );
    setScore((s) => s + level * 10);

    const allHit = targets.filter((t) => !t.hit).length === 1;

    if (allHit) {
      setTimeout(() => {
        setLevel((l) => l + 1);
        setArrows((a) => a + 3);
        spawnTargets(level + 1);
      }, 500);
    }
  };

  useEffect(() => {
    if (arrows === 0 && targets.some((t) => !t.hit)) {
      setGameOver(true);
    }
  }, [arrows, targets]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/90 via-rose-900/85 to-pink-950/90">
        <FloatingHearts count={25} />
      </div>

      <Planet3D 
        size={380} 
        position={{ x: "88%", y: "30%" }}
        colors={["#fda4af", "#fb7185", "#f43f5e"]}
        rotationSpeed={95}
        type="rocky"
      />

      {/* Pétalos cayendo */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-30 pointer-events-none"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: -100
          }}
          animate={{
            y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
            rotate: 360,
            x: `+=${Math.random() * 100 - 50}`
          }}
          transition={{
            duration: Math.random() * 12 + 18,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        >
          🌹
        </motion.div>
      ))}

      {/* Estrellas brillantes */}
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
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

      {/* Corazones parpadeantes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-2xl opacity-10 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          💕
        </motion.div>
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

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">🏹</div>
          <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-pink-100 to-red-200 mb-3">
            Flechas de Cupido
          </h1>
          <p className="text-rose-100/70 text-base md:text-xl mb-6">
            ¡Dispara a todos los corazones! 💘
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-4 md:gap-8 mb-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl px-6 py-3 border border-rose-300/30">
              <div className="text-3xl font-black text-rose-200">{score}</div>
              <div className="text-xs text-rose-300/70 uppercase tracking-wider">Puntos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl px-6 py-3 border border-rose-300/30">
              <div className="text-3xl font-black text-rose-200">{arrows}</div>
              <div className="text-xs text-rose-300/70 uppercase tracking-wider">Flechas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl px-6 py-3 border border-rose-300/30">
              <div className="text-3xl font-black text-rose-200">{level}</div>
              <div className="text-xs text-rose-300/70 uppercase tracking-wider">Nivel</div>
            </div>
          </div>

          {targets.length === 0 && !gameOver && (
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl font-bold text-lg hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg"
            >
              Iniciar Juego
            </button>
          )}

          {gameOver && (
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl font-bold text-lg hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Jugar de nuevo
            </button>
          )}
        </motion.div>

        {/* Game Area */}
        {targets.length > 0 && !gameOver && (
          <div className="relative h-[500px] bg-white/5 backdrop-blur-xl rounded-3xl border border-rose-300/30 overflow-hidden">
            <AnimatePresence>
              {targets.map((target) => (
                !target.hit && (
                  <motion.button
                    key={target.id}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => shootArrow(target.id)}
                    className="absolute text-6xl"
                    style={{
                      left: `${target.x}%`,
                      top: `${target.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                    >
                      💖
                    </motion.div>
                  </motion.button>
                )
              ))}
            </AnimatePresence>

            {/* Hit effects */}
            {targets.map((target) => (
              target.hit && (
                <motion.div
                  key={`hit-${target.id}`}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  className="absolute text-4xl pointer-events-none"
                  style={{
                    left: `${target.x}%`,
                    top: `${target.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  💝
                </motion.div>
              )
            ))}
          </div>
        )}

        {gameOver && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-rose-300/30 text-center"
          >
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-200 to-pink-200 mb-4">
              ¡Juego Terminado!
            </h2>
            <p className="text-rose-100/80 mb-2">Llegaste al nivel {level}</p>
            <p className="text-rose-100/80 mb-2">Puntuación final:</p>
            <p className="text-6xl font-black text-rose-200 mb-4">{score}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}