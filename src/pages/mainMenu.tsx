import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Mail, Phone, LogOut, Printer } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

interface CardData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
}

export default function mainMenu() {
  const { signOut, userData } = useAuthStore();
  const [cardData, setCardData] = useState<CardData>({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => cardRef.current,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            E-Card Creator
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {userData?.email} ({userData?.role})
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => signOut()}
              className="flex items-center text-black gap-2 bg-transparent border-2 hover:bg-gray-600 hover:text-white"
            >
              <LogOut className="h-4 w-4 text-black" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6 bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-xl font-semibold text-gray-700">
            Enter Card Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Name"
              name="name"
              value={cardData.name}
              onChange={handleChange}
            />
            <Input
              label="Title"
              name="title"
              value={cardData.title}
              onChange={handleChange}
            />
            <Input
              label="Company"
              name="company"
              value={cardData.company}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              value={cardData.email}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              value={cardData.phone}
              onChange={handleChange}
            />
          </div>
          <Button
            onClick={handlePrint}
            className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-all"
          >
            <Printer className="h-5 w-5 mr-2" /> Print E-Card
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 relative">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Card Preview
          </h2>
          <div
            ref={cardRef}
            className="aspect-video bg-gradient-to-tr from-gray-400 via-gray-500 to-gray-800 text-white rounded-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-3xl font-bold">
                {cardData.name || "Your Name"}
              </h3>
              <p className="text-lg">{cardData.title || "Job Title"}</p>
              <p className="text-base opacity-80">
                {cardData.company || "Company Name"}
              </p>
            </div>
            <div className="text-sm space-y-1">
              {cardData.email && (
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {cardData.email}
                </p>
              )}
              {cardData.phone && (
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> {cardData.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
