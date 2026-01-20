import { useAuth, signInWithGoogle, signOut } from "@/lib/firebase";
import { LogIn, LogOut, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer transition-transform active:scale-95">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                TaskFlow
              </span>
            </Link>

            <div className="flex items-center gap-4">
              {!loading && (
                user ? (
                  <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="hidden md:flex flex-col items-end">
                      <span className="text-sm font-medium text-foreground">{user.displayName}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                    {user.photoURL && (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || "User"} 
                        className="w-9 h-9 rounded-full border-2 border-primary/20"
                      />
                    )}
                    <button
                      onClick={() => signOut()}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={signInWithGoogle}
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-95"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
