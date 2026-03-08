import { useState } from "react";
import DiaDelaMujerHome from "./DiaDelaMujerHome";
import DiaDelaMujerLetter from "./DiaDelaMujerLetter";
import DiaDelaMujerPoem from "./DiaDelaMujerPoem";
import WomenEmpowermentQuiz from "./games/WomenEmpowermentQuiz";
import WomenCelebrationMemory from "./games/WomenCelebrationMemory";

interface DiaDelaMujerRouterProps {
  onBack: () => void;
}

type View = 'home' | 'letter' | 'poem' | 'quiz' | 'memory';

export default function DiaDelaMujerRouter({ onBack }: DiaDelaMujerRouterProps) {
  const [view, setView] = useState<View>('home');
  const [year, setYear] = useState(2026);

  if (view === 'letter') {
    return <DiaDelaMujerLetter year={year} onBack={() => setView('home')} />;
  }

  if (view === 'poem') {
    return <DiaDelaMujerPoem year={year} onBack={() => setView('home')} />;
  }

  if (view === 'quiz') {
    return <WomenEmpowermentQuiz onBack={() => setView('home')} />;
  }

  if (view === 'memory') {
    return <WomenCelebrationMemory onBack={() => setView('home')} />;
  }

  return (
    <DiaDelaMujerHome 
      onBack={onBack} 
      onViewLetter={(y) => { setYear(y); setView('letter'); }}
      onViewPoem={(y) => { setYear(y); setView('poem'); }}
      onViewQuiz={() => setView('quiz')}
      onViewMemory={() => setView('memory')}
    />
  );
}
