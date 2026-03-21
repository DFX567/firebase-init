import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, Plus, Trash2, X, ImageIcon, Heart, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

interface PhotoGalleryProps {
  onBack: () => void;
}

interface Photo {
  id: string;
  src: string;
  publicId: string;
  caption: string;
  date: string;
}

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const COLLECTION = "gallery";

async function uploadToCloudinary(file: File): Promise<{ url: string; publicId: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "nuestro-refugio");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Error subiendo imagen");
  const data = await res.json();
  return { url: data.secure_url, publicId: data.public_id };
}

export default function PhotoGallery({ onBack }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<Photo | null>(null);
  const [caption, setCaption] = useState("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreview, setPendingPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Escuchar fotos en tiempo real desde Firestore
  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Photo));
      setPhotos(data);
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setPendingPreview(URL.createObjectURL(file));
    setCaption("");
    setError(null);
    e.target.value = "";
  };

  const savePhoto = async () => {
    if (!pendingFile) return;
    setUploading(true);
    setError(null);
    try {
      const { url, publicId } = await uploadToCloudinary(pendingFile);
      await addDoc(collection(db, COLLECTION), {
        src: url,
        publicId,
        caption: caption.trim() || "",
        date: new Date().toLocaleDateString("es-ES", {
          year: "numeric", month: "long", day: "numeric",
        }),
        createdAt: Date.now(),
      });
      setPendingFile(null);
      setPendingPreview(null);
      setCaption("");
    } catch (err) {
      setError("Error al subir la foto. Intenta de nuevo.");
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (photo: Photo) => {
    try {
      await deleteDoc(doc(db, COLLECTION, photo.id));
      setSelected(null);
    } catch (err) {
      console.error("Error eliminando foto:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-950 to-purple-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
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

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

        <AnimatePresence mode="wait">
          {pendingPreview ? (
            <motion.div
              key="pending"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-6"
            >
              <img src={pendingPreview} alt="Preview"
                className="w-full rounded-2xl max-h-64 object-cover mb-4" />
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Añade una descripción (opcional)..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 mb-4"
              />
              {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
              <div className="flex gap-3">
                <motion.button whileTap={{ scale: 0.97 }}
                  onClick={() => { setPendingFile(null); setPendingPreview(null); }}
                  disabled={uploading}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 font-semibold disabled:opacity-40">
                  Cancelar
                </motion.button>
                <motion.button whileTap={{ scale: 0.97 }}
                  onClick={savePhoto}
                  disabled={uploading}
                  className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                  {uploading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Subiendo...</>
                  ) : (
                    <><Heart className="w-4 h-4" /> Guardar</>
                  )}
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
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-rose-500/20 to-pink-500/20 hover:from-rose-500/30 hover:to-pink-500/30 rounded-2xl border border-rose-300/20 hover:border-rose-300/40 text-white font-bold mb-6 transition-all"
            >
              <Plus className="w-5 h-5" />
              Añadir foto
            </motion.button>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-rose-300 animate-spin" />
          </div>
        ) : photos.length === 0 && !pendingPreview ? (
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
                  <img src={photo.src} alt={photo.caption || "Foto"}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                <img src={selected.src} alt={selected.caption || "Foto"}
                  className="w-full max-h-[60vh] object-contain" />
                <motion.button whileTap={{ scale: 0.9 }}
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 p-2 bg-black/50 rounded-full">
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
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => deletePhoto(selected)}
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
