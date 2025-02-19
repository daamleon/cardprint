import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";

interface UserData {
  role: "admin" | "user";
  email: string;
  createdAt: any;
}

interface AuthState {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  onAuthStateChanged(auth, (user) => {
    if (!get().initialized) {
      set({ initialized: true });
    }
    if (user) {
      get().setUser(user);
    } else {
      set({ user: null, userData: null });
    }
  });

  return {
    user: null,
    userData: null,
    loading: false,
    error: null,
    initialized: false,
    signIn: async (email, password) => {
      set({ loading: true, error: null });
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userDocRef = doc(db, "users", userCredential.user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          const userData: UserData = {
            role: "user",
            email,
            createdAt: serverTimestamp(),
          };
          await setDoc(userDocRef, userData);
          set({ user: userCredential.user, userData, loading: false });
        } else {
          const userData = userDoc.data() as UserData;
          set({ user: userCredential.user, userData, loading: false });
        }
      } catch (error) {
        console.error("Sign in error:", error);
        set({ error: (error as Error).message, loading: false });
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
        const userData: UserData = {
          role: "user",
          email,
          createdAt: serverTimestamp(),
        };
        await setDoc(doc(db, "users", userCredential.user.uid), userData);
        set({ user: userCredential.user, userData, loading: false });
      } catch (error) {
        console.error("Sign up error:", error);
        set({ error: (error as Error).message, loading: false });
      }
    },
    signOut: async () => {
      try {
        await firebaseSignOut(auth);
        set({ user: null, userData: null });
      } catch (error) {
        console.error("Sign out error:", error);
        set({ error: (error as Error).message });
      }
    },
    setUser: async (user) => {
      if (!user) {
        set({ user: null, userData: null });
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as UserData;
          set({ user, userData });
        } else {
          const userData: UserData = {
            role: "user",
            email: user.email!,
            createdAt: serverTimestamp(),
          };
          await setDoc(userDocRef, userData);
          set({ user, userData });
        }
      } catch (error) {
        console.error("Error setting user:", error);
        set({ error: (error as Error).message });
      }
    },
  };
});
