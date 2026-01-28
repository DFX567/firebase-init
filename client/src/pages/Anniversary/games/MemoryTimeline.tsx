import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Trophy, RotateCcw, Calendar, Check, X } from "lucide-react";

interface MemoryTimelineProps {
  onBack: () => void;
}

const events = [
  { id: 1, date: "Noviembre 2024", event: "Nuestro primer encuentro", order: 1 },
  { id: 2, date: "Primer mes", event: "Nuestra primera cita oficial", order: 2 },
  { id: 3, date: "Navidad", event: "Primer regalo juntos", order: 3 },
  { id: 4, date: "Año Nuevo", event: "Primer abrazo del año", order: 4 },
  { id: 5, date: "San Valentin", event: "Celebracion romantica", order: 5 },
];

export default function MemoryTimeline({ onBack }: MemoryTimelineProps) {
  const [shuffledEvents, setShuffledEvents] = useState<typeof events>([]);
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const shuffleEvents = () => {
    const shuffled = [...events].sort(() => Math.random() - 0.5);
    setShuffledEvents(shuffled);
    setSelectedOrder([]);
    setShowResult(false);
    setScore(0);
    setAttempts(0);
  };

  useEffect(() => {
    shuffleEvents();
  }, []);

  const handleSelect = (eventId: number) => {
    if (selectedOrder.includes(eventId) || showResult) return;
    
    const newOrder = [...selectedOrder, eventId];
    setSelectedOrder(newOrder);
    
    if (newOrder.length === events.length) {
      checkAnswer(newOrder);
    }
  };

  const checkAnswer = (order: number[]) => {
    setAttempts(a => a + 1);
    let correct = 0;
    order.forEach((id, index) => {
      const event = events.find(e => e.id === id);
      if (event && event.order === index + 1) {
        correct++;
      }
    });
    setScore(correct);
    setShowResult(true);
  };

  const getOrderNumber = (eventId: number) => {
    const index = selectedOrder.indexOf(eventId);
    return index === -1 ? null : index + 1;
  };

  const isCorrect = (eventId: number) => {
    if (!showResult) return null;
    const event = events.find(e => e.id === eventId);
    const selectedIndex = selectedOrder.indexOf(eventId);
    return event?.order === selectedIndex + 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900 to-purple-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        data-testid="button-back-timeline"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 backdrop-blur-sm border border-rose-300/30 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-rose-100 text-sm md:text-base">Volver</span>
      </motion.button>

      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Calendar className="w-10 h-10 md:w-12 md:h-12 text-rose-300 mx-auto mb-3" />
          <h1 className="text-2xl md:text-4xl font-bold text-rose-100 mb-2">Linea del Tiempo</h1>
          <p className="text-rose-200/70 text-sm">Ordena los eventos de nuestra historia</p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-rose-300/20">
          <p className="text-rose-200 text-sm text-center">
            Toca los eventos en el orden correcto (del primero al ultimo)
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {shuffledEvents.map((event) => {
                const orderNum = getOrderNumber(event.id);
                return (
                  <motion.button
                    key={event.id}
                    whileHover={{ scale: orderNum ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(event.id)}
                    disabled={orderNum !== null}
                    data-testid={`event-${event.id}`}
                    className={`w-full p-4 md:p-5 rounded-xl text-left transition-all flex items-center gap-4 ${
                      orderNum
                        ? "bg-rose-500/30 border-2 border-rose-400"
                        : "bg-rose-500/10 border border-rose-300/30 hover:bg-rose-500/20"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      orderNum
                        ? "bg-rose-500 text-white"
                        : "bg-rose-500/20 text-rose-300"
                    }`}>
                      {orderNum || "?"}
                    </div>
                    <div className="flex-1">
                      <p className="text-rose-100 font-semibold text-sm md:text-base">{event.event}</p>
                      <p className="text-rose-300/70 text-xs md:text-sm">{event.date}</p>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-rose-300/20"
            >
              <div className="text-center mb-6">
                {score === events.length ? (
                  <>
                    <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-rose-50 mb-2">Perfecto!</h2>
                    <p className="text-rose-200">Conoces bien nuestra historia</p>
                  </>
                ) : (
                  <>
                    <Heart className="w-16 h-16 text-rose-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-rose-50 mb-2">{score}/{events.length} correctos</h2>
                    <p className="text-rose-200">Sigue recordando!</p>
                  </>
                )}
              </div>

              <div className="space-y-2 mb-6">
                {selectedOrder.map((id, index) => {
                  const event = events.find(e => e.id === id);
                  const correct = isCorrect(id);
                  return (
                    <div
                      key={id}
                      className={`p-3 rounded-lg flex items-center gap-3 ${
                        correct ? "bg-green-500/20" : "bg-red-500/20"
                      }`}
                    >
                      <span className="font-bold text-rose-100">{index + 1}.</span>
                      <span className="flex-1 text-rose-50 text-sm">{event?.event}</span>
                      {correct ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shuffleEvents}
                data-testid="button-restart-timeline"
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-semibold"
              >
                <RotateCcw className="w-5 h-5" />
                Intentar de nuevo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
