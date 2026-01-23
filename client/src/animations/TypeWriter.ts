import { useEffect, useRef, useState } from "react";

export function useTypewriter(text: string) {
  const [output, setOutput] = useState("");
  const index = useRef(0);
  const speed = useRef(35);
  const finished = useRef(false);

  useEffect(() => {
    setOutput("");
    index.current = 0;
    finished.current = false;

    const interval = setInterval(() => {
      if (index.current >= text.length) {
        finished.current = true;
        clearInterval(interval);
        return;
      }

      setOutput((prev) => prev + text[index.current]);
      index.current++;
    }, speed.current);

    return () => clearInterval(interval);
  }, [text]);

  return {
    text: output,
    speedUp: () => (speed.current = 10),
    skip: () => {
      if (!finished.current) {
        finished.current = true;
        setOutput(text);
      }
    },
  };
}