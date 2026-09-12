import { useState } from "react";
import { Outlet } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Sidebar from "./Sidebar";
import Profilebar from "./Profilebar";

const Layout = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:flex h-screen sticky top-0 z-20">
        <Sidebar />
      </div>

      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileNavOpen(false)}
          />

          <div className="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl animate-fade-in">
            <Sidebar onClose={() => setIsMobileNavOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between md:justify-end px-4 sm:px-6 shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition cursor-pointer"
              aria-label="Open navigation menu"
            >
              <HiOutlineMenuAlt2 size={24} />
            </button>
            <span className="font-bold text-lg text-purple-700">Convoledger</span>
          </div>

          <Profilebar />
        </header>

        <main className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
