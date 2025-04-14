import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import Logo from "../../assets/images/logo.png";
import { BsChevronDown } from "react-icons/bs";

const Headers = ({ Menus, submenuopen, Setsubmenuopen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsDropdownOpen(false);
  //     }
  //   }
  //   if (isDropdownOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="">
      <div
        className="flex justify-center items-center md:hidden lg:hidden -mt-3"
        onClick={()=>toggleDropdown()}
      >
         <span>
          <AlignJustify className="text-teal-400 my-1 size-8" />
        </span>
        <img src={Logo} alt="Logo Image" className="w-52" />
       
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute overflow-auto w-11/12 h-11/12  top-14 left-4 px-4 py-2 bg-darkgray text-gray-200 shadow-2xl lg:hidden md:hidden block rounded-4xl drop-shadow-2xl z-50 hover:"
        >
          <ul className="pt-3 ">
            {Menus.map((menu, index) => (
              <React.Fragment key={index}>
                <NavLink to={menu.to} onClick={menu.onClick}>
                  <li
                    className={`cursor-pointer text-md flex items-center  p-2 mt-1 pl-3 transition-all duration-700 hover:bg-teal-400 hover:font-medium font-extralight ${
                      location.pathname && location.pathname.startsWith(menu.to)
                        ? "bg-teal-400 font-medium text-black transition-all duration-500"
                        : ""
                    }`}
                    onClick={toggleDropdown}
                  >
                    <div className="flex items-center gap-x-3 px-6">
                      <span className="bg-popup-gray px-1 py-1 rounded-lg text-white">
                        {menu.icon}
                      </span>
                      <span className={`font-poppins text-lg duration-3 `}>
                        {menu.title}
                      </span>
                    </div>
                    {menu.submenu && open && (
                      <BsChevronDown
                        className={`cursor-pointer transition-transform delay-100  ${
                          submenuopen && "rotate-180"
                        }`}
                        onClick={() => Setsubmenuopen(!submenuopen)}
                      />
                    )}
                  </li>
                </NavLink>
                {menu.submenu && submenuopen && open && (
                  <ul>
                    {menu.submenuItems.map((submenuitem, subIndex) => (
                      <NavLink
                        to={submenuitem.to}
                        onClick={submenuitem.onClick}
                        key={subIndex}
                      >
                        <li
                          className={` cursor-pointer font-poppins flex items-center gap-x-2 p-2 pl-14  hover:bg-teal-400  ${
                            location.pathname === submenuitem.to
                              ? "bg-teal-400 text-black font-medium"
                              : "text-gray-200 font-extralight"
                          }`}
                          onClick={toggleDropdown}
                        >
                          <span className="bg-popup-gray px-1 py-1 rounded-lg text-white">
                            {" "}
                            {submenuitem.icon}
                          </span>{" "}
                          <span>{submenuitem.title}</span>
                        </li>
                      </NavLink>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Headers;
