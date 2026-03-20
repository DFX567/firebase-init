import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Cake, Calendar, LogOut, Sparkles, Users, Gamepad2, Star, Flower2 } from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";
import SecretMenu from "@/components/SecretMenu";
import type { User } from "firebase/auth";

interface HubProps {
  onSelect: (section: "anniversary" | "cumple" | "sanvalentin" | "amoramistad" | "floresamarillas" | "games" | "memories") => void;
  onLogout: () => void;
  user: User;
}

export default function Hub({ onSelect, onLogout, user }: HubProps) {
  const [secretMode, setSecretMode] = useState(false);

  const mainSections = [
    {
      id: "sanvalentin" as const,
      title: "San Valentín",
      icon: Heart,
      gradient: "from-rose-500 via-pink-500 to-rose-600",
      bgCard: "from-rose-500/10 to-pink-500/10",
      border: "border-rose-300/20",
      hoverBorder: "hover:border-rose-300/50",
      glow: "bg-rose-500/20",
      emoji: "💕",
      description: "14 de Febrero",
      delay: 0.2,
    },
    {
      id: "cumple" as const,
      title: "Cumpleaños",
      icon: Cake,
      gradient: "from-violet-500 via-purple-500 to-indigo-600",
      bgCard: "from-violet-500/10 to-indigo-500/10",
      border: "border-violet-300/20",
      hoverBorder: "hover:border-violet-300/50",
      glow: "bg-violet-500/20",
      emoji: "🎂",
      description: "19 de Diciembre",
      delay: 0.3,
    },
    {
      id: "anniversary" as const,
      title: "Aniversario",
      icon: Calendar,
      gradient: "from-pink-500 via-rose-500 to-pink-600",
      bgCard: "from-pink-500/10 to-rose-500/10",
      border: "border-pink-300/20",
      hoverBorder: "hover:border-pink-300/50",
      glow: "bg-pink-500/20",
      emoji: "💍",
      description: "2 de Noviembre",
      delay: 0.4,
    },
    {
      id: "amoramistad" as const,
      title: "Amor y Amistad",
      icon: Users,
      gradient: "from-amber-500 via-orange-500 to-yellow-500",
      bgCard: "from-amber-500/10 to-orange-500/10",
      border: "border-amber-300/20",
      hoverBorder: "hover:border-amber-300/50",
      glow: "bg-amber-500/20",
      emoji: "🫶",
      description: "20 de Septiembre",
      delay: 0.5,
    },
    {
      id: "floresamarillas" as const,
      title: "Flores Amarillas",
      icon: Flower2,
      gradient: "from-yellow-400 via-amber-400 to-yellow-500",
      bgCard: "from-yellow-400/10 to-amber-400/10",
      border: "border-yellow-300/20",
      hoverBorder: "hover:border-yellow-300/50",
      glow: "bg-yellow-400/20",
      emoji: "🌻",
      description: "21 de Marzo",
      delay: 0.6,
    },
  ];

  const extraHubs = [
    {
      id: "games" as const,
      title: "Sala de Juegos",
      emoji: "🎮",
      description: "5 juegos especiales",
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      bgCard: "from-cyan-500/10 to-blue-500/10",
      border: "border-cyan-300/20",
      hoverBorder: "hover:border-cyan-300/50",
      glow: "bg-cyan-500/20",
      icon: Gamepad2,
      delay: 0.75,
    },
    {
      id: "memories" as const,
      title: "Nuestros Recuerdos",
      emoji: "💫",
      description: "Cápsula · Poemas · Fotos",
      gradient: "from-teal-500 via-emerald-500 to-green-600",
      bgCard: "from-teal-500/10 to-emerald-500/10",
      border: "border-teal-300/20",
      hoverBorder: "hover:border-teal-300/50",
      glow: "bg-teal-500/20",
      icon: Star,
      delay: 0.85,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <SpaceBackground variant="default" />

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center bg-white/5 backdrop-blur-2xl rounded-2xl p-3 md:p-4 border border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-3 md:gap-4">
              {user.photoURL && (
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-purple-400/50 shadow-lg shadow-purple-500/30"
                />
              )}
              <div>
                <p className="text-xs text-white/40 font-medium tracking-wider uppercase">Bienvenida</p>
                <p className="font-bold text-base md:text-lg text-white leading-tight">{user.displayName?.split(" ")[0]}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              data-testid="button-logout"
              className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-lg"
            >
              <LogOut className="w-4 h-4 text-white/60" />
              <span className="text-sm font-medium text-white/60 hidden sm:inline">Salir</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="relative inline-block mb-5">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative text-5xl md:text-7xl"
            >
              ❤️
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 tracking-tight mb-3">
            Nuestro Refugio
          </h1>
          <p className="text-base md:text-xl text-white/40 font-light tracking-wide">
            Un universo especial solo para nosotros
          </p>

          <div className="flex items-center justify-center gap-3 mt-5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                className="w-1.5 h-1.5 rounded-full bg-white/40"
              />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-5">
          {mainSections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: section.delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(section.id)}
                data-testid={`button-section-${section.id}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${section.bgCard} backdrop-blur-xl border ${section.border} ${section.hoverBorder} transition-all duration-500 shadow-xl`}
              >
                <div className={`absolute -inset-2 ${section.glow} rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10`} />

                <div className="relative p-5 md:p-7 flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 4, -4, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-3xl md:text-4xl"
                  >
                    {section.emoji}
                  </motion.div>

                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    className={`p-2 md:p-2.5 rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg`}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </motion.div>

                  <div className="text-center">
                    <h3 className="text-sm md:text-base font-bold text-white mb-0.5 group-hover:text-white transition-colors leading-tight">
                      {section.title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-white/40 group-hover:text-white/60 transition-colors">
                      {section.description}
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
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {extraHubs.map((hub) => {
            const Icon = hub.icon;
            return (
              <motion.button
                key={hub.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: hub.delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(hub.id)}
                data-testid={`button-section-${hub.id}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${hub.bgCard} backdrop-blur-xl border ${hub.border} ${hub.hoverBorder} transition-all duration-500 shadow-xl`}
              >
                <div className={`absolute -inset-2 ${hub.glow} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10`} />

                <div className="relative flex items-center gap-4 p-5 md:p-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: hub.delay }}
                    className="text-4xl md:text-5xl flex-shrink-0"
                  >
                    {hub.emoji}
                  </motion.div>

                  <div className="flex-1 text-left">
                    <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">
                      {hub.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/40 group-hover:text-white/60 transition-colors">
                      {hub.description}
                    </p>
                  </div>

                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-2.5 rounded-xl bg-gradient-to-br ${hub.gradient} shadow-lg flex-shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
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
          transition={{ delay: 0.9 }}
          className="mt-10 md:mt-14 text-center"
        >
          <p className="text-white/20 text-sm flex items-center justify-center gap-2">
            Hecho con
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            para nosotros
          </p>
        </motion.div>
      </div>

      <SecretMenu onUnlock={() => setSecretMode(true)} />

      {secretMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-20 right-6 bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl z-50"
        >
          <p className="text-white text-sm font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Modo secreto activado
          </p>
        </motion.div>
      )}
    </div>
  );
}
