import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";

import LoginScreen from "@/components/LoginScreen";
import Hub from "@/pages/Hub";

import AnniversaryRouter from "@/pages/Anniversary/AnniversaryRouter";
import CumpleRouter from "@/pages/Cumple/CumpleRouter";
import SanValentinRouter from "@/pages/San Valentin/SanValentinRouter";
import AmorAmistadRouter from "@/pages/Amor y Amistad/AmorAmistadRouter";
import DiaDelaMujerRouter from "@/pages/Dia de la Mujer/DiaDelaMujerRouter";

const ALLOWED_EMAILS = [
  "dfx1mas87@gmail.com",
  "lfbecerraaponte@gmail.com",
];

type Section = "hub" | "anniversary" | "cumple" | "sanvalentin" | "amoramistad" | "diadelmujer";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState<Section>("hub");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && ALLOWED_EMAILS.includes(u.email ?? "")) {
        setUser(u);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      if (!ALLOWED_EMAILS.includes(res.user.email ?? "")) {
        await signOut(auth);
        setError("Este sitio es privado");
      }
    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesion");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setSection("hub");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={handleGoogleLogin} error={error} />;
  }

  if (section === "anniversary") {
    return <AnniversaryRouter onBack={() => setSection("hub")} />;
  }

  if (section === "cumple") {
    return <CumpleRouter onBack={() => setSection("hub")} />;
  }

  if (section === "sanvalentin") {
    return <SanValentinRouter onBack={() => setSection("hub")} />;
  }

  if (section === "amoramistad") {
    return <AmorAmistadRouter onBack={() => setSection("hub")} />;
  }

  if (section === "diadelmujer") {
    return <DiaDelaMujerRouter onBack={() => setSection("hub")} />;
  }

  return <Hub onSelect={setSection} onLogout={handleLogout} user={user} />;
}
