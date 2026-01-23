import { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import LoginScreen from "./components/LoginScreen";
import Hub from "./pages/Hub";

import AnniversaryRouter from "./sections/anniversary/AnniversaryRouter";
import CumpleRouter from "./sections/cumple/CumpleRouter";
import SanValentinRouter from "./sections/sanvalentin/SanValentinRouter";

/* ===============================
   Correos permitidos
================================ */
const ALLOWED_EMAILS = [
  "dfx1mas87@gmail.com",
  "lfbecerraaponte@gmail.com",
];

type Section = "hub" | "anniversary" | "cumple" | "sanvalentin";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState<Section>("hub");
  const [error, setError] = useState<string | null>(null);

  /* ===============================
     Auth listener
  ================================ */
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

  /* ===============================
     Login
  ================================ */
  const handleGoogleLogin = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      if (!ALLOWED_EMAILS.includes(res.user.email ?? "")) {
        await signOut(auth);
        setError("Este acceso es privado 💜");
      }
    } catch {
      setError("Error al iniciar sesión");
    }
  };

  /* ===============================
     Logout
  ================================ */
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setSection("hub");
  };

  /* ===============================
     Loading
  ================================ */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Cargando…
      </div>
    );
  }

  /* ===============================
     LOGIN
  ================================ */
  if (!user) {
    return <LoginScreen onLogin={handleGoogleLogin} error={error} />;
  }

  /* ===============================
     SECTIONS
  ================================ */
  if (section === "anniversary") {
    return (
      <AnniversaryRouter onBackHome={() => setSection("hub")} />
    );
  }

  if (section === "cumple") {
    return (
      <CumpleRouter onBackHome={() => setSection("hub")} />
    );
  }

  if (section === "sanvalentin") {
    return (
      <SanValentinRouter onBackHome={() => setSection("hub")} />
    );
  }

  /* ===============================
     HUB
  ================================ */
  return (
    <Hub
      onSelect={setSection}
      onLogout={handleLogout}
    />
  );
}