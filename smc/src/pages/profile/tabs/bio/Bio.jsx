import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { API } from "../../../../Host";

const Bio = ({ user, setUser }) => {
  const [editbioMode, setEditbioMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [bioText, setBioText] = useState("");
  const [isNewProfile, setIsNewProfile] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedIn: "",
  });

  const userId = localStorage.getItem("user");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API}/api/getusersbyid?id=${userId}`);
      const info = response.data.user;

      setUser(info); // Update parent state with new user info
      const hasProfile =
        info.about ||
        info.facebook ||
        info.twitter ||
        info.linkedIn ||
        info.instagram;

      setIsNewProfile(!hasProfile);
      setBioText(info.about || "");
      setSocialLinks({
        facebook: info.facebook || "",
        instagram: info.instagram || "",
        twitter: info.twitter || "",
        linkedIn: info.linkedIn || "",
      });
    } catch (err) {
      console.error("Error fetching user:", err);
      setIsNewProfile(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    try {
      const payload = {
        user: userId,
        about: bioText,
        facebook: socialLinks.facebook,
        instagram: socialLinks.instagram,
        twitter: socialLinks.twitter,
        linkedIn: socialLinks.linkedIn,
      };

      await axios.post(`${API}/api/userbio`, payload);
      await fetchUser();
      setEditbioMode(false);
      setEditMode(false);
      setIsNewProfile(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <div className="bg-darkgray text-white px-4 sm:px-6 md:px-8 lg:px-12 rounded-2xl">
      <button
        className="flex justify-end w-full gap-1 text-lg text-gray-300 hover:text-white"
        onClick={() => setEditbioMode(!editbioMode)}
      >
        <RiPencilFill size={24} />
        {editbioMode ? "Cancel" : bioText ? "Edit" : "Add"}
      </button>

      {editbioMode ? (
        <textarea
          className="text-base leading-7 py-4 w-full text-white bg-gray-700 rounded-md p-2"
          rows={4}
          value={bioText}
          onChange={(e) => setBioText(e.target.value)}
        />
      ) : (
        <p className="text-base leading-7 py-4">{bioText || "No bio added."}</p>
      )}

      <hr className="border-gray-600 my-4" />
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg">Social Links</p>
        <button
          className="flex items-center gap-1 text-lg text-gray-300 hover:text-white"
          onClick={() => setEditMode(!editMode)}
        >
          <RiPencilFill size={24} />
          {editMode
            ? "Cancel"
            : Object.values(socialLinks).some((val) => val)
            ? "Edit"
            : "Add"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10 ">
        {["facebook", "instagram", "twitter", "linkedIn"].map((key) => (
          <div
            className="flex-col lg:col-span-6 col-span-12 gap-2 py-2 flex"
            key={key}
          >
            <label
              htmlFor={key}
              className="px-1 capitalize text-sm sm:text-base lg:text-lg"
            >
              {key === "twitter" ? "X" : key}
            </label>
            {editMode ? (
              <input
                type="text"
                name={key}
                placeholder={socialLinks[key]}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, [key]: e.target.value })
                }
                className="bg-white text-black rounded-md h-10 w-full  px-2"
              />
            ) : (
              <p className="bg-transparent border-b border-white text-gray-300 w-full  py-1">
                {socialLinks[key] || "Not Provided"}
              </p>
            )}
          </div>
        ))}
      </div>

      {(editMode || editbioMode) && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-teal-500 px-6 py-2 text-black text-lg rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Bio;
