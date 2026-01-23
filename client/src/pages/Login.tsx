import { useAuth } from "@/hooks/use-auth";
import { loginWithGoogle, logout } from "@/lib/firebase";
import { Loader2, LogIn, LogOut, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const [isAuthAction, setIsAuthAction] = useState(false);

  const handleLogin = async () => {
    try {
      setIsAuthAction(true);
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthAction(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsAuthAction(true);
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthAction(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-black/20" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black/10 flex flex-col font-body">
      {/* Navigation */}
      <nav className="w-full px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-display font-bold text-xl">
            M
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Minimal.</span>
        </div>
        
        {user ? (
           <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
               <img src={user.photoURL || ''} alt={user.displayName || 'User'} className="w-5 h-5 rounded-full" />
               <span className="max-w-[100px] truncate">{user.displayName}</span>
             </div>
             <button 
               onClick={handleLogout}
               disabled={isAuthAction}
               className="text-sm font-medium hover:text-gray-600 transition-colors flex items-center gap-2"
             >
               {isAuthAction ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
               Sign out
             </button>
           </div>
        ) : (
          <button 
            onClick={handleLogin}
            disabled={isAuthAction}
            className="group px-5 py-2.5 bg-black text-white rounded-full font-medium text-sm hover:bg-black/80 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-black/10"
          >
            {isAuthAction ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Get Started</span>
              </>
            )}
          </button>
        )}
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-20 text-center max-w-4xl mx-auto w-full">
        {user ? (
          <div className="animate-fade-in-up w-full max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-100">
              <CheckCircle2 className="w-4 h-4" />
              Successfully Authenticated
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight leading-[1.1]">
              Welcome back,<br />
              <span className="text-gray-400">{user.displayName?.split(' ')[0]}</span>.
            </h1>
            
            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl mx-auto delay-100 animate-fade-in-up opacity-0">
              You have successfully logged in with Google. This is a minimal demonstration of Firebase Authentication in a clean, production-ready React environment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 delay-200 animate-fade-in-up opacity-0">
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-left hover:border-gray-200 transition-colors">
                <h3 className="font-display font-bold text-lg mb-2">User Profile</h3>
                <p className="text-sm text-gray-500 break-all">{user.email}</p>
                <div className="mt-4 text-xs font-mono text-gray-400 bg-white p-2 rounded border border-gray-100">
                  UID: {user.uid.slice(0, 12)}...
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-left hover:border-gray-200 transition-colors">
                <h3 className="font-display font-bold text-lg mb-2">Session Status</h3>
                <p className="text-sm text-gray-500">Active secure session via Firebase.</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-green-600 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Connected
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
              <span className="w-2 h-2 bg-black rounded-full" />
              Minimal Starter Kit
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tighter leading-[1] bg-gradient-to-b from-black to-gray-600 bg-clip-text text-transparent">
              Simplicity is the<br />ultimate sophistication.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-500 mb-12 leading-relaxed max-w-2xl mx-auto delay-100 animate-fade-in-up opacity-0">
              A beautifully crafted foundation for your next project.
              Authentication, routing, and styling already handled.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 delay-200 animate-fade-in-up opacity-0">
              <button 
                onClick={handleLogin}
                className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-semibold text-lg hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/20 flex items-center justify-center gap-2"
              >
                Start Building <ArrowRight className="w-5 h-5" />
              </button>
              <a 
                href="https://firebase.google.com/docs/auth"
                target="_blank" 
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
              >
                Documentation
              </a>
            </div>

            {/* Feature Pills */}
            <div className="mt-20 flex flex-wrap justify-center gap-3 opacity-0 animate-fade-in-up delay-300">
              {['React 18', 'TypeScript', 'TailwindCSS', 'Firebase Auth', 'Framer Motion', 'Vite'].map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-gray-500 text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Minimal App. Crafted with precision.</p>
      </footer>
    </div>
  );
}
