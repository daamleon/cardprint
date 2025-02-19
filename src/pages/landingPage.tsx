import Hero from "./hero";
import Fitur from "./fitur";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-indigo-500 to-purple-700 text-white relative">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1593642634315-48f5414c3ad9")',
        }}
      ></div>
      <div className="relative w-full flex flex-col items-center">
        <Hero />
        <Fitur />
      </div>
    </div>
  );
};

export default LandingPage;
