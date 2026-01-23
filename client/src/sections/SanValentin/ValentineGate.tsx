import { motion } from "framer-motion";

export default function ValentineGate({
  unlockDate,
  children,
}: {
  unlockDate: string;
  children: React.ReactNode;
}) {
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
        className="bg-black/40 backdrop-blur-xl rounded-3xl p-10 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-rose-300">
          Aún no 💔
        </h2>
        <p className="text-white/70">
          Este recuerdo se abrirá en<br />
          <span className="text-rose-400 font-bold">
            {days} días
          </span>
        </p>
      </motion.div>
    </div>
  );
}