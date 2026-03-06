import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Clock, Heart, Trash2, Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Message, InsertMessage } from "@shared/schema";

interface TimeCapsuleProps {
  onBack: () => void;
}

export default function TimeCapsule({ onBack }: TimeCapsuleProps) {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  const createMutation = useMutation({
    mutationFn: async (message: InsertMessage) => {
      const res = await apiRequest("POST", "/api/messages", message);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      setNewMessage("");
      setAuthor("");
      setIsWriting(false);
      toast({
        title: "Mensaje enviado ❤️",
        description: "Mensaje guardado en la base de datos y notificación enviada en tiempo real.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo guardar el mensaje.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/messages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      setSelectedMessage(null);
      toast({
        title: "Mensaje eliminado",
      });
    },
  });

  const saveMessage = () => {
    if (!newMessage.trim()) return;
    createMutation.mutate({
      message: newMessage.trim(),
      author: author.trim() || "Anónimo",
    });
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
          <p className="text-purple-200/70 text-sm">Mensajes en tiempo real con Neon DB</p>
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
                  <span>{new Date(selectedMessage.createdAt).toLocaleDateString("es-ES")}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteMutation.mutate(selectedMessage.id)}
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
                  <label className="block text-purple-200/70 text-sm mb-2">Tu nombre</label>
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
                    placeholder="Escribe algo especial..."
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
                  disabled={!newMessage.trim() || !author.trim() || createMutation.isPending}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/30 disabled:cursor-not-allowed rounded-xl text-white font-semibold"
                >
                  <Send className="w-4 h-4" />
                  {createMutation.isPending ? "Enviando..." : "Enviar ❤️"}
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

              {isLoading ? (
                <div className="text-center p-8 text-purple-200/50">Cargando mensajes...</div>
              ) : messages.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-purple-300/10 text-center">
                  <div className="text-5xl mb-4">💌</div>
                  <p className="text-purple-200/60">Aún no hay mensajes</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-purple-200/50 text-sm mb-4">{messages.length} mensaje{messages.length !== 1 ? 's' : ''}</p>
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
                        <span className="text-purple-200/40 text-xs">{new Date(msg.createdAt).toLocaleDateString("es-ES")}</span>
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
