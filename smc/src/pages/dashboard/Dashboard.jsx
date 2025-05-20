import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip, } from "recharts";
import { SlidersHorizontal, GraduationCap, BookOpenCheck } from "lucide-react";
import { TfiBook } from "react-icons/tfi";
import { TbFileExport } from "react-icons/tb";
import axios from "axios";
import { API } from "../../Host";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/images/Courses.jpeg'
import { useAppStore } from "../../store";


const allReferralData = [
  { month: "Jan", value: Math.floor(Math.random() * 100), date: "2025-01-01" },
  { month: "Feb", value: Math.floor(Math.random() * 100), date: "2025-02-01" },
  { month: "Mar", value: Math.floor(Math.random() * 100), date: "2025-03-01" },
  { month: "Apr", value: Math.floor(Math.random() * 100), date: "2025-04-01" },
  { month: "May", value: Math.floor(Math.random() * 100), date: "2025-05-01" },
  { month: "Jun", value: Math.floor(Math.random() * 100), date: "2025-06-01" },
  { month: "Jul", value: Math.floor(Math.random() * 100), date: "2025-07-01" },
  { month: "Aug", value: Math.floor(Math.random() * 100), date: "2025-08-01" },
  { month: "Sep", value: Math.floor(Math.random() * 100), date: "2025-09-01" },
  { month: "Oct", value: Math.floor(Math.random() * 100), date: "2025-10-01" },
  { month: "Nov", value: Math.floor(Math.random() * 100), date: "2025-11-01" },
  { month: "Dec", value: Math.floor(Math.random() * 100), date: "2025-12-01" },
];

const filterDataByRange = (data, range) => {
  const now = new Date();
  let startDate;

  switch (range) {
    case "This Month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "Last Month":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      break;
    case "Last 3 Months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      break;
    case "Last 6 Months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      break;
    case "Last 9 Months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 8, 1);
      break;
    case "Last 12 Months":
      startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
      break;
    default:
      return data;
  }

  return data.filter((item) => new Date(item.date) >= startDate);
};
const timeOptions = [
  "This Month",
  "Last Month",
  "Last 3 Months",
  "Last 6 Months",
  "Last 9 Months",
  "Last 12 Months",
];



