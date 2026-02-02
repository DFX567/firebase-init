import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Clock, Heart, Trash2, Plus } from "lucide-react";

interface TimeCapsuleProps {
  onBack: () => void;
}

interface CapsuleMessage {
  id: string;
  message: string;
  date: string;
  author: string;
}

const STORAGE_KEY = "time-capsule-messages";

export default function TimeCapsule({ onBack }: TimeCapsuleProps) {
  const [messages, setMessages] = useState<CapsuleMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<CapsuleMessage | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  const saveMessage = () => {
    if (!newMessage.trim()) return;

    const message: CapsuleMessage = {
      id: Date.now().toString(),
      message: newMessage.trim(),
      date: new Date().toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      author: author.trim() || "Anónimo"
    };

    const updated = [message, ...messages];
    setMessages(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNewMessage("");
    setAuthor("");
    setIsWriting(false);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 p-4 md:p-8">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        data-testid="button-back-capsule"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-sm border border-purple-300/30 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-purple-100 text-sm md:text-base">Volver</span>
      </motion.button>

      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex p-4 rounded-full bg-purple-500/20 border border-purple-300/30 mb-4">
            <Clock className="w-10 h-10 md:w-12 md:h-12 text-purple-300" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-purple-100 mb-2">Cápsula del Tiempo</h1>
          <p className="text-purple-200/70 text-sm">Guarda mensajes especiales para el futuro</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedMessage ? (
            <motion.div
              key="view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-purple-300/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-purple-200/60 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{selectedMessage.date}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
              
              <div className="bg-purple-900/30 rounded-2xl p-6 mb-4 border border-purple-300/10">
                <p className="text-purple-50 text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-purple-300 text-sm flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-purple-300" />
                  {selectedMessage.author}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl text-purple-100 text-sm"
                >
                  Cerrar
                </motion.button>
              </div>
            </motion.div>
          ) : isWriting ? (
            <motion.div
              key="write"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-purple-300/20"
            >
              <h2 className="text-xl font-bold text-purple-100 mb-4">Nuevo mensaje</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-200/70 text-sm mb-2">Tu nombre (opcional)</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="¿Quién escribe?"
                    className="w-full px-4 py-3 bg-purple-900/30 border border-purple-300/20 rounded-xl text-purple-50 placeholder:text-purple-300/40 focus:outline-none focus:border-purple-400/50"
                  />
                </div>
                
                <div>
                  <label className="block text-purple-200/70 text-sm mb-2">Tu mensaje</label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe algo especial para el futuro..."
                    rows={5}
                    className="w-full px-4 py-3 bg-purple-900/30 border border-purple-300/20 rounded-xl text-purple-50 placeholder:text-purple-300/40 focus:outline-none focus:border-purple-400/50 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsWriting(false)}
                  className="flex-1 px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl text-purple-100 font-semibold"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveMessage}
                  disabled={!newMessage.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/30 disabled:cursor-not-allowed rounded-xl text-white font-semibold"
                >
                  <Send className="w-4 h-4" />
                  Guardar
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsWriting(true)}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl text-white font-bold mb-6 shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Escribir nuevo mensaje
              </motion.button>

              {messages.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-purple-300/10 text-center">
                  <div className="text-5xl mb-4">💌</div>
                  <p className="text-purple-200/60">Aún no hay mensajes guardados</p>
                  <p className="text-purple-200/40 text-sm mt-2">Escribe tu primer mensaje para la cápsula del tiempo</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-purple-200/50 text-sm mb-4">{messages.length} mensaje{messages.length !== 1 ? 's' : ''} guardado{messages.length !== 1 ? 's' : ''}</p>
                  {messages.map((msg, index) => (
                    <motion.button
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedMessage(msg)}
                      className="w-full text-left bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-purple-300/10 hover:border-purple-300/20 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-300 text-sm flex items-center gap-2">
                          <Heart className="w-3 h-3 fill-purple-300" />
                          {msg.author}
                        </span>
                        <span className="text-purple-200/40 text-xs">{msg.date}</span>
                      </div>
                      <p className="text-purple-100 line-clamp-2">{msg.message}</p>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
