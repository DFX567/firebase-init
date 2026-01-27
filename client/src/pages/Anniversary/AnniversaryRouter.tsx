import { useState } from "react";
import AnniversaryHome from "./AnniversaryHome";
import LoveLetter from "./LoveLetter";
import PhotoGallery from "./PhotoGallery";
import MemoryGame from "./MemoryGame";

interface AnniversaryRouterProps {
  onBack: () => void;
}

type View = 'home' | 'letter' | 'gallery' | 'game';

export default function AnniversaryRouter({ onBack }: AnniversaryRouterProps) {
  const [view, setView] = useState<View>('home');
  const [year, setYear] = useState(2025);

  if (view === 'letter') {
    return <LoveLetter year={year} onBack={() => setView('home')} />;
  }

  if (view === 'gallery') {
    return <PhotoGallery year={year} onBack={() => setView('home')} />;
  }

  if (view === 'game') {
    return <MemoryGame onBack={() => setView('home')} />;
  }

  return (
    <AnniversaryHome 
      onBack={onBack} 
      onViewLetter={(y) => { setYear(y); setView('letter'); }}
      onViewGallery={(y) => { setYear(y); setView('gallery'); }}
      onViewGame={() => setView('game')}
    />
  );
}