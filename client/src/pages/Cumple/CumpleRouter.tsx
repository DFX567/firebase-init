import { useState } from "react";
import CumpleHome from "./CumpleHome";
import BirthdayLetter from "./BirthdayLetter";

interface CumpleRouterProps {
  onBack: () => void;
}

type View = 'home' | 'letter';

export default function CumpleRouter({ onBack }: CumpleRouterProps) {
  const [view, setView] = useState<View>('home');
  const [year, setYear] = useState(2024);

  if (view === 'letter') {
    return <BirthdayLetter year={year} onBack={() => setView('home')} />;
  }

  return (
    <CumpleHome 
      onBack={onBack} 
      onViewLetter={(y) => { setYear(y); setView('letter'); }}
    />
  );
}
