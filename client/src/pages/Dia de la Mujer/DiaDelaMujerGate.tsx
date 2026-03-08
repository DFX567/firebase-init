import { motion } from "framer-motion";

interface DiaDelaMujerGateProps {
  unlockDate: string;
  children: React.ReactNode;
}

export default function DiaDelaMujerGate({
  unlockDate,
  children,
}: DiaDelaMujerGateProps) {
  const now = new Date();
  const unlock = new Date(unlockDate);

  if (now >= unlock) return <>{children}</>;

  const diff = unlock.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return (
    <div className="flex justify-center py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/40 backdrop-blur-xl rounded-3xl p-10 text-center border border-white/20"
      >
        <div className="text-6xl mb-6">👩</div>
        <h2 className="text-3xl font-bold mb-4 text-purple-300">
          Aún no 💜
        </h2>
        <p className="text-white/70 text-lg mb-2">
          Este recuerdo se abrirá en
        </p>
        <p className="text-purple-400 font-bold text-3xl mb-4">
          {days} {days === 1 ? 'día' : 'días'}
        </p>
        <p className="text-sm text-white/50">
          {unlock.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </motion.div>
    </div>
  );
}
