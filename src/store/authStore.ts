import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

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

      return userData;
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

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      if (!userData) {
        throw new Error(
          "User data not found in Firestore. Please check database."
        );
      }

      set({ user, userData, loading: false });

      return userData;
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
