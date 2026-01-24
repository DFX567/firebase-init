import { useEffect, useState } from "react";

interface Confetti {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  shape: 'circle' | 'square' | 'triangle';
}

const colors = ['#ff6b9d', '#c44569', '#feca57', '#48dbfb', '#0abde3', '#ee5a6f', '#ff9ff3'];

export default function ConfettiRain({ count = 50 }: { count?: number }) {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const newConfetti = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 5,
      rotation: Math.random() * 360,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
    }));
    setConfetti(newConfetti);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            animation: `fall ${piece.duration}s linear ${piece.delay}s infinite, spin ${piece.duration * 0.5}s linear ${piece.delay}s infinite`,
          }}
        >
          {piece.shape === 'circle' && (
            <div
              className="rounded-full"
              style={{
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.color,
              }}
            />
          )}
          {piece.shape === 'square' && (
            <div
              style={{
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg)`,
              }}
            />
          )}
          {piece.shape === 'triangle' && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: `${piece.size / 2}px solid transparent`,
                borderRight: `${piece.size / 2}px solid transparent`,
                borderBottom: `${piece.size}px solid ${piece.color}`,
                transform: `rotate(${piece.rotation}deg)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
