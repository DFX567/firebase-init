import { memo } from "react";

interface Planet3DProps {
  size?: number;
  position?: { x: string; y: string };
  colors?: string[];
  rotationSpeed?: number;
  type?: "rocky" | "gas" | "moon";
}

function Planet3D({ 
  size = 400, 
  position = { x: "50%", y: "50%" },
  colors = ["#8b5cf6", "#ec4899", "#6366f1"],
  rotationSpeed = 60,
  type = "rocky"
}: Planet3DProps) {
  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        width: size,
        height: size
      }}
    >
      <div
        className="relative w-full h-full rounded-full"
        style={{
          background: type === "moon" 
            ? `radial-gradient(circle at 35% 35%, ${colors[0]}, ${colors[1]} 60%, ${colors[2]})`
            : `radial-gradient(ellipse at 30% 30%, ${colors[0]} 0%, ${colors[1]} 45%, ${colors[2]} 100%)`,
          boxShadow: `
            inset -${size/6}px -${size/6}px ${size/3}px rgba(0, 0, 0, 0.6),
            inset ${size/12}px ${size/12}px ${size/6}px rgba(255, 255, 255, 0.15),
            0 0 ${size/3}px ${colors[1]}40
          `
        }}
      >
        <div 
          className="absolute inset-0 rounded-full opacity-30 animate-spin-slow"
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
              : `radial-gradient(circle at 20% 80%, rgba(0,0,0,0.2) 1%, transparent 2%),
                 radial-gradient(circle at 60% 30%, rgba(0,0,0,0.15) 1.5%, transparent 2%),
                 radial-gradient(circle at 80% 70%, rgba(0,0,0,0.1) 2%, transparent 2.5%)`
          }}
        />

        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, 
              rgba(255, 255, 255, 0.4) 0%, 
              rgba(255, 255, 255, 0.15) 20%, 
              transparent 50%)`
          }}
        />

        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(100deg, 
              transparent 0%, 
              transparent 45%, 
              rgba(0, 0, 0, 0.25) 50%, 
              rgba(0, 0, 0, 0.5) 70%, 
              rgba(0, 0, 0, 0.7) 100%)`
          }}
        />
      </div>

      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-40"
        style={{
          background: `radial-gradient(circle, ${colors[1]}20, transparent 60%)`,
          transform: "scale(1.1)"
        }}
      />
    </div>
  );
}

export default memo(Planet3D);
