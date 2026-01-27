import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Cake, Mail, Gift, Sparkles, PartyPopper, Star, Zap, Crown, ArrowRight } from "lucide-react";
import ConfettiRain from "@/components/animations/ConfettiRain";
import YearSelector from "@/components/YearSelector";
import BirthdayGate from "./BirthdayGate";
import { cumpleData } from "@/data/events";
import PageTransition from "@/components/animations/PageTransition";
import Planet3D from "@/components/animations/Planet3D";

interface CumpleHomeProps {
  onBack: () => void;
  onViewLetter: (year: number) => void;
  onViewGifts: (year: number) => void;
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

export default function CumpleHome({ onBack, onViewLetter, onViewGifts, onViewGame }: CumpleHomeProps) {
  const [year, setYear] = useState(2025);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const data = cumpleData[year];
  const countdown = useYearCountdown(2, 14, year);

  return (
    <PageTransition pageKey="cumple-home" variant="slide">
      <div className="min-h-screen relative overflow-hidden bg-black">
        {/* Fondo festivo con degradado vibrante */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-purple-900/85 to-violet-950/90">
          <ConfettiRain count={80} />
        </div>

        {/* Fondo con puntos de luz */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-violet-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        </div>

        {/* Planeta festivo */}
        <Planet3D 
          size={450} 
          position={{ x: "88%", y: "30%" }}
          colors={["#c084fc", "#a78bfa", "#8b5cf6"]}
          rotationSpeed={85}
          type="gas"
        />

        {/* Globos flotantes 3D */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl md:text-6xl"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
              rotate: Math.random() * 360
            }}
            animate={{
              y: -150,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              rotate: [0, 360, 720]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {['🎈', '🎉', '🎊', '✨', '🎁'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}

        {/* Destellos de luz */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full"
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

        {/* Header */}
        <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 transition-all backdrop-blur-2xl border border-purple-300/30 shadow-lg text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold text-purple-100">Volver</span>
          </motion.button>
        </div>

        <div className="relative z-10 px-4 md:px-6 py-6 md:py-12 max-w-7xl mx-auto">

          {/* Hero festivo con corona */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-16"
          >
            <div className="relative inline-block mb-6 md:mb-8">
              {/* Anillos pulsantes multicolor */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-purple-500/40 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 bg-indigo-500/40 rounded-full blur-3xl"
              />

              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="relative p-6 md:p-8 bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-500/20 rounded-3xl md:rounded-[2rem] backdrop-blur-xl border border-purple-300/30 shadow-2xl"
              >
                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Crown className="w-8 h-8 md:w-12 md:h-12 text-yellow-300 fill-yellow-300" />
                  </motion.div>
                </div>

                <div className="flex items-center justify-center gap-3 md:gap-6">
                  <motion.div
                    animate={{ rotate: [0, -15, 15, -15, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Cake className="w-12 h-12 md:w-16 md:h-16 text-purple-200" />
                  </motion.div>
                  <PartyPopper className="w-14 h-14 md:w-20 md:h-20 text-violet-200" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="text-4xl md:text-6xl"
                  >
                    🎉
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.h1 
              className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-violet-100 to-indigo-200 mb-3 md:mb-6 tracking-tight leading-none px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ¡Feliz Cumpleaños!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-2xl text-purple-100/70 max-w-3xl mx-auto leading-relaxed font-light px-4"
            >
              Celebrando tu día especial con alegría, amor y los mejores deseos 🎊
            </motion.p>
          </motion.div>

          {/* Countdown festivo sincronizado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 md:mb-12"
          >
            <div className="relative">
              <motion.div 
                animate={{ 
                  background: [
                    "linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))",
                    "linear-gradient(90deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2))",
                    "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))",
                    "linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.2))"
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -inset-8 md:-inset-12 rounded-full blur-3xl"
              />

              <div className="relative bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-indigo-500/10 backdrop-blur-2xl rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 border border-purple-300/30 shadow-2xl">
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-6 md:mb-10">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-purple-300 fill-purple-300 animate-pulse" />
                  <h3 className="text-lg md:text-2xl font-bold text-purple-100 text-center">
                    {year === new Date().getFullYear() ? "Tu Próximo Cumpleaños" : `Cumpleaños ${year}`}
                  </h3>
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-purple-300 fill-purple-300 animate-pulse" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                  {[
                    { label: "Días", value: countdown.days, gradient: "from-purple-400 to-violet-500", icon: "📅" },
                    { label: "Horas", value: countdown.hours, gradient: "from-violet-400 to-purple-500", icon: "⏰" },
                    { label: "Min", value: countdown.minutes, gradient: "from-indigo-400 to-violet-500", icon: "⏱️" },
                    { label: "Seg", value: countdown.seconds, gradient: "from-purple-400 to-indigo-500", icon: "⚡" },
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

                      <div className={`relative bg-gradient-to-br ${item.gradient} bg-opacity-20 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 border border-purple-300/20 min-h-[100px] md:min-h-[140px] flex flex-col items-center justify-center group-hover:border-purple-300/40 transition-all shadow-lg`}>
                        <div className="text-xl md:text-2xl mb-1 md:mb-2">{item.icon}</div>
                        <motion.div 
                          key={item.value}
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-3xl md:text-6xl font-black text-purple-50 mb-1 md:mb-3 leading-none drop-shadow-lg"
                        >
                          {item.value}
                        </motion.div>
                        <div className="text-[10px] md:text-sm text-purple-200/80 uppercase tracking-wider md:tracking-[0.2em] font-bold">
                          {item.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <YearSelector year={year} onChange={setYear} theme="birthday" />

          <BirthdayGate unlockDate={data.unlockDate}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6 md:space-y-10"
            >
              {/* Mensaje principal festivo */}
              <motion.div 
                whileHover={{ y: -8, rotate: [0, -1, 1, 0] }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer"
              >
                <motion.div 
                  animate={{ 
                    boxShadow: [
                      "0 0 40px rgba(168, 85, 247, 0.3)",
                      "0 0 60px rgba(168, 85, 247, 0.5)",
                      "0 0 40px rgba(168, 85, 247, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-2 md:-inset-3 bg-gradient-to-r from-purple-500/40 via-violet-500/40 to-indigo-500/40 rounded-2xl md:rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />

                <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl md:rounded-[2.5rem] p-8 md:p-16 border border-purple-300/30 shadow-2xl overflow-hidden">
                  {/* Confeti decorativo */}
                  <div className="absolute top-0 right-0 text-6xl md:text-8xl opacity-10">🎊</div>
                  <div className="absolute bottom-0 left-0 text-6xl md:text-8xl opacity-10">🎉</div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6 md:mb-10">
                    <div className="h-px md:h-0.5 w-16 md:w-24 bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
                    <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-200" />
                    <div className="h-px md:h-0.5 w-16 md:w-24 bg-gradient-to-l from-transparent via-purple-300/50 to-transparent" />
                  </div>

                  <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-100 via-violet-50 to-purple-100 leading-tight text-center">
                    {data.title}
                  </h2>
                  <p className="text-base md:text-2xl text-purple-50/90 leading-relaxed max-w-3xl mx-auto font-light text-center">
                    {data.message}
                  </p>

                  <div className="flex items-center justify-center gap-3 mt-6 md:mt-8">
                    <Zap className="w-3 h-3 md:w-4 md:h-4 text-purple-300/50 fill-purple-300/50" />
                    <div className="h-px w-20 md:w-32 bg-gradient-to-r from-purple-300/50 via-violet-300/50 to-purple-300/50" />
                    <Zap className="w-3 h-3 md:w-4 md:h-4 text-purple-300/50 fill-purple-300/50" />
                  </div>
                </div>
              </motion.div>

              {/* Cards interactivas - Responsive */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Carta */}
                <motion.button
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onViewLetter(year)}
                  onHoverStart={() => setHoveredCard('letter')}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group relative overflow-hidden bg-gradient-to-br from-purple-500/15 to-violet-500/15 backdrop-blur-xl rounded-2xl md:rounded-[2rem] p-6 md:p-10 border border-purple-300/30 hover:border-purple-300/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-purple-500/30"
                >
                  <AnimatePresence>
                    {hoveredCard === 'letter' && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 20, opacity: 0.1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-300"
                      >
                        📧
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  <div className="relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                    <div className="relative flex-shrink-0">
                      <motion.div 
                        animate={{ rotate: hoveredCard === 'letter' ? [0, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-purple-400/40 rounded-2xl md:rounded-3xl blur-2xl"
                      />
                      <div className="relative p-4 md:p-5 bg-gradient-to-br from-purple-400/30 to-violet-400/30 rounded-2xl md:rounded-3xl">
                        <Mail className="w-8 h-8 md:w-10 md:h-10 text-purple-50" />
                      </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                      <div className="text-2xl md:text-3xl font-bold text-purple-50 mb-1 md:mb-2">
                        Carta Especial
                      </div>
                      <div className="text-sm md:text-base text-purple-100/70">
                        Mis mejores deseos escritos con amor
                      </div>
                    </div>

                    {/* Flecha animada al hover - esta es la parte corregida */}
                    <motion.div
                      animate={
                        hoveredCard === 'letter'
                          ? { x: [0, 8, 0] }
                          : { x: 0 }
                      }
                      transition={{ duration: 1, repeat: hoveredCard === 'letter' ? Infinity : 0 }}
                    >
                      <ArrowRight className="w-6 h-6 text-purple-200" />
                    </motion.div>
                  </div>
                </motion.button>

                {/* Aquí iría la otra card (regalos o juego) si la tienes */}
              </div>
            </motion.div>
          </BirthdayGate>
        </div>
      </div>
    </PageTransition>
  );
}