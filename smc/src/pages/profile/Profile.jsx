import React, { useState } from "react";
import IMG from "../../assets/images/Courses.jpeg";
import Personal_Info from "./tabs/personal_info/Personal_Info";
import Bio from "./tabs/bio/Bio";
import LearnersProfile from "./tabs/leaners_profile/LearnersProfile";
import Subscription from "./tabs/subscription/Subscription";

const tabLabels = ["Personal Info", "Bio", "Learners Profile", "Subscription"];
const tabComponents = {
  "Personal Info": <Personal_Info />,
  "Bio": <Bio />,
  "Learners Profile": <LearnersProfile />,
  "Subscription": <Subscription />,
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Personal Info");

  return (
    <div className="text-white p-6">
      <div className="grid bg-darkgray grid-cols-12 gap-6 px-3 py-4 rounded-2xl items-start">
        <div className="col-span-2 flex flex-col items-center gap-4">
          <img
            src={IMG}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-teal-400"
          />
          <button className="bg-teal-400 text-black py-1.5 px-5 rounded-md hover:bg-teal-300 transition">
            Change
          </button>
        </div>
        <div className="col-span-4 flex space-y-2 h-full flex-col">
          <h2 className="text-3xl font-extralight">Vishnu Nair</h2>
          <p className="text-gray-300 mt-2">Profile Completion</p>
          <div className="flex items-center mt-2">
            <div className="w-full h-2 bg-gray-600 rounded">
              <div
                className="h-2 bg-teal-400 rounded"
                style={{ width: "20%" }}
              ></div>
            </div>
            <span className="ml-2 text-sm text-gray-300">20%</span>
          </div>
        </div>
        <div className="col-span-6 grid grid-cols-2  mx-3 text-center">
          {[
            "Courses Generated",
            "Courses Completed",
            "Video Courses",
            "Image Courses",
          ].map((label, index) => (
            <div
              key={index}
              className={`py-4 ${index < 2 ? "border-b" : ""} ${
                index % 2 === 0 ? "border-r" : "mr-4"
              }`}
            >
              <p className="text-2xl font-semibold">14</p>
              <p className="text-gray-300">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap bg-darkgray py-4 px-2 rounded-2xl gap-4 mt-3">
        {tabLabels.map((label) => (
          <button
            key={label}
            className={`px-4 py-2 w-44 rounded-md transition ${
              activeTab === label
                ? "bg-teal-400 text-black"
                : "border-white border text-white"
            }`}
            onClick={() => setActiveTab(label)}
          >
            {label}
          </button>
        ))}
      </div>{" "}
      <div className="bg-darkgray p-4 mt-2 rounded-xl">
      {tabComponents[activeTab] || <div>Coming Soon...</div>}
      </div>
    </div>
  );
};

export default Profile;