const Dashboard = () => {
  const [revenueRange, setRevenueRange] = useState("This Year");
  const [recentcourses, setRecentcourses] = useState([]);
  const [timeRange, setTimeRange] = useState("This Month");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userChannels, setUserChannels] = useState([])
  const navigate = useNavigate();

  const userId = localStorage.getItem("user");

  const filteredReferrals = filterDataByRange(allReferralData, timeRange);

   const {
      setSelectedChatType,
      setSelectedChatData,
      selectedChatData,
      setSelectedChatMessages,
    } = useAppStore();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API}/api/courses?userId=${userId}`);

        setRecentcourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    const fetchChannels = async () => {
      try {
        const response = await axios.get(`${API}/get-user-channels`, {
          params: {
            userId: userId,
          },
        });

        setUserChannels(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };


    fetchCourses();
    fetchChannels()
  }, [timeRange]);

  const getLastMonthDateRange = () => {
    const date = new Date();
    const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1);
    const startOfMonth = new Date(
      lastMonth.getFullYear(),
      lastMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      lastMonth.getFullYear(),
      lastMonth.getMonth() + 1,
      0
    );
    return { startOfMonth, endOfMonth };
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Helper function to filter courses based on the selected filter
  const getFilteredCourses = () => {
    return recentcourses.filter((course) => {
      const courseDate = new Date(course.date);
      switch (timeRange) {
        case "This Month":
          return (
            courseDate.getMonth() === currentMonth &&
            courseDate.getFullYear() === currentYear
          );
        case "Last Month":
          const { startOfMonth, endOfMonth } = getLastMonthDateRange();
          return courseDate >= startOfMonth && courseDate <= endOfMonth;
        case "Last 3 Months":
          return courseDate >= new Date(currentDate.setMonth(currentMonth - 3));
        case "Last 6 Months":
          return courseDate >= new Date(currentDate.setMonth(currentMonth - 6));
        case "Last 12 Months":
          return (
            courseDate >= new Date(currentDate.setMonth(currentMonth - 12))
          );
        default:
          return true;
      }
    });
  };

  const filteredCourses = getFilteredCourses();

  const totalCourses = filteredCourses.length;

  const imageCoursesCount = filteredCourses.filter(
    (course) => course.type === "text & image course"
  ).length;
  const videoCoursesCount = filteredCourses.filter(
    (course) => course.type === "video & text course"
  ).length;
  const ActiveCoursesCount = filteredCourses.filter(
    (course) => course.completed === false
  ).length;
  const CompletedCoursesCount = filteredCourses.filter(
    (course) => course.completed === true
  ).length;

  const courseTypeData = [
    {
      name: "Video Course",
      value: videoCoursesCount,
      color: "#ffffff",
    },
    {
      name: "Image Courses",
      value: imageCoursesCount,
      color: "#00f2e4",
    },
  ];

  // const recentGroups = [
  //   {
  //     id: 1,
  //     name: "Frontend Wizards",
  //     learners: 12,
  //     img: "https://images.unsplash.com/photo-1524321956859-97d9031fa723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQyNTB8MHwxfHNlYXJjaHwxfHxtZXJuJTIwc3RhY2t8ZW58MHwwfHx8MTc0NDYzMTQ5OHww&ixlib=rb-4.0.3&q=80&w=1080",
  //   },
  //   {
  //     id: 2,
  //     name: "Backend Masters",
  //     learners: 8,
  //     img: "https://images.unsplash.com/photo-1524321956859-97d9031fa723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQyNTB8MHwxfHNlYXJjaHwxfHxtZXJuJTIwc3RhY2t8ZW58MHwwfHx8MTc0NDYzMTQ5OHww&ixlib=rb-4.0.3&q=80&w=1080",
  //   },
  //   {
  //     id: 3,
  //     name: "React Champs",
  //     learners: 15,
  //     img: "https://images.unsplash.com/photo-1524321956859-97d9031fa723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQyNTB8MHwxfHNlYXJjaHwxfHxtZXJuJTIwc3RhY2t8ZW58MHwwfHx8MTc0NDYzMTQ5OHww&ixlib=rb-4.0.3&q=80&w=1080",
  //   },
  // ];

  const handleCourse = (content, mainTopic, type, courseId, completed, end) => {
    const jsonData = JSON.parse(content);
    localStorage.setItem("courseId", courseId);
    localStorage.setItem("first", completed);
    localStorage.setItem("jsonData", JSON.stringify(jsonData));
    let ending = "";
    if (completed) {
      ending = end;
    }
    navigate("/content", {
      state: {
        jsonData: jsonData,
        mainTopic: mainTopic.toUpperCase(),
        type: type.toLowerCase(),
        courseId: courseId,
        end: ending,
      },
    });
  };

  const handleClick = (contact) => {
    setSelectedChatType("channel");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
    navigate("/view_group");
  };

  return (
    <div className="p-3 text-white font-poppins min-h-screen">
      <div className="flex justify-between items-center mb-2 ">
        <h2 className="text-lg font-medium">Courses Overview</h2>
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-2 py-1 text-white"
          >
            {timeRange}
            <SlidersHorizontal className="cursor-pointer" />
          </button>

          {showDropdown && (
            <div className="absolute -right-4 mt-3 py-2 bg-darkgray w-40 text-white rounded-md shadow-lg z-50">
              {timeOptions.map((option) => (
                <p
                  key={option}
                  className="px-4 py-2 cursor-pointer hover:bg-teal-400"
                  onClick={() => {
                    setTimeRange(option);
                    setShowDropdown(false);
                  }}
                >
                  {option}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <hr className="mb-3" />

      <div className="grid grid-cols-2 items-center gap-6 ">
        <div className=" lg:col-span-1 md:col-span-2 col-span-2 grid grid-cols-2 justify-between gap-2 my-2">
          <div className="bg-darkgray  col-span-1 rounded-xl flex justify-around items-center p-3">
            <GraduationCap className="size-16 stroke-1 lg:block md:block hidden" />
            <div className="text-center text-slate-400">
              Total Courses
              <p className="lg:text-3xl md:text-3xl text-xl py-3 text-white">
                {totalCourses}/
                <span className="text-white">{recentcourses.length}</span>
              </p>
            </div>
          </div>

          <div className="bg-darkgray  col-span-1 rounded-xl flex justify-around items-center p-3">
            <TfiBook className="size-12 lg:block md:block hidden" />
            <div className="text-center text-slate-400">
              Active Courses
              <p className="text-3xl py-3 text-white">{ActiveCoursesCount}</p>
            </div>
          </div>

          <div className="bg-darkgray  col-span-1 rounded-xl flex justify-around items-center p-3">
            <BookOpenCheck className="size-14 stroke-1 lg:block md:block hidden" />
            <div className="text-center text-slate-400">
              Completed Courses
              <p className="text-3xl py-3 text-white">
                {CompletedCoursesCount}
              </p>
            </div>
          </div>

          <div className="bg-darkgray  col-span-1 rounded-xl flex justify-around items-center p-3">
            <TbFileExport className="size-14 lg:block md:block hidden" />
            <div className="text-center text-slate-400">
              Export Courses
              <p className="text-3xl py-3 text-white">0</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 md:col-span-2 col-span-2 flex lg:flex-nowrap md:flex-nowrap flex-wrap justify-center items-center gap-2 mt-3">
          <ResponsiveContainer width={250} height={200}>
            <PieChart>
              <Pie
                data={courseTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={-260}
                endAngle={100}
                paddingAngle={2}
                dataKey="value"
              >
                {courseTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              
            </PieChart>
          </ResponsiveContainer>
          <div>
            <p className="font-medium text-lg mb-2">Course Type</p>
            <ul className="space-y-1">
              {courseTypeData.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 inline-block "
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center my-2">
          <h2 className="text-lg font-medium">Referral Revenue</h2>
          {/* <div className="flex items-center gap-2">
            <span>{timeRange}</span>
            <SlidersHorizontal className="cursor-pointer" />
          </div> */}
        </div>
        <hr />

        <div className="bg-darkgray hover: my-4 p-4 rounded-xl">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredReferrals}>
              <XAxis dataKey="month" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip
                contentStyle={{ backgroundColor: "#222", border: "none" }}
              />
              <Bar dataKey="value" fill="#00f2e4" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-12  gap-3">
        <div className="col-span-12 md:col-span-8">
          <p className="text-xl mb-4">Recent Courses</p>
          <div className="bg-darkgray p-4 rounded-xl h-[400px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {recentcourses && recentcourses.length > 0 ? (
              recentcourses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center flex-nowrap mb-4 p-2 bg-popup-gray rounded-xl"
                >
                  <img
                    src={Logo}
                    alt="Course"
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div className="flex flex-col justify-between text-sm">
                    <p>
                      Date:{" "}
                      {new Date(course.date)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .toUpperCase()
                        .replace(/\s/g, "-")}
                    </p>
                    <p className="font-semibold">{course.title}</p>
                    <p>Type: {course.type}</p>
                    <p>No of Subtopics: {course.subtopics}</p>
                    <p>Language: {course.lang}</p>
                    <button
                      onClick={() =>
                        handleCourse(
                          course.content,
                          course.mainTopic,
                          course.type,
                          course._id,
                          course.completed,
                          course.end
                        )
                      }
                      className="mt-2 bg-teal-400 text-black px-3 py-1 rounded-md text-sm w-fit"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No recent courses available.</p>
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <p className="text-xl mb-4">Recent Active Study Groups</p>
          <div className="bg-darkgray p-4 rounded-xl h-[400px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {userChannels && userChannels.length > 0 ? (
              userChannels.slice(0,4).map((group) => (
                <div
                  key={group.id}
                  className="flex items-center justify-start gap-4 mb-4 border-b border-white/20 pb-2"
                  onClick={() => handleClick(group)}
                >
                  <img
                    src={Logo}
                    alt={group.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{group.name}</p>
                    <p className="text-sm">No of Learners: {group.members.length}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No active study groups found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
