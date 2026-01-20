import { useItems } from "@/hooks/use-items";
import { ItemCard } from "@/components/item-card";
import { CreateItemDialog } from "@/components/create-item-dialog";
import { useAuth, signInWithGoogle } from "@/lib/firebase";
import { Loader2, ShieldCheck, Sparkles, Inbox } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { data: items, isLoading, error } = useItems();
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Marketing / Landing State for unauthenticated users
  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Productivity Reimagined</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground text-balance">
            Organize your work, <span className="text-gradient">beautifully.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground text-balance max-w-lg mx-auto leading-relaxed">
            A simple, elegant task manager designed to help you focus on what matters most. No clutter, just clarity.
          </p>

          <div className="pt-4">
            <button
              onClick={signInWithGoogle}
              className="
                group relative px-8 py-4 rounded-full font-semibold text-lg
                bg-foreground text-background
                shadow-xl shadow-foreground/10
                hover:shadow-2xl hover:shadow-foreground/20 hover:-translate-y-1
                active:translate-y-0
                transition-all duration-300
              "
            >
              <span className="flex items-center gap-2">
                Get Started with Google
                <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Fast", desc: "Built for speed with instant interactions." },
              { title: "Secure", desc: "Powered by Firebase & Google security." },
              { title: "Beautiful", desc: "Designed with attention to every pixel." }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
                <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // App State for authenticated users
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {user.displayName?.split(' ')[0]}
        </h1>
        <p className="text-muted-foreground">
          You have {items?.filter(i => !i.completed).length || 0} pending tasks today.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-muted/20 animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20 text-center">
          <p className="text-destructive font-medium">Failed to load tasks</p>
          <button onClick={() => window.location.reload()} className="mt-4 text-sm underline">Try again</button>
        </div>
      ) : (
        <div className="space-y-4 pb-24">
          <AnimatePresence mode="popLayout">
            {items?.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto text-muted-foreground/50">
                  <Inbox className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-display font-semibold">All caught up!</h3>
                  <p className="text-muted-foreground">You have no tasks on your list.</p>
                </div>
              </motion.div>
            ) : (
              items?.map((item, index) => (
                <ItemCard key={item.id} item={item} index={index} />
              ))
            )}
          </AnimatePresence>
        </div>
      )}

      <CreateItemDialog />
    </div>
  );
}
