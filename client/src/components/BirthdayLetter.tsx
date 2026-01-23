import { useTypewriter } from "../animations/typewriter";

export default function BirthdayLetter({ year, onBack }: any) {
  const text = `Feliz cumpleaños ${year} 🎂

Gracias por existir.
Gracias por ser tú.
Hoy celebramos tu vida 💖`;

  const { display, skip, speedUp } = useTypewriter(text);

  return (
    <div className="min-h-screen p-8">
      <button onClick={onBack}>← Volver</button>

      <pre className="mt-10 text-lg whitespace-pre-wrap">
        {display}
      </pre>

      <div className="flex gap-4 mt-6">
        <button onClick={speedUp}>x2</button>
        <button onClick={skip}>Mostrar todo</button>
      </div>
    </div>
  );
}