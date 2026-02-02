import { useState } from "react";
import CumpleHome from "./CumpleHome";
import BirthdayLetter from "./BirthdayLetter";
import GiftCatcher from "./games/GiftCatcher";
import TimeCapsule from "./games/TimeCapsule";

interface CumpleRouterProps {
  onBack: () => void;
}

type View = 'home' | 'letter' | 'catcher' | 'capsule';

export default function CumpleRouter({ onBack }: CumpleRouterProps) {
  const [view, setView] = useState<View>('home');
  const [year, setYear] = useState(2024);

  if (view === 'letter') {
    return <BirthdayLetter year={year} onBack={() => setView('home')} />;
  }

  if (view === 'catcher') {
    return <GiftCatcher onBack={() => setView('home')} />;
  }

  if (view === 'capsule') {
    return <TimeCapsule onBack={() => setView('home')} />;
  }

  return (
    <CumpleHome 
      onBack={onBack} 
      onViewLetter={(y) => { setYear(y); setView('letter'); }}
      onViewCatcher={() => setView('catcher')}
      onViewCapsule={() => setView('capsule')}
    />
  );
}
