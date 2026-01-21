import { motion } from "framer-motion";

interface Props {
  onLogin: () => void;
  errorMsg: string | null;
}

export default function LoginScreen({ onLogin, errorMsg }: Props) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#020617] to-black flex items-center justify-center px-6">
      
      {/* Estrellas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/70 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Tarjeta */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border border-white/20"
      >
        <h1 className="text-4xl font-bold text-white mb-6">
          Nuestro Refugio 💫
        </h1>

        <p className="text-white/80 text-lg mb-10">
          Este lugar existe solo para nosotros dos
        </p>

        <button
          onClick={onLogin}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-full text-xl font-bold shadow-lg transition transform hover:scale-105"
        >
          Entrar con Google
        </button>

        {errorMsg && (
          <p className="text-red-300 mt-6 text-sm">
            {errorMsg}
          </p>
        )}
      </motion.div>
    </div>
  );
}