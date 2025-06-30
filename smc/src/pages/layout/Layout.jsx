import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { LayoutDashboard } from "lucide-react";
import Navbar from "../../components/Navbar";
import { BsChevronDown } from "react-icons/bs";
import logo from "../../assets/images/logo.png";
import LogOut from "../auth/LogOut";
import DeleteAccount from "../auth/DeleteAccount";
import Headers from "./Headers";
import { MdDashboard } from "react-icons/md";
import {
  FaGraduationCap,
  FaAward,
  FaUsers,
  FaUserCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdOutlineWeb } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { HiOutlineViewGrid } from "react-icons/hi";
import { FaRupeeSign } from "react-icons/fa";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FiLink } from "react-icons/fi";
import { TbUnlink } from "react-icons/tb";
import axios from "axios";
import { API } from "../../Host";

const Layout = ({ setIsLoggedIn }) => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [submenuopen, Setsubmenuopen] = useState(false);
  const [open1, setOpen1] = useState(true);
  const [submenuopen1, Setsubmenuopen1] = useState(false);
  const [isLogOutModalOpen, setLogOutModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [accessLevels, setAccessLevels] = useState({});
  const type = localStorage.getItem("type");

  useEffect(() => {
    
      fetchSubscriptionStatus();

  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      if (type === "Pro") {
        setAccessLevels({
          preCourses: "Yes",
          studyGroupAccess: "Yes",
        });
        return;
      } else if (type === "free") {
        setAccessLevels({
          preCourses: "No",
          studyGroupAccess: "No",
        });
        return;
      } else {
        const response = await axios.get(
          `${API}/api/getsubscriptionplanbypackagename?packagename=${type}`
        );
        if (response.status === 200) {
          setAccessLevels(response.data.data);
         // console.log("Access Levels:", response.data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching subscription status:", error);
    }
  };

  const Menus = [
    { title: "Dashboard", icon: <LayoutDashboard />, to: "/dashboard" },
    {
      title: "My Courses",
      icon: <FaGraduationCap size={24} />,
      to: "/my_courses",
    },
    ...(accessLevels.preCourses === "Yes"
      ? [
          {
            title: "Pre Courses",
            icon: <FaGraduationCap size={24} />,
            to: "/pre_courses",
          },
        ]
      : []),
    {
      title: "My Certificates",
      icon: <FaAward size={24} />,
      to: "/certificate",
    },
    {
      title: "Generate course",
      icon: <MdOutlineWeb size={24} />,
      to: "/generate_courses",
    },
    ...(accessLevels.studyGroupAccess === "Yes"
      ? [
          {
            title: "My Study Groups",
            icon: <FaUsers size={24} />,
            submenu1: true,
            submenuItems1: [
              {
                title: "My Study Groups",
                icon: <LayoutDashboard size={24} />,
                to: "/study_group",
              },
              // {
              //   title: "All Study Groups",
              //   icon: <BiBarChartAlt2 size={24} />,
              //   to: "/all_studygroup",
              // },
              {
                title: "Create Study Groups",
                icon: <FiLink size={24} />,
                to: "/createStudyGroup",
              },
              {
                title: "Chats",
                icon: <TbUnlink size={24} />,
                to: "/chats",
              },
            ].filter(Boolean),
          },
        ]
      : []),
    // {
    //   title: "Refer & Earn",
    //   icon: <RiTeamLine size={24} />,
    //   submenu: true,
    //   submenuItems: [
    //     {
    //       title: "Dashboard",
    //       icon: <LayoutDashboard size={24} />,
    //       to: "/refer_dashboard",
    //     },
    //     {
    //       title: "My Earnings",
    //       icon: <BiBarChartAlt2 size={24} />,
    //       to: "/my_earnings",
    //     },
    //     { title: "My Links", icon: <FiLink size={24} />, to: "/my_links" },
    //     {
    //       title: "Bank Details",
    //       icon: <TbUnlink size={24} />,
    //       to: "/bank_details",
    //     },
    //     {
    //       title: "Payout",
    //       icon: <LayoutDashboard size={24} />,
    //       to: "/payout_details",
    //     },
    //     {
    //       title: "Referral Program Terms",
    //       icon: <LayoutDashboard size={24} />,
    //       to: "/referral_terms",
    //     },
    //   ].filter(Boolean),
    // },
    {
      title: "Help & Support",
      icon: <AiOutlineQuestionCircle size={24} />,
      target: "https://seekmycourse.support/",
    },
    {
      title: "Notifications",
      icon: <IoIosNotificationsOutline size={24} />,
      to: "/notifications",
    },
    { title: "Profile", icon: <FaUserCircle size={24} />, to: "/profile" },
    {
      title: "Delete Account",
      icon: <FaTrashAlt size={24} />,
      to: "#",
      onClick: () => setDeleteModalOpen(true),
    },
    {
      title: "Logout",
      icon: <MdLogout size={24} />,
      to: "#",
      onClick: () => setLogOutModalOpen(true),
    },
    {
      title: "Terms & Conditions",
      icon: <HiOutlineDocumentCheck size={24} />,
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
    <div className="flex font-poppins bg-popup-gray lg:px-4 md:px-3 px-0 py-4 pb-2 w-full h-screen  ">
      <div className="  bg-darkgray text-gray-200 rounded-3xl  lg:w-[420px] md:w-[460px]  overflow-y-auto no-scrollbar lg:block md:block hidden ">
        <div className="flex justify-center ">
          <img src={logo} alt="Image" className="px-3 py-3" />
        </div>

        <div className=" ">
          <ul className="pt-3">
            {Menus.map((menu, index) => (
              <React.Fragment key={index}>
                {menu.target ? (
                  <a
                    className={`cursor-pointer `}
                    href={menu.target}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-x-3 px-5 pl-9 py-2 ">
                      <span className="bg-popup-gray px-1 py-1 rounded-lg text-white">
                        {menu.icon}
                      </span>
                      <span
                        className={`font-poppins text-lg duration-3 text-gray-300`}
                      >
                        {menu.title}
                      </span>
                    </div>
                  </a>
                ) : (
                  <NavLink to={menu.to} onClick={menu.onClick}>
                    <li
                      className={`cursor-pointer text-md flex items-center  p-2 mt-1 pl-3 transition-all duration-700 hover:bg-teal-400 hover:font-medium font-extralight ${
                        location.pathname &&
                        location.pathname.startsWith(menu.to)
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
                      {menu.submenu1 && open1 && (
                        <BsChevronDown
                          className={`cursor-pointer transition-transform delay-100  ${
                            submenuopen1 && "rotate-180"
                          }`}
                          onClick={() => Setsubmenuopen1(!submenuopen1)}
                        />
                      )}
                    </li>
                  </NavLink>
                )}
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
                {menu.submenu1 && submenuopen1 && open1 && (
                  <ul>
                    {menu.submenuItems1.map((submenuitem, subIndex) => (
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
      <div className="w-full overflow-x-auto lg:mx-4 md:mx-4 mx-2 no-scrollbar">
        <Navbar />
        {/* <div className="lg:w-10/12 md:w-full lg:block md:block hidden  text-white text-base font-light overflow-auto ">
          <p className=" absolute bottom-0 right-2   ">
            Made With
            <span className="text-red-600 px-1">
              &#x2764;<span className="text-white  pl-1">Morpheus Code</span>
            </span>
          </p>
        </div> */}
        <div className="lg:mb-0 md:mb-0 mb-18">
          <Outlet />
        </div>

        <Headers
          isLogOutModalOpen={isLogOutModalOpen}
          setLogOutModalOpen={setLogOutModalOpen}
          isDeleteModalOpen={isDeleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          handleCloseModal={handleCloseModal}
          handleDeleteCloseModal={handleDeleteCloseModal}
          setIsLoggedIn={setIsLoggedIn}
        />
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
