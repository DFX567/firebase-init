import { memo, useMemo } from "react";
import "./SpaceBackground.css";

interface SpaceBackgroundProps {
  variant?: "default" | "valentine" | "birthday" | "anniversary" | "friendship";
}

function SpaceBackground({ variant = "default" }: SpaceBackgroundProps) {
  const config = useMemo(() => {
    const configs = {
      default: {
        starSeed: 17,
        cometSeed: 5,
        starCount: 80,
        cometCount: 6,
      },
      valentine: {
        starSeed: 31,
        cometSeed: 12,
        starCount: 90,
        cometCount: 8,
      },
      birthday: {
        starSeed: 47,
        cometSeed: 8,
        starCount: 100,
        cometCount: 7,
      },
      anniversary: {
        starSeed: 23,
        cometSeed: 15,
        starCount: 70,
        cometCount: 5,
      },
      friendship: {
        starSeed: 53,
        cometSeed: 19,
        starCount: 85,
        cometCount: 6,
      },
    };
    return configs[variant];
  }, [variant]);

  const stars = useMemo(() => {
    return Array.from({ length: config.starCount }, (_, i) => ({
      id: i,
      x: (i * config.starSeed + 7) % 100,
      y: (i * (config.starSeed + 6) + 13) % 100,
      size: (i % 4) + 1,
      opacity: 0.25 + (i % 6) * 0.12,
      delay: (i % 10) * 0.4,
    }));
  }, [config]);

  const comets = useMemo(() => {
    return Array.from({ length: config.cometCount }, (_, i) => ({
      id: i,
      x: (i * config.cometSeed + 8) % 85 + 5,
      delay: i * 2.5 + (config.cometSeed % 3),
      duration: 3.5 + (i % 4),
    }));
  }, [config]);

  return (
    <div className={`space-bg space-bg-${variant}`}>
      <div className="space-gradient" />
      
      <div className="space-nebula nebula-1" />
      <div className="space-nebula nebula-2" />
      <div className="space-nebula nebula-3" />

      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
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

      <div className="comets-container">
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

      <div className="planet planet-main" />
      <div className="planet planet-secondary" />
      <div className="planet planet-small" />
    </div>
  );
}

export default memo(SpaceBackground);
