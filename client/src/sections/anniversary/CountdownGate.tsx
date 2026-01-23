import { motion } from "framer-motion";

interface Props {
  unlockDate: string; // YYYY-MM-DD
  children: React.ReactNode;
}

export default function AnniversaryGate({ unlockDate, children }: Props) {
  const now = new Date();
  const unlock = new Date(unlockDate);

  if (now >= unlock) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <h1 className="text-4xl font-bold mb-4">Aún no 💜</h1>
        <p className="text-white/70">
          Este recuerdo se abrirá el <br />
          <span className="font-bold">{unlock.toDateString()}</span>
        </p>
      </motion.div>
    </div>
  );
}