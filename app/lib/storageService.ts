import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Uploads a File to Firebase Storage and returns the download URL.
 * @param file File to upload
 * @param path Destination path inside the storage bucket (e.g. `products/adminId/filename`)
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (err: any) {
    console.error("❌ storageService.uploadImage error:", err);
    const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "(not-set)";
    throw new Error(
      `Failed to upload image to Firebase Storage (bucket=${bucket}): ${err?.message || err}`
    );
  }
}

export default uploadImage;
