import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthState {
  user: any;
  userData: any;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  setUser: (user: any) => void;
  setUserData: (userData: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userData: null,
  loading: false,
  error: null,

  signIn: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      set({ user, userData, loading: false });

      return { email: user.email, role: userData?.role || "user" };
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  signUp: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const role = email === "admin@example.com" ? "admin" : "user";

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role,
      });

      set({ user, userData: { email: user.email, role }, loading: false });

      return { email: user.email, role };
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null, userData: null });
  },

  setUser: (user) => set({ user }),
  setUserData: (userData) => set({ userData }),
}));
