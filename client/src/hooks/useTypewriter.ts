import { useEffect, useRef, useState } from "react";

export function useTypewriter(text: string, initialSpeed: number = 35) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);
  const index = useRef(0);
  const speed = useRef(initialSpeed);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentText = useRef("");

  useEffect(() => {
    if (!text) {
      setDisplay("");
      setDone(false);
      index.current = 0;
      currentText.current = "";
      return;
    }

    // Si el texto es el mismo no reiniciar
    if (text === currentText.current) return;
    currentText.current = text;

    if (intervalRef.current) clearInterval(intervalRef.current);
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
  }, [text]);

  const speedUp = () => { speed.current = 10; };

  const skip = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplay(text);
    setDone(true);
  };

  return { display, text: display, speedUp, skip, done };
}
