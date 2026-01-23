const YEARS = [2025, 2026, 2027, 2028, 2029, 2030];

export default function YearSelector({
  year,
  onChange,
}: {
  year: number;
  onChange: (y: number) => void;
}) {
  return (
    <div className="flex gap-3 justify-center mb-10 flex-wrap">
      {YEARS.map((y) => (
        <button
          key={y}
          onClick={() => onChange(y)}
          className={`px-5 py-2 rounded-full transition font-semibold ${
            y === year
              ? "bg-rose-500 text-white"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          {y}
        </button>
      ))}
    </div>
  );
}