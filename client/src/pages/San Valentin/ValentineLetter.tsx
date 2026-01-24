import { useTypewriter } from "@/hooks/useTypewriter";
import { sanValentinContent } from "@/data/events";
import { ArrowLeft, FastForward, SkipForward } from "lucide-react";

interface ValentineLetterProps {
  year: number;
  onBack: () => void;
}

export default function ValentineLetter({ year, onBack }: ValentineLetterProps) {
  const content = sanValentinContent.letter.text(year);
  const { display, speedUp, skip, done } = useTypewriter(content);

  return (
    <div className="min-h-screen px-8 py-10 bg-gradient-to-br from-rose-900 via-red-900 to-black text-white">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition mb-8 backdrop-blur-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver</span>
      </button>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl mb-8 font-bold text-center text-rose-300">
          {sanValentinContent.letter.title}
        </h2>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          <pre className="whitespace-pre-wrap text-lg leading-relaxed font-sans">
            {display}
          </pre>
        </div>

        {!done && (
          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={speedUp}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 transition border border-rose-500/30"
            >
              <FastForward className="w-4 h-4" />
              <span>x2 velocidad</span>
            </button>
            <button
              onClick={skip}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 transition border border-rose-500/30"
            >
              <SkipForward className="w-4 h-4" />
              <span>Mostrar todo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
