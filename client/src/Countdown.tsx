import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        finished: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      finished: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.finished) {
    return (
      <p className="text-xl text-pink-400 font-semibold">
        💖 Hoy es nuestro aniversario 💖
      </p>
    );
  }

  return (
    <div className="flex gap-4 text-center mt-4">
      <div>
        <p className="text-3xl font-bold">{timeLeft.days}</p>
        <span>Días</span>
      </div>
      <div>
        <p className="text-3xl font-bold">{timeLeft.hours}</p>
        <span>Horas</span>
      </div>
      <div>
        <p className="text-3xl font-bold">{timeLeft.minutes}</p>
        <span>Minutos</span>
      </div>
      <div>
        <p className="text-3xl font-bold">{timeLeft.seconds}</p>
        <span>Segundos</span>
      </div>
    </div>
  );
}