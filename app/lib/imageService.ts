import uploadToCloudinary from "./cloudinaryService";
import uploadImage from "./storageService";

/**
 * Generic image uploader: prefer Cloudinary (if NEXT_PUBLIC_CLOUDINARY_* set),
 * otherwise fall back to Firebase Storage (storageService).
 * When falling back to storageService, caller must provide `fallbackPath`.
 */
export async function uploadProductImage(
  file: File,
  options?: { adminId?: string; fallbackPath?: string }
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (cloudName && uploadPreset) {
    // Try Cloudinary unsigned upload
    return await uploadToCloudinary(file);
  }

  // Fallback: Firebase Storage (requires adminId or fallbackPath to form path)
  const adminId = options?.adminId;
  const fallbackPath = options?.fallbackPath;
  if (!adminId && !fallbackPath) {
    throw new Error(
      "No upload method configured: set Cloudinary vars or provide adminId/fallbackPath for Firebase Storage fallback."
    );
  }

  const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const path = fallbackPath || `products/${adminId}/${filename}`;
  return await uploadImage(file, path);
}

export default uploadProductImage;
