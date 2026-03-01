// Importamos los módulos desde el CDN de Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Tu configuración que acabas de obtener
const firebaseConfig = {
  apiKey: "AIzaSyCdCRnldMdEPZN_S7yh9hs_wN7mBgy9kjQ",
  authDomain: "olive-hrm-43fdc.firebaseapp.com",
  projectId: "olive-hrm-43fdc",
  storageBucket: "olive-hrm-43fdc.firebasestorage.app",
  messagingSenderId: "21840925542",
  appId: "1:21840925542:web:355586d8c3896b289aeea7",
  measurementId: "G-4XWFZ72RH6"
};

// Inicializamos Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const auth = getAuth(app);


