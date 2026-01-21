import { useState } from "react";
import Countdown from "./Countdown";

const birthdayDay = 19; 
const birthdayMonth = 11;
export default function CumpleSection() {
  const years = [2025, 2026, 2027, 2028, 2029, 2030];
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const targetDate = new Date(
    selectedYear,
    birthdayMonth,
    birthdayDay,
    0,
    0,
    0
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-purple-100 to-pink-200">
      <h1 className="text-4xl font-bold text-purple-600">
        🎂 Tu Cumpleaños
      </h1>

      <p className="mt-4 text-lg max-w-xl">
        Hoy celebramos el día más especial del año, el día en que nació la
        persona que ilumina mi vida con su sonrisa.
      </p>

      {/* Selector de año */}
      <div className="mt-6">
        <label className="mr-2 font-semibold">Elige el año:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="p-2 rounded"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Countdown */}
      <Countdown targetDate={targetDate} />

      {/* Carta */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow max-w-xl">
        <h2 className="text-2xl font-semibold text-purple-500 mb-2">
          💌 Carta
        </h2>
        <p>
          Amor, hoy celebro tu vida y agradezco cada instante que me permites
          compartirla contigo. Eres mi alegría diaria y mi mayor regalo.
        </p>
      </div>

      {/* Poema */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow max-w-xl">
        <h2 className="text-2xl font-semibold text-purple-500 mb-2">
          ✨ Poema
        </h2>
        <p>
          Hoy el tiempo se detiene,  
          el mundo sonríe al verte nacer,  
          porque en tu cumpleaños comprendo,  
          lo hermoso que es amarte y creer.
        </p>
      </div>
    </div>
  );
}