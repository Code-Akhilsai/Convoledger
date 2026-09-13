import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import profile from "../assets/image.png";
import { getCurrentUser, logoutUser } from "../services/api";

const Profilebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const displayName = user?.name || "User";
  const displayEmail = user?.email || "";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-gray-100 transition cursor-pointer"
      >
        <img
          src={profile}
          alt="Profile"
          className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-purple-100"
        />
        <div className="text-left hidden xs:block sm:block">
          <p className="text-sm font-semibold text-gray-800 leading-tight">{displayName}</p>
          {displayEmail && <p className="text-[11px] text-gray-500 truncate max-w-32">{displayEmail}</p>}
        </div>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-gray-200 shadow-xl py-2 z-50 animate-fade-in">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-900 truncate">{displayName}</p>
            <p className="text-[11px] text-gray-500 truncate">{displayEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 font-semibold flex items-center gap-2 transition cursor-pointer"
          >
            <MdLogout size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Profilebar;
