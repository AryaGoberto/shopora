// app/context/AdminContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { Admin } from "../lib/types";

// Hardcoded admin UID for direct verification
const ADMIN_UID = "t6DlGbQufgf2xeMSF4ZF8l9Z3L53";

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
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if UID matches admin UID
        if (user.uid === ADMIN_UID) {
          setAdminData({
            id: user.uid,
            email: user.email || "",
            storeName: "Admin Store",
            storeDescription: "",
            storeImage: "",
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          setAdminUser(user);
        } else {
          // Not an admin
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

      // Verify UID matches admin UID
      if (result.user.uid !== ADMIN_UID) {
        await signOut(auth);
        throw new Error("❌ UID tidak cocok dengan admin yang terdaftar");
      }

      setAdminData({
        id: result.user.uid,
        email: result.user.email || "",
        storeName: "Admin Store",
        storeDescription: "",
        storeImage: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setAdminUser(result.user);
      console.log("✅ Admin login successful:", result.user.uid);
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
      router.push("/");
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
    // Return default value instead of throwing error
    // This allows components to work even if AdminProvider is not present
    return {
      adminUser: null,
      adminData: null,
      isLoading: false,
      login: async () => { throw new Error("AdminProvider not available"); },
      logout: async () => { throw new Error("AdminProvider not available"); },
      isAdmin: false,
    } as AdminContextType;
  }
  return context;
};
