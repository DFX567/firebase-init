import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5lgy3Cm4cjHkVuSzImYWDRFI7RMbZFTA",
  authDomain: "pagina-web-en-tiempo-real.firebaseapp.com",
  projectId: "pagina-web-en-tiempo-real",
  storageBucket: "pagina-web-en-tiempo-real.firebasestorage.app",
  messagingSenderId: "262261395357",
  appId: "1:262261395357:web:2b3f08995339a8206c2974",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);