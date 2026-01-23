import { motion } from "framer-motion";
import StarField from "@/components/StarField";

type Section = "anniversary" | "cumple" | "sanvalentin";

interface Props {
  onSelect: (section: Section) => void;
}

const cards = [
  {
    id: "anniversary",
    title: "Aniversario",
    emoji: "💍",
    desc: "Cartas, poemas y recuerdos por año",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: "cumple",
    title: "Cumpleaños",
    emoji: "🎂",
    desc: "Cada año, un recuerdo especial",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    id: "sanvalentin",
    title: "San Valentín",
    emoji: "❤️",
    desc: "El amor en su forma más intensa",
    gradient: "from-red-500 to-pink-600",
  },
];

export default function Hub({ onSelect }: Props) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white">
      <StarField count={60} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-14 text-center"
        >
          Nuestro Universo ✨
        </motion.h1>

        <div className="grid gap-6 w-full max-w-4xl md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.button
              key={card.id}
              onClick={() => onSelect(card.id as Section)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-3xl p-8 text-left bg-gradient-to-br ${card.gradient} shadow-xl`}
            >
              <div className="text-4xl mb-4">{card.emoji}</div>
              <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
              <p className="text-white/90 text-sm">{card.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}