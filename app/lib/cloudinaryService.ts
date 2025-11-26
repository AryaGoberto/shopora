/**
 * Simple Cloudinary unsigned upload helper for client-side uploads.
 * Requires two env vars (NEXT_PUBLIC_*) set in your environment:
 * - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 * - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.");
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", uploadPreset);

  const res = await fetch(url, { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) {
    const message = data?.error?.message || data?.message || "Upload failed";
    throw new Error(`Cloudinary upload failed: ${message}`);
  }

  return data.secure_url || data.url;
}

export default uploadToCloudinary;
