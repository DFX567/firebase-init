import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Check, X, Trophy, RotateCcw } from "lucide-react";

interface WomenEmpowermentQuizProps {
  onBack: () => void;
}

const questions = [
  {
    question: "¿Qué cualidad admiras más de las mujeres?",
    options: ["Su fortaleza y resiliencia", "Su inteligencia", "Su compasión", "Todas las anteriores"],
    correct: [3]
  },
  {
    question: "¿Cuál es el mayor logro de una mujer independiente?",
    options: ["Tener éxito económico", "Ser feliz y auténtica", "Cumplir sus propios sueños", "Inspirar a otros"],
    correct: [2, 3]
  },
  {
    question: "¿Qué significa celebrar el Día de la Mujer?",
    options: ["Solo para mujeres", "Reconocer la igualdad y derechos", "Un día de compras", "Nada especial"],
    correct: [1]
  },
  {
    question: "¿Cuál es la mejor forma de apoyar a una mujer?",
    options: ["Escucharla y confiar en ella", "Hablar por ella", "Sobreprotegerla", "Ignorar sus problemas"],
    correct: [0]
  },
  {
    question: "¿Qué representa la distancia en nuestra relación?",
    options: ["Una limitación", "Una prueba de amor", "Una razón para rendirse", "No importa"],
    correct: [1]
  },
  {
    question: "¿Cuál es la mayor fortaleza de una mujer?",
    options: ["Su belleza", "Su inteligencia", "Su capacidad de amar y luchar", "Su independencia"],
    correct: [2, 3]
  },
  {
    question: "¿Qué deberíamos celebrar en cada mujer?",
    options: ["Su apariencia", "Su esencia y carácter", "Sus logros materiales", "Nada en particular"],
    correct: [1]
  },
  {
    question: "¿Cuál es el acto más valiente de una mujer?",
    options: ["Amar sin garantías", "Perseguir sus sueños", "Ser vulnerable", "Todo lo anterior"],
    correct: [3]
  },
];

export default function WomenEmpowermentQuiz({ onBack }: WomenEmpowermentQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    if (questions[currentQ].correct.includes(index)) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
      } else {
        setGameOver(true);
      }
      setShowResult(false);
    }, 1500);
    setShowResult(true);
  };

  const resetGame = () => {
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-pink-900 to-purple-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        data-testid="button-back-quiz"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-sm border border-purple-300/30 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-purple-100 text-sm md:text-base">Volver</span>
      </motion.button>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Heart className="w-12 h-12 md:w-16 md:h-16 text-purple-300 mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold text-purple-100 mb-2">Quiz del Día de la Mujer</h1>
          <p className="text-purple-200/70">Celebrando la fuerza y belleza de la mujer 💜</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!gameOver ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-purple-300/20 mb-8"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-purple-300/70 text-sm">Pregunta {currentQ + 1} de {questions.length}</span>
                  <div className="w-48 h-2 bg-purple-500/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                    />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-purple-50">
                  {questions[currentQ].question}
                </h2>
              </div>

              <div className="space-y-3">
                {questions[currentQ].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedAnswer === null
                        ? "bg-purple-500/20 hover:bg-purple-500/30 border border-purple-300/30 hover:border-purple-300/50 cursor-pointer"
                        : index === selectedAnswer
                        ? questions[currentQ].correct.includes(index)
                          ? "bg-green-500/30 border border-green-400"
                          : "bg-red-500/30 border border-red-400"
                        : questions[currentQ].correct.includes(index)
                        ? "bg-green-500/30 border border-green-400"
                        : "bg-purple-500/20 border border-purple-300/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-purple-50">{option}</span>
                      {showResult && (
                        <>
                          {questions[currentQ].correct.includes(index) && (
                            <Check className="w-5 h-5 text-green-400" />
                          )}
                          {selectedAnswer === index && !questions[currentQ].correct.includes(index) && (
                            <X className="w-5 h-5 text-red-400" />
                          )}
                        </>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="mb-6"
              >
                <Trophy className="w-20 h-20 md:w-24 md:h-24 text-yellow-400 mx-auto" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-purple-100 mb-4">
                ¡Fantástico!
              </h2>
              <p className="text-2xl text-purple-300 mb-4">
                {score} de {questions.length} respuestas
              </p>
              <p className="text-purple-200/70 text-lg mb-8">
                {score === questions.length
                  ? "¡Eres una experta en celebrar a las mujeres! 💜"
                  : score >= questions.length - 2
                  ? "¡Muy bien hecho! Conoces el espíritu del Día de la Mujer 💜"
                  : "¡Buen intento! Ahora sabes más sobre este día especial 💜"}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                data-testid="button-retry"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500/30 hover:bg-purple-500/40 border border-purple-300/50 text-purple-100 font-semibold mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                Jugar de nuevo
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
