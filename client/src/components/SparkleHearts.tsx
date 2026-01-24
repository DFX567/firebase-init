export default function SparkleHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="absolute text-pink-400 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${10 + Math.random() * 18}px`,
            animationDelay: `${i * 0.6}s`,
          }}
        >
          ✨❤️
        </span>
      ))}
    </div>
  );
}
