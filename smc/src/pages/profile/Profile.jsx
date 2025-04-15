import React, { useEffect, useState } from "react";
import IMG from "../../assets/images/Courses.jpeg";
import Personal_Info from "./tabs/personal_info/Personal_Info";
import Bio from "./tabs/bio/Bio";
import LearnersProfile from "./tabs/leaners_profile/LearnersProfile";
import Subscription from "./tabs/subscription/Subscription";
import axios from "axios";
import { API } from "../../Host";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [user, setUser] = useState({});
  const [img, setImg] = useState({});
  const [newimg, setNewimg] = useState({});
  const [coursesGenerated, setCoursesGenerated] = useState(0);
  const [coursesCompleted, setCoursesCompleted] = useState(0);
  const [videoCourses, setVideoCourses] = useState(0);
  const [imageCourses, setImageCourses] = useState(0);

  const userId = localStorage.getItem("user");

  const tabLabels = ["Personal Info", "Bio", "Learns Profile", "Subscription"];
  const tabComponents = {
    "Personal Info": <Personal_Info user={user} setUser={setUser} />,
    "Bio": <Bio user={user} setUser={setUser} />,
    "Learns Profile": <LearnersProfile user={user} setUser={setUser} />,
    "Subscription": <Subscription user={user} />,
  };

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await axios.get(`${API}/api/getusersbyid?id=${userId}`);
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    const fetchProfileImg = async () => {
      try {
        const response1 = await axios.get(`${API}/api/getimagebyid?user=${userId}`);
        setImg(response1.data.user);
      } catch (err) {
        console.error("Error fetching image:", err);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API}/api/getcourses`);
        const allCourses = response.data;

        const userCourses = allCourses.filter((course) => course.user === userId);
        setCoursesGenerated(userCourses.length);
        setCoursesCompleted(userCourses.filter((c) => c.completed).length);
        setImageCourses(userCourses.filter((c) => c.photo?.trim() !== "").length);
        setVideoCourses(userCourses.filter((c) => c.type?.toLowerCase().includes("video")).length);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchProfileImg();
    fetchuser();
    fetchCourses();
  }, [userId]);

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

  return (
    <div className="text-white p-6">
      <div className="grid grid-cols-1 bg-darkgray md:grid-cols-12 gap-6 px-3 py-4 rounded-2xl items-start">
        <div className="col-span-1 md:col-span-4 sm:col-span-12 lg:col-span-3 flex flex-col items-center gap-4">
          <img
            src={IMG}
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-20 md:h-20 lg:w-25 lg:h-25 object-cover rounded-full border-4 border-teal-400 cursor-pointer hover:opacity-80 transition"
          />
          <button className="bg-teal-400 text-black py-1.5 px-5 rounded-md hover:bg-teal-300 transition">
            Change
          </button>
        </div>
        {user && (
          <>
            <div className="col-span-1 md:col-span-8 sm:col-span-12 lg:col-span-4 flex space-y-2 h-full flex-col">
              <h2 className="text-3xl font-extralight">{user.fname}</h2>
              <p className="text-gray-300 mt-2">Profile Completion</p>
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
            <div className="col-span-1 md:col-span-12 sm:col-span-12 lg:col-span-5 grid grid-cols-2 mx-3 text-center">
              {[
                { label: "Courses Generated", value: coursesGenerated },
                { label: "Courses Completed", value: coursesCompleted },
                { label: "Video Courses", value: videoCourses },
                { label: "Image Courses", value: imageCourses },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`py-4 ${index < 2 ? "border-b" : ""} ${
                    index % 2 === 0 ? "border-r" : "mr-4"
                  }`}
                >
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="text-gray-300">{item.label}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap bg-darkgray py-4 px-4 rounded-4xl gap-4 mt-3">
        {tabLabels.map((label) => (
          <button
            key={label}
            className={`px-4 py-2 w-full md:w-44 rounded-md transition ${
              activeTab === label
                ? "bg-teal-400 text-black"
                : "border-white border-2 text-white"
            }`}
            onClick={() => setActiveTab(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-darkgray p-4 mt-2 rounded-4xl">
        {tabComponents[activeTab] || <div>Coming Soon...</div>}
      </div>
    </div>
  );
};

export default Profile;
