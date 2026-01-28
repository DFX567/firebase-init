import { useState } from "react";
import CumpleHome from "./CumpleHome";
import BirthdayLetter from "./BirthdayLetter";
import GiftCatcher from "./games/GiftCatcher";
import WishWheel from "./games/WishWheel";

interface CumpleRouterProps {
  onBack: () => void;
}

type View = 'home' | 'letter' | 'catcher' | 'wheel';

export default function CumpleRouter({ onBack }: CumpleRouterProps) {
  const [view, setView] = useState<View>('home');
  const [year, setYear] = useState(2024);

  if (view === 'letter') {
    return <BirthdayLetter year={year} onBack={() => setView('home')} />;
  }

  if (view === 'catcher') {
    return <GiftCatcher onBack={() => setView('home')} />;
  }

  if (view === 'wheel') {
    return <WishWheel onBack={() => setView('home')} />;
  }

  return (
    <CumpleHome 
      onBack={onBack} 
      onViewLetter={(y) => { setYear(y); setView('letter'); }}
      onViewCatcher={() => setView('catcher')}
      onViewWheel={() => setView('wheel')}
    />
  );
}
