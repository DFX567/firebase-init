import { useState } from "react";
import FloresAmarillaHome from "./FloresAmarillaHome";
import FloresLetter from "./FloresLetter";

interface FloresAmarillaRouterProps {
  onBack: () => void;
}

type View = "home" | "letter";

export default function FloresAmarillaRouter({ onBack }: FloresAmarillaRouterProps) {
  const [view, setView] = useState<View>("home");

  if (view === "letter") {
    return <FloresLetter onBack={() => setView("home")} />;
  }

  return (
    <FloresAmarillaHome
      onBack={onBack}
      onViewLetter={() => setView("letter")}
    />
  );
}
