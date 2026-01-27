import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Mail, Image, Sparkles, Calendar, Lock, Star, Flame } from "lucide-react";
import YearSelector from "@/components/YearSelector";
import AnniversaryGate from "./AnniversaryGate";
import { anniversaryData } from "@/data/events";
import StarField from "@/components/StarField";
import Planet3D from "@/components/animations/Planet3D";

interface AnniversaryHomeProps {
  onBack: () => void;
  onViewLetter: (year: number) => void;
  onViewGallery: (year: number) => void;
  onViewGame: () => void;
}

function useYearCountdown(month: number, day: number, year: number) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      let targetYear = year;
      if (year < currentYear) {
        const target = new Date(year, month - 1, day);
        const diff = now.getTime() - target.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        setCountdown({ days, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const target = new Date(targetYear, month - 1, day);
      if (now > target) targetYear++;

      const finalTarget = new Date(targetYear, month - 1, day);
      const diff = finalTarget.getTime() - now.getTime();

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [month, day, year]);

  return countdown;
}

export default function AnniversaryHome({ onBack, onViewLetter, onViewGallery, onViewGame }: AnniversaryHomeProps) {
  const [year, setYear] = useState(2024);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const data = anniversaryData[year];
  const countdown = useYearCountdown(11, 2, year);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Fondo espacial romántico */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-950/90 via-pink-950/80 to-purple-950/90">
        <StarField count={150} />
      </div>

      {/* Planetas flotantes */}
      <Planet3D 
        size={500} 
        position={{ x: "85%", y: "25%" }}
        colors={["#fecdd3", "#fb7185", "#e11d48"]}
        rotationSpeed={90}
        type="moon"
      />

      {/* Partículas brillantes interactivas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-rose-300 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Corazones flotantes sutiles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-300/10 text-6xl md:text-8xl"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
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
          💕
        </motion.div>
      ))}

      {/* Header */}
      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 transition-all backdrop-blur-2xl border border-rose-300/30 shadow-lg text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold text-rose-100">Volver</span>
        </motion.button>
      </div>

      <div className="relative z-10 px-4 md:px-6 py-6 md:py-12 max-w-7xl mx-auto">

        {/* Hero interactivo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
        >
          <div className="relative inline-block mb-6 md:mb-8">
            {/* Anillos pulsantes */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-rose-500/30 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 bg-pink-500/30 rounded-full blur-3xl"
            />

            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative p-6 md:p-8 bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-red-500/20 rounded-3xl md:rounded-[2rem] backdrop-blur-xl border border-rose-300/30 shadow-2xl"
            >
              <Calendar className="w-12 h-12 md:w-20 md:h-20 text-rose-200" />
            </motion.div>
          </div>

          <motion.h1 
            className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 mb-3 md:mb-6 tracking-tight leading-none px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Nuestro Aniversario
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-2xl text-rose-100/70 max-w-3xl mx-auto leading-relaxed font-light px-4"
          >
            Cada momento contigo es eterno, cada día a tu lado es un regalo 💍
          </motion.p>
        </motion.div>

        {/* Countdown interactivo mejorado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 md:mb-12"
        >
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 md:-inset-12 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-rose-500/20 rounded-full blur-3xl"
            />

            <div className="relative bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-2xl rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-rose-300/30 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-6 md:mb-10">
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-300 fill-rose-300 animate-pulse" />
                <h3 className="text-lg md:text-2xl font-bold text-rose-100 text-center">
                  {year === new Date().getFullYear() ? "Próximo Aniversario" : `Aniversario ${year}`}
                </h3>
                <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-300 fill-rose-300 animate-pulse" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {[
                  { label: "Días", value: countdown.days, gradient: "from-rose-400 to-pink-500", icon: "📅" },
                  { label: "Horas", value: countdown.hours, gradient: "from-pink-400 to-rose-500", icon: "⏰" },
                  { label: "Min", value: countdown.minutes, gradient: "from-red-400 to-rose-500", icon: "⏱️" },
                  { label: "Seg", value: countdown.seconds, gradient: "from-rose-400 to-red-500", icon: "⚡" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="relative group cursor-pointer"
                  >
                    <motion.div 
                      className={`absolute -inset-1 md:-inset-2 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-50 rounded-2xl md:rounded-3xl blur-xl transition-opacity duration-500`}
                    />

                    <div className={`relative bg-gradient-to-br ${item.gradient} bg-opacity-20 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 border border-rose-300/20 min-h-[100px] md:min-h-[140px] flex flex-col items-center justify-center group-hover:border-rose-300/40 transition-all shadow-lg`}>
                      <div className="text-xl md:text-2xl mb-1 md:mb-2">{item.icon}</div>
                      <motion.div 
                        key={item.value}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-3xl md:text-6xl font-black text-rose-50 mb-1 md:mb-3 leading-none drop-shadow-lg"
                      >
                        {item.value}
                      </motion.div>
                      <div className="text-[10px] md:text-sm text-rose-200/80 uppercase tracking-wider md:tracking-[0.2em] font-bold">
                        {item.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <YearSelector year={year} onChange={setYear} theme="anniversary" />

        <AnniversaryGate unlockDate={data.unlockDate}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6 md:space-y-10"
          >
            {/* Mensaje principal con efecto libro */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="relative group cursor-pointer"
            >
              <motion.div 
                animate={{ 
                  boxShadow: [
                    "0 0 40px rgba(251, 113, 133, 0.3)",
                    "0 0 60px rgba(251, 113, 133, 0.5)",
                    "0 0 40px rgba(251, 113, 133, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-2 md:-inset-3 bg-gradient-to-r from-rose-500/40 to-pink-500/40 rounded-2xl md:rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />

              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl md:rounded-[2.5rem] p-8 md:p-16 border border-rose-300/30 shadow-2xl overflow-hidden">
                {/* Efecto de página */}
                <motion.div
                  className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-br from-rose-300/20 to-transparent"
                  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                  whileHover={{ scale: 1.1 }}
                />

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6 md:mb-10">
                  <div className="h-px md:h-0.5 w-16 md:w-24 bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-rose-200" />
                  <div className="h-px md:h-0.5 w-16 md:w-24 bg-gradient-to-l from-transparent via-rose-300/50 to-transparent" />
                </div>

                <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 leading-tight text-center">
                  {data.title}
                </h2>
                <p className="text-base md:text-2xl text-rose-50/90 leading-relaxed max-w-3xl mx-auto font-light text-center">
                  {data.text}
                </p>

                {/* Decoración inferior */}
                <div className="flex items-center justify-center gap-3 mt-6 md:mt-8">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-rose-300/50 fill-rose-300/50" />
                  <div className="h-px w-20 md:w-32 bg-gradient-to-r from-rose-300/50 via-pink-300/50 to-rose-300/50" />
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-rose-300/50 fill-rose-300/50" />
                </div>
              </div>
            </motion.div>

            {/* Cards interactivas mejoradas - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Carta de amor */}
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewLetter(year)}
                onHoverStart={() => setHoveredCard('letter')}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative overflow-hidden bg-gradient-to-br from-rose-500/15 to-pink-500/15 backdrop-blur-xl rounded-2xl md:rounded-[2rem] p-6 md:p-10 border border-rose-300/30 hover:border-rose-300/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-rose-500/30"
              >
                <AnimatePresence>
                  {hoveredCard === 'letter' && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 20, opacity: 0.1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-300"
                    >
                      💌
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-rose-400/10 to-rose-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <div className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                  <div className="relative flex-shrink-0">
                    <motion.div 
                      animate={{ rotate: hoveredCard === 'letter' ? [0, -5, 5, 0] : 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-rose-400/40 rounded-2xl md:rounded-3xl blur-2xl"
                    />
                    <div className="relative p-4 md:p-5 bg-gradient-to-br from-rose-400/30 to-pink-400/30 rounded-2xl md:rounded-3xl">
                      <Mail className="w-8 h-8 md:w-10 md:h-10 text-rose-50" />
                    </div>
                  </div>

                  <div className="text-center md:text-left flex-1">
                    <div className="text-2xl md:text-3xl font-bold text-rose-50 mb-1 md:mb-2">
                      Carta de Amor
                    </div>
                    <div className="text-sm md:text-base text-rose-100/70">
                      Lee mis palabras escritas del corazón
                    </div>
                  </div>

                  <motion.div
                    animate={{ x: hoveredCard === 'letter' ? [0, 8, 0] : 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-rose-300/60 text-2xl md:text-3xl flex-shrink-0 hidden md:block"
                  >
                    →
                  </motion.div>
                </div>

                <motion.div
                  className="absolute bottom-2 right-2 md:bottom-4 md:right-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Flame className="w-4 h-4 md:w-6 md:h-6 text-rose-400/50" />
                </motion.div>
              </motion.button>

              {/* Galería */}
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredCard('gallery')}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative overflow-hidden bg-gradient-to-br from-pink-500/15 to-red-500/15 backdrop-blur-xl rounded-2xl md:rounded-[2rem] p-6 md:p-10 border border-pink-300/30 hover:border-pink-300/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-pink-500/30"
              >
                <AnimatePresence>
                  {hoveredCard === 'gallery' && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 20, opacity: 0.1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-300"
                    >
                      📸
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/0 via-pink-400/10 to-pink-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <div className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                  <div className="relative flex-shrink-0">
                    <motion.div 
                      animate={{ rotate: hoveredCard === 'gallery' ? [0, 5, -5, 0] : 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-pink-400/40 rounded-2xl md:rounded-3xl blur-2xl"
                    />
                    <div className="relative p-4 md:p-5 bg-gradient-to-br from-pink-400/30 to-red-400/30 rounded-2xl md:rounded-3xl">
                      <Image className="w-8 h-8 md:w-10 md:h-10 text-pink-50" />
                    </div>
                  </div>

                  <div className="text-center md:text-left flex-1">
                    <div className="text-2xl md:text-3xl font-bold text-pink-50 mb-1 md:mb-2">
                      Galería Fotográfica
                    </div>
                    <div className="text-sm md:text-base text-pink-100/70">
                      Revive nuestros momentos más especiales
                    </div>
                  </div>

                  <motion.div
                    animate={{ x: hoveredCard === 'gallery' ? [0, 8, 0] : 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-pink-300/60 text-2xl md:text-3xl flex-shrink-0 hidden md:block"
                  >
                    →
                  </motion.div>
                </div>

                <motion.div
                  className="absolute bottom-2 right-2 md:bottom-4 md:right-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-pink-400/50" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </AnniversaryGate>
      </div>
    </div>
  );
}