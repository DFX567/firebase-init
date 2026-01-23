import { motion } from "framer-motion";

interface Props {
  unlockDate: string;
  children: React.ReactNode;
}

export default function BirthdayGate({
  unlockDate,
  children,
}: Props) {
  const now = new Date();
  const unlock = new Date(unlockDate);

  if (now >= unlock) return <>{children}</>;

  const diff = unlock.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return (
    <div className="flex items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center bg-black/40 backdrop-blur-xl rounded-3xl p-10"
      >
        <h2 className="text-3xl font-bold mb-4">
          Falta poquito 🎁
        </h2>
        <p className="text-white/70">
          Este recuerdo se abrirá en <br />
          <span className="text-purple-300 font-bold">
            {days} días
          </span>
        </p>
      </motion.div>
    </div>
  );
}