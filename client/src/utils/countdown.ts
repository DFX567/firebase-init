import { useState, useEffect } from "react";

export function getCountdown(month: number, day: number) {
  const now = new Date();
  const year = 
    now.getMonth() + 1 > month || 
    (now.getMonth() + 1 === month && now.getDate() > day)
      ? now.getFullYear() + 1
      : now.getFullYear();

  const target = new Date(year, month - 1, day, 0, 0, 0);
  const diff = target.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function useCountdown(month: number, day: number) {
  const [countdown, setCountdown] = useState(getCountdown(month, day));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(month, day));
    }, 1000);

    return () => clearInterval(interval);
  }, [month, day]);

  return countdown;
}
