import { useState } from "react";
import AnniversaryHome from "./AnniversaryHome";
import LoveLetter from "./LoveLetter";

interface AnniversaryRouterProps {
  onBack: () => void;
}

type View = 'home' | 'letter';

export default function AnniversaryRouter({ onBack }: AnniversaryRouterProps) {
  const [view, setView] = useState<View>('home');
  const [year, setYear] = useState(2024);

  if (view === 'letter') {
    return <LoveLetter year={year} onBack={() => setView('home')} />;
  }

  return (
    <AnniversaryHome 
      onBack={onBack} 
      onViewLetter={(y) => { setYear(y); setView('letter'); }}
    />
  );
}
