import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

/** True when the required env vars are present and we can connect to Firebase. */
export const firebaseConfigured = firebaseConfig.apiKey !== '' && firebaseConfig.projectId !== '';

let app = null;
let auth = null;
let db = null;

if (firebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true') {
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(db, 'localhost', 8080);
    }

    console.log('Firebase initialized successfully');
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
    app = null;
    auth = null;
    db = null;
  }
} else {
  console.log('Firebase not configured — set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID to enable.');
}

export { app, auth, db };
export { onAuthStateChanged, signInWithEmailAndPassword, signOut };
export { doc, getDoc, setDoc, onSnapshot };

/** The only email allowed to modify validation data. */
export const ADMIN_EMAIL = 'vdlkondayash1208@gmail.com';
