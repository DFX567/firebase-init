import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Check, X, Trophy, RotateCcw } from "lucide-react";

interface LoveQuizProps {
  onBack: () => void;
}

const questions = [
  {
    question: "Cual es nuestra cancion especial?",
    options: ["La que suena en nuestro primer baile", "La que cantamos juntos", "La primera que escuchamos juntos", "Todas son especiales"],
    correct: 3
  },
  {
    question: "Que es lo mas importante en una relacion?",
    options: ["Confianza", "Comunicacion", "Amor", "Todo lo anterior"],
    correct: 3
  },
  {
    question: "Cual es el mejor regalo?",
    options: ["Tiempo juntos", "Flores", "Chocolates", "Sorpresas"],
    correct: 0
  },
  {
    question: "Que hace especial nuestra relacion?",
    options: ["Las risas", "El apoyo mutuo", "Los momentos juntos", "Todo"],
    correct: 3
  },
  {
    question: "Cual es la clave del amor duradero?",
    options: ["Paciencia", "Respeto", "Comprension", "Las tres"],
    correct: 3
  }
];

export default function LoveQuiz({ onBack }: LoveQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    if (index === questions[currentQ].correct) {
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
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-pink-900 to-red-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        data-testid="button-back-quiz"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 backdrop-blur-sm border border-rose-300/30 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-rose-100 text-sm md:text-base">Volver</span>
      </motion.button>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Heart className="w-12 h-12 md:w-16 md:h-16 text-rose-300 mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold text-rose-100 mb-2">Quiz del Amor</h1>
          <p className="text-rose-200/70">Demuestra cuanto sabes sobre el amor</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!gameOver ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-rose-300/20"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-rose-200 text-sm">Pregunta {currentQ + 1}/{questions.length}</span>
                <span className="text-rose-300 font-bold">Puntos: {score}</span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-rose-50 mb-8 text-center">
                {questions[currentQ].question}
              </h2>

              <div className="grid gap-3 md:gap-4">
                {questions[currentQ].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                    whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    data-testid={`button-answer-${index}`}
                    className={`w-full p-4 md:p-5 rounded-xl text-left transition-all ${
                      selectedAnswer === null
                        ? "bg-rose-500/20 hover:bg-rose-500/30 border border-rose-300/30"
                        : selectedAnswer === index
                        ? index === questions[currentQ].correct
                          ? "bg-green-500/30 border-2 border-green-400"
                          : "bg-red-500/30 border-2 border-red-400"
                        : index === questions[currentQ].correct && showResult
                        ? "bg-green-500/20 border border-green-400/50"
                        : "bg-rose-500/10 border border-rose-300/20 opacity-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-rose-50 text-sm md:text-base">{option}</span>
                      {showResult && index === questions[currentQ].correct && (
                        <Check className="w-5 h-5 text-green-400" />
                      )}
                      {showResult && selectedAnswer === index && index !== questions[currentQ].correct && (
                        <X className="w-5 h-5 text-red-400" />
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
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-rose-300/20 text-center"
            >
              <Trophy className="w-16 h-16 md:w-24 md:h-24 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-rose-50 mb-4">Resultado Final</h2>
              <p className="text-5xl md:text-7xl font-black text-rose-300 mb-4">{score}/{questions.length}</p>
              <p className="text-rose-200/70 mb-8">
                {score === questions.length 
                  ? "Perfecto! Eres un experto en amor" 
                  : score >= 3 
                  ? "Muy bien! Sabes mucho sobre el amor" 
                  : "Sigue aprendiendo sobre el amor"}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                data-testid="button-restart-quiz"
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-semibold"
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
