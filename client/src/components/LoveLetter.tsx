import { anniversaryContent } from "../sections/Anniversary/data";
import { useTypewriter } from "../animations/typewriter";

export default function LoveLetter({ year, onBack }: any) {
  const content = anniversaryContent.letter.text(year);
  const { text, speedUp, skip } = useTypewriter(content);

  return (
    <div className="min-h-screen px-8 py-10">
      <button onClick={onBack} className="btn-soft mb-6">
        ← Volver
      </button>

      <h2 className="text-3xl mb-6">
        {anniversaryContent.letter.title}
      </h2>

      <pre className="whitespace-pre-wrap text-lg leading-relaxed">
        {text}
      </pre>

      <div className="flex gap-4 mt-6">
        <button onClick={speedUp} className="btn-secondary">
          x2
        </button>
        <button onClick={skip} className="btn-secondary">
          Mostrar todo
        </button>
      </div>
    </div>
  );
}