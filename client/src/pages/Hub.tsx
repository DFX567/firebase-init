import { motion } from "framer-motion";
import { Heart, Cake, Calendar, LogOut } from "lucide-react";
import StarField from "@/components/StarField";
import type { User } from "firebase/auth";

interface HubProps {
  onSelect: (section: "anniversary" | "cumple" | "sanvalentin") => void;
  onLogout: () => void;
  user: User;
}

export default function Hub({ onSelect, onLogout, user }: HubProps) {
  const sections = [
    {
      id: "sanvalentin" as const,
      title: "San Valentín",
      icon: Heart,
      gradient: "from-rose-500 to-pink-600",
      emoji: "❤️",
      description: "Celebrando nuestro amor"
    },
    {
      id: "cumple" as const,
      title: "Cumpleaños",
      icon: Cake,
      gradient: "from-purple-500 to-indigo-600",
      emoji: "🎂",
      description: "Tu día especial"
    },
    {
      id: "anniversary" as const,
      title: "Aniversario",
      icon: Calendar,
      gradient: "from-pink-500 to-rose-600",
      emoji: "💍",
      description: "Nuestros momentos juntos"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white relative overflow-hidden">
      <StarField count={80} />

      {/* Header */}
      <div className="relative z-10 pt-8 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full border-2 border-white/20"
              />
            )}
            <div>
              <p className="text-sm text-white/60">Bienvenido/a</p>
              <p className="font-semibold">{user.displayName?.split(" ")[0]}</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition backdrop-blur-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Salir</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
            Nuestro Refugio
          </h1>
          <p className="text-xl text-white/70">
            Un lugar especial solo para nosotros 💫
          </p>
        </motion.div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                onClick={() => onSelect(section.id)}
                className="group relative overflow-hidden rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="text-5xl">{section.emoji}</div>
                  <Icon className="w-8 h-8 text-white/70 group-hover:text-white transition" />
                  <h3 className="text-2xl font-bold">{section.title}</h3>
                  <p className="text-sm text-white/60 group-hover:text-white/80 transition">
                    {section.description}
                  </p>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-white/50 text-center text-sm"
        >
          Hecho con amor 💜
        </motion.p>
      </div>
    </div>
  );
}
