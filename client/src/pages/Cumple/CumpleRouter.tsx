import { useState } from "react";
import CumpleHome from "./CumpleHome";
import BirthdayLetter from "./BirthdayLetter";

type View = "home" | "letter";

export default function CumpleRouter({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<View>("home");
  const [selectedYear, setSelectedYear] = useState(2025);

  if (view === "letter") {
    return (
      <BirthdayLetter
        year={selectedYear}
        onBack={() => setView("home")}
      />
    );
  }

  return (
    <CumpleHome
      onBack={onBack}
      onViewLetter={(year) => {
        setSelectedYear(year);
        setView("letter");
      }}
    />
  );
}

