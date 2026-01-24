import { useState } from "react";

interface SecretMenuProps {
  onUnlock: () => void;
}

export default function SecretMenu({ onUnlock }: SecretMenuProps) {
  const [seq, setSeq] = useState("");

  const press = (l: string) => {
    const next = (seq + l).slice(-3);
    setSeq(next);

    if (next === "lll") {
      onUnlock();
      alert("Modo secreto activado 💖");
      setSeq("");
    }
  };

  return (
    <button
      onClick={() => press("l")}
      className="fixed bottom-6 right-6 opacity-20 hover:opacity-40 transition-opacity text-white/30 text-xs z-50"
      aria-label="Secret menu"
    >
      L
    </button>
  );
}