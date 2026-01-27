import { useState } from "react";
import CumpleHome from "./CumpleHome";
import BirthdayLetter from "./BirthdayLetter";
import BirthdayGifts from "./BirthdayGifts";
import CatchGame from "./CatchGame";

interface CumpleRouterProps {
  onBack: () => void;
}

type View = 'home' | 'letter' | 'gifts' | 'game';

export default function CumpleRouter({ onBack }: CumpleRouterProps) {
  const [view, setView] = useState<View>('home');
  const [year, setYear] = useState(2025);

  if (view === 'letter') {
    return <BirthdayLetter year={year} onBack={() => setView('home')} />;
  }

  if (view === 'gifts') {
    return <BirthdayGifts year={year} onBack={() => setView('home')} />;
  }

  if (view === 'game') {
    return <CatchGame onBack={() => setView('home')} />;
  }

  return (
    <CumpleHome 
      onBack={onBack} 
      onViewLetter={(y) => { setYear(y); setView('letter'); }}
      onViewGifts={(y) => { setYear(y); setView('gifts'); }}
      onViewGame={() => setView('game')}
    />
  );
}