#!/usr/bin/env node
/**
 * scripts/add-admin.js
 *
 * Simple Node script to add an `admins` document for a given UID using
 * the Firebase Admin SDK. Usage:
 *
 * 1) With service account JSON path:
 *    node scripts/add-admin.js ./serviceAccount.json <UID> <email> "Store Name"
 *
 * 2) With Google Application Default Credentials (set GOOGLE_APPLICATION_CREDENTIALS):
 *    setx GOOGLE_APPLICATION_CREDENTIALS "C:\\path\\to\\serviceAccount.json"
 *    node scripts/add-admin.js <UID> <email> "Store Name"
 *
 * The script will create (or merge) a document in `admins` with the given UID.
 */

const path = require("path");

async function main() {
  try {
    const argv = process.argv.slice(2);

    if (argv.length < 2) {
      console.error("Usage: node scripts/add-admin.js [serviceAccount.json] <UID> <email> [storeName]");
      process.exit(1);
    }

    let serviceAccountPath;
    let uid;
    let email;
    let storeName = "My Store";

    // If first arg looks like a path to a JSON file, treat it as service account
    if (argv[0].endsWith(".json") && argv.length >= 3) {
      serviceAccountPath = argv[0];
      uid = argv[1];
      email = argv[2];
      if (argv[3]) storeName = argv[3];
    } else {
      // No service account provided on command line — rely on GOOGLE_APPLICATION_CREDENTIALS
      uid = argv[0];
      email = argv[1];
      if (argv[2]) storeName = argv[2];
    }

    let admin;
    try {
      admin = require("firebase-admin");
    } catch (e) {
      console.error("firebase-admin is required. Install it with: npm install firebase-admin --save-dev");
      process.exit(1);
    }

    if (serviceAccountPath) {
      const fullPath = path.resolve(serviceAccountPath);
      const key = require(fullPath);
      admin.initializeApp({ credential: admin.credential.cert(key) });
    } else {
      // Initialize with ADC (GOOGLE_APPLICATION_CREDENTIALS)
      admin.initializeApp();
    }

    const db = admin.firestore();

    const adminDoc = {
      email: email,
      storeName: storeName,
      storeDescription: "",
      storeImage: "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("admins").doc(uid).set(adminDoc, { merge: true });

    console.log(`✅ Admin document created/updated for UID: ${uid}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin document:", err);
    process.exit(1);
  }
}

main();
