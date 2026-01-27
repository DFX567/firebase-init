import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
  swingAmount: number;
  rotateAmount: number;
  path: 'wave' | 'zigzag' | 'spiral' | 'straight';
}

const heartEmojis = ['❤️', '💕', '💗', '💖', '💘', '💝', '💓', '💞', '🩷', '🩵'];

export default function FloatingHearts({ count = 20 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 18 + 14,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 10,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      swingAmount: Math.random() * 60 + 20,
      rotateAmount: Math.random() * 40 - 20,
      path: ['wave', 'zigzag', 'spiral', 'straight'][Math.floor(Math.random() * 4)] as Heart['path'],
    }));
  }, [count]);

  if (!mounted) return null;

  const getPathAnimation = (heart: Heart) => {
    const baseY = [0, -window.innerHeight - 100];
    
    switch (heart.path) {
      case 'wave':
        return {
          y: baseY,
          x: [0, heart.swingAmount, -heart.swingAmount, heart.swingAmount / 2, 0],
          rotate: [0, heart.rotateAmount, -heart.rotateAmount, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
        };
      case 'zigzag':
        return {
          y: baseY,
          x: [0, heart.swingAmount, -heart.swingAmount, heart.swingAmount, -heart.swingAmount / 2, 0],
          rotate: [0, 15, -15, 10, -10, 0],
        };
      case 'spiral':
        return {
          y: baseY,
          x: [0, heart.swingAmount * 0.5, heart.swingAmount, heart.swingAmount * 0.5, 0, -heart.swingAmount * 0.5, -heart.swingAmount, -heart.swingAmount * 0.5, 0],
          rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          scale: [0.8, 1, 1.2, 1, 0.8],
        };
      case 'straight':
      default:
        return {
          y: baseY,
          x: [0, heart.swingAmount * 0.2, -heart.swingAmount * 0.2, 0],
          rotate: [0, heart.rotateAmount * 0.5, -heart.rotateAmount * 0.5, 0],
        };
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute will-change-transform"
          style={{
            left: `${heart.x}%`,
            bottom: '-60px',
            fontSize: `${heart.size}px`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            ...getPathAnimation(heart),
            opacity: [0, 1, 1, 1, 0.8, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="inline-block"
            animate={{
              scale: [1, 1.15, 1],
              filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {heart.emoji}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
