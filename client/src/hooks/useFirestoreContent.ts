import { useState, useEffect } from "react";
import {
  getContentKey,
  getDefaultContent,
  subscribeToContent,
} from "@/utils/contentOverrides";

interface UseFirestoreContentOptions {
  section: string;
  type: "letter" | "poem";
  year?: number;
  day?: number;
}

/**
 * Hook que escucha el contenido de una carta/poema en tiempo real desde Firestore.
 * Si el admin edita el contenido, se actualiza automáticamente en todos los dispositivos.
 */
export function useFirestoreContent({
  section,
  type,
  year = new Date().getFullYear(),
  day = new Date().getDay(),
}: UseFirestoreContentOptions): { content: string; loading: boolean } {
  const key = getContentKey(section, type, year, day);
  const defaultContent = getDefaultContent(section, type, year, day);

  const [content, setContent] = useState<string>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToContent(key, defaultContent, (value) => {
      setContent(value);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [key, defaultContent]);

  return { content, loading };
}
