import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { LayoutDashboard } from "lucide-react";
import Navbar from "../../components/Navbar";
import { BsChevronDown } from "react-icons/bs";
import logo from "../../assets/images/logo.png";
import LogOut from "../auth/LogOut";
import DeleteAccount from "../auth/DeleteAccount";

const Layout = ({setIsLoggedIn}) => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [submenuopen, Setsubmenuopen] = useState(false);
  const [isLogOutModalOpen, setLogOutModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", icon: <LayoutDashboard />, to: "/dashboard" },
    { title: "My Courses", icon: <LayoutDashboard />, to: "/my_courses" },
    {
      title: "My Certificates",
      icon: <LayoutDashboard />,
      to: "/my_certificates",
    },
    {
      title: "Generate course",
      icon: <LayoutDashboard />,
      to: "/generate_courses",
    },
    {
      title: "My Study Groups",
      icon: <LayoutDashboard />,
      to: "/study_group",
    },
    {
      title: "Refer & Earn",
      icon: <LayoutDashboard />,
      submenu: true,
      submenuItems: [
        {
          title: "Dashboard",
          icon: <LayoutDashboard />,
          to: "/refer_dashboard",
        },
        { title: "My Earnings", icon: <LayoutDashboard />, to: "/my_earnings" },
        { title: "My Links", icon: <LayoutDashboard />, to: "/my_links" },
        {
          title: "Bank Details",
          icon: <LayoutDashboard />,
          to: "/bank_details",
        },
        { title: "Payout", icon: <LayoutDashboard />, to: "/payout_details" },
        {
          title: "Referral Program Terms",
          icon: <LayoutDashboard />,
          to: "/referral_terms",
        },
      ].filter(Boolean),
    },
    { title: "Help & Support", icon: <LayoutDashboard />, to: "/help_support" },
    { title: "Notifications", icon: <LayoutDashboard />, to: "/notifications" },
    { title: "Profile", icon: <LayoutDashboard />, to: "/profile" },
    {
      title: "Delete Account",
      icon: <LayoutDashboard />,
      to: "#",
      onClick: () => setDeleteModalOpen(true),
    },
    {
      title: "Logout",
      icon: <LayoutDashboard />,
      to: "#",
      onClick: () => setLogOutModalOpen(true),
    },
    {
      title: "Terms & Conditions",
      icon: <LayoutDashboard />,
      to: "/terms_conditions",
    },
  ].filter(Boolean);
  const handleCloseModal = () => {
    setLogOutModalOpen(false);
  };

  const handleDeleteCloseModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="flex font-poppins bg-popup-gray pl-6 pt-6 pb-2 w-full h-screen  ">
      <div className="  bg-darkgray text-gray-200 rounded-3xl  lg:w-96 md:w-80 overflow-y-auto no-scrollbar lg:block md:block hidden ">
        <div className="flex justify-center ">
          <img src={logo} alt="" className="" />
        </div>

        <div className=" ">
          <ul className="pt-3">
            {Menus.map((menu, index) => (
              <React.Fragment key={index}>
                <NavLink to={menu.to} onClick={menu.onClick}>
                  <li
                    className={`cursor-pointer text-md flex items-center  p-2 mt-1 pl-3 transition-all duration-700 hover:bg-teal-400 hover:font-medium font-extralight ${
                      location.pathname && location.pathname.startsWith(menu.to)
                        ? "bg-teal-400 font-medium text-black transition-all duration-500"
                        : ""
                    }`}
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
      </div>

      {/* Main Content */}
      <div className="w-full overflow-x-auto mx-4 no-scrollbar">
        <Navbar />
        <div className="lg:w-10/12 md:w-full w-full  text-white text-base font-light overflow-auto ">
          <p className=" absolute bottom-2 right-4    ">
            Made With
            <span className="text-red-600 px-1">
              &#x2764;<span className="text-white  pl-1">Morpheus Code</span>
            </span>
          </p>
        </div>
        {/* Content Area */}
        <div className="">
          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </div>
      {isLogOutModalOpen && (
        <LogOut
          handleCloseModal={handleCloseModal}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteAccount
          handleDeleteCloseModal={handleDeleteCloseModal}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
};

export default Layout;
