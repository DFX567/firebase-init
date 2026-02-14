import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Trophy, RotateCcw, Sparkles, Star } from "lucide-react";

interface MemoryTimelineProps {
  onBack: () => void;
}

const loveWords = [
  { word: "AMOR", hint: "El sentimiento más poderoso del universo" },
  { word: "BESO", hint: "Lo primero que quiero darte cuando nos veamos" },
  { word: "ABRAZO", hint: "Lo que más extraño de ti" },
  { word: "LINA", hint: "El nombre más hermoso del mundo" },
  { word: "NOSOTROS", hint: "Lo más importante en mi vida" },
  { word: "JUNTOS", hint: "Como quiero estar contigo siempre" },
  { word: "FUTURO", hint: "Lo que construiremos de la mano" },
  { word: "HOGAR", hint: "Donde quiero vivir contigo" },
  { word: "FAMILIA", hint: "Lo que quiero formar a tu lado" },
  { word: "DISTANCIA", hint: "Algo temporal que no puede contra nuestro amor" },
  { word: "VIDEOJUEGOS", hint: "Nuestra forma favorita de pasar tiempo juntos" },
  { word: "CUCHURRUMIN", hint: "Mi apodo favorito que me dices" },
  { word: "PACIENCIA", hint: "Lo que demostramos esperando vernos" },
  { word: "CONFIANZA", hint: "La base de nuestra relación" },
  { word: "ETERNIDAD", hint: "Cuánto tiempo quiero amarte" },
  { word: "SUEÑO", hint: "Estar contigo es cumplir el mío" },
  { word: "CORAZON", hint: "Lo que late solo por ti" },
  { word: "SONRISA", hint: "Lo que provocas en mí cada día" },
  { word: "FELICIDAD", hint: "Lo que siento cuando pienso en ti" },
  { word: "PROMESA", hint: "Amarte siempre es mi mayor..." },
  { word: "NOVIEMBRE", hint: "El mes en que nos hicimos novios" },
  { word: "WHATSAPP", hint: "Donde nos conocimos" },
  { word: "ESPERAR", hint: "Lo que haré el tiempo que sea necesario" },
  { word: "SIEMPRE", hint: "Por cuánto tiempo te amaré" },
  { word: "DESTINO", hint: "Lo que nos unió" },
];

const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

