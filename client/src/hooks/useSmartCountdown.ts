import { useState, useEffect } from "react";

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  message: string;
}

export function useSmartCountdown(month: number, day: number, targetYear?: number): CountdownResult {
  const [countdown, setCountdown] = useState<CountdownResult>(() => 
    calculateCountdown(month, day, targetYear)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(month, day, targetYear));
    }, 1000);

    return () => clearInterval(interval);
  }, [month, day, targetYear]);

  return countdown;
}

function calculateCountdown(month: number, day: number, targetYear?: number): CountdownResult {
  const now = new Date();
  const currentYear = now.getFullYear();
  
  let year: number;
  if (targetYear) {
    year = targetYear;
  } else {
    const thisYearDate = new Date(currentYear, month - 1, day, 0, 0, 0);
    year = now > thisYearDate ? currentYear + 1 : currentYear;
  }

  const target = new Date(year, month - 1, day, 0, 0, 0);
  const diff = target.getTime() - now.getTime();

  if (diff < 0) {
    const daysPassed = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
    const hoursPassed = Math.floor((Math.abs(diff) / (1000 * 60 * 60)) % 24);
    const minutesPassed = Math.floor((Math.abs(diff) / (1000 * 60)) % 60);
    const secondsPassed = Math.floor((Math.abs(diff) / 1000) % 60);

    let message = "";
    if (daysPassed === 0) {
      message = "Hoy es el dia! Celebremos este momento tan especial";
    } else if (daysPassed === 1) {
      message = "Ayer fue un dia muy especial para nosotros";
    } else if (daysPassed < 7) {
      message = `Ya pasaron ${daysPassed} dias desde este momento tan maravilloso`;
    } else if (daysPassed < 30) {
      const weeks = Math.floor(daysPassed / 7);
      message = `Ya ${weeks === 1 ? 'paso una semana' : `pasaron ${weeks} semanas`} desde este dia tan especial`;
    } else if (daysPassed < 365) {
      const months = Math.floor(daysPassed / 30);
      message = `Ya ${months === 1 ? 'paso un mes' : `pasaron ${months} meses`} desde este momento inolvidable`;
    } else {
      const years = Math.floor(daysPassed / 365);
      const remainingDays = daysPassed % 365;
      message = `Ya ${years === 1 ? 'paso un anio' : `pasaron ${years} anios`}${remainingDays > 0 ? ` y ${remainingDays} dias` : ''} desde que comenzo nuestra historia`;
    }

    return {
      days: daysPassed,
      hours: hoursPassed,
      minutes: minutesPassed,
      seconds: secondsPassed,
      isPast: true,
      message,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  let message = "";
  if (days === 0) {
    message = "Hoy es el dia! Que emocion!";
  } else if (days === 1) {
    message = "Maniana es el dia! Ya casi llega!";
  } else if (days < 7) {
    message = `Solo faltan ${days} dias para este momento especial`;
  } else if (days < 30) {
    const weeks = Math.floor(days / 7);
    message = `Faltan ${weeks === 1 ? 'una semana' : `${weeks} semanas`} para celebrar`;
  } else {
    const months = Math.floor(days / 30);
    message = `Faltan ${months === 1 ? 'un mes' : `${months} meses`} para nuestro dia especial`;
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
    message,
  };
}

export function getEventDate(eventType: 'anniversary' | 'cumple' | 'sanvalentin' | 'amoramistad', year: number) {
  switch (eventType) {
    case 'anniversary':
      return { month: 11, day: 2 };
    case 'cumple':
      return { month: 12, day: 19 };
    case 'sanvalentin':
      return { month: 2, day: 14 };
    case 'amoramistad':
      return { month: 9, day: 20 };
    default:
      return { month: 1, day: 1 };
  }
}
