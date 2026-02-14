import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Sparkles, RotateCcw, Star } from "lucide-react";

interface LoveCardsProps {
  onBack: () => void;
}

// Sistema de rareza para las cartas
type Rarity = "common" | "rare" | "epic" | "legendary";

interface LoveCard {
  front: string;
  back: string;
  rarity: Rarity;
}

const loveMessages: LoveCard[] = [
  // COMMON (50% probabilidad) - Mensajes dulces generales
  { front: "Te amo porque...", back: "Cada día eliges quedarte a mi lado a pesar de la distancia", rarity: "common" },
  { front: "Mi momento favorito...", back: "Es cuando nos reímos juntos en videollamada", rarity: "common" },
  { front: "Contigo aprendí...", back: "Que el amor verdadero supera cualquier distancia", rarity: "common" },
  { front: "Lo que más admiro de ti...", back: "Tu paciencia y fortaleza en esta relación", rarity: "common" },
  { front: "Gracias por...", back: "Ser mi mejor amiga y mi gran amor", rarity: "common" },
  { front: "Eres mi persona favorita porque...", back: "Me haces ser mejor cada día", rarity: "common" },
  { front: "Mi lugar favorito...", back: "Es cualquier lugar donde estemos juntos, aunque sea virtual", rarity: "common" },
  { front: "Cuando te veo...", back: "Mi corazón late más fuerte y sonrío sin darme cuenta", rarity: "common" },
  { front: "Eres especial porque...", back: "Me amas como soy, con defectos y todo", rarity: "common" },
  { front: "Lo mejor de amarte...", back: "Es que tú me amas también con la misma intensidad", rarity: "common" },
  { front: "Contigo he descubierto...", back: "Lo que es la felicidad verdadera", rarity: "common" },
  { front: "Me encanta cuando...", back: "Me cuentas tu día y me haces parte de tu vida", rarity: "common" },
  { front: "Extraño tanto...", back: "Los abrazos que nunca nos hemos dado pero que sueño darte", rarity: "common" },
  { front: "Cada día pienso...", back: "En lo afortunado que soy de tenerte", rarity: "common" },
  { front: "Tu risa...", back: "Es mi sonido favorito en todo el mundo", rarity: "common" },
  { front: "Quiero que sepas...", back: "Que eres mi prioridad siempre", rarity: "common" },
  { front: "Me haces feliz cuando...", back: "Simplemente existes y eres parte de mi vida", rarity: "common" },
  { front: "Nuestras conversaciones...", back: "Son lo mejor de mi día, cada día", rarity: "common" },
  { front: "Admiro cómo...", back: "Sigues luchando por nosotros sin importar nada", rarity: "common" },
  { front: "Eres mi...", back: "Calma en medio del caos", rarity: "common" },

  // RARE (30% probabilidad) - Mensajes sobre la relación a distancia
  { front: "La distancia nos enseñó...", back: "Que nuestro amor es más fuerte que cualquier kilómetro", rarity: "rare" },
  { front: "Aunque no estemos juntos físicamente...", back: "Siempre estás en mi mente y en mi corazón", rarity: "rare" },
  { front: "Cada videollamada...", back: "Es un recordatorio de por qué vale la pena esperar", rarity: "rare" },
  { front: "Sueño con el día...", back: "En que finalmente pueda abrazarte y no soltarte nunca", rarity: "rare" },
  { front: "La distancia duele pero...", back: "Me recuerda lo valioso que eres para mí", rarity: "rare" },
  { front: "Cuando estemos juntos...", back: "Recuperaremos todo el tiempo perdido con creces", rarity: "rare" },
  { front: "A pesar de los kilómetros...", back: "Siento que estás más cerca que nadie", rarity: "rare" },
  { front: "Los días malos a distancia...", back: "Me hacen valorar aún más los buenos momentos contigo", rarity: "rare" },
  { front: "Nuestra paciencia...", back: "Es prueba de que esto es amor real y verdadero", rarity: "rare" },
  { front: "No tener fecha para vernos...", back: "No cambia el hecho de que te esperaré lo que sea necesario", rarity: "rare" },
  { front: "Las horas de diferencia...", back: "No impiden que piense en ti a cada momento", rarity: "rare" },
  { front: "Aunque la distancia sea difícil...", back: "Prefiero esto contigo que estar cerca de cualquier otra persona", rarity: "rare" },
  { front: "Cada 'te extraño'...", back: "Es una promesa de que valdrá la pena cuando estemos juntos", rarity: "rare" },
  { front: "La espera es larga pero...", back: "Nuestro amor es más fuerte que la impaciencia", rarity: "rare" },
  { front: "Los días sin verte...", back: "Se hacen eternos pero me recuerdan cuánto te amo", rarity: "rare" },

  // EPIC (15% probabilidad) - Mensajes sobre videojuegos y momentos especiales
  { front: "Jugar contigo...", back: "Es mi forma favorita de pasar tiempo juntos", rarity: "epic" },
  { front: "Nuestras partidas de videojuegos...", back: "Son más que juegos, son nuestros momentos de calidad", rarity: "epic" },
  { front: "Me encanta cuando hacemos teamwork...", back: "Porque me demuestra que somos el equipo perfecto en todo", rarity: "epic" },
  { front: "Cuando ganamos juntos...", back: "Siento que podemos lograr cualquier cosa en la vida", rarity: "epic" },
  { front: "Incluso cuando perdemos...", back: "Me divierto porque estoy contigo", rarity: "epic" },
  { front: "Nuestras sesiones de juego...", back: "Son la mejor terapia después de un día difícil", rarity: "epic" },
  { front: "Me río tanto contigo...", back: "Que olvido cualquier problema cuando jugamos", rarity: "epic" },
  { front: "Extraño nuestras partidas cuando...", back: "No podemos jugar juntos y me siento incompleto", rarity: "epic" },
  { front: "Compartir este hobby...", back: "Nos une de una forma especial y única", rarity: "epic" },
  { front: "Cuando me dices 'mi rey'...", back: "Me haces sentir el hombre más especial del mundo", rarity: "epic" },
  { front: "Tu 'cuchurrumin'...", back: "Me derrite el corazón cada vez que lo dices", rarity: "epic" },
  { front: "Tus apodos para mí...", back: "Son pequeñas pruebas de amor que atesoro", rarity: "epic" },
  { front: "El 2 de noviembre de 2024...", back: "Fue el día que mi vida cambió para siempre", rarity: "epic" },
  { front: "Desde que nos conocimos en WhatsApp...", back: "Supe que eras diferente a todas las demás", rarity: "epic" },
  { front: "Ya llevamos más de un año...", back: "Y cada día te amo más que el anterior", rarity: "epic" },

  // LEGENDARY (5% probabilidad) - Mensajes profundos sobre el futuro
  { front: "Mi sueño más grande...", back: "Es irme a vivir contigo y construir nuestro hogar juntos", rarity: "legendary" },
  { front: "Quiero formar una familia contigo...", back: "Ver tus ojos en nuestros hijos y envejecer a tu lado", rarity: "legendary" },
  { front: "No quiero separarme nunca de ti...", back: "Quiero vivir contigo hasta mi último día", rarity: "legendary" },
  { front: "Te amo más que...", back: "Cualquier palabra pueda expresar. Te amo elevado al infinito", rarity: "legendary" },
  { front: "Eres mi presente y mi futuro...", back: "Mi calma y mi aventura, mi hogar y mi destino", rarity: "legendary" },
  { front: "Cuando dices que me amas...", back: "Yo te amo muchísimo más. Infinitamente más", rarity: "legendary" },
  { front: "Mi corazón es tuyo...", back: "Y lo será hasta que deje de latir, y aún después", rarity: "legendary" },
  { front: "Contigo quiero...", back: "Cada mañana, cada noche, cada momento hasta el final", rarity: "legendary" },
  { front: "Este San Valentín y todos los que vengan...", back: "Quiero pasarlos a tu lado, hoy y para siempre", rarity: "legendary" },
  { front: "Prometo amarte...", back: "Cada día un poquito más, hasta el infinito y más allá", rarity: "legendary" },
  { front: "Eres el amor de mi vida...", back: "La persona con quien quiero envejecer y construir todo", rarity: "legendary" },
  { front: "Mi vida tiene sentido...", back: "Porque tú estás en ella y eres mi razón de ser", rarity: "legendary" },
  { front: "Cuando finalmente nos veamos...", back: "Será el inicio de nuestra verdadera historia juntos", rarity: "legendary" },
  { front: "No importa cuánto tengamos que esperar...", back: "Porque sé que pasaré el resto de mi vida contigo", rarity: "legendary" },
  { front: "Eres mi para siempre...", back: "Mi única, mi todo, mi eternidad", rarity: "legendary" },
];