export default function MemoryTimeline({ onBack }: MemoryTimelineProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [score, setScore] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const maxWrongGuesses = 6;
  const currentWord = loveWords[currentWordIndex].word;
  const currentHint = loveWords[currentWordIndex].hint;

  useEffect(() => {
    checkGameStatus();
  }, [guessedLetters, wrongGuesses]);

  const checkGameStatus = () => {
    // Check if won
    const wordComplete = currentWord.split("").every((letter) => guessedLetters.includes(letter));
    if (wordComplete && !gameWon && !gameLost) {
      setGameWon(true);
      setScore(score + (maxWrongGuesses - wrongGuesses) * 10);
      setWordsCompleted(wordsCompleted + 1);
    }

    // Check if lost
    if (wrongGuesses >= maxWrongGuesses && !gameLost) {
      setGameLost(true);
    }
  };

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || gameWon || gameLost) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!currentWord.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const nextWord = () => {
    setCurrentWordIndex((currentWordIndex + 1) % loveWords.length);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameWon(false);
    setGameLost(false);
    setShowHint(false);
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameWon(false);
    setGameLost(false);
    setScore(0);
    setWordsCompleted(0);
    setShowHint(false);
  };

  const revealHint = () => {
    setShowHint(true);
  };

  const getHeartColor = (index: number) => {
    if (index < wrongGuesses) return "text-gray-400";
    return "text-rose-500 fill-rose-500";
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

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-rose-300 mx-auto mb-3" />
          <h1 className="text-2xl md:text-4xl font-bold text-rose-100 mb-2">Palabras de Amor</h1>
          <p className="text-rose-200/70 text-sm">Adivina las palabras que describen nuestro amor</p>
        </motion.div>

        <div className="flex justify-between items-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-rose-300/20">
            <p className="text-rose-200 text-sm">Puntos: <span className="font-bold text-rose-100">{score}</span></p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-rose-300/20">
            <p className="text-rose-200 text-sm">Completadas: <span className="font-bold text-rose-100">{wordsCompleted}</span></p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!gameWon && !gameLost ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Vidas (corazones) */}
              <div className="flex justify-center gap-2">
                {Array.from({ length: maxWrongGuesses }).map((_, index) => (
                  <Heart
                    key={index}
                    className={`w-8 h-8 transition-colors ${getHeartColor(index)}`}
                  />
                ))}
              </div>

              {/* Palabra a adivinar */}
              <div className="flex justify-center gap-2 md:gap-3 flex-wrap">
                {currentWord.split("").map((letter, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-12 h-16 md:w-14 md:h-20 bg-white/10 backdrop-blur-sm border-2 border-rose-300/30 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-3xl md:text-4xl font-bold text-rose-100">
                      {guessedLetters.includes(letter) ? letter : ""}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Pista */}
              <div className="text-center">
                {!showHint ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={revealHint}
                    className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl border border-purple-300/30 text-purple-200 text-sm flex items-center gap-2 mx-auto"
                  >
                    <Star className="w-4 h-4" />
                    Ver pista
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-purple-500/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-purple-300/30"
                  >
                    <p className="text-purple-200 text-sm italic">💡 {currentHint}</p>
                  </motion.div>
                )}
              </div>

              {/* Teclado */}
              <div className="grid grid-cols-7 gap-2">
                {alphabet.map((letter) => {
                  const isGuessed = guessedLetters.includes(letter);
                  const isCorrect = isGuessed && currentWord.includes(letter);
                  const isWrong = isGuessed && !currentWord.includes(letter);

                  return (
                    <motion.button
                      key={letter}
                      whileHover={{ scale: isGuessed ? 1 : 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLetterGuess(letter)}
                      disabled={isGuessed}
                      className={`aspect-square rounded-lg font-bold text-lg transition-all ${
                        isCorrect
                          ? "bg-green-500/30 border-2 border-green-400 text-green-200"
                          : isWrong
                          ? "bg-red-500/30 border-2 border-red-400 text-red-200"
                          : "bg-rose-500/20 border border-rose-300/30 text-rose-100 hover:bg-rose-500/30"
                      }`}
                    >
                      {letter}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-rose-300/20 text-center"
            >
              {gameWon ? (
                <>
                  <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold text-rose-50 mb-4">¡Correcto!</h2>
                  <p className="text-2xl text-rose-200 mb-4 font-semibold">{currentWord}</p>
                  <p className="text-rose-300/70 mb-6 italic">{currentHint}</p>
                  <p className="text-rose-200 mb-8">
                    +{(maxWrongGuesses - wrongGuesses) * 10} puntos
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextWord}
                    data-testid="button-next-word"
                    className="px-8 py-3 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-semibold"
                  >
                    Siguiente Palabra
                  </motion.button>
                </>
              ) : (
                <>
                  <Heart className="w-20 h-20 text-rose-400 mx-auto mb-6 fill-rose-400" />
                  <h2 className="text-3xl md:text-4xl font-bold text-rose-50 mb-4">Palabra Perdida</h2>
                  <p className="text-2xl text-rose-200 mb-4 font-semibold">{currentWord}</p>
                  <p className="text-rose-300/70 mb-8 italic">{currentHint}</p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextWord}
                      data-testid="button-next-word"
                      className="px-6 py-3 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-semibold"
                    >
                      Siguiente Palabra
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetGame}
                      data-testid="button-restart-timeline"
                      className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-semibold"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Reiniciar
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {wordsCompleted >= 5 && !gameWon && !gameLost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <p className="text-rose-200 mb-4">¡Has completado {wordsCompleted} palabras! 🎉</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-semibold"
            >
              <RotateCcw className="w-5 h-5" />
              Jugar de nuevo
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
