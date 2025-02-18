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

export default function printData() {
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">E-Card Maker</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {userData?.email} ({userData?.role})
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut()}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Card Information</h2>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={cardData.name}
                  onChange={handleChange}
                />
                <Input
                  label="Job Title"
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
                  type="email"
                  value={cardData.email}
                  onChange={handleChange}
                />
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={cardData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2"
            >
              <Printer className="h-5 w-5" />
              Print Card
            </Button>
          </div>

          {/* Preview */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Preview</h2>
            <div
              ref={cardRef}
              className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white"
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold">
                    {cardData.name || "Your Name"}
                  </h3>
                  <p className="text-lg opacity-90">
                    {cardData.title || "Job Title"}
                  </p>
                  <p className="opacity-75">
                    {cardData.company || "Company Name"}
                  </p>
                </div>
                <div className="space-y-1">
                  {cardData.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {cardData.email}
                    </p>
                  )}
                  {cardData.phone && (
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {cardData.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
