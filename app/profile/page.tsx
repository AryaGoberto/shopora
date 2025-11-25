"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import uploadProductImage from "../lib/imageService";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.push("/login");
        return;
      }
      setUser(u);
      setName(u.displayName || "");
      setEmail(u.email || "");
      setPhotoUrl((u as any).photoURL || "");

      // load Firestore user doc if exists
      try {
        const snap = await getDoc(doc(db, "users", u.uid));
        if (snap.exists()) {
          const data = snap.data();
          if (data.name) setName(data.name);
          if (data.photoURL) setPhotoUrl(data.photoURL);
        }
      } catch (e) {
        console.warn("Failed to read user doc:", e);
      }

      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) {
      const tmp = URL.createObjectURL(f);
      setPhotoUrl(tmp);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (!user) {
      setError("User not loaded");
      setSubmitting(false);
      return;
    }

    try {
      let finalPhoto = (user as any).photoURL || "";

      if (file) {
        // upload via generic imageService (Cloudinary preferred)
        try {
          finalPhoto = await uploadProductImage(file, { fallbackPath: `users/${user.uid}/${Date.now()}_${file.name.replace(/\s+/g, "_")}` });
        } catch (uploadErr: any) {
          console.error("Upload failed:", uploadErr);
          setError(uploadErr?.message || "Gagal mengunggah foto profil");
          setSubmitting(false);
          return;
        }
      } else if (photoUrl) {
        // if photoUrl is set (user may have typed a URL), use it
        finalPhoto = photoUrl;
      }

      // Update Firebase Auth profile
      await updateProfile(user, { displayName: name || undefined, photoURL: finalPhoto || undefined });

      // Update Firestore users doc
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        photoURL: finalPhoto,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      setSuccess("Profil berhasil disimpan");
      setTimeout(() => setSuccess(""), 2500);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Gagal menyimpan profil");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input value={email} readOnly className="mt-1 block w-full border px-3 py-2 rounded-md bg-gray-50" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile photo (URL)</label>
          <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://..." className="mt-1 block w-full border px-3 py-2 rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Or upload photo</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1" />
        </div>

        {photoUrl && (
          <div className="mt-2">
            <img src={photoUrl} alt="preview" className="w-28 h-28 object-cover rounded-full border" />
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded">
            {submitting ? "Saving..." : "Save Profile"}
          </button>
          <button type="button" onClick={() => router.push("/")} className="px-4 py-2 border rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
