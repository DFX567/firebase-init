import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BackgroundConfig, CometIndividual, PlanetConfig,
  PLANET_COLOR_PRESETS, STAR_SPEED_DURATIONS
} from "@/utils/backgroundConfigs";

interface Props {
  config: BackgroundConfig;
  className?: string;
}

function seeded(seed: number, index: number, range: number): number {
  return ((seed * 9301 + index * 49297 + 233) % 1000) / 1000 * range;
}

function hashStr(s: string, n: number): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return (Math.abs(h * (n + 1) * 2654435761) % 1000) / 1000;
}

function CometEl({ comet }: { comet: CometIndividual }) {
  const rad = (comet.angle * Math.PI) / 180;
  const dist = 2000;
  const dx = Math.cos(rad) * dist;
  const dy = Math.sin(rad) * dist;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${comet.startX}%`,
        top: `${comet.startY}%`,
        width: comet.length,
        height: comet.width,
        borderRadius: 999,
        background: `linear-gradient(to right, transparent 0%, ${comet.color}88 50%, ${comet.color} 100%)`,
        rotate: comet.angle,
        transformOrigin: "right center",
      }}
      animate={{ x: [0, dx], y: [0, dy], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: comet.speed,
        repeat: Infinity,
        ease: "linear",
        delay: -(comet.phase * comet.speed),
        opacity: { times: [0, 0.08, 0.92, 1] },
      }}
    />
  );
}

function PlanetEl({ planet }: { planet: PlanetConfig }) {
  const colors = PLANET_COLOR_PRESETS[planet.colorPreset] ?? PLANET_COLOR_PRESETS["Violeta"];

  const surfaceBg = useMemo(() => {
    if (planet.surfaceDetail === "continents") {
      const a = [hashStr(planet.id, 1), hashStr(planet.id, 2), hashStr(planet.id, 3)];
      const b = [hashStr(planet.id, 4), hashStr(planet.id, 5), hashStr(planet.id, 6)];
      const sc = planet.surfaceColor;
      const si = planet.surfaceIntensity;
      return `radial-gradient(ellipse ${50 + a[0]*30}% ${20 + a[1]*20}% at ${20 + a[2]*60}% ${30 + b[0]*40}%, ${sc}${Math.round(si*200).toString(16).padStart(2,"0")} 0%, transparent 75%),
              radial-gradient(ellipse ${30 + b[1]*25}% ${15 + b[2]*15}% at ${50 + hashStr(planet.id,7)*30}% ${20 + hashStr(planet.id,8)*50}%, ${sc}${Math.round(si*160).toString(16).padStart(2,"0")} 0%, transparent 70%),
              radial-gradient(ellipse ${20 + hashStr(planet.id,9)*20}% ${10 + hashStr(planet.id,10)*15}% at ${10 + hashStr(planet.id,11)*70}% ${60 + hashStr(planet.id,12)*30}%, ${sc}${Math.round(si*140).toString(16).padStart(2,"0")} 0%, transparent 65%)`;
    }
    if (planet.surfaceDetail === "icecaps") {
      const si = planet.surfaceIntensity;
      const sc = planet.surfaceColor || "#e0f2fe";
      return `radial-gradient(ellipse 80% ${20 + si*15}% at 50% 0%, ${sc} 0%, transparent 100%),
              radial-gradient(ellipse 70% ${15 + si*10}% at 50% 100%, ${sc} 0%, transparent 100%)`;
    }
    if (planet.surfaceDetail === "storm") {
      const sc = planet.surfaceColor;
      const si = planet.surfaceIntensity;
      return `radial-gradient(ellipse 40% 25% at 50% 50%, ${sc}${Math.round(si*255).toString(16).padStart(2,"0")} 0%, ${sc}44 40%, transparent 70%)`;
    }
    if (planet.surfaceDetail === "lava") {
      const sc = planet.surfaceColor || "#ef4444";
      const si = planet.surfaceIntensity;
      return `radial-gradient(ellipse 20% 50% at 30% 60%, ${sc}${Math.round(si*200).toString(16).padStart(2,"0")} 0%, transparent 60%),
              radial-gradient(ellipse 15% 30% at 70% 30%, ${sc}${Math.round(si*180).toString(16).padStart(2,"0")} 0%, transparent 50%)`;
    }
    return null;
  }, [planet]);

  const craterShadows = useMemo(() => {
    if (planet.surfaceDetail !== "craters") return null;
    const si = planet.surfaceIntensity;
    const shadows = Array.from({ length: 5 }, (_, i) => {
      const cx = hashStr(planet.id, 20 + i * 3);
      const cy = hashStr(planet.id, 21 + i * 3);
      const sz = 3 + hashStr(planet.id, 22 + i * 3) * 8;
      return { cx, cy, sz };
    });
    return shadows.map((cr, i) => (
      <div key={i} className="absolute rounded-full"
        style={{
          left: `${15 + cr.cx * 70}%`,
          top: `${15 + cr.cy * 70}%`,
          width: `${cr.sz}%`,
          height: `${cr.sz}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,${si*0.15}), rgba(0,0,0,${si*0.4}) 60%, transparent 80%)`,
          boxShadow: `inset 1px 1px 2px rgba(255,255,255,${si*0.2}), inset -1px -1px 3px rgba(0,0,0,${si*0.5})`,
        }}
      />
    ));
  }, [planet]);

  return (
    <div
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
      {planet.hasRings && (
        <div className="absolute" style={{
          left: "50%", top: "50%",
          width: "200%", height: "35%",
          transform: "translate(-50%, -50%) rotateX(75deg)",
          borderRadius: "50%",
          border: `6px solid ${planet.ringsColor}`,
          opacity: planet.ringsOpacity,
          boxShadow: `0 0 12px ${planet.ringsColor}60`,
          pointerEvents: "none",
          zIndex: 0,
        }} />
      )}

      {planet.hasAtmosphere && (
        <div className="absolute inset-0 rounded-full" style={{
          transform: `scale(${planet.atmosphereSize})`,
          background: `radial-gradient(circle, transparent 40%, ${planet.atmosphereColor}30 70%, ${planet.atmosphereColor}15 85%, transparent 100%)`,
          filter: `blur(4px)`,
          zIndex: 0,
        }} />
      )}

      <div className="absolute inset-0 rounded-full overflow-hidden" style={{
        background: planet.type === "moon"
          ? `radial-gradient(circle at 35% 35%, ${colors[0]}, ${colors[1]} 60%, ${colors[2]})`
          : `radial-gradient(ellipse at 30% 30%, ${colors[0]} 0%, ${colors[1]} 45%, ${colors[2]} 100%)`,
        boxShadow: `inset -5% -5% 12% rgba(0,0,0,0.65), inset 2% 2% 6% rgba(255,255,255,0.12), 0 0 16px ${colors[1]}30`,
        zIndex: 1,
      }}>
        <div className="absolute inset-0 animate-spin-slow" style={{
          animationDuration: `${planet.rotationSpeed}s`,
          background: planet.type === "gas"
            ? `repeating-linear-gradient(0deg, transparent, transparent 8%, rgba(255,255,255,0.04) 8%, rgba(255,255,255,0.04) 12%)`
            : undefined,
        }} />

        {surfaceBg && (
          <div className="absolute inset-0 animate-spin-slow" style={{
            animationDuration: `${planet.rotationSpeed * 1.3}s`,
            backgroundImage: surfaceBg,
          }} />
        )}

        {planet.surfaceDetail === "craters" && (
          <div className="absolute inset-0">{craterShadows}</div>
        )}

        {planet.surfaceDetail === "storm" && (
          <div className="absolute inset-0 animate-spin-slow" style={{
            animationDuration: `${planet.rotationSpeed * 0.4}s`,
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${planet.surfaceColor}33 60deg, ${planet.surfaceColor}66 120deg, transparent 180deg, ${planet.surfaceColor}33 240deg, transparent 360deg)`,
          }} />
        )}

        {planet.surfaceDetail === "lava" && (
          <div className="absolute inset-0 animate-spin-slow opacity-80" style={{
            animationDuration: `${planet.rotationSpeed * 0.7}s`,
            background: `repeating-linear-gradient(${hashStr(planet.id, 50) * 180}deg, transparent, transparent 15%, ${planet.surfaceColor || "#ef4444"}${Math.round(planet.surfaceIntensity * 90).toString(16).padStart(2, "0")} 16%, transparent 17%)`,
          }} />
        )}

        <div className="absolute inset-0 rounded-full" style={{
          background: `radial-gradient(ellipse at 28% 28%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 25%, transparent 55%)`,
        }} />
        <div className="absolute inset-0 rounded-full" style={{
          background: `linear-gradient(110deg, transparent 40%, rgba(0,0,0,0.45) 68%, rgba(0,0,0,0.65) 100%)`,
        }} />
      </div>

      <div className="absolute inset-0 rounded-full blur-xl opacity-35" style={{
        background: `radial-gradient(circle, ${colors[1]}30, transparent 55%)`,
        transform: "scale(1.35)",
        zIndex: 0,
      }} />
    </div>
  );
}

