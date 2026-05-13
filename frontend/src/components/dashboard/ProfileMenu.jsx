import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

export default function ProfileMenu() {
  const navigate = useNavigate();

  const { logout } = useAuthStore();

  const [showDropdown, setShowDropdown] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    logout();
  navigate("/", { replace: true });
  };

  return (
    <div className="relative">

      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
        className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700
        transition-all duration-300
        hover:border-blue-400
        hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
      >
        👤 Profile
      </button>

      {showDropdown && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-[100]"
        >

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg
            hover:bg-red-500 hover:text-white transition"
          >
            🚪 Logout
          </button>

        </div>
      )}

    </div>
  );
}