// Probabilidades de rareza
const rarityWeights = {
  common: 50,
  rare: 30,
  epic: 15,
  legendary: 5,
};

const rarityColors = {
  common: "from-gray-500 to-gray-600",
  rare: "from-blue-500 to-blue-600",
  epic: "from-purple-500 to-purple-600",
  legendary: "from-yellow-500 to-orange-600",
};

const rarityBorders = {
  common: "border-gray-300/50",
  rare: "border-blue-300/50",
  epic: "border-purple-300/50",
  legendary: "border-yellow-300/50",
};

const rarityLabels = {
  common: "Común",
  rare: "Rara",
  epic: "Épica",
  legendary: "Legendaria",
};

export default function LoveCards({ onBack }: LoveCardsProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedCards, setViewedCards] = useState<number[]>([]);
  const [collectedRarities, setCollectedRarities] = useState<Record<Rarity, number>>({
    common: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  });

  const getRandomCardByRarity = () => {
    const random = Math.random() * 100;
    let cumulativeWeight = 0;
    let selectedRarity: Rarity = "common";

    for (const [rarity, weight] of Object.entries(rarityWeights)) {
      cumulativeWeight += weight;
      if (random <= cumulativeWeight) {
        selectedRarity = rarity as Rarity;
        break;
      }
    }

    const cardsOfRarity = loveMessages
      .map((card, index) => ({ card, index }))
      .filter(({ card }) => card.rarity === selectedRarity);

    const randomCard = cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
    return randomCard.index;
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && !viewedCards.includes(currentCard)) {
      setViewedCards([...viewedCards, currentCard]);
      const cardRarity = loveMessages[currentCard].rarity;
      setCollectedRarities((prev) => ({
        ...prev,
        [cardRarity]: prev[cardRarity] + 1,
      }));
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const newCardIndex = getRandomCardByRarity();
      setCurrentCard(newCardIndex);
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
    setCollectedRarities({
      common: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
    });
  };

  const currentRarity = loveMessages[currentCard].rarity;

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
          <p className="text-rose-200/70 text-sm">Descubre mensajes especiales con diferentes rarezas</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {(Object.entries(rarityLabels) as [Rarity, string][]).map(([rarity, label]) => (
            <div
              key={rarity}
              className={`bg-gradient-to-br ${rarityColors[rarity]} p-2 rounded-lg text-center border-2 ${rarityBorders[rarity]}`}
            >
              <p className="text-white text-xs font-bold">{label}</p>
              <p className="text-white text-lg font-bold">{collectedRarities[rarity]}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-4">
          <span className="text-rose-200 text-sm">
            Total vistas: {viewedCards.length} / {loveMessages.length}
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
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 p-8 flex flex-col items-center justify-center border-4 ${rarityBorders[currentRarity]} shadow-2xl`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${rarityColors[currentRarity]} text-white text-xs font-bold flex items-center gap-1`}>
                <Star className="w-3 h-3 fill-white" />
                {rarityLabels[currentRarity]}
              </div>
              <Sparkles className="w-12 h-12 text-rose-100 mb-6" />
              <p className="text-2xl md:text-3xl font-bold text-white text-center leading-relaxed">
                {loveMessages[currentCard].front}
              </p>
              <p className="text-rose-100/70 mt-6 text-sm">Toca para revelar</p>
            </div>

            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-600 to-purple-600 p-8 flex flex-col items-center justify-center border-4 ${rarityBorders[currentRarity]} shadow-2xl`}
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${rarityColors[currentRarity]} text-white text-xs font-bold flex items-center gap-1`}>
                <Star className="w-3 h-3 fill-white" />
                {rarityLabels[currentRarity]}
              </div>
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
            onClick={nextCard}
            data-testid="button-next-card"
            className="px-8 py-3 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-semibold flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Nueva Carta
          </motion.button>
        </div>

        {viewedCards.length >= 20 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <p className="text-rose-200 mb-4">¡Has descubierto {viewedCards.length} cartas!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetCards}
              data-testid="button-reset-cards"
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-semibold"
            >
              <RotateCcw className="w-5 h-5" />
              Reiniciar colección
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
