import { useState } from "react";
import SanValentinHome from "./SanValentinHome";
import ValentineLetter from "./ValentineLetter";
import ValentinePoem from "./ValentinePoem";

interface SanValentinRouterProps {
  onBack: () => void;
}

type View = 'home' | 'letter' | 'poem';

export default function SanValentinRouter({ onBack }: SanValentinRouterProps) {
  const [view, setView] = useState<View>('home');
  const [year, setYear] = useState(2025);

  if (view === 'letter') {
    return <ValentineLetter year={year} onBack={() => setView('home')} />;
  }

  if (view === 'poem') {
    return <ValentinePoem year={year} onBack={() => setView('home')} />;
  }

  return (
    <SanValentinHome 
      onBack={onBack} 
      onViewLetter={(y) => { setYear(y); setView('letter'); }}
      onViewPoem={(y) => { setYear(y); setView('poem'); }}
    />
  );
}
