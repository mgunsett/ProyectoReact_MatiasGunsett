import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANUSbzxQ9QKoZQ7Rj08nEBgbs8k86g8Ak",
  authDomain: "be-real-matiasgunsett.firebaseapp.com",
  projectId: "be-real-matiasgunsett",
  storageBucket: "be-real-matiasgunsett.appspot.com",
  messagingSenderId: "598434178605",
  appId: "1:598434178605:web:6bef70ce6a8c5a6b4afaa4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos la base de datos //!siempre es la mismasentencia para importar la base de datos !
export const db = getFirestore(app);