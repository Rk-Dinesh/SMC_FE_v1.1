import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import Logo from "../../assets/images/logo.png";
import IMG from "../../assets/images/Courses.jpeg";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { FaGraduationCap, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { API } from "../../Host";
import UpdateImage from "../profile/UpdateImage";
import { MdArrowBackIos } from "react-icons/md";
import LogOut from "../auth/LogOut";
import DeleteAccount from "../auth/DeleteAccount";

const Headers = ({
  setIsLoggedIn,
  isLogOutModalOpen,
  setLogOutModalOpen,
  isDeleteModalOpen,
  setDeleteModalOpen,
  handleCloseModal,
  handleDeleteCloseModal,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [submenuopen, Setsubmenuopen] = useState(false);
  const [open1, setOpen1] = useState(true);
  const [submenuopen1, Setsubmenuopen1] = useState(false);
  const [user, setUser] = useState({});
  const [userImage, setUserImage] = useState({});
  const [isProfileModal, setIsProfileModal] = useState(false);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await axios.get(
          `${API}/api/getusersbyid?id=${userId}`
        );
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchuser();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${API}/api/getimagebyid?user=${userId}`
        );
        const responseData = response.data.user;

        setUserImage(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  }, []);

  const Menus = [
    { title: "Dashboard", to: "/dashboard" },
    {
      title: "My Courses",
      to: "/my_courses",
    },
    {
      title: "My Certificates",
      to: "/certificate",
    },
    {
      title: "My Study Groups",
      submenu1: true,
      submenuItems1: [
        {
          title: "My Study Groups",
          to: "/study_group",
        },
        {
          title: "Create Study Groups",
          to: "/createStudyGroup",
        },
        {
          title: "Chats",
          to: "/chats",
        },
      ].filter(Boolean),
    },
    {
      title: "Refer & Earn",
      submenu: true,
      submenuItems: [
        {
          title: "Dashboard",
          to: "/refer_dashboard",
        },
        {
          title: "My Earnings",
          to: "/my_earnings",
        },

        { title: "My Links", to: "/my_links" },
        {
          title: "Bank Details",
          to: "/bank_details",
        },
        {
          title: "Payout",
          to: "/payout_details",
        },
        {
          title: "Referral Program Terms",
          to: "/referral_terms",
        },
      ].filter(Boolean),
    },
    {
      title: "Help & Support",
      target: "https://seekmycourse.support/",
    },
    {
      title: "Notifications",
      to: "/notifications",
    },
    { title: "Profile", to: "/profile" },
    {
      title: "Delete Account",
      to: "#",
      onClick: () => {
        setDeleteModalOpen(true);
        toggleDropdown();
      },
    },
    {
      title: "Logout",
      to: "#",
      onClick: () => {
        setLogOutModalOpen(true);
        toggleDropdown();
      },
    },
    {
      title: "Terms & Conditions",
      to: "/terms_conditions",
    },
  ].filter(Boolean);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const calculateProfileCompletion = () => {
    let totalFields = 0;
    let filledFields = 0;

    const fieldsToCheck = {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      about: user.about,
      facebook: user.facebook,
      instagram: user.instagram,
      twitter: user.twitter,
      linkedIn: user.linkedIn,
      goals: user.goals,
      experience: user.experience,
      resource: user.resource,
      skills: user.skills,
      areaOfInterest: user.areaOfInterest,
    };

    Object.values(fieldsToCheck).forEach((value) => {
      totalFields++;
      if (value && value.toString().trim() !== "") {
        filledFields++;
      }
    });

    return Math.round((filledFields / totalFields) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  const CloseProfileModal = () => {
    setIsProfileModal(!isProfileModal);
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className=" fixed bottom-0 w-full -mx-2">
        <hr className="w-full border-2 text-gray-400" />
        <div className="flex justify-around items-center md:hidden lg:hidden bg-black py-1">
          <div
            className={`flex flex-col items-center  ${
              location.pathname && location.pathname.startsWith(`/dashboard`)
                ? "text-teal-400"
                : "text-white"
            } `}
            onClick={() => navigate(`/dashboard`)}
          >
            <AiOutlineHome className=" my-1 size-7 " />
            <p>Home</p>
          </div>
          <div
            className={`flex flex-col items-center  ${
              location.pathname &&
              location.pathname.startsWith(`/generate_courses`)
                ? "text-teal-400"
                : "text-white"
            } `}
            onClick={() => navigate(`/generate_courses`)}
          >
            <FaGraduationCap className=" my-1 size-7 " />
            <p>Generate Course</p>
          </div>
          <div
            className="flex flex-col items-center text-white "
            onClick={() => toggleDropdown()}
          >
            <FaUserCircle className="text-white my-1 size-7" />
            <p>Profile</p>
          </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="fixed overflow-auto w-full h-full  top-0  -mx-2 py-2 bg-darkgray text-gray-200 shadow-2xl lg:hidden md:hidden block  drop-shadow-2xl z-50 hover:">
          <div className="bg-black w-full p-3 -mt-2 ">
            <MdArrowBackIos
              className="size-8 ml-2"
              onClick={() => toggleDropdown()}
            />
          </div>
          <div className=" flex gap-5 items-center mt-3 px-3">
            <div className=" flex flex-col items-center gap-2">
              <img
                src={userImage?.image ? userImage.image : IMG}
                alt="Profile"
                className={`w-24 h-24 border-teal-500 border-2 p-0.5 ${
                  userImage?.image
                    ? " rounded-full object-cover"
                    : "rounded-full object-cover"
                }`}
              />
              <button
                className={` text-xs  bg-teal-400  text-black py-1.5 px-3 my-1 `}
                onClick={() => CloseProfileModal()}
              >
                Change
              </button>
            </div>
            {user && (
              <>
                <div className=" flex space-y-2  flex-col w-3/4">
                  <h2 className="text-sm font-medium">{user.fname}</h2>
                  <p className="text-gray-300 text-xs mt-2">
                    Profile Completion
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="w-full h-2 bg-gray-600 rounded">
                      <div
                        className="h-2 bg-teal-400 rounded"
                        style={{ width: `${profileCompletion}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-300">
                      {profileCompletion}%
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div ref={dropdownRef}>
            <ul className="pt-3 px-3 ">
              {Menus.map((menu, index) => (
                <React.Fragment key={index}>
                  <NavLink to={menu.to} onClick={menu.onClick}>
                    <li
                      className={`cursor-pointer text-md flex justify-between items-center py-2  -mx-2 transition-all duration-700 hover:bg-teal-400 hover:font-medium font-extralight text-white border-b-2 border-gray-400 `}
                      onClick={() => {
                        if (menu.submenu === true) {
                          Setsubmenuopen(!submenuopen);
                        } else if (menu.submenu1) {
                          Setsubmenuopen1(!submenuopen1);
                        } else {
                          setIsDropdownOpen(!isDropdownOpen);
                        }
                      }}
                    >
                      <div className="px-3">
                        <span className={`font-poppins text-sm duration-3 `}>
                          {menu.title}
                        </span>
                      </div>
                      {menu.submenu && open && (
                        <BsChevronDown
                          className={`cursor-pointer transition-transform delay-100 ${
                            submenuopen && "rotate-180"
                          }`}
                        />
                      )}
                      {menu.submenu1 && open1 && (
                        <BsChevronDown
                          className={`cursor-pointer transition-transform delay-100  ${
                            submenuopen1 && "rotate-180"
                          }`}
                        />
                      )}
                    </li>
                  </NavLink>

                  {menu.submenu1 && submenuopen1 && open1 && (
                    <ul className="pt-1">
                      {menu.submenuItems1.map((submenuitem, subIndex) => (
                        <NavLink
                          to={submenuitem.to}
                          onClick={submenuitem.onClick}
                          key={subIndex}
                        >
                          <li
                            className={` cursor-pointer font-poppins flex items-center gap-x-2 p-0.5 pl-3 text-gray-200 font-extralight text-sm`}
                            onClick={toggleDropdown}
                          >
                            <span>{submenuitem.title}</span>
                          </li>
                        </NavLink>
                      ))}
                    </ul>
                  )}
                  {menu.submenu && submenuopen && open && (
                    <ul className="pt-1">
                      {menu.submenuItems.map((submenuitem, subIndex) => (
                        <NavLink
                          to={submenuitem.to}
                          onClick={submenuitem.onClick}
                          key={subIndex}
                        >
                          <li
                            className={` cursor-pointer font-poppins flex items-center gap-x-2 p-0.5 pl-3 text-gray-200 font-extralight text-sm`}
                            onClick={toggleDropdown}
                          >
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
      )}
      {isProfileModal && <UpdateImage CloseProfileModal={CloseProfileModal} />}
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
    </>
  );
};

export default Headers;
