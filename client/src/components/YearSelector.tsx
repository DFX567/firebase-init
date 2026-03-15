interface YearSelectorProps {
  year: number;
  onChange: (year: number) => void;
  theme?: "valentine" | "birthday" | "anniversary" | "women";
}

const YEARS = [2025, 2026, 2027, 2028, 2029, 2030];

export default function YearSelector({ 
  year, 
  onChange, 
  theme = "valentine" 
}: YearSelectorProps) {
  const getThemeClasses = () => {
    switch (theme) {
      case "birthday":
        return {
          active: "bg-purple-500 text-white shadow-lg shadow-purple-500/50",
          inactive: "bg-white/10 text-white/70 hover:bg-white/20",
        };
      case "anniversary":
        return {
          active: "bg-pink-500 text-white shadow-lg shadow-pink-500/50",
          inactive: "bg-white/10 text-white/70 hover:bg-white/20",
        };
      case "women":
        return {
          active: "bg-purple-500 text-white shadow-lg shadow-purple-500/50",
          inactive: "bg-white/10 text-white/70 hover:bg-white/20",
        };
      default: // valentine
        return {
          active: "bg-rose-500 text-white shadow-lg shadow-rose-500/50",
          inactive: "bg-white/10 text-white/70 hover:bg-white/20",
        };
    }
  };

  const classes = getThemeClasses();

  return (
    <div className="flex gap-3 justify-center mb-10 flex-wrap">
      {YEARS.map((y) => (
        <button
          key={y}
          onClick={() => onChange(y)}
          className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
            y === year ? classes.active : classes.inactive
          }`}
        >
          {y}
        </button>
      ))}
    </div>
  );
}