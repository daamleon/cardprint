import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-700 text-white text-center p-6">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1593642634315-48f5414c3ad9")',
        }}
      ></div>

      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
        Selamat Datang di e-Card Generator
      </h1>
      <p className="text-lg max-w-3xl mb-8 drop-shadow-lg">
        Buat e-Card Anda dengan mudah! Login untuk mengakses fiturnya..
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/login"
          className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="border border-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-white hover:text-indigo-600 transition-transform transform hover:scale-105"
        >
          Daftar
        </Link>
      </div>
      <div className="mt-12 bg-white text-black p-8 rounded-xl shadow-lg max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">Fitur Utama</h2>
        <ul className="text-left list-disc list-inside space-y-4 text-lg">
          <li>🎨 Pembuatan e-Card dengan Live Preview</li>
          <li>🖨️ Cetak e-Card menjadi PDF</li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