function CustomBackground({ config, className = "" }: Props) {
  const [minD, maxD] = STAR_SPEED_DURATIONS[config.stars?.speed ?? "medium"];

  const stars = useMemo(() => {
    if (!config.stars.enabled) return [];
    return Array.from({ length: config.stars.count }, (_, i) => ({
      id: i,
      x: seeded(config.stars.seed, i * 3, 100),
      y: seeded(config.stars.seed, i * 3 + 1, 100),
      size: seeded(config.stars.seed, i * 3 + 2, 2.2) + 0.6,
      delay: seeded(config.stars.seed, i + 500, 4),
      duration: seeded(config.stars.seed, i + 1000, maxD - minD) + minD,
    }));
  }, [config.stars, minD, maxD]);

  const driftRad = ((config.stars?.driftAngle ?? 180) * Math.PI) / 180;
  const driftDist = 120;
  const driftDx = Math.cos(driftRad) * driftDist;
  const driftDy = Math.sin(driftRad) * driftDist;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ background: config.bgGradient }}
    >
      {config.nebulas.map((neb) => (
        <div key={neb.id} className="absolute rounded-full" style={{
          left: `${neb.x}%`, top: `${neb.y}%`,
          width: `${neb.sizePercent}%`, paddingBottom: `${neb.sizePercent}%`,
          backgroundColor: neb.color, opacity: neb.opacity,
          filter: "blur(60px)", transform: "translate(-50%, -50%)",
        }} />
      ))}

      {config.stars.enabled && stars.map((star) => {
        const mv = config.stars.movement ?? "twinkle";
        if (mv === "none") {
          return (
            <div key={star.id} className="absolute rounded-full"
              style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, backgroundColor: config.stars.color, opacity: 0.7 }} />
          );
        }
        if (mv === "drift") {
          return (
            <motion.div key={star.id} className="absolute rounded-full"
              style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, backgroundColor: config.stars.color }}
              animate={{ x: [0, driftDx], y: [0, driftDy], opacity: [0, 0.9, 0.9, 0] }}
              transition={{ duration: star.duration, repeat: Infinity, ease: "linear", delay: -(star.delay) }}
            />
          );
        }
        if (mv === "pulse") {
          return (
            <motion.div key={star.id} className="absolute rounded-full"
              style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, backgroundColor: config.stars.color }}
              animate={{ scale: [0.5, 2, 0.5], opacity: [0.1, 1, 0.1] }}
              transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
            />
          );
        }
        return (
          <div key={star.id} className="bg-star absolute rounded-full" style={{
            left: `${star.x}%`, top: `${star.y}%`,
            width: `${star.size}px`, height: `${star.size}px`,
            backgroundColor: config.stars.color,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }} />
        );
      })}

      {config.comets.enabled && config.comets.list.map((comet) => (
        <CometEl key={comet.id} comet={comet} />
      ))}

      {config.planets.map((planet) => (
        <PlanetEl key={planet.id} planet={planet} />
      ))}
    </div>
  );
}

export default memo(CustomBackground);
