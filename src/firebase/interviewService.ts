import {
  db,
  hasFirebaseConfig,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  ADMIN_EMAIL,
} from './config';
import type { User } from 'firebase/auth';

const INTERVIEW_DOC_PATH = 'metrics/interviews';

export interface InterviewData {
  count: number;
  lastUpdated: number; // timestamp millis
  updatedBy: string;
}

const defaultData: InterviewData = {
  count: 0,
  lastUpdated: Date.now(),
  updatedBy: '',
};

/**
 * Returns true if the given user is the authorized admin (founder).
 */
export function isAdmin(user: User | null): boolean {
  return user !== null && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

/**
 * Subscribe to real-time counter updates from Firestore.
 * Calls `onUpdate` whenever the document changes.
 * If Firestore is not configured, calls `onUpdate` with the default value.
 * Returns an unsubscribe function.
 */
export function subscribeInterviewCount(
  onUpdate: (data: InterviewData) => void,
  onError?: (err: Error) => void,
): () => void {
  if (!hasFirebaseConfig || !db) {
    // Firestore not configured — use local default
    onUpdate(defaultData);
    return () => {};
  }

  const ref = doc(db, INTERVIEW_DOC_PATH);

  const unsub = onSnapshot(
    ref,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as InterviewData;
        onUpdate({ ...defaultData, ...data });
      } else {
        // Document doesn't exist yet — initialize it
        setDoc(ref, defaultData).catch(() => {});
        onUpdate(defaultData);
      }
    },
    (error) => {
      console.warn('Firestore snapshot error:', error);
      onError?.(error);
      onUpdate(defaultData);
    },
  );

  return unsub;
}

/**
 * Increment the interview counter by 1.
 * Only works if the user is the admin.
 * Throws if not authorized or Firestore is unavailable.
 */
export async function incrementInterviewCount(user: User | null): Promise<number> {
  if (!isAdmin(user)) {
    throw new Error('Only the founder can modify the interview counter.');
  }
  if (!hasFirebaseConfig || !db) {
    throw new Error('Firestore is not configured. The counter cannot persist.');
  }

  const ref = doc(db, INTERVIEW_DOC_PATH);
  const snapshot = await getDoc(ref);
  const currentData = snapshot.exists()
    ? (snapshot.data() as InterviewData)
    : defaultData;

  const newCount = currentData.count + 1;

  await setDoc(ref, {
    count: newCount,
    lastUpdated: Date.now(),
    updatedBy: user!.email ?? '',
  });

  return newCount;
}

/**
 * Decrement the interview counter by 1 (minimum 0).
 * Only works if the user is the admin.
 * Throws if not authorized or Firestore is unavailable.
 */
export async function decrementInterviewCount(user: User | null): Promise<number> {
  if (!isAdmin(user)) {
    throw new Error('Only the founder can modify the interview counter.');
  }
  if (!hasFirebaseConfig || !db) {
    throw new Error('Firestore is not configured. The counter cannot persist.');
  }

  const ref = doc(db, INTERVIEW_DOC_PATH);
  const snapshot = await getDoc(ref);
  const currentData = snapshot.exists()
    ? (snapshot.data() as InterviewData)
    : defaultData;

  const newCount = Math.max(0, currentData.count - 1);

  await setDoc(ref, {
    count: newCount,
    lastUpdated: Date.now(),
    updatedBy: user!.email ?? '',
  });

  return newCount;
}

/**
 * Fetch the current interview count (one-time read, no subscription).
 * Falls back to 0 if Firestore is unavailable.
 */
export async function fetchInterviewCount(): Promise<number> {
  if (!hasFirebaseConfig || !db) return 0;

  try {
    const ref = doc(db, INTERVIEW_DOC_PATH);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      return (snapshot.data() as InterviewData).count;
    }
    return 0;
  } catch {
    return 0;
  }
}
