import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center p-6">
      <h1 className="text-4xl font-bold mb-4">
        Selamat Datang di e-Card Generator
      </h1>
      <p className="text-lg max-w-2xl mb-6">
        Buat e-Card Anda dengan mudah! Login sebagai admin untuk mengelola data
        user, unggah foto profil, dan cetak e-Card menjadi PDF.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="border border-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-white hover:text-blue-600 transition"
        >
          Daftar
        </Link>
      </div>
      <div className="mt-12 bg-white text-black p-6 rounded-lg shadow-lg max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Fitur Utama</h2>
        <ul className="text-left list-disc list-inside space-y-2">
          <li>🎨 Pembuatan e-Card dengan Live Preview</li>
          <li>🖨️ Cetak e-Card menjadi PDF</li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
