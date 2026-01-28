import { useMemo, memo } from "react";
import { motion } from "framer-motion";

interface FloatingHeartsProps {
  count?: number;
}

const heartEmojis = ['❤️', '💕', '💗', '💖'];

function FloatingHearts({ count = 12 }: FloatingHeartsProps) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 12 + 10,
      duration: Math.random() * 6 + 10,
      delay: Math.random() * 8,
      emoji: heartEmojis[i % heartEmojis.length],
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: '-40px',
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: [0, -1200],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
}

export default memo(FloatingHearts);
