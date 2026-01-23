import { motion } from "framer-motion";
import StarField from "./StarField";

interface Props {
  onLogin: () => void;
  error: string | null;
}

export default function LoginScreen({ onLogin, error }: Props) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#020617] to-black flex items-center justify-center px-6">
      
      {/* Estrellas */}
      <StarField count={45} />

      {/* Tarjeta */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border border-white/20"
      >
        <h1 className="text-4xl font-bold text-white mb-6">
          Nuestro Refugio 💫
        </h1>

        <p className="text-white/80 text-lg mb-10">
          Este lugar existe solo para nosotros dos
        </p>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={onLogin}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-full text-xl font-bold shadow-lg transition"
        >
          Entrar con Google
        </motion.button>

        {error && (
          <p className="text-red-300 mt-6 text-sm">
            {error}
          </p>
        )}
      </motion.div>
    </div>
  );
}