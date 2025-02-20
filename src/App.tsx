import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/config";
import { useAuthStore } from "./store/authStore";
import { doc, getDoc } from "firebase/firestore";
import Login from "./pages/login";
import Register from "./pages/register";
import LandingPage from "./pages/home";
import Home from "./pages/user/dashboard";
import AdminDashboard from "./pages/admin/dashboard";

const ProtectedRoute = ({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) => {
  const { user, userData } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && userData?.role !== "admin") {
    return <Navigate to="/user/dashboard" />;
  }

  return <>{children}</>;
};

function App() {
  const { setUser, setUserData } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;

        setUserData(userData);
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [setUser, setUserData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
