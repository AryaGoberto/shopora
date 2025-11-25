// app/context/AdminContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, db } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { Admin } from "../lib/types";

interface AdminContextType {
  adminUser: User | null;
  adminData: Admin | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check apakah user adalah admin
        const adminDocRef = doc(db, "admins", user.uid);
        const adminDocSnap = await getDoc(adminDocRef);

        if (adminDocSnap.exists()) {
          const data = adminDocSnap.data();
          setAdminData({
            id: adminDocSnap.id,
            email: data.email,
            storeName: data.storeName,
            storeDescription: data.storeDescription,
            storeImage: data.storeImage,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          });
          setAdminUser(user);
        } else {
          // User login tapi bukan admin
          await signOut(auth);
          setAdminUser(null);
          setAdminData(null);
        }
      } else {
        setAdminUser(null);
        setAdminData(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Verify admin exists
      const adminDocRef = doc(db, "admins", result.user.uid);
      const adminDocSnap = await getDoc(adminDocRef);

      if (!adminDocSnap.exists()) {
        await signOut(auth);
        throw new Error("User bukan admin Shopora");
      }

      const data = adminDocSnap.data();
      setAdminData({
        id: adminDocSnap.id,
        email: data.email,
        storeName: data.storeName,
        storeDescription: data.storeDescription,
        storeImage: data.storeImage,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      });
      setAdminUser(result.user);
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setAdminUser(null);
      setAdminData(null);
    } catch (error) {
      console.error("❌ Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        adminUser,
        adminData,
        isLoading,
        login,
        logout,
        isAdmin: adminUser !== null && adminData !== null,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
