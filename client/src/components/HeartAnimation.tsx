export default function HeartAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 text-pink-400 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 24}px`,
            animationDelay: `${i * 0.8}s`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}