import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Cake, Calendar, LogOut, Sparkles, Users } from "lucide-react";
import StarField from "@/components/StarField";
import Planet3D from "@/components/animations/Planet3D";
import SecretMenu from "@/components/SecretMenu";
import type { User } from "firebase/auth";

interface HubProps {
  onSelect: (section: "anniversary" | "cumple" | "sanvalentin" | "amoramistad") => void;
  onLogout: () => void;
  user: User;
}

export default function Hub({ onSelect, onLogout, user }: HubProps) {
  const [secretMode, setSecretMode] = useState(false);

  const sections = [
    {
      id: "sanvalentin" as const,
      title: "San Valentin",
      icon: Heart,
      gradient: "from-rose-400 via-pink-400 to-rose-500",
      bgGlow: "bg-rose-500/20",
      emoji: "💕",
      description: "Celebrando nuestro amor",
      delay: 0.2
    },
    {
      id: "cumple" as const,
      title: "Cumple",
      icon: Cake,
      gradient: "from-violet-400 via-purple-400 to-indigo-500",
      bgGlow: "bg-purple-500/20",
      emoji: "🎂",
      description: "Tu dia especial - 19 Dic",
      delay: 0.3
    },
    {
      id: "anniversary" as const,
      title: "Aniversario",
      icon: Calendar,
      gradient: "from-pink-400 via-rose-400 to-pink-500",
      bgGlow: "bg-pink-500/20",
      emoji: "💍",
      description: "02 Nov 2024",
      delay: 0.4
    },
    {
      id: "amoramistad" as const,
      title: "Amor y Amistad",
      icon: Users,
      gradient: "from-orange-400 via-amber-400 to-yellow-500",
      bgGlow: "bg-orange-500/20",
      emoji: "🫶",
      description: "Nuestra amistad y amor",
      delay: 0.5
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/70 via-purple-950/50 to-black">
        <StarField count={150} />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.25, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.2, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-1/2 -right-1/4 w-[1000px] h-[1000px] bg-pink-600/15 rounded-full blur-[120px]" 
        />
        <div className="absolute top-1/3 left-1/2 w-[700px] h-[700px] bg-indigo-600/18 rounded-full blur-[110px]" />
      </div>

      <Planet3D 
        size={450} 
        position={{ x: "8%", y: "30%" }}
        colors={["#a78bfa", "#8b5cf6", "#6366f1"]}
        rotationSpeed={100}
        type="gas"
      />
      <Planet3D 
        size={300} 
        position={{ x: "92%", y: "75%" }}
        colors={["#ec4899", "#f472b6", "#fb923c"]}
        rotationSpeed={120}
        type="rocky"
      />

      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
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
                <p className="text-xs text-purple-300/70 font-medium tracking-wide uppercase">Bienvenido/a</p>
                <p className="font-bold text-base md:text-lg text-white">{user.displayName?.split(" ")[0]}</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              data-testid="button-logout"
              className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10 hover:border-white/20 shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Salir</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 md:px-6 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-14 relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl"
          />

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 md:gap-3 mb-4"
          >
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 tracking-tight drop-shadow-2xl">
              Nuestro Refugio
            </h1>
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-purple-200/70 font-light tracking-wide"
          >
            Un universo especial solo para nosotros
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl w-full">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: section.delay,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <motion.button
                  onClick={() => onSelect(section.id)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid={`button-section-${section.id}`}
                  className="group relative w-full overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/30 transition-all duration-500 shadow-2xl hover:shadow-pink-500/20"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className={`absolute -inset-1 ${section.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                  <div className="relative p-6 md:p-8 flex flex-col items-center gap-3 md:gap-4">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-4xl md:text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                      {section.emoji}
                    </motion.div>

                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg`}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </motion.div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-base md:text-lg font-bold mb-1 group-hover:text-white transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-purple-300/40 text-sm flex items-center justify-center gap-2">
            Hecho con
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💜
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
