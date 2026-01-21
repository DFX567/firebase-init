import { useState } from "react";
import Countdown from "./Countdown";

const valentineDay = 14;
const valentineMonth = 1; // FEBRERO (0 = enero)

export default function SanValentinSection() {
  const years = [2025, 2026, 2027, 2028, 2029, 2030];
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const targetDate = new Date(
    selectedYear,
    valentineMonth,
    valentineDay,
    0,
    0,
    0
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-red-100 to-pink-200">
      <h1 className="text-4xl font-bold text-red-500">
        💘 San Valentín
      </h1>

      <p className="mt-4 text-lg max-w-xl">
        San Valentín es solo una excusa para recordarte que te amo todos los días,
        sin importar el año que pase.
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

      <Countdown targetDate={targetDate} />

      {/* Carta */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow max-w-xl">
        <h2 className="text-2xl font-semibold text-red-400 mb-2">
          💌 Carta
        </h2>
        <p>
          Mi amor, cada San Valentín me confirma que no necesito un día especial
          para amarte, porque contigo todos los días lo son.
        </p>
      </div>

      {/* Poema */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow max-w-xl">
        <h2 className="text-2xl font-semibold text-red-400 mb-2">
          ✨ Poema
        </h2>
        <p>
          No es febrero quien dicta mi amor,  
          ni las flores ni cartas lo hacen mayor,  
          es tu sonrisa, tu forma de ser,  
          lo que hace a mi corazón florecer.
        </p>
      </div>
    </div>
  );
}