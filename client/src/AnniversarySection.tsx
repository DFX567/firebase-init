import { useState } from "react";
import Countdown from "./Countdown";

const anniversaryDay = 2;
const anniversaryMonth = 10; // NOVIEMBRE (0 = enero)

export default function AnniversarySection() {
  const years = [2025, 2026, 2027, 2028, 2029, 2030];
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const targetDate = new Date(
    selectedYear,
    anniversaryMonth,
    anniversaryDay,
    0,
    0,
    0
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-pink-100 to-pink-200">
      <h1 className="text-4xl font-bold text-pink-600">
        💖 Nuestro Aniversario
      </h1>

      <p className="mt-4 text-lg max-w-xl">
        Desde el <strong>02 de noviembre de 2024</strong>, mi vida cambió para
        siempre. Cada año a tu lado es un regalo que atesoro con todo mi
        corazón.
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
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">
          💌 Carta
        </h2>
        <p>
          Amor, cada segundo que pasa me recuerda lo afortunado que soy de
          tenerte. No importa el año que elijamos, siempre te elegiría a ti.
        </p>
      </div>

      {/* Poema */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow max-w-xl">
        <h2 className="text-2xl font-semibold text-pink-500 mb-2">
          ✨ Poema
        </h2>
        <p>
          El tiempo avanza, el mundo gira,  
          pero mi amor por ti no cambia ni expira.  
          Cada aniversario es solo una razón,  
          para amarte más desde el corazón.
        </p>
      </div>
    </div>
  );
}