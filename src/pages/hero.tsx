import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col justify-center min-h-screen">
      <div className="place-items-center">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg text-center">
          Selamat Datang di e-Card Generator
        </h1>
        <p className="text-sm md:text-lg lg:text-xl max-w-3xl mb-8 drop-shadow-lg text-center px-4">
          Buat e-Card Anda dengan mudah! Login untuk mengakses fiturnya.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
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
      </div>
    </section>
  );
};

export default Hero;
