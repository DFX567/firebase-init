export default function BalloonAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 w-6 h-8 rounded-full bg-pink-300 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}