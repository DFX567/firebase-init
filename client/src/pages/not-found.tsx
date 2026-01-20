import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-background">
      <div className="bg-card flex flex-col items-center p-12 text-center rounded-3xl border border-border shadow-2xl max-w-md mx-4">
        <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">404</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>

        <Link href="/" className="w-full">
          <button className="
            w-full py-3 px-6 rounded-xl font-semibold
            bg-primary text-primary-foreground
            shadow-lg shadow-primary/25
            hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5
            active:translate-y-0
            transition-all duration-200
          ">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
