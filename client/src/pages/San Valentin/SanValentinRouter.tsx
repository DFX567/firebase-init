import { useState } from "react";
import SanValentinHome from "./SanValentinHome";
import ValentineLetter from "./ValentineLetter";
import ValentinePoem from "./ValentinePoem";

type View = "home" | "letter" | "poem";

export default function SanValentinRouter({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<View>("home");
  const [selectedYear, setSelectedYear] = useState(2025);

  if (view === "letter") {
    return (
      <ValentineLetter
        year={selectedYear}
        onBack={() => setView("home")}
      />
    );
  }

  if (view === "poem") {
    return (
      <ValentinePoem
        year={selectedYear}
        onBack={() => setView("home")}
      />
    );
  }

  return (
    <SanValentinHome
      onBack={onBack}
      onViewLetter={(year) => {
        setSelectedYear(year);
        setView("letter");
      }}
      onViewPoem={(year) => {
        setSelectedYear(year);
        setView("poem");
      }}
    />
  );
}