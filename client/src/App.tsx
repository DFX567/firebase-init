import { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import LoginScreen from "./components/LoginScreen";
import AnniversarySection from "./AnniversarySection";
import CumpleSection from "./CumpleSection";
import SanValentinSection from "./SanValentinSection";
import HeartAnimation from "./HeartAnimation";


// 🔒 Correos permitidos
const ALLOWED_EMAILS = [
  "dfx1mas87@gmail.com",
  "lfbecerraaponte@gmail.com",
];

function App() {
  const handleLogout = async () => {
  await signOut(auth);
  setUser(null);
  setCurrentSection("");
};
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState("");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  const years = [2025, 2026, 2027, 2028, 2029, 2030];

  // 🔐 Verificar sesión y correo permitido
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (
        currentUser &&
        currentUser.email &&
        ALLOWED_EMAILS.includes(currentUser.email)
      ) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔐 Login con Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (
        !result.user.email ||
        !ALLOWED_EMAILS.includes(result.user.email)
      ) {
        await auth.signOut();
        setErrorMsg("Este espacio es solo para nosotros dos 💔");
        setLoading(false);
        return;
      }

      setUser(result.user);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErrorMsg("Error con Google: " + error.message);
    }
  };

  const goBack = () => {
    setCurrentSection("");
  };

  // ⏳ Cargando
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center">
        <p className="text-white text-3xl animate-pulse">
          Cargando nuestro amor... 💕
        </p>
      </div>
    );
  }

  // ❤️ Usuario logueado
  if (user) {
    if (currentSection) {
      let SectionComponent: any = null;

      if (currentSection === "aniversario")
        SectionComponent = AnniversarySection;
      if (currentSection === "cumple")
        SectionComponent = CumpleSection;
      if (currentSection === "sanvalentin")
        SectionComponent = SanValentinSection;

      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 to-rose-600 flex flex-col items-center p-6">
          <button
            onClick={goBack}
            className="self-start mb-4 bg-white text-rose-600 px-6 py-2 rounded-full text-lg font-bold shadow"
          >
            Volver
          </button>

          <SectionComponent year={selectedYear} />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-rose-600 flex flex-col items-center p-6 relative overflow-hidden">
        <HeartAnimation />
        <button
  onClick={handleLogout}
  className="self-end mb-4 bg-white/80 text-rose-600 px-5 py-2 rounded-full font-bold shadow hover:bg-white transition"
>
  Salir 🔒
</button>
        <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-2xl text-center">
          Bienvenida mi amor 💖
        </h1>

        <div className="mb-6 w-full max-w-xs">
          <select
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(Number(e.target.value))
            }
            className="w-full p-4 text-xl rounded-full bg-white/80 text-rose-700"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setCurrentSection("aniversario")}
            className="bg-rose-500 text-white px-6 py-4 rounded-full text-xl font-bold"
          >
            Aniversario 💑
          </button>

          <button
            onClick={() => setCurrentSection("cumple")}
            className="bg-blue-500 text-white px-6 py-4 rounded-full text-xl font-bold"
          >
            Cumpleaños 🎂
          </button>

          <button
            onClick={() => setCurrentSection("sanvalentin")}
            className="bg-red-500 text-white px-6 py-4 rounded-full text-xl font-bold"
          >
            San Valentín ❤️
          </button>
        </div>
      </div>
    );
  }

  // 🔑 Login
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-rose-600 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-white mb-10 text-center">
        Nuestro Espacio Secreto 💕
      </h1>

      <div className="bg-white/80 p-10 rounded-3xl shadow-xl max-w-md w-full text-center">
        <p className="text-xl text-rose-700 mb-6">
          Entra con tu Google
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-rose-600 py-4 rounded-full text-xl font-bold"
        >
          Continuar con Google
        </button>

        {errorMsg && (
          <p className="text-red-600 mt-4">
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;