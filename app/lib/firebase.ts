// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// Hindari re-initialize saat hot reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

// Runtime checks to help debug common misconfigurations
try {
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucket) {
    // eslint-disable-next-line no-console
    console.warn("⚠️ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET is not set. File uploads will fail.");
  } else {
    // eslint-disable-next-line no-console
    console.log(`Firebase storage bucket configured: ${bucket}`);
    if (bucket.includes("firebasestorage.app")) {
      // eslint-disable-next-line no-console
      console.warn(
        "⚠️ The storage bucket value looks unusual. Default bucket usually ends with `appspot.com`.\nIf uploads fail, try setting NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-project-id>.appspot.com in .env.local"
      );
    }
  }
} catch (e) {
  // ignore runtime check errors
}
