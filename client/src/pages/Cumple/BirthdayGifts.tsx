import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gift, Sparkles, Lock, Heart, Star, Music, Book, Camera } from "lucide-react";
import ConfettiRain from "@/components/animations/ConfettiRain";
import Planet3D from "@/components/animations/Planet3D";

interface BirthdayGiftsProps {
  year: number;
  onBack: () => void;
}

const gifts = [
  {
    id: 1,
    title: "Playlist Especial",
    icon: Music,
    color: "from-purple-400 to-violet-500",
    locked: false,
    description: "Una colección de canciones que me recuerdan a ti",
    content: "🎵 Nuestra Playlist:\n\n1. Perfect - Ed Sheeran\n2. All of Me - John Legend\n3. A Thousand Years - Christina Perri\n4. Thinking Out Loud - Ed Sheeran\n5. Make You Feel My Love - Adele\n\n...y muchas más canciones especiales para ti 💜"
  },
  {
    id: 2,
    title: "Álbum de Recuerdos",
    icon: Camera,
    color: "from-pink-400 to-rose-500",
    locked: false,
    description: "Nuestros mejores momentos capturados",
    content: "📸 Este álbum digital contiene:\n\n✨ 100+ fotos de nuestros mejores momentos\n💕 Videos especiales\n🎉 Mensajes guardados\n📝 Notas de amor\n\nCada imagen cuenta nuestra historia única"
  },
  {
    id: 3,
    title: "Cupones de Amor",
    icon: Heart,
    color: "from-rose-400 to-pink-500",
    locked: false,
    description: "Cupones canjeables en cualquier momento",
    content: "💝 Tus cupones incluyen:\n\n🍕 1 cena en tu restaurante favorito\n🎬 1 noche de películas sin límites\n💆 1 masaje relajante\n🍰 1 postre sorpresa\n🎮 1 día de videojuegos juntos\n🌅 1 día de aventura a donde quieras\n\n¡Y muchos más por descubrir!"
  },
  {
    id: 4,
    title: "Libro Personalizado",
    icon: Book,
    color: "from-indigo-400 to-purple-500",
    locked: false,
    description: "Nuestra historia escrita en páginas",
    content: "📖 'Nuestra Historia de Amor'\n\nUn libro digital personalizado que cuenta:\n\n📝 Cómo nos conocimos\n💫 Nuestros primeros momentos\n🌟 Aventuras vividas\n💭 Sueños compartidos\n💜 Promesas de futuro\n\nCada capítulo es un recuerdo especial"
  },
  {
    id: 5,
    title: "Experiencia Virtual",
    icon: Star,
    color: "from-violet-400 to-indigo-500",
    locked: true,
    description: "Desbloquea el día de tu cumpleaños",
    content: "🎁 ¡Sorpresa bloqueada!\n\nEsta experiencia especial se desbloqueará el día de tu cumpleaños.\n\nPista: Involucra algo que siempre has querido hacer... ✨"
  },
  {
    id: 6,
    title: "Regalo Sorpresa",
    icon: Gift,
    color: "from-pink-400 to-purple-500",
    locked: true,
    description: "El mejor regalo se revela el día especial",
    content: "🎉 ¡Regalo misterioso!\n\nEste regalo permanecerá como sorpresa hasta el gran día.\n\nSolo puedo decir que... ¡te va a encantar! 💜🎊"
  }
];

export default function BirthdayGifts({ year, onBack }: BirthdayGiftsProps) {
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentGift = selectedGift !== null ? gifts.find(g => g.id === selectedGift) : null;

  const handleGiftClick = (gift: typeof gifts[0]) => {
    if (!gift.locked) {
      setSelectedGift(gift.id);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Fondo festivo */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-purple-900/85 to-violet-950/90">
        <ConfettiRain count={showConfetti ? 100 : 60} />
      </div>

      {/* Luces festivas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl" />
      </div>

      {/* Planeta festivo */}
      <Planet3D 
        size={420} 
        position={{ x: "10%", y: "75%" }}
        colors={["#c084fc", "#a78bfa", "#8b5cf6"]}
        rotationSpeed={90}
        type="gas"
      />

      {/* Regalos flotantes decorativos */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl pointer-events-none opacity-20"
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
          {['🎁', '🎈', '🎉'][Math.floor(Math.random() * 3)]}
        </motion.div>
      ))}

      {/* Header */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="text-5xl md:text-6xl"
            >
              🎁
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-5xl md:text-6xl"
            >
              🎉
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-violet-100 to-purple-200 mb-3">
            Tus Sorpresas Especiales
          </h1>
          <p className="text-purple-100/70 text-base md:text-xl">
            Preparé estos regalos con todo mi amor 💜
          </p>
        </motion.div>

        {/* Grid de regalos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {gifts.map((gift, index) => {
            const Icon = gift.icon;
            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.6,
                  type: "spring"
                }}
                whileHover={!gift.locked ? { y: -8, scale: 1.02 } : {}}
                onClick={() => handleGiftClick(gift)}
                className={`relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-purple-300/20 hover:border-purple-300/50 transition-all shadow-xl ${gift.locked ? 'cursor-not-allowed' : 'cursor-pointer group'}`}
              >
                {/* Fondo degradado */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gift.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                {/* Contenido */}
                <div className="relative p-6 md:p-8">
                  {/* Icono */}
                  <div className="relative mb-4">
                    <motion.div
                      animate={!gift.locked ? { rotate: [0, -5, 5, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gift.color} shadow-lg`}
                    >
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </motion.div>

                    {/* Badge de bloqueado */}
                    {gift.locked && (
                      <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-2 shadow-lg">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Título */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {gift.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-purple-200/70 text-sm md:text-base mb-4">
                    {gift.description}
                  </p>

                  {/* Estado */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    gift.locked 
                      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' 
                      : 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                  }`}>
                    {gift.locked ? (
                      <>
                        <Lock className="w-3 h-3" />
                        Bloqueado
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        Disponible
                      </>
                    )}
                  </div>
                </div>

                {/* Brillo de hover */}
                {!gift.locked && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal de regalo */}
      <AnimatePresence>
        {currentGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedGift(null)}
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-purple-300/30 shadow-2xl">
                {/* Confeti decorativo */}
                <div className="absolute -top-8 -right-8 text-6xl animate-bounce">🎊</div>
                <div className="absolute -top-6 -left-6 text-5xl animate-pulse">✨</div>

                {/* Icono del regalo */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`p-6 rounded-3xl bg-gradient-to-br ${currentGift.color} shadow-2xl`}
                  >
                    <currentGift.icon className="w-16 h-16 text-white" />
                  </motion.div>
                </div>

                {/* Título */}
                <h2 className="text-3xl md:text-4xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
                  {currentGift.title}
                </h2>

                {/* Contenido */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-6 border border-purple-300/20">
                  <pre className="whitespace-pre-wrap font-sans text-purple-50/90 text-sm md:text-base leading-relaxed">
                    {currentGift.content}
                  </pre>
                </div>

                {/* Botón cerrar */}
                <button
                  onClick={() => setSelectedGift(null)}
                  className="w-full py-3 md:py-4 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 rounded-xl font-bold text-white transition-all shadow-lg"
                >
                  ¡Gracias! 
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}