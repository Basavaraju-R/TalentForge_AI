import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

console.log("=== FIREBASE DIAGNOSTICS ===");
console.log("Firebase project:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log("Firebase API key loaded:", Boolean(import.meta.env.VITE_FIREBASE_API_KEY));
console.log("Firebase API key length:", import.meta.env.VITE_FIREBASE_API_KEY?.length);
console.log("Firebase API key actual value (first 5 chars):", import.meta.env.VITE_FIREBASE_API_KEY?.substring(0, 5));
console.log("============================");
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup, signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber };
