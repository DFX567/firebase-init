import { memo, useMemo } from "react";
import "./SpaceBackground.css";

interface SpaceBackgroundProps {
  variant?: "default" | "valentine" | "birthday" | "anniversary";
}

function SpaceBackground({ variant = "default" }: SpaceBackgroundProps) {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: (i * 17) % 100,
      y: (i * 23) % 100,
      size: (i % 3) + 1,
      opacity: 0.3 + (i % 5) * 0.15,
      delay: (i % 8) * 0.5,
    }));
  }, []);

  const comets = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: (i * 18 + 5) % 100,
      delay: i * 3,
      duration: 4 + (i % 3),
    }));
  }, []);

  const gradientColors = {
    default: "from-indigo-950/80 via-purple-950/60 to-black",
    valentine: "from-rose-950/80 via-pink-950/60 to-black",
    birthday: "from-violet-950/80 via-purple-950/60 to-black",
    anniversary: "from-pink-950/80 via-rose-950/60 to-black",
  };

  const glowColors = {
    default: ["bg-purple-600/15", "bg-pink-600/10", "bg-indigo-600/12"],
    valentine: ["bg-rose-600/15", "bg-pink-600/12", "bg-red-600/10"],
    birthday: ["bg-violet-600/15", "bg-purple-600/12", "bg-indigo-600/10"],
    anniversary: ["bg-pink-600/15", "bg-rose-600/12", "bg-purple-600/10"],
  };

  const colors = glowColors[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientColors[variant]}`} />
      
      <div className={`absolute -top-1/3 -left-1/4 w-[600px] h-[600px] ${colors[0]} rounded-full blur-[80px] space-glow`} />
      <div className={`absolute -bottom-1/3 -right-1/4 w-[700px] h-[700px] ${colors[1]} rounded-full blur-[100px] space-glow-delay`} />
      <div className={`absolute top-1/3 left-1/2 w-[500px] h-[500px] ${colors[2]} rounded-full blur-[90px]`} />

      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white star-twinkle"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {comets.map((comet) => (
          <div
            key={comet.id}
            className="comet"
            style={{
              left: `${comet.x}%`,
              animationDelay: `${comet.delay}s`,
              animationDuration: `${comet.duration}s`,
            }}
          >
            <div className="comet-head" />
            <div className="comet-tail" />
          </div>
        ))}
      </div>

      <div className="planet planet-1" />
      <div className="planet planet-2" />
    </div>
  );
}

export default memo(SpaceBackground);
