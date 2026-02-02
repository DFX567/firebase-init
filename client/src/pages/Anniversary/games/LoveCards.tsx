import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Sparkles, RotateCcw } from "lucide-react";

interface LoveCardsProps {
  onBack: () => void;
}

const loveMessages = [
  { front: "Te amo porque...", back: "Cada día eliges quedarte a mi lado" },
  { front: "Mi momento favorito...", back: "Es cuando nos reímos juntos" },
  { front: "Contigo aprendí...", back: "Que el amor verdadero existe" },
  { front: "Lo que más admiro de ti...", back: "Tu corazón bondadoso" },
  { front: "Nuestro futuro...", back: "Está lleno de aventuras juntos" },
  { front: "Gracias por...", back: "Ser mi mejor amigo/a y amor" },
  { front: "Eres mi persona favorita porque...", back: "Me haces ser mejor cada día" },
  { front: "Mi lugar favorito...", back: "Es cualquier lugar contigo" },
  { front: "Lo que más amo de nosotros...", back: "Es que nos elegimos siempre" },
  { front: "Mi sueño contigo...", back: "Es envejecer a tu lado" },
  { front: "Cuando te veo...", back: "Mi corazón late más fuerte" },
  { front: "Nunca olvidaré...", back: "El día que nos conocimos" },
  { front: "Eres especial porque...", back: "Me amas como soy" },
  { front: "Lo mejor de amarte...", back: "Es que tú me amas también" },
  { front: "Mi deseo para nosotros...", back: "Es que el amor nunca termine" },
  { front: "Contigo he descubierto...", back: "Lo que es la felicidad" },
];

export default function LoveCards({ onBack }: LoveCardsProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedCards, setViewedCards] = useState<number[]>([]);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && !viewedCards.includes(currentCard)) {
      setViewedCards([...viewedCards, currentCard]);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((currentCard + 1) % loveMessages.length);
    }, 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((currentCard - 1 + loveMessages.length) % loveMessages.length);
    }, 200);
  };

  const resetCards = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setViewedCards([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900 to-purple-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        data-testid="button-back-cards"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 backdrop-blur-sm border border-rose-300/30 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-rose-100 text-sm md:text-base">Volver</span>
      </motion.button>

      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Heart className="w-10 h-10 md:w-12 md:h-12 text-rose-300 mx-auto mb-3 fill-rose-300" />
          <h1 className="text-2xl md:text-4xl font-bold text-rose-100 mb-2">Cartas de Amor</h1>
          <p className="text-rose-200/70 text-sm">Toca para revelar mensajes especiales</p>
        </motion.div>

        <div className="text-center mb-4">
          <span className="text-rose-200 text-sm">
            Carta {currentCard + 1} de {loveMessages.length} | Vistas: {viewedCards.length}
          </span>
        </div>

        <div className="perspective-1000 mb-8">
          <motion.div
            onClick={flipCard}
            className="relative w-full aspect-[3/4] cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            data-testid="love-card"
          >
            <div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 p-8 flex flex-col items-center justify-center border-4 border-rose-300/50 shadow-2xl"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Sparkles className="w-12 h-12 text-rose-100 mb-6" />
              <p className="text-2xl md:text-3xl font-bold text-white text-center leading-relaxed">
                {loveMessages[currentCard].front}
              </p>
              <p className="text-rose-100/70 mt-6 text-sm">Toca para revelar</p>
            </div>

            <div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-600 to-purple-600 p-8 flex flex-col items-center justify-center border-4 border-pink-300/50 shadow-2xl"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <Heart className="w-12 h-12 text-pink-100 mb-6 fill-pink-100" />
              <p className="text-xl md:text-2xl font-semibold text-white text-center leading-relaxed">
                {loveMessages[currentCard].back}
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mt-6 text-4xl"
              >
                💕
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevCard}
            data-testid="button-prev-card"
            className="px-6 py-3 bg-rose-500/20 hover:bg-rose-500/30 rounded-xl border border-rose-300/30 text-rose-100 font-semibold"
          >
            Anterior
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextCard}
            data-testid="button-next-card"
            className="px-6 py-3 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-semibold"
          >
            Siguiente
          </motion.button>
        </div>

        {viewedCards.length === loveMessages.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <p className="text-rose-200 mb-4">Has visto todas las cartas!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetCards}
              data-testid="button-reset-cards"
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-semibold"
            >
              <RotateCcw className="w-5 h-5" />
              Ver de nuevo
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
