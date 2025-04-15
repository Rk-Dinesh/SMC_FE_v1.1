import React, { useEffect, useRef, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import ExpandableText from "../../../../components/ExpandableText";
import axios from "axios";
import { API } from "../../../../Host";

const LearnersProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("user");

  const goalsRef = useRef();
  const experienceRef = useRef();
  const resourceRef = useRef();
  const skillsRef = useRef();
  const interestRef = useRef();

  const fetchuser = async () => {
    try {
      const response = await axios.get(`${API}/api/getusersbyid?id=${userId}`);
      setUser(response.data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API}/api/getusersbyid?id=${userId}`);
      setProfile(response.data.user);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchuser();
  }, [userId]);

  const handleSave = async () => {
    const updatedProfile = {
      user: userId,
      goals: goalsRef.current?.value || "",
      experience: experienceRef.current?.value || "",
      resource: resourceRef.current?.value || "",
      skills: skillsRef.current?.value || "",
      areaOfInterest: interestRef.current?.value || "",
    };

    try {
      await axios.post(`${API}/api/userprofile?id=${userId}`, updatedProfile);
      await fetchProfile();
    await fetchuser();
      setEditMode(false);
      console.log("Profile updated and refreshed");
    } catch (err) {
      console.error("Error saving profile:", err.response?.data || err.message);
    }
  };

  const hasData =
    profile &&
    (profile.goals ||
      profile.experience ||
      profile.resource ||
      profile.skills ||
      profile.areaOfInterest);

  return (
    <div className="px-2 ">
      <div className="flex justify-end sm:justify-end mb-2">
        <button
          className="flex items-center gap-1 mt-1 text-base sm:text-lg text-gray-300 hover:text-white"
          onClick={() => setEditMode(!editMode)}
        >
          <RiPencilFill size={20} className="sm:size-6" />
          {editMode ? "Cancel" : hasData ? "Edit" : "Add"}
        </button>
      </div>

      {profile && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 text-white mt-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm sm:text-base">Learning Goals:</label>
              {editMode ? (
                <textarea
                  defaultValue={profile.goals || ""}
                  ref={goalsRef}
                  className="bg-popup-gray rounded-md p-2 w-full text-sm sm:text-base"
                  rows={5}
                />
              ) : (
                <ExpandableText text={profile.goals} />
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm sm:text-base">Experience Level:</label>
              {editMode ? (
                <textarea
                  defaultValue={profile.experience || ""}
                  ref={experienceRef}
                  className="bg-popup-gray rounded-md p-2 w-full text-sm sm:text-base"
                  rows={5}
                />
              ) : (
                <ExpandableText text={profile.experience} />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm sm:text-base">Resource Needs:</label>
              {editMode ? (
                <textarea
                  defaultValue={profile.resource || ""}
                  ref={resourceRef}
                  className="bg-popup-gray rounded-md p-2 w-full text-sm sm:text-base"
                  rows={5}
                />
              ) : (
                <ExpandableText text={profile.resource} />
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm sm:text-base">New Skills Target:</label>
              {editMode ? (
                <textarea
                  defaultValue={profile.skills || ""}
                  ref={skillsRef}
                  className="bg-popup-gray rounded-md p-2 w-full text-sm sm:text-base"
                  rows={5}
                />
              ) : (
                <ExpandableText text={profile.skills} />
              )}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <div>
              <label className="block mb-1 text-sm sm:text-base">Area of Interest:</label>
              {editMode ? (
                <textarea
                  defaultValue={profile.areaOfInterest || ""}
                  ref={interestRef}
                  className="bg-popup-gray rounded-md p-2 w-full text-sm sm:text-base"
                  rows={4}
                />
              ) : (
                <ExpandableText text={profile.areaOfInterest} />
              )}
            </div>
          </div>

          {editMode && (
            <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
              <button
                className="bg-teal-500 px-4 sm:px-6 py-2 text-sm sm:text-lg text-black rounded-md hover:bg-teal-400"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LearnersProfile;
