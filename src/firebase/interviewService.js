import {
  db,
  firebaseConfigured,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  ADMIN_EMAIL,
} from '../lib/firebase';

const METRICS_DOC_PATH = 'settings/metrics';

export const defaultData = {
  validationInterviews: 0,
  lastUpdated: Date.now(),
  updatedBy: '',
};

/** True when Firestore is available for reads/writes. */
export const firestoreAvailable = firebaseConfigured && db !== null;

/**
 * Returns true if the given user is the authorized admin (founder).
 */
export function isAdmin(user) {
  return user !== null && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

/**
 * Subscribe to real-time counter updates from Firestore.
 * Calls `onUpdate` whenever the document changes.
 * If Firestore is not configured, calls `onUpdate` with the default value.
 * Returns an unsubscribe function.
 */
export function subscribeInterviewCount(onUpdate, onError) {
  if (!firestoreAvailable) {
    console.log('Firestore not configured. Counter unavailable.');
    onUpdate(defaultData);
    return () => {};
  }

  const ref = doc(db, METRICS_DOC_PATH);

  const unsub = onSnapshot(
    ref,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        console.log('Firestore value:', data.validationInterviews);
        onUpdate({ ...defaultData, ...data });
      } else {
        // Document doesn't exist yet — initialize it
        console.log('Firestore value: document does not exist, creating defaults');
        setDoc(ref, defaultData).catch((err) => {
          console.warn('Failed to create metrics document:', err);
        });
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
 * Increment the validationInterviews counter by 1.
 * Only works if the user is the admin.
 * Throws if not authorized or Firestore is unavailable.
 */
export async function incrementInterviewCount(user) {
  if (!isAdmin(user)) {
    throw new Error('Only the founder can modify the interview counter.');
  }
  if (!firestoreAvailable) {
    throw new Error('Firestore is not configured. The counter cannot persist.');
  }

  const ref = doc(db, METRICS_DOC_PATH);
  const snapshot = await getDoc(ref);
  const currentData = snapshot.exists()
    ? snapshot.data()
    : defaultData;

  const newCount = (currentData.validationInterviews ?? 0) + 1;

  await setDoc(ref, {
    validationInterviews: newCount,
    lastUpdated: Date.now(),
    updatedBy: user?.email ?? '',
  });

  console.log('Increment successful — new value:', newCount);
  return newCount;
}

/**
 * Decrement the validationInterviews counter by 1 (minimum 0).
 * Only works if the user is the admin.
 * Throws if not authorized or Firestore is unavailable.
 */
export async function decrementInterviewCount(user) {
  if (!isAdmin(user)) {
    throw new Error('Only the founder can modify the interview counter.');
  }
  if (!firestoreAvailable) {
    throw new Error('Firestore is not configured. The counter cannot persist.');
  }

  const ref = doc(db, METRICS_DOC_PATH);
  const snapshot = await getDoc(ref);
  const currentData = snapshot.exists()
    ? snapshot.data()
    : defaultData;

  const newCount = Math.max(0, (currentData.validationInterviews ?? 0) - 1);

  await setDoc(ref, {
    validationInterviews: newCount,
    lastUpdated: Date.now(),
    updatedBy: user?.email ?? '',
  });

  console.log('Decrement successful — new value:', newCount);
  return newCount;
}

/**
 * Fetch the current validationInterviews value (one-time read, no subscription).
 * Falls back to 0 if Firestore is unavailable.
 */
export async function fetchInterviewCount() {
  if (!firestoreAvailable) return 0;

  try {
    const ref = doc(db, METRICS_DOC_PATH);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      return snapshot.data().validationInterviews ?? 0;
    }
    return 0;
  } catch {
    return 0;
  }
}
