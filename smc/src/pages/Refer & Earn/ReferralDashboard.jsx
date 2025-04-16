import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SlidersHorizontal, GraduationCap } from "lucide-react";
import { TfiBook } from "react-icons/tfi";
import { TbFileExport } from "react-icons/tb";

// Sample data with dates for filtering
const allCourseData = [
  { type: "Video Course", value: 5, date: "2025-04-01" },
  { type: "Image Courses", value: 5, date: "2025-04-05" },
  { type: "Video Course", value: 3, date: "2025-03-02" },
  { type: "Image Courses", value: 2, date: "2025-01-15" },
];

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
const ReferralDashboard = () => {
  const [timeRange, setTimeRange] = useState("This Month");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filtered data
  const filteredCourses = filterDataByRange(allCourseData, timeRange);
  const filteredReferrals = filterDataByRange(allReferralData, timeRange);

  // Pie data
  const courseTypeData = [
    {
      name: "Video Course",
      value: filteredCourses
        .filter((c) => c.type === "Video Course")
        .reduce((a, b) => a + b.value, 0),
      color: "#ffffff",
    },
    {
      name: "Image Courses",
      value: filteredCourses
        .filter((c) => c.type === "Image Courses")
        .reduce((a, b) => a + b.value, 0),
      color: "#00f2e4",
    },
  ];

  const totalCourses = courseTypeData.reduce((a, b) => a + b.value, 0);

  return (
    <div className="p-3 text-white font-poppins min-h-screen">
      <div className="flex justify-between items-center mb-2 ">
        <h2 className="text-lg font-medium">Overview</h2>
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
      <hr className="mb-3"/>


        <div className=" grid grid-cols-4 gap-2 my-2">
          <div className="bg-darkgray col-span-4 md:col-span-1 sm:col-span-2 rounded-xl flex justify-around items-center p-3">
            <GraduationCap className="size-16 stroke-1 lg:block md:block hidden" />
            <div className="text-center text-slate-400">
              Total Links
              <p className="lg:text-3xl md:text-3xl text-xl py-3 text-white">
                {totalCourses}
              </p>
            </div>
          </div>

          <div className="bg-darkgray col-span-4 md:col-span-1 sm:col-span-2 rounded-xl flex justify-around items-center p-3">
            <GraduationCap className="size-16 stroke-1 lg:block md:block hidden" />
            <div className="text-center text-slate-400">
              Total Referrals
              <p className="lg:text-3xl md:text-3xl text-xl py-3 text-white">
                {totalCourses}
              </p>
            </div>
          </div>

          <div className="bg-darkgray col-span-4 md:col-span-1 sm:col-span-2 rounded-xl flex justify-around items-center p-3">
            <GraduationCap className="size-16 stroke-1 lg:block md:block hidden" />
            <div className="text-center text-slate-400">
              Total Earnings
              <p className="lg:text-3xl md:text-3xl text-xl py-3 text-white">
                {totalCourses}
              </p>
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
    </div>
  );
};

export default ReferralDashboard;