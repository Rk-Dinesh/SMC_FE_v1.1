import React from "react";
import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import Localisation from "../assets/language.png";

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard"; // adjust if needed
  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
  };

  return (
    <div>
      <div className={`font-poppins flex  items-center text-sm mb-3 text-white overflow-auto no-scrollbar ${
       isDashboard ? "justify-between ":"justify-end"
      }`}>
        {/* LEFT SIDE: Dashboard-only items */}

        {isDashboard && (
          <>
            <div className="bg-darkgray flex items-center justify-center lg:px-8 py-3 w-72 gap-2 text-lg rounded-full">
              <p>Subscription :</p>
              <p>Basic</p>
            </div>
            <div className="bg-darkgray flex items-center justify-center lg:px-8 py-3 w-72 gap-2 text-lg rounded-full">
              <p>Courses :</p>
              <p>10/25</p>
            </div>
          </>
        )}

        <div className="flex gap-4  items-center">
          <div className="flex justify-between lg:px-4 py-2 w-full bg-darkgray items-center text-center rounded-full">
            <select
              onChange={handleLanguageChange}
              className="bg-darkgray text-white px-3 py-1 rounded-full text-sm focus:outline-none"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              {/* Add more as needed */}
            </select>
            <img src={Localisation} alt="Language icon" className="size-10 rounded-full mx-2" />
            <div className="flex items-center gap-2 text-nowrap">
              <span className="bg-popup-gray lg:p-2 md:p-2 p-1.5 rounded-full">
                <Bell className="size-5" />
              </span>
              Vishnu Nair
              <span>
                <div>
                  <button className="bg-popup-gray w-9 h-9 rounded-full flex items-center justify-center">
                    VN
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
