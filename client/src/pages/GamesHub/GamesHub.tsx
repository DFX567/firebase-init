import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gamepad2, Heart, Gift, Star, Layers, Trophy } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";
import LoveQuiz from "@/pages/San Valentin/games/LoveQuiz";
import MemoryHearts from "@/pages/San Valentin/games/MemoryHearts";
import GiftCatcher from "@/pages/Cumple/games/GiftCatcher";
import LoveCards from "@/pages/Anniversary/games/LoveCards";
import MemoryTimeline from "@/pages/Anniversary/games/MemoryTimeline";

interface GamesHubProps {
  onBack: () => void;
}

type GameView = 'home' | 'quiz' | 'memoryhearts' | 'giftcatcher' | 'lovecards' | 'timeline';

const games = [
  {
    id: 'quiz' as const,
    title: 'Quiz de Amor',
    emoji: '💝',
    description: '¿Cuánto nos conocemos?',
    gradient: 'from-rose-500/20 to-pink-500/20',
    border: 'border-rose-300/30',
    glow: 'bg-rose-500/20',
  },
  {
    id: 'memoryhearts' as const,
    title: 'Memoria Corazones',
    emoji: '❤️',
    description: 'Encuentra los pares',
    gradient: 'from-pink-500/20 to-red-500/20',
    border: 'border-pink-300/30',
    glow: 'bg-pink-500/20',
  },
  {
    id: 'giftcatcher' as const,
    title: 'Atrapa Regalos',
    emoji: '🎁',
    description: 'Atrapa todos los regalos',
    gradient: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-300/30',
    glow: 'bg-violet-500/20',
  },
  {
    id: 'lovecards' as const,
    title: 'Cartas de Amor',
    emoji: '💌',
    description: 'Frases especiales para ti',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    border: 'border-purple-300/30',
    glow: 'bg-purple-500/20',
  },
  {
    id: 'timeline' as const,
    title: 'Línea del Tiempo',
    emoji: '📅',
    description: 'Nuestra historia juntos',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    border: 'border-indigo-300/30',
    glow: 'bg-indigo-500/20',
  },
];

export default function GamesHub({ onBack }: GamesHubProps) {
  const [view, setView] = useState<GameView>('home');

  if (view === 'quiz') return <LoveQuiz onBack={() => setView('home')} />;
  if (view === 'memoryhearts') return <MemoryHearts onBack={() => setView('home')} />;
  if (view === 'giftcatcher') return <GiftCatcher onBack={() => setView('home')} />;
  if (view === 'lovecards') return <LoveCards onBack={() => setView('home')} />;
  if (view === 'timeline') return <MemoryTimeline onBack={() => setView('home')} />;

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <SpaceBackground variant="default" />

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            data-testid="button-back-games"
            className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all backdrop-blur-2xl border border-white/10 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold text-white/80 text-sm md:text-base">Volver</span>
          </motion.button>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-flex p-4 md:p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mb-5"
          >
            <Gamepad2 className="w-10 h-10 md:w-14 md:h-14 text-purple-300" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 mb-3 tracking-tight">
            Sala de Juegos
          </h1>
          <p className="text-white/50 text-base md:text-lg">5 juegos especiales para nosotros</p>

          <div className="flex items-center justify-center gap-6 mt-6">
            {[Trophy, Star, Heart].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              >
                <Icon className="w-5 h-5 text-white/20" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {games.map((game, index) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView(game.id)}
              data-testid={`button-game-${game.id}`}
              className={`group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br ${game.gradient} backdrop-blur-xl border ${game.border} hover:border-white/30 transition-all duration-400 shadow-xl text-left`}
            >
              <div className={`absolute -inset-1 ${game.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10`} />

              <div className="p-6 md:p-7 flex flex-col items-center gap-4">
                <motion.span
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                  className="text-4xl md:text-5xl"
                >
                  {game.emoji}
                </motion.span>
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                    {game.description}
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
