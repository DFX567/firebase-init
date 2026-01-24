import { motion } from "framer-motion";
import { useState } from "react";
import { LogIn } from "lucide-react";
import ShootingStars from "@/components/animations/ShootingStars";

interface LoginScreenProps {
  onLogin: () => Promise<void>;
  error: string | null;
}

export default function LoginScreen({ onLogin, error }: LoginScreenProps) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await onLogin();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex items-center justify-center px-6">
      {/* Shooting Stars Background */}
      <ShootingStars count={30} />

      {/* Aurora effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border border-white/20"
      >
        {/* Glow effect on card */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl" />

        {/* Title with animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mb-8"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="text-6xl mb-4"
          >
            💫
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
            Nuestro Refugio
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-lg"
          >
            Este lugar existe solo para nosotros dos
          </motion.p>
        </motion.div>

        {/* Login Button with enhanced animation */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          onClick={handleLogin}
          disabled={loading}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="relative w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-full text-lg font-bold shadow-lg shadow-pink-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden group"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Cargando...</span>
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>Entrar con Google</span>
            </>
          )}
        </motion.button>

        {/* Error Message with animation */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-sm bg-rose-500/10 border border-rose-500/20 rounded-lg p-3"
          >
            <p className="text-rose-300">{error}</p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white/50 text-xs mt-8"
        >
          Acceso privado solo para parejas autorizadas
        </motion.p>
      </motion.div>
    </div>
  );
}