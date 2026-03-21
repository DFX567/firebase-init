import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { sanValentinContent, anniversaryContent, cumpleContent } from "@/data/events";

// ─── Colección en Firestore ───────────────────────────────────────────────────
const COLLECTION = "siteContent";

// ─── Key helpers (sin cambios, compatibles con AdminEditor) ───────────────────
export const getContentKey = (
  section: string,
  type: string,
  year?: number,
  day?: number
): string => {
  if (section === "memories") return `edit-memories-poem-${day}`;
  if (section === "flores") return "edit-flores-letter";
  return `edit-${section}-${type}-${year}`;
};

// ─── Contenido por defecto ────────────────────────────────────────────────────
export const floresDefaultLetter = `Hoy, 21 de marzo, el mundo se viste de amarillo
y yo solo puedo pensar en ti.

Las flores amarillas no son casualidad.
Son la forma en que el universo dice
"alguien te quiere, alguien te piensa,
alguien te lleva en el corazón."

Y ese alguien soy yo.

Eres la luz que llena mi espacio,
el color más brillante en mis días grises.
Como el girasol que siempre busca el sol,
yo siempre te busco a ti.

Hoy y cada 21 de marzo,
quiero que sepas que te amo.
Que tu sonrisa es el sol que me guía
y tu presencia, el jardín más bello
que he tenido el privilegio de conocer.

Feliz Día de las Flores Amarillas,
mi girasol favorito.

Con todo mi amor ❤️`;

export const defaultPoems = [
  {
    title: "En tu mirada",
    text: `En tu mirada encuentro el universo,
estrellas que brillan solo para mí.
Cada instante contigo es un verso,
cada abrazo, un poema sin fin.

No necesito buscar en el cielo
lo que ya tengo aquí, a tu lado.
Eres mi calma, mi suelo,
el amor más real que he encontrado.`,
  },
  {
    title: "Contigo",
    text: `Contigo aprendí que el tiempo se detiene
cuando te miro y sonríes así.
Que el mundo es más bello cuando te tiene
y yo soy más yo cuando estoy aquí.

Cada mañana que llega contigo
es un regalo que no merecí.
Pero te quedo, te abrazo, te digo:
eres lo mejor que me ha pasado a mí.`,
  },
  {
    title: "Pequeñas cosas",
    text: `Son las pequeñas cosas las que pesan,
tu voz al despertar, tu risa al viento.
Las noches que hablamos y no cesan,
y ese silencio lleno de contento.

No hace falta grandes gestos ni poemas
para saber lo mucho que te quiero.
Basta con que estés, y todo tema
se vuelve simple y liviano y verdadero.`,
  },
  {
    title: "Mi lugar favorito",
    text: `Mi lugar favorito no es un sitio,
no tiene coordenadas ni dirección.
Es un espacio cálido y bendito
que solo existe en tu conversación.

Es ese instante cuando me entiendes,
cuando me ves sin necesitar palabras.
Cuando el mundo afuera se suspende
y solo somos tú, yo, y nuestras almas.`,
  },
  {
    title: "Universo paralelo",
    text: `Si existiera un universo paralelo
elegiría el mismo camino otra vez.
Volvería a encontrarte bajo el mismo cielo,
a enamorarme de ti, vez tras vez.

Porque no creo en el azar ni la suerte,
creo en el hilo invisible que nos une.
En que existimos para conocernos fuerte
y en cada vida nuestra historia continúe.`,
  },
  {
    title: "Gracias",
    text: `Gracias por quedarte cuando pude haber perdido,
por elegirme cuando tuviste opciones.
Por amar cada parte de lo que has conocido
y construir conmigo mil razones.

Gracias por los días en que fui difícil,
por la paciencia que nunca terminó.
Por hacer de lo simple algo increíble
y de nosotros, lo mejor que soy.`,
  },
  {
    title: "Esta noche",
    text: `Esta noche el cielo está más claro,
las estrellas parecen más brillantes.
Todo lo que tengo es más raro
y los momentos, más importantes.

Quizás es que pienso en ti de nuevo
y el mundo cambia cuando lo hago.
Que cada vez que te sueño o te veo,
el corazón se vuelve un lago.`,
  },
];

export const getDefaultContent = (
  section: string,
  type: string,
  year: number,
  day: number
): string => {
  switch (section) {
    case "sanvalentin":
      return type === "letter"
        ? sanValentinContent.letter.text(year)
        : sanValentinContent.poem.text(year);
    case "anniversary":
      return type === "letter"
        ? anniversaryContent.letter.text(year)
        : anniversaryContent.poem.text(year);
    case "cumple":
      return cumpleContent.letter.text(year);
    case "flores":
      return floresDefaultLetter;
    case "memories":
      return defaultPoems[day]?.text ?? "";
    default:
      return "";
  }
};

// ─── Cache local para evitar parpadeos ───────────────────────────────────────
const cache: Record<string, string> = {};

// ─── Leer contenido desde Firestore (una sola vez) ───────────────────────────
export const getContent = async (
  key: string,
  defaultContent: string
): Promise<string> => {
  // Si ya está en caché, devuelve inmediatamente
  if (cache[key] !== undefined) return cache[key];

  try {
    const ref = doc(db, COLLECTION, key);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const value = snap.data().value as string;
      cache[key] = value;
      return value;
    }
  } catch (err) {
    console.error("Error leyendo contenido:", err);
  }

  cache[key] = defaultContent;
  return defaultContent;
};

// ─── Guardar contenido en Firestore ──────────────────────────────────────────
export const setContent = async (key: string, content: string): Promise<void> => {
  try {
    const ref = doc(db, COLLECTION, key);
    await setDoc(ref, { value: content, updatedAt: new Date().toISOString() });
    cache[key] = content; // actualizar caché local
  } catch (err) {
    console.error("Error guardando contenido:", err);
    throw err;
  }
};

// ─── Escuchar cambios en tiempo real (para mostrar cambios sin recargar) ──────
export const subscribeToContent = (
  key: string,
  defaultContent: string,
  callback: (content: string) => void
): Unsubscribe => {
  const ref = doc(db, COLLECTION, key);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      const value = snap.data().value as string;
      cache[key] = value;
      callback(value);
    } else {
      callback(defaultContent);
    }
  });
};
