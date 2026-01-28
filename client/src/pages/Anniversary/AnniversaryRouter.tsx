import { useState } from "react";
import AnniversaryHome from "./AnniversaryHome";
import LoveLetter from "./LoveLetter";
import MemoryTimeline from "./games/MemoryTimeline";
import LoveCards from "./games/LoveCards";

interface AnniversaryRouterProps {
  onBack: () => void;
}

type View = 'home' | 'letter' | 'timeline' | 'cards';

export default function AnniversaryRouter({ onBack }: AnniversaryRouterProps) {
  const [view, setView] = useState<View>('home');
  const [year, setYear] = useState(2024);

  if (view === 'letter') {
    return <LoveLetter year={year} onBack={() => setView('home')} />;
  }

  if (view === 'timeline') {
    return <MemoryTimeline onBack={() => setView('home')} />;
  }

  if (view === 'cards') {
    return <LoveCards onBack={() => setView('home')} />;
  }

  return (
    <AnniversaryHome 
      onBack={onBack} 
      onViewLetter={(y) => { setYear(y); setView('letter'); }}
      onViewTimeline={() => setView('timeline')}
      onViewCards={() => setView('cards')}
    />
  );
}
