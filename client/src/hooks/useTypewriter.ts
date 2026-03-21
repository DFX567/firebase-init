import { useEffect, useRef, useState } from "react";

export function useTypewriter(text: string, initialSpeed: number = 35) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);
  const index = useRef(0);
  const speed = useRef(initialSpeed);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Si el texto está vacío (cargando), no hacer nada
    if (!text) {
      setDisplay("");
      setDone(false);
      index.current = 0;
      return;
    }

    // Reiniciar cuando llega el texto real
    setDisplay("");
    setDone(false);
    index.current = 0;
    speed.current = initialSpeed;

    intervalRef.current = setInterval(() => {
      if (index.current >= text.length) {
        setDone(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      setDisplay((prev) => prev + text[index.current]);
      index.current++;
    }, speed.current);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]); // solo se reinicia cuando cambia el texto

  const speedUp = () => {
    speed.current = 10;
  };

  const skip = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplay(text);
    setDone(true);
  };

  return { display, text: display, speedUp, skip, done };
}
