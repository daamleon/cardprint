import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import Button from "../../components/ui/Button";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { signOut, userData } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {userData?.email} ({userData?.role})
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center text-black gap-2 bg-transparent border-2 hover:bg-gray-600 hover:text-white"
            >
              <LogOut className="h-4 w-4 text-black" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[80vh]">
        <h2 className="text-2xl font-semibold text-gray-700">Coming Soon</h2>
      </main>
    </div>
  );
}
