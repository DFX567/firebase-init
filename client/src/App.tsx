import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    console.log("App cargada - chequeando auth...");

    // Escucha cambios en auth (persistencia y redirect)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("onAuthStateChanged disparado:", currentUser ? currentUser.displayName : "No user");
      setUser(currentUser);
      setLoading(false);
    });

    // Captura explícitamente el resultado del redirect (muy importante al volver)
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log("getRedirectResult: Login exitoso al volver", result.user.displayName);
          setUser(result.user);
          setLoading(false);
        } else {
          console.log("getRedirectResult: No result");
        }
      })
      .catch((error) => {
        console.error("Error en getRedirectResult:", error.code, error.message);
        setErrorMsg("Error al volver del login: " + error.message);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
  setLoading(true);
  setErrorMsg(null);
  const provider = new GoogleAuthProvider();
  
  // Truco para móvil: abre popup manualmente
  signInWithPopup(auth, provider)
    .then((result) => {
      setUser(result.user);
      setLoading(false);
      console.log("Popup login exitoso:", result.user.displayName);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error popup:", error.code, error.message);
      if (error.code === 'auth/popup-blocked') {
        setErrorMsg("Popup bloqueado. Toca el ícono de candado arriba en la barra y permite pop-ups para este sitio.");
      } else {
        setErrorMsg("Error: " + error.message);
      }
    });
};

// En useEffect solo deja el onAuthStateChanged (quita getRedirectResult)
useEffect(() => {
  console.log("App cargada - chequeando auth...");
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("onAuthStateChanged:", currentUser ? currentUser.displayName : "No user");
    setUser(currentUser);
    setLoading(false);
  });
  return () => unsubscribe();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center">
        <p className="text-white text-2xl animate-pulse">Cargando sesión... 💕</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-rose-600 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
        Para mi Lina Eterna 💕
      </h1>

      {user ? (
        <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-md w-full">
          <p className="text-3xl font-semibold text-rose-600 mb-4">
            ¡Bienvenida, {user.displayName || "mi amor"}! ❤️
          </p>
          <p className="text-lg text-gray-700">
            Sesión activa. ¡Ahora agregamos los contadores y regalos! 💑
          </p>
        </div>
      ) : (
        <div>
          <button
            onClick={handleLogin}
            className="bg-white text-rose-600 px-10 py-5 rounded-full text-2xl font-bold shadow-xl hover:bg-rose-50 transition transform hover:scale-105"
          >
            Entrar con Google
          </button>
          <p className="text-white mt-6 text-lg">
            Toca y elige tu cuenta Google 💖
          </p>
          {errorMsg && (
            <p className="text-red-300 mt-4 text-lg">{errorMsg}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;