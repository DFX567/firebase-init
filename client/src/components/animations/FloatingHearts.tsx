import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  wobble: number;
}

export default function FloatingHearts({ count = 20 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 8,
      wobble: Math.random() * 20 - 10,
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
            fontSize: `${heart.size}px`,
            animation: `floatUp ${heart.duration}s ease-in ${heart.delay}s infinite, wobble ${heart.duration * 0.3}s ease-in-out ${heart.delay}s infinite`,
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
          }}
        >
          <span className="inline-block animate-pulse" style={{ animationDuration: '2s' }}>
            ❤️
          </span>
        </div>
      ))}
    </div>
  );
}