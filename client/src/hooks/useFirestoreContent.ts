import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getContentKey, getDefaultContent } from "@/utils/contentOverrides";

interface UseFirestoreContentOptions {
  section: string;
  type: "letter" | "poem";
  year?: number;
  day?: number;
}

export function useFirestoreContent({
  section,
  type,
  year = new Date().getFullYear(),
  day = new Date().getDay(),
}: UseFirestoreContentOptions): { content: string; loading: boolean } {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = getContentKey(section, type, year, day);
    const def = getDefaultContent(section, type, year, day);
    setContent(def);
    setLoading(false);
    getDoc(doc(db, "siteContent", key)).then((snap) => {
      if (snap.exists() && snap.data()?.value) {
        setContent(snap.data().value as string);
      }
    }).catch(() => {});
  }, [section, type, year, day]);

  return { content, loading };
}
