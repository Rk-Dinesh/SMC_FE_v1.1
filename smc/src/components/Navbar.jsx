import React, { useContext, useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Localisation from "../assets/language.png";
import { ThemeContext } from "../App";
import { API } from "../Host";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const isDashboard = location.pathname === "/dashboard"; // adjust if needed
  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
  };
  const { global, setGlobal } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notify, setNotify] = useState(false);
  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState([]);
  const userName = localStorage.getItem("userName");
  const type = localStorage.getItem("type");
  const course = localStorage.getItem("totalCourse");
  const [recentcourses, setRecentcourses] = useState([]);


  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotification();
    }, 2000);
    return () => clearTimeout(timer);
  }, [refresh, global]);

  const fetchNotification = async () => {
    try {
      const response = await axios.get(`${API}/api/getnotifybyid?user=${user}`);
      const responseData = response.data.notify;
      const reverseData = responseData.reverse();
      const filteredCount = responseData.filter(
        (count) => count.read === "no"
      ).length;
      setNotification(reverseData);
      setCount(filteredCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API}/api/courses?userId=${user}`);

        setRecentcourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  },[])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const togglenotify = () => {
    setNotify(!notify);
  };

  const redirectnotify = () => {
    setNotify(!notify);
    setRefresh(!refresh);
    navigate("/notifications");
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(n => n.charAt(0).toUpperCase()).join('');
};

  return (
    <div className=" mb-3">
      <div
        className={`font-poppins flex  items-center text-sm text-white overflow-auto no-scrollbar ${
          isDashboard ? "justify-between " : "justify-end"
        }`}
      >
        {/* LEFT SIDE: Dashboard-only items */}

        {isDashboard && (
          <>
            <div className="bg-darkgray  gap-2 text-base rounded-full whitespace-nowrap py-3 px-3">
              <p>Subscription : {type}</p>
           
            </div>
            <div className="bg-darkgray  gap-2 text-base rounded-full whitespace-nowrap py-3 px-3">
              <p>Courses : {recentcourses.length}/{course}</p>
           
            </div>
          </>
        )}

        <div className="flex gap-4  items-center  lg:mx-0 md:mx-0 mx-auto">
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
            <img
              src={Localisation}
              alt="Language icon"
              className="size-10 rounded-full mx-2"
            />
            <div className="flex items-center gap-2 text-nowrap">
              <div className="relative mr-5" onClick={togglenotify}>
                <Bell className="lg:w-7 lg:h-7 md:w-6 md:h-6 w-5 h-5 text-white cursor-pointer" />
                <p className="absolute text-black bg-teal-500 rounded-full px-2 -top-2 -right-3 cursor-pointer">
                  {" "}
                  {count}
                </p>
              </div>
             {localStorage.getItem('userName')  && (
              <span className="text-white font-semibold text-sm cursor-pointer truncate w-32 hidden sm:block">
                {userName}
              </span>
            )}
              <span>
                <div>
                  <button className="bg-popup-gray w-9 h-9 rounded-full flex items-center justify-center mr-2">
                  {getInitials(userName)}
                  </button>
                </div>
              </span>
            </div>
            {notify && (
        <div
          className="absolute text-black right-2 top-10 bg-white w-80 h-fit pt-3 font-poppins font-extralight z-50 my-8"
          onClick={() => redirectnotify()}
        >
          <p className="px-2">Notifications</p>
          {notification &&
            notification.slice(0, 3).map((data, index) => (
              <div key={index}>
                <hr />
                <span className=" flex gap-1 justify-between px-3 py-2">
                  <p className="text-normal text-slate-600">
                    <strong>Subject:</strong> {data.subject}
                  </p>
                  <button className="text-sm text-black font-normal ">
                    View
                  </button>
                </span>
              </div>
            ))}
          <button
            className="w-full bg-slate-400 text-lg py-1"
            onClick={redirectnotify}
          >
            See all
          </button>
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
