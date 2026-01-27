import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Heart, Download, Share2, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import StarField from "@/components/StarField";
import Planet3D from "@/components/animations/Planet3D";

interface PhotoGalleryProps {
  year: number;
  onBack: () => void;
}

// Datos de ejemplo - reemplaza con tus fotos reales
const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
    title: "Nuestro primer día juntos",
    date: "10 de Junio, 2024",
    description: "El día que cambió nuestras vidas para siempre 💕"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
    title: "Atardecer en la playa",
    date: "15 de Julio, 2024",
    description: "Cuando el cielo se pintó de colores para nosotros"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800",
    title: "Cena romántica",
    date: "14 de Agosto, 2024",
    description: "Una noche mágica que nunca olvidaremos"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800",
    title: "Aventura en las montañas",
    date: "20 de Septiembre, 2024",
    description: "Conquistando cimas juntos"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    title: "Bailando bajo las estrellas",
    date: "5 de Octubre, 2024",
    description: "Nuestra canción favorita sonando"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
    title: "Día de campo",
    date: "12 de Noviembre, 2024",
    description: "Risas, naturaleza y amor"
  }
];

export default function PhotoGallery({ year, onBack }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const currentPhoto = selectedPhoto !== null ? photos.find(p => p.id === selectedPhoto) : null;
  const currentIndex = selectedPhoto !== null ? photos.findIndex(p => p.id === selectedPhoto) : -1;

  const nextPhoto = () => {
    if (currentIndex < photos.length - 1) {
      setSelectedPhoto(photos[currentIndex + 1].id);
    }
  };

  const prevPhoto = () => {
    if (currentIndex > 0) {
      setSelectedPhoto(photos[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Fondo romántico */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-950/90 via-pink-900/85 to-purple-950/90">
        <StarField count={100} />
      </div>

      {/* Planeta decorativo */}
      <Planet3D 
        size={400} 
        position={{ x: "90%", y: "80%" }}
        colors={["#fecdd3", "#fb7185", "#e11d48"]}
        rotationSpeed={100}
        type="moon"
      />

      {/* Corazones flotantes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-300/10 text-5xl pointer-events-none"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 50
          }}
          animate={{
            y: -50,
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 20 + 25,
            repeat: Infinity,
            delay: Math.random() * 10
          }}
        >
          💕
        </motion.div>
      ))}

      {/* Header */}
      <div className="relative z-10 pt-4 md:pt-6 px-4 md:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-all backdrop-blur-2xl border border-rose-300/30 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-semibold text-rose-100 text-sm md:text-base">Volver</span>
        </motion.button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-200 via-pink-100 to-rose-200 mb-3">
            Galería de Recuerdos
          </h1>
          <p className="text-rose-100/70 text-base md:text-xl">
            Cada foto cuenta nuestra historia de amor 📸💕
          </p>
        </motion.div>

        {/* Grid de fotos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedPhoto(photo.id)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-rose-300/20 hover:border-rose-300/50 transition-all shadow-xl"
            >
              {/* Imagen */}
              <div className="aspect-square overflow-hidden">
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay con info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                  {photo.title}
                </h3>
                <p className="text-rose-200/80 text-xs md:text-sm">
                  {photo.date}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <ZoomIn className="w-4 h-4 text-rose-300" />
                  <span className="text-rose-300 text-xs">Click para ver</span>
                </div>
              </div>

              {/* Icono de corazón */}
              <div className="absolute top-3 right-3 bg-rose-500/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de foto ampliada */}
      <AnimatePresence>
        {currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Contenedor de imagen */}
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              {/* Botón cerrar */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 md:-right-12 md:top-0 p-3 bg-rose-500/20 hover:bg-rose-500/30 rounded-full backdrop-blur-sm border border-rose-300/30 transition-all z-10"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Navegación */}
              {currentIndex > 0 && (
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 p-3 bg-rose-500/20 hover:bg-rose-500/30 rounded-full backdrop-blur-sm border border-rose-300/30 transition-all z-10"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              )}

              {currentIndex < photos.length - 1 && (
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 p-3 bg-rose-500/20 hover:bg-rose-500/30 rounded-full backdrop-blur-sm border border-rose-300/30 transition-all z-10"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              )}

              {/* Imagen principal */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-2xl overflow-hidden border border-rose-300/30 shadow-2xl">
                <img 
                  src={currentPhoto.url} 
                  alt={currentPhoto.title}
                  className="w-full max-h-[60vh] md:max-h-[70vh] object-contain"
                />

                {/* Info de la foto */}
                <div className="p-4 md:p-6 bg-gradient-to-t from-black/50 to-transparent">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {currentPhoto.title}
                  </h2>
                  <p className="text-rose-200/80 text-sm md:text-base mb-3">
                    {currentPhoto.date}
                  </p>
                  <p className="text-rose-100/70 text-sm md:text-base mb-4">
                    {currentPhoto.description}
                  </p>

                  {/* Acciones */}
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg border border-rose-400/30 transition-all text-sm">
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Descargar</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 rounded-lg border border-pink-400/30 transition-all text-sm">
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Compartir</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg border border-rose-400/30 transition-all text-sm ml-auto">
                      <Heart className="w-4 h-4 fill-rose-300 text-rose-300" />
                      <span className="hidden sm:inline">Favorito</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Contador */}
              <p className="text-center text-rose-200/60 text-sm mt-4">
                {currentIndex + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}