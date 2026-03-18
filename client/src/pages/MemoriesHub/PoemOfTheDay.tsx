import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";

interface PoemOfTheDayProps {
  onBack: () => void;
}

const poems = [
  {
    title: "En tu mirada",
    text: `En tu mirada encuentro el universo,
estrellas que brillan solo para mí.
Cada instante contigo es un verso,
cada abrazo, un poema sin fin.

No necesito buscar en el cielo
lo que ya tengo aquí, a tu lado.
Eres mi calma, mi suelo,
el amor más real que he encontrado.`,
  },
  {
    title: "Contigo",
    text: `Contigo aprendí que el tiempo se detiene
cuando te miro y sonríes así.
Que el mundo es más bello cuando te tiene
y yo soy más yo cuando estoy aquí.

Cada mañana que llega contigo
es un regalo que no merecí.
Pero te quedo, te abrazo, te digo:
eres lo mejor que me ha pasado a mí.`,
  },
  {
    title: "Pequeñas cosas",
    text: `Son las pequeñas cosas las que pesan,
tu voz al despertar, tu risa al viento.
Las noches que hablamos y no cesan,
y ese silencio lleno de contento.

No hace falta grandes gestos ni poemas
para saber lo mucho que te quiero.
Basta con que estés, y todo tema
se vuelve simple y liviano y verdadero.`,
  },
  {
    title: "Mi lugar favorito",
    text: `Mi lugar favorito no es un sitio,
no tiene coordenadas ni dirección.
Es un espacio cálido y bendito
que solo existe en tu conversación.

Es ese instante cuando me entiendes,
cuando me ves sin necesitar palabras.
Cuando el mundo afuera se suspende
y solo somos tú, yo, y nuestras almas.`,
  },
  {
    title: "Universo paralelo",
    text: `Si existiera un universo paralelo
elegiría el mismo camino otra vez.
Volvería a encontrarte bajo el mismo cielo,
a enamorarme de ti, vez tras vez.

Porque no creo en el azar ni la suerte,
creo en el hilo invisible que nos une.
En que existimos para conocernos fuerte
y en cada vida nuestra historia continúe.`,
  },
  {
    title: "Gracias",
    text: `Gracias por quedarte cuando pude haber perdido,
por elegirme cuando tuviste opciones.
Por amar cada parte de lo que has conocido
y construir conmigo mil razones.

Gracias por los días en que fui difícil,
por la paciencia que nunca terminó.
Por hacer de lo simple algo increíble
y de nosotros, lo mejor que soy.`,
  },
  {
    title: "Esta noche",
    text: `Esta noche el cielo está más claro,
las estrellas parecen más brillantes.
Todo lo que tengo es más raro
y los momentos, más importantes.

Quizás es que pienso en ti de nuevo
y el mundo cambia cuando lo hago.
Que cada vez que te sueño o te veo,
el corazón se vuelve un lago.`,
  },
];

export default function PoemOfTheDay({ onBack }: PoemOfTheDayProps) {
  const dayIndex = new Date().getDay();
  const poem = poems[dayIndex % poems.length];

  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const today = dayNames[new Date().getDay()];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        data-testid="button-back-poem"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-white/70 text-sm md:text-base">Volver</span>
      </motion.button>

      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-5">
            <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-indigo-300" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Poema del Día</h1>
          <p className="text-white/40 text-sm flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            {today}
            <Sparkles className="w-3 h-3 text-yellow-400" />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
          <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-7 md:p-10 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <h2 className="text-xl md:text-2xl font-bold text-white/90 italic">{poem.title}</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-transparent" />
            </div>

            <pre className="whitespace-pre-wrap text-base md:text-lg leading-loose font-light text-white/80 text-center font-sans">
              {poem.text}
            </pre>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-rose-400"
              >
                ❤️
              </motion.span>
              <span className="text-white/30 text-xs uppercase tracking-widest">Con todo mi amor</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="text-rose-400"
              >
                ❤️
              </motion.span>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/25 text-xs mt-6"
        >
          Un poema diferente cada día de la semana
        </motion.p>
      </div>
    </div>
  );
}
