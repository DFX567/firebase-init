import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Mail, BookOpen, Sparkles, Flower2, Music } from "lucide-react";
import FloatingHearts from "@/components/animations/FloatingHearts";
import YearSelector from "@/components/YearSelector";
import ValentineGate from "./ValentineGate";
import { sanValentinData } from "@/data/events";
import PageTransition from "@/components/animations/PageTransition";
import Planet3D from "@/components/animations/Planet3D";

interface SanValentinHomeProps {
  onBack: () => void;
  onViewLetter: (year: number) => void;
  onViewPoem: (year: number) => void;
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

export default function SanValentinHome({ 
  onBack, 
  onViewLetter,
  onViewPoem,
  onViewGame
}: SanValentinHomeProps) {
  const [year, setYear] = useState(2025);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const data = sanValentinData[year];
  const countdown = useYearCountdown(2, 14, year);

  return (
    <PageTransition pageKey="sanvalentin-home" variant="scale">
      <div className="min-h-screen relative overflow-hidden bg-black">
        {/* Fondo romántico optimizado */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/90 via-rose-900/85 to-pink-950/90">
          <FloatingHearts count={25} />
        </div>

        {/* Luces ambientales estáticas (optimizado) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-rose-500/25 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-pink-500/25 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-red-500/20 rounded-full blur-3xl" />
        </div>

        {/* Planeta romántico */}
        <Planet3D 
          size={420} 
          position={{ x: "10%", y: "35%" }}
          colors={["#fda4af", "#fb7185", "#f43f5e"]}
          rotationSpeed={95}
          type="rocky"
        />

        {/* Pétalos cayendo (optimizados - menos cantidad) */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-5xl opacity-30 pointer-events-none"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -100,
              rotate: 0
            }}
            animate={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
              rotate: 360,
              x: `+=${Math.random() * 100 - 50}`
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            🌹
          </motion.div>
        ))}

