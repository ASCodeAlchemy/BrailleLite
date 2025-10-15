import React, { useState, useEffect } from "react";
import {
  User, Info, Key, LogOut, HeartHandshake, Book, Handshake, Leaf, PawPrint, Smile, GraduationCap, Menu, Sun, Moon
} from "lucide-react";

// Define the Ngo type
type Ngo = {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
};

// Example ngoData array
const ngoData: Ngo[] = [
  {
    id: 1,
    name: "Green Earth",
    description: "Environmental protection and awareness.",
    icon: <Leaf className="w-6 h-6 text-green-500" />,
  },
  {
    id: 2,
    name: "Animal Welfare",
    description: "Caring for stray and injured animals.",
    icon: <PawPrint className="w-6 h-6 text-orange-500" />,
  },
  {
    id: 3,
    name: "Education for All",
    description: "Supporting underprivileged children's education.",
    icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
  },
  // Add more NGOs as needed
];

const UserDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme to <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen font-sans antialiased text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64 p-6" : "w-20 p-4"
          } bg-white dark:bg-slate-800 md:h-screen rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none shadow-xl md:shadow-2xl`}
        >
          <div className="flex items-center justify-between mb-6">
            {isSidebarOpen && (
              <div className="flex items-center">
                <h2 className="ml-2 text-2xl font-bold text-slate-900 dark:text-white">
                  Dashboard
                </h2>
              </div>
            )}
            <div className="flex items-center gap-2">
              {/* Sidebar Toggle */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 transition-colors duration-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <Menu className="w-6 h-6 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Sidebar Nav */}
          <nav className="flex flex-col space-y-2">
            {isSidebarOpen && (
              <h3 className="px-4 py-2 text-xs font-semibold tracking-wider text-slate-400">
                ACCOUNT ACTIONS
              </h3>
            )}
            <SidebarItem icon={<User />} label="Update Profile" isSidebarOpen={isSidebarOpen} />
            <SidebarItem icon={<Info />} label="Account Info" isSidebarOpen={isSidebarOpen} />
            <SidebarItem icon={<Key />} label="Change Password" isSidebarOpen={isSidebarOpen} />
            <div className="pt-4">
              <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-white transition-colors duration-200 bg-red-500 rounded-xl hover:bg-red-600">
                <LogOut className={`w-5 h-5 ${isSidebarOpen ? "mr-2" : ""}`} />
                {isSidebarOpen && "Logout"}
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          {/* Top Header with Theme Toggle on Right */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Explore Opportunities
              </h1>
              <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
                Find ways to help out and make a difference.
              </p>
            </div>

            {/* Theme Toggle on Right */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>

          {/* NGO Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ngoData.map((ngo) => (
              <NgoCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

// Add NgoCard component definition
type NgoCardProps = {
  ngo: {
    id: number;
    name: string;
    description: string;
    icon: React.ReactNode;
  };
};

const NgoCard: React.FC<NgoCardProps> = ({ ngo }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 flex flex-col items-start">
    <div className="mb-4">{ngo.icon}</div>
    <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{ngo.name}</h2>
    <p className="text-slate-600 dark:text-slate-400">{ngo.description}</p>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
      View Details
    </button>
  </div>
);

// SidebarItem component definition
type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  isSidebarOpen: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isSidebarOpen }) => (
  <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
    <span className={`w-5 h-5 ${isSidebarOpen ? "mr-3" : ""}`}>{icon}</span>
    {isSidebarOpen && <span>{label}</span>}
  </button>
);

export default UserDashboard;
