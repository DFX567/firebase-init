import { useEffect, useRef, useState } from "react";

export function useTypewriter(text: string, initialSpeed: number = 35) {
  const [display, setDisplay] = useState("");
  const index = useRef(0);
  const speed = useRef(initialSpeed);
  const finished = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplay("");
    index.current = 0;
    finished.current = false;

    intervalRef.current = setInterval(() => {
      if (index.current >= text.length) {
        finished.current = true;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      setDisplay((prev) => prev + text[index.current]);
      index.current++;
    }, speed.current);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text]);

  const speedUp = () => {
    speed.current = 10;
  };

  const skip = () => {
    if (!finished.current) {
      finished.current = true;
      setDisplay(text);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  return {
    display,
    text: display,
    speedUp,
    skip,
    done: finished.current,
  };
}