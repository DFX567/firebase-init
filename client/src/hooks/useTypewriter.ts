import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed: number) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    setOutput("");
    setDone(false);

    const interval = setInterval(() => {
      index++;
      setOutput(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 45 / speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { output, done, setOutput };
}