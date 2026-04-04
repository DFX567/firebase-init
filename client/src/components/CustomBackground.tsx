import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { BackgroundConfig, PLANET_COLOR_PRESETS, COMET_DURATIONS } from "@/utils/backgroundConfigs";

interface Props {
  config: BackgroundConfig;
  className?: string;
}

function seeded(seed: number, index: number, range: number): number {
  return ((seed * 9301 + index * 49297 + 233) % 1000) / 1000 * range;
}

function CustomBackground({ config, className = "" }: Props) {
  const stars = useMemo(() => {
    if (!config.stars.enabled) return [];
    return Array.from({ length: config.stars.count }, (_, i) => ({
      id: i,
      x: seeded(config.stars.seed, i * 3, 100),
      y: seeded(config.stars.seed, i * 3 + 1, 100),
      size: seeded(config.stars.seed, i * 3 + 2, 2) + 0.8,
      delay: seeded(config.stars.seed, i + 500, 4),
      duration: seeded(config.stars.seed, i + 1000, 3) + 2,
    }));
  }, [config.stars]);

  const comets = useMemo(() => {
    if (!config.comets.enabled) return [];
    const [minD, maxD] = COMET_DURATIONS[config.comets.speed];
    return Array.from({ length: config.comets.count }, (_, i) => ({
      id: i,
      x: seeded(config.comets.seed, i * 2, 80) + 10,
      delay: seeded(config.comets.seed, i * 2 + 1, 10) + i * 1.5,
      duration: seeded(config.comets.seed, i + 100, maxD - minD) + minD,
    }));
  }, [config.comets]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ background: config.bgGradient }}
    >
      {config.nebulas.map((neb) => (
        <div
          key={neb.id}
          className="absolute rounded-full"
          style={{
            left: `${neb.x}%`,
            top: `${neb.y}%`,
            width: `${neb.sizePercent}%`,
            paddingBottom: `${neb.sizePercent}%`,
            backgroundColor: neb.color,
            opacity: neb.opacity,
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {stars.map((star) => (
        <div
          key={star.id}
          className="bg-star absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: config.stars.color,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {comets.map((comet) => (
        <div
          key={comet.id}
          className="bg-comet absolute"
          style={{
            left: `${comet.x}%`,
            top: "-10px",
            animationDuration: `${comet.duration}s`,
            animationDelay: `${comet.delay}s`,
          }}
        >
          <div className="w-1 h-24 rounded-full"
            style={{
              background: `linear-gradient(to bottom, ${config.stars.color}cc, transparent)`,
              transform: "rotate(135deg)",
            }}
          />
        </div>
      ))}

      {config.planets.map((planet) => {
        const colors = PLANET_COLOR_PRESETS[planet.colorPreset] ?? PLANET_COLOR_PRESETS["Violeta"];
        return (
          <div
            key={planet.id}
            className="absolute"
            style={{
              left: `${planet.x}%`,
              top: `${planet.y}%`,
              width: `${planet.sizePercent}%`,
              paddingBottom: `${planet.sizePercent}%`,
              transform: "translate(-50%, -50%)",
              opacity: planet.opacity,
            }}
          >
            <div className="absolute inset-0 rounded-full" style={{
              background: planet.type === "moon"
                ? `radial-gradient(circle at 35% 35%, ${colors[0]}, ${colors[1]} 60%, ${colors[2]})`
                : `radial-gradient(ellipse at 30% 30%, ${colors[0]} 0%, ${colors[1]} 45%, ${colors[2]} 100%)`,
              boxShadow: `inset -8% -8% 15% rgba(0,0,0,0.6), inset 3% 3% 8% rgba(255,255,255,0.15), 0 0 20% ${colors[1]}40`,
            }}>
              <div
                className="absolute inset-0 rounded-full opacity-30 animate-spin-slow"
                style={{
                  animationDuration: `${planet.rotationSpeed}s`,
                  background: planet.type === "gas"
                    ? `repeating-linear-gradient(0deg,transparent,transparent 8%,rgba(255,255,255,0.05) 8%,rgba(255,255,255,0.05) 12%)`
                    : `radial-gradient(circle at 20% 80%, rgba(0,0,0,0.2) 1%, transparent 2%)`,
                }}
              />
              <div className="absolute inset-0 rounded-full" style={{
                background: `radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 20%, transparent 50%)`,
              }} />
              <div className="absolute inset-0 rounded-full" style={{
                background: `linear-gradient(100deg, transparent 45%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.7) 100%)`,
              }} />
            </div>
            <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{
              background: `radial-gradient(circle, ${colors[1]}30, transparent 60%)`,
              transform: "scale(1.3)",
            }} />
          </div>
        );
      })}
    </div>
  );
}

export default memo(CustomBackground);
