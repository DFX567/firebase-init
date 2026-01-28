import { useMemo, memo } from "react";
import { motion } from "framer-motion";

interface ConfettiRainProps {
  count?: number;
}

const colors = ['#ff6b9d', '#c44569', '#feca57', '#48dbfb', '#a29bfe', '#fd79a8'];

function ConfettiRain({ count = 20 }: ConfettiRainProps) {
  const confetti = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[i % colors.length],
      size: Math.random() * 6 + 4,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 6,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-full"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
          }}
          animate={{
            y: [0, 1200],
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default memo(ConfettiRain);