        {/* Destellos románticos */}
        {[...Array(20)].map((_, i) => (
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
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">

          {/* Hero romántico */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-16"
          >
            <div className="relative inline-block mb-6 md:mb-8">
              {/* Anillos de amor pulsantes */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-rose-500/40 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 bg-pink-500/40 rounded-full blur-3xl"
              />

              <motion.div
                whileHover={{ scale: 1.15 }}
                className="relative p-6 md:p-8 bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-red-500/20 rounded-3xl md:rounded-[2rem] backdrop-blur-xl border border-rose-300/30 shadow-2xl"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Heart className="w-12 h-12 md:w-20 md:h-20 text-rose-200 fill-rose-200" />
                </motion.div>
              </motion.div>
            </div>

            <motion.h1 
              className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-pink-100 to-red-200 mb-3 md:mb-6 tracking-tight leading-none px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              San Valentín
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-2xl text-rose-100/70 max-w-3xl mx-auto leading-relaxed font-light px-4"
            >
              Celebrando el día más romántico del año, juntos por siempre 💝
            </motion.p>
          </motion.div>

          {/* Countdown romántico sincronizado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 md:mb-12"
          >
            <div className="relative">
              <div className="absolute -inset-8 md:-inset-12 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-red-500/20 rounded-full blur-3xl" />

              <div className="relative bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-2xl rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-rose-300/30 shadow-2xl">
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-6 md:mb-10">
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-300 fill-rose-300 animate-pulse" />
                  <h3 className="text-lg md:text-2xl font-bold text-rose-100 text-center">
                    {year === new Date().getFullYear() ? "Próximo San Valentín" : `San Valentín ${year}`}
                  </h3>
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-300 fill-rose-300 animate-pulse" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                  {[
                    { label: "Días", value: countdown.days, gradient: "from-rose-400 to-red-500", icon: "📅" },
                    { label: "Horas", value: countdown.hours, gradient: "from-pink-400 to-rose-500", icon: "⏰" },
                    { label: "Min", value: countdown.minutes, gradient: "from-red-400 to-pink-500", icon: "⏱️" },
                    { label: "Seg", value: countdown.seconds, gradient: "from-rose-400 to-pink-500", icon: "⚡" },
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

          <YearSelector year={year} onChange={setYear} theme="valentine" />

          <ValentineGate unlockDate={data.unlockDate}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6 md:space-y-10"
            >
              {/* Mensaje principal romántico */}
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
                  className="absolute -inset-2 md:-inset-3 bg-gradient-to-r from-rose-500/40 via-pink-500/40 to-red-500/40 rounded-2xl md:rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />

                <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl md:rounded-[2.5rem] p-8 md:p-16 border border-rose-300/30 shadow-2xl overflow-hidden">
                  {/* Decoración de rosas */}
                  <div className="absolute top-4 right-4 md:top-8 md:right-8 text-4xl md:text-6xl opacity-10">🌹</div>
                  <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-4xl md:text-6xl opacity-10">💕</div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6 md:mb-10">
                    <div className="h-px md:h-0.5 w-16 md:w-24 bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
                    <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-rose-200" />
                    <div className="h-px md:h-0.5 w-16 md:w-24 bg-gradient-to-l from-transparent via-rose-300/50 to-transparent" />
                  </div>

                  <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 leading-tight text-center">
                    {data.title}
                  </h2>
                  <p className="text-base md:text-2xl text-rose-50/90 leading-relaxed max-w-3xl mx-auto font-light text-center">
                    {data.message}
                  </p>

                  <div className="flex items-center justify-center gap-3 mt-6 md:mt-8">
                    <Flower2 className="w-3 h-3 md:w-4 md:h-4 text-rose-300/50" />
                    <div className="h-px w-20 md:w-32 bg-gradient-to-r from-rose-300/50 via-pink-300/50 to-rose-300/50" />
                    <Flower2 className="w-3 h-3 md:w-4 md:h-4 text-rose-300/50" />
                  </div>
                </div>
              </motion.div>

              {/* Cards románticas - Responsive */}
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
                        animate={{ scale: hoveredCard === 'letter' ? [1, 1.1, 1] : 1 }}
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
                        Mis sentimientos más profundos
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
                    <Heart className="w-4 h-4 md:w-6 md:h-6 text-rose-400/50 fill-rose-400/50" />
                  </motion.div>
                </motion.button>

                {/* Poema romántico */}
                <motion.button
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewPoem(year)}
                  onHoverStart={() => setHoveredCard('poem')}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group relative overflow-hidden bg-gradient-to-br from-pink-500/15 to-red-500/15 backdrop-blur-xl rounded-2xl md:rounded-[2rem] p-6 md:p-10 border border-pink-300/30 hover:border-pink-300/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-pink-500/30"
                >
                  <AnimatePresence>
                    {hoveredCard === 'poem' && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 20, opacity: 0.1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-300"
                      >
                        📖
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/0 via-pink-400/10 to-pink-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  <div className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                    <div className="relative flex-shrink-0">
                      <motion.div 
                        animate={{ rotate: hoveredCard === 'poem' ? [0, 5, -5, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-pink-400/40 rounded-2xl md:rounded-3xl blur-2xl"
                      />
                      <div className="relative p-4 md:p-5 bg-gradient-to-br from-pink-400/30 to-red-400/30 rounded-2xl md:rounded-3xl">
                        <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-pink-50" />
                      </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                      <div className="text-2xl md:text-3xl font-bold text-pink-50 mb-1 md:mb-2">
                        Poema Romántico
                      </div>
                      <div className="text-sm md:text-base text-pink-100/70">
                        Versos escritos desde el corazón
                      </div>
                    </div>

                    <motion.div
                      animate={{ x: hoveredCard === 'poem' ? [0, 8, 0] : 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-pink-300/60 text-2xl md:text-3xl flex-shrink-0 hidden md:block"
                    >
                      →
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute bottom-2 right-2 md:bottom-4 md:right-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Music className="w-4 h-4 md:w-6 md:h-6 text-pink-400/50" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </ValentineGate>
        </div>
      </div>
    </PageTransition>
  );
}