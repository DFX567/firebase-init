import { useState } from "react";

export default function SecretMenu() {
  const [seq, setSeq] = useState("");

  const press = (l: string) => {
    const next = (seq + l).slice(-3);
    setSeq(next);
    if (next === "lll") {
      localStorage.setItem("unlockAll", "true");
      alert("Modo secreto activado 💖");
    }
  };

  return (
    <button
      onClick={() => press("l")}
      className="absolute bottom-6 right-6 opacity-20"
    >
      L
    </button>
  );
}