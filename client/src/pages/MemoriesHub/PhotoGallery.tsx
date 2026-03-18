import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, Plus, Trash2, X, ImageIcon, Heart } from "lucide-react";

interface PhotoGalleryProps {
  onBack: () => void;
}

interface Photo {
  id: string;
  src: string;
  caption: string;
  date: string;
}

const STORAGE_KEY = "gallery-photos";

export default function PhotoGallery({ onBack }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<Photo | null>(null);
  const [caption, setCaption] = useState("");
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setPhotos(JSON.parse(saved));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setPendingPhoto(ev.target.result as string);
        setCaption("");
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const savePhoto = () => {
    if (!pendingPhoto) return;
    const photo: Photo = {
      id: Date.now().toString(),
      src: pendingPhoto,
      caption: caption.trim() || "",
      date: new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" }),
    };
    const updated = [photo, ...photos];
    setPhotos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setPendingPhoto(null);
    setCaption("");
  };

  const deletePhoto = (id: string) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-950 to-purple-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        data-testid="button-back-gallery"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-white/70 text-sm md:text-base">Volver</span>
      </motion.button>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-5">
            <Camera className="w-10 h-10 md:w-12 md:h-12 text-rose-300" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Galería de Fotos</h1>
          <p className="text-white/40 text-sm">Nuestros momentos especiales</p>
        </motion.div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <AnimatePresence mode="wait">
          {pendingPhoto ? (
            <motion.div
              key="pending"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6"
            >
              <img
                src={pendingPhoto}
                alt="Preview"
                className="w-full rounded-2xl max-h-64 object-cover mb-4"
              />
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Añade una descripción (opcional)..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 mb-4"
              />
              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setPendingPhoto(null)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 font-semibold"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={savePhoto}
                  className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Guardar
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="add"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => fileRef.current?.click()}
              data-testid="button-add-photo"
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-rose-500/20 to-pink-500/20 hover:from-rose-500/30 hover:to-pink-500/30 rounded-2xl border border-rose-300/20 hover:border-rose-300/40 text-white font-bold mb-6 transition-all"
            >
              <Plus className="w-5 h-5" />
              Añadir foto
            </motion.button>
          )}
        </AnimatePresence>

        {photos.length === 0 && !pendingPhoto ? (
          <div className="bg-white/3 backdrop-blur-xl rounded-3xl p-12 border border-white/5 text-center">
            <ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">Aún no hay fotos</p>
            <p className="text-white/25 text-sm mt-2">Añade tu primera foto especial</p>
          </div>
        ) : (
          <div className="columns-2 gap-3 space-y-3">
            {photos.map((photo, index) => (
              <motion.button
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelected(photo)}
                className="w-full break-inside-avoid rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all group"
              >
                <div className="relative">
                  <img
                    src={photo.src}
                    alt={photo.caption || "Foto"}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 max-w-lg w-full"
            >
              <div className="relative">
                <img
                  src={selected.src}
                  alt={selected.caption || "Foto"}
                  className="w-full max-h-[60vh] object-contain"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 p-2 bg-black/50 rounded-full"
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>
              <div className="p-5">
                {selected.caption && (
                  <p className="text-white/80 text-base mb-2">{selected.caption}</p>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-white/30 text-sm">{selected.date}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deletePhoto(selected.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-300 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
