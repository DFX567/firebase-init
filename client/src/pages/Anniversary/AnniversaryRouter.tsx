import { useState } from "react";
import AnniversaryHome from "./AnniversaryHome";
import LoveLetter from "./LoveLetter";

type View = "home" | "letter" | "poem";

export default function AnniversaryRouter({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<View>("home");
  const [selectedYear, setSelectedYear] = useState(2025);

  if (view === "letter") {
    return (
      <LoveLetter
        year={selectedYear}
        onBack={() => setView("home")}
      />
    );
  }

  return (
    <AnniversaryHome
      onBack={onBack}
      onViewLetter={(year) => {
        setSelectedYear(year);
        setView("letter");
      }}
    />
  );
}
