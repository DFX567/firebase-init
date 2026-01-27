import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Confetti {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'ribbon';
  swingAmount: number;
  path: 'fall' | 'flutter' | 'spiral' | 'cascade';
}

const colors = ['#ff6b9d', '#c44569', '#feca57', '#48dbfb', '#0abde3', '#ee5a6f', '#ff9ff3', '#a29bfe', '#fd79a8', '#00cec9'];

export default function ConfettiRain({ count = 50 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const confetti = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
      shape: ['circle', 'square', 'triangle', 'star', 'ribbon'][Math.floor(Math.random() * 5)] as Confetti['shape'],
      swingAmount: Math.random() * 80 + 30,
      path: ['fall', 'flutter', 'spiral', 'cascade'][Math.floor(Math.random() * 4)] as Confetti['path'],
    }));
  }, [count]);

  if (!mounted) return null;

  const getPathAnimation = (piece: Confetti, windowHeight: number) => {
    const baseY = [0, windowHeight + 100];
    
    switch (piece.path) {
      case 'flutter':
        return {
          y: baseY,
          x: [0, piece.swingAmount, -piece.swingAmount, piece.swingAmount * 0.5, -piece.swingAmount * 0.5, 0],
          rotate: [0, 180, 360, 540, 720],
          scale: [1, 0.8, 1.1, 0.9, 1],
        };
      case 'spiral':
        return {
          y: baseY,
          x: [0, piece.swingAmount, 0, -piece.swingAmount, 0, piece.swingAmount * 0.5, 0],
          rotate: [0, 360, 720, 1080],
        };
      case 'cascade':
        return {
          y: baseY,
          x: [0, piece.swingAmount * 0.3, piece.swingAmount * 0.6, piece.swingAmount],
          rotate: [piece.rotation, piece.rotation + 180, piece.rotation + 360],
        };
      case 'fall':
      default:
        return {
          y: baseY,
          x: [0, piece.swingAmount * 0.2, -piece.swingAmount * 0.2, 0],
          rotate: [piece.rotation, piece.rotation + 360],
        };
    }
  };

  const renderShape = (piece: Confetti) => {
    switch (piece.shape) {
      case 'circle':
        return (
          <div
            className="rounded-full"
            style={{
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              boxShadow: `0 0 ${piece.size / 2}px ${piece.color}40`,
            }}
          />
        );
      case 'square':
        return (
          <div
            className="rounded-sm"
            style={{
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${piece.size / 2}px solid transparent`,
              borderRight: `${piece.size / 2}px solid transparent`,
              borderBottom: `${piece.size}px solid ${piece.color}`,
            }}
          />
        );
      case 'star':
        return (
          <div
            style={{
              fontSize: `${piece.size}px`,
              color: piece.color,
              textShadow: `0 0 ${piece.size / 2}px ${piece.color}`,
            }}
          >
            *
          </div>
        );
      case 'ribbon':
        return (
          <div
            className="rounded-full"
            style={{
              width: `${piece.size * 2}px`,
              height: `${piece.size / 3}px`,
              backgroundColor: piece.color,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute will-change-transform"
          style={{
            left: `${piece.x}%`,
            top: '-30px',
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            ...getPathAnimation(piece, typeof window !== 'undefined' ? window.innerHeight : 1000),
            opacity: [0, 1, 1, 1, 0.5, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderShape(piece)}
        </motion.div>
      ))}
    </div>
  );
}
