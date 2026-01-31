import { memo, useMemo } from "react";
import "./SpaceBackground.css";

interface SpaceBackgroundProps {
  variant?: "default" | "valentine" | "birthday" | "anniversary" | "friendship";
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
    default: "from-indigo-950/90 via-purple-950/80 to-black",
    valentine: "from-rose-950/90 via-red-950/80 to-black",
    birthday: "from-violet-950/90 via-purple-950/80 to-black",
    anniversary: "from-amber-950/90 via-orange-950/80 to-black",
    friendship: "from-cyan-950/90 via-teal-950/80 to-black",
  };

  const glowColors = {
    default: ["bg-purple-500/20", "bg-indigo-500/15", "bg-violet-500/12"],
    valentine: ["bg-rose-500/20", "bg-red-500/15", "bg-pink-500/12"],
    birthday: ["bg-violet-500/20", "bg-purple-500/15", "bg-fuchsia-500/12"],
    anniversary: ["bg-amber-500/20", "bg-orange-500/15", "bg-yellow-500/12"],
    friendship: ["bg-cyan-500/20", "bg-teal-500/15", "bg-emerald-500/12"],
  };

  const colors = glowColors[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientColors[variant]}`} />
      
      <div className={`absolute -top-1/3 -left-1/4 w-[600px] h-[600px] ${colors[0]} rounded-full blur-[100px] space-glow`} />
      <div className={`absolute -bottom-1/3 -right-1/4 w-[700px] h-[700px] ${colors[1]} rounded-full blur-[120px] space-glow-delay`} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${colors[2]} rounded-full blur-[100px]`} />

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
            className={`comet comet-${variant}`}
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

      <div className={`planet planet-1 planet-1-${variant}`} />
      <div className={`planet planet-2 planet-2-${variant}`} />
    </div>
  );
}

export default memo(SpaceBackground);
