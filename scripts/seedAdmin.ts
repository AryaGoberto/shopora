// scripts/seedAdmin.ts
/**
 * Script untuk membuat admin user di Firebase
 * Run: npx ts-node scripts/seedAdmin.ts
 * 
 * Sebelum running script ini:
 * 1. Pastikan sudah ada user di Firebase Authentication dengan email yang ingin dijadikan admin
 * 2. Atau biarkan script ini membuat user baru
 */

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

// Firebase config (sesuaikan dengan .env.local Anda)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

interface AdminConfig {
  email: string;
  password: string;
  storeName: string;
  storeDescription?: string;
}

async function createAdmin(config: AdminConfig) {
  try {
    console.log(`\n🔄 Creating admin user for: ${config.email}`);

    // 1. Create user di Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      config.email,
      config.password
    );

    const uid = userCredential.user.uid;
    console.log(`✅ User created with UID: ${uid}`);

    // 2. Create admin document di Firestore
    const adminDocRef = doc(db, "admins", uid);
    await setDoc(adminDocRef, {
      email: config.email,
      storeName: config.storeName,
      storeDescription: config.storeDescription || "",
      storeImage: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(`✅ Admin document created in Firestore`);
    console.log(`\n📋 Admin Details:`);
    console.log(`   Email: ${config.email}`);
    console.log(`   Store: ${config.storeName}`);
    console.log(`   UID: ${uid}`);

    // 3. Logout
    await signOut(auth);
    console.log(`\n✅ Logged out. You can now login at /admin/login`);

    return uid;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      console.error(
        `❌ Email ${config.email} sudah terdaftar di Firebase Auth`
      );
      console.log(
        `\n💡 Solusi: Gunakan email berbeda atau hapus user dari Firebase Console`
      );
    } else if (error.code === "auth/weak-password") {
      console.error(`❌ Password terlalu lemah (minimal 6 karakter)`);
    } else {
      console.error(`❌ Error:`, error.message);
    }
    throw error;
  }
}

async function main() {
  console.log(`\n🚀 Shopora Admin Seeder`);
  console.log(`========================\n`);

  // Contoh admin yang akan dibuat
  const admins: AdminConfig[] = [
    {
      email: "admin@shopora.com",
      password: "Admin@123456",
      storeName: "Shopora Official Store",
      storeDescription:
        "Official Shopora store with premium collection of clothing and accessories",
    },
    {
      email: "toko1@shopora.com",
      password: "Toko1@123456",
      storeName: "Fashion Store 1",
      storeDescription: "High quality clothing and fashion items",
    },
  ];

  for (const adminConfig of admins) {
    try {
      await createAdmin(adminConfig);
    } catch (error) {
      console.log(`\n⏭️  Skipping to next admin...`);
    }
  }

  console.log(`\n✅ Admin seeding completed!`);
  process.exit(0);
}

main().catch((error) => {
  console.error(`❌ Fatal error:`, error);
  process.exit(1);
});
