export default function HeartAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 text-pink-300 text-2xl animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          💖
        </span>
      ))}
    </div>
  );
}