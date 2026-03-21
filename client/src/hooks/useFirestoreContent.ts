import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { getContentKey, getDefaultContent } from "@/utils/contentOverrides";

interface UseFirestoreContentOptions {
  section: string;
  type: "letter" | "poem";
  year?: number;
  day?: number;
}

/**
 * Hook que escucha el contenido en tiempo real desde Firestore.
 * Si no existe en Firestore, usa el contenido por defecto de events.ts.
 */
export function useFirestoreContent({
  section,
  type,
  year = new Date().getFullYear(),
  day = new Date().getDay(),
}: UseFirestoreContentOptions): { content: string; loading: boolean } {
  const key = getContentKey(section, type, year, day);
  const defaultContent = getDefaultContent(section, type, year, day);

  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setContent("");

    const ref = doc(db, "siteContent", key);

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists() && snap.data()?.value) {
          setContent(snap.data().value as string);
        } else {
          // No existe en Firestore — usar el texto por defecto
          setContent(defaultContent);
        }
        setLoading(false);
      },
      (error) => {
        // Error de Firestore (permisos, sin internet, etc.) — usar texto por defecto
        setContent("ERROR: " + error.code + " - " + error.message);
        setContent(defaultContent);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [key, defaultContent]);

  return { content, loading };
}
