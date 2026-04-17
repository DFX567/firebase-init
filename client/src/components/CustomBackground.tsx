import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BackgroundConfig, CometIndividual, PlanetConfig, SurfaceDetail,
  PLANET_COLOR_PRESETS, STAR_SPEED_DURATIONS,
} from "@/utils/backgroundConfigs";

interface Props { config: BackgroundConfig; className?: string; }

function seeded(seed: number, i: number, range: number): number {
  return ((seed * 9301 + i * 49297 + 233) % 1000) / 1000 * range;
}
function hs(s: string, n: number): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return (Math.abs(h * (n + 1) * 2654435761) % 1000) / 1000;
}

function CometEl({ comet }: { comet: CometIndividual }) {
  const animId = `comet_${comet.id}`;
  const rad = (comet.angle * Math.PI) / 180;
  const tx = Math.cos(rad) * 2200;
  const ty = Math.sin(rad) * 2200;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ${animId} {
          0%   { transform: translate(0px,0px); opacity:0; }
          7%   { opacity:1; }
          93%  { opacity:1; }
          100% { transform: translate(${tx}px,${ty}px); opacity:0; }
        }
      ` }} />
      <div style={{
        position: "absolute",
        left: `${comet.startX}%`,
        top: `${comet.startY}%`,
        animation: `${animId} ${comet.speed}s linear ${-(comet.phase * comet.speed)}s infinite`,
        willChange: "transform, opacity",
        pointerEvents: "none",
      }}>
        <div style={{
          width: comet.length,
          height: comet.width,
          borderRadius: 999,
          background: `linear-gradient(to right, transparent 0%, ${comet.color}60 40%, ${comet.color} 100%)`,
          transform: `rotate(${comet.angle}deg)`,
          transformOrigin: "right center",
          boxShadow: `0 0 ${comet.width * 2}px ${comet.color}80`,
        }} />
      </div>
    </>
  );
}

function SurfaceLayer({ detail, planet, index }: { detail: SurfaceDetail; planet: PlanetConfig; index: number }) {
  const { id, surfaceColor: sc, surfaceIntensity: si, rotationSpeed } = planet;
  const h = (n: number) => hs(id, n + index * 31);
  const siHex = Math.round(si * 220).toString(16).padStart(2, "0");
  const siHex2 = Math.round(si * 150).toString(16).padStart(2, "0");

  const speedMultipliers: Record<SurfaceDetail, number> = {
    continents: 1.4, ocean: 1.2, vegetation: 1.6, craters: 0,
    storm: 0.35, lava: 0.7, icecaps: 2, clouds: 0.55, sand: 1.8, cracks: 0,
  };
  const mult = speedMultipliers[detail];
  const animClass = mult === 0 ? "" : "animate-spin-slow";
  const animStyle = mult === 0 ? {} : { animationDuration: `${rotationSpeed * mult}s` };

  if (detail === "continents") {
    const blobs = Array.from({ length: 4 }, (_, i) => ({
      w: 30 + h(i * 4) * 40, h2: 15 + h(i * 4 + 1) * 25,
      x: 10 + h(i * 4 + 2) * 80, y: 10 + h(i * 4 + 3) * 80,
    }));
    return (
      <div className={`absolute inset-0 overflow-hidden rounded-full ${animClass}`} style={animStyle}>
        {blobs.map((b, i) => (
          <div key={i} className="absolute" style={{
            left: `${b.x}%`, top: `${b.y}%`,
            width: `${b.w}%`, height: `${b.h2}%`,
            transform: "translate(-50%,-50%)",
            borderRadius: `${40 + h(i + 20) * 30}% ${60 - h(i + 21) * 20}% ${50 + h(i + 22) * 20}% ${45 + h(i + 23) * 25}%`,
            backgroundColor: `${sc}${siHex}`,
          }} />
        ))}
      </div>
    );
  }

  if (detail === "ocean") {
    return (
      <div className={`absolute inset-0 overflow-hidden rounded-full ${animClass}`} style={animStyle}>
        <div className="absolute inset-0 rounded-full" style={{
          background: `radial-gradient(ellipse ${60 + h(1) * 25}% ${40 + h(2) * 20}% at ${30 + h(3) * 40}% ${40 + h(4) * 20}%, ${sc}${siHex} 0%, transparent 70%)`,
        }} />
        <div className="absolute inset-0 rounded-full" style={{
          background: `radial-gradient(ellipse ${40 + h(5) * 20}% ${30 + h(6) * 15}% at ${60 + h(7) * 25}% ${55 + h(8) * 25}%, ${sc}${siHex2} 0%, transparent 65%)`,
        }} />
      </div>
    );
  }

  if (detail === "vegetation") {
    return (
      <div className={`absolute inset-0 overflow-hidden rounded-full ${animClass}`} style={animStyle}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="absolute" style={{
            left: `${5 + h(i * 3) * 85}%`, top: `${5 + h(i * 3 + 1) * 85}%`,
            width: `${15 + h(i * 3 + 2) * 25}%`, height: `${10 + h(i + 15) * 20}%`,
            transform: "translate(-50%,-50%)",
            borderRadius: "40% 60% 55% 45%",
            backgroundColor: `${sc}${siHex}`,
          }} />
        ))}
      </div>
    );
  }

  if (detail === "craters") {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {Array.from({ length: 6 }, (_, i) => {
          const cx = 12 + h(i * 3) * 76;
          const cy = 12 + h(i * 3 + 1) * 76;
          const sz = 4 + h(i * 3 + 2) * 12;
          return (
            <div key={i} className="absolute rounded-full" style={{
              left: `${cx}%`, top: `${cy}%`,
              width: `${sz}%`, height: `${sz}%`,
              transform: "translate(-50%,-50%)",
              background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,${si * 0.2}), rgba(0,0,0,${si * 0.55}) 60%, transparent 80%)`,
              boxShadow: `inset 1px 1px 2px rgba(255,255,255,${si * 0.25}), inset -1px -1px 3px rgba(0,0,0,${si * 0.6})`,
            }} />
          );
        })}
      </div>
    );
  }

  if (detail === "storm") {
    return (
      <>
        <div className={`absolute inset-0 overflow-hidden rounded-full ${animClass}`} style={{ ...animStyle, animationDirection: "reverse" }}>
          <div className="absolute inset-0 rounded-full" style={{
            background: `conic-gradient(from 0deg at ${40 + h(1) * 20}% ${40 + h(2) * 20}%, transparent 0deg, ${sc}${siHex} 60deg, ${sc}${siHex2} 120deg, transparent 180deg, ${sc}${Math.round(si * 100).toString(16).padStart(2, "0")} 240deg, transparent 360deg)`,
          }} />
        </div>
        <div className={`absolute inset-0 overflow-hidden rounded-full ${animClass}`} style={animStyle}>
          <div className="absolute rounded-full" style={{
            left: `${35 + h(3) * 20}%`, top: `${35 + h(4) * 20}%`,
            width: "28%", height: "18%",
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(ellipse, ${sc}${siHex} 0%, transparent 70%)`,
          }} />
        </div>
      </>
    );
  }

  if (detail === "lava") {
    return (
      <>
        <div className={`absolute inset-0 overflow-hidden rounded-full opacity-80 ${animClass}`} style={animStyle}>
          <div className="absolute inset-0 rounded-full" style={{
            background: `repeating-linear-gradient(${h(1) * 120 + 20}deg, transparent, transparent 14%, ${sc}${siHex} 15%, transparent 16%)`,
          }} />
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 rounded-full" style={{
            background: `radial-gradient(circle at ${20 + h(2) * 60}% ${20 + h(3) * 60}%, ${sc}${Math.round(si * 120).toString(16).padStart(2, "0")} 0%, transparent 40%)`,
            filter: `blur(4px)`,
          }} />
        </div>
      </>
    );
  }

  if (detail === "icecaps") {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute inset-0 rounded-full" style={{
          background: `radial-gradient(ellipse 90% ${15 + si * 15}% at 50% 0%, ${sc}ee 0%, ${sc}88 40%, transparent 80%),
                       radial-gradient(ellipse 80% ${12 + si * 12}% at 50% 100%, ${sc}ee 0%, ${sc}88 40%, transparent 80%)`,
        }} />
      </div>
    );
  }

  if (detail === "clouds") {
    return (
      <div className={`absolute inset-0 overflow-hidden rounded-full ${animClass}`} style={animStyle}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="absolute" style={{
            left: `${h(i * 3) * 100}%`, top: `${10 + h(i * 3 + 1) * 80}%`,
            width: `${25 + h(i * 3 + 2) * 40}%`, height: `${8 + h(i + 15) * 10}%`,
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            backgroundColor: `${sc}${siHex}`,
            filter: "blur(3px)",
          }} />
        ))}
      </div>
    );
  }

  if (detail === "sand") {
    return (
      <div className={`absolute inset-0 overflow-hidden rounded-full ${animClass}`} style={animStyle}>
        <div className="absolute inset-0 rounded-full" style={{
          background: `repeating-linear-gradient(${h(1) * 60 + 60}deg, transparent, transparent 12%, ${sc}${siHex2} 13%, transparent 14%),
                       repeating-linear-gradient(${h(2) * 60 + 90}deg, transparent, transparent 18%, ${sc}${Math.round(si * 80).toString(16).padStart(2, "0")} 19%, transparent 20%)`,
        }} />
      </div>
    );
  }

  if (detail === "cracks") {
    return (
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute inset-0 rounded-full" style={{
          backgroundImage: Array.from({ length: 5 }, (_, i) =>
            `linear-gradient(${h(i) * 360}deg, transparent ${40 + h(i + 5) * 20}%, ${sc}${siHex} ${51}%, transparent ${52 + h(i + 10) * 10}%)`
          ).join(", "),
        }} />
      </div>
    );
  }

  return null;
}

function PlanetEl({ planet }: { planet: PlanetConfig }) {
  const colors = PLANET_COLOR_PRESETS[planet.colorPreset] ?? PLANET_COLOR_PRESETS["Violeta"];

  const ringStyle = {
    position: "absolute" as const,
    left: "50%", top: "50%",
    width: "230%", height: "38%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    border: `${planet.ringsWidth}px solid ${planet.ringsColor}`,
    opacity: planet.ringsOpacity,
    boxShadow: `0 0 10px ${planet.ringsColor}50, inset 0 0 6px ${planet.ringsColor}30`,
    pointerEvents: "none" as const,
  };

  return (
    <div className="absolute" style={{
      left: `${planet.x}%`, top: `${planet.y}%`,
      width: `${planet.sizePercent}%`, paddingBottom: `${planet.sizePercent}%`,
      transform: "translate(-50%, -50%)",
      opacity: planet.opacity,
    }}>
      {/* Atmosphere glow (below everything) */}
      {planet.hasAtmosphere && (
        <div className="absolute inset-0" style={{
          transform: `scale(${planet.atmosphereSize})`,
          borderRadius: "50%",
          background: `radial-gradient(circle, transparent 38%, ${planet.atmosphereColor}28 65%, ${planet.atmosphereColor}12 80%, transparent 100%)`,
          filter: "blur(5px)",
          zIndex: 0,
        }} />
      )}

      {/* BACK half of rings — z-index 1, clip top half only */}
      {planet.hasRings && (
        <div style={{ ...ringStyle, zIndex: 1, clipPath: "inset(0 0 50% 0)" }} />
      )}

      {/* Planet body — z-index 2 */}
      <div className="absolute inset-0 rounded-full overflow-hidden" style={{
        background: planet.type === "moon"
          ? `radial-gradient(circle at 35% 35%, ${colors[0]}, ${colors[1]} 55%, ${colors[2]})`
          : `radial-gradient(ellipse at 30% 28%, ${colors[0]} 0%, ${colors[1]} 45%, ${colors[2]} 100%)`,
        boxShadow: `inset -5% -5% 14% rgba(0,0,0,0.7), inset 2% 2% 7% rgba(255,255,255,0.12), 0 0 18px ${colors[1]}28`,
        zIndex: 2,
      }}>
        {/* Gas bands for gas type */}
        {planet.type === "gas" && (
          <div className="absolute inset-0 animate-spin-slow" style={{
            animationDuration: `${planet.rotationSpeed}s`,
            background: `repeating-linear-gradient(0deg, transparent, transparent 7%, rgba(255,255,255,0.035) 7%, rgba(255,255,255,0.035) 11%)`,
          }} />
        )}

        {/* Surface detail layers */}
        {planet.surfaceDetails.map((detail, idx) => (
          <SurfaceLayer key={detail + idx} detail={detail} planet={planet} index={idx} />
        ))}

        {/* Highlight */}
        <div className="absolute inset-0 rounded-full" style={{
          background: `radial-gradient(ellipse at 28% 25%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.12) 25%, transparent 55%)`,
          zIndex: 10,
        }} />
        {/* Shadow */}
        <div className="absolute inset-0 rounded-full" style={{
          background: `linear-gradient(112deg, transparent 38%, rgba(0,0,0,0.48) 68%, rgba(0,0,0,0.7) 100%)`,
          zIndex: 10,
        }} />
      </div>

      {/* FRONT half of rings — z-index 3, clip bottom half only */}
      {planet.hasRings && (
        <div style={{ ...ringStyle, zIndex: 3, clipPath: "inset(50% 0 0 0)" }} />
      )}

      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full blur-xl" style={{
        background: `radial-gradient(circle, ${colors[1]}25, transparent 55%)`,
        transform: "scale(1.4)",
        zIndex: 0,
      }} />
    </div>
  );
}

function CustomBackground({ config, className = "" }: Props) {
  const [minD, maxD] = STAR_SPEED_DURATIONS[config.stars?.speed ?? "medium"];

  const seedStars = useMemo(() => {
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
  const driftDx = Math.cos(driftRad) * 130;
  const driftDy = Math.sin(driftRad) * 130;
  const mv = config.stars?.movement ?? "twinkle";

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ background: config.bgGradient }}>

      {/* Nebulas */}
      {config.nebulas.map((neb) => (
        <div key={neb.id} className="absolute rounded-full" style={{
          left: `${neb.x}%`, top: `${neb.y}%`,
          width: `${neb.sizePercent}%`, paddingBottom: `${neb.sizePercent}%`,
          backgroundColor: neb.color, opacity: neb.opacity,
          filter: "blur(60px)", transform: "translate(-50%, -50%)",
        }} />
      ))}

      {/* Seed-based stars */}
      {config.stars.enabled && seedStars.map((star) => {
        if (mv === "none") return (
          <div key={star.id} className="absolute rounded-full" style={{
            left: `${star.x}%`, top: `${star.y}%`,
            width: star.size, height: star.size,
            backgroundColor: config.stars.color, opacity: 0.7,
          }} />
        );
        if (mv === "pulse") return (
          <motion.div key={star.id} className="absolute rounded-full"
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, backgroundColor: config.stars.color }}
            animate={{ scale: [0.4, 2.2, 0.4], opacity: [0.1, 1, 0.1] }}
            transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
          />
        );
        if (mv === "drift") return (
          <motion.div key={star.id} className="absolute rounded-full"
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, backgroundColor: config.stars.color, opacity: 0.8 }}
            animate={{ x: [0, driftDx], y: [0, driftDy] }}
            transition={{ duration: star.duration * 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: star.delay }}
          />
        );
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

      {/* Custom positioned stars */}
      {config.stars.enabled && (config.stars.customStars ?? []).map((star) => (
        <div key={star.id} className="absolute rounded-full" style={{
          left: `${star.x}%`, top: `${star.y}%`,
          width: star.size + 1, height: star.size + 1,
          backgroundColor: config.stars.color,
          opacity: 0.95,
          boxShadow: `0 0 ${star.size * 2}px ${config.stars.color}80`,
          transform: "translate(-50%, -50%)",
        }} />
      ))}

      {/* Comets */}
      {config.comets.enabled && config.comets.list.map((comet) => (
        <CometEl key={comet.id} comet={comet} />
      ))}

      {/* Planets */}
      {config.planets.map((planet) => (
        <PlanetEl key={planet.id} planet={planet} />
      ))}
    </div>
  );
}

export default memo(CustomBackground);
