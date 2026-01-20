import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-black/5 flex items-center justify-center mx-auto mb-6 transform -rotate-6">
          <AlertCircle className="h-10 w-10 text-gray-400" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
          Page not found
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          The page you are looking for doesn't exist or has been moved to another location.
        </p>

        <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transform duration-200">
          Return Home
        </Link>
      </div>
    </div>
  );
}
