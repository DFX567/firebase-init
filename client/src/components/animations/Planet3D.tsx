import { motion } from "framer-motion";

interface Planet3DProps {
  size?: number;
  position?: { x: string; y: string };
  colors?: string[];
  rotationSpeed?: number;
  type?: "rocky" | "gas" | "moon";
}

export default function Planet3D({ 
  size = 400, 
  position = { x: "50%", y: "50%" },
  colors = ["#8b5cf6", "#ec4899", "#6366f1"],
  rotationSpeed = 60,
  type = "rocky"
}: Planet3DProps) {
  return (
    <div 
      className="absolute pointer-events-none will-change-transform"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        width: size,
        height: size
      }}
    >
      {/* Planeta base mejorado */}
      <div
        className="relative w-full h-full rounded-full"
        style={{
          background: type === "moon" 
            ? `radial-gradient(circle at 35% 35%, ${colors[0]}, ${colors[1]} 60%, ${colors[2]})`
            : `radial-gradient(ellipse at 30% 30%, ${colors[0]} 0%, ${colors[1]} 45%, ${colors[2]} 100%)`,
          boxShadow: `
            inset -${size/6}px -${size/6}px ${size/3}px rgba(0, 0, 0, 0.6),
            inset ${size/12}px ${size/12}px ${size/6}px rgba(255, 255, 255, 0.15),
            0 ${size/10}px ${size/2}px rgba(0, 0, 0, 0.4),
            0 0 ${size/3}px ${colors[1]}50
          `
        }}
      >
        {/* Capa de textura planetaria */}
        <div 
          className="absolute inset-0 rounded-full opacity-40 animate-spin-slow"
          style={{
            animationDuration: `${rotationSpeed}s`,
            background: type === "gas"
              ? `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 8%,
                  rgba(255, 255, 255, 0.05) 8%,
                  rgba(255, 255, 255, 0.05) 12%
                )`
              : `radial-gradient(circle at 20% 80%, rgba(0,0,0,0.3) 1%, transparent 2%),
                 radial-gradient(circle at 60% 30%, rgba(0,0,0,0.25) 1.5%, transparent 2%),
                 radial-gradient(circle at 80% 70%, rgba(0,0,0,0.2) 2%, transparent 2.5%),
                 radial-gradient(circle at 35% 50%, rgba(0,0,0,0.3) 1%, transparent 1.5%),
                 radial-gradient(circle at 50% 85%, rgba(0,0,0,0.25) 1.2%, transparent 2%)`
          }}
        />

        {/* Bandas atmosféricas para planetas gaseosos */}
        {type === "gas" && (
          <div 
            className="absolute inset-0 rounded-full opacity-30 animate-spin-slow"
            style={{
              animationDuration: `${rotationSpeed * 0.8}s`,
              background: `
                linear-gradient(90deg,
                  transparent 0%,
                  rgba(255,255,255,0.1) 20%,
                  transparent 40%,
                  rgba(255,255,255,0.05) 60%,
                  transparent 80%
                )
              `
            }}
          />
        )}

        {/* Luz solar realista */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, 
              rgba(255, 255, 255, 0.5) 0%, 
              rgba(255, 255, 255, 0.2) 20%, 
              transparent 50%)`
          }}
        />

        {/* Terminador (línea día/noche) */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(100deg, 
              transparent 0%, 
              transparent 45%, 
              rgba(0, 0, 0, 0.3) 50%, 
              rgba(0, 0, 0, 0.7) 70%, 
              rgba(0, 0, 0, 0.9) 100%)`
          }}
        />

        {/* Brillo atmosférico en el borde */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `inset 0 0 ${size/8}px rgba(255, 255, 255, 0.1)`
          }}
        />
      </div>

      {/* Anillo para algunos planetas */}
      {(type === "gas" || type === "rocky") && Math.random() > 0.5 && (
        <div
          className="absolute animate-spin-slow"
          style={{
            width: size * 1.8,
            height: size * 0.4,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) rotateX(75deg)",
            transformStyle: "preserve-3d",
            animationDuration: `${rotationSpeed * 1.3}s`
          }}
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(ellipse, 
                transparent 35%, 
                ${colors[1]}25 38%, 
                ${colors[2]}30 42%, 
                ${colors[1]}20 48%, 
                transparent 52%)`,
              boxShadow: `0 ${size/20}px ${size/8}px rgba(0, 0, 0, 0.5)`
            }}
          />
        </div>
      )}

      {/* Atmósfera difusa */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${colors[1]}15, transparent 60%)`,
          transform: "scale(1.15)"
        }}
      />

      {/* Glow exterior */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors[0]}10, transparent 70%)`,
          transform: "scale(1.4)"
        }}
      />
    </div>
  );
}