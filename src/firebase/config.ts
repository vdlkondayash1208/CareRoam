import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Firebase configuration
// Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

const hasFirebaseConfig = firebaseConfig.apiKey !== '' && firebaseConfig.projectId !== '';

let app: ReturnType<typeof initializeApp> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;

if (hasFirebaseConfig) {
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
  console.log('Firebase not configured — using local-only mode');
}

export { app, auth, db, hasFirebaseConfig, onAuthStateChanged, signInWithEmailAndPassword, signOut };
export type { User };
export { doc, getDoc, setDoc, onSnapshot };

// Default admin email — the only account allowed to modify the counter
export const ADMIN_EMAIL = 'vdlkondayash1208@gmail.com';
