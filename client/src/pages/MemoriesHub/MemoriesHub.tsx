import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BookOpen, Camera, Sparkles } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";
import TimeCapsule from "@/pages/Cumple/games/TimeCapsule";
import PoemOfTheDay from "./PoemOfTheDay";
import PhotoGallery from "./PhotoGallery";

interface MemoriesHubProps {
  onBack: () => void;
}

type MemoryView = 'home' | 'capsule' | 'poem' | 'gallery';

const features = [
  {
    id: 'capsule' as const,
    title: 'Cápsula del Tiempo',
    emoji: '⏳',
    description: 'Guarda mensajes para el futuro',
    gradient: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-300/30',
    glow: 'bg-violet-500/20',
    icon: Clock,
  },
  {
    id: 'poem' as const,
    title: 'Poema del Día',
    emoji: '📖',
    description: 'Un poema especial cada día',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    border: 'border-indigo-300/30',
    glow: 'bg-indigo-500/20',
    icon: BookOpen,
  },
  {
    id: 'gallery' as const,
    title: 'Galería de Fotos',
    emoji: '📸',
    description: 'Nuestros momentos juntos',
    gradient: 'from-rose-500/20 to-pink-500/20',
    border: 'border-rose-300/30',
    glow: 'bg-rose-500/20',
    icon: Camera,
  },
];

export default function MemoriesHub({ onBack }: MemoriesHubProps) {
  const [view, setView] = useState<MemoryView>('home');

  if (view === 'capsule') return <TimeCapsule onBack={() => setView('home')} />;
  if (view === 'poem') return <PoemOfTheDay onBack={() => setView('home')} />;
  if (view === 'gallery') return <PhotoGallery onBack={() => setView('home')} />;

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <SpaceBackground variant="anniversary" />

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            data-testid="button-back-memories"
            className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all backdrop-blur-2xl border border-white/10 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold text-white/80 text-sm md:text-base">Volver</span>
          </motion.button>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block text-5xl md:text-6xl mb-5"
          >
            💫
          </motion.div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-purple-200 to-indigo-200 mb-3 tracking-tight">
            Nuestros Recuerdos
          </h1>
          <p className="text-white/50 text-base md:text-lg">Un espacio íntimo para guardar lo que somos</p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mt-6"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 8, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setView(feature.id)}
                data-testid={`button-memory-${feature.id}`}
                className={`group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r ${feature.gradient} backdrop-blur-xl border ${feature.border} hover:border-white/30 transition-all duration-400 shadow-xl text-left`}
              >
                <div className={`absolute -inset-1 ${feature.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10`} />

                <div className="flex items-center gap-5 p-5 md:p-7">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    className="text-4xl md:text-5xl flex-shrink-0"
                  >
                    {feature.emoji}
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                      {feature.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all">
                      <Icon className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-2 mt-10 text-white/20 text-sm"
        >
          <Sparkles className="w-3 h-3" />
          <span>Solo para nosotros</span>
          <Sparkles className="w-3 h-3" />
        </motion.div>
      </div>
    </div>
  );
}
